export interface LabMeta {
  id: string;
  title: string;
  blurb: string;
  /** 实验属于哪门课 */
  course: 'calculus' | 'linear-algebra' | 'probability';
}

export const labs: LabMeta[] = [
  { id: 'derivative', title: '切线实验室', course: 'calculus', blurb: '拖动点、缩小步长 h，看割线如何逼近切线——导数定义的可视化。' },
  { id: 'riemann', title: '黎曼和实验室', course: 'calculus', blurb: '矩形越切越细，面积和逼近定积分，亲眼看到误差归零。' },
  { id: 'taylor', title: '泰勒展开实验室', course: 'calculus', blurb: '调节阶数 n，看多项式如何长成 sin、e^x 的样子，以及收敛半径的边界。' },
  { id: 'matrix', title: '矩阵变换实验室', course: 'linear-algebra', blurb: '输入一个 2×2 矩阵，看网格被拉伸旋转，行列式就是面积伸缩倍数。' },
  { id: 'probability', title: '概率模拟实验室', course: 'probability', blurb: '掷骰子、抽样本：大数定律让均值稳定，中心极限定理让直方图长成钟形。' },
];

export const labMap = new Map(labs.map((l) => [l.id, l]));
