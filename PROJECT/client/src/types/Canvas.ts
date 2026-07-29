import type { JewelleryCategoryId } from './Jewellery';

export interface PlacedLayer {
  /** fabric object id (matches fabric object's custom `data.layerId`) */
  layerId: string;
  jewelleryId: string;
  categoryId: JewelleryCategoryId;
  name: string;
  thumbnail: string;
  locked: boolean;
  visible: boolean;
  opacity: number;
}

export type ExportFormat = 'jpeg' | 'png';

export interface HistorySnapshot {
  json: string;
  timestamp: number;
}
