"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface ShareLinkProps {
  url: string;
  locale: Locale;
}

function checkCanShare(): boolean {
  if (typeof navigator === "undefined") return false;
  return typeof navigator.share === "function";
}

export default function ShareLink({ url, locale }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const [canShare] = useState(checkCanShare);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      inputRef.current?.select();
    }
  }

  async function handleShare() {
    try {
      await navigator.share({
        title: "Park Bench Prints",
        text: t("share.tapToOpen", locale),
        url,
      });
    } catch {
      // User cancelled or share failed
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8 text-center"
    >
      <p className="mb-4 font-serif text-xl">
        {t("shareLink.title", locale)}
      </p>

      <div className="mx-auto flex max-w-md items-stretch gap-2">
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={url}
          className="min-w-0 flex-1 border-b border-foreground/20 bg-transparent px-2 py-3 text-sm text-foreground/70 outline-none"
          onFocus={(e) => e.target.select()}
        />
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm tracking-wide uppercase text-background transition-colors hover:bg-accent"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {t("shareLink.copied", locale)}
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                {t("shareLink.copy", locale)}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {canShare && (
        <button
          onClick={handleShare}
          className="mt-4 inline-block border-b border-foreground/30 pb-1 text-sm tracking-wide uppercase transition-colors hover:border-accent hover:text-accent"
        >
          {t("shareLink.share", locale)}
        </button>
      )}
    </motion.div>
  );
}
