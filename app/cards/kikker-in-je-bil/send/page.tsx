"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CardShell from "@/components/cards/CardShell";
import FrontCover from "@/components/cards/kikker/FrontCover";
import InsideContent from "@/components/cards/kikker/InsideContent";
import PersonalMessage from "@/components/cards/PersonalMessage";
import ShareLink from "@/components/ShareLink";
import { encode } from "@/lib/shareCodec";
import { type Locale, getDefaultLocale, t } from "@/lib/i18n";

export default function SendPage() {
  const [locale, setLocale] = useState<Locale>(getDefaultLocale);
  const [form, setForm] = useState({ from: "", to: "", message: "" });
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [frogOut, setFrogOut] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) setFrogOut(false);
  }, []);

  function handleCreate() {
    if (!form.from.trim() || !form.to.trim()) return;
    const hash = encode({
      f: form.from,
      t: form.to,
      m: form.message,
      l: locale,
    });
    const base =
      typeof window !== "undefined"
        ? window.location.origin +
          window.location.pathname.replace(/\/send$/, "/share")
        : "";
    setShareUrl(`${base}#${hash}`);
  }

  const hasContent = form.from || form.to || form.message;

  const topContent = hasContent ? (
    <PersonalMessage
      from={form.from}
      to={form.to}
      message={form.message}
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
        className="mx-auto mb-8 max-w-2xl px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/cards/kikker-in-je-bil"
          className="mb-6 inline-block text-sm tracking-wide text-accent uppercase transition-opacity hover:opacity-70"
        >
          {t("send.back", locale)}
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl">
          {t("send.title", locale)}
        </h1>
        <p className="mt-3 text-lg text-foreground/60">
          {t("send.subtitle", locale)}
        </p>
        <button
          onClick={() => { setLocale(locale === "nl" ? "en" : "nl"); setShareUrl(null); }}
          className="mt-3 text-xs tracking-wide text-accent/60 uppercase transition-opacity hover:opacity-70"
        >
          {t("lang.toggle", locale)}
        </button>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="send-from"
                className="mb-2 block text-sm tracking-wide uppercase text-foreground/50"
              >
                {t("send.from", locale)}
              </label>
              <input
                id="send-from"
                type="text"
                value={form.from}
                onChange={(e) => { setForm({ ...form, from: e.target.value }); setShareUrl(null); }}
                maxLength={50}
                className="w-full border-b border-foreground/20 bg-transparent py-3 text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="send-to"
                className="mb-2 block text-sm tracking-wide uppercase text-foreground/50"
              >
                {t("send.to", locale)}
              </label>
              <input
                id="send-to"
                type="text"
                value={form.to}
                onChange={(e) => { setForm({ ...form, to: e.target.value }); setShareUrl(null); }}
                maxLength={50}
                className="w-full border-b border-foreground/20 bg-transparent py-3 text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="send-message"
                className="mb-2 block text-sm tracking-wide uppercase text-foreground/50"
              >
                {t("send.message", locale)}
              </label>
              <textarea
                id="send-message"
                rows={4}
                value={form.message}
                onChange={(e) => { setForm({ ...form, message: e.target.value }); setShareUrl(null); }}
                maxLength={200}
                placeholder={t("send.messagePlaceholder", locale)}
                className="w-full resize-none border-b border-foreground/20 bg-transparent py-3 text-foreground outline-none transition-colors placeholder:text-foreground/20 focus:border-accent"
              />
              <p className="mt-1 text-right text-xs text-foreground/30">
                {form.message.length} / 200
              </p>
            </div>

            <button
              onClick={handleCreate}
              disabled={!form.from.trim() || !form.to.trim()}
              className="inline-flex items-center gap-2 bg-foreground px-8 py-3.5 text-sm tracking-wide uppercase text-background transition-colors hover:bg-accent disabled:opacity-30 disabled:hover:bg-foreground"
            >
              {t("send.create", locale)}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {shareUrl && <ShareLink url={shareUrl} locale={locale} />}
        </motion.div>

        {/* Live preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="mb-4 text-center text-sm tracking-wide text-foreground/40 uppercase">
            {t("send.preview", locale)}
          </p>
          <CardShell
            onOpenChange={handleOpenChange}
            frontCover={<FrontCover locale={locale} />}
            insideContent={
              <InsideContent
                isOpen={isOpen}
                frogOut={frogOut}
                onFrogOut={() => setFrogOut(true)}
                topContent={topContent}
                locale={locale}
              />
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
