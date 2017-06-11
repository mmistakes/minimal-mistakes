---
title: "Note on commutation coefficients in two ways"
modified:
categories: [notes]
excerpt: "An identity between vector commutation coefficients and coframe connection coefficients"
tags: [geometry, algebra]
date: 2017-05-04T13:52:00-07:00
modified:
---

<script type="math/tex">
\newcommand{\cd}{\nabla}
\newcommand{\pd}{\partial}
\newcommand{\Lie}{\mathcal{L}}
</script>
Suppose somebody hands you a collection of n linearly-independent
vector fields $$\{v_a\}_{a=1}^n$$ on an n-dimensional manifold, which
you can use as a frame field (not necessarily an orthonormal frame
field, because I haven't said anything about a metric yet!).  A
natural thing to compute are the *commutation coefficients* of these
vector fields,
<div>
\begin{align}
\label{eq:vec-c}
  [v_a, v_b] = c_{ab}{}^d v_d \,,
\end{align}
</div>
where we decompose the commutators back into the basis of the vector
fields themselves.  The collection of scalar fields $$c_{ab}{}^d$$ are
called the commutation coefficients.  Because of the antisymmetry of
the Lie bracket, the commutation coefficients are automatically
antisymmetric in the lower two indices.

On the other hand, let's say somebody hands you a collection of n
linearly-independent one-forms $$\{\theta^a\}_{a=1}^n$$, which you can
use as a coframe field (again not necessarily orthonormal, because no
metric yet; and this coframe field might not be dual to the frame
field).  A natural thing to compute is the exterior derivative of each
form, $$d\theta^a$$, which you could then expand in the basis of
two-forms made by wedging together the $$\theta^a$$'s.  So you could
define another set of coefficients $$\tilde{c}$$ from
<div>
\begin{align}
\label{eq:covec-c}
  d\theta^a = \tilde{c}^a{}_{bd} \frac{1}{2} \theta^b \wedge \theta^d
\end{align}
</div>
where we have included a factor of 1/2 for future convenience.  (This
is not to be confused with the connection 1-form $$\omega^a{}_b$$.)

The wedge product of two one-forms is automatically antisymmetric, so
again we have this property that the collection of scalar fields
$$\tilde{c}^a{}_{bd}$$ is automatically antisymmetric in the lower
indices.

This should probably lead you to suspect that the two sets of
coefficients are related when the vector and covector bases are
related.  So, let's now say that the two bases are dual to each other,
<div>
\begin{align}
  \theta^a(v_b) = \langle \theta^a, v_b \rangle = i_{v_b} \theta^a
  = \delta^a_b \,.
\end{align}
</div>
Notice that we still haven't needed a metric: finding a dual basis is
possible without metric (roughly, you only need to be able to do
matrix inversion).

Now we can extract components of each equation, Eqs. \eqref{eq:vec-c}
and \eqref{eq:covec-c}, by contracting with the right type of object.
If we contract Eq. \eqref{eq:vec-c} with $$\theta^e$$, we'll find
<div>
\begin{align}
  c_{ab}{}^e = \langle \theta^e, [v_a, v_b] \rangle
   = i_{[v_a, v_b]} \theta^e \,.
\end{align}
</div>
Similarly, if we insert two vectors into the two slots of
Eq. \eqref{eq:covec-c}, we find
<div>
\begin{align}
  \tilde{c}^a{}_{ef} = (d\theta^a)(v_e, v_f)
  = i_{v_f} i_{v_e} d\theta^a \,.
\end{align}
</div>

So now the question is: what is the relationship, if any, between
<div>
\begin{align}
  i_{[v,w]} \omega && \textrm{and} && i_v i_w d\omega \ ?
\end{align}
</div>
In fact, with the use of some
[differential identities]()
(or a one-liner in my package
[xTerior](http://www.xact.es/xTerior/), using the function
`SortDerivations[]`)
you can show that for any vectors $$v, w$$ and form $$\omega$$, we have
<div>
\begin{align}
\label{eq:fancy}
  i_v i_w d\omega = i_{[v,w]} \omega
  + d i_v i_w \omega
  - \Lie_v i_w \omega + \Lie_w i_v \omega
\end{align}
</div>
(there are a bunch of equivalent ways to rewrite this).  Now let
$$v=v_a, w = v_b, \omega=\theta^d$$.  Since
$$i_{v_a}\theta^d = \delta^d_a$$, the last three terms on the right
hand side of Eq. \eqref{eq:fancy} will vanish.  In this case we'll
find
<div>
\begin{align}
  i_{v_a} i_{v_b} d\theta^d = i_{[v_a, v_b]} \theta^d
\end{align}
</div>
which immediately tells us that
<div>
\begin{align}
c_{ab}{}^d = -\tilde{c}^d{}_{ab}
\,.
\end{align}
</div>
So indeed, the same information is encoded in the commutation
coefficients of vectors, $$c_{ab}{}^d$$, and the decomposition of
$$d\theta^d$$ into basis two-forms, $$\tilde{c}^d{}_{ab}$$.

Note again that everything has been independent of a metric.

<div>
\begin{align}
\end{align}
</div>
