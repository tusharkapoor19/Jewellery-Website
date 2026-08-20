import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UploadPhoto from '../Upload/UploadPhoto';
import CanvasToolbar from './CanvasToolbar';
import FabricCanvas from './FabricCanvas';
import LayerPanel from './LayerPanel';
import Loader from '../Loader/Loader';
import { useImageStore } from '../../store/imageStore';

const Canvas: React.FC = () => {
  const photoDataUrl = useImageStore((s) => s.photoDataUrl);
  const isProcessing = useImageStore((s) => s.isProcessing);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  return (
    <div className="app-canvas-area" ref={fullscreenRef}>
      {photoDataUrl && isProcessing && (
        <div className="tryon-detecting-overlay">
          <Loader label="Finding the right spot…" />
        </div>
      )}
      <AnimatePresence mode="wait">
        {!photoDataUrl ? (
          <motion.div
            key="upload"
            className="app-canvas-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UploadPhoto />
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            className="app-canvas-editor"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CanvasToolbar containerRef={fullscreenRef} />
            <div className="app-canvas-body">
              <FabricCanvas />
              <LayerPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Canvas;
