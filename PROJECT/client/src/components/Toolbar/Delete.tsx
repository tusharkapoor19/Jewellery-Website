import React from 'react';
import toast from 'react-hot-toast';
import Button from '../Common/Button';
import { useCanvasStore } from '../../store/canvasStore';
import { deleteActiveObject, getLayersFromCanvas } from '../../utils/canvas';

interface DeleteProps {
  disabled?: boolean;
}

const Delete: React.FC<DeleteProps> = ({ disabled }) => {
  const canvas = useCanvasStore((s) => s.canvas);
  const setLayers = useCanvasStore((s) => s.setLayers);

  const handleDelete = () => {
    if (!canvas) return;
    deleteActiveObject(canvas);
    setLayers(getLayersFromCanvas(canvas));
    toast('Layer removed', { icon: '🗑️' });
  };

  return (
    <Button
      variant="icon"
      disabled={disabled || !canvas}
      onClick={handleDelete}
      aria-label="Delete"
      title="Delete (Del)"
    >
      🗑️
    </Button>
  );
};

export default Delete;
