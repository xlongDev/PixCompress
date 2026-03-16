export interface CompressedImage {
  id: string;
  originalFile: File;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  fileName: string;
  fileType: string;
  compressionRatio: number;
  status: 'pending' | 'compressing' | 'completed' | 'error';
  error?: string;
  width: number;
  height: number;
}

export interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
  preserveExif: boolean;
  initialQuality: number;
  fileType: string;
}

export interface Theme {
  id: string;
  name: string;
  nameEn: string;
  isDark: boolean;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    background: string;
    surface: string;
    surfaceElevated: string;
    text: string;
    textMuted: string;
    textInverse: string;
    border: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    gradientStart: string;
    gradientEnd: string;
  };
  glass: {
    background: string;
    border: string;
    shadow: string;
    shadowHover: string;
    intensity?: 'light' | 'medium' | 'heavy';
  };
}

export type SupportedFormat = 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/webp' | 'image/gif' | 'image/svg+xml' | 'image/avif';

export const SUPPORTED_FORMATS: SupportedFormat[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
];

export const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const MAX_BATCH_SIZE = 50;

export const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
