+++
title = "DNS 解析原理，tcpdump 抓域名访问实操教程"
description = "梳理 DNS 递归与迭代解析流程，并用 tcpdump 在 53 端口抓包验证。"
date = 2026-09-13
[taxonomies]
tags = ["抓包"]

[extra]
image = "/images/id-239.jpg"
author = "技术编辑部"
+++

DNS 解析分递归与迭代两个层面。客户端向本地递归服务器发起递归查询，要求必须给出最终答案；递归服务器则代表客户端向根、顶级域（TLD）、权威服务器逐级发起迭代查询，每一级只返回"下一步该问谁"的 referral，直到拿到权威记录并缓存后返回。

抓包用 tcpdump 过滤 53 端口即可观察到完整流程：`sudo tcpdump -i any -nn port 53`，加上 `-w dns.pcap` 可保存后用 Wireshark 分析。若只想看查询报文，可进一步限定 `udp port 53 and 'udp[10:2] & 0x8000 = 0'`（QR 位为 0 表示请求）。

实操时执行 `dig +trace example.com` 或直接 `curl https://example.com`，在另一终端观察 tcpdump 输出：能看到 A/AAAA 查询、响应中的 CNAME 链、以及 TTL 决定是否再次外发查询。大包或截断时注意 TC 标志位，此时会回落到 TCP 53 端口重试。
