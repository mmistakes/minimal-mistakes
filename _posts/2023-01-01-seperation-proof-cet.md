---
title: "Notes on Lemma 4.1 from ''Computational Quantum Entanglement paper'''"
excerpt: "Wrappng my head around the proof"
categories: [quantum computing, computational quantum entanglement]
tags: [proof]
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

That of course shows that subystem A is not affected by (I \otimes U), hence maximum entangled is retained.

##



