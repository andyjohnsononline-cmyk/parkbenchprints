export type Locale = "nl" | "en";

const strings: Record<string, Record<Locale, string>> = {
  // Send page
  "send.title": { nl: "Stuur deze kaart", en: "Send this card" },
  "send.subtitle": {
    nl: "Personaliseer de kaart en deel hem met iemand",
    en: "Personalize the card and share it with someone",
  },
  "send.from": { nl: "Jouw naam", en: "Your name" },
  "send.to": { nl: "Naam ontvanger", en: "Recipient's name" },
  "send.message": { nl: "Bericht", en: "Message" },
  "send.messagePlaceholder": {
    nl: "Schrijf een persoonlijk bericht...",
    en: "Write a personal message...",
  },
  "send.create": { nl: "Maak link", en: "Create link" },
  "send.preview": { nl: "Voorbeeld", en: "Preview" },
  "send.back": { nl: "\u2190 Terug naar kaart", en: "\u2190 Back to card" },

  // Share page
  "share.sentBy": { nl: "Verstuurd door", en: "Sent by" },
  "share.sendOwn": {
    nl: "Stuur zelf een kaart \u2192",
    en: "Send your own card \u2192",
  },
  "share.tapToOpen": { nl: "Tik om te openen", en: "Tap to open" },

  // Personal message
  "message.dear": { nl: "Lieve", en: "Dear" },

  // Share link
  "shareLink.copy": { nl: "Kopieer link", en: "Copy link" },
  "shareLink.copied": { nl: "Gekopieerd!", en: "Copied!" },
  "shareLink.share": { nl: "Delen", en: "Share" },
  "shareLink.title": { nl: "Je link is klaar!", en: "Your link is ready!" },

  // Card interaction
  "card.dragHint": { nl: "↑ Trek eruit!", en: "↑ Pull it out!" },

  // Bloemenmarkt
  "bloemen.dragHint": {
    nl: "Sleep bloemen naar je boeket",
    en: "Drag flowers to your bouquet",
  },
  "bloemen.reset": { nl: "Opnieuw", en: "Reset" },
  "bloemen.complete": {
    nl: "Prachtig boeket!",
    en: "Beautiful bouquet!",
  },

  // Broken link fallback
  "share.brokenLink": {
    nl: "Deze kaart is speciaal voor jou verstuurd — maar de link lijkt incompleet. Vraag de afzender om opnieuw te sturen!",
    en: "This card was sent just for you — but the link seems incomplete. Ask the sender to resend!",
  },

  // Language toggle
  "lang.toggle": { nl: "English", en: "Nederlands" },
};

export function getDefaultLocale(): Locale {
  if (typeof navigator === "undefined") return "nl";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("nl")) return "nl";
  return "en";
}

export function t(key: string, locale: Locale): string {
  return strings[key]?.[locale] ?? key;
}
