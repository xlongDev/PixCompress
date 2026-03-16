import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { UploadZone } from '@/components/UploadZone';
import { ImageCard } from '@/components/ImageCard';
import { StatsPanel } from '@/components/StatsPanel';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { PrivacyPage, TermsPage } from '@/components/LegalPages';
import { AboutPage } from '@/components/AboutPage';
import { QualitySelector } from '@/components/QualitySelector';
import { Glass } from '@/components/ui/Glass';

import { useTheme } from '@/hooks/useTheme';
import { useImageCompression } from '@/hooks/useImageCompression';
import { useDownload } from '@/hooks/useDownload';

import type { CompressedImage } from '@/types';
import { MAX_BATCH_SIZE } from '@/types';
import './App.css';

function App() {
  const { t } = useTranslation();
  const { currentTheme, themes, setTheme, followSystem, toggleFollowSystem } = useTheme();
  const { images, addImages, removeImage, clearImages, retryImage, getStats } = useImageCompression();
  const { downloadSingle, downloadBatch, copyToClipboard } = useDownload();

  const [activeSection, setActiveSection] = useState('hero');
  const [currentPage, setCurrentPage] = useState<'main' | 'privacy' | 'terms' | 'about'>('main');
  const [isInitialized, setIsInitialized] = useState(false);
  const [compressionQuality, setCompressionQuality] = useState(0.75);
  
  const compressRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Scroll spy
  useEffect(() => {
    if (currentPage !== 'main') {
      setActiveSection(currentPage);
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      
      const sections = ['hero', 'compress', 'features'];
      const refs = [null, compressRef.current, featuresRef.current];
      
      let current = 'hero';
      for (let i = sections.length - 1; i >= 0; i--) {
        const ref = refs[i];
        if (ref) {
          const offset = ref.offsetTop;
          if (scrollPos >= offset) {
            current = sections[i];
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const remainingSlots = MAX_BATCH_SIZE - images.length;
    
    if (files.length > remainingSlots) {
      toast.warning(t('toast.maxFilesReached'), {
        description: `Max ${MAX_BATCH_SIZE} images`,
      });
      files = files.slice(0, remainingSlots);
    }

    if (files.length > 0) {
      await addImages(files, { initialQuality: compressionQuality });
      toast.success(t('toast.compressionComplete'));
      
      // Auto-scroll to results
      setTimeout(() => {
        statsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [images.length, addImages, t, compressionQuality]);

  const handleDownload = useCallback(async (image: CompressedImage) => {
    try {
      await downloadSingle(image);
      toast.success(t('toast.downloadComplete'));
    } catch (error) {
      toast.error(t('toast.error'), {
        description: 'Download failed',
      });
    }
  }, [downloadSingle, t]);

  const handleDownloadAll = useCallback(async () => {
    try {
      await downloadBatch(images);
      toast.success(t('toast.downloadComplete'));
    } catch (error) {
      toast.error(t('toast.error'), {
        description: 'Batch download failed',
      });
    }
  }, [images, downloadBatch, t]);

  const handleClearAll = useCallback(() => {
    clearImages();
    toast.info(t('toast.allCleared'));
  }, [clearImages, t]);

  const handleCopy = useCallback(async (image: CompressedImage) => {
    try {
      await copyToClipboard(image);
      toast.success(t('toast.copySuccess'));
    } catch (error) {
      toast.error(t('toast.copyFailed'));
    }
  }, [copyToClipboard, t]);

  const handleNavigate = useCallback((id: string) => {
    if (id === 'privacy' || id === 'terms' || id === 'about') {
      setCurrentPage(id as any);
      setActiveSection(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('main');
      if (id === 'compress' && compressRef.current) {
        compressRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'features' && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('hero');
      }
    }
  }, []);

  const handleStartCompress = useCallback(() => {
    compressRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScrollToFeatures = useCallback(() => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const stats = getStats();

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] transition-colors duration-500 relative">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'var(--glass-background)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            color: 'var(--color-text)',
          },
        }}
      />

      <Navbar
        currentTheme={currentTheme}
        themes={themes}
        setTheme={setTheme}
        followSystem={followSystem}
        toggleFollowSystem={toggleFollowSystem}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'main' && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <Hero 
              onStartCompress={handleStartCompress}
              onScrollToFeatures={handleScrollToFeatures}
            />

            {/* Compress Section */}
            <section 
              ref={compressRef}
              id="compress"
              className="py-20 px-4 sm:px-6"
            >
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Integrated Compression Console */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <Glass className="overflow-hidden rounded-[2.5rem] border-[var(--glass-border)] shadow-2xl" intensity="heavy">
                    <div className="flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-[var(--glass-border)] min-h-[400px]">
                      {/* Controls Sidebar/Top */}
                      <div className="w-full lg:w-80 p-6 sm:p-10 bg-[var(--color-surface)]/30 backdrop-blur-md flex flex-col justify-center">
                        <QualitySelector 
                          quality={compressionQuality} 
                          onChange={setCompressionQuality}
                          disabled={images.length >= MAX_BATCH_SIZE}
                        />
                      </div>

                      {/* Main Upload Area */}
                      <div className="flex-1 p-6 sm:p-10 bg-transparent flex flex-col">
                        <div className="w-full h-full flex-1">
                          <UploadZone
                            onFilesSelected={handleFilesSelected}
                            disabled={images.length >= MAX_BATCH_SIZE}
                            maxFiles={MAX_BATCH_SIZE}
                            currentCount={images.length}
                          />
                        </div>
                      </div>
                    </div>
                  </Glass>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-primary)]/10 blur-[100px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-gradient-end)]/10 blur-[100px] rounded-full pointer-events-none" />
                </motion.div>

                {/* Stats Panel */}
                <div ref={statsRef} className="scroll-mt-24">
                  <StatsPanel
                  totalFiles={stats.totalFiles}
                  completedFiles={stats.completedFiles}
                  pendingFiles={stats.pendingFiles}
                  totalOriginalSize={stats.totalOriginalSize}
                  totalCompressedSize={stats.totalCompressedSize}
                  totalSaved={stats.totalSaved}
                  averageCompressionRatio={stats.averageCompressionRatio}
                  onDownloadAll={handleDownloadAll}
                  onClearAll={handleClearAll}
                  hasCompletedFiles={stats.completedFiles > 0}
                  hasFiles={images.length > 0}
                />
              </div>

                {/* Image Grid */}
                {images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      <AnimatePresence mode="popLayout">
                        {images.map((image) => (
                          <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                            transition={{ 
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                            layout
                          >
                            <ImageCard
                              image={image}
                              onRemove={removeImage}
                              onDownload={handleDownload}
                              onRetry={retryImage}
                              onCopy={handleCopy}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Features Section */}
            <div ref={featuresRef}>
              <Features />
            </div>

            {/* Footer */}
            <Footer onNavigate={handleNavigate} />
          </motion.main>
        )}

        {currentPage === 'privacy' && (
          <PrivacyPage onBack={() => setCurrentPage('main')} />
        )}

        {currentPage === 'terms' && (
          <TermsPage onBack={() => setCurrentPage('main')} />
        )}

        {currentPage === 'about' && (
          <AboutPage onBack={() => setCurrentPage('main')} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
