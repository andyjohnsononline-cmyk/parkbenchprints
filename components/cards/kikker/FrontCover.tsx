"use client";

import { motion } from "framer-motion";
import { type Locale, t } from "@/lib/i18n";

export type KikkerVariant = "banana" | "duck";

interface FrontCoverProps {
  variant: KikkerVariant;
  locale?: Locale;
}

const variantConfig: Record<
  KikkerVariant,
  { bg: string; svg: string }
> = {
  banana: { bg: "#9facd8", svg: "banana-boxers.svg" },
  duck: { bg: "#c7e5d0", svg: "duck-boxers.svg" },
};

export default function FrontCover({ variant, locale = "nl" }: FrontCoverProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const config = variantConfig[variant];

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
      style={{ backgroundColor: config.bg }}
    >
      <img
        src={`${basePath}/kikker/${config.svg}`}
        alt=""
        className="h-[70%] w-auto object-contain"
        draggable={false}
      />
      <motion.p
        className="absolute bottom-4 text-xs tracking-wider text-foreground/40 uppercase"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {t("share.tapToOpen", locale)}
      </motion.p>
    </div>
  );
}
