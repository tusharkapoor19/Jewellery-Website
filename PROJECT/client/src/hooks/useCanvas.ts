import { useCallback, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import toast from 'react-hot-toast';
import { useCanvasStore } from '../store/canvasStore';
import { useImageStore } from '../store/imageStore';
import { createFabricCanvas,loadFabricImage, applyBackgroundImage } from '../services/fabric';
import {
  deleteActiveObject,
  duplicateActiveObject,
  getLayersFromCanvas,
} from '../utils/canvas';

interface UseCanvasOptions {
  containerRef: React.RefObject<HTMLDivElement>;
  canvasElRef: React.RefObject<HTMLCanvasElement>;
}

/**
 * Initializes the fabric.Canvas instance inside the given container,
 * keeps it responsive to container resize, loads the uploaded photo as
 * the background, tracks selection state, and wires keyboard shortcuts.
 */
export const useCanvas = ({ containerRef, canvasElRef }: UseCanvasOptions) => {
  const setCanvas = useCanvasStore((s) => s.setCanvas);
  const setActiveLayerId = useCanvasStore((s) => s.setActiveLayerId);
  const setLayers = useCanvasStore((s) => s.setLayers);
  const photoDataUrl = useImageStore((s) => s.photoDataUrl);
  const setPhotoBounds = useImageStore((s) => s.setPhotoBounds);
  // const fabricRef = useRef<fabric.Canvas | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const disposedRef = useRef(false); // add this


  // Initialize canvas once
  // useEffect(() => {
  //   if (!containerRef.current || !canvasElRef.current) return;
  //   const { clientWidth, clientHeight } = containerRef.current;

  //   const canvas = createFabricCanvas(
  //     canvasElRef.current,
  //     clientWidth,
  //     clientHeight || 560
  //   );
  //   fabricRef.current = canvas;
  //   setCanvas(canvas);

  //   const updateSelection = () => {
  //     const active = canvas.getActiveObject() as any;
  //     setActiveLayerId(active?.data?.layerId ?? null);
  //   };
  //   canvas.on('selection:created', updateSelection);
  //   canvas.on('selection:updated', updateSelection);
  //   canvas.on('selection:cleared', () => setActiveLayerId(null));

  //   return () => {
  //     canvas.dispose();
  //     fabricRef.current = null;
  //     setCanvas(null);
  //   };
  // }, []);

  useEffect(() => {
  if (!containerRef.current || !canvasElRef.current) return;
  const { clientWidth, clientHeight } = containerRef.current;

  const canvas = createFabricCanvas(canvasElRef.current, clientWidth, clientHeight || 560);
  fabricRef.current = canvas;
  disposedRef.current = false; // <-- reset on (re)create
  setCanvas(canvas);

  // ...selection handlers unchanged...

  return () => {
    disposedRef.current = true; // <-- mark disposed BEFORE calling dispose()
    canvas.dispose();
    fabricRef.current = null;
    setCanvas(null);
  };
}, []);

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = fabricRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      canvas.setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
      canvas.requestRenderAll();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load background photo whenever it changes
  // useEffect(() => {
  //   const canvas = fabricRef.current;
  //   if (!canvas || !photoDataUrl) return;
  //   setBackgroundPhoto(canvas, photoDataUrl)
  //     .then((bounds) => {
  //       setPhotoBounds(bounds);
  //       setLayers(getLayersFromCanvas(canvas));
  //     })
  //     .catch(() => toast.error('Could not load that photo. Try another one.'));
  // }, [photoDataUrl]);

  useEffect(() => {
  const canvas = fabricRef.current;
  if (!canvas || !photoDataUrl) return;

  loadFabricImage(photoDataUrl)
    .then((img) => {
      // bail out if this exact canvas was disposed/replaced while we were loading
      if (disposedRef.current || fabricRef.current !== canvas) return;
      const bounds = applyBackgroundImage(canvas, img);
      setPhotoBounds(bounds);
      setLayers(getLayersFromCanvas(canvas));
    })
    .catch(() => toast.error('Could not load that photo. Try another one.'));
}, [photoDataUrl]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteActiveObject(canvas);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateActiveObject(canvas);
      } else if (e.key === 'Escape') {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      } else {
        const active = canvas.getActiveObject();
        if (!active) return;
        const step = e.shiftKey ? 10 : 1;
        if (e.key === 'ArrowLeft') active.set('left', (active.left || 0) - step);
        if (e.key === 'ArrowRight') active.set('left', (active.left || 0) + step);
        if (e.key === 'ArrowUp') active.set('top', (active.top || 0) - step);
        if (e.key === 'ArrowDown') active.set('top', (active.top || 0) + step);
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          active.setCoords();
          canvas.requestRenderAll();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getCanvas = useCallback(() => fabricRef.current, []);

  return { getCanvas };
};
