import { useCallback, useEffect, useRef } from 'react';
import { useCanvasStore } from '../store/canvasStore';
import { getLayersFromCanvas } from '../utils/canvas';

const CUSTOM_PROPS = ['data', 'selectable', 'evented'];

/**
 * Wires up undo/redo history tracking for the active fabric canvas.
 * Snapshots the full canvas JSON whenever an object is added, modified,
 * or removed, and exposes `undo` / `redo` functions.
 */
export const useUndoRedo = () => {
  const canvas = useCanvasStore((s) => s.canvas);
  const pushHistory = useCanvasStore((s) => s.pushHistory);
  const resetHistory = useCanvasStore((s) => s.resetHistory);
  const setHistoryIndex = useCanvasStore((s) => s.setHistoryIndex);
  const setLayers = useCanvasStore((s) => s.setLayers);
  const isRestoring = useRef(false);

  const snapshot = useCallback(() => {
    if (!canvas || isRestoring.current) return;
    const json = JSON.stringify(canvas.toJSON(CUSTOM_PROPS));
    pushHistory(json);
    setLayers(getLayersFromCanvas(canvas));
  }, [canvas, pushHistory, setLayers]);

  useEffect(() => {
    if (!canvas) return;

    const handleChange = () => snapshot();

    canvas.on('object:added', handleChange);
    canvas.on('object:modified', handleChange);
    canvas.on('object:removed', handleChange);

    // seed initial history entry once background is ready
    const seedTimeout = setTimeout(() => {
      const json = JSON.stringify(canvas.toJSON(CUSTOM_PROPS));
      resetHistory(json);
      setLayers(getLayersFromCanvas(canvas));
    }, 300);

    return () => {
      canvas.off('object:added', handleChange);
      canvas.off('object:modified', handleChange);
      canvas.off('object:removed', handleChange);
      clearTimeout(seedTimeout);
    };
  }, [canvas]);

  const restore = useCallback(
    (index: number) => {
      const { history, canvas: c } = useCanvasStore.getState();
      if (!c || !history[index]) return;
      isRestoring.current = true;
      c.loadFromJSON(history[index], () => {
        c.requestRenderAll();
        setLayers(getLayersFromCanvas(c));
        isRestoring.current = false;
      });
      setHistoryIndex(index);
    },
    [setHistoryIndex, setLayers]
  );

  const undo = useCallback(() => {
    const { historyIndex } = useCanvasStore.getState();
    if (historyIndex > 0) restore(historyIndex - 1);
  }, [restore]);

  const redo = useCallback(() => {
    const { historyIndex, history } = useCanvasStore.getState();
    if (historyIndex < history.length - 1) restore(historyIndex + 1);
  }, [restore]);

  return { undo, redo, snapshot };
};
