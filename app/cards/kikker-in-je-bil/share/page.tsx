"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CardShell from "@/components/cards/CardShell";
import FrontCover, {
  type KikkerVariant,
} from "@/components/cards/kikker/FrontCover";
import InsideContent from "@/components/cards/kikker/InsideContent";
import PersonalMessage from "@/components/cards/PersonalMessage";
import { decode } from "@/lib/shareCodec";
import { type Locale, t } from "@/lib/i18n";

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getHash() {
  return window.location.hash;
}

function getServerHash() {
  return "";
}

export default function SharePage() {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const shareData = hash ? decode(hash) : null;
  const [isOpen, setIsOpen] = useState(false);

  const locale: Locale = shareData?.l ?? "nl";

  // Use variant from share URL if available, otherwise random
  const [fallbackVariant, setFallbackVariant] = useState<KikkerVariant>("banana");
  useEffect(() => {
    setFallbackVariant(Math.random() > 0.5 ? "banana" : "duck");
  }, []);
  const variant: KikkerVariant = shareData?.v ?? fallbackVariant;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const messageContent = shareData ? (
    <PersonalMessage
      from={shareData.f}
      to={shareData.t}
      message={shareData.m}
      locale={locale}
    />
  ) : undefined;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        className="mx-auto mb-12 max-w-2xl px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl">1 April</h1>
        <p className="mt-3 text-lg text-foreground/60">
          {t("share.tapToOpen", locale)}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CardShell
          onOpenChange={handleOpenChange}
          frontCover={<FrontCover variant={variant} locale={locale} />}
          insideContent={
            <InsideContent
              messageContent={messageContent}
            />
          }
          cardStyle={{ aspectRatio: "1 / 1" }}
        />
      </motion.div>

      {/* Broken link fallback */}
      {hash && !shareData && (
        <motion.p
          className="mx-auto mt-6 max-w-md px-6 text-center text-sm text-foreground/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {t("share.brokenLink", locale)}
        </motion.p>
      )}

      {/* Attribution and send-your-own (visible after card opens) */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
        transition={{ duration: 0.4, delay: isOpen ? 0.3 : 0 }}
      >
        {shareData && (
          <p className="text-foreground/50">
            {t("share.sentBy", locale)} {shareData.f}
          </p>
        )}
        <Link
          href="/cards/kikker-in-je-bil/send"
          className="mt-4 inline-block border-b border-foreground/30 pb-1 text-sm tracking-wide uppercase transition-colors hover:border-accent hover:text-accent"
        >
          {t("share.sendOwn", locale)}
        </Link>
      </motion.div>
    </section>
  );
}
