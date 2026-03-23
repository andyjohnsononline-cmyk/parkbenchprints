"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FLOWERS } from "./flowers";
import BouquetOpenSVG from "./flowers/BouquetOpenSVG";
import BouquetClosedSVG from "./flowers/BouquetClosedSVG";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export interface PlacedFlower {
  id: string;       // flower type id
  instanceId: string; // unique key for this placement
  x: number;        // percentage of drop zone width (0-100)
  y: number;        // percentage of drop zone height (0-100)
}

interface PaperAreaProps {
  placedFlowers: PlacedFlower[];
  bouquetMade: boolean;
  onMakeBouquet: () => void;
  onReset: () => void;
  locale?: Locale;
}

const PaperArea = forwardRef<HTMLDivElement, PaperAreaProps>(
  function PaperArea(
    { placedFlowers, bouquetMade, onMakeBouquet, onReset, locale = "nl" },
    ref,
  ) {
    const prefersReduced = useReducedMotion();
    const isEmpty = placedFlowers.length === 0;

    return (
      <div
        ref={ref}
        role="region"
        aria-label={locale === "nl" ? "Jouw boeket" : "Your bouquet"}
        className="relative"
        style={{ width: "100%", minHeight: 160 }}
      >
        {/* Bouquet wrapper as drop zone */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ width: "85%", height: 140 }}
        >
          {/* Open bouquet paper (drop target) */}
          <AnimatePresence mode="wait">
            {!bouquetMade ? (
              <motion.div
                key="open"
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <BouquetOpenSVG className={`h-full w-auto ${isEmpty ? "opacity-40" : "opacity-60"}`} />
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                className="absolute inset-0 flex items-center justify-center"
                initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={
                  prefersReduced
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 80, damping: 12 }
                }
              >
                <BouquetClosedSVG className="h-full w-auto" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state hint */}
          {isEmpty && !bouquetMade && (
            <p className="relative z-10 text-[10px] tracking-wider text-foreground/25 uppercase">
              {t("bloemen.paperHint", locale)}
            </p>
          )}

          {/* Placed flowers at free positions */}
          {!bouquetMade &&
            placedFlowers.map((placed, index) => {
              const flower = FLOWERS.find((f) => f.id === placed.id);
              if (!flower) return null;
              const FlowerComponent = flower.Component;

              return (
                <motion.div
                  key={placed.instanceId}
                  className="absolute"
                  style={{
                    left: `${placed.x}%`,
                    top: `${placed.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: index + 1,
                  }}
                  initial={prefersReduced ? false : { scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={
                    prefersReduced
                      ? { duration: 0.01 }
                      : { type: "spring", stiffness: 120, damping: 10, mass: 0.8 }
                  }
                >
                  <FlowerComponent className="h-auto w-8" />
                </motion.div>
              );
            })}

          {/* Flowers gathered inside closed bouquet */}
          {bouquetMade &&
            placedFlowers.map((placed, index) => {
              const flower = FLOWERS.find((f) => f.id === placed.id);
              if (!flower) return null;
              const FlowerComponent = flower.Component;
              // Stack flowers near center with slight offset
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
                  <FlowerComponent className="h-auto w-8" />
                </motion.div>
              );
            })}
        </div>

        {/* Controls below bouquet */}
        {!isEmpty && (
          <motion.div
            className="mt-2 flex items-center justify-center gap-3"
            initial={prefersReduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced ? { duration: 0.01 } : { duration: 0.3 }
            }
          >
            <p className="text-[10px] tracking-wider text-foreground/40 uppercase">
              {placedFlowers.length} {locale === "nl" ? "bloemen" : "flowers"}
            </p>

            {!bouquetMade && (
              <button
                type="button"
                className="rounded bg-accent/10 px-3 py-1 text-[10px] tracking-wider text-accent uppercase transition-colors hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-accent"
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
              className="text-[10px] tracking-wider text-accent/60 uppercase transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
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
            className="mt-1 text-center font-serif text-sm text-accent md:text-base"
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

        {/* Live region for screen reader */}
        <div aria-live="polite" className="sr-only">
          {placedFlowers.length > 0 &&
            (() => {
              const last = placedFlowers[placedFlowers.length - 1];
              const lastFlower = FLOWERS.find((f) => f.id === last?.id);
              if (!lastFlower) return null;
              return locale === "nl"
                ? `${lastFlower.name.nl} toegevoegd`
                : `${lastFlower.name.en} added`;
            })()}
        </div>
      </div>
    );
  },
);

export default PaperArea;
