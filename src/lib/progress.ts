/**
 * 学习进度：只存 localStorage，仅本浏览器可见；存储不可用时退化为内存模式。
 * 结构是加式演进：旧数据（缺新字段）读取时补默认值。
 */
export interface QuizRecord {
  best: number;
  last: number;
  attempts: number;
}

/** 错题本条目，ref 形如 `${quizId}#${题目下标}` */
export interface WrongItem {
  count: number;      // 累计答错次数
  streak: number;     // 复习连续答对次数
  interval: number;   // 当前复习间隔（天）
  due: number;        // 下次复习时间戳
  last: number;       // 最近一次答错/复习时间戳
}

export interface DailyRecord {
  score: number;
  total: number;
}

export interface ProgressData {
  version: 1;
  /** 课时 id -> 完成时间戳 */
  completed: Record<string, number>;
  /** 题组 id -> 成绩记录 */
  quiz: Record<string, QuizRecord>;
  /** 错题本 */
  wrong: Record<string, WrongItem>;
  /** 每日五题记录：日期 -> 成绩 */
  daily: Record<string, DailyRecord>;
  /** 练习累计得分 */
  xp: number;
  /** 学习过的日期（ISO，升序） */
  days: string[];
}

const KEY = 'kaoyan-math-progress-v1';

/** 间隔重复阶梯（天）：答错归 1，连续答对逐级升级，毕业即移出错题本 */
export const REVIEW_LADDER = [1, 3, 7, 15, 30];

export function emptyProgress(): ProgressData {
  return { version: 1, completed: {}, quiz: {}, wrong: {}, daily: {}, xp: 0, days: [] };
}

let memoryFallback: ProgressData | null = null;

export function loadProgress(): ProgressData {
  if (memoryFallback) return memoryFallback;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyProgress();
    const data = JSON.parse(raw) as Partial<ProgressData>;
    if (data?.version !== 1) return emptyProgress();
    return {
      version: 1,
      completed: data.completed ?? {},
      quiz: data.quiz ?? {},
      wrong: data.wrong ?? {},
      daily: data.daily ?? {},
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

const DAY_MS = 86400000;

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
  let cursor = new Date();
  if (!set.has(cursor.toISOString().slice(0, 10))) {
    cursor = new Date(cursor.getTime() - DAY_MS);
    if (!set.has(cursor.toISOString().slice(0, 10))) return 0;
  }
  let streak = 0;
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor = new Date(cursor.getTime() - DAY_MS);
  }
  return streak;
}

export function recordLesson(lessonId: string, done: boolean): ProgressData {
  const p = loadProgress();
  if (done) { if (!p.completed[lessonId]) p.completed[lessonId] = Date.now(); }
  else delete p.completed[lessonId];
  if (done) touchDay(p);
  saveProgress(p);
  return p;
}

export interface QuizAnswerResult {
  index: number;
  correct: boolean;
  /** 错题引用 `${quizId}#${index}`，复习页也复用 */
  ref?: string;
}

/** 随堂练习结算：成绩 + 累计分 + 错题入本 */
export function recordQuizAttempt(quizId: string, score: number, results: QuizAnswerResult[]): ProgressData {
  const p = loadProgress();
  const rec = p.quiz[quizId] ?? { best: 0, last: 0, attempts: 0 };
  rec.last = score;
  rec.best = Math.max(rec.best, score);
  rec.attempts += 1;
  p.quiz[quizId] = rec;
  p.xp += score;
  for (const r of results) {
    if (!r.correct && r.ref) markWrong(p, r.ref);
  }
  touchDay(p);
  saveProgress(p);
  return p;
}

function markWrong(p: ProgressData, ref: string): void {
  const item = p.wrong[ref] ?? { count: 0, streak: 0, interval: 0, due: 0, last: 0 };
  item.count += 1;
  item.streak = 0;
  item.interval = REVIEW_LADDER[0];
  item.last = Date.now();
  item.due = Date.now() + REVIEW_LADDER[0] * DAY_MS;
  p.wrong[ref] = item;
}

/** 复习结算：答对沿阶梯升级（毕业即移出），答错退回重来 */
export function recordReviewResults(results: QuizAnswerResult[]): ProgressData {
  const p = loadProgress();
  for (const r of results) {
    if (!r.ref || !p.wrong[r.ref]) continue;
    const item = p.wrong[r.ref];
    item.last = Date.now();
    if (r.correct) {
      item.streak += 1;
      const next = REVIEW_LADDER[Math.min(item.streak, REVIEW_LADDER.length - 1)];
      if (item.streak >= REVIEW_LADDER.length) {
        delete p.wrong[r.ref]; // 连续答对 5 次，毕业
        continue;
      }
      item.interval = next;
      item.due = Date.now() + next * DAY_MS;
      p.xp += 1;
    } else {
      item.streak = 0;
      item.interval = REVIEW_LADDER[0];
      item.due = Date.now() + REVIEW_LADDER[0] * DAY_MS;
    }
  }
  touchDay(p);
  saveProgress(p);
  return p;
}

export function dueReviews(p: ProgressData, now = Date.now()): WrongItem[] {
  return Object.entries(p.wrong).filter(([, item]) => item.due <= now).map(([, item]) => item);
}

export function recordDaily(date: string, score: number, total: number, results: QuizAnswerResult[] = []): ProgressData {
  const p = loadProgress();
  const first = !p.daily[date];
  p.daily[date] = { score, total };
  if (first) p.xp += score; // 重刷当日不再重复加分
  for (const r of results) {
    if (!r.correct && r.ref) markWrong(p, r.ref);
  }
  touchDay(p);
  saveProgress(p);
  return p;
}
