"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FLOWERS } from "./flowers";
import FlowerBucket from "./FlowerBucket";
import BouquetArea from "./BouquetArea";
import BouquetOpenSVG from "./flowers/BouquetOpenSVG";
import { type Locale, t } from "@/lib/i18n";

interface InsideContentProps {
  isOpen: boolean;
  locale?: Locale;
}

export default function InsideContent({
  isOpen,
  locale = "nl",
}: InsideContentProps) {
  const prefersReduced = useReducedMotion();
  const [pickedFlowers, setPickedFlowers] = useState<string[]>([]);
  const bouquetRef = useRef<HTMLDivElement>(null);

  const handlePick = useCallback((flowerId: string) => {
    setPickedFlowers((prev) => {
      if (prev.includes(flowerId)) return prev;
      return [...prev, flowerId];
    });
  }, []);

  const handleReset = useCallback(() => {
    setPickedFlowers([]);
  }, []);

  const allPicked = pickedFlowers.length === FLOWERS.length;

  return (
    <div className="relative flex h-full flex-col bg-[#FFF8F0]">
      {/* Title */}
      <p className="pt-4 pb-1 text-center font-serif text-xl text-accent/80 md:text-2xl">
        Bloemenmarkt
      </p>

      {/* Drag hint */}
      <motion.p
        className="text-center text-xs tracking-wider text-foreground/30 uppercase"
        animate={{
          opacity: isOpen && pickedFlowers.length === 0 ? [0.15, 0.5, 0.15] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {t("bloemen.dragHint", locale)}
      </motion.p>

      {/* Market scene — flower buckets in a grid */}
      <div
        className="flex-1 flex items-center justify-center px-2 py-1"
        style={{ minHeight: 0 }}
      >
        <div className="flex flex-wrap items-end justify-center gap-x-1 gap-y-2">
          {FLOWERS.map((flower, index) => (
            <FlowerBucket
              key={flower.id}
              flower={flower}
              index={index}
              isPicked={pickedFlowers.includes(flower.id)}
              isOpen={isOpen}
              onPick={handlePick}
              bouquetRef={bouquetRef}
              locale={locale}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto h-px w-16 bg-accent/20" />

      {/* Bouquet area — drop zone at bottom */}
      <div className="relative px-4 pb-4">
        {/* Bouquet wrapper paper behind the flowers */}
        {pickedFlowers.length > 0 && (
          <div className="absolute inset-x-8 bottom-2 flex justify-center">
            <BouquetOpenSVG className="w-36 h-auto opacity-60" />
          </div>
        )}
        <BouquetArea
          ref={bouquetRef}
          pickedFlowers={pickedFlowers}
          locale={locale}
        />

        {/* Counter + reset */}
        {pickedFlowers.length > 0 && (
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={prefersReduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced
                ? { duration: 0.01 }
                : { duration: 0.3 }
            }
          >
            <p className="text-xs tracking-wider text-foreground/40 uppercase">
              {pickedFlowers.length}/{FLOWERS.length}
            </p>
            <button
              type="button"
              className="text-xs tracking-wider text-accent/60 uppercase transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
            >
              {t("bloemen.reset", locale)}
            </button>
          </motion.div>
        )}

        {/* Completion message */}
        {allPicked && (
          <motion.p
            className="mt-1 text-center font-serif text-lg text-accent md:text-xl"
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
    </div>
  );
}
