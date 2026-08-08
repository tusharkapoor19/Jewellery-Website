import React from 'react';
import Button from '../Common/Button';
import { useCanvasStore } from '../../store/canvasStore';
import { flipActiveObject } from '../../utils/canvas';

interface FlipProps {
  disabled?: boolean;
}

const Flip: React.FC<FlipProps> = ({ disabled }) => {
  const canvas = useCanvasStore((s) => s.canvas);

  return (
    <div className="toolbar-btn-group">
      <Button
        variant="icon"
        disabled={disabled || !canvas}
        onClick={() => canvas && flipActiveObject(canvas, 'horizontal')}
        aria-label="Flip horizontal"
        title="Flip horizontal"
      >
        ↔
      </Button>
      <Button
        variant="icon"
        disabled={disabled || !canvas}
        onClick={() => canvas && flipActiveObject(canvas, 'vertical')}
        aria-label="Flip vertical"
        title="Flip vertical"
      >
        ↕
      </Button>
    </div>
  );
};

export default Flip;
