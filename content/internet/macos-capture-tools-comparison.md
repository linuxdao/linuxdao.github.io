+++
title = "macOS 抓包工具横向对比：Reqable、Proxyman、Wireshark 选型指南"
description = "代理抓包与网卡抓包的原理差异、HTTPS 解密配置方法，以及 Reqable、Proxyman、Wireshark 三款工具的适用场景。"
date = 2026-09-14
[taxonomies]
tags = ["抓包"]

[extra]
image = "/images/id-1.jpg"
author = "网络技术组"
+++

代理抓包与网卡抓包的原理完全不同：Reqable 和 Proxyman 本质是 HTTP(S) 代理，应用显式或通过系统代理设置把流量交给它们，工作在应用层，能直接看到完整的 HTTP 请求与响应语义；Wireshark 则通过 libpcap 在网卡层面捕获原始数据包，工作在网络层，能看到 TCP 三次握手、TLS 握手、重传与丢包等底层细节，但默认状态下 TLS 载荷是密文。

HTTPS 解密的路径也不同。Reqable 和 Proxyman 通过安装自签 CA 证书做中间人（MITM）：将证书安装进系统钥匙串并设为信任后，代理会为每个域名动态签发证书，从而解密内容。对 Flutter、Go 等不走系统信任链的应用，还需要额外指定证书路径或环境变量。Wireshark 的 TLS 解密则依赖导出的 TLS 会话密钥日志（设置 SSLKEYLOGFILE 环境变量），浏览器和部分客户端支持，通用性受限。

选型上，调试 REST/GraphQL 接口、Mock 数据、改包重放，选 Reqable 或 Proxyman：前者跨平台且 API 调试功能更完整，后者 macOS 体验最流畅、规则脚本生态成熟；分析连接超时、TLS 握手异常、QUIC 流量或非 HTTP 协议，则必须用 Wireshark。日常开发建议两者搭配，先在代理层定位业务问题，再下钻到网络层排查传输层故障。
