import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import type { CompressedImage, CompressionOptions } from '@/types';
import { SUPPORTED_FORMATS, generateId } from '@/types';

const defaultOptions: CompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 2560, // Increased for better quality
  useWebWorker: true,
  preserveExif: false,
  initialQuality: 0.8, // Slightly higher default
  fileType: 'image/jpeg',
};

export function useImageCompression() {
  const [images, setImages] = useState<CompressedImage[]>([]);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!SUPPORTED_FORMATS.includes(file.type as any)) {
      return { valid: false, error: 'Unsupported file format' };
    }
    if (file.size > 50 * 1024 * 1024) {
      return { valid: false, error: 'File size exceeds 50MB limit' };
    }
    return { valid: true };
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const compressSingle = async (file: File, options: Partial<CompressionOptions> = {}): Promise<CompressedImage> => {
    const validation = validateFile(file);
    const dimensions = await getImageDimensions(file);
    const id = generateId();
    const originalUrl = URL.createObjectURL(file);

    if (!validation.valid) {
      return {
        id,
        originalFile: file,
        originalSize: file.size,
        compressedSize: 0,
        originalUrl,
        compressedUrl: '',
        fileName: file.name,
        fileType: file.type,
        compressionRatio: 0,
        status: 'error',
        error: validation.error,
        width: dimensions.width,
        height: dimensions.height,
      };
    }

    // SVG special handling with basic minification
    if (file.type === 'image/svg+xml') {
      try {
        const text = await file.text();
        const minified = text
          .replace(/<!--[\s\S]*?-->/g, '') // remove comments
          .replace(/\s+/g, ' ') // collapse whitespace
          .trim();
        
        const compressedBlob = new Blob([minified], { type: 'image/svg+xml' });
        const compressedUrl = URL.createObjectURL(compressedBlob);
        
        return {
          id,
          originalFile: file,
          originalSize: file.size,
          compressedSize: compressedBlob.size,
          originalUrl,
          compressedUrl,
          fileName: file.name,
          fileType: file.type,
          compressionRatio: ((file.size - compressedBlob.size) / file.size) * 100,
          status: 'completed',
          width: dimensions.width,
          height: dimensions.height,
        };
      } catch (e) {
        // Fallback to original
        return {
          id,
          originalFile: file,
          originalSize: file.size,
          compressedSize: file.size,
          originalUrl,
          compressedUrl: originalUrl,
          fileName: file.name,
          fileType: file.type,
          compressionRatio: 0,
          status: 'completed',
          width: dimensions.width,
          height: dimensions.height,
        };
      }
    }

    try {
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Auto-adjust quality for specific formats if not provided
      if (!options.initialQuality) {
        if (file.type === 'image/png') {
          mergedOptions.initialQuality = 0.85;
        } else if (file.type === 'image/webp') {
          mergedOptions.initialQuality = 0.75;
        }
      }

      let targetFileType = mergedOptions.fileType || file.type;
      
      // Handle AVIF support check
      if (file.type === 'image/avif') {
        targetFileType = 'image/avif';
      }

      const compressedFile = await imageCompression(file, {
        maxSizeMB: mergedOptions.maxSizeMB,
        maxWidthOrHeight: mergedOptions.maxWidthOrHeight,
        useWebWorker: mergedOptions.useWebWorker,
        preserveExif: mergedOptions.preserveExif,
        initialQuality: mergedOptions.initialQuality,
        fileType: targetFileType as any,
      });

      const compressedUrl = URL.createObjectURL(compressedFile);
      const compressionRatio = ((file.size - compressedFile.size) / file.size) * 100;

      return {
        id,
        originalFile: file,
        originalSize: file.size,
        compressedSize: compressedFile.size,
        originalUrl,
        compressedUrl,
        fileName: file.name,
        fileType: file.type,
        compressionRatio,
        status: 'completed',
        width: dimensions.width,
        height: dimensions.height,
      };
    } catch (error) {
      return {
        id,
        originalFile: file,
        originalSize: file.size,
        compressedSize: 0,
        originalUrl,
        compressedUrl: '',
        fileName: file.name,
        fileType: file.type,
        compressionRatio: 0,
        status: 'error',
        error: error instanceof Error ? error.message : 'Compression failed',
        width: dimensions.width,
        height: dimensions.height,
      };
    }
  };

  const addImages = useCallback(async (files: File[], options: Partial<CompressionOptions> = {}) => {
    const pendingImages: CompressedImage[] = files.map(file => ({
      id: generateId(),
      originalFile: file,
      originalSize: file.size,
      compressedSize: 0,
      originalUrl: URL.createObjectURL(file),
      compressedUrl: '',
      fileName: file.name,
      fileType: file.type,
      compressionRatio: 0,
      status: 'pending',
      width: 0,
      height: 0,
    }));

    setImages(prev => [...prev, ...pendingImages]);

    for (let i = 0; i < pendingImages.length; i++) {
      const pendingImage = pendingImages[i];
      const file = files[i];
      
      setImages(prev => prev.map(img => 
        img.id === pendingImage.id ? { ...img, status: 'compressing' } : img
      ));

      const result = await compressSingle(file, options);
      
      setImages(prev => prev.map(img => 
        img.id === pendingImage.id ? result : img
      ));
    }
  }, [compressSingle]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.originalUrl);
        if (image.compressedUrl) {
          URL.revokeObjectURL(image.compressedUrl);
        }
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const clearImages = useCallback(() => {
    setImages(prev => {
      prev.forEach(image => {
        URL.revokeObjectURL(image.originalUrl);
        if (image.compressedUrl) {
          URL.revokeObjectURL(image.compressedUrl);
        }
      });
      return [];
    });
  }, []);

  const retryImage = useCallback(async (id: string) => {
    const image = images.find(img => img.id === id);
    if (!image || image.status !== 'error') return;

    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, status: 'compressing' } : img
    ));

    const result = await compressSingle(image.originalFile);
    
    setImages(prev => prev.map(img => 
      img.id === id ? result : img
    ));
  }, [images]);

  const getStats = useCallback(() => {
    const completed = images.filter(img => img.status === 'completed');
    const totalOriginal = completed.reduce((sum, img) => sum + img.originalSize, 0);
    const totalCompressed = completed.reduce((sum, img) => sum + img.compressedSize, 0);
    const totalSaved = totalOriginal - totalCompressed;
    const averageRatio = completed.length > 0
      ? completed.reduce((sum, img) => sum + img.compressionRatio, 0) / completed.length
      : 0;

    return {
      totalFiles: images.length,
      completedFiles: completed.length,
      failedFiles: images.filter(img => img.status === 'error').length,
      pendingFiles: images.filter(img => img.status === 'pending' || img.status === 'compressing').length,
      totalOriginalSize: totalOriginal,
      totalCompressedSize: totalCompressed,
      totalSaved,
      averageCompressionRatio: averageRatio,
    };
  }, [images]);

  return {
    images,
    addImages,
    removeImage,
    clearImages,
    retryImage,
    getStats,
  };
}
