import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  hover?: boolean;
  glow?: boolean;
}

export const Glass = ({ 
  children, 
  className, 
  intensity = 'medium',
  hover = true,
  glow = false 
}: GlassProps) => {
  const intensityMap = {
    light: 'backdrop-blur-md',
    medium: 'backdrop-blur-xl',
    heavy: 'backdrop-blur-2xl',
  };

  return (
    <motion.div
      className={cn(
        'relative rounded-3xl overflow-hidden',
        intensityMap[intensity],
        'border border-[var(--glass-border)]',
        'bg-[var(--glass-background)]',
        className
      )}
      whileHover={hover ? {
        y: -4,
        boxShadow: 'var(--glass-shadow-hover)',
        transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
      } : undefined}
      style={{
        boxShadow: glow ? 'var(--glass-shadow)' : undefined,
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.03) 100%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const GlassButton = ({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
}: GlassButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white shadow-lg',
    secondary: 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)]',
    ghost: 'bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative font-medium flex items-center justify-center gap-2 transition-all',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      whileHover={!disabled ? { 
        scale: 1.02,
        y: -2,
      } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const GlassCard = ({ children, className, onClick, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'relative rounded-3xl overflow-hidden',
        'backdrop-blur-xl border border-[var(--glass-border)]',
        'bg-[var(--glass-background)]',
        'shadow-[var(--glass-shadow)]',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={hover ? {
        y: -8,
        boxShadow: 'var(--glass-shadow-hover)',
        transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
      } : undefined}
    >
      {/* Shine effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

interface GlassBadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'success' | 'error' | 'warning';
}

export const GlassBadge = ({ children, className, color = 'primary' }: GlassBadgeProps) => {
  const colors = {
    primary: 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]',
    success: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
    error: 'bg-[var(--color-error)]/15 text-[var(--color-error)]',
    warning: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md',
      colors[color],
      className
    )}>
      {children}
    </span>
  );
};
