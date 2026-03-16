import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '@/types';
export type { Theme } from '@/types';

export const themes: Theme[] = [
  {
    id: 'light',
    name: '浅色',
    nameEn: 'Light',
    isDark: false,
    colors: {
      primary: '#6366f1',
      primaryLight: '#818cf8',
      primaryDark: '#4f46e5',
      secondary: '#f5f3ff',
      background: '#f8fafc',
      surface: '#ffffff',
      surfaceElevated: '#ffffff',
      text: '#1e293b',
      textMuted: '#64748b',
      textInverse: '#ffffff',
      border: 'rgba(99, 102, 241, 0.1)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      gradientStart: '#6366f1',
      gradientEnd: '#a855f7',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.45)',
      border: 'rgba(255, 255, 255, 0.7)',
      shadow: '0 8px 32px rgba(31, 38, 135, 0.04)',
      shadowHover: '0 20px 40px rgba(31, 38, 135, 0.07)',
    },
  },
  {
    id: 'breeze',
    name: '清风',
    nameEn: 'Breeze',
    isDark: false,
    colors: {
      primary: '#0ea5e9',
      primaryLight: '#38bdf8',
      primaryDark: '#0284c7',
      secondary: '#f0f9ff',
      background: '#f0f9ff',
      surface: '#ffffff',
      surfaceElevated: '#ffffff',
      text: '#0c4a6e',
      textMuted: '#075985',
      textInverse: '#ffffff',
      border: 'rgba(14, 165, 233, 0.1)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#0ea5e9',
      gradientStart: '#0ea5e9',
      gradientEnd: '#2dd4bf',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.4)',
      border: 'rgba(255, 255, 255, 0.8)',
      shadow: '0 8px 32px rgba(14, 165, 233, 0.05)',
      shadowHover: '0 20px 40px rgba(14, 165, 233, 0.1)',
    },
  },
  {
    id: 'dark',
    name: '深色',
    nameEn: 'Dark',
    isDark: true,
    colors: {
      primary: '#818cf8',
      primaryLight: '#a5b4fc',
      primaryDark: '#6366f1',
      secondary: '#1e1b4b',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceElevated: '#334155',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      textInverse: '#0f172a',
      border: 'rgba(255, 255, 255, 0.08)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      gradientStart: '#818cf8',
      gradientEnd: '#c084fc',
    },
    glass: {
      background: 'rgba(15, 23, 42, 0.5)',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      shadowHover: '0 20px 40px rgba(0, 0, 0, 0.4)',
    },
  },
  {
    id: 'ocean',
    name: '海洋',
    nameEn: 'Ocean',
    isDark: true,
    colors: {
      primary: '#06b6d4',
      primaryLight: '#22d3ee',
      primaryDark: '#0891b2',
      secondary: '#ecfeff',
      background: '#083344',
      surface: '#164e63',
      surfaceElevated: '#155e75',
      text: '#ecfeff',
      textMuted: '#99f6e4',
      textInverse: '#083344',
      border: 'rgba(6, 182, 212, 0.2)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#06b6d4',
      gradientStart: '#06b6d4',
      gradientEnd: '#3b82f6',
    },
    glass: {
      background: 'rgba(22, 78, 99, 0.5)',
      border: 'rgba(6, 182, 212, 0.2)',
      shadow: '0 8px 32px rgba(6, 182, 212, 0.15)',
      shadowHover: '0 20px 40px rgba(6, 182, 212, 0.25)',
    }
  },
  {
    id: 'sunset',
    name: '日落',
    nameEn: 'Sunset',
    isDark: true,
    colors: {
      primary: '#f97316',
      primaryLight: '#fb923c',
      primaryDark: '#ea580c',
      secondary: '#fff7ed',
      background: '#1a0f1b',
      surface: '#2d1b2e',
      surfaceElevated: '#452c46',
      text: '#ffeeff',
      textMuted: '#b4a0b5',
      textInverse: '#1a0f1b',
      border: 'rgba(249, 115, 22, 0.2)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#f97316',
      gradientStart: '#f97316',
      gradientEnd: '#7c3aed',
    },
    glass: {
      background: 'rgba(45, 27, 46, 0.5)',
      border: 'rgba(249, 115, 22, 0.2)',
      shadow: '0 8px 32px rgba(249, 115, 22, 0.15)',
      shadowHover: '0 20px 40px rgba(249, 115, 22, 0.25)',
    }
  },
  {
    id: 'emerald',
    name: '翡翠',
    nameEn: 'Emerald',
    isDark: true,
    colors: {
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
      secondary: '#d1fae5',
      background: '#022c22',
      surface: '#064e3b',
      surfaceElevated: '#065f46',
      text: '#ecfdf5',
      textMuted: '#6ee7b7',
      textInverse: '#022c22',
      border: 'rgba(16, 185, 129, 0.2)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#10b981',
      gradientStart: '#10b981',
      gradientEnd: '#059669',
    },
    glass: {
      background: 'rgba(6, 78, 59, 0.5)',
      border: 'rgba(16, 185, 129, 0.2)',
      shadow: '0 8px 32px rgba(16, 185, 129, 0.15)',
      shadowHover: '0 20px 40px rgba(16, 185, 129, 0.25)',
    }
  },
  {
    id: 'sakura',
    name: '樱花',
    nameEn: 'Sakura',
    isDark: false,
    colors: {
      primary: '#fb7185',
      primaryLight: '#fda4af',
      primaryDark: '#e11d48',
      secondary: '#fff1f2',
      background: '#fff5f5',
      surface: '#fff1f2',
      surfaceElevated: '#ffe4e6',
      text: '#4c0519',
      textMuted: '#9f1239',
      textInverse: '#ffffff',
      border: 'rgba(251, 113, 133, 0.1)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#fb7185',
      gradientStart: '#fb7185',
      gradientEnd: '#fda4af',
    },
    glass: {
      background: 'rgba(255, 241, 242, 0.45)',
      border: 'rgba(255, 255, 255, 0.7)',
      shadow: '0 8px 32px rgba(251, 113, 133, 0.15)',
      shadowHover: '0 20px 40px rgba(251, 113, 133, 0.25)',
    }
  },
  {
    id: 'purple',
    name: '紫霞',
    nameEn: 'Purple',
    isDark: true,
    colors: {
      primary: '#8b5cf6',
      primaryLight: '#a78bfa',
      primaryDark: '#7c3aed',
      secondary: '#f5f3ff',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceElevated: '#334155',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      textInverse: '#0f172a',
      border: 'rgba(139, 92, 246, 0.2)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      gradientStart: '#8b5cf6',
      gradientEnd: '#d946ef',
    },
    glass: {
      background: 'rgba(30, 41, 59, 0.5)',
      border: 'rgba(139, 92, 246, 0.2)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      shadowHover: '0 20px 40px rgba(0, 0, 0, 0.4)',
    }
  },
  {
    id: 'cyberpunk',
    name: '赛博',
    nameEn: 'Cyberpunk',
    isDark: true,
    colors: {
      primary: '#f0abfc',
      primaryLight: '#f5d0fe',
      primaryDark: '#e879f9',
      secondary: '#2e1065',
      background: '#0d0118',
      surface: '#1e0533',
      surfaceElevated: '#2e1065',
      text: '#fdf4ff',
      textMuted: '#d8b4fe',
      textInverse: '#0d0118',
      border: 'rgba(240, 171, 252, 0.1)',
      success: '#4ade80',
      error: '#f87171',
      warning: '#fbbf24',
      info: '#22d3ee',
      gradientStart: '#a855f7',
      gradientEnd: '#ec4899',
    },
    glass: {
      background: 'rgba(30, 5, 51, 0.5)',
      border: 'rgba(240, 171, 252, 0.1)',
      shadow: '0 8px 32px rgba(168, 85, 247, 0.2)',
      shadowHover: '0 20px 40px rgba(168, 85, 247, 0.4)',
    }
  },
  {
    id: 'candy',
    name: '甜心',
    nameEn: 'Candy',
    isDark: false,
    colors: {
      primary: '#ec4899',
      primaryLight: '#f472b6',
      primaryDark: '#db2777',
      secondary: '#fdf2f8',
      background: '#fff1f2',
      surface: '#fff1f2',
      surfaceElevated: '#ffe4e6',
      text: '#831843',
      textMuted: '#be185d',
      textInverse: '#ffffff',
      border: 'rgba(236, 72, 153, 0.1)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#ec4899',
      gradientStart: '#ec4899',
      gradientEnd: '#f43f5e',
    },
    glass: {
      background: 'rgba(255, 241, 242, 0.45)',
      border: 'rgba(255, 255, 255, 0.7)',
      shadow: '0 8px 32px rgba(236, 72, 153, 0.1)',
      shadowHover: '0 20px 40px rgba(236, 72, 153, 0.15)',
    }
  },
  {
    id: 'mineral',
    name: '矿石',
    nameEn: 'Mineral',
    isDark: true,
    colors: {
      primary: '#94a3b8',
      primaryLight: '#cbd5e1',
      primaryDark: '#64748b',
      secondary: '#f1f5f9',
      background: '#1e293b',
      surface: '#334155',
      surfaceElevated: '#475569',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      textInverse: '#1e293b',
      border: 'rgba(148, 163, 184, 0.1)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#94a3b8',
      gradientStart: '#64748b',
      gradientEnd: '#475569',
    },
    glass: {
      background: 'rgba(30, 41, 59, 0.5)',
      border: 'rgba(255, 255, 255, 0.05)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      shadowHover: '0 20px 40px rgba(0, 0, 0, 0.3)',
    }
  },
  {
    id: 'dusk',
    name: '黄昏',
    nameEn: 'Dusk',
    isDark: true,
    colors: {
      primary: '#f43f5e',
      primaryLight: '#fb7185',
      primaryDark: '#e11d48',
      secondary: '#fff1f2',
      background: '#2d1b2e',
      surface: '#452c46',
      surfaceElevated: '#5c3d5d',
      text: '#fee2e2',
      textMuted: '#fda4af',
      textInverse: '#2d1b2e',
      border: 'rgba(244, 63, 94, 0.2)',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#f43f5e',
      gradientStart: '#f43f5e',
      gradientEnd: '#8b5cf6',
    },
    glass: {
      background: 'rgba(45, 44, 70, 0.5)',
      border: 'rgba(244, 63, 94, 0.1)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      shadowHover: '0 20px 40px rgba(0, 0, 0, 0.5)',
    }
  },
];

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [followSystem, setFollowSystem] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('pixcompress-theme');
    const savedFollowSystem = localStorage.getItem('pixcompress-follow-system');
    
    if (savedFollowSystem !== null) {
      setFollowSystem(savedFollowSystem === 'true');
    }
    
    if (savedTheme && savedFollowSystem !== 'true') {
      const theme = themes.find(t => t.id === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  useEffect(() => {
    if (followSystem) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setCurrentTheme(e.matches ? themes[2] : themes[0]);
      };
      
      setCurrentTheme(mediaQuery.matches ? themes[2] : themes[0]);
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [followSystem]);

  useEffect(() => {
    const root = document.documentElement;
    const theme = currentTheme;
    
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
    root.style.setProperty('--color-primary-dark', theme.colors.primaryDark);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-surface-elevated', theme.colors.surfaceElevated);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-muted', theme.colors.textMuted);
    root.style.setProperty('--color-text-inverse', theme.colors.textInverse);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-error', theme.colors.error);
    root.style.setProperty('--color-warning', theme.colors.warning);
    root.style.setProperty('--color-info', theme.colors.info);
    root.style.setProperty('--color-gradient-start', theme.colors.gradientStart);
    root.style.setProperty('--color-gradient-end', theme.colors.gradientEnd);
    
    root.style.setProperty('--glass-background', theme.glass.background);
    root.style.setProperty('--glass-border', theme.glass.border);
    root.style.setProperty('--glass-shadow', theme.glass.shadow);
    root.style.setProperty('--glass-shadow-hover', theme.glass.shadowHover);
    
    // Set dark class for Tailwind
    if (theme.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  const setTheme = useCallback((themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('pixcompress-theme', themeId);
    }
  }, []);

  const toggleFollowSystem = useCallback(() => {
    setFollowSystem(prev => {
      const newValue = !prev;
      localStorage.setItem('pixcompress-follow-system', String(newValue));
      return newValue;
    });
  }, []);

  return {
    currentTheme,
    themes,
    setTheme,
    followSystem,
    toggleFollowSystem,
  };
}
