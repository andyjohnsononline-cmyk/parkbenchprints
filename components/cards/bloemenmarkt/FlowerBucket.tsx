"use client";

import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FlowerInfo } from "./flowers";
import BucketSVG from "./flowers/BucketSVG";
import type { Locale } from "@/lib/i18n";

interface FlowerBucketProps {
  flower: FlowerInfo;
  index: number;
  isPicked: boolean;
  isOpen: boolean;
  onPick: (flowerId: string) => void;
  bouquetRef: React.RefObject<HTMLDivElement | null>;
  locale?: Locale;
}

export default function FlowerBucket({
  flower,
  index,
  isPicked,
  isOpen,
  onPick,
  bouquetRef,
  locale = "nl",
}: FlowerBucketProps) {
  const prefersReduced = useReducedMotion();
  const FlowerComponent = flower.Component;

  const handleDragEnd = useCallback(
    (_: unknown, info: { point: { x: number; y: number } }) => {
      if (!bouquetRef.current) return;
      const bouquetRect = bouquetRef.current.getBoundingClientRect();
      const { x, y } = info.point;

      if (
        x >= bouquetRect.left &&
        x <= bouquetRect.right &&
        y >= bouquetRect.top &&
        y <= bouquetRect.bottom
      ) {
        onPick(flower.id);
      }
    },
    [bouquetRef, onPick, flower.id],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isPicked || !isOpen) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        onPick(flower.id);
      }
    },
    [isPicked, isOpen, onPick, flower.id],
  );

  const ariaLabel =
    locale === "nl"
      ? `Pak ${flower.name.nl}`
      : `Pick ${flower.name.en}`;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        opacity: isPicked ? 0.4 : 1,
        transition: "opacity 0.3s ease",
        width: 52,
      }}
    >
      {/* Draggable flower */}
      {!isPicked && (
        <motion.div
          role="button"
          tabIndex={isOpen ? 0 : -1}
          aria-label={ariaLabel}
          className="cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded"
          drag={isOpen ? true : false}
          dragSnapToOrigin
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          whileDrag={prefersReduced ? {} : { scale: 1.05, zIndex: 50 }}
          onKeyDown={handleKeyDown}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
          style={{ touchAction: "none" }}
        >
          {/* Idle sway animation */}
          <motion.div
            animate={
              isOpen && !isPicked && !prefersReduced
                ? { rotate: [0, -2, 2, -1, 0] }
                : {}
            }
            transition={
              isOpen && !isPicked
                ? {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (index * 0.3) % 2,
                  }
                : {}
            }
          >
            <FlowerComponent className="w-10 h-auto drop-shadow-sm" />
          </motion.div>
        </motion.div>
      )}

      {/* Bucket underneath */}
      <BucketSVG className="w-12 h-auto -mt-2" />
    </div>
  );
}
