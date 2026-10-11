# 考研数学实验室（kaoyan-math-lab）

面向数学一（11408 组合里的 301 数学）的交互式学习站：**高数、线代、概率论** 三门课，每个核心概念配一个能在浏览器里动手的实验室，看完正文做随堂练习，错题自动进入**间隔重复复习**。

技术栈：Astro 5 + TypeScript + KaTeX + Pagefind。纯静态输出，无运行时前端框架，无后端、无账号、无远端存储。

## 本地运行

```bash
npm install
npm run dev        # 开发服务器，挂在 http://localhost:4321/kaoyan-math-lab/（base 与线上一致；搜索在 dev 下不可用，索引由构建生成）
npm run build      # astro build + pagefind 索引 → dist/
npm run preview    # 预览构建产物
npm test           # 数据完整性测试（node --test）
npm run check      # astro check 类型检查
```

提交前三项都过再动：`npm test && npm run check && npm run build`。

## 站点结构

| 路径 | 内容 |
|---|---|
| `/` | 首页：考试倒计时、备考阶段进度、今日任务（每日五题 + 到期复习数）、三门课进度条 |
| `/daily` | 每日五题：按日期从全题库轮转，同一天人人同题；错题自动进错题本 |
| `/review` | 错题复习：按 1 → 3 → 7 → 15 → 30 天阶梯调度，连续答对五次毕业；支持提前复习 |
| `/course/<id>` | 课程页：考纲章节 + 已上线课时（`calculus` / `linear-algebra` / `probability`） |
| `/lesson/<course>/<chapter>/<lesson>` | 课时页：正文 + 实验室 + 随堂练习 + 完成打卡 |
| `/labs` | 全部实验室聚合页 |
| `/formulas` | 公式速查（构建期 KaTeX 渲染） |
| `/search` | 全站搜索（Pagefind 索引在构建期生成，dev 模式不可用） |

## 源码地图

- `src/data/courses.ts` — 三门课与章节考纲（事实来源）。
- `src/data/quizzes.ts` — 题库（含 `difficulty` 分层）；`src/data/labs.ts` — 实验室注册表；`src/data/site.ts` — 考试日期与三阶段规划。
- `src/content/lessons/<course>/<chapter>/<lesson>.md` — 课时正文，frontmatter 声明归属、题组与实验室。
- `src/components/labs/*.astro` — 八个交互实验室（原生 Canvas，精确计算或真随机蒙特卡洛，无预制动画）。
- `src/lib/progress.ts` — localStorage 进度：课时完成、成绩、**错题本与间隔重复调度**、每日记录、连续天数。
- `src/lib/quiz-engine.ts` — 一题一屏、选项即判的测验引擎，逐题结果回调驱动错题本。
- `src/lib/bank.ts` + `src/lib/tex.ts` — 全量题库构建期渲染，供复习/每日/搜索使用。
- `public/sw.js` + `public/manifest.webmanifest` — PWA 离线缓存（仅生产构建注册）。

## 如何新增内容

1. **课时**：在 `src/content/lessons/` 按三层目录新建 `.md`，frontmatter 的 `course` / `chapter` 必须与 `courses.ts` 的 id 一致；正文公式用 `$...$` / `$$...$$`。
2. **题组**：在 `quizzes.ts` 加一组（可选 `difficulty: 'advanced'`），课时 frontmatter 里 `quiz: <id>` 引用；`answer` 是正确选项下标。
3. **实验室**：新组件放 `src/components/labs/`，在 `labs.ts` 注册 id，并同步 `lesson/[...id].astro` 的组件表、`labs.astro` 的渲染分支和 `test/data.test.mjs` 的 `LAB_IDS`。
4. **调整备考规划**：改 `src/data/site.ts`（考试日期、阶段切点）。

`npm test` 校验目录归属、引用一致性、难度枚举与全部公式的 KaTeX 可渲染性。

**错题引用的稳定性**：错题本以 `${quizId}#${题目下标}` 定位题目，**已上线的题组不要插入或重排已有题目**（追加到末尾安全），否则用户的错题记录会错位。

## 内容边界（诚实声明）

- 已上线 13 个完整课时（高数 7、线代 4、概率 2）、8 个实验室、13 组 65 道题；其余章节只有考纲要点，页面如实标注"讲解建设中"。
- 卷面占比（约 56% / 22% / 22%）为数一官方公布比例；考纲要点按数学一大纲整理，使用前请对照当年考试大纲核对。
- 考试日期与阶段切点为预估（`site.ts`），官方安排公布后更新。
- 进度只存在当前浏览器 localStorage，清缓存即丢；站点不做云端同步。

## 部署

- `dist/` 为纯静态产物，任意静态服务器可用；nginx 注意给 `.mjs` 配 `application/javascript`。
- 已配置 GitHub Pages 部署（`.github/workflows/pages.yml`）：`astro.config.mjs` 里 `base: '/kaoyan-math-lab'`，站点地址 `https://hwj123hwj.github.io/kaoyan-math-lab/`。站内链接全部跟随 `BASE_URL`，改仓库名/子路径时同步改 base 即可。
- 尚未配置 Git 远端；需要上线时再建远端并推送。
