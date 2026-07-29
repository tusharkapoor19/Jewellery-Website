import React, { useRef } from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import { useUndoRedo } from '../../hooks/useUndoRedo';

const FabricCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);

  useCanvas({ containerRef, canvasElRef });
  useUndoRedo();

  return (
    <div className="fabric-canvas-container" ref={containerRef}>
      <canvas ref={canvasElRef} />
    </div>
  );
};

export default FabricCanvas;
