export type CourseId = 'calculus' | 'linear-algebra' | 'probability';

export interface Chapter {
  /** 章节短名，课时文件目录必须使用同一 id */
  id: string;
  num: number;
  title: string;
  brief: string;
  /** 考纲知识点清单（数学一） */
  points: string[];
}

export interface Course {
  id: CourseId;
  name: string;
  short: string;
  /** 数一卷面占比（官方公布比例） */
  weight: string;
  tagline: string;
  /** CSS 主色（oklch 色相） */
  hue: number;
  chapters: Chapter[];
}

export const courses: Course[] = [
  {
    id: 'calculus',
    name: '高等数学',
    short: '高数',
    weight: '约 56%',
    hue: 262,
    tagline: '函数是主角，极限是语言，微积分是武器库。',
    chapters: [
      {
        id: '01-limits', num: 1, title: '函数、极限、连续',
        brief: '整个微积分的语言系统',
        points: ['函数与有界性', '数列极限与函数极限', '无穷小与无穷大的比较', '两个重要极限', '等价无穷小替换', '洛必达法则', '连续性与间断点分类', '闭区间上连续函数的性质'],
      },
      {
        id: '02-differentiation', num: 2, title: '一元函数微分学',
        brief: '变化率：从切线斜率到中值定理',
        points: ['导数与微分的定义', '求导法则与高阶导数', '隐函数与参数方程求导', '微分中值定理（罗尔 / 拉格朗日 / 柯西）', '洛必达与泰勒公式', '单调性、极值与最值', '凹凸性、拐点与渐近线'],
      },
      {
        id: '03-integration', num: 3, title: '一元函数积分学',
        brief: '微分的逆运算与无限求和',
        points: ['原函数与不定积分', '换元积分法与分部积分法', '有理函数积分', '定积分的定义与性质', '变限积分与牛顿–莱布尼茨公式', '反常积分', '定积分的几何与物理应用'],
      },
      {
        id: '04-geometry', num: 4, title: '向量代数与空间解析几何',
        brief: '数一专属：给多元微积分搭舞台',
        points: ['向量运算（点积、叉积、混合积）', '平面方程与直线方程', '曲面方程（球面、柱面、旋转面）', '空间曲线及其投影'],
      },
      {
        id: '05-multivariable', num: 5, title: '多元函数微分学',
        brief: '从一元推广到多元，差异比想象多',
        points: ['偏导数与全微分', '多元复合函数与隐函数求导', '方向导数与梯度', '多元极值与条件极值（拉格朗日乘数法）', '切平面、法线与方向余弦'],
      },
      {
        id: '06-multi-integration', num: 6, title: '多元函数积分学',
        brief: '数一计算量的重头戏',
        points: ['二重积分（直角坐标、极坐标）', '三重积分（投影、截面、柱面、球面坐标）', '第一类曲线与曲面积分', '第二类曲线与曲面积分', '格林、高斯、斯托克斯公式'],
      },
      {
        id: '07-series', num: 7, title: '无穷级数',
        brief: '无限项相加何时有意义',
        points: ['数项级数的敛散性', '正项级数判别法（比较、比值、根值）', '交错级数与绝对收敛', '幂级数的收敛域与和函数', '函数展开为幂级数', '傅里叶级数（数一）'],
      },
      {
        id: '08-ode', num: 8, title: '常微分方程',
        brief: '用方程描述变化规律',
        points: ['可分离变量与一阶线性方程', '齐次方程与伯努利方程', '可降阶的高阶方程', '二阶常系数齐次线性方程', '二阶常系数非齐次线性方程', '欧拉方程（数一）', '微分方程的简单应用'],
      },
    ],
  },
  {
    id: 'linear-algebra',
    name: '线性代数',
    short: '线代',
    weight: '约 22%',
    hue: 165,
    tagline: '矩阵不只是一堆数，它是一场空间变换。',
    chapters: [
      {
        id: '01-determinants', num: 1, title: '行列式',
        brief: '方阵的一个关键数字',
        points: ['行列式的定义与性质', '行列式按行（列）展开', '克拉默法则', '典型高阶行列式的计算'],
      },
      {
        id: '02-matrices', num: 2, title: '矩阵',
        brief: '线性变换的代数载体',
        points: ['矩阵的运算与分块', '初等变换与初等矩阵', '可逆矩阵与伴随矩阵', '矩阵的秩', '分块矩阵运算'],
      },
      {
        id: '03-vectors', num: 3, title: '向量组',
        brief: '线性无关：线代灵魂概念',
        points: ['n 维向量与线性组合', '线性相关与线性无关', '极大线性无关组', '向量组的秩与矩阵的秩的关系', '施密特正交化'],
      },
      {
        id: '04-systems', num: 4, title: '线性方程组',
        brief: '秩决定解的形态',
        points: ['齐次方程组有非零解的条件', '非齐次方程组解的判定', '解的结构（基础解系、通解）', '两个方程组的公共解与同解'],
      },
      {
        id: '05-eigen', num: 5, title: '特征值与特征向量',
        brief: '变换中方向不变的向量',
        points: ['特征值与特征向量的定义与求法', '相似矩阵与对角化条件', '实对称矩阵的正交对角化'],
      },
      {
        id: '06-quadratic', num: 6, title: '二次型',
        brief: '用矩阵看二次曲面的骨架',
        points: ['二次型及其矩阵表示', '正交变换化标准形', '配方法与惯性定理', '正定二次型及其判定'],
      },
    ],
  },
  {
    id: 'probability',
    name: '概率论与数理统计',
    short: '概率',
    weight: '约 22%',
    hue: 75,
    tagline: '不确定性的数学，模拟就能看见的定理。',
    chapters: [
      {
        id: '01-events', num: 1, title: '随机事件与概率',
        brief: '给随机性建立公理',
        points: ['样本空间与事件关系', '概率的公理化定义与性质', '古典概型与几何概型', '条件概率与乘法公式', '全概率公式与贝叶斯公式', '事件独立性'],
      },
      {
        id: '02-random-vars', num: 2, title: '一维随机变量及其分布',
        brief: '把随机结果变成数',
        points: ['离散型随机变量与分布律', '常见离散分布（0-1、二项、泊松、几何、超几何）', '分布函数与概率密度', '常见连续分布（均匀、指数、正态）', '随机变量函数的分布'],
      },
      {
        id: '03-multivariate', num: 3, title: '多维随机变量及其分布',
        brief: '联合、边缘与条件',
        points: ['联合分布与边缘分布', '条件分布', '随机变量的独立性', '两个随机变量函数的分布'],
      },
      {
        id: '04-moments', num: 4, title: '随机变量的数字特征',
        brief: '用几个数概括整个分布',
        points: ['期望与方差', '常见分布的期望与方差', '协方差与相关系数', '切比雪夫不等式'],
      },
      {
        id: '05-lln-clt', num: 5, title: '大数定律与中心极限定理',
        brief: '为什么模拟次数够多就可靠',
        points: ['切比雪夫大数定律', '辛钦大数定律', '伯努利大数定律', '棣莫弗–拉普拉斯定理', '列维–林德伯格定理'],
      },
      {
        id: '06-statistics', num: 6, title: '数理统计基础',
        brief: '从样本推断总体',
        points: ['总体、样本与统计量', '三大抽样分布（χ²、t、F）', '正态总体的抽样分布结论', '矩估计与最大似然估计', '区间估计', '假设检验'],
      },
    ],
  },
];

export const courseMap = new Map(courses.map((c) => [c.id, c]));

export function chapterOf(courseId: CourseId, chapterId: string): Chapter | undefined {
  return courseMap.get(courseId)?.chapters.find((ch) => ch.id === chapterId);
}
