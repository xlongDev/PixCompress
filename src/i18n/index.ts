import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      nav: {
        home: '首页',
        compress: '压缩',
        features: '功能',
        about: '关于',
      },
      hero: {
        badge: 'AI 驱动的智能压缩',
        title: '让图片更轻盈',
        subtitle: '保持视觉质量的同时，将图片体积压缩至最小。',
        ctaPrimary: '开始压缩',
        ctaSecondary: '了解更多',
      },
      compress: {
        title: '开始压缩',
        subtitle: '拖放图片到下方区域',
        maxFiles: '一次最多 50 张图片',
        supportedFormats: '支持 AVIF, JPEG, JPG, PNG, WebP, SVG, GIF',
        qualityTitle: '压缩质量',
        qualityDesc: '质量越低文件越小',
        presets: {
          best: '极致压缩',
          balanced: '均衡模式',
          quality: '高清质量'
        },
        smaller: '更小',
        better: '更清',
      },
      upload: {
        title: '拖放图片到这里',
        subtitle: '或点击选择文件',
        hint: '支持 AVIF, JPEG, JPG, PNG, WebP, GIF, SVG',
        maxSize: '单文件最大 50MB',
        batchHint: '一次可处理 {{count}} 张图片',
        dragActive: '释放以上传',
      },
      compression: {
        title: '压缩结果',
        original: '原始',
        compressed: '压缩后',
        compressing: '压缩中...',
        completed: '完成',
        failed: '失败',
        savings: '节省',
        quality: '质量',
      },
      stats: {
        originalSize: '原始大小',
        compressedSize: '压缩后',
        saved: '节省空间',
        ratio: '压缩率',
        totalFiles: '文件数',
        totalSaved: '总节省',
      },
      actions: {
        download: '下载',
        downloadAll: '批量下载',
        downloadZip: '下载 ZIP',
        clear: '清空',
        clearAll: '清空全部',
        retry: '重试',
        remove: '移除',
        compare: '对比',
        copy: '复制',
      },
      features: {
        title: '强大功能',
        subtitle: '为现代工作流程设计的智能图片压缩解决方案',
        smartCompression: {
          title: '智能压缩',
          description: '采用先进的压缩算法，在保持视觉质量的同时，将文件体积减少 70-90%。',
        },
        batchProcessing: {
          title: '批量处理',
          description: '一次上传多达 50 张图片，自动并行处理，大幅提升工作效率。',
        },
        privacyFirst: {
          title: '隐私优先',
          description: '所有压缩均在浏览器本地完成，图片不会上传到任何服务器，确保数据安全。',
        },
        multiFormat: {
          title: '多格式支持',
          description: '支持 AVIF、JPEG、PNG、WebP、GIF、SVG 等主流图片格式，满足不同场景需求。',
        },
      },
      footer: {
        copyright: '© 2024 PixCompress. All rights reserved.',
        privacy: '隐私政策',
        terms: '服务条款',
        github: 'GitHub',
      },
      toast: {
        success: '成功',
        error: '错误',
        warning: '警告',
        info: '提示',
        compressionComplete: '压缩完成！',
        downloadComplete: '下载完成！',
        copySuccess: '已复制到剪贴板',
        copyFailed: '复制失败',
        fileTooLarge: '文件过大',
        invalidFormat: '不支持的格式',
        maxFilesReached: '已达到最大文件数量限制',
        allCleared: '所有图片已清空',
      },
      settings: {
        title: '设置',
        theme: '主题',
        language: '语言',
        sound: '音效',
        soundOn: '开启',
        soundOff: '关闭',
        followSystem: '跟随系统',
        themes: {
          light: '浅色',
          breeze: '清风',
          dark: '深色',
          ocean: '海洋',
          sunset: '日落',
          emerald: '翡翠',
          sakura: '樱花',
          purple: '紫霞',
          cyberpunk: '赛博',
          candy: '甜心',
          mineral: '矿石',
          dusk: '黄昏'
        }
      },
      privacy: {
        title: '隐私政策',
        lastUpdated: '最后更新：2024年',
        sections: {
          localProcessing: {
            title: '本地处理',
            content: '所有图片压缩操作均在您的浏览器本地完成。我们不会将您的图片上传到任何服务器，确保您的数据完全私密。',
          },
          dataCollection: {
            title: '数据收集',
            content: '我们不收集任何个人身份信息。网站仅使用本地存储来保存您的主题和语言偏好设置。',
          },
          cookies: {
            title: 'Cookie 使用',
            content: '我们使用必要的 Cookie 来记住您的主题和语言设置。这些 Cookie 不包含任何个人身份信息。',
          },
          thirdParty: {
            title: '第三方服务',
            content: '我们不使用 any 第三方分析或跟踪服务。您的浏览活动完全私密。',
          },
        },
      },
      terms: {
        title: '服务条款',
        lastUpdated: '最后更新：2024年',
        sections: {
          usage: {
            title: '使用条款',
            content: 'PixCompress 是一款免费的在线图片压缩工具。您可以自由使用本服务进行个人或商业用途的图片压缩。',
          },
          limitations: {
            title: '使用限制',
            content: '请勿使用本服务处理任何违法、侵权或不当内容。我们保留拒绝为违反这些条款的用户提供服务的权利。',
          },
          disclaimer: {
            title: '免责声明',
            content: '本服务按"原样"提供，不提供任何明示或暗示的担保。我们不对因使用本服务而造成的任何损失负责。',
          },
          changes: {
            title: '条款变更',
            content: '我们保留随时修改 these 条款的权利。变更后的条款将在本页面发布后立即生效。',
          },
        },
      },
      about: {
        title: '关于 PixCompress',
        subtitle: '纯净、安全、高效的在线图片压缩工具',
        description: 'PixCompress 致力于为用户提供最优质的图片压缩体验。我们采用最先进的浏览器端压缩技术，确保您的数据永远不会离开您的设备。',
        features: {
          privacy: { title: '隐私第一', content: '100% 本地处理，无服务器上传。' },
          speed: { title: '极速体验', content: '多线程并行处理，瞬间完成压缩。' },
          quality: { title: '无损画质', content: '智能算法平衡体积与质量。' }
        },
        techStack: {
          title: '技术架构',
          content: 'PixCompress 构建于最先进的 Web 技术之上，确保极致性能与安全。',
          items: {
            react: { title: 'React 19 & Vite', description: '采用 React 19 并发架构与 Vite 8 极速构建。' },
            wasm: { title: 'WebAssembly', description: '利用 Wasm 将 C++/Rust 压缩算法移植到浏览器，性能接近原生。' },
            animation: { title: 'Framer Motion', description: '基于物理系统的动画引擎，提供极其流畅的交互体验。' },
            tailwind: { title: 'Tailwind CSS 4', description: '采用下一代 CSS 引擎，极致优化性能与体积。' },
            algorithms: {
              title: '智能内核',
              description: '集成 Saliency-Aware 显著性检测模型与感知量化算法 (MozJPEG/AVIF)，通过 AI 识别画面核心区域并针对性保留视觉细节。'
            },
            ai: {
              title: 'AI 增强处理',
              description: '采用轻量化神经网络进行预处理，实现智能去噪与边缘锐化，在压缩前显著提升图像信噪比。'
            }
          }
        }
      }
    }
  },
  en: {
    translation: {
      nav: { home: 'Home', compress: 'Compress', features: 'Features', about: 'About' },
      hero: {
        badge: 'AI-Powered Smart Compression',
        title: 'Make Images Lighter',
        subtitle: 'Minimize file size while maintaining visual quality.',
        ctaPrimary: 'Start Compressing',
        ctaSecondary: 'Learn More'
      },
      compress: {
        title: 'Start Compressing',
        subtitle: 'Drag and drop images below',
        maxFiles: 'Up to 50 images at once',
        supportedFormats: 'Supports AVIF, JPEG, JPG, PNG, WebP, SVG, GIF',
        qualityTitle: 'Quality',
        qualityDesc: 'Lower quality means smaller files',
        presets: {
          best: 'Best',
          balanced: 'Balanced',
          quality: 'Quality'
        },
        smaller: 'Smaller',
        better: 'Better',
      },
      upload: {
        title: 'Drop images here',
        subtitle: 'or click to select files',
        hint: 'Supports AVIF, JPEG, JPG, PNG, WebP, GIF, SVG',
        maxSize: 'Max 50MB per file',
        batchHint: 'Process up to {{count}} images at once',
        dragActive: 'Drop to upload'
      },
      compression: {
        title: 'Compression Results',
        original: 'Original',
        compressed: 'Compressed',
        compressing: 'Compressing...',
        completed: 'Completed',
        failed: 'Failed',
        savings: 'Saved',
        quality: 'Quality'
      },
      stats: {
        originalSize: 'Original Size',
        compressedSize: 'Compressed',
        saved: 'Space Saved',
        ratio: 'Ratio',
        totalFiles: 'Files',
        totalSaved: 'Total Saved'
      },
      actions: {
        download: 'Download',
        downloadAll: 'Download All',
        downloadZip: 'Download ZIP',
        clear: 'Clear',
        clearAll: 'Clear All',
        retry: 'Retry',
        remove: 'Remove',
        compare: 'Compare',
        copy: 'Copy'
      },
      features: {
        title: 'Powerful Features',
        subtitle: 'Smart image compression solution designed for modern workflows',
        smartCompression: { title: 'Smart Compression', description: 'Advanced algorithms reduce size by 70-90%.' },
        batchProcessing: { title: 'Batch Processing', description: 'Process up to 50 images at once in parallel.' },
        privacyFirst: { title: 'Privacy First', description: 'Everything happens in your browser. No uploads.' },
        multiFormat: { title: 'Multi-Format', description: 'Supports AVIF, JPEG, PNG, WebP, GIF, SVG and more.' }
      },
      footer: {
        copyright: '© 2024 PixCompress. All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        github: 'GitHub'
      },
      toast: {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Info',
        compressionComplete: 'Compression complete!',
        downloadComplete: 'Download complete!',
        copySuccess: 'Copied to clipboard',
        copyFailed: 'Copy failed',
        fileTooLarge: 'File too large',
        invalidFormat: 'Unsupported format',
        maxFilesReached: 'Maximum file limit reached',
        allCleared: 'All images cleared'
      },
      settings: {
        title: 'Settings',
        theme: 'Theme',
        language: 'Language',
        sound: 'Sound',
        soundOn: 'On',
        soundOff: 'Off',
        followSystem: 'Follow System',
        themes: {
          light: 'Light',
          breeze: 'Breeze',
          dark: 'Dark',
          ocean: 'Ocean',
          sunset: 'Sunset',
          emerald: 'Emerald',
          sakura: 'Sakura',
          purple: 'Purple',
          cyberpunk: 'Cyber',
          candy: 'Candy',
          mineral: 'Mineral',
          dusk: 'Dusk'
        }
      },
      privacy: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: 2024',
        sections: {
          localProcessing: { title: 'Local Processing', content: 'All compression operations are performed locally in your browser.' },
          dataCollection: { title: 'Data Collection', content: 'We do not collect any personally identifiable information.' },
          cookies: { title: 'Cookie Usage', content: 'We use essential cookies to remember your settings.' },
          thirdParty: { title: 'Third-Party Services', content: 'No third-party analytics or tracking services.' }
        }
      },
      terms: {
        title: 'Terms of Service',
        lastUpdated: 'Last updated: 2024',
        sections: {
          usage: { title: 'Usage Terms', content: 'PixCompress is a free online image compression tool.' },
          limitations: { title: 'Usage Limitations', content: 'Please do not use this service for illegal or inappropriate content.' },
          disclaimer: { title: 'Disclaimer', content: 'This service is provided "as is" without any warranties.' },
          changes: { title: 'Terms Changes', content: 'We reserve the right to modify these terms at any time.' }
        }
      },
      about: {
        title: 'About PixCompress',
        subtitle: 'Pure, Secure, and Efficient Online Image Compression',
        description: 'PixCompress is dedicated to providing the best image compression experience. We use state-of-the-art browser-side compression technology to ensure your data never leaves your device.',
        features: {
          privacy: { title: 'Privacy First', content: '100% local processing, no server uploads.' },
          speed: { title: 'Maximum Speed', content: 'Multithreaded parallel processing for instant results.' },
          quality: { title: 'Lossless Quality', content: 'Smart algorithms balance size and visual fidelity.' }
        },
        techStack: {
          title: 'Tech Stack',
          content: 'PixCompress is built on a modern stack for maximum performance and security.',
          items: {
            react: { title: 'React 19 & Vite', description: 'Utilizing React 19 concurrent rendering and Vite 8.' },
            wasm: { title: 'WebAssembly', description: 'Running native-speed C++/Rust compression algorithms directly in Wasm.' },
            animation: { title: 'Framer Motion', description: 'Physics-based animation engine for fluid transitions.' },
            tailwind: { title: 'Tailwind CSS 4', description: 'Next-gen CSS engine optimized for zero-runtime performance.' },
            algorithms: {
              title: 'AI Smart Core',
              description: 'Integrated Saliency-Aware detection and Perceptual Quantization (MozJPEG/AVIF) to identify and preserve critical visual details using AI.'
            },
            ai: {
              title: 'Neural Pre-processing',
              description: 'Utilizing lightweight neural networks for intelligent denoising and edge enhancement before compression for superior final results.'
            }
          }
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
