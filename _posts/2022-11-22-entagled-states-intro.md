---
title: "Do you even entangle qubits?"
excerpt: "Step beyond classical computing"
categories: [quantum computing, qiskit introduction course]
tags: [quantum, probability, amplitude, entangled state]
classes: wide
---

In previous post we described what qubit is. As a quick reminder, qubit is a quantum analog of bit, a simple two-state quantum system with all of the quantum pecularities. Just as classical bit can be in `0` and `1` states, qubit can be in $\lvert 0 \rangle$ and $\lvert 1 \rangle$ states. One of the important pecularities is qubit's ability to be in a _superposition_, $\lvert \phi \rangle = \alpha \lvert 0 \rangle + \beta \lvert 1 \rangle$. Superposition means that if we will measure that qubit state multiple times we will get $\lvert 1 \rangle$ with ${\lvert \alpha \rvert}^2$ probability and ${\lvert \beta \rvert}^2$ probability. 

## Product states

It seems that qubits are social beings, hence let's consider two qubit state $\lvert ba \rangle$. During measurement this system can be in four states - $\lvert 00 \rangle$, $\lvert 01 \rangle$, $\lvert 10 \rangle$, $\lvert 11 \rangle$. Of course each of those base states have associated amplitude which is a product of its components amplitudes. 

$$
\lvert a \rangle = \alpha_a \lvert 0 \rangle + \beta_a \lvert 1 \rangle \\ 
\lvert b \rangle = \alpha_b \lvert 0 \rangle + \beta_b \lvert 1 \rangle \\
\lvert ba \rangle = \alpha_b \cdot \alpha_a \lvert 00 \rangle + \alpha_b \cdot \beta_a \lvert 01 \rangle + \beta_b \cdot \alpha_a \lvert 10 \rangle + \beta_b \cdot \beta_a \lvert 11 \rangle
$$

The same limitation is placed on amplitudes, meaning that sum of their modulus squares needs to be equal to $1$

$$
{\lvert \alpha_b \cdot \alpha_a \rvert}^2 + {\lvert \alpha_b \cdot \beta_b \rvert}^2 + {\lvert \beta_b \cdot \alpha_a \rvert}^2 + {\lvert \beta_b \cdot \beta_a \rvert}^2 = 1
$$

To close on this very brief introductronary description, let us go through example two qubit state $\lvert -1 \rangle$ (that is read "ket minus 1")


$$
\lvert - \rangle = \frac{1}{\sqrt{2}} \lvert 0 \rangle - \frac{1}{\sqrt{2}} \lvert 1 \rangle \\

\lvert 1 \rangle = 0 \lvert 0 \rangle + 1\lvert 1 \rangle \\

\lvert - 1 \rangle = 
(\frac{1}{\sqrt{2}} \cdot 0) \lvert 00 \rangle + (\frac{1}{\sqrt{2}} \cdot 1) \lvert 01 \rangle - (\frac{1}{\sqrt{2}} \cdot 0) \lvert 10 \rangle - (\frac{1}{\sqrt{2}} \cdot 1) \lvert 11 \rangle 
\\= \frac{1}{\sqrt{2}}(\lvert 01 \rangle - \lvert 11 \rangle)
$$

With amplitudes described above we have 0.5 probability of observing $\lvert 01 \rangle$ and 0.5 probability of observing $\lvert 11 \rangle$.

### Canceling out amplitudes

As you might recall the amplitudes are complex numbers. That means that the $-\frac{1}{\sqrt{2}}\lvert 11 \rangle$ is completely valid as for example  $-\frac{i}{\sqrt{4}}\lvert 11 \rangle$ would be (although the rest of amplitudes would have to be different). That means that with interesting enough quantum logic gates some of the amplitudes will cancel out! (Recall $i^2 + 1^2 = 0$).

## Entangled states

![Single layer Feedforward Network](/assets/img/quantum_ent_worry_meme.png "worry_meme")

Okay, so for now we described multiple qubit states. You might scratch your head "Well, so what?".

It turns out that we can have states that are not a product of a singular qubit states! Consider following state (read "ket phi minus")

$$
\lvert \Phi^- \rangle = \frac{1}{\sqrt{2}}(\lvert 00 \rangle - \lvert 11 \rangle)
$$

We can play a little with this state

$$
\lvert \Phi^- \rangle = \alpha_b \cdot \alpha_a \lvert 00 \rangle + \alpha_b \cdot \beta_a \lvert 01 \rangle + \beta_b \cdot \alpha_a \lvert 10 \rangle + \beta_b \cdot \beta_a \lvert 11 \rangle \\
\frac{1}{\sqrt{2}}(\lvert 00 \rangle - \lvert 11 \rangle) = \alpha_b \cdot \alpha_a \lvert 00 \rangle + \alpha_b \cdot \beta_a \lvert 01 \rangle + \beta_b \cdot \alpha_a \lvert 10 \rangle + \beta_b \cdot \beta_a \lvert 11 \rangle \\
\alpha_b \cdot \alpha_a = \frac{1}{\sqrt{2}} \\
\alpha_b \cdot \alpha_a = \frac{1}{\sqrt{2}} \\
\alpha_b \cdot \alpha_a = \frac{1}{\sqrt{2}} \\
\alpha_b \cdot \alpha_a = \frac{1}{\sqrt{2}} \\



$$


## Why do we even need entagled states?

Okay, so for now we described entagled qubit states. You might scratch your head "Well, so what?".

