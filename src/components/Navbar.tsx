import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Monitor, 
  Check, 
  Globe, 
  Github,
  Palette,
  Image,
  Sparkles,
  Info,
  Menu,
  X,
  Languages
} from 'lucide-react';
import { themes } from '@/hooks/useTheme';
import type { Theme } from '@/types';
import { cn } from '@/lib/utils';

interface NavbarProps {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (id: string) => void;
  followSystem: boolean;
  toggleFollowSystem: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const languages = [
  { id: 'zh', name: '中文' },
  { id: 'en', name: 'English' },
];

const zhFlag = (
  <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm overflow-hidden border border-[var(--color-border)] shadow-sm">
    <path fill="#de2910" d="M0 0h640v480H0z"/>
    <path fill="#ffde00" d="M120 160L91 251l76-55-93 1 74 57-30-94zM240 80l-12 38 32-23-40 1 31 24-11-40zM300 140l-12 38 32-23-40 1 31 24-11-40zM300 240l-12 38 32-23-40 1 31 24-11-40zM240 300l-12 38 32-23-40 1 31 24-11-40z"/>
  </svg>
);

const enFlag = (
  <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-sm overflow-hidden border border-[var(--color-border)] shadow-sm">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="M75 0l245 184L565 0h75v56L395 240l245 184v56h-75L320 296 75 480H0v-56l245-184L0 56V0h75z"/>
    <path fill="#C8102E" d="M424 281l216 163v36L400 310l24 29zm216-281l-216 163-24-29L640 0v36zM0 0l216 163-24 29L0 36V0zm0 480l216-163 24 29L0 444v36z"/>
    <path fill="#FFF" d="M240 0v480h160V0H240zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M280 0v480h80V0h-80zM0 200v80h640v-80H0z"/>
  </svg>
);

const navItems = [
  { id: 'hero', label: 'nav.home', icon: Image },
  { id: 'compress', label: 'nav.compress', icon: Sparkles },
  { id: 'features', label: 'nav.features', icon: Palette },
  { id: 'about', label: 'nav.about', icon: Info },
];

export const Navbar = ({ 
  currentTheme, 
  setTheme, 
  followSystem, 
  toggleFollowSystem,
  activeSection,
  onNavigate,
}: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showLangPanel, setShowLangPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setShowThemePanel(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langId: string) => {
    i18n.changeLanguage(langId);
    localStorage.setItem('i18nextLng', langId);
    setShowLangPanel(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          layout
          initial={false}
          animate={{
            width: scrolled ? 'auto' : '100%',
            scale: scrolled ? 0.95 : 1,
            y: scrolled ? 4 : 0,
            borderRadius: scrolled ? '2rem' : '2.5rem'
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.8
          }}
          className={cn(
            "relative flex items-center justify-between transition-all duration-500 mx-auto",
            scrolled ? "px-4 py-2 bg-[var(--glass-background)]/80 backdrop-blur-3xl" : "px-6 py-4 bg-[var(--glass-background)]",
            "border border-[var(--glass-border)] shadow-[var(--glass-shadow)]",
            "w-full max-w-[calc(100vw-2rem)] sm:max-w-7xl"
          )}
        >
          
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate('hero')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] flex items-center justify-center shadow-lg flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="block text-base sm:text-lg font-bold bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] bg-clip-text text-transparent whitespace-nowrap">
              PixCompress
            </span>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'relative px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeSection === item.id 
                    ? 'text-[var(--color-primary)]' 
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(item.label)}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-full -z-10"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Theme Toggle */}
            <div className="relative" ref={themeRef}>
              <motion.button
                onClick={() => setShowThemePanel(!showThemePanel)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                  'bg-[var(--color-surface)] border border-[var(--color-border)]',
                  'text-[var(--color-text)] hover:text-[var(--color-primary)]',
                  showThemePanel && 'text-[var(--color-primary)]'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Palette className="w-5 h-5" />
              </motion.button>

              {/* Theme Panel */}
              <AnimatePresence>
                {showThemePanel && (
                  <motion.div
                    className="absolute right-0 top-12 w-56 p-3 rounded-2xl backdrop-blur-2xl bg-[var(--glass-background)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)]"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Mode Section */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">{t('settings.theme')}</p>
                      <div className="space-y-1">
                        <button
                          onClick={() => { toggleFollowSystem(); }}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all',
                            followSystem ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-surface)]'
                          )}
                        >
                          <Monitor className="w-4 h-4" />
                          <span className="text-sm">{t('settings.followSystem')}</span>
                          {followSystem && <Check className="w-4 h-4 ml-auto" />}
                        </button>
                      </div>
                    </div>

                    {/* Color Themes */}
                    <div>
                      <p className="text-xs font-medium text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">{t('settings.theme')}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {themes.map((theme) => {
                          const isSelected = currentTheme.id === theme.id;
                          return (
                            <button
                              key={theme.id}
                              onClick={() => setTheme(theme.id)}
                              className={cn(
                                'group relative flex flex-col items-center gap-1.5 p-1 rounded-xl transition-all duration-300',
                                isSelected ? 'bg-[var(--color-primary)]/5' : 'hover:bg-[var(--color-surface)]'
                              )}
                            >
                              <div className="relative">
                                <motion.div 
                                  className={cn(
                                    "w-8 h-8 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110",
                                    isSelected && "ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--glass-background)]"
                                  )}
                                  style={{ background: `linear-gradient(135deg, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})` }}
                                  layoutId={`theme-color-${theme.id}`}
                                />
                                {isSelected && (
                                  <motion.div
                                    layoutId="theme-active-indicator"
                                    className="absolute inset-0 rounded-full bg-white/20"
                                    initial={false}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                  />
                                )}
                              </div>
                              <span className={cn(
                                "text-[10px] font-bold truncate w-full text-center transition-colors",
                                isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"
                              )}>
                                {t(`settings.themes.${theme.id}`)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Toggle */}
            <div className="relative" ref={langRef}>
              <motion.button
                onClick={() => setShowLangPanel(!showLangPanel)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                  'bg-[var(--color-surface)] border border-[var(--color-border)]',
                  'text-[var(--color-text)] hover:text-[var(--color-primary)]',
                  showLangPanel && 'text-[var(--color-primary)]'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
              </motion.button>

              {/* Language Panel */}
              <AnimatePresence>
                {showLangPanel && (
                  <motion.div
                    className="absolute right-0 top-12 w-40 p-2 rounded-2xl backdrop-blur-2xl bg-[var(--glass-background)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)]"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => changeLanguage(lang.id)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                          i18n.language === lang.id 
                            ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' 
                            : 'hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                        )}
                      >
                        {lang.id === 'zh' ? zhFlag : enFlag}
                        <span className="text-sm font-medium">{lang.name}</span>
                        {i18n.language === lang.id && (
                          <motion.div layoutId="langCheck">
                            <Check className="w-4 h-4 ml-auto" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GitHub */}
            <motion.a
              href="https://github.com/xlongDev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>

            {/* Mobile Menu Button - Moved to right */}
            <div className="flex md:hidden">
              <motion.button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
                whileTap={{ scale: 0.9 }}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="fixed inset-0 top-[88px] z-40 md:hidden px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="p-4 rounded-[2rem] bg-[var(--glass-background)]/90 backdrop-blur-3xl border border-[var(--glass-border)] shadow-2xl flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setShowMobileMenu(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all",
                    activeSection === item.id 
                      ? "bg-[var(--color-primary)] text-white shadow-lg" 
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-bold">{t(item.label)}</span>
                  {activeSection === item.id && <Check className="w-5 h-5 ml-auto" />}
                </button>
              ))}
              
              <div className="h-px bg-[var(--color-border)] my-2" />
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => { setShowLangPanel(!showLangPanel); setShowMobileMenu(false); }}
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-bold"
                >
                  <Languages className="w-4 h-4" />
                  {i18n.language === 'zh' ? '中文' : 'English'}
                </button>
                <button 
                  onClick={() => { setShowThemePanel(!showThemePanel); setShowMobileMenu(false); }}
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-bold"
                >
                  <Palette className="w-4 h-4" />
                  {t('settings.theme')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
