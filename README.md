# 资讯快报 - Zola 静态站点

基于 Tailwind CSS v4 的开发者技术资讯站点，标准 Zola 项目结构。

## 项目结构

```
zola-site/
├── config.toml              # 站点配置（导航、栏目、侧边栏数据）
├── content/
│   ├── _index.md            # 首页数据（轮播、最新/热门/特色文章）
│   ├── tech/                # 科技栏目（section + 文章）
│   ├── internet/            # 互联网栏目
│   ├── open-source/         # 开源栏目
│   ├── ai/                  # AI 栏目
│   ├── life/                # 生活栏目
│   └── search/              # 搜索页
├── templates/
│   ├── base.html            # 基础模板（导航、页脚、公共骨架）
│   ├── index.html           # 首页模板
│   ├── section.html         # 栏目列表页
│   ├── page.html            # 文章详情页
│   └── search.html          # 搜索页
├── static/
│   ├── css/input.css        # Tailwind 源文件（CSS-first 配置）
│   ├── css/main.css         # 构建产物（勿手改）
│   ├── images/              # 本地图片
│   ├── js/main.js           # 轮播 + Tab + 移动端菜单
│   ├── js/search.js         # 搜索逻辑（Fuse 风格关键词匹配）
│   └── search.json          # 搜索索引（脚本生成，勿手改）
└── scripts/gen-search-index.py  # 生成搜索索引
```

## 快速开始

### 1. 安装依赖

```bash
# Zola（0.22+）
brew install zola

# Tailwind CSS（仅修改样式时需要）
npm install
```

### 2. 本地预览

```bash
zola serve
```

浏览器打开 http://127.0.0.1:1111。

### 3. 发布前构建

```bash
# 重新生成搜索索引（新增/修改文章后）
python3 scripts/gen-search-index.py

# 构建静态文件到 public/
zola build
```

### 4. 部署到 GitHub Pages（gh-pages 分支）

首次部署，在终端执行（需已配置 GitHub SSH key）：

```bash
git init -b main
git add -A
git commit -m "chore: initial commit"
git remote add origin git@github.com:<用户名>/<仓库名>.git
git push -u origin main
```

之后每次推送 `main`，GitHub Actions 自动构建并把 `public/` 发布到
`gh-pages` 分支（见 `.github/workflows/deploy.yml`）。首次推送后需在仓库
**Settings → Pages → Deploy from a branch** 选择 `gh-pages` 分支 + `/(root)` 目录。

注意事项：

- **部署前必须把 `config.toml` 的 `base_url` 改为真实 Pages 地址**，
  否则 RSS / sitemap / 站内绝对链接全部指向 example.com。
- 使用自定义域名时：`echo "你的域名" > static/CNAME`，
  且 `base_url` 填 `https://你的域名/`。
- 站内链接均为根绝对路径（`/css/...`、`/search/` 等），因此只支持
  **根路径部署**：用 `<用户名>.github.io` 仓库或自定义域名；
  项目站子路径（`<用户名>.github.io/<仓库名>/`）会导致资源 404，
  除非另行改造为相对路径。

## 内容维护

- **新增文章**：在对应栏目目录（如 `content/tech/`）新建 `.md` 文件，
  frontmatter 参考 `content/tech/tauri-v2-desktop-app.md`，必须包含
  `title / description / date / tags` 和 `[extra]` 里的 `image / author`。
- **修改首页推荐**：编辑 `content/_index.md` 的 `[extra]` 数据，
  文章 `url` 需指向真实文章页路径。
- **修改样式**：编辑 `static/css/input.css` 后运行
  `npx @tailwindcss/cli -i static/css/input.css -o static/css/main.css --minify`。

## 说明

- Tailwind 使用本地构建的 CSS（`static/css/main.css`），不依赖 CDN 运行时编译。
- 搜索为纯前端实现（`search.json` + 关键词匹配），因 Zola 内置 elasticlunr
  搜索不支持中文分词（官方二进制未编译 `indexing-zh` 特性）。
- 标签点击会跳转到搜索页（`/search/?q=标签名`）。
- `base_url` 目前是 `https://example.com/`，部署前请改为真实域名，
  否则 sitemap / RSS 中的链接不正确。
