---
title: "Notes on Lemma 4.1 from ''Computational Quantum Entanglement paper''"
excerpt: "Wrappng my head around the proof"
categories: [quantum computing, computational quantum entanglement]
tags: [proving things]
classes: wide
---

Below are my notes on the proof of Lemma 4.1 from the paper [Computational Quantum Entanglement](https://arxiv.org/abs/2310.02783). My approach is to take the proof apart and try to understand each step. I will try to explain the concepts in a way that is understandable for me. Each part will be taken as a $\textit{claim}$ and I will try to convince myself why it is true.

## Proof overview


## Claim 1: For $n$-qubits unitaries $U$ and $V$, and $\lvert \phi^n \rangle$ the tensor product of $n$ EPR pairs, the states $(I \otimes U)\lvert \phi^n \rangle$ and $(I \otimes V)\lvert \phi^n \rangle$ are both maximally entangled.

If you are into quantum computing already, this is true because $\lvert \phi^n \rangle$ is maximally entangled (by definition of EPR pair) and
we cannot "change" entanglement by using local operations -- and those what $(I \otimes V)$ are. We apply each _same_ unitary to each EPR pair. 

I personally prefer more mathematical oriented proofs.

To show that state $(I \otimes U)\lvert \phi^n \rangle$ is maximally entangled, we need to show that reduced density operator for subysystem will not change.

First, let us consider an EPR pair - $\frac{1}{\sqrt{2}}(\lvert 00 \rangle + \lvert 11 \rangle)$. What is important to recall that this
is just a shorthand for writing $\frac{1}{\sqrt{2}}(\lvert 0\rangle_{A} \otimes \lvert 0 \rangle_{B} + \lvert 1 \rangle_{A} \otimes \lvert 1 \rangle_{B})$.
Next, $\lvert \phi^n \rangle$ is _actually_ $\bigotimes_{1}^{n} \lvert \phi \rangle$. Last property that we need to leverage here is called mixed-product property and it applies to tensor (kronecker product): $(A \otimes B)(C \otimes D) = AC \otimes BD$ (if dimensions "agree").  

Before we go further let's recall dimensions of used entities. $\lvert \phi \rangle$ has dimensions of $4 = 2^2 \times 1$, so  $\lvert \phi^n \rangle$ will have dimension of  $2^{2n} \times 1$. $U$ (and $V$) is an $n$-qubit unitary, so it will be $2^n \times 2^n$. So for statement $(I \otimes U)\lvert \phi^n \rangle$ to make sense $I$ needs also be a $2^n \times 2^n$ matrix.

Let us combine all of that and end up with (over)simplified statement

$$
(I \otimes U)\lvert \phi^n \rangle = (I \otimes U) \frac{1}{\sqrt{2}}^n(\sum(\lvert \alpha \rangle_A \otimes \lvert \beta \rangle_B))
$$

$\sum(\lvert \alpha \rangle_A \otimes \lvert \beta \rangle_B)$ -- this represents a sum of all combinations that we will get from tensor-multiplying.
What is important that both (or maybe _each_) $\lvert \alpha \rangle_A$ and $\lvert \beta \rangle_B$ describe $n$-qubit system. This is why - by mixed product property we can write:

$$
(I \otimes U) \frac{1}{\sqrt{2}}^n(\sum(\lvert \alpha \rangle_A \otimes \lvert \beta \rangle_B)) = \frac{1}{\sqrt{2}}^n(\sum(I \lvert \alpha \rangle_A \otimes U \lvert \beta \rangle_B)) = \frac{1}{\sqrt{2}}^n(\sum(\lvert \alpha \rangle_A \otimes U \lvert \beta \rangle_B))
$$

That of course shows that subystem A is not affected by (I \otimes U), hence maximum entangled is retained. Of coruse exactly same reasoning can be used
for $V$.

## Claim 2: States $(I \otimes U)\lvert \phi^n \rangle$ and $(I \otimes V)\lvert \phi^n \rangle$ have fidelity $1- \frac{1}{2}\frac{1}{2^n}\lVert U - V \rVert^2_F$

To be more precise, we need to show that:

$$
\text{Re}( \langle \phi^n \rvert (I \otimes U^H)(I \otimes V)\rvert \phi^n \rangle) = 1 - \frac{1}{2}\frac{1}{2^n}\lVert U - V \rVert^2_F
$$

First, let us note that both $(I \otimes U)\lvert \phi^n \rangle$ and $(I \otimes V)\lvert \phi^n \rangle$ are _pure_ states -- we already described them as a single ket vector in proof of previous claim (it was a sum, but that is still a single ket vector). 

Trying to directly attack the issue via the definition of fidelity brought me nowhere, but you might now that fidelity and [trace distance](https://en.wikipedia.org/wiki/Trace_distance) as related. Fortunately, we have the following relationship ([source](https://en.wikipedia.org/wiki/Trace_distance#Fidelity)):

$$
T(\rho, \sigma) = \sqrt{1 - F(\rho, \sigma)^2} \\
$$

Okay, so that means that we want to show that:

$$
T(\rho, \sigma) = \frac{1}{2}\frac{1}{2^n}\lVert U - V \rVert^2_F
$$

Where $\rho$, $\sigma$ are density matrices of pure states.
Intuitively, it does make sense. We take _same_ pure state, apply two different unitaries to the _same_ state, hence it should be a function of distance _between those two unitaries_. Now let us define _trace distance_ $T$

$$
T(\rho, \sigma) = \frac{1}{2}\text{Tr}(\sqrt{(\rho-\sigma)^H(\rho-\sigma)}) 
$$

Now of course -- how we can prove that equality? I spent half a day with my limited mathematical skills and fell short, but fortunately I found [this paper](https://arxiv.org/pdf/1903.11738.pdf), from which equation 5 fell from the sky on my laps. For those sweet, sweet pure states we have:

$$
T(\rho, \sigma)^2 = \frac{1}{2}\lVert\rho-\sigma\rVert^2_F
$$

And that is something we can work with. First, let us simplify lefthand side:

$$
\lVert\rho-\sigma\rVert^2_F  = \text{Tr}((\rho - \sigma)^H(\rho-\sigma)) \\
= \text{Tr}(\rho^H\rho - \rho^H\sigma - \sigma^H\rho + \sigma^H\sigma) \\
= \text{Tr}(\rho - \rho^H\sigma - \sigma^H\rho + \sigma) \\
= \text{Tr}(\rho) +  \text{Tr}(\sigma) - \text{Tr}(\rho^H\sigma + \sigma^H\rho) \\
= 2 - \text{Tr}(\rho^H\sigma + \sigma^H\rho) \\
= 2 - \text{Tr}(\rho\sigma + \sigma\rho) \\
= 2 - \text{Tr}(\rho\sigma) + \text{Tr}(\sigma\rho) \\
= 2 - 2\text{Tr}(\rho\sigma) \\
= 2(1 - \text{Tr}(\rho\sigma))
$$

Now let's move to $\text{Tr}(\rho\sigma)$. 

$$
\text{Tr}(\rho\sigma) = \text{Tr}((I \otimes U)\lvert \phi^n \rangle \langle \phi^n \rvert (I \otimes U^H)(I \otimes V)\lvert \phi^n \rangle \langle \phi^n \rvert (I \otimes V^H)) \\
= \text{Tr}(\langle \phi^n \rvert(I \otimes V^H U)\lvert \phi^n \rangle \langle \phi^n \rvert (I \otimes U^HV)\lvert \phi^n \rangle)
$$

Now that is interesting, because both $\langle \phi^n \rvert(I \otimes V^H U)\lvert \phi^n \rangle$ and $\langle \phi^n \rvert (I \otimes U^HV)\lvert \phi^n \rangle$ are scalars, so we can drop the trace! But what is even _more_ interesting is how we can leverage Exercise 9.16 from Nielsen and Chuang (be sure to check errata), Let $\lvert i \rangle, \lvert j \rangle$ be orthonormal basis set, now define $\lvert m \rangle = \sum_{i}\lvert i \rangle, \lvert j \rangle$, we get:

$$
\text{Tr}(A^HB) = \langle m \rvert (A \otimes B) \lvert m \rangle
$$

Now, let us recall that we can write $\lvert \phi^n \rangle = \frac{1}{\sqrt{2}}^n \lvert \tilde{\phi} \rangle$, where $\lvert \tilde{\phi} \rangle$ meets the requirement above! Back to our trace calculations:

$$
\text{Tr}(\langle \phi^n \rvert(I \otimes V^H U)\lvert \phi^n \rangle \langle \phi^n \rvert (I \otimes U^HV)\lvert \phi^n \rangle) \\
= \langle \phi^n \rvert(I \otimes V^H U)\lvert \phi^n \rangle  \langle \phi^n \rvert (I \otimes U^HV)\lvert \phi^n \rangle = \\
= \frac{1}{2}^n\text{Tr}(V^HU)\frac{1}{2}^n\text{Tr}(U^HV)
$$

Now let us recall that by original claim we are interested in only the _real_ part, so we obtain:

$$
\text{Tr}(\rho\sigma) = ((\frac{1}{2})^n\text{Re}(\text{Tr}(U^HV)))^2
$$

Okay, now let us try to simplify $\frac{1}{2^n}\lVert U - V \rVert^2_F$

$$
\frac{1}{2^n}\lVert U - V \rVert^2_F \\
= \frac{1}{2^n}\text{Tr}(U^HU - U^HV - V^HU + V^HV) \\
= \frac{1}{2^n}\text{Tr}(I - U^HV - V^HU + I)
= \frac{1}{2^n} 2 \text{Tr}(I) - \frac{1}{2^n}\text{Tr}(U^HV + V^HU) \\
= 2 - \frac{1}{2^n}\text{Tr}(U^HV + V^HU) \\
= 2 - \frac{1}{2^n}(\text{Tr}(U^HV) + \text{Tr}(V^HU)) \\
= \frac{1}{2^n}\text{Tr}(U^HV) + \text{Tr}(U^HV)^* \\
=  2\frac{1}{2^n}\text{Re}(\text{Tr}(U^HV))
$$

Now, let us try to simplify to convince ourselves about the claim.

$$
\text{Re}( \langle \phi^n \rvert (I \otimes U^H)(I \otimes V)\rvert \phi^n \rangle) = 1 - \frac{1}{2}\frac{1}{2^n}\lVert U - V \rVert^2_F \\
\text{Re}( \langle \phi^n \rvert (I \otimes U^H)(I \otimes V)\rvert \phi^n \rangle) = 1 - \frac{1}{2}2\frac{1}{2^n}\text{Re}(\text{Tr}(U^HV)) \\ 
\text{Re}( \langle \phi^n \rvert (I \otimes U^H)(I \otimes V)\rvert \phi^n \rangle) = 1 - \frac{1}{2^n}\text{Re}(\text{Tr}(U^HV))
$$

Switch gears to trace distance:

$$
T(\rho, \sigma)^2 = \frac{1}{2}\lVert\rho-\sigma\rVert^2_F \\
T(\rho, \sigma)^2 = \frac{1}{2}2(1 - \text{Tr}(\rho\sigma)) \\ 
T(\rho, \sigma)^2 = 1 - \frac{1}{2}((\frac{1}{2})^n\text{Re}(\text{Tr}(U^HV)))^2
$$

Which is exactly where we want to be based on trance distance-fidelity relationship. Reasoning can be simplified, but I want to leave a bit of personal touch to show how I was wondering (and wandering!) around.

## Claim 3: $\eta$-net on a $n(\lambda)$-qubit unitaries for normalized Frobenius norm has size $(\frac{1}{\eta})^{\Omega(2^{2n(\lambda)})}$

Another rich statement. First we need to understand what $\eta$-net is. In literature the standard name is $\epsilon$-net. Formal definition is available (for example) [here](https://hal.science/hal-01468664/document) at page 12, section 47.4. I'd like to focus on intuition that helped me grasp the idea. I will be using $\eta$-net to remain in the context of the paper. Let say we have metric space $(M, d)$. We have points and well-defined distance between those points. Now let us pick some subset $X \subseteq M$ and a parameter $\eta$ in a _specific way_ -- all the points of $M$ should be no further than $\eta$ distance from one of the points in $X$, that set X will be $\eta$-net. Not that complicated right?

Now let us think a little about size of an $\eta$-net. The smaller the $\eta$ the more elements needs to be in set. If we set a $\eta = 0$, we need whole $M$ set as a "$0$-net". On the other extreme if we consider a "$\infty$-net" than _any single_ point would suffice. To make it more manageable, we can _normalize_ our metric space, so we only need to operate on values between $0$ and $1$. That means that no two points are further from each other than of $d=1$. So if we set $\eta=\frac{1}{2}$, then we need _at least_ 2 points to cover whole set. We may need more, but we are _guaranteed_ that that is minimum in that toy example. And that brings us closely to claim we need. Now with some geometric intuition the claim becomes relatively simple -- think about a circle than you need to fill in with smaller circles to ensure all points are within radius of smaller circles. I will finish at that.

## Claim 4: Construction and properties of $S_\lambda$

Within this section we will deal with all the properties and construction of $S_\lambda$. Here, we will just extract a list of what we need to show. Quick recap of how $S_\lambda$ is constructed. We start with $S_\lambda = \emptyset$, then:
1. Let take a $U$ $n$-qubit unitary and construct $\lvert \psi \rangle = (I \otimes U)\lvert \phi^n \rangle$. If $\lvert \psi \rangle$ has fidelity less than $1 - \eta$ with every state already in $S_\lambda$, then add $\lvert \psi \rangle$ to the set, otherwise stop.
2. Add $2^{2n}$ (?) pure states {$ (I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi \rangle : a, b \in \{0, 1\}^n$} to the set $S_\lambda$. My understanding here is that for $a, b = 0$ we are adding the original state again, so we are actually adding $2^{2n} - 1$ new states, but we end up with $2^{2n}$, because it was added in step 1.

Now for the properties:
1. Any pair of elements from $S_\lambda$ has fidelity at most $1 - \eta$.
2. $S_\lambda$ has at least $\frac{1}{\eta}^{\Omega(2^{2n(\lambda)})}$ elements
3. Uniform mixture over all $\lvert \psi \rangle \in S_\lambda$ is the totally mixed state.
4. For any $\lvert \psi \rangle \in S_\lambda, E(\lvert \psi \rangle \langle \psi \lvert) = n(\lambda)$

For me to feel comfortable, we need to split first property into few smaller ones:
- $(I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi \rangle$ and $\lvert \psi \rangle$ has fidelity at most $1 - \eta$
- Let $\lvert \psi_1 \rangle$, $\lvert \psi_2 \rangle \in S_\lambda$. $(I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi_1 \rangle$ and $\lvert \psi_2 \rangle$ has fidelity at most $1 - \eta$

Additionally, we need to be sure that $(I \otimes \sigma_X(a)\sigma_Z(b))$ are actually pure states.

### Claim 4.1: $\\{(I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi \rangle : a, b \in \\{0, 1\\}^n\\}$ are all pure states.

All maximally entangled states are pure. In [Claim 1](#claim-1-for-n-qubits-unitaries-u-and-v-and-lvert-phin-rangle-the-tensor-product-of-n-epr-pairs-the-states-i-otimes-ulvert-phin-rangle-and-i-otimes-vlvert-phin-rangle-are-both-maximally-entangled) we showed that applying operations in form $I \otimes A$ does not affect status of being maximally entangled. Because of that, $\\{(I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi \rangle : a, b \in \\{0, 1\\}^n\\}$ will remain maximally entangled, hence all  $\\{(I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi \rangle : a, b \in \\{0, 1\\}^n\\}$ are pure.

### Claim 4.2: $(I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi \rangle$ and $\lvert \psi \rangle$ has fidelity at most $1 - \eta$

Ah, fidelity again! So let us write everything we know, starting with states:

$$
\lvert \psi \rangle = (I \otimes U)\lvert \phi^n \rangle \\ 
\lvert \psi_{a, b} \rangle = (I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi \rangle = (I \otimes \sigma_X(a)\sigma_Z(b))(I \otimes U)\lvert \phi^n \rangle
$$

Okay, as we have fidelity formula for pure states

$$
\langle \phi^n \rvert (I \otimes U^H)(I \otimes \sigma_X(a)\sigma_Z(b))(I \otimes U)\lvert \phi^n \rangle
$$

This claim is relatively intuitive if you know what $\sigma_X(a)\sigma_Z(b)$ will do. What this operation will do is generate an orthogonal state to $(I \otimes U)\lvert \phi^n \rangle$, and orthogonal states have $0$ fidelity. $0 \leq 1 - \eta$, They are also orthogonal with each other.

### Claim 4.3: Let $\lvert \psi_1 \rangle, \lvert \psi_2 \rangle \in S_\lambda$. $(I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi_1 \rangle$ and $(I \otimes \sigma_X(c)\sigma_Z(d)) \lvert \psi_2 \rangle$ has fidelity at most $1 - \eta$

Now, we want to check if added orthogonal states coming from two different unitaries will still be far apart from each other. For me, it is not obvious that the fidelity will be "preserved" (or at least _not_ increased). Good that those are all pure states, we also now that fidelity between $\lvert \psi_1 \rangle, \lvert \psi_2 \rangle$ is at most $1 - \eta$. So, let us inner product that!

$$
\langle \psi_1 \rvert (I \otimes \sigma_Z(b)^H\sigma_X(a)^H)(I \otimes \sigma_X(c)\sigma_Z(d)) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert (I \otimes \sigma_Z(b)^H\sigma_X(a)^H\sigma_X(c)\sigma_Z(d)) \lvert \psi_2 \rangle
$$

It seems that we need to investigate all the combinations of $a, b, c, d$. Fortunately, we can simplify it because to consider _individual_  bit flips as it will directly scale to higher dimensions.

#### $a = c, b = d $

Here operations will "cancel out":

$$
\langle \psi_1 \rvert (I \otimes \sigma_Z(b)^H\sigma_X(a)^H\sigma_X(c)\sigma_Z(d)) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert (I \otimes \sigma_Z(b)^H\sigma_X(a)^H\sigma_X(a)\sigma_Z(b)) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert (I \otimes I) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert \psi_2 \rangle \leq 1 - \eta
$$

#### $a = c, b \neq d$

First, non-trivial case, let us see what happens:

$$
\langle \psi_1 \rvert (I \otimes \sigma_Z(b)^H\sigma_X(a)^H\sigma_X(c)\sigma_Z(d)) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert (I \otimes \sigma_Z(b)^H\sigma_X(a)^H\sigma_X(a)\sigma_Z(d)) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert (I \otimes \sigma_Z(b)\sigma_Z(d)) \lvert \psi_2 \rangle
$$

Now, that means that one of the $b, d$ parameters are $0$, so one of the gates can be discarded. Let us say $d = 0$, we end up with:

$$
\langle \psi_1 \rvert (I \otimes \sigma_Z(b)) \lvert \psi_2 \rangle
$$

Fortunately, we can start with very simple example - of single EPR pair as it will scale _directly_ to n copies.

$$ 
\lvert \psi_1 \rangle = a_1 \lvert 00 \rangle + a_2 \lvert 01 \rangle + a_3 \lvert 10 \rangle + a_4 \lvert 11 \rangle \\
\lvert \psi_2 \rangle = b_1 \lvert 00 \rangle + b_2 \lvert 01 \rangle + b_3 \lvert 10 \rangle + b_4 \lvert 11 \rangle \\
$$

The Z gate flips the phase of the \lvert 1 \rangle state but leaves \lvert 0 \rangle unchanged:

$$
(I \otimes \sigma_Z) \lvert \psi_2 \rangle = \lvert \psi_2 \rangle =  b_1 \lvert 00 \rangle - b_2 \lvert 01 \rangle + b_3 \lvert 10 \rangle - b_4 \lvert 11 \rangle
$$

The inner product $\langle \psi_1 \rvert (I \otimes \sigma_Z) \lvert \psi_2 \rangle$ expands to:

$$
(a_1^* \langle 00 \rvert + a_2^* \langle 01 \rvert + a_3^* \langle 10 \rvert + a_4^* \langle 11 \rvert)(b_1 \lvert 00 \rangle - b_2 \lvert 01 \rangle + b_3 \lvert 10 \rangle - b_4 \lvert 11 \rangle = \\
a_1^* b_1 - a_2^* b_2 + a_3^* b_3 - a_4^* b_4
$$

This means that our fidelity is:
$$
|a_1^* b_1 - a_2^* b_2 + a_3^* b_3 - a_4^* b_4|^2
$$

And with that we are _sure_ that it will not be _greater_ than original fidelity.

#### $a \neq c, b = d$

TODO:


#### $a \neq c, b \neq d$

As we are combining previous cases we are still _not_ increasing fidelity.

### Claim 4.4: For any $\lvert \psi \rangle \in S_\lambda, E(\lvert \psi \rangle \langle \psi \lvert) = n(\lambda)$

