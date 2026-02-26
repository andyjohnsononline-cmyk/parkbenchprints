"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CardShell from "@/components/cards/CardShell";
import PopUpElement from "@/components/cards/PopUpElement";
import FrogSVG from "@/components/cards/kikker/FrogSVG";
import BillenSVG from "@/components/cards/kikker/BillenSVG";

export default function KikkerInJeBilPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
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

      {/* Interactive card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CardShell
          onOpenChange={setIsOpen}
          frontCover={<FrontCover />}
          insideContent={<InsideContent />}
          popUpContent={
            <div className="flex h-full items-center justify-center">
              <PopUpElement isOpen={isOpen} delay={0.4} className="z-20">
                <FrogSVG className="w-28 drop-shadow-lg md:w-36" />
              </PopUpElement>
            </div>
          }
        />
      </motion.div>

      {/* Reveal text */}
      <motion.p
        className="mt-10 text-center font-serif text-2xl text-accent md:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
        transition={{ duration: 0.4, delay: isOpen ? 0.6 : 0 }}
      >
        Kikker in je bil!
      </motion.p>
    </section>
  );
}

function FrontCover() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#FFF8F0] to-[#F5EDE3] p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%23000'/%3E%3C/svg%3E\")",
        }}
      />

      <p className="mb-2 text-sm tracking-[0.3em] text-foreground/40 uppercase">
        Park Bench Prints
      </p>

      <div className="my-6 text-center">
        <p className="font-serif text-5xl leading-tight text-accent md:text-6xl">
          1 April
        </p>
      </div>

      <div className="my-4 h-px w-24 bg-accent/30" />

      <motion.p
        className="mt-auto text-xs tracking-wider text-foreground/30 uppercase"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Tik om te openen
      </motion.p>
    </div>
  );
}

function InsideContent() {
  return (
    <div className="flex h-full flex-col items-center justify-between bg-[#FFF8F0] p-6">
      <p className="pt-4 text-center font-serif text-xl leading-relaxed text-accent/80 md:text-2xl">
        1 April
      </p>

      <BillenSVG className="w-full max-w-[200px] opacity-70" />

      <p className="pb-4 text-center font-serif text-2xl text-accent md:text-3xl">
        Kikker in je bil!
      </p>
    </div>
  );
}
