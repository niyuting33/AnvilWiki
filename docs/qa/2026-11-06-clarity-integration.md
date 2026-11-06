# Clarity 接入专项记录

- 日期：2026-11-06（北京时间）
- 类型：共享组件（BaseLayout、CookieConsent）；项目 ID：`z9ezbf0f73`（公开 ID，非账号密钥）。
- 影响：首页、栏目、文章和法律页；未修改游戏内容、域名、搜索引擎提交或广告配置。
- 配置源：`src/config/analytics.ts`。`PUBLIC_CLARITY_PROJECT_ID` 可覆盖；显式空值可关闭。

## 接入行为

- 沿用原有同意弹窗：未知/拒绝不加载；接受后异步加载 Clarity；已接受访客翻页自动加载；同一页重复调用不重复注入。
- 在远端脚本执行前排队发送 `consentv2`：`analytics_Storage=granted`，`ad_Storage=denied`。本次不启用广告存储授权。
- 中英文同意提示说明热力图与会话回放；隐私页披露 Microsoft Clarity 和微软隐私声明；更新隐私页日期。
- 现有广告组件同步识别新增的同意门控条件，避免页面显示同意弹窗时广告提前加载。

## 机器验证

- 测试优先：先补 6 个行为测试，接入前 3 个因无 Clarity 加载而失败；实现后 `pnpm vitest run tests/consent.test.ts` 10/10 通过。
- 实际运行 BaseLayout inline loader 和 CookieConsent 编译后的脚本，覆盖接受、拒绝、历史选择、幂等、关闭和 localStorage 不可用。不向 Clarity 发送自动化测试数据。
- 内容检查通过：20 MDX，退出码 0。
- 生产构建通过：81 页面，postbuild 成功，退出码 0。
- 构建后内部链接通过：88 HTML、2706 链接，退出码 0。
- 本次涉及的 Astro/TS 文件 ESLint 通过。
- 已有 Astro 路由冲突警告 4 条、Google 验证 HTML 无外层 html 的 Pagefind 提示未变。

### 完整测试的已有失败（不冒充全绿）

在独立临时目录用未修改的 `HEAD`（86f1aec）运行同样的完整测试，并与当前工作区 JSON 报告比较：

- 基线：467 测试，439 通过，27 失败，1 跳过；另有 3 个套件在加载阶段出错。
- 当前：473 测试，445 通过，27 失败，1 跳过；同样 3 个加载错误。
- 新增失败 0；消失失败 0。没有改动或跳过旧测试来制造全绿。
- 失败文件：`agents-consistency`、`apply-template`、`changelog`、`codes-consistency`、`content-utils`、`handbook`、`home-ui`、`routing-flags`、`seo`、`versions`、`workflows`。
- 加载错误：`community-digest`、`landing-paths`、`redirects`。
- 原因包括初始化后已删除的 demo/landing/wrangler 文件、原模板游戏与语言假设、旧套件计数，以及首页扫描误把 hero.webp 识别为 JSON 字段。均为已有问题，本次不扩展修复。
- 沙箱首次另有 tsx IPC EPERM，已在许可后重跑，最终结果以上述相同权限的两份对照报告为准。

## 浏览器抽查（本次新证据）

- 使用内置浏览器打开本地现有开发服务 `127.0.0.1:4321`；该服务热更新本次源码。单独启动的生产预览自动使用 4322，不混淆二者。
- 桌面首页 1280px：同意弹窗可见；接受前 DOM 中无 Clarity 远端 script；实际点 Accept 后出现且仅出现一条 async `https://www.clarity.ms/tag/z9ezbf0f73`。
- 手机 390px 新手攻略：标题与正文可读，截图无意外横向溢出（scrollWidth=375），已接受后跨页仅一条 Clarity script。
- 手机隐私页：披露可见、无横向溢出（scrollWidth=375），仅一条 Clarity script。
- 桌面 Guides 栏目：标题正常、无横向溢出（scrollWidth=1265 < 1280），仅一条 Clarity script。
- 临时视口覆盖已恢复。没有把开发页成功当作线上后台已收到数据。

## 事实、边界和后续

- 官方依据：Microsoft Learn 的 Clarity setup、Consent Management、Clarity Consent API v2 文档（2026-11-06 核对）。
- 无新增游戏事实；原有内容的 `[待补充]` 与草稿状态不变。
- 本轮是 Clarity 专项技术核验，不是所有页面逐交互验收，不声称全仓测试通过。
- 发布后还需确认线上 HTML 为本次版本、用户点 Accept 并正常浏览后 Clarity 后台出现录制/热力图数据。脚本存在不等于后台已收到或热力图已生成。
- 保留 Clarity 默认敏感信息遮盖；项目后台 Consent Mode 等选项须由实际后台核对，不能用源码结果推断已配置。

## Git 存档

- 只提交本次耐久源码、配置、测试、env 示例及本记录；不提交 dist、缓存、真实 env、临时日志/截图或账号凭据。
- 提交信息：`feat(analytics): add consent-gated Clarity heatmaps`
