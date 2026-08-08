import { create } from 'zustand';
import type { fabric } from 'fabric';
import type { PlacedLayer } from '../types/Canvas';
import type { JewelleryCategoryId } from '../types/Jewellery';

interface CanvasState {
  canvas: fabric.Canvas | null;
  layers: PlacedLayer[];
  activeLayerId: string | null;
  zoom: number;
  activeCategory: JewelleryCategoryId;
  searchQuery: string;
  favorites: string[];
  recentlyViewed: string[];

  history: string[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;

  setCanvas: (canvas: fabric.Canvas | null) => void;
  setLayers: (layers: PlacedLayer[]) => void;
  setActiveLayerId: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  setActiveCategory: (category: JewelleryCategoryId) => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (jewelleryId: string) => void;
  addRecentlyViewed: (jewelleryId: string) => void;

  pushHistory: (json: string) => void;
  setHistoryIndex: (index: number) => void;
  resetHistory: (json: string) => void;
}

const MAX_HISTORY = 40;

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvas: null,
  layers: [],
  activeLayerId: null,
  zoom: 1,
  activeCategory: 'necklace',
  searchQuery: '',
  favorites: [],
  recentlyViewed: [],

  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,

  setCanvas: (canvas) => set({ canvas }),
  setLayers: (layers) => set({ layers }),
  setActiveLayerId: (id) => set({ activeLayerId: id }),
  setZoom: (zoom) => set({ zoom }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleFavorite: (jewelleryId) =>
    set((state) => ({
      favorites: state.favorites.includes(jewelleryId)
        ? state.favorites.filter((id) => id !== jewelleryId)
        : [...state.favorites, jewelleryId],
    })),

  addRecentlyViewed: (jewelleryId) =>
    set((state) => ({
      recentlyViewed: [
        jewelleryId,
        ...state.recentlyViewed.filter((id) => id !== jewelleryId),
      ].slice(0, 12),
    })),

  pushHistory: (json) => {
    const { history, historyIndex } = get();
    const trimmed = history.slice(0, historyIndex + 1);
    const next = [...trimmed, json].slice(-MAX_HISTORY);
    set({
      history: next,
      historyIndex: next.length - 1,
      canUndo: next.length > 1,
      canRedo: false,
    });
  },

  setHistoryIndex: (index) => {
    const { history } = get();
    set({
      historyIndex: index,
      canUndo: index > 0,
      canRedo: index < history.length - 1,
    });
  },

  resetHistory: (json) =>
    set({ history: [json], historyIndex: 0, canUndo: false, canRedo: false }),
}));
