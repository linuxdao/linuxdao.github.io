+++
title = "首页"
description = "面向开发者的技术资讯站点，分享前端、网络、开源与AI内容"
template = "index.html"

[extra]
# 头条轮播数据（url 指向真实文章页）
hero_slides = [
  {
    image = "/images/id-1.jpg",
    tag = "头条",
    tag_color = "bg-primary",
    title = "2026 前端技术生态盘点：WebGPU、HTMX 与 AI 代码助手全面普及",
    excerpt = "静态站点、跨端框架持续迭代，开发者工具迎来一波更新浪潮，低代码与AI生成页面能力进一步下沉到个人开发者。",
    author = "AI 研究组",
    time = "2小时前",
    views = "2.3k",
    url = "/ai/ai-code-assistant-eco-2026/"
  },
  {
    image = "/images/id-119.jpg",
    tag = "深度",
    tag_color = "bg-amber-500",
    title = "代码大模型 Arena 榜单更新，国产模型持续追赶海外旗舰",
    excerpt = "真人盲测两两对战，不看纸面分数，直接看模型产出页面效果，国产模型稳步追赶海外头部选手。",
    author = "AI 研究组",
    time = "5小时前",
    views = "1.8k",
    url = "/ai/llm-arena-frontend-ranking/"
  },
  {
    image = "/images/id-20.jpg",
    tag = "开源",
    tag_color = "bg-emerald-500",
    title = "Zola 0.22 发布，静态博客引擎模板系统与热重载优化",
    excerpt = "模板系统优化，热重载更稳定，GitHub Pages 一键部署，适合个人开发者搭建技术博客。",
    author = "开源编辑部",
    time = "8小时前",
    views = "1.2k",
    url = "/open-source/zola-020-release/"
  },
  {
    image = "/images/id-239.jpg",
    tag = "热点",
    tag_color = "bg-rose-500",
    title = "macOS 抓包工具横向对比：Reqable、Proxyman、Wireshark 选型指南",
    excerpt = "代理抓包与底层网卡抓包原理差异，针对调试HTTPS、DNS流量场景给出最佳实践。",
    author = "网络技术组",
    time = "12小时前",
    views = "2.0k",
    url = "/internet/macos-capture-tools-comparison/"
  }
]

# 最新资讯文章
latest_articles = [
  {
    image = "/images/id-119.jpg",
    tag = "开源",
    tag_class = "bg-blue-50 text-primary",
    title = "Zola 0.22 发布，静态博客引擎模板系统与热重载优化",
    excerpt = "Rust编写的静态站点生成器更新，构建速度大幅提升，对GitHub Pages部署更加友好。",
    meta = "1天前",
    comments = 42,
    url = "/open-source/zola-020-release/"
  },
  {
    image = "/images/id-119.jpg",
    tag = "AI",
    tag_class = "bg-green-50 text-green-600",
    title = "代码大模型 Arena 榜单更新，国产模型持续追赶海外旗舰",
    excerpt = "WebDev盲测榜单数据刷新，前端页面生成能力成为大模型新的比拼赛道。",
    meta = "2天前",
    comments = 76,
    url = "/ai/llm-arena-frontend-ranking/"
  },
  {
    image = "/images/id-1.jpg",
    tag = "网络",
    tag_class = "bg-orange-50 text-orange-600",
    title = "macOS 抓包工具横向对比：Reqable、Proxyman、Wireshark 选型指南",
    excerpt = "代理抓包与底层网卡抓包原理差异，针对开发者调试流量场景给出选型建议。",
    meta = "3天前",
    comments = 53,
    url = "/internet/macos-capture-tools-comparison/"
  },
  {
    image = "/images/id-36.jpg",
    tag = "前端",
    tag_class = "bg-red-50 text-red-500",
    title = "Tailwind CSS v4 正式稳定，构建体积进一步压缩",
    excerpt = "JIT引擎升级，按需生成CSS，新项目可以直接使用CDN快速开发原型页面。",
    meta = "4天前",
    comments = 88,
    url = "/ai/tailwind-v4-stable/"
  }
]

# 热门资讯文章
hot_articles = [
  {
    image = "/images/id-42.jpg",
    tag = "热点",
    tag_class = "bg-rose-50 text-rose-500",
    title = "GitHub Pages 绑定自定义域名完整实操，避坑指南",
    excerpt = "从域名解析、所有权验证到Cloudflare代理配置，一次性梳理常见踩坑点。",
    meta = "热门",
    views = "3.1k",
    url = "/internet/github-pages-custom-domain/"
  },
  {
    image = "/images/id-20.jpg",
    tag = "跨端",
    tag_class = "bg-blue-50 text-primary",
    title = "Tauri v2 跨端桌面应用开发入门，Rust 前端混合方案",
    excerpt = "轻量安全的跨端框架，对比Electron优缺点，适合开发工具类桌面软件。",
    meta = "热门",
    views = "2.7k",
    url = "/tech/tauri-v2-desktop-app/"
  },
  {
    image = "/images/id-66.jpg",
    tag = "AI",
    tag_class = "bg-green-50 text-green-600",
    title = "本地大模型部署方案对比：Ollama 与 llama.cpp 快速上手",
    excerpt = "低配PC也可以跑的开源大模型，硬件需求与性能实测数据。",
    meta = "热门",
    views = "2.4k",
    url = "/open-source/ollama-llamacpp-local-llm/"
  },
  {
    image = "/images/id-78.jpg",
    tag = "工具",
    tag_class = "bg-orange-50 text-orange-600",
    title = "静态站点选型对比：Zola、Hugo、VitePress",
    excerpt = "构建速度、模板生态、学习成本全方位对比，适合静态博客建站参考。",
    meta = "热门",
    views = "2.1k",
    url = "/tech/static-site-comparison/"
  }
]

# 特色文章（图片背景卡片）
featured_articles = [
  {
    image = "/images/id-36.jpg",
    tag = "Rust",
    tag_class = "bg-primary/90",
    title = "Rust 语言 FFI 开发实战，与前端进行双向数据交互",
    excerpt = "Rust与前端FFI桥接方案，实现双向调用，传递复杂数据结构，内存安全避坑。",
    date = "09-08",
    comments = 26,
    url = "/tech/rust-ffi-frontend/"
  },
  {
    image = "/images/id-20.jpg",
    tag = "前端",
    tag_class = "bg-emerald-500/90",
    title = "HTMX 无 JS 开发页面交互，表单提交与局部刷新方案",
    excerpt = "借助HTMX实现不用写大量JS的页面交互，表单提交、局部DOM更新完整示例。",
    date = "09-16",
    comments = 41,
    url = "/open-source/htmx-no-js-interaction/"
  },
  {
    image = "/images/id-42.jpg",
    tag = "跨端",
    tag_class = "bg-orange-500/90",
    title = "Tauri v2 热更新完整实现，资源差分更新避坑",
    excerpt = "Tauri v2桌面应用热更新方案，差分资源打包，签名校验，常见失败问题排查。",
    date = "09-12",
    comments = 34,
    url = "/life/tauri-hot-update-diff/"
  },
  {
    image = "/images/id-239.jpg",
    tag = "运维",
    tag_class = "bg-rose-500/90",
    title = "Linux 服务器安全加固，SSH 密钥登录与防火墙配置",
    excerpt = "服务器基础安全配置，关闭密码登录，使用SSH密钥，firewalld防火墙策略配置。",
    date = "09-14",
    comments = 52,
    url = "/life/ssh-hardening-firewalld/"
  }
]
+++
