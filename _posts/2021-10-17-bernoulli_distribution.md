---
layout: single
title:  "Bernoulli Distribution"
---

# 베르누이 분포 (Bernoulli Distribution)

---
베르누이 시행(Bernoulli Trial)은 '성공'과 '실패'의 두가지 결과만이 존재하는 시행으로서, 각 시행은 **서로 독립**인 것을 말합니다. 동전 던지기를 예를 들때, 동전을 던지면 앞면이 나오거나 뒷면이 나올 것이고, 동전을 반복적으로 던졌을 때, 먼저 시행에서 앞면이 나왔다고 그 다음 시행에서 뒷면이 나올 확률이 높아지거나 낮아지지는 않을 것입니다. 즉 각 시행은 서로에게 영향을 주지 않고, 독립입니다. 앞으로 다루게 될 이항 분포, 기하 분포, 음이항 분포 모두 베르누이 시행을 전제로 하고 있습니다 

이제 한 베르누이 시행에서, 어떤 확률변수 X가 시행의 결과가 '성공'이면 1이고, '실패'면 0의 값을 갖는다고 할 때, 이 확률변수 X를 바로 베르누이 확률변수라고 부르고, 이것의 분포를 베르누이 분포라고 합니다. 시행의 결과가 '성공'일 확률을 p라고 한다면, X는 Bernoulli(p)를 따른다고 말합니다.

<div style="text-align:center">

$X = \left\{\begin{matrix}
1 & \text{ if trial is a success} \\ 
0 & \text{ if trial is a failure}
\end{matrix}\right.$

 X ~ $Bernoulli(p)$

$f_{X}(x) = p^x(1-p)^{1-x}$ , x = 0, 1 
</div>

확률변수의 기댓값과 분산을 구하면 다음과 같이 될 것이다. 성공할 확률 그 자체가 베르누이 확률변수의 기댓값이 되는 것을 확인할 수 있다.

<div style="text-align:center">
$\begin{align*}
E(X) &= 1\cdot p + 0 \cdot (1-p) = p \\
Var(X) &= E(X-p)^{2}
 &= (0-p)^{2}\cdot(1-p)+(1-p)^{2}\cdot p\\
 &= p\cdot(1-p)
\end{align*}$
</div>