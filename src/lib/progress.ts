/**
 * 学习进度：只存 localStorage，仅本浏览器可见；存储不可用时退化为内存模式。
 */
export interface QuizRecord {
  best: number;
  last: number;
  attempts: number;
}

export interface ProgressData {
  version: 1;
  /** 课时 id -> 完成时间戳 */
  completed: Record<string, number>;
  /** 题组 id -> 成绩记录 */
  quiz: Record<string, QuizRecord>;
  /** 练习累计得分 */
  xp: number;
  /** 学习过的日期（ISO，升序） */
  days: string[];
}

const KEY = 'kaoyan-math-progress-v1';

export function emptyProgress(): ProgressData {
  return { version: 1, completed: {}, quiz: {}, xp: 0, days: [] };
}

let memoryFallback: ProgressData | null = null;

export function loadProgress(): ProgressData {
  if (memoryFallback) return memoryFallback;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyProgress();
    const data = JSON.parse(raw) as ProgressData;
    if (data?.version !== 1) return emptyProgress();
    return {
      version: 1,
      completed: data.completed ?? {},
      quiz: data.quiz ?? {},
      xp: data.xp ?? 0,
      days: Array.isArray(data.days) ? data.days : [],
    };
  } catch {
    memoryFallback = emptyProgress();
    return memoryFallback;
  }
}

export function saveProgress(p: ProgressData): boolean {
  if (memoryFallback) { memoryFallback = p; return false; }
  try { localStorage.setItem(KEY, JSON.stringify(p)); return true; }
  catch { memoryFallback = p; return false; }
}

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 记录今天有学习活动 */
export function touchDay(p: ProgressData): void {
  const today = todayISO();
  if (!p.days.includes(today)) {
    p.days.push(today);
    p.days.sort();
  }
}

/** 连续学习天数：从今天（或昨天）往回数 */
export function computeStreak(days: string[]): number {
  if (!days.length) return 0;
  const set = new Set(days);
  const dayMs = 86400000;
  let cursor = new Date();
  if (!set.has(cursor.toISOString().slice(0, 10))) {
    cursor = new Date(cursor.getTime() - dayMs);
    if (!set.has(cursor.toISOString().slice(0, 10))) return 0;
  }
  let streak = 0;
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor = new Date(cursor.getTime() - dayMs);
  }
  return streak;
}

/** 已完成的课时数 / 某课程下的课时完成情况等，供页面统计 */
export function completedCount(ids: string[]): number {
  const p = loadProgress();
  return ids.filter((id) => p.completed[id]).length;
}

export function recordLesson(lessonId: string, done: boolean): ProgressData {
  const p = loadProgress();
  if (done) { if (!p.completed[lessonId]) p.completed[lessonId] = Date.now(); }
  else delete p.completed[lessonId];
  if (done) touchDay(p);
  saveProgress(p);
  return p;
}

export function recordQuiz(quizId: string, score: number): ProgressData {
  const p = loadProgress();
  const rec = p.quiz[quizId] ?? { best: 0, last: 0, attempts: 0 };
  rec.last = score;
  rec.best = Math.max(rec.best, score);
  rec.attempts += 1;
  p.quiz[quizId] = rec;
  p.xp += score;
  touchDay(p);
  saveProgress(p);
  return p;
}
