export type ShareData = {
  f: string; // from (sender name)
  t: string; // to (recipient name)
  m: string; // message
  l?: "nl" | "en"; // locale
  v?: "banana" | "duck"; // kikker card cover variant
};

const MAX_MESSAGE_LENGTH = 200;
const MAX_NAME_LENGTH = 50;

export function encode(data: ShareData): string {
  const sanitized: ShareData = {
    f: data.f.trim().slice(0, MAX_NAME_LENGTH),
    t: data.t.trim().slice(0, MAX_NAME_LENGTH),
    m: data.m.trim().slice(0, MAX_MESSAGE_LENGTH),
    ...(data.l && { l: data.l }),
    ...(data.v && { v: data.v }),
  };
  return btoa(
    encodeURIComponent(JSON.stringify(sanitized)).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16)),
    ),
  );
}

export function decode(hash: string): ShareData | null {
  try {
    const raw = hash.startsWith("#") ? hash.slice(1) : hash;
    if (!raw) return null;
    const json = decodeURIComponent(
      Array.from(atob(raw), (c) =>
        "%" + c.charCodeAt(0).toString(16).padStart(2, "0"),
      ).join(""),
    );
    const parsed = JSON.parse(json);
    if (
      typeof parsed.f !== "string" ||
      typeof parsed.t !== "string" ||
      typeof parsed.m !== "string"
    ) {
      return null;
    }
    return {
      f: parsed.f.slice(0, MAX_NAME_LENGTH),
      t: parsed.t.slice(0, MAX_NAME_LENGTH),
      m: parsed.m.slice(0, MAX_MESSAGE_LENGTH),
      ...(parsed.l === "nl" || parsed.l === "en" ? { l: parsed.l } : {}),
      ...(parsed.v === "banana" || parsed.v === "duck" ? { v: parsed.v } : {}),
    };
  } catch {
    return null;
  }
}
