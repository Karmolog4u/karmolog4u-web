import { ARCANES, CLOSED_MEDITATIONS, ETHERS, OPENED_MEDITATIONS } from '@/helper/consts';

const CATEGORIES = [ARCANES, CLOSED_MEDITATIONS, ETHERS, OPENED_MEDITATIONS] as const;
type Category = (typeof CATEGORIES)[number];

type Discount = {
  discount: number;
};

export interface ProductCardProps {
  id: string;
  name: { [key: string]: string };
  cover?: string; // робимо опціональним, бо у Cover перевіряємо !cover
  video?: { video: string; playlist?: string };
  category: Category;
  price?: number;
  isWaiting: boolean;
  discount?: Discount;
}
