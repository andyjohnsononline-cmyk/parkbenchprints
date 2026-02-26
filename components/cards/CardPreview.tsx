"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CardInfo } from "./cardRegistry";

interface CardPreviewProps {
  card: CardInfo;
  index: number;
}

export default function CardPreview({ card, index }: CardPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/cards/${card.slug}`}
        className="group block"
        aria-label={`Open ${card.title} card experience`}
      >
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#FFF8F0] to-[#F0E8DC] shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          style={{ aspectRatio: "5 / 7" }}
        >
          {/* Paper texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="flex h-full flex-col items-center justify-center p-8">
            {card.date && (
              <p className="mb-2 text-sm tracking-[0.2em] text-foreground/40 uppercase">
                {card.date}
              </p>
            )}
            <h3 className="text-center font-serif text-2xl text-accent transition-colors group-hover:text-foreground md:text-3xl">
              {card.title}
            </h3>
            <div className="mt-4 h-px w-16 bg-accent/30 transition-all duration-300 group-hover:w-24" />
            <p className="mt-4 text-center text-sm text-foreground/50">
              {card.description}
            </p>
          </div>

          {/* Corner fold effect */}
          <div className="absolute right-0 bottom-0 h-8 w-8">
            <div
              className="absolute right-0 bottom-0 h-full w-full bg-secondary transition-all duration-300 group-hover:h-10 group-hover:w-10"
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              }}
            />
          </div>

          {!card.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <p className="text-sm tracking-wider text-foreground/40 uppercase">
                Coming Soon
              </p>
            </div>
          )}
        </div>

        <p className="mt-3 text-center text-xs tracking-wide text-foreground/40 uppercase">
          {card.subtitle}
        </p>
      </Link>
    </motion.div>
  );
}
