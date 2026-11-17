# 自由讨论区

一个完全跑在 GitHub 上的轻量论坛：**GitHub Pages 托管静态页面 + giscus 把评论存进 Discussions**。没有服务器、没有数据库、没有月费。

线上演示：部署后见 `https://<用户名>.github.io/<仓库名>/`

## 它是什么 / 不是什么

| 能做 | 不能做 |
|---|---|
| 浏览帖子、分类筛选、站内搜索 | 站内注册（评论需要 GitHub 账号） |
| 用 GitHub 账号评论、回复、加表情 | 在网页里直接发新帖（要改仓库或去 Discussions） |
| 评论同步进 Discussions，可搜索、可导出 | 私信、用户主页、权限组 |

## 目录结构

```
.
├── index.html              # 首页：帖子列表 + 分类筛选 + 搜索
├── posts/
│   ├── hello.html          # 欢迎帖
│   ├── how-giscus-works.html
│   ├── first-question.html
│   └── why-static-forum.html
├── assets/
│   ├── style.css           # 全部样式，支持深色模式
│   └── app.js              # 筛选与搜索
├── .nojekyll               # 跳过 Jekyll 构建
└── deploy.ps1              # 一键部署脚本（本地跑）
```

## 部署

### 方式一：一键脚本（需要 GitHub Token）

```powershell
cd github-forum-demo
.\deploy.ps1 -Token "ghp_xxx" -Repo "forum-demo"
```

脚本会：校验 Token → 创建公开仓库 → 开启 Discussions → 读取分类 ID → 上传全部文件并替换占位符 → 开启 Pages。
跑完会输出站点地址。

Token 建议用 classic token，勾选 `repo` 即可（需要仓库管理权限）。用完记得吊销。

### 方式二：手动

1. 新建一个 public 仓库，Settings → General → Features 勾选 **Discussions**
2. 把本目录所有文件推到 `main`
3. Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`，目录 `/`
4. 打开 `https://giscus.app/zh-CN`，填入 `用户名/仓库名`，分类选 `Announcements`，复制生成的 `<script>`，替换各页面里 `xiaoliaoggg`、`forum-demo`、`R_kgDOVx73Mg`、`DIC_kwDOVx73Ms4DLWgc`
5. 安装 giscus App：<https://github.com/apps/giscus/installations/new>（只此一步必须手动点）

## 发布一篇新帖

1. 复制 `posts/hello.html` 改内容，文件名就是评论的 key（`data-mapping="pathname"`）
2. 在 `index.html` 里加一张 `.post-card`，`data-cat` 填分类
3. 提交，Pages 一分钟内自动更新

## 已验证 / 待验证

- 已验证：页面在本地可正常渲染，筛选和搜索可用
- 待验证：giscus 真正发评论需要安装 giscus App；未安装时评论区会提示

## 已知限制

- Pages 软限制：站点 1GB、月流量 100GB、每小时 10 次构建
- 国内访问 `*.github.io` 可能不稳定，绑自定义域名 + Cloudflare 可缓解
- 评论者必须有 GitHub 账号
