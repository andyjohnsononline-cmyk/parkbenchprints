"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-36">
      <section className="mx-auto max-w-6xl px-6 pb-32 md:px-12 md:pb-48">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left column: info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-sm tracking-[0.3em] uppercase text-accent"
            >
              Contact
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl leading-tight md:text-5xl"
            >
              Let&apos;s talk
              <br />
              about your project
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 space-y-8"
            >
              <div>
                <p className="mb-1 text-sm tracking-wide uppercase text-foreground/50">
                  Visit us
                </p>
                <p className="leading-relaxed">
                  Grote Houtstraat 12
                  <br />
                  2011 SJ Haarlem
                  <br />
                  The Netherlands
                </p>
              </div>

              <div>
                <p className="mb-1 text-sm tracking-wide uppercase text-foreground/50">
                  Email
                </p>
                <a
                  href="mailto:hello@parkbenchprints.com"
                  className="border-b border-foreground/20 transition-colors hover:border-accent hover:text-accent"
                >
                  hello@parkbenchprints.com
                </a>
              </div>

              <div>
                <p className="mb-1 text-sm tracking-wide uppercase text-foreground/50">
                  Hours
                </p>
                <p className="leading-relaxed text-foreground/70">
                  Tuesday &ndash; Saturday
                  <br />
                  10:00 &ndash; 18:00
                </p>
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex aspect-video w-full items-center justify-center bg-secondary/50"
            >
              <p className="text-sm tracking-wide uppercase text-foreground/30">
                Map
              </p>
            </motion.div>
          </div>

          {/* Right column: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:pt-16"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
