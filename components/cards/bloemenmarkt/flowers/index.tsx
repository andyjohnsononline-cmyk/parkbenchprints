import BlueHydrangea from './BlueHydrangea';
import OrangeSnapdragon from './OrangeSnapdragon';
import PinkPeony from './PinkPeony';
import RedTulip from './RedTulip';
import YellowSnapdragon from './YellowSnapdragon';
import YellowTulip from './YellowTulip';

export interface FlowerInfo {
  id: string;
  name: { nl: string; en: string };
  Component: React.ComponentType<{ className?: string }>;
}

// Bucket group IDs from the designer's SVG → single flower components
export const FLOWERS: FlowerInfo[] = [
  { id: 'red-tulips-bucket', name: { nl: 'Rode tulpen', en: 'Red Tulips' }, Component: RedTulip },
  { id: 'pink-snapdragon-bucket', name: { nl: 'Roze leeuwenbek', en: 'Pink Snapdragon' }, Component: OrangeSnapdragon },
  { id: 'blue-hydrangea-bucket', name: { nl: 'Blauwe hortensia', en: 'Blue Hydrangea' }, Component: BlueHydrangea },
  { id: 'yellow-tulips-bucket', name: { nl: 'Gele tulpen', en: 'Yellow Tulips' }, Component: YellowTulip },
  { id: 'yellow-snapdragon-bucket', name: { nl: 'Gele leeuwenbek', en: 'Yellow Snapdragon' }, Component: YellowSnapdragon },
  { id: 'peony-bucket', name: { nl: 'Pioenrozen', en: 'Peonies' }, Component: PinkPeony },
];

// All known bucket IDs in the SVG — used for event delegation
export const BUCKET_IDS = FLOWERS.map((f) => f.id);
