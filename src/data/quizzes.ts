/**
 * 练习题库。stem / options / explain 中的 LaTeX 用 $...$ 包裹，
 * 构建时经 KaTeX 渲染为 HTML（见 Quiz.astro）。
 * answer 是正确选项的下标（从 0 开始）；difficulty 省略为 basic。
 */
export interface Question {
  stem: string;
  options: string[];
  answer: number;
  explain: string;
  difficulty?: 'basic' | 'advanced';
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
        difficulty: 'advanced',
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
  'cal-limits-2': {
    id: 'cal-limits-2',
    title: '极限存在性练习 5 题',
    questions: [
      {
        stem: '$\\lim_{x\\to 0}\\sin\\dfrac{1}{x}$ 的存在情况是',
        options: ['等于 $0$', '等于 $1$', '不存在（振荡）', '等于 $\\infty$'],
        answer: 2,
        explain: '$x\\to 0^+$ 时 $\\dfrac1x\\to+\\infty$，$\\sin\\dfrac1x$ 在 $[-1,1]$ 间无限振荡，不趋于任何值，极限不存在。实验室里放大 $x=0$ 附近可以亲眼看这个振荡。',
      },
      {
        stem: '$\\lim_{x\\to 0}x\\sin\\dfrac{1}{x} = ?$',
        options: ['不存在', '$0$', '$1$', '$\\infty$'],
        answer: 1,
        explain: '"有界 × 无穷小 = 无穷小"：$\\left|\\sin\\frac1x\\right|\\le 1$ 有界，$x\\to0$ 是无穷小，夹在 $\\pm|x|$ 之间被压到 $0$。注意它与上一题的区别：乘上一个无穷小，振荡就被驯服了。',
        difficulty: 'advanced',
      },
      {
        stem: '关于夹逼准则，下列说法正确的是',
        options: [
          '只要 $g(x)\\le f(x)\\le h(x)$，$f$ 的极限就存在',
          '需要 $g\\le f\\le h$ 且 $\\lim g=\\lim h=A$，则 $\\lim f=A$',
          '夹逼准则只适用于数列',
          '夹逼准则要求 $f$ 单调',
        ],
        answer: 1,
        explain: '夹逼的前提是两侧函数极限相等（且同为 $A$ 或同为 $\\infty$），此时中间的 $f$ 被迫趋于 $A$。两侧极限不相等时夹不出任何结论。',
      },
      {
        stem: '函数 $f(x)=\\dfrac{|x|}{x}$ 在 $x=0$ 处的间断类型是',
        options: ['可去间断点', '跳跃间断点', '无穷间断点', '振荡间断点'],
        answer: 1,
        explain: '左极限 $-1$、右极限 $+1$，都存在但不相等——典型的跳跃间断点。实验室把函数切到 $|x|/x$ 放大即可看到"悬崖"。',
      },
      {
        stem: '判断：单调递增且有上界的数列必收敛。',
        options: ['正确', '错误'],
        answer: 0,
        explain: '单调有界定理（实数完备性的等价刻画之一）。它是证明"一切实数都有唯一确定值"类问题的关键工具，例如证明数列 $\\left(1+\\frac1n\\right)^n$ 收敛到 $e$。',
      },
    ],
  },
  'cal-mvt': {
    id: 'cal-mvt',
    title: '中值定理练习 5 题',
    questions: [
      {
        stem: '拉格朗日中值公式的正确形式是',
        options: [
          '$f(b)-f(a)=f\'(\\xi)(b-a)$，$\\xi\\in(a,b)$',
          '$f(b)-f(a)=f\'(\\xi)(a-b)$，$\\xi\\in(a,b)$',
          '$f(b)+f(a)=f\'(\\xi)(b-a)$，$\\xi\\in[a,b]$',
          '$f(b)-f(a)=f\'(b)(b-a)$',
        ],
        answer: 0,
        explain: '几何意义：曲线上存在一点，其切线平行于连接两端点的弦。实验室里拖动 $\\xi$ 能找到这个点。',
      },
      {
        stem: '柯西中值定理中，除"$f,g$ 在 $[a,b]$ 连续、$(a,b)$ 可导"外还需要',
        options: ['$g(b)=g(a)$', '$g\'(x)\\ne 0$（$x\\in(a,b)$）且 $g(b)\\ne g(a)$', '$g(x)=x$', '$f\'(x)\\ne 0$'],
        answer: 1,
        explain: '柯西定理把拉格朗日中的"水平弦"推广为参数曲线 $(g(t),f(t))$ 的任意弦；$g\'\\ne0$ 保证分母有意义，$g(b)\\ne g(a)$ 由其推出。取 $g(x)=x$ 即退化为拉格朗日中值定理。',
      },
      {
        stem: '$f(x)=|x|$ 在 $[-1,1]$ 上不满足罗尔定理，原因是',
        options: ['端点函数值不相等', '在 $[-1,1]$ 上不连续', '在 $(-1,1)$ 内不可导（$x=0$ 处）', '它是偶函数'],
        answer: 2,
        explain: '三个条件里前两个都满足（连续、$f(-1)=f(1)=1$），坏在 $x=0$ 处不可导。检查中值定理条件时按"连续 → 可导 → 端点值"顺序逐条核对。',
      },
      {
        stem: '用中值定理证明 $\\ln(1+x)<x$（$x>0$），最直接的构造是',
        options: [
          '对 $f(t)=\\ln(1+t)$ 在 $[0,x]$ 用拉格朗日中值定理',
          '对 $f(t)=t-\\ln(1+t)$ 在 $[0,1]$ 用罗尔定理',
          '用柯西中值定理取 $g(t)=e^t$',
          '用夹逼准则',
        ],
        answer: 0,
        explain: '$\\ln(1+x)-\\ln 1=\\dfrac{x}{1+\\xi}<x$（$0<\\xi<x$）。拉格朗日公式的标准用法：把"函数值之差"翻译成"中间点的导数"再放缩。',
        difficulty: 'advanced',
      },
      {
        stem: '判断：拉格朗日中值定理要求 $f\'$ 在 $(a,b)$ 内连续。',
        options: ['正确', '错误'],
        answer: 1,
        explain: '只要求 $(a,b)$ 内可导（连续性是对 $f$ 本身在闭区间的要求）。$f\'$ 甚至可以处处不连续——例如 $f(x)=\\begin{cases}x^2\\sin\\frac1x,&x\\ne0\\\\0,&x=0\\end{cases}$ 相关的函数。分清"对谁连续"是证明题的送分/送命分界线。',
      },
    ],
  },
  'cal-int-techniques': {
    id: 'cal-int-techniques',
    title: '积分技巧练习 5 题',
    questions: [
      {
        stem: '$\\displaystyle\\int x e^{x}\\,dx = ?$',
        options: ['$(x-1)e^{x}+C$', '$xe^{x}+C$', '$\\dfrac{x^{2}}{2}e^{x}+C$', '$(x+1)e^{x}+C$'],
        answer: 0,
        explain: '分部积分取 $u=x$、$dv=e^x dx$：$\\int xe^x dx = xe^x-\\int e^x dx = (x-1)e^x+C$。幂函数与指数相乘，让幂函数降次。',
      },
      {
        stem: '$\\displaystyle\\int \\dfrac{\\ln x}{x}\\,dx = ?$',
        options: ['$\\dfrac{(\\ln x)^{2}}{2}+C$', '$\\dfrac{\\ln x^{2}}{2}+C$', '$\\ln\\ln x + C$', '$-\\dfrac{1}{x\\ln x}+C$'],
        answer: 0,
        explain: '凑微分：$\\dfrac{dx}{x}=d(\\ln x)$，原式 $=\\int \\ln x\\, d(\\ln x)=\\dfrac{(\\ln x)^2}{2}+C$。看到 $\\frac{1}{x}$ 就想 $d(\\ln x)$。',
      },
      {
        stem: '$\\displaystyle\\int_0^{\\pi/2} \\sin x\\,dx = ?$',
        options: ['$0$', '$1$', '$\\dfrac{\\pi}{2}$', '$2$'],
        answer: 1,
        explain: '$\\left.-\\cos x\\right|_0^{\\pi/2}=-(0)+1=1$。',
      },
      {
        stem: '$\\displaystyle\\int_0^{1}\\dfrac{dx}{1+x^{2}} = ?$',
        options: ['$\\dfrac{\\pi}{4}$', '$\\dfrac{\\pi}{2}$', '$\\ln 2$', '$\\arctan 1 - \\arctan 0$ 的平方'],
        answer: 0,
        explain: '$\\left.\\arctan x\\right|_0^1=\\dfrac{\\pi}{4}$。$\\arctan 1=\\dfrac{\\pi}{4}$ 是必背值。',
      },
      {
        stem: '$\\displaystyle\\int_0^{4}\\dfrac{dx}{1+\\sqrt{x}} = ?$',
        options: ['$4-2\\ln 3$', '$2\\ln 3$', '$4$', '$2-2\\ln 3$'],
        answer: 0,
        explain: '令 $t=\\sqrt x$（$dx=2t\\,dt$，$x:0\\to4$ 即 $t:0\\to2$）：$\\int_0^2\\dfrac{2t}{1+t}dt=2\\int_0^2\\left(1-\\dfrac{1}{1+t}\\right)dt=2\\left[t-\\ln(1+t)\\right]_0^2=4-2\\ln 3$。换元必须连上下限一起换。',
        difficulty: 'advanced',
      },
    ],
  },
  'la-systems': {
    id: 'la-systems',
    title: '线性方程组练习 5 题',
    questions: [
      {
        stem: '齐次方程组 $Ax=0$（$n$ 个未知量，$r(A)=r$）的基础解系含向量的个数是',
        options: ['$r$', '$n-r$', '$n$', '$n+r$'],
        answer: 1,
        explain: '解空间的维数 = 自由未知量个数 = $n-r$。"维数定个数"是解结构问题的第一句话。',
      },
      {
        stem: '非齐次方程组 $Ax=b$ 有解的充分必要条件是',
        options: ['$r(A)=n$', '$r(A)=r(A\\,|\\,b)$', '$b\\ne 0$', '$\\det A\\ne 0$'],
        answer: 1,
        explain: '增广矩阵与系数矩阵秩相等 ⟺ $b$ 能由 $A$ 的列向量线性表出 ⟺ 有解。$\\det A\\ne0$ 只是"唯一解"的充分条件（方阵情形）。',
      },
      {
        stem: '若 $r(A)=n$（未知量个数），则齐次方程组 $Ax=0$',
        options: ['有无穷多解', '只有零解', '有非零解', '可能无解'],
        answer: 1,
        explain: '$n-r=n-n=0$，基础解系为空，解空间只有零向量。齐次方程组永远有零解，所以对它只问"有没有非零解"。',
      },
      {
        stem: '设 $\\xi_1,\\xi_2$ 是 $Ax=b$ 的两个不同解，则下列一定是 $Ax=0$ 的解的是',
        options: ['$\\xi_1+\\xi_2$', '$\\xi_1-\\xi_2$', '$\\xi_1$', '$2\\xi_1-\\xi_2$'],
        answer: 1,
        explain: '$A(\\xi_1-\\xi_2)=b-b=0$。非齐次两解之差落入齐次解——这正是通解结构 $x=\\xi^*+k_1\\eta_1+\\cdots$ 的来源。',
      },
      {
        stem: '判断：方程个数多于未知量个数的线性方程组一定无解。',
        options: ['正确', '错误'],
        answer: 1,
        explain: '方程多只说明约束多，可能恰有解也可能矛盾，要用秩判定。反例：$\\begin{cases}x=1\\\\2x=2\\end{cases}$ 有解 $x=1$。',
      },
    ],
  },
  'la-eigen': {
    id: 'la-eigen',
    title: '特征值练习 5 题',
    questions: [
      {
        stem: '$\\lambda$ 是 $A$ 的特征值，$\\vec v$ 是对应特征向量，则',
        options: ['$A\\vec v=\\lambda \\vec v$，$\\vec v\\ne\\vec 0$', '$A\\vec v=\\vec 0$', '$\\vec v=\\lambda A\\vec v$', '$A\\vec v=\\lambda \\vec v$ 对任意 $\\vec v$ 成立'],
        answer: 0,
        explain: '定义本身就是判别式：特征向量必须非零，且"变换后仍在原方向上"。零向量永远满足等式，所以必须排除。',
      },
      {
        stem: '设 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$，则 $A$ 的特征值之和为',
        options: ['$5$', '$-2$', '$4$', '$7$'],
        answer: 0,
        explain: '特征值之和 $=\\operatorname{tr}(A)=1+4=5$，之积 $=\\det A=4-6=-2$。这两条关系是特征值填空题的抢分神器。',
      },
      {
        stem: '$n$ 阶矩阵 $A$ 可相似对角化的充分必要条件是',
        options: [
          '$A$ 有 $n$ 个不同的特征值',
          '$A$ 是实对称矩阵',
          '对每个 $k$ 重特征值，$r(A-\\lambda E)=n-k$',
          '$\\det A\\ne 0$',
        ],
        answer: 2,
        explain: '本质是"每个特征值提供的线性无关特征向量个数等于重数"。$A$ 有 $n$ 个互异特征值只是充分条件；实对称是重要的充分条件而非必要条件。',
        difficulty: 'advanced',
      },
      {
        stem: '关于实对称矩阵的特征值与特征向量，下列说法错误的是',
        options: ['特征值都是实数', '不同特征值的特征向量相互正交', '必可正交对角化', '特征值一定互不相同'],
        answer: 3,
        explain: '实对称矩阵可以有重根（如单位矩阵），A、B、C 都是实对称矩阵的标准定理。错误项就是考点：重根完全允许。',
      },
      {
        stem: '判断：两个矩阵有相同的特征值，则它们一定相似。',
        options: ['正确', '错误'],
        answer: 1,
        explain: '相似 ⟹ 特征值相同，但反过来不成立：$\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ 与 $E$ 特征值相同（都是 $1$），却不对角化、不相似于 $E$。特征值只是相似的必要条件。',
      },
    ],
  },
  'la-quadratic': {
    id: 'la-quadratic',
    title: '二次型练习 5 题',
    questions: [
      {
        stem: '二次型 $f(x_1,x_2)=2x_1^{2}+4x_1x_2+3x_2^{2}$ 的矩阵 $A$ 是',
        options: [
          '$\\begin{pmatrix}2&2\\\\2&3\\end{pmatrix}$',
          '$\\begin{pmatrix}2&4\\\\0&3\\end{pmatrix}$',
          '$\\begin{pmatrix}2&4\\\\4&3\\end{pmatrix}$',
          '$\\begin{pmatrix}2&1\\\\1&3\\end{pmatrix}$',
        ],
        answer: 0,
        explain: '二次型的矩阵必须对称：对角放平方项系数，非对角放交叉项系数的一半（$4x_1x_2 \\to a_{12}=a_{21}=2$）。写完检查 $A^T=A$。',
      },
      {
        stem: '用正交变换 $x=Qy$ 化二次型为标准形，标准形的系数是',
        options: ['$A$ 的主对角线元素', '$A$ 的特征值', '$A$ 的各行元素之和', '任意实数'],
        answer: 1,
        explain: '$Q^TAQ=\\Lambda=\\mathrm{diag}(\\lambda_1,\\dots,\\lambda_n)$，所以标准形 $f=\\sum\\lambda_i y_i^2$。几何上：转到特征向量方向看，椭圆的主轴方向就是特征方向。',
      },
      {
        stem: '$n$ 元二次型正定的充分必要条件是',
        options: ['顺序主子式全大于零', '特征值全小于零', '$\\det A>0$', '各阶主对角线元素大于零'],
        answer: 0,
        explain: '顺序主子式全正 ⟺ 正定，是最常用的充要判别法。$\\det A>0$ 只是必要条件（$n$ 阶顺序主子式之一）；特征值全正也充要但计算更重。',
      },
      {
        stem: '二次型 $f(x,y)=x^{2}+4xy+2y^{2}$ 的正定性是',
        options: ['正定', '负定', '不定', '半正定'],
        answer: 2,
        explain: '矩阵 $\\begin{pmatrix}1&2\\\\2&2\\end{pmatrix}$：一阶顺序主子式 $1>0$，二阶 $\\det=2-4=-2<0$，不满足全正 ⇒ 不定。几何上 $f=c$ 的等高线是双曲线型。',
        difficulty: 'advanced',
      },
      {
        stem: '判断：可逆线性变换不改变二次型的正定性。',
        options: ['正确', '错误'],
        answer: 0,
        explain: '正定性在合同变换下不变（惯性定理：正、负惯性指数是合同不变量）。这就是为什么可以用配方法或正交变换把一般二次型化成标准形后再判正定。',
      },
    ],
  },
  'prob-bayes': {
    id: 'prob-bayes',
    title: '条件概率与贝叶斯练习 5 题',
    questions: [
      {
        stem: '设 $P(A)=0.5$，$P(B)=0.4$，$P(AB)=0.3$，则 $P(A\\mid B) = ?$',
        options: ['$0.6$', '$0.75$', '$0.15$', '$0.2$'],
        answer: 1,
        explain: '$P(A|B)=\\dfrac{P(AB)}{P(B)}=\\dfrac{0.3}{0.4}=0.75$。条件概率就是"把样本空间换成 $B$ 再算占比"。',
      },
      {
        stem: '甲、乙两台机床产量分别占 $60\\%$ 与 $40\\%$，次品率分别为 $1\\%$ 与 $2\\%$。任取一件是次品的概率是',
        options: ['$0.014$', '$0.015$', '$0.02$', '$0.006$'],
        answer: 0,
        explain: '全概率公式：$P(次)=0.6\\times0.01+0.4\\times0.02=0.006+0.008=0.014$。按"来源"分块加权。',
      },
      {
        stem: '（续上题）已知取到的是次品，它来自乙机床的概率是',
        options: ['$\\dfrac{4}{7}$', '$\\dfrac{2}{5}$', '$\\dfrac{1}{2}$', '$\\dfrac{4}{13}$'],
        answer: 0,
        explain: '贝叶斯公式：$P(乙|次)=\\dfrac{0.4\\times0.02}{0.014}=\\dfrac{0.008}{0.014}=\\dfrac47\\approx0.571$。乙产量少但次品率高，"事后"嫌疑反而更大——这就是贝叶斯的反直觉之处。',
        difficulty: 'advanced',
      },
      {
        stem: '设 $P(A)=0.5$，$P(B)=0.4$，则 $A$ 与 $B$ 相互独立的条件是',
        options: ['$P(AB)=0.2$', '$P(AB)=0.3$', '$P(A)+P(B)=0.9$', '$A\\cap B=\\varnothing$'],
        answer: 0,
        explain: '独立的定义是 $P(AB)=P(A)P(B)=0.2$。注意"互不相容"（$P(AB)=0$）与"独立"是两回事：两个概率都正的事件不可能既互斥又独立。',
      },
      {
        stem: '判断：若 $A$ 与 $B$ 相互独立，则 $A$ 与 $\\bar B$ 也相互独立。',
        options: ['正确', '错误'],
        answer: 0,
        explain: '独立性的四件套：$A,B$、$A,\\bar B$、$\\bar A,B$、$\\bar A,\\bar B$ 同时独立或同时不独立。证明只需 $P(A\\bar B)=P(A)-P(AB)=P(A)(1-P(B))=P(A)P(\\bar B)$。',
      },
    ],
  },
  'prob-rv': {
    id: 'prob-rv',
    title: '一维随机变量练习 5 题',
    questions: [
      {
        stem: '设 $P(X=k)=c\\left(\\dfrac{1}{2}\\right)^{k}$（$k=1,2,\\dots$），则 $c = ?$',
        options: ['$\\dfrac{1}{2}$', '$1$', '$2$', '$\\dfrac{1}{4}$'],
        answer: 1,
        explain: '分布律必须归一化：$\\sum_{k=1}^{\\infty}c\\left(\\tfrac12\\right)^k=c\\cdot\\dfrac{1/2}{1-1/2}=c=1$。见到"求参数"先写 $\\sum p_k=1$。',
      },
      {
        stem: '设 $X\\sim P(\\lambda)$ 且 $P(X=1)=P(X=2)$，则 $\\lambda = ?$',
        options: ['$1$', '$2$', '$4$', '$\\dfrac{1}{2}$'],
        answer: 1,
        explain: '$\\lambda e^{-\\lambda}=\\dfrac{\\lambda^{2}e^{-\\lambda}}{2}$，两边约去 $\\lambda e^{-\\lambda}$ 得 $\\lambda=2$。泊松求参几乎都走"概率相等或成比"这条路。',
      },
      {
        stem: '关于分布函数 $F(x)$，下列说法**错误**的是',
        options: ['$F(x)$ 单调不减', '$F(x)$ 右连续', '$F(-\\infty)=0,\\ F(+\\infty)=1$', '$F(x)$ 处处连续'],
        answer: 3,
        explain: '分布函数只保证右连续，离散型的 $F$ 是阶梯函数、有跳跃。前三条是标准性质，"处处连续"只有连续型才具有。',
      },
      {
        stem: '设 $X\\sim U(0,2)$，则 $P(0.5<X<1.5) = ?$',
        options: ['$0.25$', '$0.5$', '$0.75$', '$1$'],
        answer: 1,
        explain: '均匀分布的概率就是长度比：$\\dfrac{1.5-0.5}{2-0}=0.5$。画数轴量长度，密度都懒得写。',
      },
      {
        stem: '$X\\sim E(\\lambda)$（指数分布），已知设备已无故障运行了 $s$ 小时，则它再运行至少 $t$ 小时的概率是',
        options: ['$P(X>t)$', '$P(X>s+t)$', '$1-P(X>t)$', '$P(X>t\\mid X<s)$'],
        answer: 0,
        explain: '指数分布的无记忆性：$P(X>s+t\\mid X>s)=P(X>t)$，与已运行多久无关。这正是"指数分布无老化"的概率含义，也是它与正态、均匀并列高频的原因。',
      },
    ],
  },
  'cal-vectors': {
    id: 'cal-vectors',
    title: '向量与空间解析几何练习 5 题',
    questions: [
      {
        stem: '向量 $\\vec a=(1,2,-2)$ 与 $\\vec b=(2,x,1)$ 垂直，则 $x = ?$',
        options: ['$0$', '$2$', '$-2$', '$1$'],
        answer: 0,
        explain: '垂直 $\\iff$ 点积为零：$1\\cdot2+2x+(-2)\\cdot1=2x=0$，得 $x=0$。',
      },
      {
        stem: '$\\vec a=(1,0,0)$，$\\vec b=(0,2,0)$，则以 $\\vec a,\\vec b$ 为邻边的平行四边形面积是',
        options: ['$1$', '$2$', '$4$', '$\\sqrt5$'],
        answer: 1,
        explain: '$\\vec a\\times\\vec b=(0,0,2)$，模长 $2$ 即面积。叉积的几何意义就是"有向面积"。',
      },
      {
        stem: '向量 $\\vec a=(1,0,0)$，$\\vec b=(0,1,0)$，$\\vec c=(1,1,z)$ 共面，则 $z = ?$',
        options: ['$0$', '$1$', '$2$', '$-1$'],
        answer: 0,
        explain: '共面 $\\iff$ 混合积为零：$\\vec a\\cdot(\\vec b\\times\\vec c)$ 按第一行展开恰为 $z$，令其为 $0$ 得 $z=0$。',
      },
      {
        stem: '过点 $(1,1,1)$、以 $\\vec n=(2,1,-1)$ 为法向量的平面方程是',
        options: ['$2x+y-z=2$', '$2x+y-z=0$', '$2x+y+z=3$', '$x+y-z=1$'],
        answer: 0,
        explain: '点法式 $2(x-1)+(y-1)-(z-1)=0$，整理得 $2x+y-z=2$。验算：把 $(1,1,1)$ 代回成立。',
      },
      {
        stem: '直线 $\\dfrac{x}{1}=\\dfrac{y}{1}=\\dfrac{z}{1}$ 与平面 $x+y+z=1$ 的位置关系是',
        options: ['直线垂直于平面', '直线平行于平面', '直线在平面内', '斜交'],
        answer: 0,
        explain: '直线方向向量 $\\vec s=(1,1,1)$ 与平面法向量 $\\vec n=(1,1,1)$ 平行，故直线垂直于平面（点 $(0,0,0)$ 不在平面上，是垂直相交而非含于平面）。位置关系题第一步永远是"找出 $\\vec s$ 与 $\\vec n$"。',
      },
    ],
  },
};
