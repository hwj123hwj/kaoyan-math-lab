---
course: linear-algebra
chapter: 05-eigen
order: 1
title: 特征值与对角化：找到变换的骨架
subtitle: 会旋转的矩阵先转到它的特征方向上去
minutes: 16
quiz: la-eigen
---

[矩阵即变换](/lesson/linear-algebra/02-matrices/linear-transform)一课说过：特征向量是变换中**方向不变**的向量。这一课把它变成完整的计算与判定体系——对角化是它的终点站，也是二次型的入场券。

## 求法：特征方程

$A\vec v=\lambda\vec v$（$\vec v\ne\vec 0$）等价于 $(A-\lambda E)\vec v=0$ 有非零解，即

$$\det(A-\lambda E)=0$$

解这个 $n$ 次方程得全部特征值；对每个 $\lambda_i$，解 $(A-\lambda_i E)x=0$ 得特征向量（齐次方程组的把戏，正好接上上一课）。两条速算关系（填空题抢分）：

$$\sum_{i}\lambda_i=\operatorname{tr}(A)\qquad \prod_i \lambda_i=\det A$$

**反求参数**题基本都靠这两条秒出：已知一个特征值，和或积马上给另一个。

## 对角化：什么时候矩阵"本质上是坐标选择"

$A$ 可相似对角化，是指存在可逆 $P$ 使 $P^{-1}AP=\Lambda$（对角阵）。几何：存在一组基（特征向量），在这组基下变换就是纯粹的"每根轴各自伸缩"，不再互相拉扯。

**充要条件**：$A$ 有 $n$ 个线性无关的特征向量，等价于——

$$\text{每个 } k \text{ 重特征值} \Rightarrow r(A-\lambda E)=n-k$$

（即 $k$ 重根恰好给出 $k$ 个无关特征向量。）

推论：$n$ 个互异特征值 ⇒ 必可对角化（充分不必要）。

**实对称矩阵**：必定可对角化，且特征值全为实数、不同特征值的特征向量自动正交——于是可以取正交矩阵 $Q$（$Q^TQ=E$）实现**正交对角化** $Q^TAQ=\Lambda$。这是二次型一章的地基。

**求 $P$ 的步骤**（大题模板）：特征方程求 $\lambda_i$ → 每个特征值解齐次方程组得特征向量 → 按列拼成 $P$（顺序与 $\Lambda$ 对角线对应）。

## 例题精讲

**例 1**（速算）$A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$，求特征值。

$\det(A-\lambda E)=\lambda^2-5\lambda-2=0$，判别式 $33$，$\lambda=\dfrac{5\pm\sqrt{33}}{2}$。验证：和 $=5=\operatorname{tr}A$ ✓，积 $=-2=\det A$ ✓。考试若只问"特征值之和/积"，用迹与行列式直接写答案。

**例 2**（判定）$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 能对角化吗？

特征方程 $(1-\lambda)^2=0$，$\lambda=1$ 是**二重根**（$n=2$、$k=2$），需要对它提供 $2$ 个线性无关的特征向量。解 $(A-E)x=0$：通解 $x=k\begin{pmatrix}1\\0\end{pmatrix}$，只有 **1 个**无关向量，凑不齐，**不可对角化**。几何直觉你也见过：剪切变换只有 $x$ 轴一根"不动方向"的钢筋，撑不起整个平面的新坐标架。

**例 3**（抽象题）设 $A^2=A$（幂等），证明 $A$ 的特征值只能是 $0$ 或 $1$。

由 $A\vec v=\lambda\vec v$（$\vec v\ne0$）：两边再作用一次，$A^2\vec v=\lambda^2\vec v$；又 $A^2\vec v=A\vec v=\lambda\vec v$，故 $\lambda^2\vec v=\lambda\vec v$，$(\lambda^2-\lambda)\vec v=0$，而 $\vec v\ne0$，所以 $\lambda(\lambda-1)=0$。**抽象特征值题的套路：从 $A\vec v=\lambda\vec v$ 出发，两边做题目给的运算，比较系数。**

## 考研视角

- 直接考：求特征值/特征向量（大题第一问常客）、判定对角化并求 $P$、由特征值反求矩阵参数、抽象矩阵（幂等/幂零/正交）特征值性质。
- 常见坑：特征向量忘写"非零"；$k$ 重根的无关向量数数错；$P$ 的列与 $\Lambda$ 对角元顺序不对应；实对称"不同特征值的特征向量正交"误写成"同一特征值的也正交"（它们只是线性无关，可再施密特正交化）。

## 下一步

做随堂练习，然后进入[二次型与正定性](/lesson/linear-algebra/06-quadratic/quadratic-forms)——对角化的直接应用。
