import React from 'react';
import Button from '../Common/Button';
import { useCanvasStore } from '../../store/canvasStore';
import { rotateActiveObjectBy } from '../../utils/canvas';

interface RotateProps {
  disabled?: boolean;
}

const Rotate: React.FC<RotateProps> = ({ disabled }) => {
  const canvas = useCanvasStore((s) => s.canvas);

  return (
    <div className="toolbar-btn-group">
      <Button
        variant="icon"
        disabled={disabled || !canvas}
        onClick={() => canvas && rotateActiveObjectBy(canvas, -15)}
        aria-label="Rotate left"
        title="Rotate left 15°"
      >
        ⟲
      </Button>
      <Button
        variant="icon"
        disabled={disabled || !canvas}
        onClick={() => canvas && rotateActiveObjectBy(canvas, 15)}
        aria-label="Rotate right"
        title="Rotate right 15°"
      >
        ⟳
      </Button>
    </div>
  );
};

export default Rotate;
