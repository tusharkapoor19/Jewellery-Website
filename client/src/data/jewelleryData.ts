import type { JewelleryCategory, JewelleryItem } from '../types/Jewellery';

import necklace1 from '../assets/try-on/images/necklace-1.png';
import necklace2 from '../assets/try-on/images/necklace-2.png';
import necklace3 from '../assets/try-on/images/necklace-3.png';
import earrings1 from '../assets/try-on/images/earrings-1.png';
import earrings2 from '../assets/try-on/images/earrings-2.png';
import earrings3 from '../assets/try-on/images/earrings-3.png';
import rings1 from '../assets/try-on/images/rings-1.png';
import rings2 from '../assets/try-on/images/rings-2.png';
import rings3 from '../assets/try-on/images/rings-3.png';
import rings4 from '../assets/try-on/images/rings-4.png';
import rings5 from '../assets/try-on/images/rings-5.png';
import rings6 from '../assets/try-on/images/rings-6.png';
import bangles1 from '../assets/try-on/images/bangles-1.png';
import bracelets1 from '../assets/try-on/images/bracelets-1.png';
import bracelets2 from '../assets/try-on/images/bracelets-2.png';
import mangalsutra1 from '../assets/try-on/images/mangalsutra-1.png';
import mangalsutra2 from '../assets/try-on/images/mangalsutra-2.png';
import mangalsutra3 from '../assets/try-on/images/mangalsutra-3.png';
import chains1 from '../assets/try-on/images/chains-1.png';
import chains2 from '../assets/try-on/images/chains-2.png';

export const CATEGORIES: JewelleryCategory[] = [
  { id: 'necklace', label: 'Necklaces', icon: '💎' },
  { id: 'earrings', label: 'Earrings', icon: '✨' },
  { id: 'rings', label: 'Rings', icon: '💍' },
  { id: 'bangles', label: 'Bangles', icon: '⭕' },
  { id: 'bracelets', label: 'Bracelets', icon: '🔗' },
  { id: 'mangalsutra', label: 'Mangalsutra', icon: '⚫' },
  { id: 'chains', label: 'Chains', icon: '➰' },
];

export const JEWELLERY_ITEMS: JewelleryItem[] = [
  {
    id: 'necklace-royal-choker',
    name: 'Royal Floral Gold Necklace',
    categoryId: 'necklace',
    image: necklace1,
    thumbnail: necklace1,
    anchor: 'neck',
    defaultScale: 1,
    price: 289999,
    tags: ['gold', 'floral', 'bridal'],
  },
  {
    id: 'necklace-layered-gold',
    name: 'Temple Gold Necklace',
    categoryId: 'necklace',
    image: necklace2,
    thumbnail: necklace2,
    anchor: 'neck',
    defaultScale: 1,
    price: 329999,
    tags: ['gold', 'temple', 'traditional'],
  },
  {
    id: 'necklace-layered-gold2',
    name: 'Diamond Drop Necklace',
    categoryId: 'necklace',
    image: necklace3,
    thumbnail: necklace3,
    anchor: 'neck',
    defaultScale: 1,
    price: 459999,
    tags: ['diamond', 'gold', 'party'],
  },
  {
    id: 'earrings-jhumka',
    name: 'Minimal Gold Stud',
    categoryId: 'earrings',
    image: earrings1,
    thumbnail: earrings1,
    anchor: 'ear-both',
    defaultScale: 1,
    price: 11999,
    tags: ['gold', 'minimal', 'daily-wear'],
  },
  {
    id: 'earrings-diamond-stud',
    name: 'Traditional Gold Jhumka',
    categoryId: 'earrings',
    image: earrings2,
    thumbnail: earrings2,
    anchor: 'ear-both',
    defaultScale: 1,
    price: 59999,
    tags: ['gold', 'jhumka', 'traditional'],
  },
  {
    id: 'earrings-diamond-stud2',
    name: 'Golden Swirl Stud Earrings',
    categoryId: 'earrings',
    image: earrings3,
    thumbnail: earrings3,
    anchor: 'ear-both',
    defaultScale: 1,
    price: 19999,
    tags: ['gold', 'stud', 'daily-wear'],
  },
  {
    id: 'ring-sapphire',
    name: 'Vintage Twist Gold Ring',
    categoryId: 'rings',
    image: rings1,
    thumbnail: rings1,
    anchor: 'finger',
    defaultScale: 1,
    price: 39999,
    tags: ['gold', 'vintage', 'daily-wear'],
  },
  {
    id: 'ring-sapphire2',
    name: 'Rose Gold Leaf Ring',
    categoryId: 'rings',
    image: rings2,
    thumbnail: rings2,
    anchor: 'finger',
    defaultScale: 1,
    price: 49999,
    tags: ['rose-gold', 'leaf', 'diamond'],
  },
  {
    id: 'ring-sapphire3',
    name: 'Floral Diamond Ring',
    categoryId: 'rings',
    image: rings3,
    thumbnail: rings3,
    anchor: 'finger',
    defaultScale: 1,
    price: 59999,
    tags: ['diamond', 'floral', 'gold'],
  },
  {
    id: 'ring-sapphire4',
    name: 'Silver Vine Ring',
    categoryId: 'rings',
    image: rings4,
    thumbnail: rings4,
    anchor: 'finger',
    defaultScale: 1,
    price: 54999,
    tags: ['silver', 'vine', 'diamond'],
  },
  {
    id: 'ring-sapphire5',
    name: 'Square Diamond Band',
    categoryId: 'rings',
    image: rings5,
    thumbnail: rings5,
    anchor: 'finger',
    defaultScale: 1,
    price: 64999,
    tags: ['diamond', 'silver', 'band'],
  },
  {
    id: 'ring-sapphire6',
    name: 'Classic Solitaire Band',
    categoryId: 'rings',
    image: rings6,
    thumbnail: rings6,
    anchor: 'finger',
    defaultScale: 1,
    price: 69999,
    tags: ['gold', 'solitaire', 'minimal'],
  },
  {
    id: 'bangle-classic',
    name: 'Floral Gold Bangle',
    categoryId: 'bangles',
    image: bangles1,
    thumbnail: bangles1,
    anchor: 'wrist',
    defaultScale: 1,
    price: 74999,
    tags: ['gold', 'floral', 'traditional'],
  },
  {
    id: 'bracelet-chain',
    name: 'Elegant Infinity Bracelet',
    categoryId: 'bracelets',
    image: bracelets1,
    thumbnail: bracelets1,
    anchor: 'wrist',
    defaultScale: 1,
    price: 259999,
    tags: ['gold', 'infinity', 'daily-wear'],
  },
  {
    id: 'bracelet-chain2',
    name: 'Diamond Tennis Bracelet',
    categoryId: 'bracelets',
    image: bracelets2,
    thumbnail: bracelets2,
    anchor: 'wrist',
    defaultScale: 1,
    price: 299999,
    tags: ['diamond', 'bracelet', 'luxury'],
  },
  {
    id: 'mangalsutra-classic',
    name: 'Diamond Drop Mangalsutra',
    categoryId: 'mangalsutra',
    image: mangalsutra1,
    thumbnail: mangalsutra1,
    anchor: 'neck',
    defaultScale: 1,
    price: 159999,
    tags: ['gold', 'diamond', 'traditional'],
  },
  {
    id: 'mangalsutra-classic2',
    name: 'Heart Charm Mangalsutra',
    categoryId: 'mangalsutra',
    image: mangalsutra2,
    thumbnail: mangalsutra2,
    anchor: 'neck',
    defaultScale: 1,
    price: 189999,
    tags: ['gold', 'heart', 'traditional'],
  },
  {
    id: 'mangalsutra-classic3',
    name: 'Halo Pendant Mangalsutra',
    categoryId: 'mangalsutra',
    image: mangalsutra3,
    thumbnail: mangalsutra3,
    anchor: 'neck',
    defaultScale: 1,
    price: 199999,
    tags: ['gold', 'halo', 'diamond'],
  },
  {
    id: 'chain-simple',
    name: 'Silver Bar Pendant Chain',
    categoryId: 'chains',
    image: chains1,
    thumbnail: chains1,
    anchor: 'neck',
    defaultScale: 1,
    price: 12999,
    tags: ['silver', 'minimal', 'daily-wear'],
  },
  {
    id: 'chain-simple2',
    name: 'Classic Gold V Chain',
    categoryId: 'chains',
    image: chains2,
    thumbnail: chains2,
    anchor: 'neck',
    defaultScale: 1,
    price: 149999,
    tags: ['gold', 'minimal', 'daily-wear'],
  },
];

export const getItemsByCategory = (categoryId: string): JewelleryItem[] =>
  JEWELLERY_ITEMS.filter((item) => item.categoryId === categoryId);
