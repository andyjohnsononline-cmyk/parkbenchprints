import { describe, it, expect } from "vitest";
import { encode, decode, type ShareData } from "../shareCodec";

describe("shareCodec", () => {
  const sampleData: ShareData = {
    f: "Alice",
    t: "Bob",
    m: "Happy April Fools!",
    l: "en",
  };

  describe("roundtrip", () => {
    it("encodes and decodes back to original data", () => {
      const encoded = encode(sampleData);
      const decoded = decode(encoded);
      expect(decoded).toEqual(sampleData);
    });

    it("roundtrips without locale", () => {
      const data: ShareData = { f: "Alice", t: "Bob", m: "Hello" };
      const decoded = decode(encode(data));
      expect(decoded).toEqual(data);
    });

    it("roundtrips with nl locale", () => {
      const data: ShareData = { f: "Jan", t: "Piet", m: "Grapje!", l: "nl" };
      const decoded = decode(encode(data));
      expect(decoded).toEqual(data);
    });

    it("handles unicode characters", () => {
      const data: ShareData = { f: "André", t: "José", m: "Héllo wörld! 🐸" };
      const decoded = decode(encode(data));
      expect(decoded).toEqual(data);
    });
  });

  describe("decode edge cases", () => {
    it("returns null for empty string", () => {
      expect(decode("")).toBeNull();
    });

    it("returns null for hash-only string", () => {
      expect(decode("#")).toBeNull();
    });

    it("strips leading # from hash", () => {
      const encoded = encode(sampleData);
      const decoded = decode(`#${encoded}`);
      expect(decoded).toEqual(sampleData);
    });

    it("returns null for malformed base64", () => {
      expect(decode("not-valid-base64!!!")).toBeNull();
    });

    it("returns null for valid base64 but invalid JSON", () => {
      const notJson = btoa("this is not json");
      expect(decode(notJson)).toBeNull();
    });

    it("returns null for valid JSON missing required fields", () => {
      const partial = btoa(JSON.stringify({ f: "Alice" }));
      expect(decode(partial)).toBeNull();
    });

    it("returns null when f is not a string", () => {
      const bad = btoa(JSON.stringify({ f: 123, t: "Bob", m: "hi" }));
      expect(decode(bad)).toBeNull();
    });

    it("returns null when t is not a string", () => {
      const bad = btoa(JSON.stringify({ f: "Alice", t: null, m: "hi" }));
      expect(decode(bad)).toBeNull();
    });
  });

  describe("sanitization", () => {
    it("trims and truncates names to 50 chars on encode", () => {
      const longName = "A".repeat(100);
      const data: ShareData = { f: longName, t: "Bob", m: "hi" };
      const decoded = decode(encode(data));
      expect(decoded!.f).toHaveLength(50);
      expect(decoded!.f).toBe("A".repeat(50));
    });

    it("trims and truncates message to 200 chars on encode", () => {
      const longMsg = "X".repeat(300);
      const data: ShareData = { f: "A", t: "B", m: longMsg };
      const decoded = decode(encode(data));
      expect(decoded!.m).toHaveLength(200);
    });

    it("truncates names on decode even if encoded data was not sanitized", () => {
      // Manually craft a payload that bypasses encode sanitization
      const oversized = JSON.stringify({
        f: "Z".repeat(100),
        t: "Bob",
        m: "hi",
      });
      const raw = btoa(
        encodeURIComponent(oversized).replace(
          /%([0-9A-F]{2})/g,
          (_, p1) => String.fromCharCode(parseInt(p1, 16)),
        ),
      );
      const decoded = decode(raw);
      expect(decoded!.f).toHaveLength(50);
    });

    it("trims whitespace from names", () => {
      const data: ShareData = { f: "  Alice  ", t: "  Bob  ", m: "hi" };
      const decoded = decode(encode(data));
      expect(decoded!.f).toBe("Alice");
      expect(decoded!.t).toBe("Bob");
    });
  });

  describe("locale handling", () => {
    it("preserves en locale through roundtrip", () => {
      const data: ShareData = { f: "A", t: "B", m: "hi", l: "en" };
      expect(decode(encode(data))!.l).toBe("en");
    });

    it("preserves nl locale through roundtrip", () => {
      const data: ShareData = { f: "A", t: "B", m: "hi", l: "nl" };
      expect(decode(encode(data))!.l).toBe("nl");
    });

    it("strips invalid locale on decode", () => {
      const payload = JSON.stringify({ f: "A", t: "B", m: "hi", l: "fr" });
      const raw = btoa(
        encodeURIComponent(payload).replace(
          /%([0-9A-F]{2})/g,
          (_, p1) => String.fromCharCode(parseInt(p1, 16)),
        ),
      );
      const decoded = decode(raw);
      expect(decoded).not.toBeNull();
      expect(decoded!.l).toBeUndefined();
    });

    it("omits locale from encoded output when not provided", () => {
      const data: ShareData = { f: "A", t: "B", m: "hi" };
      const encoded = encode(data);
      const decoded = decode(encoded);
      expect(decoded!.l).toBeUndefined();
    });
  });
});
