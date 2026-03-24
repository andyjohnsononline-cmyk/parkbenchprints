import OrangeSnapdragon from './OrangeSnapdragon';
import Peony from './Peony';
import PurpleTulip from './PurpleTulip';
import YellowSnapdragon from './YellowSnapdragon';
import YellowTulip from './YellowTulip';

export interface FlowerInfo {
  id: string;
  name: { nl: string; en: string };
  Component: React.ComponentType<{ className?: string }>;
}

// Bucket group IDs from the designer's SVG → single flower components
// TODO: Replace PurpleTulip stand-in with proper RedTulip asset
// TODO: Replace Peony stand-in with proper BlueHydrangea asset
export const FLOWERS: FlowerInfo[] = [
  { id: 'red-tulips', name: { nl: 'Rode tulpen', en: 'Red Tulips' }, Component: PurpleTulip },
  { id: 'orange-snapdragon', name: { nl: 'Oranje leeuwenbek', en: 'Orange Snapdragon' }, Component: OrangeSnapdragon },
  { id: 'blue-hydrangea', name: { nl: 'Blauwe hortensia', en: 'Blue Hydrangea' }, Component: Peony },
  { id: 'yellow-tulips', name: { nl: 'Gele tulpen', en: 'Yellow Tulips' }, Component: YellowTulip },
  { id: 'yellow-snapdragons', name: { nl: 'Gele leeuwenbek', en: 'Yellow Snapdragon' }, Component: YellowSnapdragon },
  { id: 'peonies', name: { nl: 'Pioenrozen', en: 'Peonies' }, Component: Peony },
];

// All known bucket IDs in the SVG — used for event delegation
export const BUCKET_IDS = FLOWERS.map((f) => f.id);
