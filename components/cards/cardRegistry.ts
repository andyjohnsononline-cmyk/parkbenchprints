export interface CardInfo {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date?: string;
  thumbnail?: string;
  available: boolean;
}

export const cards: CardInfo[] = [
  {
    slug: "kikker-in-je-bil",
    title: "Kikker in Je Bil!",
    subtitle: "1 April",
    description: "Open the card and get a springy surprise...",
    date: "1 April",
    available: true,
  },
];
