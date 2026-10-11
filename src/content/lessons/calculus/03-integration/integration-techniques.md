---
course: calculus
chapter: 03-integration
order: 2
title: 积分技巧：换元与分部的两条腿
subtitle: 会走路之前，先认全这两双鞋
minutes: 16
quiz: cal-int-techniques
---

定积分的定义上一课讲透了，但考场上没人真的去算黎曼和——大家用**牛顿–莱布尼茨**把问题化归为求原函数。求原函数的全部技巧，归根到底是两条腿：**换元**与**分部**。

## 换元积分法：换掉"不舒服"的部分

$$\int f(\varphi(x))\varphi'(x)\,dx = \int f(u)\,du,\quad u=\varphi(x)$$

正向用叫**凑微分**（心算级别的换元），反着用（设 $x=\psi(t)$）叫**第二类换元**。常用凑对：

$$x\,dx=\tfrac12 d(x^2)\qquad \frac{dx}{x}=d(\ln x)\qquad e^x dx=d(e^x)\qquad \frac{dx}{\sqrt x}=2\,d(\sqrt x)$$

第二类换元三大件：**三角换元**去根号（$\sqrt{a^2-x^2}$ 设 $x=a\sin t$；$\sqrt{a^2+x^2}$ 设 $x=a\tan t$；$\sqrt{x^2-a^2}$ 设 $x=a\sec t$）、**根式换元**（$t=\sqrt[n]{ax+b}$）、**倒代换** $t=\dfrac1x$（分母次数高于分子时）。

> **定积分换元必换限**：上下限跟着新变量走，算出新变量下的原函数直接代新限，**不要**再换回 $x$。

## 分部积分法：把积分"转移"出去

$$\int u\,dv = uv-\int v\,du$$

适用场景：两类不同函数相乘。$u,dv$ 的挑选口诀——**反对幂指三**（反三角、对数、幂、指数、三角）：排前面的做 $u$，排后面的凑进 $dv$。让 $u$ 求导变简单、$dv$ 积分不变难，积分就"降次"了。

## 例题精讲

**例 1**（凑微分）$\displaystyle\int \frac{\ln x}{x}\,dx$。

$\dfrac{dx}{x}=d(\ln x)$，原式 $=\displaystyle\int \ln x\, d(\ln x)=\frac{(\ln x)^2}{2}+C$。看到 $\frac1x$ 就想到 $d(\ln x)$，这是肌肉记忆。

**例 2**（分部两次）$\displaystyle\int x^2 e^x\,dx$。

$u=x^2$、$dv=e^xdx$：原式 $=x^2e^x-2\displaystyle\int xe^x dx$；对剩余积分再来一次（上一课的例题）得 $(x-1)e^x$。合计 $x^2e^x-2(x-1)e^x+C=(x^2-2x+2)e^x+C$。幂次升高就多分部几次——幂函数迟早降到底。

**例 3**（三角换元）$\displaystyle\int_0^4 \frac{dx}{1+\sqrt{x}}$。

令 $t=\sqrt x$，$dx=2t\,dt$，限变 $t:0\to2$：

$$\int_0^2 \frac{2t}{1+t}\,dt=2\int_0^2\left(1-\frac{1}{1+t}\right)dt=2\left[t-\ln(1+t)\right]_0^2=4-2\ln 3$$

假分式先除再积，是根式换元后的标准收尾。

## 考研视角

- 直接考：不定积分计算（每年必考）、定积分与对称性结合、分部积分推导**递推公式**（如 $I_n=\int\sin^n x\,dx$）。
- 常见坑：换元忘换限；分部时 $u,dv$ 选反（积分越做越复杂就是信号，回头重选）；有理函数积分忘配部分分式的完整分解。

## 下一步

做随堂练习；这五道全是"两条腿"的直接应用。之后可跳去[泰勒公式](/lesson/calculus/07-series/taylor-formula)看积分的近亲——展开与逼近。
