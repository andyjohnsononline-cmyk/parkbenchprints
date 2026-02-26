"use client";

import { motion, useAnimation, useReducedMotion, type Variants } from "framer-motion";
import { useState, useCallback, type ReactNode } from "react";

interface CardShellProps {
  frontCover: ReactNode;
  insideContent: ReactNode;
  popUpContent?: ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
}

const coverVariants: Variants = {
  closed: {
    rotateY: 0,
    transition: { type: "spring", stiffness: 60, damping: 16 },
  },
  open: {
    rotateY: -160,
    transition: { type: "spring", stiffness: 40, damping: 14 },
  },
};

const coverVariantsReduced: Variants = {
  closed: { rotateY: 0, transition: { duration: 0.01 } },
  open: { rotateY: -160, transition: { duration: 0.01 } },
};

export default function CardShell({
  frontCover,
  insideContent,
  popUpContent,
  onOpenChange,
  className = "",
}: CardShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const coverControls = useAnimation();
  const prefersReduced = useReducedMotion();

  const toggle = useCallback(() => {
    const next = !isOpen;
    setIsOpen(next);
    coverControls.start(next ? "open" : "closed");
    onOpenChange?.(next);
  }, [isOpen, coverControls, onOpenChange]);

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
          {/* Inside panel (revealed when cover opens) */}
          <div className="absolute inset-0 overflow-hidden rounded-lg bg-[#FFF8F0]">
            {insideContent}
          </div>

          {/* Pop-up content */}
          {popUpContent && (
            <div className="pointer-events-none absolute inset-0 z-10">
              {popUpContent}
            </div>
          )}

          {/* Front cover (folds open from right to left) */}
          <motion.div
            className="absolute inset-0 z-20 overflow-hidden rounded-lg"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              backfaceVisibility: "hidden",
            }}
            variants={prefersReduced ? coverVariantsReduced : coverVariants}
            initial="closed"
            animate={coverControls}
          >
            <div className="absolute inset-0 rounded-lg bg-[#FFF8F0] shadow-lg">
              {frontCover}
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 rounded-lg bg-[#F5EDE3]"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>
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
