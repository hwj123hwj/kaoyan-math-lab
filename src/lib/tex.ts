import katex from 'katex';

/** 把 $...$ 中的 LaTeX 渲染为 KaTeX HTML（构建期使用，运行时零渲染开销） */
export function tex(input: string): string {
  return input.replace(/\$([^$]+)\$/g, (_, expr: string) =>
    katex.renderToString(expr, { throwOnError: true, output: 'html' }));
}
