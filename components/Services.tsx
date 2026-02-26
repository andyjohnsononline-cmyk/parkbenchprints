"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Letterpress",
    description:
      "Deep impressions on fine cotton paper. Business cards, invitations, and art prints with tactile beauty.",
  },
  {
    title: "Risograph",
    description:
      "Vibrant, layered prints with a handmade quality. Zines, posters, and limited-edition art at accessible prices.",
  },
  {
    title: "Fine Art Prints",
    description:
      "Giclée and screen prints on archival paper. Collaborating with artists to bring their vision to life.",
  },
  {
    title: "Stationery",
    description:
      "Notebooks, cards, and paper goods designed with intention. Everyday objects made exceptional.",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-secondary/30 px-6 py-32 md:px-12 md:py-48">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-sm tracking-[0.3em] uppercase text-accent"
        >
          What we do
        </motion.p>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.12,
                ease: "easeOut",
              }}
              className="group"
            >
              <h3 className="font-serif text-2xl transition-colors group-hover:text-accent md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-4 leading-relaxed text-foreground/60">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
