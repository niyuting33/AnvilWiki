# Emberville Wiki 上线基线验收

- 基线日期：2026-10-31
- 验收范围：首页、所有可索引英文内容页、公开栏目/数据库页、标签与动态页、英中法律页、共享导航/页脚/主题/搜索
- 生产域名配置：`https://niyuting33.pages.dev`（`wrangler.toml` 与 `src/config/site.ts`）
- 状态：通过（机器检查 2026-11-01；浏览器检查 2026-11-01）

## 已发布首页

| 路由   | 语言    | 状态      | 核心检查                                      |
| ------ | ------- | --------- | --------------------------------------------- |
| `/`    | English | published | Hero、发布日期、CTA、官方视频、快速入口、页脚 |
| `/zh/` | 中文    | published | 本地化 Hero、发布日期、CTA、快速入口、页脚    |

## 已发布栏目与数据库页

| 路由                 | 状态      | 内容依据                        |
| -------------------- | --------- | ------------------------------- |
| `/guides/`           | published | 12 篇已发布指南与栏目视频       |
| `/classes/`          | published | 2 篇职业页与栏目视频            |
| `/skills/`           | published | 技能数据库、证据状态与栏目视频  |
| `/mechanics/`        | published | 2 篇机制页与栏目视频            |
| `/bosses/`           | published | Spider Matriarch 页面与栏目视频 |
| `/recent/`           | published | 已发布内容的最近更新列表        |
| `/tags/`             | published | 标签索引                        |
| `/tags/beginner/`    | published | 标签结果页                      |
| `/tags/demo/`        | published | 标签结果页                      |
| `/tags/early-game/`  | published | 标签结果页                      |
| `/tags/forging/`     | published | 标签结果页                      |
| `/tags/guide/`       | published | 标签结果页                      |
| `/tags/progression/` | published | 标签结果页                      |
| `/tags/weapons/`     | published | 标签结果页                      |

## 已发布英文文章

| 路由                                             | 类型     | 版本/来源状态        | `[待补充]` 状态                    |
| ------------------------------------------------ | -------- | -------------------- | ---------------------------------- |
| `/guides/beginner-guide/`                        | Guide    | 2026-10-30           | 有：职业建议、开局路线、存档行为等 |
| `/guides/community/`                             | Guide    | 2026-10-30           | 有：Reddit、报错入口与支持页       |
| `/guides/consoles/`                              | Guide    | 2026-10-30           | 有：平台、日期、跨平台与性能       |
| `/guides/demo/`                                  | Guide    | 2026-10-30           | 有：时长、存档与硬件要求           |
| `/guides/early-access/`                          | Guide    | 2026-10-30           | 有：内容数量、更新节奏与 1.0 日期  |
| `/guides/gameplay/`                              | Guide    | 2026-10-30           | 有：最终机制、阵容与内容数量       |
| `/guides/multiplayer/`                           | Guide    | 2026-10-30           | 有：联机日期、人数与跨平台         |
| `/guides/price/`                                 | Guide    | 2026-10-30           | 有：地区价格、折扣与 1.0 定价      |
| `/guides/release-date/`                          | Guide    | 2026-10-30           | 有：解锁时间、1.0 与主机日期       |
| `/guides/steam-deck/`                            | Guide    | 2026-10-30           | 有：认证、性能、电池与设置         |
| `/guides/tips/`                                  | Guide    | 2026-10-30           | 有：刷取路线、平衡与存档迁移       |
| `/guides/wiki/`                                  | Guide    | 2026-10-30           | 有：上线阵容、实测数据与 1.0 时间  |
| `/classes/class-system/`                         | Class    | Pre-Early Access     | 有：切换条件、成长与继承限制       |
| `/classes/demo-classes/`                         | Class    | Steam Next Fest Demo | 有：未实测职业的最终技能与可用性   |
| `/skills/how-skills-work/`                       | Skill    | Pre-Early Access     | 有：触发、槽位、解锁、等级与继承   |
| `/mechanics/combat-and-skill-inheritance/`       | Mechanic | Pre-Early Access     | 有：连段与数值规则                 |
| `/mechanics/kymia-crafting-and-town-rebuilding/` | Mechanic | Pre-Early Access     | 有：Kymia、建造顺序、材料与配方    |
| `/bosses/spider-matriarch/`                      | Boss     | Public Demo          | 有：数值、阶段、弱点、等级与掉落   |

上述 `[待补充]` 均在正文中明确标注，未被写成已确认事实；它们是后续实测清单，不等同于页面失败。

## 法律与站点说明页

| English              | 中文                    | 状态      |
| -------------------- | ----------------------- | --------- |
| `/about/`            | `/zh/about/`            | published |
| `/contact/`          | `/zh/contact/`          | published |
| `/copyright/`        | `/zh/copyright/`        | published |
| `/privacy-policy/`   | `/zh/privacy-policy/`   | published |
| `/terms-of-service/` | `/zh/terms-of-service/` | published |
| `/recent/`           | `/zh/recent/`           | published |
| `/tags/`             | `/zh/tags/`             | published |

## 不纳入已发布验收的页面

| 路由或内容                                           | 状态                         | 原因                                     |
| ---------------------------------------------------- | ---------------------------- | ---------------------------------------- |
| `/faq/`、`/zh/faq/`                                  | noindex / 空入口已从页脚移除 | FAQ 尚无已核实条目                       |
| `/tools/crafting-planner/`                           | noindex / 导航入口已移除     | 尚无已核实配方，交互不可用               |
| `/builds/`、`/characters/`、`/items/`、`/tier-list/` | noindex / 隐藏               | 栏目没有可发布文章或只有草稿             |
| 对应 `/zh/<category>/` 列表                          | noindex / 隐藏               | 没有中文文章，不用英文回退制造薄内容列表 |
| 中文文章详情回退页                                   | noindex / nofollow           | 仅供直达阅读英文回退，不进入站点地图     |
| `guides/review.mdx`                                  | `draft: true`                | 缺少 Early Access 实测与硬件证据         |
| `tier-list/demo-tier-list.mdx`                       | `draft: true`                | 缺少可比较的职业、武器和统一测试条件     |

## 共享组件影响面

| 组件范围                                    | 需要抽查的页面                          |
| ------------------------------------------- | --------------------------------------- |
| Header、搜索、语言与主题切换                | `/`、一篇文章、一个数据库页、`/zh/`     |
| Footer 与官方链接                           | `/`、一篇文章、一个法律页               |
| ArticlePage 正文对比度、表格、Callout、视频 | class、mechanic、boss、guide 各至少一页 |
| ListPage 栏目视频与文章卡片                 | guides、classes、mechanics、bosses      |
| Skills 数据库筛选与证据标签                 | `/skills/`                              |
| 首页 Hero、发布日期、CTA 与视频             | `/`、`/zh/`                             |

## 第一关：机器检查

- Emberville 聚焦测试：10 个测试文件、83 个测试全部通过。
- `pnpm check-content`：20 个 MDX 文件，内容检查通过。
- `pnpm build`：生产构建通过，共生成 81 个页面；4 条动态路由优先级提示为已有显式页面覆盖，不是构建错误。
- Pagefind：索引 36 个可搜索页面。
- `pnpm check-links`：检查 88 个 HTML 页面中的 2811 条内部链接，全部可解析。
- 本地构建未注入 Cloudflare `[vars]` 时，sitemap 使用 Astro 的开发回退域名；上线构建由 `wrangler.toml` 注入 `SITE_URL=https://niyuting33.pages.dev`。

## 第二关：浏览器验收

- 使用真实 Chrome，按当前 sitemap 的 46 个公开路由分别在 1440×900 桌面视口与 390×844 手机视口检查，共 92 个路由/视口组合。
- 自动检查项目：唯一可见 H1、页面级横向溢出、可见破图、空交互、占位文案、正文长度与 robots 状态。
- 结果：92 个组合均没有页面级横向溢出、缺失 H1、占位文案或薄到无法使用的正文。
- `/skills/` 的外部 YouTube 缩略图在隔离 QA Chrome 中无法联网读取；该提示不影响站内图片、页面布局或视频链接，已作为外部媒体可用性风险记录，不把它误判为站内破图。
- 肉眼抽查：首页桌面/手机、职业文章、技能数据库；Hero、发布日期、CTA、视频、正文对比度、筛选器与手机布局均清晰可用。
- 临时截图与 JSON 结果保存在本次计划的 `.superpowers/` 工作区，不进入 Git 存档。

## 第三关：事实与发布状态

- 已发布页面中的不确定信息均以 `[待补充]` 或版本敏感说明呈现。
- 两篇无法形成可靠结论的页面保留 `draft: true`，不进入正式构建。
- 待补充清单：见上方逐页记录；不为完成度编造数值、角色、配方、兑换码或排名。

## Git 存档

- 基线提交：待 Task 4 创建。
- 验收文档提交：待 Task 4 创建。
