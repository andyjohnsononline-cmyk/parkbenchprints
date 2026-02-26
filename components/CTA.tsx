"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl"
        >
          Have a project in mind?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-md text-foreground/60"
        >
          We&apos;d love to hear about it. Whether it&apos;s a small run of
          business cards or a large-scale art print, let&apos;s make something
          beautiful together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
        </motion.div>
      </div>
    </section>
  );
}
