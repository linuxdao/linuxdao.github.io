+++
title = "HTMX 无 JS 开发页面交互，表单提交与局部刷新方案"
description = "通过 hx-get、hx-post 等声明式属性，开发者无需手写 JavaScript 即可完成表单提交与页面局部刷新。"
date = 2026-09-16
[taxonomies]
tags = ["前端"]

[extra]
image = "/images/id-20.jpg"
author = "开源编辑部"
+++

HTMX 的核心思路是把交互行为写在 HTML 属性里：在按钮或链接上加 `hx-get="/api/list"`，在表单上加 `hx-post="/comments"`，浏览器就会以 Ajax 方式发起请求，页面无需整体跳转。配合 `hx-trigger` 可以指定触发时机，如 `click`、`change` 或 `keyup changed delay:300ms`，实现搜索框防抖请求等常见交互。

局部 DOM 更新由 `hx-target` 与 `hx-swap` 组合完成：`hx-target` 指定响应内容替换哪个元素（可用 `closest`、`next` 等 CSS 扩展选择器），`hx-swap` 决定替换策略，如 `innerHTML`、`outerHTML` 或 `beforeend` 追加。后端只需返回 HTML 片段而非 JSON，前端拿到后直接插入，省去了客户端渲染和数据绑定的复杂度。

与后端模板引擎配合是 HTMX 最自然的模式：服务端用 Jinja、Tera、Go template 等渲染出完整页面，同时提供只渲染局部片段的接口，通过请求头 `HX-Request` 判断是否为 HTMX 请求来决定返回完整页还是片段。这样同一个 URL 既能支持无 JS 的渐进增强，又能获得局部刷新体验，代码量和维护成本都远低于 SPA 方案。
