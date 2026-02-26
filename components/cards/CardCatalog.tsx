"use client";

import { motion } from "framer-motion";
import { cards } from "./cardRegistry";
import CardPreview from "./CardPreview";

export default function CardCatalog() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="font-serif text-4xl md:text-5xl">Card Experiences</h1>
        <p className="mt-4 text-lg text-foreground/60">
          Interactive cards you can explore on screen — and collect in print.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <CardPreview key={card.slug} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
