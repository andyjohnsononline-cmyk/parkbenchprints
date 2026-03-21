"use client";

import { motion } from "framer-motion";
import { type Locale, t } from "@/lib/i18n";

interface FrontCoverProps {
  locale?: Locale;
}

export default function FrontCover({ locale = "nl" }: FrontCoverProps) {
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
        {t("share.tapToOpen", locale)}
      </motion.p>
    </div>
  );
}
