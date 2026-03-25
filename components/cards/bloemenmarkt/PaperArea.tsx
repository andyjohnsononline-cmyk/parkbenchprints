"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FLOWERS } from "./flowers";
import BouquetClosedSVG from "./flowers/BouquetClosedSVG";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export interface PlacedFlower {
  id: string;       // flower type id (matches bucket group ID)
  instanceId: string; // unique key for this placement
  x: number;        // arrangement x position (percentage)
  y: number;        // arrangement y position (percentage)
  rotate: number;   // slight rotation for natural feel
}

interface PaperAreaProps {
  placedFlowers: PlacedFlower[];
  bouquetMade: boolean;
  onMakeBouquet: () => void;
  onReset: () => void;
  locale?: Locale;
}

// Fan positions: flowers fan outward from center, stems down, blooms up
// X = horizontal spread, Y = anchored near bottom so blooms overflow top
const FAN_POSITIONS = [
  { x: 50, y: 88, rotate: 0 },    // center
  { x: 38, y: 86, rotate: -12 },   // left
  { x: 62, y: 86, rotate: 10 },    // right
  { x: 28, y: 84, rotate: -18 },   // far left
  { x: 72, y: 84, rotate: 16 },    // far right
  { x: 45, y: 87, rotate: -6 },    // inner left
  { x: 55, y: 87, rotate: 5 },     // inner right
  { x: 33, y: 85, rotate: -14 },   // mid left
  { x: 67, y: 85, rotate: 12 },    // mid right
];

// Tighter positions for bouquet (paper wrapped)
const BOUQUET_POSITIONS = [
  { x: 50, y: 90, rotate: 0 },
  { x: 42, y: 88, rotate: -8 },
  { x: 58, y: 88, rotate: 7 },
  { x: 36, y: 87, rotate: -12 },
  { x: 64, y: 87, rotate: 10 },
  { x: 46, y: 89, rotate: -4 },
  { x: 54, y: 89, rotate: 3 },
  { x: 40, y: 88, rotate: -9 },
  { x: 60, y: 88, rotate: 8 },
];

/** Shared flower arrangement renderer — used for both fan and bouquet modes. */
function FlowerArrangement({
  flowers,
  positions,
  isBouquet,
  prefersReduced,
}: {
  flowers: PlacedFlower[];
  positions: typeof FAN_POSITIONS;
  isBouquet: boolean;
  prefersReduced: boolean | null;
}) {
  // For bouquet mode, sort by scale descending so tall flowers render first (back)
  // and short flowers render last (front / higher z-index)
  const ordered = isBouquet
    ? [...flowers].sort((a, b) => {
        const scaleA = FLOWERS.find((f) => f.id === a.id)?.scale ?? 1;
        const scaleB = FLOWERS.find((f) => f.id === b.id)?.scale ?? 1;
        return scaleB - scaleA; // tall first = lower z-index
      })
    : flowers;

  return (
    <>
      {ordered.map((placed, index) => {
        const flower = FLOWERS.find((f) => f.id === placed.id);
        if (!flower) return null;
        const FlowerComponent = flower.Component;
        const pos = positions[index % positions.length];
        const scale = flower.scale ?? 1;

        return (
          <motion.div
            key={placed.instanceId}
            className="absolute origin-bottom"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: index + 1,
            }}
            initial={
              prefersReduced
                ? false
                : isBouquet
                  ? { rotate: placed.rotate }
                  : { scale: 0.3, opacity: 0, rotate: 0 }
            }
            animate={{
              scale: 1,
              opacity: 1,
              rotate: pos.rotate,
              x: "-50%",
              y: "-100%",
            }}
            exit={prefersReduced ? { opacity: 0 } : { scale: 0.3, opacity: 0 }}
            transition={
              prefersReduced
                ? { duration: 0.01 }
                : isBouquet
                  ? { type: "spring", stiffness: 80, damping: 12, delay: index * 0.05 }
                  : { type: "spring", stiffness: 120, damping: 12, mass: 0.8 }
            }
          >
            <div style={{ transform: `scale(${scale})`, transformOrigin: "bottom center" }}>
              <FlowerComponent className="h-52 w-auto" />
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

export default function PaperArea({
  placedFlowers,
  bouquetMade,
  onMakeBouquet,
  onReset,
  locale = "en",
}: PaperAreaProps) {
  const prefersReduced = useReducedMotion();
  const isEmpty = placedFlowers.length === 0;

  const flowerCountText =
    placedFlowers.length === 1
      ? t("bloemen.flowerCount", locale).replace("{count}", "1")
      : t("bloemen.flowerCountPlural", locale).replace("{count}", String(placedFlowers.length));

  return (
    <div
      role="region"
      aria-label={locale === "nl" ? "Jouw boeket" : "Your bouquet"}
      className="pointer-events-none relative h-full w-full overflow-visible"
    >
      {/* Transparent overlay — the paper visual is part of the SVG scene */}
      <div className="relative flex h-full w-full items-end justify-center overflow-visible">
        {/* Empty state hint */}
        {isEmpty && !bouquetMade && (
          <p className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-serif text-sm tracking-wide text-foreground/30 italic">
            {t("bloemen.paperHint", locale)}
          </p>
        )}

        {/* Placed flowers — fan or bouquet arrangement */}
        <AnimatePresence>
          {!bouquetMade && (
            <FlowerArrangement
              flowers={placedFlowers}
              positions={FAN_POSITIONS}
              isBouquet={false}
              prefersReduced={prefersReduced}
            />
          )}
        </AnimatePresence>

        {bouquetMade && (
          <>
            <FlowerArrangement
              flowers={placedFlowers}
              positions={BOUQUET_POSITIONS}
              isBouquet={true}
              prefersReduced={prefersReduced}
            />
            {/* Bow placeholder — uses BouquetClosedSVG until artist delivers bow asset */}
            <motion.div
              className="absolute z-20"
              style={{ left: "30%", bottom: "15%", width: "40%" }}
              initial={prefersReduced ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                prefersReduced
                  ? { duration: 0.01 }
                  : { type: "spring", stiffness: 120, damping: 10, delay: 0.4 }
              }
            >
              <BouquetClosedSVG className="w-full" />
            </motion.div>
          </>
        )}

        {/* Controls positioned below the paper area so they don't cover art */}
        {!isEmpty && (
          <motion.div
            className="pointer-events-auto absolute -bottom-8 right-0 left-0 z-20 flex items-center justify-center gap-3"
            initial={prefersReduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced ? { duration: 0.01 } : { duration: 0.3 }
            }
          >
            <p className="text-xs tracking-wider text-foreground/50 uppercase">
              {flowerCountText}
            </p>

            {!bouquetMade && (
              <button
                type="button"
                className="rounded bg-accent/10 px-3 py-1 text-xs tracking-[0.1em] text-accent uppercase transition-colors hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  onMakeBouquet();
                }}
                onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
              >
                {t("bloemen.makeBouquet", locale)}
              </button>
            )}

            <button
              type="button"
              className="text-xs tracking-[0.1em] text-accent/60 uppercase transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
            >
              {t("bloemen.reset", locale)}
            </button>
          </motion.div>
        )}

        {/* Completion message */}
        {bouquetMade && (
          <motion.p
            className="absolute -bottom-16 right-0 left-0 z-20 text-center font-serif text-base text-accent"
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced
                ? { duration: 0.01 }
                : { type: "spring", stiffness: 120, damping: 10, delay: 0.3 }
            }
          >
            {t("bloemen.complete", locale)}
          </motion.p>
        )}
      </div>

      {/* Live region for screen reader */}
      <div aria-live="polite" className="sr-only">
        {bouquetMade
          ? t("bloemen.bouquetReady", locale)
          : placedFlowers.length > 0
            ? (() => {
                const last = placedFlowers[placedFlowers.length - 1];
                const lastFlower = FLOWERS.find((f) => f.id === last?.id);
                if (!lastFlower) return null;
                return `${lastFlower.name[locale]} added`;
              })()
            : null}
      </div>
    </div>
  );
}
