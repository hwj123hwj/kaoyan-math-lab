import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { courses } from '../data/courses';

export type Lesson = CollectionEntry<'lessons'>;

const courseOrder = new Map(courses.map((c, i) => [c.id, i]));

/** 全站课时按 课程 → 章 → 序 排序 */
export async function allLessons(): Promise<Lesson[]> {
  const list = await getCollection('lessons');
  return list.sort((a, b) => {
    const ka = keyOf(a), kb = keyOf(b);
    return ka - kb;
  });
}

export function keyOf(l: Lesson): number {
  const ch = l.data.chapter;
  return ((courseOrder.get(l.data.course) ?? 9) * 1_000_000) + (chapterNum(ch) * 1_000) + l.data.order;
}

function chapterNum(chapterId: string): number {
  const n = Number(chapterId.split('-')[0]);
  return Number.isFinite(n) ? n : 99;
}

/** 给课程页用：某课某章下的课时（已排序） */
export async function lessonsOf(courseId: string, chapterId: string): Promise<Lesson[]> {
  return (await allLessons()).filter((l) => l.data.course === courseId && l.data.chapter === chapterId);
}

/** 站内路径统一跟随 BASE_URL，保持子路径部署可用 */
export const withBase = (path: string): string =>
  (import.meta.env.BASE_URL.replace(/\/?$/, '/')) + path.replace(/^\//, '');

export function lessonPath(l: Lesson): string {
  return withBase(`lesson/${l.id}`);
}
