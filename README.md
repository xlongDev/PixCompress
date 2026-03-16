# PixCompress

[English](./README.md) | [简体中文](./README_ZH.md)

PixCompress is a **pure, secure, and ultra-efficient** online image compression tool designed for the modern web. Leveraging AI-driven perceptual quantification and WebAssembly, it provides high-performance compression directly in your browser.

![Liquid Glass UI](https://xlongdev.github.io/pixcompress/og-image.png)

## ✨ Core Features

- **🛡️ Privacy First**: 100% client-side processing. Your images never leave your device.
- **🤖 AI-Powered**: Utilizes Saliency-Aware detection and Perceptual Quantization (MozJPEG/AVIF) to preserve critical visual details while maximizing compression.
- **⚡ High Performance**: Multi-threaded parallel processing powered by WebAssembly (C++/Rust algorithms).
- **🎨 Premium Aesthetics**: Features a "Liquid Glass" design system with 12 dynamic themes, smooth physics-based animations, and a responsive layout.
- **🧊 Multi-Format Support**: Supports AVIF, WebP, JPEG, PNG, GIF, and SVG with persistent format visibility.
- **📦 Batch Processing**: Compress up to 50 images simultaneously with real-time statistics and smooth exit animations.
- **🔍 Real-time Comparison**: Precision-aligned side-by-side comparison with an interactive slider.

## 🚀 Tech Stack

- **Core**: React 19, Vite 8, TypeScript
- **Styling**: Tailwind CSS 4 (Zero-runtime), Framer Motion (Physics-based animations)
- **Engine**: WebAssembly (Wasm), Lucide React (Icons)
- **I18n**: React-I18next (English & Chinese support)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/xlongdev/pixcompress.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

# PixCompress (简体中文)

PixCompress 是一款**纯净、安全、高效**的在线图片压缩工具。通过 AI 驱动的感知量化算法与 WebAssembly 技术，在浏览器本地实现极速压缩，平衡画质与体积。

## ✨ 核心特性

- **🛡️ 隐私优先**: 100% 本地处理。图片不会上传到任何服务器，确保数据隐私安全。
- **🤖 AI 驱动**: 集成显著性检测模型与感知量化算法 (MozJPEG/AVIF)，通过 AI 智能识别画面核心并针对性保留视觉细节。
- **⚡ 极速性能**: 利用 WebAssembly 将 C++/Rust 压缩核心移植到浏览器，支持多线程并行处理。
- **🎨 极致体验**: 采用 "Liquid Glass" (液态玻璃) 设计语言，内置 12 套动态主题，提供极其流畅的交互体验。
- **🧊 全格式支持**: 完美支持 AVIF, WebP, JPEG, PNG, GIF, SVG 等主流格式，文件支持实时可见。
- **📦 批量处理**: 一次性处理多达 50 张图片，提供详尽的压缩统计面板及顺滑的消失动画。
- **🔍 实时预览**: 精准对齐的对比模态框，支持拖拽滑块实时对比压缩前后画质。

## 🚀 技术架构

- **核心**: React 19, Vite 8, TypeScript
- **外观**: Tailwind CSS 4, Framer Motion (基于物理系统的动画)
- **内核**: WebAssembly (Wasm), Lucide React (图标库)
- **国际化**: React-I18next (支持中英文自由切换)

## 🛠️ 快速上手

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 开发与部署

1. 克隆仓库:
   ```bash
   git clone https://github.com/xlongdev/pixcompress.git
   ```
2. 安装依赖:
   ```bash
   npm install
   ```
3. 启动开发服务器:
   ```bash
   npm run dev
   ```
4. 构建生产版本:
   ```bash
   npm run build
   ```

## 📜 许可证

基于 MIT 许可证开源。详见 `LICENSE` 文件。
