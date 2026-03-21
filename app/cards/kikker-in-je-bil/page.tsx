"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CardShell from "@/components/cards/CardShell";
import FrontCover from "@/components/cards/kikker/FrontCover";
import InsideContent from "@/components/cards/kikker/InsideContent";

export default function KikkerInJeBilPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [frogOut, setFrogOut] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) setFrogOut(false);
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
        <h1 className="font-serif text-4xl md:text-5xl">1 April</h1>
        <p className="mt-3 text-lg text-foreground/60">
          Tap the card to open it...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CardShell
          onOpenChange={handleOpenChange}
          frontCover={<FrontCover />}
          insideContent={
            <InsideContent
              isOpen={isOpen}
              frogOut={frogOut}
              onFrogOut={() => setFrogOut(true)}
            />
          }
        />
      </motion.div>

      <motion.p
        className="mt-10 text-center font-serif text-2xl text-accent md:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: frogOut ? 1 : 0, y: frogOut ? 0 : 10 }}
        transition={{ duration: 0.4, delay: frogOut ? 0.3 : 0 }}
      >
        Kikker in je bil!
      </motion.p>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: frogOut ? 1 : 0, y: frogOut ? 0 : 10 }}
        transition={{ duration: 0.4, delay: frogOut ? 0.6 : 0 }}
      >
        <Link
          href="/cards/kikker-in-je-bil/send"
          className="inline-block border-b border-foreground/30 pb-1 text-sm tracking-wide uppercase transition-colors hover:border-accent hover:text-accent"
        >
          Send this card to someone &rarr;
        </Link>
      </motion.div>
    </section>
  );
}
