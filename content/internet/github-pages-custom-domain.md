+++
title = "GitHub Pages 绑定自定义域名完整实操，避坑指南"
description = "从 CNAME 文件到 DNS 解析记录，再到 HTTPS 证书签发失败的排查思路，一篇讲透 GitHub Pages 自定义域名的全流程。"
date = 2026-09-17
[taxonomies]
tags = ["GitHub Pages"]

[extra]
image = "/images/id-42.jpg"
author = "网络技术组"
+++

绑定自定义域名的第一步是在仓库根目录放置一个名为 CNAME 的文件，内容只写一行裸域名或 www 子域名。注意通过网页 Settings 面板填写域名时，GitHub 会自动提交这个 CNAME 文件，但本地构建部署（如 GitHub Actions 推送 gh-pages 分支）很容易把它覆盖掉，导致域名绑定莫名失效，建议把 CNAME 纳入构建产物一并输出。

DNS 解析方面，裸域名（apex domain）需要配置四条 A 记录指向 185.199.108-111.153 这组 GitHub Pages IP，或者使用 ALIAS/ANAME 记录（部分 DNS 服务商支持）；www 子域名则配置 CNAME 记录指向 <username>.github.io。配置完成后可用 dig +short 验证解析是否生效，再在 Settings 里点击检查等待 DNS check 通过。

HTTPS 证书签发失败是最常见的坑：GitHub 通过 Let's Encrypt 自动签发，若域名解析中残留旧的 CNAME 扁平化记录、AAAA 记录指向错误地址，或域名刚修改 DNS 还未全球生效，证书会一直卡在 "Certificate not yet created"。排查时先确认 DNS 状态为 verified，移除冲突记录后等待 24 小时内自动重试。

如果使用 Cloudflare，务必将代理状态设为 DNS only（灰色云朵），否则 GitHub 无法验证域名所有权，证书签发会持续失败。若坚持开启橙色云代理，则需关闭 GitHub Pages 的 Enforce HTTPS，由 Cloudflare 边缘提供证书，并在 SSL/TLS 模式选择 Full 或 Full (strict)，避免回源走 HTTP 造成重定向循环。
