import { motion } from 'framer-motion';
import { FileImage, TrendingDown, HardDrive, Percent, Download, Trash2 } from 'lucide-react';
import { Glass, GlassButton } from './ui/Glass';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { formatFileSize } from '@/types';

interface StatsPanelProps {
  totalFiles: number;
  completedFiles: number;
  pendingFiles: number;
  totalOriginalSize: number;
  totalCompressedSize: number;
  totalSaved: number;
  averageCompressionRatio: number;
  onDownloadAll: () => void;
  onClearAll: () => void;
  hasCompletedFiles: boolean;
  hasFiles: boolean;
}

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subValue, 
  color = 'primary',
  delay = 0 
}: { 
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  color?: 'primary' | 'success' | 'error' | 'warning';
  delay?: number;
}) => {
  const colors = {
    primary: 'from-[var(--color-gradient-start)]/20 to-[var(--color-gradient-end)]/5',
    success: 'from-emerald-400/20 to-teal-500/5',
    error: 'from-red-400/20 to-rose-500/5',
    warning: 'from-amber-400/20 to-orange-500/5',
  };

  const iconColors = {
    primary: 'text-[var(--color-primary)]',
    success: 'text-emerald-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative p-5 rounded-2xl overflow-hidden',
        'bg-gradient-to-br',
        colors[color],
        'border border-[var(--glass-border)]'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--color-text-muted)] mb-1">{label}</p>
          <p className="text-2xl font-bold text-[var(--color-text)]">{value}</p>
          {subValue && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{subValue}</p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl bg-[var(--glass-background)]', iconColors[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

export const StatsPanel = ({
  totalFiles,
  completedFiles,
  pendingFiles,
  totalOriginalSize,
  totalCompressedSize,
  totalSaved,
  averageCompressionRatio,
  onDownloadAll,
  onClearAll,
  hasCompletedFiles,
  hasFiles,
}: StatsPanelProps) => {
  const { t } = useTranslation();

  if (!hasFiles) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Glass className="p-6" intensity="medium" glow>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">
              {t('compression.title')}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              {completedFiles} / {totalFiles} {t('compression.completed').toLowerCase()}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            {hasCompletedFiles && (
              <GlassButton
                onClick={onDownloadAll}
                variant="primary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
              >
                {t('actions.downloadAll')}
              </GlassButton>
            )}
            <GlassButton
              onClick={onClearAll}
              variant="secondary"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
            >
              {t('actions.clearAll')}
            </GlassButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={FileImage}
            label={t('stats.totalFiles')}
            value={totalFiles}
            subValue={`${completedFiles} ${t('compression.completed').toLowerCase()}`}
            color="primary"
            delay={0}
          />
          
          <StatCard
            icon={HardDrive}
            label={t('stats.originalSize')}
            value={formatFileSize(totalOriginalSize)}
            subValue={t('stats.compressedSize') + ': ' + formatFileSize(totalCompressedSize)}
            color="warning"
            delay={0.1}
          />
          
          <StatCard
            icon={TrendingDown}
            label={t('stats.saved')}
            value={formatFileSize(totalSaved)}
            subValue={`${Math.round(averageCompressionRatio)}% ${t('stats.ratio').toLowerCase()}`}
            color="success"
            delay={0.2}
          />
          
          <StatCard
            icon={Percent}
            label={t('stats.ratio')}
            value={`${Math.round(averageCompressionRatio)}%`}
            subValue={totalSaved > 0 ? `-${formatFileSize(totalSaved)}` : undefined}
            color={averageCompressionRatio > 50 ? 'success' : 'primary'}
            delay={0.3}
          />
        </div>

        {/* Progress Bar */}
        {pendingFiles > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[var(--color-text-muted)]">
                {t('compression.compressing')}
              </span>
              <span className="text-[var(--color-primary)]">
                {Math.round((completedFiles / totalFiles) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedFiles / totalFiles) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )}
      </Glass>
    </motion.div>
  );
};
