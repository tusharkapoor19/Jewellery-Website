import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCanvasStore } from '../../store/canvasStore';
import {
  getObjectByLayerId,
  getLayersFromCanvas,
  setLayerLocked,
  setLayerVisible,
  deleteLayer,
} from '../../utils/canvas';

const LayerPanel: React.FC = () => {
  const canvas = useCanvasStore((s) => s.canvas);
  const layers = useCanvasStore((s) => s.layers);
  const activeLayerId = useCanvasStore((s) => s.activeLayerId);
  const setActiveLayerId = useCanvasStore((s) => s.setActiveLayerId);
  const setLayers = useCanvasStore((s) => s.setLayers);

  const refresh = () => {
    if (canvas) setLayers(getLayersFromCanvas(canvas));
  };

  const selectLayer = (layerId: string) => {
    if (!canvas) return;
    const obj = getObjectByLayerId(canvas, layerId);
    if (obj && obj.selectable !== false) {
      canvas.setActiveObject(obj);
      canvas.requestRenderAll();
      setActiveLayerId(layerId);
    }
  };

  const moveLayer = (index: number, direction: -1 | 1) => {
    if (!canvas) return;
    const target = layers[index];
    const swapWith = layers[index + direction];
    if (!target || !swapWith) return;
    const objTarget = getObjectByLayerId(canvas, target.layerId);
    const objSwap = getObjectByLayerId(canvas, swapWith.layerId);
    if (!objTarget || !objSwap) return;
    const allObjects = canvas.getObjects();
    const iTarget = allObjects.indexOf(objTarget);
    const iSwap = allObjects.indexOf(objSwap);
    canvas.moveTo(objTarget, iSwap);
    canvas.moveTo(objSwap, iTarget);
    canvas.requestRenderAll();
    refresh();
  };

  if (layers.length === 0) {
    return (
      <div className="layer-panel layer-panel-empty">
        <span className="layer-panel-title">Layers</span>
        <p>No jewellery added yet. Pick a design from the left panel.</p>
      </div>
    );
  }

  return (
    <div className="layer-panel">
      <span className="layer-panel-title">Layers ({layers.length})</span>
      <div className="layer-list">
        <AnimatePresence initial={false}>
          {layers.map((layer, index) => (
            <motion.div
              key={layer.layerId}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`layer-row ${activeLayerId === layer.layerId ? 'layer-row-active' : ''}`}
              onClick={() => selectLayer(layer.layerId)}
            >
              <img src={layer.thumbnail} alt={layer.name} className="layer-thumb" />
              <span className="layer-name">{layer.name}</span>
              <div className="layer-actions">
                <button
                  title="Move up"
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLayer(index, -1);
                  }}
                >
                  ▲
                </button>
                <button
                  title="Move down"
                  disabled={index === layers.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLayer(index, 1);
                  }}
                >
                  ▼
                </button>
                <button
                  title={layer.visible ? 'Hide' : 'Show'}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canvas) setLayerVisible(canvas, layer.layerId, !layer.visible);
                    refresh();
                  }}
                >
                  {layer.visible ? '👁️' : '🙈'}
                </button>
                <button
                  title={layer.locked ? 'Unlock' : 'Lock'}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canvas) setLayerLocked(canvas, layer.layerId, !layer.locked);
                    refresh();
                  }}
                >
                  {layer.locked ? '🔒' : '🔓'}
                </button>
                <button
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canvas) deleteLayer(canvas, layer.layerId);
                    refresh();
                  }}
                >
                  🗑️
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LayerPanel;
