"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FLOWERS, BUCKET_IDS } from "./flowers";
import PaperArea, { type PlacedFlower } from "./PaperArea";
import { type Locale, t } from "@/lib/i18n";

interface InsideContentProps {
  isOpen: boolean;
  locale?: Locale;
}

interface HeldFlower {
  id: string;
  x: number;
  y: number;
}

// Minimum pixels the pointer must move to count as a drag (vs a click).
// Generous threshold to prevent touch jitter from triggering a drag.
const DRAG_THRESHOLD = 16;

export default function InsideContent({
  isOpen,
  locale = "en",
}: InsideContentProps) {
  const prefersReduced = useReducedMotion();
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([]);
  const [bouquetMade, setBouquetMade] = useState(false);
  const [heldFlower, setHeldFlower] = useState<HeldFlower | null>(null);
  const heldFlowerRef = useRef<HeldFlower | null>(null);
  // "holding" = pointer is down and dragging; "floating" = clicked once, follows cursor freely
  const modeRef = useRef<"idle" | "holding" | "floating">("idle");
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const [rawSvg, setRawSvg] = useState<string>("");
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  // Fetch the SVG content on mount
  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    fetch(`${basePath}/market-scene-v3.svg`)
      .then((res) => res.text())
      .then((text) => {
        const patched = text.replace(
          "<svg ",
          '<svg preserveAspectRatio="xMidYMid slice" '
        );
        setRawSvg(patched);
      })
      .catch(() => {});
  }, []);

  // Inject a11y attributes into bucket groups
  const svgContent = rawSvg
    ? FLOWERS.reduce((svg, flower) => {
        const tabindex = isOpen ? "0" : "-1";
        const label =
          locale === "nl"
            ? `Pak ${flower.name.nl}`
            : `Pick ${flower.name.en}`;
        return svg.replace(
          new RegExp(`(<g[^>]*\\bid="${flower.id}")`),
          `$1 role="button" tabindex="${tabindex}" aria-label="${label}" style="cursor:pointer"`
        );
      }, rawSvg)
    : "";

  const handlePick = useCallback((flowerId: string) => {
    setPlacedFlowers((prev) => {
      const instanceId = `${flowerId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      // Position is determined by PaperArea's FAN_POSITIONS based on index
      return [...prev, { id: flowerId, instanceId, x: 0, y: 0, rotate: 0 }];
    });
  }, []);

  const handleMakeBouquet = useCallback(() => {
    setBouquetMade(true);
  }, []);

  const handleReset = useCallback(() => {
    setPlacedFlowers([]);
    setBouquetMade(false);
  }, []);

  // Try to place flower if pointer is over the paper area. Returns true if placed.
  const tryPlace = useCallback(
    (x: number, y: number): boolean => {
      const current = heldFlowerRef.current;
      if (!current || !paperRef.current) return false;
      const paperRect = paperRef.current.getBoundingClientRect();
      if (
        x >= paperRect.left &&
        x <= paperRect.right &&
        y >= paperRect.top &&
        y <= paperRect.bottom
      ) {
        handlePick(current.id);
        return true;
      }
      return false;
    },
    [handlePick]
  );

  const dismiss = useCallback(() => {
    heldFlowerRef.current = null;
    modeRef.current = "idle";
    setHeldFlower(null);
  }, []);

  // --- Pointer interaction: supports both click-to-pick and drag-to-place ---

  const handleSvgPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isOpen) return;

      // If already floating a flower, try to place it or dismiss
      if (modeRef.current === "floating" && heldFlowerRef.current) {
        tryPlace(e.clientX, e.clientY);
        dismiss();
        return;
      }

      const target = e.target as Element;
      for (const bucketId of BUCKET_IDS) {
        const bucketEl = target.closest(`#${bucketId}`);
        if (bucketEl) {
          e.preventDefault();
          e.stopPropagation();
          const held: HeldFlower = {
            id: bucketId,
            x: e.clientX,
            y: e.clientY,
          };
          heldFlowerRef.current = held;
          modeRef.current = "holding";
          startPosRef.current = { x: e.clientX, y: e.clientY };
          hasMovedRef.current = false;
          setHeldFlower(held);
          return;
        }
      }

      // Clicked on non-bucket area while no flower is held — do nothing
    },
    [isOpen, tryPlace, dismiss]
  );

  // Global pointer tracking
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!heldFlowerRef.current) return;
      if (modeRef.current === "idle") return;

      // Check if we've moved past the drag threshold
      if (!hasMovedRef.current) {
        const dx = e.clientX - startPosRef.current.x;
        const dy = e.clientY - startPosRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
          hasMovedRef.current = true;
        }
      }

      const updated = { ...heldFlowerRef.current, x: e.clientX, y: e.clientY };
      heldFlowerRef.current = updated;
      setHeldFlower(updated);
    };

    const handleUp = (e: PointerEvent) => {
      if (!heldFlowerRef.current) return;
      if (modeRef.current !== "holding") return;

      if (hasMovedRef.current) {
        // User dragged: place if on paper, otherwise keep floating
        const placed = tryPlace(e.clientX, e.clientY);
        if (placed) {
          dismiss();
        } else {
          // Drag ended outside paper — don't dismiss, let user keep placing
          modeRef.current = "floating";
        }
      } else {
        // User clicked (no significant movement): switch to floating mode
        // Flower stays visible and follows cursor until next click
        modeRef.current = "floating";
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [tryPlace, dismiss]);

  // Auto-dismiss after timeout (safety net)
  useEffect(() => {
    if (!heldFlower) return;
    const timer = setTimeout(() => {
      dismiss();
    }, 15000);
    return () => clearTimeout(timer);
  }, [heldFlower, dismiss]);

  // Keyboard support on bucket groups (direct place for a11y)
  const handleSvgKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key !== "Enter" && e.key !== " ") return;
      const target = e.target as Element;
      const id = target.id;
      if (BUCKET_IDS.includes(id)) {
        e.preventDefault();
        e.stopPropagation();
        handlePick(id);
      }
    },
    [isOpen, handlePick]
  );

  // Resolve the flower component for the held flower
  const heldFlowerInfo = heldFlower
    ? FLOWERS.find((f) => f.id === heldFlower.id)
    : null;

  const heldScale = heldFlowerInfo?.scale ?? 1;

  return (
    <div className="relative flex h-full flex-col bg-[#FFF8F0]">
      {/* Market scene — fades out when bouquet is made */}
      <AnimatePresence>
        {!bouquetMade && (
          <motion.div
            className="relative flex-1"
            style={{ minHeight: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* SVG scene with ~10% breathing room */}
            <div
              ref={svgContainerRef}
              className="market-svg-container absolute inset-0 overflow-hidden"
              style={{ padding: "5%" }}
              data-hint={isOpen && placedFlowers.length === 0 ? "true" : undefined}
              onPointerDown={handleSvgPointerDown}
              onKeyDown={handleSvgKeyDown}
              dangerouslySetInnerHTML={svgContent ? { __html: svgContent } : undefined}
            />

            {/* Drag hint overlay */}
            <motion.p
              className="pointer-events-none relative z-10 pt-2 text-center text-xs tracking-wider text-white/70 uppercase drop-shadow-sm"
              animate={{
                opacity:
                  isOpen && placedFlowers.length === 0
                    ? prefersReduced
                      ? 0.5
                      : [0.3, 0.8, 0.3]
                    : 0,
              }}
              transition={
                prefersReduced
                  ? {}
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              {t("bloemen.dragHint", locale)}
            </motion.p>

            {/* Bouquet overlay — positioned over the market paper in the SVG scene */}
            <div
              ref={paperRef}
              className="pointer-events-none absolute z-10 overflow-visible"
              style={{ left: "70%", top: "0%", width: "30%", height: "58%" }}
            >
              <PaperArea
                placedFlowers={placedFlowers}
                bouquetMade={false}
                onMakeBouquet={handleMakeBouquet}
                onReset={handleReset}
                locale={locale}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouquet reveal — centered in full card after market fades */}
      {bouquetMade && (
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative h-full w-3/4">
            <PaperArea
              placedFlowers={placedFlowers}
              bouquetMade={true}
              onMakeBouquet={handleMakeBouquet}
              onReset={handleReset}
              locale={locale}
            />
          </div>
        </div>
      )}

      {/* Held flower — follows pointer */}
      <AnimatePresence>
        {heldFlower && heldFlowerInfo && (
          <motion.div
            key={`held-${heldFlower.id}`}
            className="pointer-events-none fixed z-50"
            style={{
              left: heldFlower.x,
              top: heldFlower.y,
              transform: "translate(-50%, -75%)",
            }}
            initial={prefersReduced ? false : { scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { scale: 0.5, opacity: 0, transition: { duration: 0.15 } }}
            transition={
              prefersReduced
                ? { duration: 0.01 }
                : { type: "spring", stiffness: 400, damping: 25 }
            }
          >
            <div style={{ transform: `scale(${heldScale})`, transformOrigin: "bottom center" }}>
              <heldFlowerInfo.Component className="h-36 w-auto drop-shadow-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
