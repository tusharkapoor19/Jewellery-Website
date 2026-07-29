import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Rotate from './Rotate';
import Flip from './Flip';
import Duplicate from './Duplicate';
import Delete from './Delete';
import Opacity from './Opacity';
import { useCanvasStore } from '../../store/canvasStore';
import { setActiveObjectAdjustments } from '../../utils/canvas';

const Toolbar: React.FC = () => {
  const canvas = useCanvasStore((s) => s.canvas);
  const activeLayerId = useCanvasStore((s) => s.activeLayerId);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  const disabled = !activeLayerId;

  useEffect(() => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
  }, [activeLayerId]);

  const handleAdjust = (
    key: 'brightness' | 'contrast' | 'saturation',
    value: number
  ) => {
    const next = { brightness, contrast, saturation, [key]: value };
    setBrightness(next.brightness);
    setContrast(next.contrast);
    setSaturation(next.saturation);
    if (canvas) setActiveObjectAdjustments(canvas, next);
  };

  return (
    <aside className="app-toolbar">
      <div className="app-toolbar-header">
        <h2>Adjust</h2>
      </div>

      <AnimatePresence mode="wait">
        {disabled ? (
          <motion.p
            key="empty"
            className="toolbar-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Select a jewellery layer on the canvas to edit it.
          </motion.p>
        ) : (
          <motion.div
            key="controls"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            className="toolbar-controls"
          >
            <div className="toolbar-section">
              <span className="toolbar-section-label">Transform</span>
              <div className="toolbar-row">
                <Rotate disabled={disabled} />
                <Flip disabled={disabled} />
              </div>
              <div className="toolbar-row">
                <Duplicate disabled={disabled} />
                <Delete disabled={disabled} />
              </div>
            </div>

            <div className="toolbar-section">
              <span className="toolbar-section-label">Appearance</span>
              <Opacity disabled={disabled} />

              <div className="toolbar-slider">
                <label>Brightness</label>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={brightness * 100}
                  onChange={(e) => handleAdjust('brightness', Number(e.target.value) / 100)}
                />
              </div>

              <div className="toolbar-slider">
                <label>Contrast</label>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={contrast * 100}
                  onChange={(e) => handleAdjust('contrast', Number(e.target.value) / 100)}
                />
              </div>

              <div className="toolbar-slider">
                <label>Saturation</label>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={saturation * 100}
                  onChange={(e) => handleAdjust('saturation', Number(e.target.value) / 100)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default Toolbar;
