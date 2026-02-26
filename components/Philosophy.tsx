"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const words = [
  "We believe in the quiet power of print.",
  "Every sheet of paper holds possibility —",
  "a texture you can feel, an impression that lasts.",
  "In a world of screens, we make things you can touch.",
];

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="philosophy"
      ref={ref}
      className="mx-auto max-w-4xl px-6 py-32 md:px-12 md:py-48"
    >
      <div className="space-y-4 md:space-y-6">
        {words.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: "easeOut",
            }}
            className="font-serif text-2xl leading-relaxed md:text-3xl lg:text-4xl"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
