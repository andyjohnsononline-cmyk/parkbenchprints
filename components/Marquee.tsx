"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  "Letterpress",
  "Risograph",
  "Screen Print",
  "Cotton Paper",
  "Giclée",
  "Zines",
  "Posters",
  "Stationery",
  "Art Prints",
  "Haarlem",
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-8">
      <span className="font-serif text-3xl whitespace-nowrap md:text-5xl">
        {item}
      </span>
      <span className="text-accent/40">&#x2022;</span>
    </span>
  ));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="overflow-hidden border-y border-secondary py-10 md:py-14"
    >
      <div className="animate-marquee flex w-max gap-8">
        {content}
        {content}
      </div>
    </motion.div>
  );
}
