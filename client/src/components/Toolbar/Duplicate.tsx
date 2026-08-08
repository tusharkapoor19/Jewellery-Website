import React from 'react';
import toast from 'react-hot-toast';
import Button from '../Common/Button';
import { useCanvasStore } from '../../store/canvasStore';
import { duplicateActiveObject, getLayersFromCanvas } from '../../utils/canvas';

interface DuplicateProps {
  disabled?: boolean;
}

const Duplicate: React.FC<DuplicateProps> = ({ disabled }) => {
  const canvas = useCanvasStore((s) => s.canvas);
  const setLayers = useCanvasStore((s) => s.setLayers);

  const handleDuplicate = () => {
    if (!canvas) return;
    duplicateActiveObject(canvas);
    setLayers(getLayersFromCanvas(canvas));
    toast.success('Layer duplicated');
  };

  return (
    <Button
      variant="icon"
      disabled={disabled || !canvas}
      onClick={handleDuplicate}
      aria-label="Duplicate"
      title="Duplicate (Ctrl+D)"
    >
      ⧉
    </Button>
  );
};

export default Duplicate;
