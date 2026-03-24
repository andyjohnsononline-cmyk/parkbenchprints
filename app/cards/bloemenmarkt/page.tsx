"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import GatefoldShell from "@/components/cards/GatefoldShell";
import { FrontLeft, FrontRight } from "@/components/cards/bloemenmarkt/FrontCover";
import InsideContent from "@/components/cards/bloemenmarkt/InsideContent";

export default function BloemenmarktPage() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <section className={`relative min-h-screen overflow-hidden ${isOpen ? "pt-16 pb-10" : "pt-32 pb-20"}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header — hide when card is open to give max space */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="mx-auto mb-12 max-w-2xl px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/cards"
              className="mb-6 inline-block text-sm tracking-wide text-accent uppercase transition-opacity hover:opacity-70"
            >
              &larr; All Cards
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl">Flower Market</h1>
            <p className="mt-3 text-lg text-foreground/60">
              Tap the card to open it&hellip;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card container — expands when open */}
      <motion.div
        className="relative mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 0.5, delay: isOpen ? 0 : 0.2 }}
      >
        {/* Close button — visible when card is open */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              type="button"
              className="absolute -top-8 left-1/2 z-40 -translate-x-1/2 border-b border-foreground/30 pb-1 text-sm tracking-[0.15em] text-accent uppercase transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onClick={() => setIsOpen(false)}
            >
              &larr; Close card
            </motion.button>
          )}
        </AnimatePresence>

        <GatefoldShell
          open={isOpen}
          onOpenChange={handleOpenChange}
          disableToggle={isOpen}
          cardStyle={
            isOpen
              ? { width: "min(97vw, 1400px)", aspectRatio: "1776 / 764" }
              : { width: "min(80vw, 500px)", aspectRatio: "5 / 7" }
          }
          frontLeft={<FrontLeft />}
          frontRight={<FrontRight />}
          insideContent={<InsideContent isOpen={isOpen} />}
        />
      </motion.div>
    </section>
  );
}
