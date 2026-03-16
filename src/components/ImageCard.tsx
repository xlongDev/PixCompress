import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, RotateCcw, Check, AlertCircle, Copy } from 'lucide-react';
import type { CompressedImage } from '@/types';
import { formatFileSize } from '@/types';
import { GlassCard, GlassButton, GlassBadge } from './ui/Glass';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { ImageComparison } from './ImageComparison';

interface ImageCardProps {
  image: CompressedImage;
  onRemove: (id: string) => void;
  onDownload: (image: CompressedImage) => void;
  onRetry: (id: string) => void;
  onCopy?: (image: CompressedImage) => void;
}

const getStatusIcon = (status: CompressedImage['status']) => {
  switch (status) {
    case 'completed':
      return <Check className="w-4 h-4" />;
    case 'error':
      return <AlertCircle className="w-4 h-4" />;
    case 'compressing':
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <RotateCcw className="w-4 h-4" />
        </motion.div>
      );
    default:
      return <Check className="w-4 h-4" />;
  }
};

const getStatusColor = (status: CompressedImage['status']) => {
  switch (status) {
    case 'completed':
      return 'success' as const;
    case 'error':
      return 'error' as const;
    case 'compressing':
      return 'primary' as const;
    default:
      return 'warning' as const;
  }
};

export const ImageCard = ({
  image,
  onRemove,
  onDownload,
  onRetry,
  onCopy,
}: ImageCardProps) => {
  const { t } = useTranslation();
  const [showComparison, setShowComparison] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = () => {
    onDownload(image);
  };

  const handleRetry = () => {
    onRetry(image.id);
  };

  const handleRemove = () => {
    onRemove(image.id);
  };

  return (
    <GlassCard className="overflow-hidden">
      {/* Image Preview */}
      <div 
        className="relative aspect-square bg-[var(--color-background)] cursor-pointer overflow-hidden"
        onClick={() => image.status === 'completed' && setShowComparison(true)}
      >
        {image.status === 'completed' ? (
          <>
            <motion.img
              src={image.compressedUrl}
              alt={image.fileName}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                !imageLoaded && "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RotateCcw className="w-8 h-8 text-[var(--color-text-muted)]" />
                </motion.div>
              </div>
            )}
            
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              initial={false}
            >
              <span className="text-white text-sm font-medium">
                {t('actions.compare')}
              </span>
            </motion.div>
          </>
        ) : image.status === 'compressing' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            >
              <RotateCcw className="w-10 h-10 text-[var(--color-primary)]" />
            </motion.div>
            <span className="text-sm text-[var(--color-text-muted)]">
              {t('compression.compressing')}
            </span>
          </div>
        ) : image.status === 'error' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-10 h-10 text-[var(--color-error)]" />
            <span className="text-xs text-[var(--color-text-muted)] text-center px-4">
              {image.error || t('compression.failed')}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className="w-12 h-12 text-[var(--color-text-muted)]" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <GlassBadge color={getStatusColor(image.status)}>
            <span className="flex items-center gap-1">
              {getStatusIcon(image.status)}
              {image.status === 'completed' && `-${Math.round(image.compressionRatio)}%`}
            </span>
          </GlassBadge>
        </div>

        {/* Remove Button */}
        <motion.button
          className="absolute top-3 right-3 w-8 h-8 rounded-full
            bg-[var(--color-surface)]/80 backdrop-blur-md
            flex items-center justify-center
            text-[var(--color-text-muted)] hover:text-[var(--color-error)]
            border border-[var(--color-border)]"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-3">
        {/* Filename */}
        <p className="text-sm font-medium text-[var(--color-text)] truncate" title={image.fileName}>
          {image.fileName}
        </p>

        {/* Size Comparison */}
        {image.status === 'completed' && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--color-text-muted)]">
              {formatFileSize(image.originalSize)}
            </span>
            <motion.span 
              className="text-[var(--color-success)] font-medium"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {formatFileSize(image.compressedSize)}
            </motion.span>
          </div>
        )}

        {/* Progress Bar for compressing */}
        {image.status === 'compressing' && (
          <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '60%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          {image.status === 'completed' && (
            <>
              <GlassButton
                onClick={handleDownload}
                className="flex-1 justify-center"
                size="sm"
                variant="primary"
                icon={<Download className="w-4 h-4" />}
              >
                {t('actions.download')}
              </GlassButton>
              {onCopy && (
                <GlassButton
                  onClick={() => onCopy(image)}
                  className="px-3"
                  size="sm"
                  variant="secondary"
                  icon={<Copy className="w-4 h-4" />}
                >
                  {t('actions.copy')}
                </GlassButton>
              )}
            </>
          )}
          {image.status === 'error' && (
            <GlassButton
              onClick={handleRetry}
              className="flex-1 justify-center"
              size="sm"
              variant="secondary"
              icon={<RotateCcw className="w-4 h-4" />}
            >
              {t('actions.retry')}
            </GlassButton>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showComparison && (
          <ImageComparison 
            image={image} 
            onClose={() => setShowComparison(false)} 
          />
        )}
      </AnimatePresence>
    </GlassCard>
  );
};
