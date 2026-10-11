import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 课时集合。文件路径即课时 id，必须是 <course>/<chapter>/<lesson-name>.md，
 * 其中 course / chapter 与 src/data/courses.ts 中的 id 严格一致。
 */
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    course: z.enum(['calculus', 'linear-algebra', 'probability']),
    chapter: z.string(),
    /** 课时在章内的序号 */
    order: z.number(),
    title: z.string(),
    subtitle: z.string(),
    /** 预计阅读+操作分钟数 */
    minutes: z.number().default(15),
    /** 嵌入的实验室 id，见 src/data/labs.ts */
    labs: z.array(z.string()).default([]),
    /** 题组 id，见 src/data/quizzes.ts */
    quiz: z.string().optional(),
    status: z.enum(['ready', 'outline']).default('ready'),
  }),
});

export const collections = { lessons };
