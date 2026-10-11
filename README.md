# 考研数学实验室（kaoyan-math-lab）

面向数学一（11408 组合里的 301 数学）的交互式学习站：**高数、线代、概率论** 三门课，每个核心概念配一个能在浏览器里动手的实验室，看完正文就做随堂练习。

技术栈：Astro 5 + TypeScript + KaTeX。纯静态输出，无运行时前端框架，无后端、无账号、无远端存储。

## 本地运行

```bash
npm install
npm run dev        # 开发服务器
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物（默认 4321 端口）
npm test           # 数据完整性测试（node --test）
npm run check      # astro check 类型检查
```

提交前三项都过再动：`npm test && npm run check && npm run build`。

## 站点结构

| 路径 | 内容 |
|---|---|
| `/` | 首页：连续学习天数、练习得分、三门课进度条、实验室入口 |
| `/course/<id>` | 课程页：考纲章节 + 已上线课时（`calculus` / `linear-algebra` / `probability`） |
| `/lesson/<course>/<chapter>/<lesson>` | 课时页：正文 + 实验室 + 随堂练习 + 完成打卡 |
| `/labs` | 全部实验室聚合页 |
| `/formulas` | 公式速查（构建期 KaTeX 渲染） |

## 源码地图

- `src/data/courses.ts` — 三门课与章节考纲（事实来源）。
- `src/data/quizzes.ts` — 题库；`src/data/labs.ts` — 实验室注册表。
- `src/content/lessons/<course>/<chapter>/<lesson>.md` — 课时正文，frontmatter 声明归属、题组与实验室。
- `src/components/labs/*.astro` — 五个交互实验室（原生 Canvas，精确计算或真随机蒙特卡洛，无预制动画）。
- `src/lib/progress.ts` — localStorage 进度（课时完成、最佳成绩、连续天数）；存储不可用时退化为内存模式。
- `src/lib/quiz-engine.ts` — 一题一屏、选项即判的测验引擎；题面在构建期经 KaTeX 渲染。

## 如何新增内容

1. **课时**：在 `src/content/lessons/` 按三层目录新建 `.md`，frontmatter 的 `course` / `chapter` 必须与 `courses.ts` 的 id 一致；正文公式用 `$...$` / `$$...$$`。
2. **题组**：在 `quizzes.ts` 加一组，课时 frontmatter 里 `quiz: <id>` 引用；`answer` 是正确选项下标。
3. **实验室**：新组件放 `src/components/labs/`，在 `labs.ts` 注册 id，并在 `lesson/[...id].astro` 的组件表和 `test/data.test.mjs` 的 `LAB_IDS` 里同步登记。

`npm test` 会校验目录归属、引用一致性与全部公式的 KaTeX 可渲染性；新增内容跑不过测试不该提交。

## 内容边界（诚实声明）

- 已上线 6 个完整课时（极限、导数、定积分、泰勒、矩阵变换、大数定律与中心极限定理），其余章节目前只有考纲要点，课程页如实标注"讲解建设中"。
- 卷面占比（约 56% / 22% / 22%）为数一官方公布比例；考纲要点按数学一大纲整理，使用前请对照当年考试大纲核对。
- 进度只存在当前浏览器 localStorage，清缓存即丢；站点不做云端同步。

## 部署

`dist/` 是纯静态站点，任意静态服务器可用（nginx 配置参考 `go-learning-for-java-dev/web/README.md` 的同一套做法，注意给 `.mjs` 配 `application/javascript`——本站产物以 `.js` 为主，通常无需额外映射）。尚未配置 Git 远端与自动部署；需要上线时再建远端并添加 Pages workflow。
