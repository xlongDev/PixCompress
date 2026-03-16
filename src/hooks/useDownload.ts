import { useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { CompressedImage } from '@/types';

export function useDownload() {
  const downloadSingle = useCallback(async (image: CompressedImage) => {
    if (image.status !== 'completed' || !image.compressedUrl) {
      throw new Error('Image not ready for download');
    }

    try {
      const response = await fetch(image.compressedUrl);
      const blob = await response.blob();
      
      const originalName = image.fileName;
      const lastDotIndex = originalName.lastIndexOf('.');
      const nameWithoutExt = lastDotIndex > 0 ? originalName.slice(0, lastDotIndex) : originalName;
      const extension = lastDotIndex > 0 ? originalName.slice(lastDotIndex) : '';
      const newFileName = `${nameWithoutExt}_compressed${extension}`;
      
      saveAs(blob, newFileName);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }, []);

  const downloadBatch = useCallback(async (images: CompressedImage[]) => {
    const completedImages = images.filter(img => img.status === 'completed' && img.compressedUrl);
    
    if (completedImages.length === 0) {
      throw new Error('No completed images to download');
    }

    if (completedImages.length === 1) {
      return downloadSingle(completedImages[0]);
    }

    try {
      const zip = new JSZip();
      const folder = zip.folder('compressed-images');
      
      if (!folder) {
        throw new Error('Failed to create zip folder');
      }

      const downloadPromises = completedImages.map(async (image) => {
        const response = await fetch(image.compressedUrl);
        const blob = await response.blob();
        
        const originalName = image.fileName;
        const lastDotIndex = originalName.lastIndexOf('.');
        const nameWithoutExt = lastDotIndex > 0 ? originalName.slice(0, lastDotIndex) : originalName;
        const extension = lastDotIndex > 0 ? originalName.slice(lastDotIndex) : '';
        const newFileName = `${nameWithoutExt}_compressed${extension}`;
        
        folder.file(newFileName, blob);
      });

      await Promise.all(downloadPromises);

      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      saveAs(zipBlob, `pixcompress-${timestamp}.zip`);
      
      return true;
    } catch (error) {
      console.error('Batch download failed:', error);
      throw error;
    }
  }, [downloadSingle]);

  const copyToClipboard = useCallback(async (image: CompressedImage) => {
    if (image.status !== 'completed' || !image.compressedUrl) {
      throw new Error('Image not ready');
    }

    try {
      const response = await fetch(image.compressedUrl);
      await response.blob();
      
      // Always convert to PNG for maximum clipboard compatibility
      const img = new Image();
      img.src = image.compressedUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.drawImage(img, 0, 0);
      
      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas to PNG failed'));
        }, 'image/png');
      });

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': pngBlob
          })
        ]);
        return true;
      } else {
        throw new Error('Clipboard API not supported');
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      throw error;
    }
  }, []);

  return {
    downloadSingle,
    downloadBatch,
    copyToClipboard,
  };
}
