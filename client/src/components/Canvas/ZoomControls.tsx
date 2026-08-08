import React from 'react';
import Button from '../Common/Button';
import { useCanvasStore } from '../../store/canvasStore';
import { zoomCanvasTo } from '../../utils/canvas';

const ZOOM_STEP = 0.15;

const ZoomControls: React.FC = () => {
  const canvas = useCanvasStore((s) => s.canvas);
  const zoom = useCanvasStore((s) => s.zoom);
  const setZoom = useCanvasStore((s) => s.setZoom);

  const applyZoom = (next: number) => {
    const clamped = Math.min(Math.max(next, 0.3), 3);
    if (canvas) zoomCanvasTo(canvas, clamped);
    setZoom(clamped);
  };

  return (
    <div className="zoom-controls">
      <Button variant="icon" onClick={() => applyZoom(zoom - ZOOM_STEP)} aria-label="Zoom out">
        −
      </Button>
      <span className="zoom-value">{Math.round(zoom * 100)}%</span>
      <Button variant="icon" onClick={() => applyZoom(zoom + ZOOM_STEP)} aria-label="Zoom in">
        +
      </Button>
      <Button variant="ghost" size="sm" onClick={() => applyZoom(1)}>
        Reset
      </Button>
    </div>
  );
};

export default ZoomControls;
