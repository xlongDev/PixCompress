import { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, FileImage, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Glass } from './ui/Glass';
import { SUPPORTED_EXTENSIONS, MAX_BATCH_SIZE } from '@/types';
import { useTranslation } from 'react-i18next';

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  currentCount?: number;
}

export const UploadZone = ({
  onFilesSelected,
  disabled = false,
  maxFiles = MAX_BATCH_SIZE,
  currentCount = 0,
}: UploadZoneProps) => {
  const { t } = useTranslation();
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: FileList | null): File[] => {
    if (!files) return [];
    
    const validFiles: File[] = [];
    const remainingSlots = maxFiles - currentCount;
    
    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i];
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        validFiles.push(file);
      }
    }
    
    return validFiles;
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragActive(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragReject(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    // Check if files are being dragged
    const items = e.dataTransfer.items;
    let hasFiles = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        hasFiles = true;
        break;
      }
    }
    setIsDragReject(!hasFiles);
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragReject(false);
    
    if (disabled) return;
    
    const files = validateFiles(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [disabled, onFilesSelected, currentCount, maxFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = validateFiles(e.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onFilesSelected, currentCount, maxFiles]);

  const handleClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const remainingSlots = maxFiles - currentCount;

  return (
    <div className="relative group">
      {/* Background Decorative Elements */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <Glass 
        className={cn(
          'relative w-full overflow-hidden transition-all duration-500 border-2',
          isDragActive && !isDragReject ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-transparent',
          isDragReject ? 'border-[var(--color-error)] bg-[var(--color-error)]/5' : '',
          disabled && 'opacity-60 grayscale'
        )}
        intensity="heavy"
      >
        <motion.div
          className={cn(
            'flex flex-col items-center justify-center transition-all duration-500',
            currentCount > 0 
              ? 'p-4 md:p-6 lg:p-12 min-h-[160px] md:min-h-[200px] lg:min-h-[250px]' 
              : 'p-6 md:p-8 lg:p-20 min-h-[240px] md:min-h-[300px] lg:min-h-[400px]',
            'cursor-pointer',
            disabled && 'cursor-not-allowed'
          )}
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={SUPPORTED_EXTENSIONS.join(',')}
            onChange={handleFileInput}
            className="hidden"
            disabled={disabled}
          />

          {/* Upload Icon Container */}
          <div className={cn("relative transition-all duration-500", currentCount > 0 ? "mb-4 md:mb-6" : "mb-6 md:mb-10")}>
            <motion.div
              className="absolute -inset-4 bg-[var(--color-primary)]/20 rounded-full blur-2xl"
              animate={{
                scale: isDragActive ? [1, 1.5, 1.2] : [1, 1.2, 1],
                opacity: isDragActive ? 0.8 : 0.4
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <motion.div
              className={cn(
                'relative rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500',
                currentCount > 0 ? 'w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20' : 'w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28',
                'bg-gradient-to-br from-[var(--color-gradient-start)] to-[var(--color-gradient-end)]',
                'border border-white/20'
              )}
              animate={{
                y: isDragActive ? -10 : [0, -10, 0],
                rotate: isDragActive ? [0, -5, 5, 0] : 0
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 0.5, repeat: isDragActive ? Infinity : 0 }
              }}
            >
              <AnimatePresence mode="wait">
                {isDragReject ? (
                  <motion.div key="reject" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <X className="w-12 h-12 text-white" />
                  </motion.div>
                ) : isDragActive ? (
                  <motion.div key="active" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="w-12 h-12 text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="default" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Upload className={cn("transition-all duration-500", currentCount > 0 ? "w-8 h-8" : "w-12 h-12", "text-white")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
                y: [0, -2, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className={cn("text-center space-y-2 md:space-y-4 max-w-md transition-all duration-500", currentCount > 0 ? "scale-90" : "scale-100")}>
            <h3 className={cn("font-bold text-[var(--color-text)] tracking-tight transition-all duration-500", currentCount > 0 ? "text-base md:text-lg lg:text-xl" : "text-xl md:text-2xl lg:text-4xl")}>
              {isDragActive 
                ? isDragReject 
                  ? t('toast.invalidFormat')
                  : t('upload.dragActive')
                : t('upload.title')
              }
            </h3>
            {currentCount === 0 && (
              <p className="text-lg text-[var(--color-text-muted)] font-medium">
                {t('upload.subtitle')}
              </p>
            )}
          </div>

          {/* Formats and Info */}
          <div className={cn("flex flex-col items-center gap-4 md:gap-6 transition-all duration-500", currentCount > 0 ? "mt-2 md:mt-4" : "mt-6 md:mt-12")}>
            <div className="flex flex-wrap justify-center gap-3">
              {['AVIF', 'JPEG', 'JPG', 'PNG', 'WebP', 'GIF', 'SVG'].map((format) => (
                <span
                  key={format}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-sm font-bold tracking-wider",
                    "bg-white/5 text-[var(--color-text-muted)]",
                    "border border-white/10 backdrop-blur-sm",
                    "hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-colors",
                    currentCount > 0 ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs md:px-4 md:py-1.5 md:text-sm"
                  )}
                >
                  {format}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-sm font-semibold text-[var(--color-text-muted)]/70">
              <span className="flex items-center gap-2">
                <FileImage className="w-4 h-4" />
                {t('upload.maxSize')}
              </span>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[var(--color-border)]" />
              <span>
                {t('upload.batchHint', { count: remainingSlots })}
              </span>
            </div>
          </div>
        </motion.div>
      </Glass>
    </div>
  );
};
