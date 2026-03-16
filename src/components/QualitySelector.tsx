import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Image as ImageIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QualitySelectorProps {
  quality: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const QualitySelector = ({ quality, onChange, disabled }: QualitySelectorProps) => {
  const { t } = useTranslation();

  const presets = [
    { id: 'best', value: 0.6, icon: Sparkles, color: 'from-rose-500 to-orange-400', label: '极致' },
    { id: 'balanced', value: 0.8, icon: Zap, color: 'from-amber-400 to-yellow-300', label: '均衡' },
    { id: 'quality', value: 0.95, icon: ImageIcon, color: 'from-blue-500 to-cyan-400', label: '原画' },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Header with Large Quality Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text)] leading-tight">{t('compress.qualityTitle')}</h3>
              <p className="text-[10px] text-[var(--color-text-muted)]">{t('compress.qualityDesc')}</p>
            </div>
          </div>
          <motion.div 
            key={quality}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-black italic tracking-tighter text-[var(--color-primary)] font-mono"
          >
            {Math.round(quality * 100)}%
          </motion.div>
        </div>
      </div>

      {/* Tactile Slider Container */}
      <div className="relative pt-6 pb-2 px-1">
        <div className="flex justify-between absolute -top-1 left-1 right-1 px-1">
          <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{t('compress.smaller')}</span>
          <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{t('compress.better')}</span>
        </div>

        <div className="relative h-12 flex items-center group">
          {/* Background Track */}
          <div className="absolute inset-0 h-3 my-auto bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient-end)]"
              animate={{ width: `${quality * 100}%` }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          </div>

          {/* Real Input Slider (hidden visually but handles interaction) */}
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.01"
            value={quality}
            onChange={handleSliderChange}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />

          {/* Animated Thumb */}
          <motion.div 
            className="absolute z-10 w-8 h-8 rounded-full bg-white shadow-xl border-2 border-[var(--color-primary)] pointer-events-none flex items-center justify-center"
            animate={{ left: `calc(${quality * 100}% - 16px)` }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            
            {/* Pulse effect on hover/active */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-[var(--color-primary)]/20"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Ticks */}
        <div className="flex justify-between px-2 mt-1">
          {[0, 25, 50, 75, 100].map((t) => (
            <div key={t} className="w-0.5 h-1 bg-[var(--color-border)] rounded-full" />
          ))}
        </div>
      </div>

      {/* Enhanced Presets Grid */}
      <div className="grid grid-cols-3 gap-2">
        {presets.map((preset) => {
          const isActive = Math.abs(quality - preset.value) < 0.01;
          return (
            <motion.button
              key={preset.id}
              onClick={() => onChange(preset.value)}
              disabled={disabled}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 border overflow-hidden",
                isActive 
                  ? "bg-[var(--color-surface)] border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/10" 
                  : "bg-white/5 border-[var(--color-border)] hover:bg-white/10"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-inner transition-transform duration-500",
                preset.color,
                isActive ? "scale-110 rotate-3" : "opacity-80"
              )}>
                <preset.icon className="w-5 h-5 text-white" />
              </div>

              <div className="text-center">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-wider block transition-colors",
                  isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"
                )}>
                  {t(`compress.presets.${preset.id}`)}
                </span>
              </div>

              {isActive && (
                <motion.div 
                  layoutId="indicator"
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-0.5"
                  transition={{ type: "spring", bounce: 0.4 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
