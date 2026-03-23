import CoralSnapdragon from './CoralSnapdragon';
import Daffodil from './Daffodil';
import OrangeSnapdragon from './OrangeSnapdragon';
import Peony from './Peony';
import PinkPeony from './PinkPeony';
import PinkSnapdragon from './PinkSnapdragon';
import PurpleTulip from './PurpleTulip';
import YellowSnapdragon from './YellowSnapdragon';
import YellowTulip from './YellowTulip';

export interface FlowerInfo {
  id: string;
  name: { nl: string; en: string };
  Component: React.ComponentType<{ className?: string }>;
}

export const FLOWERS: FlowerInfo[] = [
  { id: 'coral-snapdragon', name: { nl: 'Koraal leeuwenbek', en: 'Coral Snapdragon' }, Component: CoralSnapdragon },
  { id: 'daffodil', name: { nl: 'Narcis', en: 'Daffodil' }, Component: Daffodil },
  { id: 'orange-snapdragon', name: { nl: 'Oranje leeuwenbek', en: 'Orange Snapdragon' }, Component: OrangeSnapdragon },
  { id: 'peony', name: { nl: 'Pioenroos', en: 'Peony' }, Component: Peony },
  { id: 'pink-peony', name: { nl: 'Roze pioenroos', en: 'Pink Peony' }, Component: PinkPeony },
  { id: 'pink-snapdragon', name: { nl: 'Roze leeuwenbek', en: 'Pink Snapdragon' }, Component: PinkSnapdragon },
  { id: 'purple-tulip', name: { nl: 'Paarse tulp', en: 'Purple Tulip' }, Component: PurpleTulip },
  { id: 'yellow-snapdragon', name: { nl: 'Gele leeuwenbek', en: 'Yellow Snapdragon' }, Component: YellowSnapdragon },
  { id: 'yellow-tulip', name: { nl: 'Gele tulp', en: 'Yellow Tulip' }, Component: YellowTulip },
];
