# kaoyan-math-lab · 仓库约定

个人考研数学（数学一）交互学习站。主分支 main，Astro 5 纯静态站点。

## 结构与事实来源

- 课程/章节考纲：`src/data/courses.ts`；题库：`src/data/quizzes.ts`；实验室注册：`src/data/labs.ts`。
- 课时正文：`src/content/lessons/<course>/<chapter>/<lesson>.md`，目录路径即课时 id，frontmatter 的 course/chapter 必须与目录和 `courses.ts` 三方一致。
- 实验室是确定性精确计算（函数、行列式、特征值）或浏览器真随机模拟（概率），**不允许**放预制假数据或伪装的"性能曲线"。
- 内容诚实：没写完的章节在课程页标注"讲解建设中"，不放假内容占位；公式和结论错了比缺了更糟。

## 改动规则

- 新增课时/题组/实验室后必须跑：`npm test && npm run check && npm run build`，三项全过才算完成。
- 测试（`test/data.test.mjs`）校验目录归属、引用一致性、KaTeX 可渲染性；新增实验室 id 要同步 `LAB_IDS`。
- 题目 `answer` 写下标时先自己把选项读一遍；公式修改后用浏览器打开对应课时目视确认渲染。
- 进度存储 key（`kaoyan-math-progress-v1`）的结构变更必须升 `version` 并保持向后兼容读取。

## 风格

- 视觉沿用工作区约定：明亮单色系 + oklch 变量，色彩只表达选中/正确/错误/完成；状态同时给文字说明，不单靠颜色。
- 教学注释只写"为什么"；不引入 UI 框架、外部字体或 CDN 脚本，资源一律相对/根路径本地引用。
- 未请求不提交不推送；远端与部署配置由用户确认后再加。
