import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, FileText, Eye, Cookie, ExternalLink } from 'lucide-react';
import { Glass } from './ui/Glass';
import { GlassButton } from './ui/Glass';

interface LegalPagesProps {
  onBack: () => void;
}

export const PrivacyPage = ({ onBack }: LegalPagesProps) => {
  const { t } = useTranslation();

  const sections = [
    { id: 'localProcessing', icon: Eye },
    { id: 'dataCollection', icon: Shield },
    { id: 'cookies', icon: Cookie },
    { id: 'thirdParty', icon: ExternalLink },
  ];

  return (
    <motion.div
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <GlassButton
            onClick={onBack}
            variant="secondary"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </GlassButton>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text)] mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-[var(--color-text-muted)]">{t('privacy.lastUpdated')}</p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Glass className="p-6 sm:p-8" intensity="medium">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gradient-start)]/20 to-[var(--color-gradient-end)]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                        {t(`privacy.sections.${section.id}.title`)}
                      </h2>
                      <p className="text-[var(--color-text-muted)] leading-relaxed">
                        {t(`privacy.sections.${section.id}.content`)}
                      </p>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export const TermsPage = ({ onBack }: LegalPagesProps) => {
  const { t } = useTranslation();

  const sections = [
    { id: 'usage', icon: FileText },
    { id: 'limitations', icon: Shield },
    { id: 'disclaimer', icon: Eye },
    { id: 'changes', icon: ExternalLink },
  ];

  return (
    <motion.div
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <GlassButton
            onClick={onBack}
            variant="secondary"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </GlassButton>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text)] mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-[var(--color-text-muted)]">{t('terms.lastUpdated')}</p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Glass className="p-6 sm:p-8" intensity="medium">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gradient-start)]/20 to-[var(--color-gradient-end)]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                        {t(`terms.sections.${section.id}.title`)}
                      </h2>
                      <p className="text-[var(--color-text-muted)] leading-relaxed">
                        {t(`terms.sections.${section.id}.content`)}
                      </p>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
