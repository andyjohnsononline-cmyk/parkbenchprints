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
  locale?: Locale;
}

export default function PaperArea({
  placedFlowers,
  bouquetMade,
  onMakeBouquet,
  onReset,
  locale = "nl",
}: PaperAreaProps) {
  const prefersReduced = useReducedMotion();
  const isEmpty = placedFlowers.length === 0;

  return (
    <div
      role="region"
      aria-label={locale === "nl" ? "Jouw boeket" : "Your bouquet"}
      className="pointer-events-none relative h-full w-full"
    >
      {/* Drop zone with paper texture and visual personality */}
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md"
        style={{
          background: isEmpty && !bouquetMade
            ? "linear-gradient(135deg, rgba(255,248,240,0.6) 0%, rgba(245,237,227,0.5) 100%)"
            : "linear-gradient(135deg, rgba(255,248,240,0.3) 0%, rgba(245,237,227,0.2) 100%)",
          boxShadow: "inset 0 2px 8px rgba(139, 115, 85, 0.08)",
        }}
      >
        {/* Dashed drop-target border — visible when empty, fades when flowers placed */}
        <AnimatePresence>
          {isEmpty && !bouquetMade && (
            <motion.div
              className="pointer-events-none absolute inset-2 rounded border border-dashed border-accent/20"
              initial={false}
              animate={{ opacity: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Subtle dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--foreground) 0.5px, transparent 0.5px)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Empty state hint — serif font for warmth */}
        {isEmpty && !bouquetMade && (
          <p className="relative z-10 font-serif text-sm tracking-wide text-foreground/20 italic">
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
                <FlowerComponent className="h-auto w-8" />
              </motion.div>
            );
          })}
      </div>

      {/* Controls below flowers */}
      {!isEmpty && (
        <motion.div
          className="pointer-events-auto mt-2 flex items-center justify-center gap-3"
          initial={prefersReduced ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReduced ? { duration: 0.01 } : { duration: 0.3 }
          }
        >
          <p className="text-xs tracking-wider text-foreground/40 uppercase">
            {placedFlowers.length}{" "}
            {placedFlowers.length === 1
              ? locale === "nl"
                ? "bloem"
                : "flower"
              : locale === "nl"
                ? "bloemen"
                : "flowers"}
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
          className="mt-2 text-center font-serif text-base text-accent"
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
}
