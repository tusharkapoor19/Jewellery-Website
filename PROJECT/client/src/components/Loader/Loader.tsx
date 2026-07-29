import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  label?: string;
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ label = 'Loading...', fullscreen = false }) => (
  <div className={fullscreen ? 'loader-fullscreen' : 'loader-inline'}>
    <div className="loader-gem">
      <motion.svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
      >
        <polygon
          points="23,2 42,16 34,44 12,44 4,16"
          fill="none"
          stroke="#c9a24b"
          strokeWidth="2.5"
        />
        <polygon points="23,2 42,16 23,23" fill="#c9a24b" opacity="0.55" />
        <polygon points="4,16 23,23 12,44" fill="#e8cd8a" opacity="0.35" />
      </motion.svg>
    </div>
    <span>{label}</span>
  </div>
);

export default Loader;
