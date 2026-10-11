import { quizzes } from '../data/quizzes';
import { tex } from './tex';

export interface BankQuestion {
  ref: string;
  set: string;
  setTitle: string;
  stem: string;
  options: string[];
  answer: number;
  explain: string;
  difficulty: string;
}

export interface BankPayload {
  questions: BankQuestion[];
}

/** 全量题库（构建期渲染公式），供错题复习页与每日五题页嵌入 */
export function buildBank(): BankPayload {
  const questions: BankQuestion[] = [];
  for (const set of Object.values(quizzes)) {
    set.questions.forEach((q, i) => {
      questions.push({
        ref: `${set.id}#${i}`,
        set: set.id,
        setTitle: set.title,
        stem: tex(q.stem),
        options: q.options.map(tex),
        answer: q.answer,
        explain: tex(q.explain),
        difficulty: q.difficulty ?? 'basic',
      });
    });
  }
  return { questions };
}
