"use client";

import { type ReactNode, useCallback, useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import FrogSVG from "./FrogSVG";
import BillenSVG from "./BillenSVG";
import { type Locale, t } from "@/lib/i18n";

interface InsideContentProps {
  isOpen: boolean;
  frogOut: boolean;
  onFrogOut: () => void;
  topContent?: ReactNode;
  locale?: Locale;
}

export default function InsideContent({
  isOpen,
  frogOut,
  onFrogOut,
  topContent,
  locale = "nl",
}: InsideContentProps) {
  const controls = useAnimation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isOpen) {
      controls.set({ y: 0, scale: 1, rotate: 0 });
    }
  }, [isOpen, controls]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (info.offset.y < -50 || info.velocity.y < -300) {
        onFrogOut();
        controls.start({
          y: -150,
          scale: 1.15,
          transition: prefersReduced
            ? { duration: 0.01 }
            : { type: "spring", stiffness: 120, damping: 10, mass: 0.8 },
        });
      } else {
        controls.start({
          y: 0,
          scale: 1,
          transition: prefersReduced
            ? { duration: 0.01 }
            : { type: "spring", stiffness: 300, damping: 20 },
        });
      }
    },
    [onFrogOut, controls, prefersReduced],
  );

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-[#FFF8F0]">
      {topContent ? (
        <div className="absolute top-4 right-0 left-0 z-10">{topContent}</div>
      ) : (
        <p className="absolute top-6 right-0 left-0 text-center font-serif text-xl text-accent/80 md:text-2xl">
          1 April
        </p>
      )}

      <div className="relative" style={{ width: 200, height: 200 }}>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
          style={{ top: 15, zIndex: 0 }}
          drag={isOpen && !frogOut ? "y" : false}
          dragConstraints={{ top: -180, bottom: 10 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={controls}
          whileDrag={{ scale: 1.05 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
        >
          <motion.div
            animate={
              frogOut && !prefersReduced
                ? { rotate: [0, -3, 3, -2, 0] }
                : isOpen && !frogOut
                  ? { y: [0, -12, 0] }
                  : {}
            }
            transition={
              frogOut
                ? {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }
                : {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }
            }
          >
            <FrogSVG className="w-24 drop-shadow-lg md:w-28" />
          </motion.div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ top: 50, zIndex: 1 }}
        >
          <div className="absolute inset-0 bg-[#FFF8F0]" />
          <BillenSVG className="relative w-full" />
        </div>
      </div>

      <motion.p
        className="mt-1 text-center text-xs tracking-wider text-foreground/30 uppercase"
        animate={{
          opacity: isOpen && !frogOut ? [0.15, 0.5, 0.15] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {t("card.dragHint", locale)}
      </motion.p>

      <motion.p
        className="absolute bottom-6 right-0 left-0 text-center font-serif text-lg text-accent md:text-xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: frogOut ? 1 : 0,
          y: frogOut ? 0 : 10,
        }}
        transition={{ duration: 0.4, delay: frogOut ? 0.3 : 0 }}
      >
        Kikker in je bil!
      </motion.p>
    </div>
  );
}
