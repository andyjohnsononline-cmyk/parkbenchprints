"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FLOWERS } from "./flowers";
import type { Locale } from "@/lib/i18n";

interface BouquetAreaProps {
  pickedFlowers: string[];
  locale?: Locale;
}

function getBouquetPosition(index: number, total: number) {
  const rotationRange = 30; // -15deg to +15deg
  const horizontalRange = 60; // -30px to +30px
  const verticalStep = 8;

  const rotation =
    total === 1 ? 0 : -rotationRange / 2 + (index / (total - 1)) * rotationRange;
  const x =
    total === 1 ? 0 : -horizontalRange / 2 + (index / (total - 1)) * horizontalRange;
  const y = -index * verticalStep;

  return { rotation, x, y };
}

const BouquetArea = forwardRef<HTMLDivElement, BouquetAreaProps>(
  function BouquetArea({ pickedFlowers, locale = "nl" }, ref) {
    const prefersReduced = useReducedMotion();
    const isEmpty = pickedFlowers.length === 0;

    return (
      <div
        ref={ref}
        role="region"
        aria-label={locale === "nl" ? "Jouw boeket" : "Your bouquet"}
        className="relative flex items-center justify-center"
        style={{ width: "100%", height: 140, minHeight: 120 }}
      >
        {/* Empty state affordance — dotted outline */}
        {isEmpty && (
          <div className="absolute inset-4 rounded-lg border-2 border-dashed border-accent/20 flex items-center justify-center">
            <p className="text-xs tracking-wider text-foreground/20 uppercase">
              {locale === "nl" ? "Sleep bloemen hierheen" : "Drag flowers here"}
            </p>
          </div>
        )}

        {/* Bouquet wrapper */}
        <div className="relative" style={{ width: 160, height: 120 }}>
          {pickedFlowers.map((flowerId, index) => {
            const flower = FLOWERS.find((f) => f.id === flowerId);
            if (!flower) return null;
            const { rotation, x, y } = getBouquetPosition(index, pickedFlowers.length);
            const FlowerComponent = flower.Component;

            return (
              <motion.div
                key={flowerId}
                className="absolute left-1/2 bottom-2"
                initial={prefersReduced ? false : { scale: 0.5, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: x - 20,
                  y,
                  rotate: rotation,
                }}
                transition={
                  prefersReduced
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 120, damping: 10, mass: 0.8 }
                }
                style={{ zIndex: index, originX: "50%", originY: "100%" }}
              >
                <FlowerComponent className="w-10 h-auto" />
              </motion.div>
            );
          })}
        </div>

        {/* Live region for screen reader announcements */}
        <div aria-live="polite" className="sr-only">
          {pickedFlowers.length > 0 &&
            (() => {
              const lastFlower = FLOWERS.find(
                (f) => f.id === pickedFlowers[pickedFlowers.length - 1],
              );
              if (!lastFlower) return null;
              return locale === "nl"
                ? `${lastFlower.name.nl} toegevoegd aan je boeket`
                : `${lastFlower.name.en} added to your bouquet`;
            })()}
        </div>
      </div>
    );
  },
);

export default BouquetArea;
