"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FLOWERS } from "./flowers";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export interface PlacedFlower {
  id: string;       // flower type id (matches bucket group ID)
  instanceId: string; // unique key for this placement
  x: number;        // percentage of drop zone width (0-100)
  y: number;        // percentage of drop zone height (0-100)
}

interface PaperAreaProps {
  placedFlowers: PlacedFlower[];
  bouquetMade: boolean;
  onMakeBouquet: () => void;
  onReset: () => void;
  onRemoveFlower?: (instanceId: string) => void;
  locale?: Locale;
}

export default function PaperArea({
  placedFlowers,
  bouquetMade,
  onMakeBouquet,
  onReset,
  onRemoveFlower,
  locale = "en",
}: PaperAreaProps) {
  const prefersReduced = useReducedMotion();
  const isEmpty = placedFlowers.length === 0;

  return (
    <div
      role="region"
      aria-label={locale === "nl" ? "Jouw boeket" : "Your bouquet"}
      className="pointer-events-none relative h-full w-full"
    >
      {/* Transparent overlay — the paper visual is part of the SVG scene (cls-53) */}
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Empty state hint */}
        {isEmpty && !bouquetMade && (
          <p className="relative z-10 font-serif text-sm tracking-wide text-foreground/30 italic">
            {t("bloemen.paperHint", locale)}
          </p>
        )}

        {/* Placed flowers at free positions */}
        <AnimatePresence>
        {!bouquetMade &&
          placedFlowers.map((placed, index) => {
            const flower = FLOWERS.find((f) => f.id === placed.id);
            if (!flower) return null;
            const FlowerComponent = flower.Component;

            return (
              <motion.div
                key={placed.instanceId}
                className="pointer-events-auto absolute cursor-pointer"
                style={{
                  left: `${placed.x}%`,
                  top: `${placed.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: index + 1,
                }}
                initial={prefersReduced ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={prefersReduced ? { opacity: 0 } : { scale: 0.3, opacity: 0 }}
                transition={
                  prefersReduced
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 120, damping: 10, mass: 0.8 }
                }
                whileHover={{ scale: 1.15 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFlower?.(placed.instanceId);
                }}
                title={locale === "nl" ? "Klik om te verwijderen" : "Click to remove"}
              >
                <FlowerComponent className="h-16 w-auto" />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Flowers gathered in bouquet */}
        {bouquetMade &&
          placedFlowers.map((placed, index) => {
            const flower = FLOWERS.find((f) => f.id === placed.id);
            if (!flower) return null;
            const FlowerComponent = flower.Component;
            const total = placedFlowers.length;
            const spreadX = total === 1 ? 50 : 35 + (index / (total - 1)) * 30;
            const spreadY = 20 + (index % 3) * 10;

            return (
              <motion.div
                key={placed.instanceId}
                className="absolute"
                style={{
                  left: `${spreadX}%`,
                  top: `${spreadY}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: index + 1,
                }}
                initial={prefersReduced ? false : { x: 0, y: 0 }}
                animate={{ x: 0, y: 0 }}
                transition={
                  prefersReduced
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 80, damping: 12, delay: index * 0.05 }
                }
              >
                <FlowerComponent className="h-16 w-auto" />
              </motion.div>
            );
          })}

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
              {placedFlowers.length}{" "}
              {placedFlowers.length === 1 ? "flower" : "flowers"}
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
        {placedFlowers.length > 0 &&
          (() => {
            const last = placedFlowers[placedFlowers.length - 1];
            const lastFlower = FLOWERS.find((f) => f.id === last?.id);
            if (!lastFlower) return null;
            return `${lastFlower.name.en} added`;
          })()}
      </div>
    </div>
  );
}
