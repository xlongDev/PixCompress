import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { CompressedImage } from '@/types';
import { formatFileSize } from '@/types';
import { GlassBadge } from './ui/Glass';
import { useTranslation } from 'react-i18next';

interface ImageComparisonProps {
  image: CompressedImage;
  onClose: () => void;
}

export const ImageComparison = ({ image, onClose }: ImageComparisonProps) => {
  const { t } = useTranslation();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleStartResizing = () => setIsResizing(true);
  const handleEndResizing = () => setIsResizing(false);

  useEffect(() => {
    window.addEventListener('mouseup', handleEndResizing);
    window.addEventListener('touchend', handleEndResizing);
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('mouseup', handleEndResizing);
      window.removeEventListener('touchend', handleEndResizing);
      document.body.style.overflow = '';
    };
  }, []);

  const aspectRatio = image.width && image.height ? image.width / image.height : 1;
  const isLandscape = aspectRatio > 1;

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-[98vw] md:max-w-[90vw] lg:max-w-7xl rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-[#0d0d0d] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col mx-auto"
        style={{
          aspectRatio: isLandscape ? undefined : `${Math.min(aspectRatio, 1.2)} / 1`,
          maxHeight: '90vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header/Controls */}
        <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
          <div className="flex flex-col gap-1 pointer-events-auto">
            <h3 className="text-white font-bold text-sm sm:text-lg truncate max-w-[200px] sm:max-w-md">
              {image.fileName}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs text-white/60 font-medium">
                {formatFileSize(image.originalSize)} → {formatFileSize(image.compressedSize)}
              </span>
              <GlassBadge color="success">
                -{Math.round(image.compressionRatio)}%
              </GlassBadge>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-md"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Comparison Container */}
        <div 
          ref={containerRef}
          className="relative cursor-col-resize select-none overflow-hidden flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseDown={handleStartResizing}
          onTouchStart={handleStartResizing}
        >
          {/* Main Image (Invisible, used to define container size) */}
          <img
            src={image.compressedUrl}
            alt="Sizing Base"
            className="max-w-full max-h-[85vh] lg:max-h-[90vh] object-contain opacity-0 pointer-events-none"
          />

          {/* Compressed Image (Bottom Layer) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={image.compressedUrl}
              alt="Compressed"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
            <div className="absolute bottom-4 right-4 z-10">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[10px] sm:text-xs font-bold border border-white/10">
                {t('compression.compressed')}
              </span>
            </div>
          </div>

          {/* Original Image (Top Layer) */}
          <div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden z-10 pointer-events-none"
            style={{ 
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}
          >
            <img
              src={image.originalUrl}
              alt="Original"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
            <div className="absolute bottom-4 left-4 whitespace-nowrap">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[var(--color-primary)] text-white text-[10px] sm:text-xs font-bold shadow-lg">
                {t('compression.original')}
              </span>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-black pointer-events-auto cursor-col-resize transition-transform"
              >
                <div className="flex gap-0.5 sm:gap-1">
                  <div className="w-0.5 h-3 sm:h-4 rounded-full bg-black/20" />
                  <div className="w-0.5 h-3 sm:h-4 rounded-full bg-black/20" />
                  <div className="w-0.5 h-3 sm:h-4 rounded-full bg-black/20" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(content, document.body);
};
