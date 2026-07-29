import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DragDropProps {
  onFile: (file: File) => void;
  children: React.ReactNode;
  className?: string;
}

const DragDrop: React.FC<DragDropProps> = ({ onFile, children, className = '' }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) onFile(acceptedFiles[0]);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`dragdrop-zone ${isDragActive ? 'dragdrop-active' : ''} ${className}`}
    >
      <input {...getInputProps()} />
      {children}
      {isDragActive && (
        <div className="dragdrop-overlay">
          <span>Drop your photo here</span>
        </div>
      )}
    </div>
  );
};

export default DragDrop;
