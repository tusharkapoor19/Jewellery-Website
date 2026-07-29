export type JewelleryCategoryId =
  | 'necklace'
  | 'earrings'
  | 'rings'
  | 'bangles'
  | 'bracelets'
  | 'watches'
  | 'mangalsutra'
  | 'chains';

export interface JewelleryCategory {
  id: JewelleryCategoryId;
  label: string;
  icon: string;
}

/** Where on the body / photo a jewellery item should anchor to by default */
export type AnchorType = 'neck' | 'ear-left' | 'ear-right' | 'ear-both' | 'finger' | 'wrist' | 'nose' | 'chest';

export interface JewelleryItem {
  id: string;
  name: string;
  categoryId: JewelleryCategoryId;
  image: string;
  thumbnail: string;
  anchor: AnchorType;
  /** relative scale factor applied on top of auto-fit sizing */
  defaultScale: number;
  price?: number;
  tags?: string[];
}
