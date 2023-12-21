---
title: "Notes on Lemma 4.1 from ''Computational Quantum Entanglement paper''"
excerpt: "Wrappng my head around the proof"
categories: [quantum computing, computational quantum entanglement]
tags: [proving things]
classes: wide
---

Below are my notes on the proof of Lemma 4.1 from the paper [Computational Quantum Entanglement](https://arxiv.org/abs/2310.02783). My approach is to take the proof apart and try to understand each step. I will try to explain the concepts in a way that is understandable for me. Each part will be taken as a $\textit{claim}$ and I will prove it. I will also try to provide some intuition behind the concepts.

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

Plugging that in, we need to prove that:

$$
\lVert\rho-\sigma\rVert^2_F = (\frac{1}{2^n}\lVert U - V \rVert^2_F)^2
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

Another packed statement for my limited brain. 

