import BlueHydrangea from './BlueHydrangea';
import PinkPeony from './PinkPeony';
import PinkSnapdragon from './PinkSnapdragon';
import RedTulip from './RedTulip';
import YellowSnapdragon from './YellowSnapdragon';
import YellowTulip from './YellowTulip';

export interface FlowerInfo {
  id: string;
  name: { nl: string; en: string };
  Component: React.ComponentType<{ className?: string }>;
  /** Relative size scale — 1.0 = baseline. Taller flowers > 1, shorter < 1. */
  scale: number;
}

// Bucket group IDs from the designer's SVG → single flower components
// Scale ratios based on real-life proportions:
// snapdragon ~75cm (1.4), hydrangea ~60cm (1.2), peony ~50cm (1.1), tulip ~35cm (0.9)
export const FLOWERS: FlowerInfo[] = [
  { id: 'red-tulips-bucket', name: { nl: 'Rode tulpen', en: 'Red Tulips' }, Component: RedTulip, scale: 0.9 },
  { id: 'pink-snapdragon-bucket', name: { nl: 'Roze leeuwenbek', en: 'Pink Snapdragon' }, Component: PinkSnapdragon, scale: 1.4 },
  { id: 'blue-hydrangea-bucket', name: { nl: 'Blauwe hortensia', en: 'Blue Hydrangea' }, Component: BlueHydrangea, scale: 1.2 },
  { id: 'yellow-tulips-bucket', name: { nl: 'Gele tulpen', en: 'Yellow Tulips' }, Component: YellowTulip, scale: 0.9 },
  { id: 'yellow-snapdragon-bucket', name: { nl: 'Gele leeuwenbek', en: 'Yellow Snapdragon' }, Component: YellowSnapdragon, scale: 1.4 },
  { id: 'peony-bucket', name: { nl: 'Pioenrozen', en: 'Peonies' }, Component: PinkPeony, scale: 1.1 },
];

// All known bucket IDs in the SVG — used for event delegation
export const BUCKET_IDS = FLOWERS.map((f) => f.id);
