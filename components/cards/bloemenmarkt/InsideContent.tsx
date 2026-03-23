"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FLOWERS } from "./flowers";
import FlowerBucket from "./FlowerBucket";
import PaperArea, { type PlacedFlower } from "./PaperArea";
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
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([]);
  const [bouquetMade, setBouquetMade] = useState(false);
  const paperRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative flex h-full flex-col bg-[#FFF8F0]">
      {/* Market scene background — top portion */}
      <div className="relative flex-1" style={{ minHeight: 0 }}>
        {/* Scene SVG as background image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/market-scene.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Drag hint overlay */}
        <motion.p
          className="relative z-10 pt-2 text-center text-[10px] tracking-wider text-white/70 uppercase drop-shadow-sm"
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

        {/* Flower buckets overlaid on the scene */}
        <div className="relative z-10 flex h-full items-end justify-center px-2 pb-2">
          <div className="flex flex-wrap items-end justify-center gap-x-1 gap-y-1">
            {FLOWERS.map((flower, index) => (
              <FlowerBucket
                key={flower.id}
                flower={flower}
                index={index}
                isOpen={isOpen}
                onPick={handlePick}
                paperRef={paperRef}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto h-px w-16 bg-accent/20" />

      {/* Paper area — drop zone at bottom */}
      <div className="px-3 pb-3 pt-1">
        <PaperArea
          ref={paperRef}
          placedFlowers={placedFlowers}
          bouquetMade={bouquetMade}
          onMakeBouquet={handleMakeBouquet}
          onReset={handleReset}
          locale={locale}
        />
      </div>
    </div>
  );
}
