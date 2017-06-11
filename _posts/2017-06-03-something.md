---
title: "2017-06-03 something so fresh"
categories:
  - Edge Case
tags:
  - content
  - css
  - edge case
  - lists
  - markup
---


=15.5pt

[**A Novel Approach for Calculating Loops in Perturbation Theory**]{}

------------------------------------------------------------------------

[**Abstract**]{}\
We propose a novel method for calculating loops in cosmological
perturbation theory. We give formulas for the one-loop and the two-loop
power spectrum and the one-loop bispectrum.

------------------------------------------------------------------------

Introduction
============

Calculating higher order correlation functions in perturbative approach
to Large Scale Structure (LSS) is a very tedious task. The higher order
kernels quickly become very complicated and each loop brings another
three-dimensional integral. The linear power spectrum that appears in
the integrand is known only as a numerical function which makes solving
any non-trivial integrals analytically impossible. The direct numerical
integration on the other hand is not very fast. The state-of-the-art
results used in practice to explore the theory and compare the
predictions with N-body simulations usually do not exceed two-loop
calculation [@?].

In order to make some progress, we need new strategies in approaching
the problem. One example is a recent proposal to use Fast Fourier
Transform (FFT) for efficient evaluation of the one-loop power
spectrum [@?]. After performing all angular integrals, the one-loop
expressions boil down to a set of simple one-dimensional integrals that
can be efficiently evaluated using FFTs. Unfortunately, extending this
approach to the one-loop bispectrum or the two-loop power spectrum has
proven to be challenging [@?].

In this paper we build on ideas of [@?] but choose a slightly different
strategy which allows us to go beyond the one-loop power spectrum. Let
us briefly sketch the main idea behind our proposal. Prior to doing any
integrals, the linear power spectrum is expanded in power laws. This is
naturally accomplished using FFT in $\log k$. Given some range of
wavenumbers of interest, from $k_{\rm min}$ to $k_{\rm max}$, the
approximation for the power spectrum with $N$ sampling points is [@?]
\[eq:fftlog\] P\_[lin]{}(k\_n) = \_[m=-N/2]{}\^[m=N/2]{} c\_m (
)\^[\_m]{} , where the coefficients $c_m$ and the powers $\eta_m$ are
given by c\_m = 1N \_[n=0]{}\^[N-1]{} P\_[lin]{}(k\_n) ( )\^e\^[-2i m n
/N]{} , \_m = + . Parameter $\nu$ is an arbitrary real number. As we
will see, the simplest choice $\nu=0$ is insufficient and we will need
this more general form of the Fourier transform. In terminology of [@?]
we call this parameter bias. Note that the powers in the power-law
expansion are complex numbers. In practice, even a small number of
power-laws, $\mathcal O(100)$, is enough to capture all features of the
linear power spectrum including the BAO wiggles.

Decomposition reduces the evaluation of a loop diagram for an arbitrary
cosmology to evaluation of the same diagram for a set of power-law
universes. We then simply try to solve the momentum integrals
analytically, rather than trying to rewrite the loop integrals in terms
of one-dimensional FFTs. The final answer is a finite sum of analytical
expressions which are fast to evaluate. This method has some advantages
and disadvantages that we will come back to later. For the moment, let
us just give a hint towards what kind of analytical expressions we can
expect. In the simplest case of the one-loop power spectrum, the
momentum integral for a power-law universe can be expressed in terms of
gamma functions [@?]. Looking at higher order correlators an interesting
pattern emerges. Given that all perturbation theory kernels can be
always written in terms of integer powers of the arguments of the linear
power spectra, the general form of loop integrals in a power-law
cosmology is formally identical to the one of a massless Quantum Field
Theory with cubic interactions.[^1] This is just a formal analogy but it
is rather useful because many results developed in theory of scattering
amplitudes can be applied to LSS correlation functions as well. Indeed,
some steps in this direction have already been made for the one-loop
bispectrum in [@roman]. In this work we rederive the same result, but we
bring it to a form which is suitable for numerical evaluation. We also
derive a formula for the two-loop power spectrum in power-law cosmology.
Generically, the higher order/loop correlation functions are expressed
in terms of the generalized hypergeometric functions. Given that powers
in the power-laws are complex, one has to be careful about analytical
continuations of all results to the entire complex plane.

Before diving into the details, let us comment on some important virtues
and shortcomings of our method. The first obvious advantage is that
calculating loops boils down to evaluation of finite sums of analytical
expressions. Knowing the explicit analytical expressions allows us to
use symmetries and other properties of functions at hand. We will see in
several examples how this knowledge can increase the speed and the
numerical stability of calculations significantly.

The second thing is cosmology dependence/independence...

The major issue with our method is that it cannot be applied to
integrals of arbitrary form. It only works in a limited set of cases
where the integrals of interest are convergent in a power-law cosmology
$P_{\rm lin}\sim k^{\nu}$, at least for some choices of $\nu$. There are
many relevant examples for which this is not the case. For example, let
us consider calculating a simple integral such as
$\int_0^\infty dq P_{\rm lin}(q)$. This is a perfectly well defined
quantity in a $\Lambda$CDM-like cosmology and the integral can be easily
evaluated numerically. On the other hand, if we expand the linear power
spectrum in power laws, the result is zero. This happens because for a
power-law power spectrum the integral $\int_0^\infty dq\; q^{\nu}$ is
divergent for any $\nu$ and it has to be regularized somehow. In
dimensional regularization this integral vanishes:
$\int_0^\infty dq\; q^{\nu}=0$. [ MS: I have to check this.]{}

Similar problems occur in calculations of loop diagrams. For example, in
the one-loop power spectrum, $P_{13}$ term diverges either in the UV or
in the IR for any power $\nu$. This means that using our method we
cannot calculate $P_{13}$ contribution alone.[^2] This is annoying, but
it is not the end of the story. Because of the IR cancellations imposed
by the Equivalence Principle, the [*full*]{} one-loop integral is still
well behaved for $-3<\nu<-1$. Therefore, our method can be used to
evaluate the full one-loop power spectrum, even though individual pieces
might not agree with the usual numerical results. The same issues appear
in the one-loop bispectrum and the two-loop power spectrum.

One important consequence of these limitations is that the bias $\nu$ in
has to be chosen such that the integral at hand is convergent for
$P_{\rm lin}\sim k^{\nu}$. While in principle this is not a problem, in
practice it sometimes requires a large number of frequencies. Such
situations happen either when the bias $\nu$ has to be too negative, or
when the range of powers for which the integrals are convergent is too
narrow. One is then forced to increase the interval
$(k_{\rm min},k_{\rm max})$ to ensure convergence and this leads to
higher number of sampling points $N$. We will see some examples of this
sort in calculations below.

In the rest of the paper we focus on three examples: one-loop power
spectrum, one-loop bispectrum and two-loop power spectrum. We will
present our calculations in detail and compare them with the standard
numerical results.

One-loop Power Spectrum
=======================

Let us first consider the simplest case of the one-loop power spectrum.
In perturbation theory there are two different one-loop contributions.
Using the usual approximation in which the time dependence is separated
from $k$ dependence (for a review see [@?]), the one-loop power spectrum
reads P\_[1-loop]{}(k,) = D\^2()\[P\_[22]{}(k)+P\_[13]{}(k)\] , where
$\tau$ is conformal time, $D(\tau)$ is the growth factor for matter
fluctuations and the two terms in the square brackets are given by
P\_[22]{}(k) = 2 \_ F\_[2]{}\^2(, - ) P\_[lin]{}(q) P\_[lin]{}( |- | ) ,
P\_[13]{}(k) = 6P\_[lin]{}(k) \_ F\_3(, -, ) P\_[lin]{}(q) . The
explicit form of kernels $F_2$ and $F_3$ can be found in many references
(see for example [@a]) or calculated using recursion relations. We
review some of these results in Appendix \[app:kernels\]. One important
point is that it is always possible to expand kernels in integer powers
of $k^2$, $q^2$ and $|\k-\q|^2$. If we also decompose the linear power
spectrum in power laws using , it is easy to see that all terms in the
sum are of the form \_ k\^[3-2\_[12]{}]{}I(\_1,\_2) , where $\nu_1$ and
$\nu_2$ contain powers $\eta_m$ and integers coming from the expansion
of the kernels. The overall scaling of the integral is fixed by the
scaling symmetry to be $k^{3-2\nu_{12}}$ and it is an elementary
exercise to calculate the unknown function I(\_1,\_2) = . The one
loop-power spectrum is then given by a simple sum P\_[1-loop]{}(k) =
\_[\_1,\_2]{} \^[(1)]{}\_[\_1,\_2]{} k\^[3-2\_[12]{}]{} I(\_1,\_2) . The
only information about cosmology is in the matrix
$\mathcal{P}^{(1)}_{\nu_1,\nu_2}$ which can be trivially obtained from
the expansion . Calculating its elements requires only one FFT of the
linear power spectrum. The function $I(\nu_1,\nu_2)$ can be precomputed
(for a given number of sampling points $N$) and it does not depend on
cosmology. In this particular case calculating $I(\nu_1,\nu_2)$ is very
cheap and precomputing it is not really necessary. However this
splitting in cosmology-dependent part that is easy to evaluate and
cosmology-independent part that can be precomputed is a generic feature
of our method and it should be kept in mind for more complicated cases,
such as the two-loop power spectrum, where it is relevant for practical
evaluations.

Numerical Evaluation
--------------------

Check which pieces are calculable. UV counterterms do not help. Do full
one loop with $\nu=-1.4$. Do $P_{22}$ with $\nu=-0.1$.

One-loop Power Spectrum for Biased Tracers
------------------------------------------

Discuss all diagrams from Valentin’s paper.

One-loop Bispectrum
===================

A slightly more complicated example is the one-loop bispectrum. In
perturbation theory there are four different diagrams that contribute
and their sum can be schematically written like
B\_[1-loop]{}(\_1,\_2,\_3,) =
D\^4()\[B\_[222]{}+B\_[321]{}\^I+B\_[321]{}\^[II]{}+B\_[411]{}\]. As
usual, from translational invariance it follows that
$\k_1+\k_2+\k_3 = 0$. The individual terms in square brackets are given
by $$\begin{aligned}
B_{222} = 8 \int_{\q} F_2 (\q,\k_1-\q) & F_2(\k_1-\q,\k_2+\q) F_2(\k_2+\q,-\q) \nonumber \\
& \times P_{\rm lin}(q) P_{\rm lin}(|\k_1-\q|) P_{\rm lin}(|\k_2+\q|) \;,\end{aligned}$$
B\_[321]{}\^I = 6 P\_[lin]{}(k\_1) \_ F\_3(,\_2+,-\_1) F\_2(,\_2+)
P\_[lin]{}(q) P\_[lin]{}(|\_2+|) + 5 ,

B\_[321]{}\^[II]{} = F\_2(\_1,\_2) P\_[lin]{}(k\_1) P\_[13]{}(k\_2) + 5
,

B\_[411]{} = 12 P\_[lin]{}(\_1) P\_[lin]{}(k\_2) \_ F\_4(,-,-\_1,-\_2)
P\_[lin]{}(q) + 2 . After expanding the kernels and decomposing linear
power spectra in power laws, all terms in the sums can be rewritten in
the following form \_ k\_1\^[3-2\_[123]{}]{}J(\_1,\_2,\_3;x,y) , where
$\nu_{123}=\nu_1+\nu_2+\nu_3$, $x\equiv k_3^2/k_1^2$ and
$y\equiv k_2^2/k_1^2$. As expected, the overall scaling of the integral
with momentum is fixed. Here we choose to express that scaling in terms
of $k_1$. The rest defines a function $J(\nu_1,\nu_2,\nu_3;x,y)$ which
depends only on the ratios $x$ and $y$. In the rest of this section we
present some relevant properties of this function and give explicit
expression suitable for numerical evaluation.

Symmetries of $J(\nu_1,\nu_2,\nu_3;x,y)$ and Recursion Relations
----------------------------------------------------------------

Even before we find an explicit formula for $J(\nu_1,\nu_2,\nu_3;x,y)$,
there are several relevant properties worth mentioning that can be
derived directly from its integral representation [@?]. For example,
shifting a momentum $\q$ in the following way $\q\to\k_1-\q$, we
immediately get J(\_1,\_2,\_3;x,y)=J(\_2,\_1,\_3;y,x) . If we do the
following change of variables $\q \to \q - \k_2$, it is easy to see that
J(\_1,\_2,\_3;x,y)=x\^[3/2-\_[123]{}]{} J(\_3,\_2,\_1;,) . These two
transformations are sufficient to generate identities involving all six
permutations of parameters $\nu_1$, $\nu_2$ and $\nu_3$. These are

J(\_1,\_2,\_3; x,y)=&J(\_2,\_1,\_3; y,x)\
=&x\^[3/2-\_[123]{}]{} J(\_3,\_2,\_1; ,)=x\^[3/2-\_[123]{}]{}
J(\_2,\_3,\_1; ,)\
=&y\^[3/2-\_[123]{}]{} J(\_3,\_1,\_2; ,)=y\^[3/2-\_[123]{}]{}
J(\_1,\_3,\_2; ,) .

An intuitive way to understand these symmetries is to realize that they
map three external momenta $\k_1$, $\k_2$ and $\k_3$ into each other,
preserving the shape of the triangle. The six equations then are nothing
but six possible permutations. From another point of view, even though
the physical range of parameters $x$ and $y$ is given by the triangle
inequality $\sqrt{x}+\sqrt{y}\geq 1$ and $|\sqrt{x}-\sqrt{y}|\leq 1$,
for evaluation of the bispectrum we can always restrict this range to
$x\leq y\leq 1$. This corresponds to the following ordering of momenta
$k_3\leq k_2\leq k_1$.

Add recursion relations.

Evaluation of $J(\nu_1,\nu_2,\nu_3;x,y)$
----------------------------------------

After making these general remarks based on the integral representation,
let us turn to the explicit expression for $J(\nu_1,\nu_2,\nu_3;x,y)$.
It is a well known result that this function can be written as a linear
combination of Appell $F_4$ functions [@davy]. However, these special
functions have series representations that are convergent only in the
unphysical range of parameters $\sqrt{x}+\sqrt{y}< 1$. In order to solve
this problem one has to do analytical continuation [@thesis]. This can
be done in several ways. Although all results are formally identical,
they are very different from the point of view of practical calculation.
In the appendix we derive a series representation of
$J(\nu_1,\nu_2, \nu_3 ;x,y)$ that is, to our knowledge, the most
optimized for numerical evaluation of the bispectrum. Here we report
only the final formula

$$\begin{aligned}
J(\nu_1,\nu_2, & \nu_3 ;x,y) = \frac{\sec(\pi\nu_{23})}{8\sqrt \pi \Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3) \Gamma(3-\nu_{123})}\nonumber \\
&\left[ x^{3/2-\nu_{23}} \sum_{n=0}^\infty  a_{n}(\nu_1,\nu_2,\nu_3)\cdot\; x^{n}\;_2F_1\left(\nu_1+n, \tfrac 32-\nu_2+n, 3-\nu_{23}+2n, 1-y \right) \right. \nonumber \\
& \left. -y^{3/2-\nu_{13}} \sum_{n=0}^\infty a_{n}(\tilde\nu_1,\tilde\nu_2,\tilde\nu_3)\cdot\; x^{n}\;_2F_1\left(\tilde\nu_1+n, \tfrac 32-\tilde\nu_2+n, 3-\tilde\nu_{23}+2n, 1-y \right) \right] \;,\end{aligned}$$

where a\_[n]{}= , and $\tilde\nu \equiv \tfrac32-\nu$. The functions
${}_2F_1(\ldots,1-y)$ that appear in the result are standard Gauss
hypergeometric functions. We review their definition and some important
properties in Appendix.

Written in this form the result reveals another symmetry property of the
one-loop bispectrum. The two sums in are dual to each other in the sense
that their arguments satisfy $\nu \leftrightarrow \tfrac32-\nu$.
[(MS:See the discussion of symmetries for the two-loop power
spectrum.)]{} This can be used to avoid calculating both sums. For
example, if the bias is chosen appropriately, then the sums are complex
conjugate of each other.

Let us make some comments about expression . The first thing to notice
is that the series is always convergent if we restrict ourselves to the
region $x\leq y\leq 1$ (see figure). The minimal allowed value of $1-y$
in the given region is $\tfrac34$, which corresponds to folded
triangles. The smaller $1-y$ is, the easier it gets to calculate the
hypergeometric functions using their power series representation. For
higher values of $y$ and smaller values of $x$ the convergence is very
fast. In the limit $x\to 0$ and $y\to 1$ which corresponds to squeezed
triangles only a few terms have to be kept in the sum. The slowest
convergence is for high values of $x$. The limiting case is $x=1$ and
$y=1$, which corresponds to equilateral triangles. Even in this case a
relatively small number of terms, $\mathcal O(20)$, should be kept in
the sum to reach satisfactory precision.

Another important point to keep in mind is that dependences on $x$ and
$y$ are explicitly separated in our formula. Furthermore, the
$x$-dependence is trivial. This means that in practice, for a given $y$,
it is very easy to do the calculations for any $k_1$ and $x$, evaluating
the hypergeometric functions only once. This can speed up the full
bispectrum code significantly. On top of this, the hypergeometric
functions have many non-trivial properties that can be used to further
simplify the calculation. One such thing are recursion relations. For
example, one can show that \cite{} \_2F\_1 = Using some of these tricks,
the time needed to evaluate a single function $J$ is similar as for any
other elementary function.

In some special cases where the formula above simplifies. For example,
for the case of isosceles triangles $y=1$ and the hypergeometric
functions are equal to one and the result is symmetric in $\nu_2$ and
$\nu_3$. [MS: Write the explicit formula.]{}

Finally, let us point out that if one of the parameters in a negative
integer or zero, the sum in truncates. To see this explicitly, let us
imagine that $\nu_1=-N$, where $N\geq0$ is a non-negative integer. In
the limit $\nu_1\to-N$, $1/\Gamma(\nu_1)$ in the normalization goes to
zero. If there were no terms in the sum which diverge in the same limit,
the result would be zero. The hypergeometric functions are always
regular. Therefore, we have to look at the coefficients. By inspection
we see that all $a_n(\tilde\nu_1,\tilde\nu_2,\tilde\nu_3)$ coefficients
are regular as well. The only divergence comes from $\Gamma(\nu_1+n)$ in
the coefficient $a_n(\nu_1,\nu_2,\nu_3)$ as long as $n\leq N$. Given
that = (-1)\^n , we can rewrite the final answer in the following way
$$\begin{aligned}
J(-N,\nu_2, & \nu_3 ;x,y) = (-1)^{N+1} \frac{\sqrt \pi \sec(\pi\nu_{23})\sec(\pi\nu_3)}{8 \Gamma(\nu_2) \Gamma(\nu_3) \Gamma(3+N-\nu_{23})} \nonumber \\
& \sum_{n=0}^N \sum_{m=0}^{N-n} \frac{N!\;(-1)^{m+n} }{(N-m-n)!} \frac{\Gamma(\tfrac 32-\nu_2+n+m)}{\Gamma \left(\frac 52-\nu_{23}+ n\right)\Gamma(\nu_{3} - N -\tfrac 12+m)} \frac{x^{3/2-\nu_{23}+n}}{n!} \frac{y^m}{m!} \;. \end{aligned}$$

Numerical Evaluation
--------------------

Ranges of biases. B222. Full B in equilateral and generic configuration.

Two-loop power spectrum
=======================

Now we can turn to the most complicated case of the two-loop power
spectrum. There are four different contributions at this order in
perturbation theory P\_[2-loop]{}(k,) = D\^4()\[P\_[33]{}\^[I]{}(k) +
P\_[33]{}\^[II]{}(k) + P\_[42]{}(k) + P\_[51]{}(k) \] . The explicit
form of the four terms in the square brackets is P\_[33]{}\^[I]{} (k) =
9P\_[lin]{}(k) \_ F\_3(,,-) P\_[lin]{}(q) \_ F\_3(-, , -) P\_[lin]{}(p)
, P\_[33]{}\^[II]{} (k) = 6 \_ \_ F\_3(,,--) F\_3(-,-,+-) P\_[lin]{}(q)
P\_[lin]{}(p) P\_[lin]{}(|--|) , P\_[42]{} (k) = 24 \_ \_ F\_2(, -)
F\_4(,-,-,-) P\_[lin]{}(q) P\_[lin]{}(p) P\_[lin]{}(|-|) , P\_[51]{} (k)
= 30 P\_[lin]{}(k) \_ \_ F\_5(,,-,,-) P\_[lin]{}(q) P\_[lin]{}(p) . In
the first contribution, $P_{33}^{I} (k)$, two integrals have the same
structure as the $P_{31}(k)$ part of the one-loop calculation. In other
cases the integrals are not separable. After expanding in power laws,
all terms in the sum can be written in the following form
$$\begin{aligned}
\int_{\q} \frac{1}{q^{2\nu_4} |\k - \q|^{2\nu_5}} \int_{\p} \frac{1}{p^{2\nu_1}  |\k - \p|^{2\nu_2} |\q - \p|^{2\nu_3} } \equiv k^{6-2\nu_{12345}} K(\nu_1,\ldots,\nu_5) \;.\end{aligned}$$
Notice that the second integral has identical structure as the one-loop
bispectrum. Therefore, choosing the following change of coordinates
$x=|\k-\q|^2/k^2$ and $y=q^2/k^2$, the function $K(\nu_1,\ldots,\nu_5)$
that we are ultimately interested in can be written as follows
K(\_1,…,\_5) = \_[x,y]{} x\^[-\_5]{} y\^[-\_4]{} J(\_1,\_2,\_3,x,y) .
The region of integration is rather complicated:
$\sqrt{x}+\sqrt{y}\geq 1$ and $|\sqrt{x}-\sqrt{y}|\leq 1$. This reflects
the constraints that physical momenta in the two-loop diagram have to
satisfy. In the remainder of this section we derive explicit expression
for function $K(\nu_1,\ldots,\nu_5)$ and discuss its properties.

Symmetries of $K(\nu_1,\ldots,\nu_5)$ and Recursion Relations
-------------------------------------------------------------

The two-loop diagram is known to have a lot of symmetries which
translates to many symmetries of the function $K(\nu_1,\ldots,\nu_5)$.
We review here some of the relevant results. To derive them it is enough
to use the integral representation $$\begin{aligned}
K(\nu_1,\ldots,\nu_5) = \frac1{k^{6-2\nu_{12345}} } \int_{\q} \frac{1}{q^{2\nu_4} |\k - \q|^{2\nu_5}} \int_{\p} \frac{1}{p^{2\nu_1}  |\k - \p|^{2\nu_2} |\q - \p|^{2\nu_3} }  \;.\end{aligned}$$
Two obvious symmetries are the following. First, exchanging integration
variables $\q$ and $\p$ leads to
$(\nu_1,\nu_2) \leftrightarrow (\nu_4,\nu_5)$, leaving $\nu_3$ in the
same position K(\_1, \_2, \_3, \_4, \_5) = K(\_4, \_5, \_3, \_1, \_2) .
Second, we can simultaneously shift both momenta $\q\to\k-\q$ and
$\p\to\k-\p$. Effectively, this produces the simultaneous exchange
$(\nu_1 \leftrightarrow \nu_2)$ and $(\nu_4 \leftrightarrow \nu_5)$
K(\_1, \_2, \_3, \_4, \_5) = K(\_2, \_1, \_3, \_5, \_4) . Slightly less
obvious symmetries can be derived using properties of
$J(\nu_1,\nu_2,\nu_3;x,y)$ that we have discussed in the previous
section. Plugging the transformations into the integral representation ,
it is straightforward to get the following two extra identities K(\_1,
\_2, \_3, \_4, \_5) = K(\_3,\_1,\_2, \_5, \_6) , K(\_1, \_2, \_3, \_4,
\_5) = K(\_3,\_2,\_1, \_4, \_6) . Transformations to actually form the
symmetric group of degree four $S_4$. This group has $4!=24$ different
elements. It is very easy to recover all these elements starting from
$K(\nu_1, \nu_2, \nu_3, \nu_4, \nu_5)$ and successively applying
identities to . If we use a shorten notation
$(1,2,3,4,5)\equiv K(\nu_1,\ldots,\nu_5)$, then 24 functions that are
all equal to each other are $$\begin{aligned}
& (1,2,3,4,5) \qquad (2,1,3,5,4) \qquad (4,5,3,1,2) \qquad (5,4,3,2,1) \nonumber\\
& (3,1,2,5,6) \qquad (1,3,2,6,5) \qquad (5,6,2,3,1) \qquad (6,5,2,1,3) \nonumber\\
& (3,2,1,4,6) \qquad (2,3,1,6,4) \qquad (4,6,1,3,2) \qquad (6,4,1,2,3) \nonumber\\
& (3,5,4,1,6) \qquad (5,3,4,6,1) \qquad (1,6,4,3,5) \qquad (6,1,4,5,3) \nonumber\\
& (3,4,5,2,6) \qquad (4,3,5,6,2) \qquad (2,6,5,3,4) \qquad (6,2,5,4,3) \nonumber\\
& (5,2,6,4,1) \qquad (2,5,6,1,4) \qquad (4,1,6,5,2) \qquad (1,4,6,2,5) \;.\end{aligned}$$

However, this is not all. It was shown in [@?] that the full symmetry
group of the two-loop diagram is $Z_2\times S_6$, which is significantly
larger. This group has $2\times 6! =1440$ elements. Without entering the
detailed derivation, let us just say that the extra symmetry comes from
the following duality of real and momentum space 1[q\^[2]{}]{} =
\^[-3/2]{} 2\^[-2]{} d\^3x 1[x\^[3-2]{}]{} e\^[-i]{} . Integrating
expression over $\k$ and using previous identity, one ends up with the
real space integrals that have the same structure as the original
momentum integral but shifted parameters. We refer the interested reader
to [@?] and references therein.

Add all recursion relations.

Evaluation of $K(\nu_1,\ldots,\nu_5)$
-------------------------------------

Even though we have at most three power spectra in the loop integrals,
due to complexity of the kernels we end up with five different
“propagators". This implies that at least two of
$\{\nu_1\ldots, \nu_5 \}$ are integers which come from expansion of
kernels. There are two different situations that we meet in practice.

[*One of integer parameters is zero or negative.—*]{}The simplest case
is when one of integer $\nu$s is zero. The integral becomes a product of
two one-loop expressions and the result is expressed in terms of gamma
functions. For example, let us imagine that $\nu_1=0$. It follows
$$\begin{aligned}
& K(0,\nu_2,\ldots,\nu_5) = k^{-6+2\nu_{2345}} \int_{\q} \frac{1}{q^{2\nu_4} |\k - \q|^{2\nu_5} } \int_{\p} \frac{1}{|\k - \p|^{2\nu_2} |\q - \p|^{2\nu_3} } \nonumber \\
& \quad =  k^{-6+2\nu_{2345}} I(\nu_2,\nu_3) \int_{\q} \frac{ |\k-\q|^{3 - 2 \nu_{23}}}{q^{2\nu_4} |\k - \q|^{2\nu_5} } =  I(\nu_2,\nu_3)  I(\nu_4,\nu_{235}-\tfrac32) \;.\end{aligned}$$
The next simplest case is when none of $\nu$s is zero, but one of them
is a negative integer. Let us imagine that $\nu_1=-N$, where $N>0$. As
we saw in , in this case the expansion of $J$ truncates. The integral
can be again expressed in terms of gamma functions only. It is
straightforward to get $$\begin{aligned}
& K(-N,\nu_2, \nu_3,\nu_4,\nu_5) = (-1)^{N+1} \frac{\sqrt \pi \sec(\pi\nu_{23})\sec(\pi\nu_3)}{8 \Gamma(\nu_2) \Gamma(\nu_3) \Gamma(3+N-\nu_{23})} \sum_{n=0}^N \sum_{m=0}^{N-n}  \nonumber \\
& \qquad \frac{N!\;(-1)^{m+n} }{(N-m-n)!\,n!\,m!} \frac{\Gamma(\tfrac 32-\nu_2+n+m)}{\Gamma \left(\frac 52-\nu_{23}+ n\right)\Gamma(\nu_{3} - N -\tfrac 12+m)} \, I(\nu_4-m, \nu_{235}-\tfrac32-n) \;. \end{aligned}$$
In practice, the sums always have at most a few terms. For all diagrams
of interest $N\leq3$. Notice that for $N=0$ this expression boils down
to . The cases in which other parameters are non-positive integers can
be easily evaluated using symmetries of $K$ that we discuss below (see
).

[*Both integer parameters are positive.—*]{}Finally, we are left with an
option in which all integer $\nu$s are positive. For the two-lop
integral the only case of this kind is when two $\nu$s are equal to one.
This comes from the fact that we can have at most two inverse laplacians
in perturbation theory kernels at this order in perturbation theory. In
all two-loop diagrams it turns out that the only relevant case is
$\nu_1=\nu_5=1$. As we will see this leads to certain simplifications in
evaluation of $K$. However, for the time being, we keep all parameters
to be arbitrary complex numbers.

In order to solve the integral , we will use the power series
representation of $J(\nu_1,\nu_2,\nu_3,x,y)$ that we found in the
previous section. The details of derivation are given in Appendix. We
find that the final result can be written in the following way
$$\begin{aligned}
K(\nu_1,\ldots,\nu_5) = & \frac{1}{16\pi^2} \Big( \kappa(\nu_1,\nu_2,\nu_3,\nu_4,\nu_5) +  \kappa(\nu_1,\nu_3,\nu_2, \nu_6, \nu_5) + \kappa(\nu_2,\nu_3,\nu_1, \nu_6 ,\nu_4) \Big) \;.\end{aligned}$$
where we have defined $\nu_6 \equiv \tfrac 92 -\nu_{12345}$. Three
different terms reflect the fact that we had to split the domain of
integration into three different regions and use symmetries of $J$ to
map them into each other. The basic integral is an infinite sum
$$\begin{aligned}
\kappa(\nu_1,\nu_2,\nu_3,\nu_4,\nu_5)  = & \frac{\sec(\pi\nu_{23})}{128\pi^{5/2} \Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3) \Gamma(3-\nu_{123})}  \nonumber \\
& \times \sum_{n=0}^\infty \left[ a_{n} \; \tau \left( \tfrac 32-\nu_{235}+n ,-\nu_4, \nu_1+n , \tfrac 32-\nu_2+n, 3-\nu_{23}+2n \right) \right. \nonumber \\
& \qquad \qquad \left. -  b_{n} \;\tau \left(-\nu_5+n,\tfrac 32-\nu_{134}, \nu_2+n, \tfrac 32 -\nu_{1}+n, \nu_{23}+2n \right) \right] \;,\end{aligned}$$
where $$\begin{aligned}
\tau (\alpha,\beta,a,b,c) & = \frac{1}{1+\alpha} \left[ \frac{1}{1+\beta}\;_3F_2\left(\begin{array}{c}1,a,b; \\2+\beta,c ;\end{array}1\right) \right. - 2\cdot{}_4F_3\left(\begin{array}{c}a,b,1+\beta,\frac{3}{2}+\beta;
\\1-d ,\frac{5}{2}+\alpha +\beta,3+\alpha +\beta ;\end{array}1\right)
\nonumber \\
& \quad \left. -2\cdot{}_4F_3\left(\begin{array}{c} c-a,c-b,1+\beta+d,\frac32+\beta+d;
\\1+d,d+\alpha +\beta+\frac{5}{2},3+\alpha +\beta +d;\end{array}1\right) \right] \;,\end{aligned}$$
and $d\equiv c-a-b$.

The expression above is very complicated and not very illuminating.

Numerical Evaluation — A Toy Example
------------------------------------

Conclusions
===========

Acknowledgments {#acknowledgments .unnumbered}
===============

We would like to thank Valentin Assassi, Diego Blas, Paolo Creminelli,
Guido D’Amico, Lam Hui, Mikhail Ivanov, Marcel Schmittfull, Sergey
Sibiryakov, Kris Sigurdson and Gabriele Trevisan for many useful
discussions.

\[app:kernels\]Perturbation Theory Kernels
==========================================

\[app:Hyper\]Hypergeometric Functions
=====================================

\[app:J\]Derivation of $J(\nu_1,\nu_2, \nu_3 ;x,y)$
===================================================

Let us begin with the usual Feynman parametrization $$\begin{aligned}
&\int_{\q} \frac{1}{q^{2\nu_1}|\k_1-\q|^{2\nu_2} |\k_2+\q|^{2\nu_3} } =\frac{\Gamma(\nu_{123})}{\Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3)} \nonumber \\
& \quad \times \int_0^1 du_1 \int_0^1 du_2 \int_0^1 du_3 \int_{\q} \; \frac{u_1^{\nu_1-1}u_2^{\nu_2-1}u_3^{\nu_3-1}\delta^\text{(D)}(1-u_1-u_2-u_3)}{\left(u_1q^2 +u_2|\k_1-\q|^2 + u_3 |\k_2+\q|^2 \right)^{\nu_{123}}} \nonumber \\
& = \frac{\Gamma(\nu_{123})}{\Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3)}  \int_0^1 du_1 \int_0^{1-u_1} du_2 \int_{\q} \;\frac{u_1^{\nu_1-1}u_2^{\nu_2-1}(1-u_1-u_2)^{\nu_3-1}}{\left(u_1q^2 +u_2|\k_1-\q|^2 + (1-u_1-u_2) |\k_2+\q|^2 \right)^{\nu_{123}}} \;.\end{aligned}$$
Next, let us do the following change of variables: $u_1=uv$ and
$u_2=(1-u)v$. This transforms $(1-u_1-u_2)$ into $v$ and now both
integrals in $u$ and $v$ have the same boundaries $[0,1]$
$$\begin{aligned}
& \int_{\q} \frac{1}{q^{2\nu_1}|\k_1-\q|^{2\nu_2} |\k_2+\q|^{2\nu_3} } = \frac{\Gamma(\nu_{123})}{\Gamma(\nu_1)\Gamma(\nu_2)\Gamma(\nu_3)} \nonumber \\
& \qquad\qquad \times \int_{0}^1 du \int_0^1 dv \int_{\q} \;\frac{u^{\nu_1-1}(1-u)^{\nu_2-1}v^{\nu_{12}-1}(1-v)^{\nu_3-1}}{\left( uvq^2 +(1-u)v|\k_1-\q|^2 +(1-v)|\k_2+\q|^2 \right)^{\nu_{123}}} \;.\end{aligned}$$
At this point the momentum integral can be done easily. In the
denominator we first complete the square $$\begin{aligned}
& uvq^2 +(1-u)v|\k_1-\q|^2 +(1-v)|\k_2+\q|^2 \nonumber \\
& \quad = \left( \q - (1-u) v\k_1 + (1-v)\k_2 \right)^2 + v \left( u v (1-u) k_1^2 + u(1-v)k_2^2 + (1-u) (1-v) k_3^2  \right) \;,\end{aligned}$$
and use the following identity to do the integral in $\q$ \_ =
1[8\^[3/2]{}]{} 1[(m\^2)\^[\_[123]{}-3/2]{}]{} . The expression for
one-loop bispectrum simplifies and we are left with two integrals in $u$
and $v$ $$\begin{aligned}
& \int_{\q} \frac{1}{q^{2\nu_1}|\k_1-\q|^{2\nu_2} |\k_2+\q|^{2\nu_3} } = \frac{k_1^{3-2\nu_{123}}}{8\pi^{3/2}} \frac{\Gamma\left( \nu_{123}-\frac32 \right)}{\Gamma(\nu_1)\Gamma(\nu_2)\Gamma(\nu_3)}  \nonumber \\
& \qquad\qquad \times \int_{0}^1 du \int_0^1 dv \frac{u^{\nu_1-1}(1-u)^{\nu_2-1}v^{1/2-\nu_3}(1-v)^{\nu_3-1}}{\left( u v (1-u) + u(1-v) y + (1-u) (1-v) x \right)^{\nu_{123}-3/2}} \;,\end{aligned}$$
from which we can read off $J(\nu_1,\nu_2, \nu_3 ;x,y)$
$$\begin{aligned}
J(\nu_1,\nu_2, \nu_3 ;x,y) & = \frac{1}{8\pi^{3/2}} \frac{\Gamma\left(\nu_{123}-\frac32 \right)}{\Gamma(\nu_1)\Gamma(\nu_2)\Gamma(\nu_3)} \nonumber \\
& \quad \times \int_{0}^1 du \int_0^1 dv \frac{u^{\nu_1-1}(1-u)^{\nu_2-1}v^{1/2-\nu_3}(1-v)^{\nu_3-1}}{\left( u v (1-u) + u(1-v) y + (1-u) (1-v) x \right)^{\nu_{123}-3/2}} \;.\end{aligned}$$
Notice that the denominator is linear in $v$ and that the integral in
$v$ is nothing but the hypergeometric function $$\begin{aligned}
&J(\nu_1,\nu_2,\nu_3 ;x,y) = \frac{\Gamma\left(\frac32-\nu_3\right) \Gamma \left( \nu_{123}-\frac32 \right)} {4\pi^2\Gamma(\nu_1) \Gamma(\nu_2)} \int_0^1 du\;u^{\nu_1-1}(1-u)^{\nu_2-1} \nonumber \\
&\quad \times (x(1-u)+y u)^{3/2-\nu_{123}}\;_2F_1\left(\frac 32 - \nu_3, \nu_{123}-\frac 32, \frac 32, 1- \frac{u(1-u)}{x(1-u)+y u}\right) \;.\end{aligned}$$
At this point it is useful to transform this expression such that the
argument of the hypergeometric function changes from $(1-z)$ to $z$.
$$\begin{aligned}
&J(\nu_1,\nu_2,\nu_3;x,y) = \frac{\Gamma\left(\frac32-\nu_3\right) \Gamma \left( \nu_{123}-\frac32 \right)} {4\pi^2\Gamma(\nu_1) \Gamma(\nu_2)}  \int_0^1 du\; u^{\nu_1-1}(1-u)^{\nu_2-1}(x(1-u)+y u)^{3/2-\nu_{123}} \nonumber \\
& \quad \left[ \frac{\Gamma\left( \frac32 \right) \Gamma\left(\nu_{12}-\frac32 \right)}{\Gamma\left( \frac32-\nu_3 \right) \Gamma\left( \nu_{123}-\frac 32 \right)} \frac{u^{3/2-\nu_{12}}(1-u)^{3/2-\nu_{12}}}{(x(1-u)+y u)^{3/2-\nu_{12}}} \;_2F_1\left(\nu_3, 3-\nu_{123}, \frac 52-\nu_{12}, \frac{u(1-u)}{x(1-u)+y u}\right) \right. \nonumber \\
& \quad \left. + \frac{\Gamma\left( \frac32 \right) \Gamma\left( \frac32- \nu_{12} \right)}{\Gamma(\nu_3)\Gamma(3-\nu_{123})} \;_2F_1\left(\frac 32 - \nu_3, \nu_{123}-\frac 32, \nu_{12}- \frac 12, \frac{u(1-u)}{x(1-u)+y u}\right)\right] \;.\end{aligned}$$
The reason is that $0\leq u(1-u)/(x(1-u)+y u)\leq1$ for any $x$ and $y$,
and one can use the power series representation of hypergeometric
functions in order to solve the integral in $u$. \_2F\_1(a,b,c,z)=
\_[n=0]{}\^ z\^n . Note that this power series keeps the integral the
simplest possible, because only powers or $u$, $(1-u)$ and
$(x(1-u)+y u)$ appear in the expression. Simplifying the gamma functions
we get $$\begin{aligned}
J(\nu_1,\nu_2,& \nu_3;x,y) = \frac{\sec(\pi\nu_{12})} {8\sqrt\pi \Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3)\Gamma(3-\nu_{123}) }  \nonumber \\
& \quad \left[ \sum_{n=0}^\infty \frac{\Gamma(\nu_3+n) \Gamma(3-\nu_{123}+n)}{\Gamma\left(\frac 52-\nu_{12}+n \right)n!} \int_0^1 du\; \frac{u^{1/2-\nu_{2}+n}(1-u)^{1/2-\nu_{1}+n}}{(x(1-u)+y u)^{\nu_{3}+n}} \right. \nonumber \\
& \quad \left. - \sum_{n=0}^\infty  \frac{\Gamma\left(\frac 32 - \nu_3+n \right) \Gamma\left( \nu_{123}-\frac 32+n\right)}{\Gamma\left( \nu_{12}- \frac 12+n \right)n!} \int_0^1 du\; \frac{u^{\nu_1-1+n}(1-u)^{\nu_2-1+n}}{(x(1-u)+y u)^{\nu_{123}-3/2+n}}   \right] \;.\end{aligned}$$
The integration in $u$ leads to another hypergeometric function. The
result can be written in the following way $$\begin{aligned}
J(\nu_1,\nu_2,\nu_3 &;x,y) = \frac{\sec(\pi\nu_{12})} {8\sqrt\pi\Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3)\Gamma(3-\nu_{123}) }  \nonumber \\
& \; \left[ \sum_{n=0}^\infty a_n\cdot x^{-\nu_3-n} \;_2F_1\left(\frac 32 - \nu_2+n, \nu_{3}+n, 3-\nu_{12}+2n, 1-\frac yx \right) \right. \nonumber \\
& \quad \left. - \sum_{n=0}^\infty b_n\cdot  x^{-\nu_{2}-n} y^{3/2-\nu_{13}} \;_2F_1\left(\frac32-\nu_3+n, \nu_2+n, \nu_{12}+2n, 1-\frac yx \right)  \right] \;,\end{aligned}$$
where the coefficient $a_n$ and $b_n$ are given by a\_n = , b\_n = . One
last step is to use the following identity
J(\_1,\_2,\_3;x,y)=x\^[3/2-\_[123]{}]{} J(\_3,\_2,\_1;, ), in order to
bring the result to its final form $$\begin{aligned}
J(\nu_1,\nu_2, & \nu_3;x,y) = \frac{\sec(\pi\nu_{23})}{8\sqrt \pi \Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3) \Gamma(3-\nu_{123})}\nonumber \\
&\sum_{n=0}^\infty  \left[ x^{3/2-\nu_{23}} \cdot a_{n} \; x^{n}\;_2F_1\left(\nu_1+n, \frac 32-\nu_2+n, 3-\nu_{23}+2n, 1-y \right) \right. \nonumber \\
& \quad \left. -y^{3/2-\nu_{13}} \cdot b_{n} \; x^{n}\;_2F_1\left(  \nu_2+n, \frac 32 -\nu_{1}+n, \nu_{23}+2n, 1-y  \right) \right] \;,\end{aligned}$$
where in $a_n$ and $b_n$ one has to permute $\nu_1$ and $\nu_3$. This
precisely matches equation .

\[app:2-loop\]Derivation of $K(\nu_1,\ldots,\nu_5)$
===================================================

Let us first calculate \_[12345]{} \_[D\_1]{} x\^[-\_5]{} y\^[-\_4]{}
J(\_1,\_2,\_3,x,y) , D\_1 ={ (x,y) | +1, x1, y1 } . We are going to use
$$\begin{aligned}
\kappa_{12345} & = \frac{\sec(\pi\nu_{23})}{128\pi^{5/2} \Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3) \Gamma(3-\nu_{123})} \sum_{n=0}^\infty \int_0^1dy\int_{(1-\sqrt{y})^2}^1 d x  \nonumber \\
& \left[ x^{3/2-\nu_{235}+n}y^{-\nu_4} \cdot a_{n}\;_2F_1\left(\nu_1+n, \frac 32-\nu_2+n, 3-\nu_{23}+2n, 1-y \right) \right. \nonumber \\
& \quad \left. -x^{-\nu_5+n}y^{3/2-\nu_{134}} \cdot b_{n} \;_2F_1\left(  \nu_2+n, \frac 32 -\nu_{1}+n, \nu_{23}+2n, 1-y  \right) \right] \;.\end{aligned}$$
For simplicity, let us define $$\begin{aligned}
& \tau(\alpha,\beta,a,b,c) \equiv \int_0^1 dy \int_{(1-\sqrt{y})^2}^1 d x\; x^\alpha y^\beta \;_2F_1(a,b,c,1-y) \;.\end{aligned}$$
Note that (,,a,b,c) = (,+c-a-b,c-a,c-b,c)

The integral in $x$ is straightforward, leading to $$\begin{aligned}
\tau(\alpha,\beta,a,b,c) & = \frac{1}{1+\alpha} \left[\int_0^1 dy \; y^\beta \;_2F_1(a,b,c,1-y) \right. \nonumber \\
& \quad \left. - 2 \int_0^1 dt \; t^{2\beta+1} (1-t)^{2+2\alpha} \;_2F_1(a,b,c,1-t^2) \right] \;,\end{aligned}$$
where in the second integral we did a change of variables $y=t^2$. Both
integrals can be expressed in terms of higher order hypergeometric
functions. It is not difficult to find $$\begin{aligned}
\tau (\alpha,\beta,a,b,c) & = \frac{1}{1+\alpha} \left[ \frac{1}{1+\beta}\;_3F_2\left(\begin{array}{c}1,a,b; \\2+\beta,c ;\end{array}1\right) \right. - 2\cdot{}_4F_3\left(\begin{array}{c}a,b,1+\beta,\frac{3}{2}+\beta;
\\1-d ,\frac{5}{2}+\alpha +\beta,3+\alpha +\beta ;\end{array}1\right)
\nonumber \\
& \left. -2\cdot{}_4F_3\left(\begin{array}{c} c-a,c-b,1+\beta+d,\frac32+\beta+d;
\\1+d,d+\alpha +\beta+\frac{5}{2},3+\alpha +\beta +d;\end{array}1\right) \right] \;,\end{aligned}$$
where $d=c-a-b$.

The final answer is $$\begin{aligned}
\kappa_{12345}  = & \frac{\sec(\pi\nu_{23})}{128\pi^{5/2} \Gamma(\nu_1) \Gamma(\nu_2) \Gamma(\nu_3) \Gamma(3-\nu_{123})}  \nonumber \\
& \times \left[\sum_{n=0}^\infty a_{n} \; \tau \left( \tfrac 32-\nu_{235}+n ,-\nu_4, \nu_1+n , \tfrac 32-\nu_2+n, 3-\nu_{23}+2n \right) \right. \nonumber \\
& \quad  \left. - \sum_{n=0}^\infty b_{n} \;\tau \left(-\nu_5+n,\tfrac 32-\nu_{134}, \nu_2+n, \tfrac 32 -\nu_{1}+n, \nu_{23}+2n \right) \right] \;.\end{aligned}$$

It might look that $\tau$ diverges for $\alpha=-1$ or $\beta=-1$.
However in this limit divergent parts of the two terms in square
brackets exactly cancel. We can see this explicitly using different
result for $\tau$ (,,a,b,c) = -\_[n=1]{}\^ \_3F\_2(1,a,b;c,2++n/2;1) .
For $\alpha=-1$ the explicit formula is (-1,,a,b,c) = \_[n=1]{}\^
\_3F\_2(1,a,b;c,2++n/2;1) . For $\beta=-1$ the explicit formula is [This
is divergent sometimes.]{} (,-1,a,b,c) = -\_[n=1]{}\^
\_3F\_2(1,a,b;c,1+n/2;1) . For both $\alpha=\beta=-1$ we get
(-1,-1,a,b,c) = \_[n=1]{}\^ \_3F\_2(1,a,b;c,1+n/2;1) . Comment on the
convergence.

Note that $\tau$ satisfies the following recursion relation (, , a, b,
c) = (, , a - 1, b, c) + (, - 1, a - 1, b, c) + (, - 1, a - 2, b, c).
Similar relations can be found based on the recursion relations
of$\;_2F_1$.

[^1]: More precisely, the theory has to be in three dimensions with the
    Euclidian signature.

[^2]: As we will discuss, it is possible to compute $P_{22}$ part of the
    one-loop diagram using the power law decomposition of the linear
    power spectrum. For $-1<\nu<1/2$ the loop integral in $P_{22}$ is
    convergent.
