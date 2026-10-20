+++
title = "Tailwind CSS v4 正式稳定，构建体积进一步压缩"
description = "Tailwind v4 稳定版带来引擎重写与 CSS-first 配置，迁移时需注意 PostCSS 插件与浏览器兼容策略。"
date = 2026-09-09
[taxonomies]
tags = ["TailwindCSS","前端"]

[extra]
image = "/images/id-36.jpg"
author = "AI 研究组"
+++

Tailwind CSS v4 正式发布稳定版，底层引擎被完全重写为基于原生 CSS 解析的增量编译器，全量构建速度提升数倍，增量场景下接近即时。产物体积也进一步压缩，未使用的变体和工具类会在更早阶段被裁剪，页面实际加载的 CSS 明显变小。

配置方式转向 CSS-first：不再强制维护 tailwind.config.js，而是直接在 CSS 中通过 @theme 定义设计令牌，主题变量最终以原生 CSS 自定义属性输出。插件同样以 CSS 内的 @plugin 语法引入，配置与样式同处一个上下文，降低了心智负担。

从 v3 迁移时注意几点：需要切换为专用的 @tailwindcss/postcss 插件或 Vite 插件，部分前缀和透明度语法有破坏性变更，官方提供自动升级 codemod 可覆盖多数场景。此外 CDN 方案仅为开发体验设计，缺少缓存优化与按需裁剪，生产环境仍应走本地构建管线。
