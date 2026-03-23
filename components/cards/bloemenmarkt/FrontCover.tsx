"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type Locale, t } from "@/lib/i18n";

interface FrontCoverProps {
  locale?: Locale;
}

const paperTexture =
  "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%23000'/%3E%3C/svg%3E\")";

/**
 * Left half of the gatefold cover.
 */
export function FrontLeft({ locale = "nl" }: FrontCoverProps) {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-br from-[#FFF8F0] to-[#F5EDE3]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: paperTexture }}
      />
      {/* Spacer to vertically center title area */}
      <div className="flex-1" />
      {/* Title block — aligned to right edge to meet center seam */}
      <div className="px-6 pr-2 text-right">
        <p className="mb-1 text-[10px] tracking-[0.3em] text-foreground/40 uppercase">
          Park Bench
        </p>
        <p className="font-serif text-2xl leading-tight text-accent md:text-3xl">
          Bloemen
        </p>
      </div>
      <div className="flex-1" />
    </div>
  );
}

/**
 * Right half of the gatefold cover.
 */
export function FrontRight({ locale = "nl" }: FrontCoverProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative flex h-full flex-col bg-gradient-to-bl from-[#FFF8F0] to-[#F5EDE3]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: paperTexture }}
      />
      {/* Spacer to vertically center title area */}
      <div className="flex-1" />
      {/* Title block — aligned to left edge to meet center seam */}
      <div className="px-6 pl-2 text-left">
        <p className="mb-1 text-[10px] tracking-[0.3em] text-foreground/40 uppercase">
          Prints
        </p>
        <p className="font-serif text-2xl leading-tight text-accent md:text-3xl">
          markt
        </p>
      </div>
      <div className="flex-1" />
      {/* Tap hint at bottom */}
      <div className="px-4 pb-4">
        <motion.p
          className="text-center text-[10px] tracking-wider text-foreground/30 uppercase"
          animate={prefersReduced ? { opacity: 0.5 } : { opacity: [0.3, 0.7, 0.3] }}
          transition={prefersReduced ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("share.tapToOpen", locale)}
        </motion.p>
      </div>
    </div>
  );
}

export default function FrontCover({ locale = "nl" }: FrontCoverProps) {
  return <FrontLeft locale={locale} />;
}
