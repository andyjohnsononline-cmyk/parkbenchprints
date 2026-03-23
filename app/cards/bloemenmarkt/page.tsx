"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GatefoldShell from "@/components/cards/GatefoldShell";
import { FrontLeft, FrontRight } from "@/components/cards/bloemenmarkt/FrontCover";
import InsideContent from "@/components/cards/bloemenmarkt/InsideContent";

export default function BloemenmarktPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        className="mx-auto mb-12 max-w-2xl px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/cards"
          className="mb-6 inline-block text-sm tracking-wide text-accent uppercase transition-opacity hover:opacity-70"
        >
          &larr; All Cards
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl">Bloemenmarkt</h1>
        <p className="mt-3 text-lg text-foreground/60">
          Tap the card to open it...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GatefoldShell
          onOpenChange={handleOpenChange}
          frontLeft={<FrontLeft />}
          frontRight={<FrontRight />}
          insideContent={<InsideContent isOpen={isOpen} />}
        />
      </motion.div>
    </section>
  );
}
