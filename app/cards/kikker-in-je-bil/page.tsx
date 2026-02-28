"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import Link from "next/link";
import CardShell from "@/components/cards/CardShell";
import FrogSVG from "@/components/cards/kikker/FrogSVG";
import BillenSVG from "@/components/cards/kikker/BillenSVG";

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

interface InsideContentProps {
  isOpen: boolean;
  frogOut: boolean;
  onFrogOut: () => void;
}

function InsideContent({ isOpen, frogOut, onFrogOut }: InsideContentProps) {
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
      <p className="absolute top-6 right-0 left-0 text-center font-serif text-xl text-accent/80 md:text-2xl">
        1 April
      </p>

      {/* Frog + billen interactive area */}
      <div className="relative" style={{ width: 200, height: 200 }}>
        {/* Frog: behind the billen, draggable upward */}
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
                  ? { y: [0, -5, 0] }
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

        {/* Billen: on top with opaque backing to hide the frog's body */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ top: 50, zIndex: 1 }}
        >
          <div className="absolute inset-0 bg-[#FFF8F0]" />
          <BillenSVG className="relative w-full" />
        </div>
      </div>

      {/* Pull hint */}
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
        ↑ Trek eruit!
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
