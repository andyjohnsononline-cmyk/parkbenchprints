"use client";

import {
  motion,
  useAnimation,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useState, useCallback, type ReactNode } from "react";

interface GatefoldShellProps {
  frontLeft: ReactNode;
  frontRight: ReactNode;
  insideContent: ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
}

const leftPanelVariants: Variants = {
  closed: {
    rotateY: 0,
    transition: { type: "spring", stiffness: 60, damping: 16 },
  },
  open: {
    rotateY: -160,
    transition: { type: "spring", stiffness: 40, damping: 14 },
  },
};

const rightPanelVariants: Variants = {
  closed: {
    rotateY: 0,
    transition: { type: "spring", stiffness: 60, damping: 16 },
  },
  open: {
    rotateY: 160,
    transition: { type: "spring", stiffness: 40, damping: 14 },
  },
};

const leftPanelVariantsReduced: Variants = {
  closed: { rotateY: 0, transition: { duration: 0.01 } },
  open: { rotateY: -160, transition: { duration: 0.01 } },
};

const rightPanelVariantsReduced: Variants = {
  closed: { rotateY: 0, transition: { duration: 0.01 } },
  open: { rotateY: 160, transition: { duration: 0.01 } },
};

export default function GatefoldShell({
  frontLeft,
  frontRight,
  insideContent,
  onOpenChange,
  className = "",
}: GatefoldShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const prefersReduced = useReducedMotion();

  const toggle = useCallback(() => {
    const next = !isOpen;
    setIsOpen(next);
    controls.start(next ? "open" : "closed");
    onOpenChange?.(next);
  }, [isOpen, controls, onOpenChange]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: "1200px" }}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-label={isOpen ? "Close card" : "Open card"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div
          className="relative rounded-lg shadow-2xl"
          style={{
            width: "min(80vw, 500px)",
            aspectRatio: "5 / 7",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Inside panel (revealed when covers open) */}
          <div className="absolute inset-0 overflow-hidden rounded-lg bg-[#FFF8F0]">
            {insideContent}
          </div>

          {/* Left cover panel — hinges on left edge, opens leftward */}
          <motion.div
            className="absolute inset-y-0 left-0 z-20 w-1/2 overflow-hidden rounded-l-lg"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              backfaceVisibility: "hidden",
            }}
            variants={
              prefersReduced ? leftPanelVariantsReduced : leftPanelVariants
            }
            initial="closed"
            animate={controls}
          >
            <div className="absolute inset-0 bg-[#FFF8F0] shadow-lg">
              {frontLeft}
            </div>
            {/* Back face of left panel */}
            <div
              className="absolute inset-0 bg-[#F5EDE3]"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          {/* Right cover panel — hinges on right edge, opens rightward */}
          <motion.div
            className="absolute inset-y-0 right-0 z-20 w-1/2 overflow-hidden rounded-r-lg"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "right center",
              backfaceVisibility: "hidden",
            }}
            variants={
              prefersReduced ? rightPanelVariantsReduced : rightPanelVariants
            }
            initial="closed"
            animate={controls}
          >
            <div className="absolute inset-0 bg-[#FFF8F0] shadow-lg">
              {frontRight}
            </div>
            {/* Back face of right panel */}
            <div
              className="absolute inset-0 bg-[#F5EDE3]"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          {/* Center seam line (visible when closed) */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-px bg-accent/15"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Surface shadow */}
        <div
          className="mx-auto mt-2 h-4 rounded-full bg-black/10 blur-md"
          style={{ width: "80%" }}
        />
      </div>
    </div>
  );
}
