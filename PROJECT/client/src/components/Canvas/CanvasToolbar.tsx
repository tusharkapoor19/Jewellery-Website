import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../Common/Button';
import ZoomControls from './ZoomControls';
import { useCanvasStore } from '../../store/canvasStore';
import { useImageStore } from '../../store/imageStore';
import { useUndoRedo } from '../../hooks/useUndoRedo';
import { exportCanvasDataUrl, getLayersFromCanvas } from '../../utils/canvas';
import { setBackgroundPhoto } from '../../services/fabric';

interface CanvasToolbarProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const SAVED_DESIGNS_KEY = 'aurelia_saved_designs';

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({ containerRef }) => {
  const canvas = useCanvasStore((s) => s.canvas);
  const canUndo = useCanvasStore((s) => s.canUndo);
  const canRedo = useCanvasStore((s) => s.canRedo);
  const setLayers = useCanvasStore((s) => s.setLayers);
  const photoDataUrl = useImageStore((s) => s.photoDataUrl);
  const setPhotoBounds = useImageStore((s) => s.setPhotoBounds);
  const clearPhoto = useImageStore((s) => s.clearPhoto);
  const { undo, redo } = useUndoRedo();
  const [isComparing, setIsComparing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    if (!canvas) return;
    const dataUrl = exportCanvasDataUrl(canvas, 'jpeg', 2);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `aurelia-tryon-${Date.now()}.jpg`;
    link.click();
    toast.success('Image downloaded!');
  };

  const handleReset = () => {
    if (!canvas || !photoDataUrl) return;
    canvas.getObjects().forEach((obj: any) => {
      if (!obj.data?.isBackground) canvas.remove(obj);
    });
    setBackgroundPhoto(canvas, photoDataUrl).then((bounds) => {
      setPhotoBounds(bounds);
      setLayers(getLayersFromCanvas(canvas));
    });
    toast('Canvas reset to your original photo', { icon: '↺' });
  };

  const toggleCompare = () => {
    if (!canvas) return;
    const next = !isComparing;
    setIsComparing(next);
    canvas.getObjects().forEach((obj: any) => {
      if (!obj.data?.isBackground) obj.set('visible', !next);
    });
    canvas.requestRenderAll();
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="canvas-toolbar">
      <div className="canvas-toolbar-group">
        <Button variant="icon" disabled={!canUndo} onClick={undo} title="Undo (Ctrl+Z)">
          ↶
        </Button>
        <Button variant="icon" disabled={!canRedo} onClick={redo} title="Redo (Ctrl+Y)">
          ↷
        </Button>
      </div>

      <ZoomControls />

      <div className="canvas-toolbar-group">
        <Button
          variant={isComparing ? 'secondary' : 'ghost'}
          size="sm"
          onClick={toggleCompare}
          title="Compare with original"
        >
          {isComparing ? 'Showing original' : 'Compare'}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleReset} title="Reset canvas">
          Reset
        </Button>
        <Button variant="ghost" size="sm" onClick={toggleFullscreen} title="Fullscreen">
          {isFullscreen ? '⤓ Exit' : '⤢ Fullscreen'}
        </Button>
      </div>

      <div className="canvas-toolbar-group">
        <Button variant="secondary" size="sm" onClick={clearPhoto} title="Start over with a new photo">
          Start over
        </Button>
        <Button variant="primary" size="sm" onClick={handleDownload} title="Download JPG">
          Download
        </Button>
      </div>
    </div>
  );
};

export default CanvasToolbar;
