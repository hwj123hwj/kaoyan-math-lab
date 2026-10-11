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
  { id: 'limit-cases', title: '极限存在性实验室', course: 'calculus', blurb: '放大 x = 0 附近：振荡、跳跃、可去，四类"极限不老实"的函数一次看全。' },
  { id: 'mvt', title: '中值定理实验室', course: 'calculus', blurb: '拖动 ξ 找切线平行于弦的点——拉格朗日中值定理的几何现场。' },
  { id: 'matrix', title: '矩阵变换实验室', course: 'linear-algebra', blurb: '输入一个 2×2 矩阵，看网格被拉伸旋转，行列式就是面积伸缩倍数。' },
  { id: 'compose', title: '复合变换实验室', course: 'linear-algebra', blurb: '先做 B 再做 A，交换顺序结果不同——AB ≠ BA 的几何证明。' },
  { id: 'probability', title: '概率模拟实验室', course: 'probability', blurb: '掷骰子、抽样本：大数定律让均值稳定，中心极限定理让直方图长成钟形。' },
];

export const labMap = new Map(labs.map((l) => [l.id, l]));
