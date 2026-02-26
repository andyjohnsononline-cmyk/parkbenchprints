"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-28 md:pt-36">
      {/* Header */}
      <section className="mx-auto max-w-4xl px-6 pb-20 md:px-12 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm tracking-[0.3em] uppercase text-accent"
        >
          About us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl"
        >
          A small studio with
          <br />
          a big love for paper
        </motion.h1>
      </section>

      {/* Story */}
      <section
        ref={storyRef}
        className="mx-auto grid max-w-6xl gap-12 px-6 pb-32 md:grid-cols-2 md:gap-20 md:px-12 md:pb-48"
      >
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={storyInView ? "visible" : "hidden"}
        >
          <div className="aspect-[4/5] w-full bg-secondary/50 flex items-center justify-center">
            <p className="text-sm text-foreground/30 tracking-wide uppercase">
              Studio photo
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col justify-center space-y-6">
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            className="text-lg leading-relaxed text-foreground/70"
          >
            Park Bench Prints was born from a simple idea: that printed matter
            should be as considered and beautiful as the messages it carries. From
            our studio near the Grote Markt in Haarlem, we craft letterpress,
            risograph, and fine art prints for people who value quality and care.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            className="text-lg leading-relaxed text-foreground/70"
          >
            We work with artists, designers, and businesses across the
            Netherlands and beyond, bringing their ideas to life on paper you can
            feel. Every project begins with a conversation and ends with
            something worth keeping.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            className="text-lg leading-relaxed text-foreground/70"
          >
            Named after the park benches along the Spaarne where we first
            sketched our plans, our studio is a place where craft meets intention
            — a slow, deliberate approach to making things in a fast-moving world.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section
        ref={valuesRef}
        className="bg-secondary/30 px-6 py-32 md:px-12 md:py-48"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="mb-16 text-sm tracking-[0.3em] uppercase text-accent"
          >
            Our values
          </motion.p>

          <div className="grid gap-12 md:grid-cols-3 md:gap-16">
            {[
              {
                title: "Craft",
                text: "Every piece is made with hands-on attention. We choose techniques that honour the material and the message.",
              },
              {
                title: "Sustainability",
                text: "We use FSC-certified and recycled papers, soy-based inks, and processes that respect the environment.",
              },
              {
                title: "Collaboration",
                text: "The best work comes from genuine partnership. We listen, advise, and iterate until it feels exactly right.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={valuesInView ? "visible" : "hidden"}
              >
                <h3 className="font-serif text-2xl">{value.title}</h3>
                <p className="mt-4 leading-relaxed text-foreground/60">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
