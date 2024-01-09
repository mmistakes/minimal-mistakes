---
title: "Notes on (Part 1 of) Lemma 4.1 from ''Computational Quantum Entanglement paper''"
excerpt: "Wrappng my head around the proof"
categories: [quantum computing, computational quantum entanglement]
tags: [proving things]
classes: wide
---

Below are my notes on the proof of Lemma 4.1 from the paper [Computational Quantum Entanglement](https://arxiv.org/abs/2310.02783). My approach is to take the proof apart and try to understand each step. I will try to explain the concepts in a way that is understandable for me. Each part will be taken as a $\textit{claim}$ and I will try to convince myself why it is true.

Here I will focus only on proving bounds on part regarding (computational) entanglement distillation.

## What are we trying to prove?

> For any small enough $\varepsilon > 0$ and non-decreasing $n(\lambda)$ such that $n(\lambda) \rightarrow \infty$ as $\lambda \rightarrow \infty$, 
there exists a family $\\{\rho_{\lambda}^{AB}\\}$ of bipartite pure states on $2n(\lambda)$ qubits such that for all $\lambda$, 
$E_{D}^{0}(\rho_{\lambda}^{AB}) = E(\rho_{\lambda}^{A}) = n(\lambda)$, but for any valid lower bound $m$ on 
$\hat{E_{D}}^{0}(\rho_{\lambda})$, we have that $m \leq_{\infty} 0$.

### What does it mean?

There exist a family of states $\\{\rho_{\lambda}^{AB}\\}$ that has high (namely $n(\lambda)$) distillable entanglement , but small (namely 0) _computational_ distillable entanglement.

## Intuitive proof overview

To distill entanglement we need to create at least single EPR pair. 
The idea is to create a family of pure states (of which uniform mixture is the totally mixed state) that is way more numerous than number of efficient LOCC maps from those states to one EPR pair.
If the family has so many states that _almost all_ (at least half of them) of them would be distilled by one (family parametrized by $\lambda$ of) LOCC map.
Assume that this _efficient_ (critical part of assumption) LOCC map actually exist. Then, this particular LOCC map by being linear should also distill with non-zero fidelity from uniform mixture of the family - from this we have non-zero distillable entanglement. But we know that totally mixed state has
entanglement entropy (via entanglement of formation) equal to 0. Entanglement entropy is an upper bound for distillable entanglement, hence we arrive at contradiction.

### What is the post:

- Claims 1, 2 describe why we can even think about constructing such family of states
- Claim 3 shows that this family of state might be very populated.
- Claims 4, 4.1, 4.2, 4.3, 4.4 show properties of such family of states.
- Claims 5.1, 5.2 are the "actual" proofs.

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
= 2 - \frac{1}{2^n}\text{Tr}(U^HV) + \text{Tr}(U^HV)^* \\
= 2-  2\frac{1}{2^n}\text{Re}(\text{Tr}(U^HV))
$$

Now, let us try to simplify to convince ourselves about the claim.

$$
\text{Re}( \langle \phi^n \rvert (I \otimes U^H)(I \otimes V)\rvert \phi^n \rangle) = 1 - \frac{1}{2}\frac{1}{2^n}\lVert U - V \rVert^2_F \\
\text{Re}( \langle \phi^n \rvert (I \otimes U^H)(I \otimes V)\rvert \phi^n \rangle) = 1 - \frac{1}{2}(2 - 2\frac{1}{2^n}\text{Re}(\text{Tr}(U^HV))) \\ 
\text{Re}( \langle \phi^n \rvert (I \otimes U^H)(I \otimes V)\rvert \phi^n \rangle) = 1 - 1 +  \frac{1}{2^n}\text{Re}(\text{Tr}(U^HV)) = \frac{1}{2^n}\text{Re}(\text{Tr}(U^HV))
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
\langle \phi^n \rvert (I \otimes U^H)(I \otimes \sigma_X(a)\sigma_Z(b))(I \otimes U)\lvert \phi^n \rangle = \\
\langle \phi^n \rvert (I \otimes U^H\sigma_X(a)\sigma_Z(b)U)\lvert \phi^n \rangle = \\
\frac{1}{\sqrt{2}^n}\langle \tilde{\phi} \rvert (I \otimes U^H\sigma_X(a)\sigma_Z(b)U) \frac{1}{\sqrt{2}^n} \lvert \tilde{\phi} \rangle = \\
\frac{1}{2^n}\langle \tilde{\phi} \rvert (I \otimes U^H\sigma_X(a)\sigma_Z(b)U) \lvert \tilde{\phi} \rangle = \\
\frac{1}{2^n}\text{Tr}(U^H\sigma_X(a)\sigma_Z(b)U) = \\
\frac{1}{2^n}\text{Tr}(\sigma_X(a)\sigma_Z(b))
$$

Of course we are _not_ in case when $a = b = 0$ -- we would be measuring fidelity between particular state and itself. What we need here is following fact:
$\sigma_X(a), \sigma_Z(b), \sigma_X(a)\sigma_Z(b)$ all have trace equal to $0$, hence the fidelity is 0, which is less that $1 - \eta$.

### Claim 4.3: Let $\lvert \psi_1 \rangle, \lvert \psi_2 \rangle \in S_\lambda$. $(I \otimes \sigma_X(a)\sigma_Z(b)) \lvert \psi_1 \rangle$ and $(I \otimes \sigma_X(c)\sigma_Z(d)) \lvert \psi_2 \rangle$ has fidelity at most $1 - \eta$

Now, we want to check if added orthogonal states coming from two different unitaries will still be far apart from each other. For me, it is not obvious that the fidelity will be "preserved" (or at least _not_ increased). Good that those are all pure states, we also now that fidelity between $\lvert \psi_1 \rangle, \lvert \psi_2 \rangle$ is at most $1 - \eta$. We can write that down in a following way:

$$
\lvert \psi_1 \rangle = (I \otimes U) \lvert \phi^n \rangle =  (I \otimes U)\frac{1}{\sqrt{2}^n}\lvert \tilde{\phi} \rangle  \\
\lvert \psi_2 \rangle = (I \otimes V) \lvert \phi^n \rangle = (I \otimes V)\frac{1}{\sqrt{2}^n}\lvert \tilde{\phi} \rangle  \\
\langle \psi_1 \lvert \psi_2 \rangle \leq 1 - \eta \\
\frac{1}{\sqrt{2}^n}\langle \tilde{\phi} \rvert (I \otimes U^H) (I \otimes V)\frac{1}{\sqrt{2}^n}\lvert \tilde{\phi} \rangle \leq 1 - \eta \\
\frac{1}{2^n}\langle \tilde{\phi} \rvert (I \otimes U^HV)\lvert \tilde{\phi} \rangle \leq 1 - \eta \\
\frac{1}{2^n}\text{Tr}(U^HV) \leq 1 - \eta \\
\text{Tr}(U^HV) \leq 2^n(1 - \eta)
$$

That's what we know. With some easy simplifications we are interested in showing that:

$$
\frac{1}{2^n}\text{Tr}(U^H\sigma_Z(b)^H\sigma_X(a)^H\sigma_X(c)\sigma_Z(d)V) \leq \frac{1}{2^n}\text{Tr}(U^HV) \\ 
\text{Tr}(U^H\sigma_Z(b)^H\sigma_X(a)^H\sigma_X(c)\sigma_Z(d)V) \leq \text{Tr}(U^HV) \leq 2^n(1 - \eta)
$$

Let us first consider the case $n = 1, a = b = 1, c = d = 0$, we end up with:

$$
\text{Tr}(U^H\sigma_Z(b)^H\sigma_X(a)^HV) \\
\text{Tr}(U^H\sigma_Z\sigma_XV) \text{ simplified}
$$

Now - simplifying, but wlog - let us recall that _if_ we have unitary $U$ already in set $S_\lambda$, then we also have: $\sigma_XU, \sigma_ZU, \sigma_X\sigma_ZU$. That means that $V$ must have desired fidelity with all of those matrices, by conjugate transpose we have the "simplified" equation above for any quantum one time padding of $V$.

Here operations will "cancel out":

$$
\langle \psi_1 \rvert (I \otimes \sigma_Z(b)^H\sigma_X(a)^H\sigma_X(c)\sigma_Z(d)) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert (I \otimes \sigma_Z(b)^H\sigma_X(a)^H\sigma_X(a)\sigma_Z(b)) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert (I \otimes I) \lvert \psi_2 \rangle \\
= \langle \psi_1 \rvert \psi_2 \rangle \leq 1 - \eta
$$

### Claim 4.4: For any $\lvert \psi \rangle \in S_\lambda, E(\lvert \psi \rangle \langle \psi \lvert) = n(\lambda)$

First, we need to help oursevles with definition of $E$. $E$ means entanglement entropy. In the Paper of Interest it lies under Definition 2.7. And it is defined as:

$$
E(\rho) = \max \{ H(A)_\rho, H(B)_\rho \}
$$

where $H(A)_\rho$ denotes the von Neumann entropy of the reduced density matrix $\rho_A$. For the case of a pure state $H(A) = H(B)$. Then of course we need von Neumann entropy. Fortunately, we are constantly in the realm of pure states, and we can leverage fact describe below ([source](https://en.wikipedia.org/wiki/Entropy_of_entanglement#Von_Neumann_entanglement_entropy)).

That means that we can "trace out" system B. System B is only one that is being modified, hence we are still in realm of maximal entropy.

### Claim 4.5: Uniform mixture over all states in $S_\lambda$ is the maximally mixed state.

This comes directly from quantum one time pad. For more practical information please see [this notes](https://ocw.tudelft.nl/wp-content/uploads/LN_Week1.pdf)

### Claim 4.6: Uniform mixture over all $\lvert \psi \rangle \in S_\lambda$ is the totally mixed state.

By construction of $S_\lambda$ we are effectively building an $\eta$-net. For a geometric intuition think about a unit circle. 
Then put a first unit vector (it should lie on a radius). Recall that inner product between any vector can be intuited as angle between those two vectors.
Then for a particular angle -- $\alpha$ -- (fidelity) how many vectors you can "pack" into that circle so that every 
pair of vectors have at least $\alpha$ angle between them. Then try to imagine how it would work in a sphere. 

## "Claim" 5.1: $s$ grows faster than any polynomial $\rightarrow$ lemma is proven for distillable entanglement

Now we get to the first, easier case of lemma. Just let us be clear on what we want to show -- there exists family of bipartite pure states of $2n(\lambda)$ qubits that 
_distillable entanglement_ equal to $n(\lambda)$, **but** it has computational quantum entanglement bounded by 0. 

So, what is $s$? $s$ is defined as a function that for each state returns the smallest size of an LOCC map that distills _one_ EPR pair from particular state. 
Moreover, if we pass "size parameter" $\lambda$ it will return maximal size for particular family of states. **It is defined on $S_\lambda$ from Claim 4**.

With this claim we assume that $s$ grows faster than any polynomial -- so the size of LOCC grows faster than any polynomial -- for $S_\lambda$. 
That obviously means that $S_\lambda$ is _the_ family for which at least one EPR by means of polynomially bounded LOCC, hence computational distillable entanglement is $0$.
By Claim 4.4 the (non-computational) distillable entanglement is $n(\lambda)$. We are where we wanted!

## "Claim" 5.2: $s$ is polynomially bounded than any polynomial $\rightarrow$ lemma is proven for distillable entanglement

Now for the harder case. 

First statement that we need to deal with is -- The number of LOCC maps from $2n(\lambda)$ to 2 qubits of size at most $s(\lambda)$ is at most
$2^{\text{poly}(s(\lambda))}$. Why? Because any such map can be described using a number 
of bits that is polynomially bounded. Why?

First, recall that $s$ that represented size of LOCC maps is polynomially bounded. Size of LOCC map means how many gates we need to realise that map.
So if we take the "biggest" map (or rather the fastest growing), we can create a (non bit, but $n$-ary, where $n$ is number of gates we have at disposal)
string that for each position will tell us which gate has been used. As the number of gates is fixed (even if we consider applying gates to different qubits, 
it will always be fixed) we can translate each position to a binary string, then with concatenating we have a string of size at most $2^{\text{poly}(s(\lambda))}$.

Now, we can take our $S_\lambda$ that has $(\frac{1}{\eta})^{\Omega(2^{2n(\lambda)})}$ states. Important observation is that there are more states than there are LOCC maps.
As we can see, number of LOCC grows exponentially already, but in case of states it is the exponent that grows exponentially -- we omit degraded cases in general where fidelity $< \frac{1}{2}$.

By pigeonhole principle that means that -- if we grow $\lambda$ to big enough values -- that there will be polynomial LOCC mapp that distills "almost all" states in
$S_\lambda$ with fidelity at least $1 - \epsilon$ (not $\eta$!) with one EPR pair.

Then we have following:

> Now let $\rho^\lambda$ be the uniform mixture over all $\psi \in S_\lambda$. Then provided $\eta$ is small enough with respect to $\epsilon$ it still 
> follows that $\hat{\Gamma}^\lambda(\rho^\lambda)$ has fidelity at least $1 - 2\epsilon$ with one EPR pair

And this is something that we need to explain. 
When we decrease $\eta$ we increase number of states as well as "locally" states are more similar to each other. If we _increase_ $\epsilon$ we are okay with
map $$\hat{\Gamma}^\lambda$ to provide states "further" away from single EPR pair. 

This part remains a bit of mystery to me. I know that fidelity is concave, which we can leverage. We also know that LOCC are linear mappings (as all quantum operations are)

First, let us split $\rho^\lambda$ into two parts: $\rho^\lambda_{\epsilon-}$ -- uniform mixture of states that have fidelity at least $1 - \epsilon$ and $\rho^\lambda_{\epsilon+}$ -- states that have fidelity less than $1 - \epsilon$.
From "almost all" condition we know that $\rho^\lambda_{\epsilon-}$ would be a mixture of _no less_ elements than $\rho^\lambda_{\epsilon+}$. So for lower bound we can assign weight $\frac{1}{2}$ to each of mixtures.
Now, for the _questionable_ element:

$$
F(\hat{\Gamma}^\lambda(\rho^\lambda)), \lvert \psi \rangle) = F(\hat{\Gamma}^\lambda(\rho^\lambda_{\epsilon-} + \rho^\lambda_{\epsilon+}), \lvert \psi \rangle) \geq \frac{1}{2}(F(\hat{\Gamma}^\lambda(\rho^\lambda_{\epsilon-}, \lvert \psi \rangle) + F(\hat{\Gamma}^\lambda(\rho^\lambda_{\epsilon+}, \lvert \psi \rangle))
$$

We know that $F(\hat{\Gamma}^\lambda(\rho^\lambda_{\epsilon-}) \geq 1 - \epsilon$. We can always assume $F(\hat{\Gamma}^\lambda(\rho^\lambda_{\epsilon+}) < 1 - \epsilon$. Finishing calculations we end up with $\frac{1}{2} - \epsilon$, which is different (but linearly similar) to what we have in paper and this is enough to finish the proof.

What is crucial is that for $\epsilon < \frac{1}{2}$, we have non-zero fidelity between uniform mixture and one EPR pair. 

Know for the entanglement of _totally mixed state_. Von Neumann entropy can be leveraged as measurement of entanglement entropy, but only for pure states. For mixed states we can leverage [entanglement of formation](https://en.wikipedia.org/wiki/Entanglement_of_formation).

We have our totally mixed state $\frac{1}{d}I_d$. We can decompose it to a set of pure product states (think [computational basis states](https://www.quantum-inspire.com/kbase/qubit-basis-states/)), each of those has $0$ entanglement, so min-sum among those would still be 0.

Now, we arrived at contradiction (for small enough $\epsilon$), so $s$ cannot be polynomially bounded, so $S_\lambda$ is the family of states from the claim.



