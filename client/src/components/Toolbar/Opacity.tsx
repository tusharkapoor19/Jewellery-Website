import React, { useState } from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { setActiveObjectOpacity } from '../../utils/canvas';

interface OpacityProps {
  disabled?: boolean;
}

const Opacity: React.FC<OpacityProps> = ({ disabled }) => {
  const canvas = useCanvasStore((s) => s.canvas);
  const [value, setValue] = useState(100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    setValue(next);
    if (canvas) setActiveObjectOpacity(canvas, next / 100);
  };

  return (
    <div className="toolbar-slider">
      <label htmlFor="opacity-slider">Opacity</label>
      <input
        id="opacity-slider"
        type="range"
        min={10}
        max={100}
        value={value}
        disabled={disabled || !canvas}
        onChange={handleChange}
      />
      <span>{value}%</span>
    </div>
  );
};

export default Opacity;
