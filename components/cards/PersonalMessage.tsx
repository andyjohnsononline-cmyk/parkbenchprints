import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface PersonalMessageProps {
  from: string;
  to: string;
  message: string;
  locale?: Locale;
}

export default function PersonalMessage({
  from,
  to,
  message,
  locale = "nl",
}: PersonalMessageProps) {
  if (!from && !to && !message) return null;

  return (
    <div className="px-6 pt-2 pb-1 text-center">
      {to && (
        <p className="font-serif text-sm text-accent/80">
          {t("message.dear", locale)} {to},
        </p>
      )}
      {message && (
        <p className="mt-1 text-xs leading-relaxed text-foreground/70">
          {message}
        </p>
      )}
      {from && (
        <p className="mt-1 font-serif text-xs text-accent/60">&mdash; {from}</p>
      )}
    </div>
  );
}
