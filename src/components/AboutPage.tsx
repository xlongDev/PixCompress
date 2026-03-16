import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Image as ImageIcon, Code2, ArrowLeft } from 'lucide-react';
import { Glass } from './ui/Glass';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage = ({ onBack }: AboutPageProps) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: ShieldCheck,
      title: t('about.features.privacy.title'),
      content: t('about.features.privacy.content'),
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: t('about.features.speed.title'),
      content: t('about.features.speed.content'),
      color: 'text-yellow-500'
    },
    {
      icon: ImageIcon,
      title: t('about.features.quality.title'),
      content: t('about.features.quality.content'),
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <button
            onClick={onBack}
            className="group flex items-center gap-2 mx-auto mb-8 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('nav.home')}
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          <p className="text-xl text-[var(--color-text-muted)]">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Glass className="p-8 md:p-12 text-center" intensity="heavy">
            <p className="text-lg leading-relaxed text-[var(--color-text)] max-w-2xl mx-auto">
              {t('about.description')}
            </p>
          </Glass>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Glass className="p-6 h-full text-center space-y-4" intensity="light">
                <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-white/5 border border-white/10 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">{feature.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{feature.content}</p>
              </Glass>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-text)]">{t('about.techStack.title')}</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(t('about.techStack.items', { returnObjects: true }) as Record<string, { title: string, description: string }>).map(([key, item]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Glass className="p-6 h-full transition-all duration-300 group-hover:border-[var(--color-primary)]/30 group-hover:bg-[var(--color-primary)]/[0.02]" intensity="light">
                  <h4 className="text-lg font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
