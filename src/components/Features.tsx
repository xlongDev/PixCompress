import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, Layers, Shield, FileType } from 'lucide-react';
import { GlassCard } from './ui/Glass';
import { cn } from '@/lib/utils';

const features = [
  {
    id: 'smartCompression',
    icon: Zap,
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'batchProcessing',
    icon: Layers,
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'privacyFirst',
    icon: Shield,
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'multiFormat',
    icon: FileType,
    gradient: 'from-purple-400 to-pink-500',
  },
];

export const Features = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  return (
    <section 
      ref={containerRef}
      id="features"
      className="relative py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--color-gradient-start) 0%, transparent 70%)',
            filter: 'blur(60px)',
            y: y1,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-0 w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, var(--color-gradient-end) 0%, transparent 70%)',
            filter: 'blur(60px)',
            y: y2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] bg-clip-text text-transparent">
              {t('features.title')}
            </span>
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid with 3D Effect */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          style={{
            perspective: '1000px',
            rotateX,
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{ 
                  y: -10, 
                  rotateX: -5,
                  transition: { duration: 0.3 } 
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <GlassCard className="h-full p-8" hover>
                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-6',
                    'bg-gradient-to-br',
                    feature.gradient
                  )}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                    {t(`features.${feature.id}.title`)}
                  </h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {t(`features.${feature.id}.description`)}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
