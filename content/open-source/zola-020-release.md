+++
title = "Zola 0.22 发布，静态博客引擎模板系统与热重载优化"
description = "Zola 0.22 对 feed 生成配置项进行改名，并优化了 taxonomies 配置与热重载稳定性，升级时需注意旧配置项迁移。"
date = 2026-09-19
[taxonomies]
tags = ["Zola"]

[extra]
image = "/images/id-119.jpg"
author = "开源编辑部"
+++

Zola 0.22 最受关注的变更之一是 `generate_feed` 配置项更名为 `generate_feeds`，站点根目录 `config.toml` 中的旧写法会在构建时收到警告甚至失效。同时 feed 相关的 `feed_filename` 等配置也一并调整，建议升级前逐项核对自己的配置文件，改完后运行 `zola build` 验证输出目录中的 RSS/Atom 文件是否正常生成。

分类目录（taxonomies）的配置方式在本版中进一步规范，`taxonomies` 数组中每个条目的 `name`、`paginate`、`feed` 等字段语义更加明确，模板中通过 `get_taxonomy` 和 `get_taxonomy_url` 获取分类数据的行为也更一致。如果你的模板对分类渲染做了自定义，升级后需要检查渲染结果是否符合预期。

模板系统方面，Tera 引擎在本版本收紧了语法限制，模板内不允许直接书写对象字面量，类似 `{% set x = {"a": 1} %}` 的写法会直接报错，需要改用变量赋值或上下文传参。此外 `zola serve` 的热重载稳定性明显提升，文件频繁变更时不再出现误报重建或 WebSocket 断连的问题，Windows 下的文件监听也更加可靠。
