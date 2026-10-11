import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courses, courseMap, chapterOf } from '../src/data/courses.ts';
import { labs } from '../src/data/labs.ts';
import { quizzes } from '../src/data/quizzes.ts';
import katex from 'katex';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lessonsDir = join(root, 'src', 'content', 'lessons');
const LAB_IDS = new Set(['derivative', 'riemann', 'taylor', 'matrix', 'probability']);

test('课程数据：章节 id 唯一且序号递增', () => {
  for (const c of courses) {
    const seen = new Set();
    let last = 0;
    for (const ch of c.chapters) {
      assert.ok(!seen.has(ch.id), `${c.id} 章节重复：${ch.id}`);
      seen.add(ch.id);
      const num = Number(ch.id.split('-')[0]);
      assert.ok(num > last, `${c.id} 章节序号未递增：${ch.id}`);
      last = num;
      assert.ok(ch.points.length >= 3, `${c.id}/${ch.id} 考纲要点过少`);
    }
    assert.equal(chapterOf(c.id, c.chapters[0].id), c.chapters[0]);
  }
  assert.equal(courseMap.size, 3);
});

test('实验室注册表：id 与页面组件一一对应', () => {
  assert.equal(labs.length, LAB_IDS.size);
  for (const lab of labs) assert.ok(LAB_IDS.has(lab.id), `未知实验室 id：${lab.id}`);
});

function extractMath(text) {
  // 状态机：先识别 $$ 显示公式围栏，再处理 $ 行内公式，避免成对美元符号错位
  const out = [];
  let buf = '';
  let display = false;
  let inline = false;
  for (let i = 0; i < text.length;) {
    if (!inline && text.startsWith('$$', i)) {
      display = !display;
      if (!display && buf) { out.push(buf); buf = ''; }
      i += 2;
      continue;
    }
    const ch = text[i];
    if (ch === '\\' && i + 1 < text.length && (display || inline)) { buf += ch + text[i + 1]; i += 2; continue; }
    if (ch === '$') {
      if (display) { buf += ch; i++; continue; }
      inline = !inline;
      if (!inline && buf) { out.push(buf); buf = ''; }
      i++;
      continue;
    }
    if (display || inline) buf += ch;
    i++;
  }
  assert.ok(!display && !inline, '公式围栏未闭合');
  return out;
}

function renderTexAll(text, where) {
  const exprs = extractMath(text);
  assert.ok(exprs.length > 0 || !/\$/.test(text), `${where}：$ 符号疑似不成对`);
  for (const expr of exprs) {
    try {
      katex.renderToString(expr, { throwOnError: true });
    } catch (e) {
      assert.fail(`${where}：LaTeX 渲染失败「${expr.slice(0, 60)}」→ ${e.message}`);
    }
  }
}

test('题库：结构正确且全部公式可用 KaTeX 渲染', () => {
  const ids = new Set();
  for (const set of Object.values(quizzes)) {
    assert.ok(!ids.has(set.id), `题组 id 重复：${set.id}`);
    ids.add(set.id);
    assert.ok(set.questions.length >= 4, `${set.id} 题目少于 4 道`);
    set.questions.forEach((q, i) => {
      assert.ok(q.options.length >= 2, `${set.id} 第 ${i + 1} 题选项过少`);
      assert.ok(q.answer >= 0 && q.answer < q.options.length, `${set.id} 第 ${i + 1} 题 answer 越界`);
      assert.ok(q.explain.trim().length > 20, `${set.id} 第 ${i + 1} 题解析过短`);
      renderTexAll(q.stem, `${set.id}#${i + 1} 题干`);
      q.options.forEach((o, j) => renderTexAll(o, `${set.id}#${i + 1} 选项 ${j}`));
      renderTexAll(q.explain, `${set.id}#${i + 1} 解析`);
    });
  }
});

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

function parseFrontmatter(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(m, `${file} 缺少 frontmatter`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (!kv) continue;
    let [, key, raw] = kv;
    if (raw.startsWith('[')) meta[key] = raw.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    else meta[key] = raw.replace(/^['"]|['"]$/g, '');
  }
  for (const key of ['course', 'chapter', 'title', 'subtitle', 'order', 'minutes']) {
    assert.ok(meta[key] !== undefined, `${file} frontmatter 缺少 ${key}`);
  }
  return meta;
}

test('课时：路径、归属、引用与正文公式全部一致', () => {
  const files = walk(lessonsDir);
  assert.ok(files.length >= 6, '课时文件数量异常');
  const seenIds = new Set();
  for (const file of files) {
    const rel = relative(lessonsDir, file);
    const parts = rel.split(/[/\\]/);
    assert.equal(parts.length, 3, `${rel} 必须位于 <course>/<chapter>/<lesson>.md 三层目录`);
    const [courseId, chapterId] = parts;
    assert.ok(courseMap.has(courseId), `${rel} 课程不存在：${courseId}`);
    const text = readFileSync(file, 'utf8');
    const meta = parseFrontmatter(text, rel);
    assert.equal(meta.course, courseId, `${rel} frontmatter.course 与目录不一致`);
    assert.equal(meta.chapter, chapterId, `${rel} frontmatter.chapter 与目录不一致`);
    assert.ok(chapterOf(courseId, chapterId), `${rel} 章节 ${chapterId} 未在课程数据中登记`);
    assert.ok(!seenIds.has(rel), `${rel} 课时重复`);
    seenIds.add(rel);
    if (meta.quiz) assert.ok(quizzes[meta.quiz], `${rel} 引用了不存在的题组：${meta.quiz}`);
    for (const lab of meta.labs ?? []) assert.ok(LAB_IDS.has(lab), `${rel} 引用了不存在的实验室：${lab}`);
    // 正文里的展示公式逐个渲染（构建时 remark-math/rehype-katex 同样会校验，这里提前给出可读报错）
    const body = text.slice(text.indexOf('---', 3) + 3);
    renderTexAll(body, rel);
  }
});

test('课时分布：三门课各有课时，且实验室都被引用', () => {
  const files = walk(lessonsDir);
  const usedLabs = new Set();
  const usedCourses = new Set();
  for (const file of files) {
    const rel = relative(lessonsDir, file);
    usedCourses.add(rel.split(/[/\\]/)[0]);
    const text = readFileSync(file, 'utf8');
    const meta = parseFrontmatter(text, rel);
    for (const lab of meta.labs ?? []) usedLabs.add(lab);
  }
  assert.deepEqual([...usedCourses].sort(), ['calculus', 'linear-algebra', 'probability']);
  for (const lab of labs) assert.ok(usedLabs.has(lab.id), `实验室 ${lab.id} 没有任何课时引用`);
});
