"use client";

import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FlowerInfo } from "./flowers";
import BucketSVG from "./flowers/BucketSVG";
import type { Locale } from "@/lib/i18n";

interface FlowerBucketProps {
  flower: FlowerInfo;
  index: number;
  isOpen: boolean;
  onPick: (flowerId: string, x: number, y: number) => void;
  paperRef: React.RefObject<HTMLDivElement | null>;
  locale?: Locale;
}

export default function FlowerBucket({
  flower,
  index,
  isOpen,
  onPick,
  paperRef,
  locale = "nl",
}: FlowerBucketProps) {
  const prefersReduced = useReducedMotion();
  const FlowerComponent = flower.Component;

  const handleDragEnd = useCallback(
    (_: unknown, info: { point: { x: number; y: number } }) => {
      if (!paperRef.current) return;
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
        onPick(flower.id, pctX, pctY);
      }
    },
    [paperRef, onPick, flower.id],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        onPick(flower.id, 50, 50);
      }
    },
    [isOpen, onPick, flower.id],
  );

  const ariaLabel =
    locale === "nl"
      ? `Pak ${flower.name.nl}`
      : `Pick ${flower.name.en}`;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: 52 }}
    >
      {/* Draggable flower */}
      <motion.div
        role="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label={ariaLabel}
        className="cursor-grab rounded active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        drag={isOpen ? true : false}
        dragSnapToOrigin
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        whileDrag={prefersReduced ? {} : { scale: 1.05, zIndex: 50 }}
        onKeyDown={handleKeyDown}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          if (isOpen) onPick(flower.id, 50, 50);
        }}
        onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
        style={{ touchAction: "none" }}
      >
        {/* Idle sway animation */}
        <motion.div
          animate={
            isOpen && !prefersReduced
              ? { rotate: [0, -2, 2, -1, 0] }
              : {}
          }
          transition={
            isOpen
              ? {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (index * 0.3) % 2,
                }
              : {}
          }
        >
          <FlowerComponent className="h-auto w-10 drop-shadow-sm" />
        </motion.div>
      </motion.div>

      {/* Bucket underneath */}
      <BucketSVG className="-mt-2 h-auto w-12" />
    </div>
  );
}
