#!/usr/bin/env python3
"""生成 static/search.json —— 全站文章的搜索索引。

Zola 内置搜索（elasticlunr）默认不含中文分词支持，所以搜索改用
Fuse.js 在前端跑，索引由本脚本从 content/ 的 Markdown frontmatter 生成。

用法：python3 scripts/gen-search-index.py （在项目根目录执行）
新增/修改文章后需要重新运行并 zola build。
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def parse_frontmatter(text: str) -> dict:
    m = re.match(r"^\+\+\+\n(.*?)\n\+\+\+", text, re.DOTALL)
    if not m:
        return {}
    meta = {}
    # 只提取需要的顶层简单字段
    for key in ("title", "description", "date"):
        km = re.search(rf'^{key}\s*=\s*"?(.+?)"?\s*$', m.group(1), re.MULTILINE)
        if km:
            meta[key] = km.group(1)
    for key in ("image", "author"):
        km = re.search(rf'^{key}\s*=\s*"(.+?)"\s*$', m.group(1), re.MULTILINE)
        if km:
            meta[key] = km.group(1)
    tags = re.search(r"^tags\s*=\s*\[(.*?)\]", m.group(1), re.MULTILINE)
    if tags:
        meta["tags"] = re.findall(r'"([^"]+)"', tags.group(1))
    return meta


def main() -> None:
    items = []
    for md in sorted(ROOT.glob("content/*/*.md")):
        if md.name == "_index.md":
            continue
        text = md.read_text(encoding="utf-8")
        meta = parse_frontmatter(text)
        if not meta.get("title"):
            continue
        slug = md.stem
        section = md.parent.name
        # 提取正文纯文本（去掉 frontmatter 和 markdown 标记）
        body = re.sub(r"^\+\+\+\n.*?\n\+\+\+", "", text, flags=re.DOTALL)
        body = re.sub(r"[#*`>\[\]!()_-]", " ", body)
        body = re.sub(r"\s+", " ", body).strip()
        items.append({
            "title": meta.get("title", ""),
            "description": meta.get("description", ""),
            "url": f"/{section}/{slug}/",
            "image": meta.get("image", ""),
            "author": meta.get("author", "编辑部"),
            "date": meta.get("date", ""),
            "tags": meta.get("tags", []),
            "body": body[:2000],
        })

    out = ROOT / "static" / "search.json"
    out.write_text(json.dumps(items, ensure_ascii=False), encoding="utf-8")
    print(f"written {out} ({len(items)} articles)")


if __name__ == "__main__":
    main()
