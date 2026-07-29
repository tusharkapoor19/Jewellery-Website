import { create } from 'zustand';

export interface PhotoBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface ImageState {
  photoDataUrl: string | null;
  photoBounds: PhotoBounds | null;
  isCameraOpen: boolean;
  isProcessing: boolean;

  setPhoto: (dataUrl: string) => void;
  setPhotoBounds: (bounds: PhotoBounds) => void;
  clearPhoto: () => void;
  openCamera: () => void;
  closeCamera: () => void;
  setProcessing: (value: boolean) => void;
}

export const useImageStore = create<ImageState>((set) => ({
  photoDataUrl: null,
  photoBounds: null,
  isCameraOpen: false,
  isProcessing: false,

  setPhoto: (dataUrl) => set({ photoDataUrl: dataUrl }),
  setPhotoBounds: (bounds) => set({ photoBounds: bounds }),
  clearPhoto: () => set({ photoDataUrl: null, photoBounds: null }),
  openCamera: () => set({ isCameraOpen: true }),
  closeCamera: () => set({ isCameraOpen: false }),
  setProcessing: (value) => set({ isProcessing: value }),
}));
