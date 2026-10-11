import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // GitHub Pages 项目子路径部署；本地 dev 也挂在 /kaoyan-math-lab/ 下
  base: '/kaoyan-math-lab',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
