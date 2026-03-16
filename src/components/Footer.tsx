import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-16 border-t border-[var(--color-border)]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, var(--color-gradient-start) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] bg-clip-text text-transparent">
                PixCompress
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] max-w-sm leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[var(--color-text)] mb-4">{t('nav.features')}</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('features')}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('features.smartCompression.title')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('features')}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('features.batchProcessing.title')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('features')}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('features.privacyFirst.title')}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-[var(--color-text)] mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('privacy')}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('footer.privacy')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms')}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('footer.terms')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/xlongDev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">{t('footer.github')}</span>
            </motion.a>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by xlongDev
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
