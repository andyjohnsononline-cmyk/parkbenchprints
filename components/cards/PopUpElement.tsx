"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface PopUpElementProps {
  isOpen: boolean;
  children: ReactNode;
  delay?: number;
  className?: string;
}

const popUpVariants: Variants = {
  hidden: {
    scaleY: 0,
    y: 40,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  visible: {
    scaleY: 1,
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 8,
      mass: 0.6,
    },
  },
};

const wobbleVariants: Variants = {
  idle: {
    rotate: [0, -3, 3, -2, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function PopUpElement({
  isOpen,
  children,
  delay = 0.3,
  className = "",
}: PopUpElementProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={`origin-bottom ${className}`}
      variants={popUpVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      transition={{
        delay: isOpen ? delay : 0,
        ...(prefersReduced ? { duration: 0.01 } : {}),
      }}
    >
      <motion.div
        variants={prefersReduced ? undefined : wobbleVariants}
        animate={isOpen && !prefersReduced ? "idle" : undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
