---
title: "Bit, qubit, probability, amplitude, and H-gate"
excerpt: "Qiskit introduction course notes #1"
categories: [quantum computing, qiskit introduction course]
tags: [quantum, probability, amplitude, h-gate]
classes: wide
---

## Motivation, Battleplan, and Requirements

After reading [What is quantum?](https://learn.qiskit.org/course/introduction/what-is-quantum#what-4-0) I did not feel like I fully grasped the intuition behind the H-gate. In this post, I attempt to build such intuition on a high level (without diving too deep into the technical description). To do so, we will execute the following battle plan - we will describe bits, then qubits and amplitudes, then how amplitude relates to probability. Finally, we will tackle the boss-level concept of the H-gate. 

I assume you are familiar (that does not mean being super proficient) with those concepts: [basic Boolean logic](https://en.wikipedia.org/wiki/Boolean_algebra#Basic_operations), [vectors](https://en.wikipedia.org/wiki/Vector_(mathematics_and_physics)), [matrices](https://en.wikipedia.org/wiki/Matrix_(mathematics)), [matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication), and [complex numbers](https://en.wikipedia.org/wiki/Complex_number).

## Bits

I really like the description of what bit is from [Wiki](https://en.wikipedia.org/wiki/Bit):
> The bit is the most basic unit of information [...]. The bit represents a logical state with one of two possible values.

This short description works very well for me, especially after I took it apart. The highlights are _basic unit of information_, _state with two possible values_. If we think about what the minimal amount of information we can convey is that whether something _is_ or _is not_. And that's how I do interpret bits.

Please note that we did not describe how bits are _physically realized_. We described them as abstract objects. Bits can be realized in any physical thing that has two distinct states. For example with something as simple as a light switch with on and off positions. The core point is we do not really care about this, we just care about the properties of bits and what we can do with them as a perfect, mathematical object.

Of course bits, themselves are pretty boring. The action starts with logic gates! Logic gates are simply implementations of logical operations - think your ANDs, NOTs, ORs, and XORs.

_NOT_ is probably the simplest gate - it takes a bit and returns the inverse of it. For `0` (_is not_) it returns `1` (_is_). _AND_ takes two bits and checks, whether both of them _are_. For `1` and `1`, it will return `1` and for every other input it would return `0`. 

## Qubits and amplitude

First of all _qubits_ are also (but not only) abstract, mathematical objects. What makes it easier for me to deal with them is to treat them as such - if I see a surprising qubit property, but can understand (or at least have intuition) about the math behind it - then I am all good.  I tell myself that "surprising properties of qubits are just consequence of math" to avoid mind-bending quantum effects which are so distinct from our day-to-day experience. 

Just like a bit, a qubit also has two states, but instead of representing a logical state, it represents a quantum state. Now let us take jump head first and try to swim. Quantum state $\lvert \psi \rangle$ of a qubit can be defined as:

$$
\lvert \psi \rangle = \alpha \lvert 0 \rangle + \beta \lvert 1 \rangle; \alpha, \beta \in \mathbb{C} \text{ and } {\lvert \alpha \rvert}^2 + {\lvert \beta \rvert}^2 = 1
$$

Now let us take the equation above apart. First the $\lvert \text{something} \rangle$ notation - for our purposes it can just mean _quantum state_. If you want to dive deeper you should start reading up on [Dirac notation](https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation). With that $\lvert 0 \rangle$ is analogous to a $0$ state of a classic bit and $\lvert 1 \rangle$ to a classic bit with state $1$. What is important to know is that the aforementioned _quantum state_ can be represented as a vector:

$$
\lvert 0 \rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \\
\lvert 1 \rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix} \\
\lvert \psi \rangle = \alpha \lvert 0 \rangle + \beta \lvert 1 \rangle = \alpha \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \beta \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} \alpha \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ \beta \end{pmatrix} = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}
$$

Now let us tackle the $\alpha$ and $\beta$. As we can see above they describe how much state $\lvert \psi \rangle$ consists of $\lvert 0 \rangle$ and how much of $\lvert 1 \rangle$. Both $\alpha$ and $\beta$ are _probability amplitudes_. Probability amplitude is a complex number with the following property - _square 
modulus of probability amplitude equals probability of a particular outcome_ (this is simplified, visit [Wiki](https://en.wikipedia.org/wiki/Probability_amplitude) for more formal exposition). 

Now we can interpret $\lvert \psi \rangle = \alpha \lvert 0 \rangle + \beta \lvert 1 \rangle$ as a state that has ${\lvert \alpha \rvert}^2$ probability of being $0$ and ${\lvert \beta \rvert}^2$ of being $1$! Remember that, when we will measure the state of a qubit we will see either $0$ or $1$, not some "in-between" state.

## Quantum logic gates

With that, we can now attack quantum logic gates and H-gate. We know that quantum gates will take as an input a quantum state (at least one) and return another quantum state. If we define input and output quantum states as

$$
\lvert \psi_i \rangle = \begin{pmatrix} \alpha_i \\ \beta_i \end{pmatrix},
\lvert \psi_o \rangle = \begin{pmatrix} \alpha_o \\ \beta_o \end{pmatrix}
$$

then for a quantum logic gate to be expressive we would like to freely combine input values with the output ones, so we want

$$
\alpha_o = a \cdot \alpha_i + b \cdot \beta_i \\ 
\beta_o = c \cdot \alpha_i + d \cdot \beta_i
$$

If you recall your linear algebra course that is exactly how matrix multiplication works! So we can use our gate in the following ways

$$
\lvert \psi_o \rangle = \text{gate_matrix} \cdot \lvert \psi_i \rangle 
$$

For a single qubit gate, we have the _gate matrix_ needs to be $2 \times 2$

$$
\text{gate_matrix} = \begin{bmatrix} a && b \\ c && d \end{bmatrix}
$$

The output state needs to conform to the ${\lvert \alpha \rvert}^2 + {\lvert \beta \rvert}^2 = 1$. This is achieved by using [unitary matrices](https://en.wikipedia.org/wiki/Unitary_matrix).

Let us now look at the gate that would _inverse_ the quantum state - mapping $0$ to $1$ and $1$ to $0$. 

$$
\lvert 0 \rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{bmatrix} 0 && 1 \\ 1 && 0 \end{bmatrix} \cdot \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{bmatrix} 0 && 1 \\ 1 && 0 \end{bmatrix} \cdot \lvert 1 \rangle 
$$

This quantum logic gate is called an _X-gate_. It is analogous to a NOT gate.

## H-gate

Finally, we can tackle the H-gate. Let us recall the properties of H-gate from the [What is quantum?](https://learn.qiskit.org/course/introduction/what-is-quantum#what-4-0) section in the qiskit textbook.

1. Starting $\lvert 0 \rangle$ and $\lvert 1 \rangle$ we ended up with $0.5$ probability of observing $0$ and $0.5$ probability observing $1$. The output state of applying H-gate to $\lvert \psi \rangle$ would have following form - 
$\lvert \psi_H \rangle = \sqrt{\frac{1}{2}} \lvert 0 \rangle \pm \sqrt{\frac{1}{2}}$ $\lvert 1 \rangle$. The $\pm$ comes from the fact that if we want to get 0.5 probability by squaring a modulus of a complex number, we can do it from both $+\sqrt{\frac{1}{2}}$ and $-\sqrt{\frac{1}{2}}$.
2. Applying H-gate twice takes us back to our initial state - $\lvert \psi_{HH} \rangle = \lvert \psi \rangle$

Those two properties bring us to the following H-gate matrix (you can do the math on your own, it is not that hard!)

$$
H_{gate} = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 && 1 \\ 1 && -1 \end{bmatrix}
$$

### Notes on amplitude as a vector

As amplitudes are complex numbers we can represent them using [polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system#Complex_numbers), with modulus becoming the length of vector formed between the origin point and any particular complex number. For me (on my current level of knowledge) thinking about amplitudes as vectors make things more "complete". Then, for $\lvert \1 \rangle$ H-gate performs rotation of the amplitude vector (for the $\lvert \1 \rangle$ output).

## Summary

We described what bit is, then we went a level higher to describe qubit. We focused on the qubit complicated state which allowed us to describe quantum logic gates and finally define H-gate. I hope that this will help build your intuition and progress through the qiskit learning course! 
