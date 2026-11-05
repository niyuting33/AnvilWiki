# Emberville 上线后技术自检

- 日期：2026-11-05（北京时间）
- 检查对象：`https://emberville-7xg.pages.dev/`
- 被检查的源码提交：`04b022a`（`remove wrangler.toml`）
- 开始时工作区：`main` 与 `origin/main` 同步，无未提交修改。
- 范围：教程“上线后自检”的构建、线上 sitemap HTTP 检查、构建产物内部链接检查；额外运行内容检查。
- 结论：本轮四项机器检查通过。不是逐页浏览器重新验收，也不是搜索引擎收录通过证明。

## 命令与结果

```bash
pnpm check-content && SITE_URL=https://emberville-7xg.pages.dev pnpm build && pnpm check-links
BASE_URL=https://emberville-7xg.pages.dev pnpm check-sitemap
```

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 内容检查 | 退出码 0 | 20 个 MDX 文件，`Content lint clean` |
| 生产构建及 postbuild | 退出码 0 | 81 页；Pagefind 本地搜索索引 36 页、语言 en；IndexNow 验证文件生成成功 |
| 内部链接 | 退出码 0 | 88 个 HTML 文件，2625 条内部链接，`All internal links resolve` |
| 线上 sitemap | 退出码 0 | 38 个网址全部 HTTP 200，失败 0；同时成功读取索引及子地图 |

本地构建显式设置了正确的 `SITE_URL`，不依赖已删除的 `wrangler.toml`。本轮没有修改或部署站点源码，也没有重新提交 IndexNow。

## 线上 HTTP 200 路由清单

以下均由 `pnpm check-sitemap` 本次实际请求并返回 200：

```text
/
/about/
/bosses/
/bosses/spider-matriarch/
/classes/
/classes/class-system/
/classes/demo-classes/
/contact/
/copyright/
/guides/
/guides/beginner-guide/
/guides/community/
/guides/consoles/
/guides/demo/
/guides/early-access/
/guides/gameplay/
/guides/multiplayer/
/guides/price/
/guides/release-date/
/guides/steam-deck/
/guides/tips/
/guides/wiki/
/mechanics/
/mechanics/combat-and-skill-inheritance/
/mechanics/kymia-crafting-and-town-rebuilding/
/privacy-policy/
/recent/
/skills/
/skills/how-skills-work/
/tags/
/tags/beginner/
/tags/demo/
/tags/early-game/
/tags/forging/
/tags/guide/
/tags/progression/
/tags/weapons/
/terms-of-service/
```

## 非阻断提示

- Astro 输出 4 条已有的路由优先级警告：`/zh/classes`、`/zh/skills`、`/zh/mechanics`、`/skills` 的动态路由被显式路由覆盖。构建成功；本轮未改动这些路由。
- Pagefind 提示 `google8362d9398114b66b.html` 没有 `<html>` 元素，未将该文件加入搜索索引。该路径为 Google 验证文件；正常页面搜索索引已生成。
- Pagefind 的 36 页为站内搜索索引数量，不是 Google 或 Bing 收录数量。

## 检查边界与未完成事项

- `check-links` 检查构建产物中的内部页面路径，不等同于外部链接、图片、视频、锚点和所有交互均已逐项测试。
- 本轮未重新执行全部页面的桌面、手机视口和实际交互验收，不把历史基线结果作为本次新证据。
- 未重新核验全部游戏事实与版本信息。原有 `[待补充]` 和草稿状态继续保留，不能据机器检查通过转为已实测。
- 用户此前已报告手机关闭 Wi-Fi 后能访问站点；不是本轮自动化实测。
- 不提交 `dist/`、`.astro/`、环境变量、密钥、缓存或临时日志。

## 搜索引擎状态（单独跟踪）

以下是用户在 2026-11-05 提供的后台截图所显示的状态，不是本轮重新读取的后台数据：

- Bing：`sitemap-index.xml` 和 `sitemap-0.xml` 均 Success，子地图发现 38 个网页。首页“必应索引”显示已屏蔽，“实时链接”测试可以索引；不能据此宣布已收录。
- GSC：`sitemap-index.xml` 仍显示无法抓取；实时测试通过，已重新提交。后台读取是否完成待确认。
- IndexNow：2026-11-04 提交 38 个网址返回 HTTP 202；不能据此确认密钥验证完成、网页抓取完成或已收录。
- 本聊天已启用每 8 小时只读复查 Bing/GSC 的自动任务；访问失败须如实记录，不得将旧截图当作最新结果。

本记录只验收“上线后技术自检”机器检查项。搜索引擎处理和收录仍待后台证据。
