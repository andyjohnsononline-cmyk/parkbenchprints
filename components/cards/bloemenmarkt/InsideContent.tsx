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

interface LiftedFlower {
  id: string;
  originX: number;
  originY: number;
}

export default function InsideContent({
  isOpen,
  locale = "en",
}: InsideContentProps) {
  const prefersReduced = useReducedMotion();
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([]);
  const [bouquetMade, setBouquetMade] = useState(false);
  const [liftedFlower, setLiftedFlower] = useState<LiftedFlower | null>(null);
  const liftedFlowerRef = useRef<LiftedFlower | null>(null);
  const [rawSvg, setRawSvg] = useState<string>("");
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  // Fetch the SVG content on mount
  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    fetch(`${basePath}/market-scene-v3.svg`)
      .then((res) => res.text())
      .then((text) => {
        // Inject preserveAspectRatio directly into SVG markup
        const patched = text.replace(
          "<svg ",
          '<svg preserveAspectRatio="xMidYMid slice" '
        );
        setRawSvg(patched);
      })
      .catch(() => {});
  }, []);

  // Fix 3: Inject a11y attributes into the SVG string so they survive re-renders
  // (dangerouslySetInnerHTML resets DOM on every render, wiping setAttribute calls)
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

  const handlePick = useCallback((flowerId: string, x: number, y: number) => {
    setPlacedFlowers((prev) => {
      const instanceId = `${flowerId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      return [...prev, { id: flowerId, instanceId, x, y }];
    });
  }, []);

  const handleMakeBouquet = useCallback(() => {
    setBouquetMade(true);
  }, []);

  const handleReset = useCallback(() => {
    setPlacedFlowers([]);
    setBouquetMade(false);
  }, []);

  const handleRemoveFlower = useCallback((instanceId: string) => {
    setPlacedFlowers((prev) => prev.filter((f) => f.instanceId !== instanceId));
  }, []);

  // Click on SVG bucket → place flower directly into bouquet
  // (Simpler and more reliable than lift-then-drag for click interactions)
  const handleSvgClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isOpen) return;
      const target = e.target as Element;
      // Walk up to find a bucket group
      for (const bucketId of BUCKET_IDS) {
        const bucketEl = target.closest(`#${bucketId}`);
        if (bucketEl) {
          e.stopPropagation();
          // Dismiss any existing lifted flower
          if (liftedFlowerRef.current) {
            liftedFlowerRef.current = null;
            setLiftedFlower(null);
          }
          const rect = bucketEl.getBoundingClientRect();
          const lifted = {
            id: bucketId,
            originX: rect.left + rect.width / 2,
            originY: rect.top + rect.height * 0.3,
          };
          liftedFlowerRef.current = lifted;
          setLiftedFlower(lifted);
          return;
        }
      }
    },
    [isOpen]
  );

  // Keyboard support on bucket groups
  const handleSvgKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key !== "Enter" && e.key !== " ") return;
      const target = e.target as Element;
      const id = target.id;
      if (BUCKET_IDS.includes(id)) {
        e.preventDefault();
        e.stopPropagation();
        handlePick(id, 50, 50);
      }
    },
    [isOpen, handlePick]
  );

  // Drag end for lifted flower
  const handleDragEnd = useCallback(
    (_: unknown, info: { point: { x: number; y: number } }) => {
      const current = liftedFlowerRef.current;
      if (!paperRef.current || !current) {
        liftedFlowerRef.current = null;
        setLiftedFlower(null);
        return;
      }
      const paperRect = paperRef.current.getBoundingClientRect();
      const { x, y } = info.point;

      if (
        x >= paperRect.left &&
        x <= paperRect.right &&
        y >= paperRect.top &&
        y <= paperRect.bottom
      ) {
        const pctX = ((x - paperRect.left) / paperRect.width) * 100;
        const pctY = ((y - paperRect.top) / paperRect.height) * 100;
        handlePick(current.id, pctX, pctY);
      }
      liftedFlowerRef.current = null;
      setLiftedFlower(null);
    },
    [handlePick]
  );

  // Auto-dismiss lifted flower after timeout — just dismiss, don't place
  useEffect(() => {
    if (!liftedFlower) return;
    const timer = setTimeout(() => {
      liftedFlowerRef.current = null;
      setLiftedFlower(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [liftedFlower]);

  // Click on lifted flower → place in paper with slight random spread
  const handleLiftedClick = useCallback(() => {
    const current = liftedFlowerRef.current;
    if (current) {
      const count = placedFlowers.length;
      // Spread flowers across the paper area evenly with slight jitter
      const baseX = 25 + (count % 4) * 17;
      const baseY = 25 + Math.floor(count / 4) * 20;
      const jitterX = (Math.random() - 0.5) * 10;
      const jitterY = (Math.random() - 0.5) * 10;
      handlePick(current.id, baseX + jitterX, baseY + jitterY);
    }
    liftedFlowerRef.current = null;
    setLiftedFlower(null);
  }, [handlePick, placedFlowers.length]);

  // Resolve the flower component for the lifted flower
  const liftedFlowerInfo = liftedFlower
    ? FLOWERS.find((f) => f.id === liftedFlower.id)
    : null;

  return (
    <div className="relative flex h-full flex-col bg-[#FFF8F0]">
      {/* Full SVG scene — includes market stall and paper area */}
      <div className="relative flex-1" style={{ minHeight: 0 }}>
        <div
          ref={svgContainerRef}
          className="market-svg-container absolute inset-0 overflow-hidden"
          data-hint={isOpen && placedFlowers.length === 0 ? "true" : undefined}
          onClick={handleSvgClick}
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

        {/* Bouquet overlay — positioned over the market paper in the SVG scene
            (upper-right area). pointer-events: none so bucket clicks pass through */}
        <div
          ref={paperRef}
          className="pointer-events-none absolute z-10"
          style={{ left: "74%", top: "2%", width: "24%", height: "50%" }}
        >
          <PaperArea
            placedFlowers={placedFlowers}
            bouquetMade={bouquetMade}
            onMakeBouquet={handleMakeBouquet}
            onReset={handleReset}
            onRemoveFlower={handleRemoveFlower}
            locale={locale}
          />
        </div>
      </div>

      {/* Lifted flower — floating draggable element */}
      <AnimatePresence>
        {liftedFlower && liftedFlowerInfo && (
          <motion.div
            key={`lifted-${liftedFlower.id}`}
            className="pointer-events-auto fixed z-50 cursor-grab active:cursor-grabbing"
            style={{
              left: liftedFlower.originX,
              top: liftedFlower.originY,
              transform: "translate(-50%, -50%)",
              touchAction: "none",
            }}
            initial={prefersReduced ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
            transition={
              prefersReduced
                ? { duration: 0.01 }
                : { type: "spring", stiffness: 300, damping: 20 }
            }
            drag
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            whileDrag={prefersReduced ? {} : { scale: 1.05, zIndex: 60 }}
            onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
            onClick={handleLiftedClick}
          >
            <liftedFlowerInfo.Component className="h-auto w-12 drop-shadow-md" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
