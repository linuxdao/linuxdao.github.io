+++
title = "静态站点 CDN 加速配置指南：缓存策略与回源优化"
description = "通过 Cache-Control 分级策略、HTML 不缓存与静态资源长缓存的组合，以及回源与预热配置，显著提升静态站点访问速度。"
date = 2026-09-11
[taxonomies]
tags = ["GitHub Pages"]

[extra]
image = "/images/id-54.jpg"
author = "网络技术组"
+++

缓存策略的核心是按资源类型分级设置 Cache-Control。HTML 入口文件应设为 no-cache 或 max-age=0, must-revalidate，保证发布新版本后用户立刻拿到最新页面；带内容哈希指纹的 JS/CSS、图片、字体等静态资源则可设 max-age=31536000, immutable，一年长缓存配合文件名变更实现"改内容即改 URL"。Zola、Hugo 等静态站点生成器配合 CDN 规则，可以按路径前缀批量下发这些头。

仅靠 HTML 不缓存还不够彻底：许多 CDN 的默认行为会对 HTML 也加一层短缓存，需要在边缘函数或缓存规则中显式覆盖源站头。同时要注意 Cache-Control 与 CDN 平台自带设置（如 Cloudflare 的 Browser Cache TTL）的优先级关系，避免边缘节点覆盖源站意图。API 类响应则建议用 s-maxage 配合 stale-while-revalidate，在新鲜度与性能之间取平衡。

回源优化方面，合理设置回源 HOST 与协议，开启 CDN 与源站之间的长连接复用，减少握手开销；对大流量站点配置回源限速与并发控制，防止缓存击穿时源站被打挂。预热门槛指冷资源命中率低时主动触发回源拉取的成本：新版本发布后对关键资源提交预热任务，可让首波用户直接命中边缘节点，避免回源风暴，同时注意预热接口通常有频次配额，需按优先级排队提交。
