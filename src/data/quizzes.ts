/**
 * 练习题库。stem / options / explain 中的 LaTeX 用 $...$ 包裹，
 * 构建时经 KaTeX 渲染为 HTML（见 Quiz.astro）。
 * answer 是正确选项的下标（从 0 开始）。
 */
export interface Question {
  stem: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface QuizSet {
  id: string;
  title: string;
  questions: Question[];
}

export const quizzes: Record<string, QuizSet> = {
  'cal-limits': {
    id: 'cal-limits',
    title: '极限热身 5 题',
    questions: [
      {
        stem: '$\\lim_{x\\to 0}\\dfrac{\\sin 3x}{x} = ?$',
        options: ['$0$', '$1$', '$3$', '不存在'],
        answer: 2,
        explain: '$\\dfrac{\\sin 3x}{x} = 3\\cdot\\dfrac{\\sin 3x}{3x}$，由重要极限 $\\lim_{t\\to0}\\dfrac{\\sin t}{t}=1$，原极限为 $3$。',
      },
      {
        stem: '$\\lim_{x\\to 0}\\dfrac{e^{2x}-1}{\\ln(1+x)} = ?$',
        options: ['$0$', '$1$', '$2$', '$\\dfrac{1}{2}$'],
        answer: 2,
        explain: '等价无穷小：$e^{2x}-1\\sim 2x$，$\\ln(1+x)\\sim x$，故比值为 $2$。',
      },
      {
        stem: '$\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^{2}} = ?$',
        options: ['$0$', '$\\dfrac{1}{2}$', '$1$', '$\\infty$'],
        answer: 1,
        explain: '$1-\\cos x \\sim \\dfrac{x^{2}}{2}$，所以极限为 $\\dfrac{1}{2}$。也可以用洛必达验证两次。',
      },
      {
        stem: '设 $f(x)=\\dfrac{x^{2}-1}{x-1}$，则 $x=1$ 是 $f(x)$ 的哪类间断点？',
        options: ['可去间断点', '跳跃间断点', '无穷间断点', '振荡间断点'],
        answer: 0,
        explain: '$f$ 在 $x=1$ 无定义，但 $\\lim_{x\\to1}f(x)=\\lim_{x\\to1}(x+1)=2$ 存在。左右极限相等的间断点是可去间断点，补充定义 $f(1)=2$ 即连续。',
      },
      {
        stem: '判断：若数列 $\\{x_n\\}$ 收敛于 $a$，则它的任何子列也收敛于 $a$。',
        options: ['正确', '错误'],
        answer: 0,
        explain: '这是归并（子列）定理，常用来证明数列发散：只要找到两个收敛到不同极限的子列（或一个发散子列），原数列必不收敛。',
      },
    ],
  },
  'cal-derivative': {
    id: 'cal-derivative',
    title: '导数练习 5 题',
    questions: [
      {
        stem: '设 $f(x)=x\\ln x$，则 $f\'(x) = ?$',
        options: ['$\\ln x + 1$', '$\\dfrac{1}{x}$', '$\\ln x$', '$1+\\dfrac{1}{x}$'],
        answer: 0,
        explain: '乘积法则：$(uv)\'=u\'v+uv\'$，得 $f\'=1\\cdot\\ln x+x\\cdot\\dfrac1x=\\ln x+1$。',
      },
      {
        stem: '$\\dfrac{d}{dx}\\left(e^{-x^{2}}\\right) = ?$',
        options: ['$-2x\\,e^{-x^{2}}$', '$e^{-x^{2}}$', '$-x\\,e^{-x^{2}}$', '$2x\\,e^{-x^{2}}$'],
        answer: 0,
        explain: '链式法则：外层 $e^u$ 的导数是 $e^u$，内层 $u=-x^2$ 的导数是 $-2x$，相乘即可。',
      },
      {
        stem: '函数 $f(x)=|x|$ 在 $x=0$ 处',
        options: ['连续且可导', '连续但不可导', '不连续但可导', '既不连续也不可导'],
        answer: 1,
        explain: '$|x|$ 在 $0$ 处连续；但左导数为 $-1$、右导数为 $1$，左右导数不相等，故不可导。"连续不可导"是考研高频反例。',
      },
      {
        stem: '曲线 $y=x^{2}$ 在点 $(2,4)$ 处的切线方程是',
        options: ['$y=4x-4$', '$y=4x+4$', '$y=4x$', '$y=x+2$'],
        answer: 0,
        explain: '$y\'=2x$，在 $x=2$ 处斜率为 $4$。由点斜式 $y-4=4(x-2)$，即 $y=4x-4$。',
      },
      {
        stem: '若 $f$ 在 $[0,1]$ 连续、$(0,1)$ 可导且 $f(0)=f(1)$，则下列结论一定成立的是',
        options: ['存在 $\\xi\\in(0,1)$ 使 $f\'(\\xi)=0$', '$f$ 在 $(0,1)$ 内单调', '$f\'(x)$ 在 $(0,1)$ 内恒为 $0$', '存在 $\\xi\\in(0,1)$ 使 $f(\\xi)=0$'],
        answer: 0,
        explain: '这正是罗尔定理的结论。注意另外三个选项都只是"可能成立"，不是必然；$f(\\xi)=0$ 需要端点异号（零点定理），本题条件不足。',
      },
    ],
  },
  'cal-riemann': {
    id: 'cal-riemann',
    title: '定积分练习 5 题',
    questions: [
      {
        stem: '$\\displaystyle\\int_0^1 x^{2}\\,dx = ?$',
        options: ['$\\dfrac{1}{2}$', '$\\dfrac{1}{3}$', '$1$', '$\\dfrac{2}{3}$'],
        answer: 1,
        explain: '牛顿–莱布尼茨：$\\left.\\dfrac{x^{3}}{3}\\right|_0^1=\\dfrac{1}{3}$。',
      },
      {
        stem: '$\\displaystyle\\int_0^{\\pi}\\sin x\\,dx = ?$',
        options: ['$0$', '$1$', '$2$', '$\\pi$'],
        answer: 2,
        explain: '$\\left.-\\cos x\\right|_0^{\\pi}=-(-1)+1=2$。正弦曲线一个拱的面积恰好是 $2$。',
      },
      {
        stem: '$\\displaystyle\\int_{-1}^{1} x^{3}\\,dx = ?$',
        options: ['$0$', '$\\dfrac{1}{2}$', '$1$', '$2$'],
        answer: 0,
        explain: '$x^{3}$ 是奇函数，积分区间关于原点对称，定积分为 $0$。对称区间先查奇偶性是基本习惯。',
      },
      {
        stem: '$\\displaystyle\\int_1^{e}\\dfrac{1}{x}\\,dx = ?$',
        options: ['$0$', '$1$', '$e$', '$e-1$'],
        answer: 1,
        explain: '$\\left.\\ln x\\right|_1^{e}=\\ln e-\\ln 1=1$。这就是"自然对数"名字的由来：$e$ 让对数的积分为 $1$。',
      },
      {
        stem: '判断：若 $f$ 在 $[a,b]$ 连续，则变上限积分 $F(x)=\\displaystyle\\int_a^x f(t)\\,dt$ 在 $[a,b]$ 可导，且 $F\'(x)=f(x)$。',
        options: ['正确', '错误'],
        answer: 0,
        explain: '这是变限积分求导定理（原函数存在定理）：连续函数必有原函数，变上限积分就是它的一个原函数。它是证明牛顿–莱布尼茨公式与许多考研题的桥梁。',
      },
    ],
  },
  'cal-taylor': {
    id: 'cal-taylor',
    title: '泰勒公式练习 5 题',
    questions: [
      {
        stem: '$e^{x}$ 的麦克劳林公式中，$x^{3}$ 项的系数是',
        options: ['$\\dfrac{1}{3}$', '$\\dfrac{1}{6}$', '$1$', '$3$'],
        answer: 1,
        explain: '$e^{x}=\\sum_{n=0}^{\\infty}\\dfrac{x^{n}}{n!}$，$x^{3}$ 项系数为 $\\dfrac{1}{3!}=\\dfrac16$。',
      },
      {
        stem: '$\\sin x$ 的麦克劳林公式中，$x^{5}$ 项的系数是',
        options: ['$\\dfrac{1}{60}$', '$\\dfrac{1}{120}$', '$-\\dfrac{1}{120}$', '$\\dfrac{1}{24}$'],
        answer: 1,
        explain: '$\\sin x=x-\\dfrac{x^{3}}{3!}+\\dfrac{x^{5}}{5!}-\\cdots$，$x^{5}$ 项系数为 $+\\dfrac{1}{5!}=\\dfrac{1}{120}$。注意符号一正一负交替。',
      },
      {
        stem: '$\\ln(1+x)$ 的麦克劳林展开式中，$x^{3}$ 项的系数是',
        options: ['$\\dfrac{1}{3}$', '$-\\dfrac{1}{3}$', '$\\dfrac{1}{2}$', '$-\\dfrac{1}{2}$'],
        answer: 0,
        explain: '$\\ln(1+x)=x-\\dfrac{x^{2}}{2}+\\dfrac{x^{3}}{3}-\\cdots$，系数为 $+\\dfrac13$（通项 $(-1)^{n-1}\\dfrac{x^{n}}{n}$）。',
      },
      {
        stem: '利用泰勒公式求极限：$\\lim_{x\\to 0}\\dfrac{e^{x}-1-x}{x^{2}} = ?$',
        options: ['$0$', '$\\dfrac{1}{2}$', '$1$', '$\\infty$'],
        answer: 1,
        explain: '$e^{x}=1+x+\\dfrac{x^{2}}{2}+o(x^{2})$，代入后分子为 $\\dfrac{x^{2}}{2}+o(x^{2})$，故极限为 $\\dfrac12$。泰勒公式处理这类"消去主导项"的极限比洛必达更快。',
      },
      {
        stem: '几何级数 $\\displaystyle\\sum_{n=0}^{\\infty}x^{n}=\\dfrac{1}{1-x}$ 的收敛域是',
        options: ['$[-1,1]$', '$(-1,1)$', '$(-1,1]$', '$[0,1)$'],
        answer: 1,
        explain: '收敛半径 $R=1$；$x=\\pm1$ 时通项不趋于 $0$，都发散，故收敛域为开区间 $(-1,1)$。实验室里可以亲眼看它在 $x=1$ 附近"崩掉"。',
      },
    ],
  },
  'la-transform': {
    id: 'la-transform',
    title: '矩阵与变换练习 5 题',
    questions: [
      {
        stem: '矩阵 $A=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$ 表示的平面变换是',
        options: ['顺时针旋转 $90°$', '逆时针旋转 $90°$', '关于 $x$ 轴反射', '投影到 $y$ 轴'],
        answer: 1,
        explain: '$A\\begin{pmatrix}1\\\\0\\end{pmatrix}=\\begin{pmatrix}0\\\\1\\end{pmatrix}$：单位向量 $\\vec i$ 被转到 $\\vec j$，即逆时针旋转 $90°$。看基向量的去向是识别变换最快的办法。',
      },
      {
        stem: '矩阵 $A$ 的行列式 $\\det A=0$，意味着',
        options: ['$A$ 是旋转矩阵', '$A$ 不可逆', '$A$ 的特征值之和为 $0$', '$A$ 是反射矩阵'],
        answer: 1,
        explain: '$\\det A=0$ 说明变换把平面"压扁"（面积伸缩倍数为 $0$），信息丢失，故 $A$ 不可逆。旋转与反射的行列式分别为 $1$ 与 $-1$，都不为 $0$。',
      },
      {
        stem: '矩阵 $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ 表示的变换是',
        options: ['旋转', '剪切', '缩放', '反射'],
        answer: 1,
        explain: '它把 $(x,y)$ 变为 $(x+y,\\,y)$：$y$ 不动，$x$ 随 $y$ 平移，平面像一副扑克牌被推歪，这是剪切（shear）。$\\det=1$，面积不变。',
      },
      {
        stem: '矩阵 $\\begin{pmatrix}-1&0\\\\0&1\\end{pmatrix}$ 表示的变换是',
        options: ['关于 $x$ 轴反射', '关于 $y$ 轴反射', '关于原点中心对称', '恒等变换'],
        answer: 1,
        explain: '$\\vec i=(1,0)$ 变为 $(-1,0)$，$\\vec j=(0,1)$ 不变：水平方向翻转、竖直方向不动，即关于 $y$ 轴反射。行列式 $-1$ 也提示定向被翻转。',
      },
      {
        stem: '判断：对任意同阶方阵 $A,B$，都有 $\\det(AB)=\\det(A)\\det(B)$。',
        options: ['正确', '错误'],
        answer: 0,
        explain: '行列式乘法法则。几何语言：先做 $B$ 变换再做 $A$ 变换，面积伸缩倍数相乘。这是许多行列式计算技巧（如 $|A^{-1}|=1/|A|$、$|A^{*}|=|A|^{n-1}$）的源头。',
      },
    ],
  },
  'prob-lln-clt': {
    id: 'prob-lln-clt',
    title: '大数定律与中心极限定理练习 5 题',
    questions: [
      {
        stem: '大量重复抛硬币，正面出现的频率稳定在 $0.5$ 附近。这一现象背后是',
        options: ['中心极限定理', '大数定律', '贝叶斯公式', '二项分布的正态近似'],
        answer: 1,
        explain: '"频率稳定于概率"正是伯努利大数定律的数学表述。中心极限定理回答的是另一个问题：误差近似服从什么分布。',
      },
      {
        stem: '设 $X_1,\\dots,X_n$ 独立同分布且 $E(X_i)=\\mu$，则样本均值 $\\bar X_n$ 依概率收敛于',
        options: ['$\\mu$', '$\\sigma^{2}$', '$0$', '$\\dfrac{\\sigma}{\\sqrt n}$'],
        answer: 0,
        explain: '这是辛钦大数定律：独立同分布、期望存在时，$\\bar X_n\\xrightarrow{P}\\mu$。它为"用样本均值估计总体均值"（矩估计）提供了理论依据。',
      },
      {
        stem: '设 $X\\sim B(100,\\,0.5)$，用正态分布近似时，$X$ 近似服从',
        options: ['$N(50,\\,25)$', '$N(50,\\,5)$', '$N(25,\\,50)$', '$N(0,\\,1)$'],
        answer: 0,
        explain: '棣莫弗–拉普拉斯定理：$\\mu=np=50$，$\\sigma^{2}=np(1-p)=25$（注意是方差 $25$，标准差才是 $5$）。',
      },
      {
        stem: '列维–林德伯格中心极限定理对 $X_1,\\dots,X_n$ 的要求是',
        options: ['独立同分布且期望、方差存在', '服从同一个正态分布', '只需相互独立', '必须是连续型随机变量'],
        answer: 0,
        explain: '标准条件：独立、同分布、$E(X_i)=\\mu$ 与 $\\operatorname{Var}(X_i)=\\sigma^{2}$ 存在（方差有限），则 $\\dfrac{\\sum X_i-n\\mu}{\\sqrt n\\,\\sigma}$ 近似 $N(0,1)$。不要求原分布是正态或连续型。',
      },
      {
        stem: '设 $X_1,\\dots,X_{100}$ 独立同分布且 $\\operatorname{Var}(X_i)=4$，则样本均值 $\\bar X$ 的标准差为',
        options: ['$0.2$', '$0.04$', '$2$', '$4$'],
        answer: 0,
        explain: '$\\operatorname{Var}(\\bar X)=\\dfrac{\\sigma^{2}}{n}=\\dfrac{4}{100}$，故标准差为 $2/10=0.2$。样本量翻四倍，精度才翻一倍——这解释了为什么模拟要"够多"。',
      },
    ],
  },
};
