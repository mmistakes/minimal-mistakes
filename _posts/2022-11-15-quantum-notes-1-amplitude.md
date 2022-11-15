---
title: "Bit, qubit, probablity, amplitude and Hadamard gate"
excerpt: "Qiskit textbook notes #1"
categories: [quantum computing, qiskit textbook notes]
tags: [quantum, probability, amplitude, h-gate]
classes: wide
---

# Motivation, Battleplan and Requirements

After reading [What is quantum?](https://learn.qiskit.org/course/introduction/what-is-quantum#what-4-0) I did not feel like I fully grasped the idea of H-gate. This post is an attempt to provide different exposition to the idea of an _H-gate_. To do so, we will execute following battleplan - we will describe bits, then qubits and amplitudes, then how amplitude releates to probability and finally we will tackle the boss concept of the H-gate. 

I assume you, Dear Reader, are familiar with those concoptes: [basic Boolean logic](https://en.wikipedia.org/wiki/Boolean_algebra#Basic_operations), [vectors](https://en.wikipedia.org/wiki/Vector_(mathematics_and_physics)), [matrices](https://en.wikipedia.org/wiki/Matrix_(mathematics)), [matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication), and [complex numbers](https://en.wikipedia.org/wiki/Complex_number).

# Bits

I really like the description of what bit is from [Wiki](https://en.wikipedia.org/wiki/Bit):
> The bit is the most basic unit of information [...]. The bit represents a logical state with one of two possible values.

This short description works very well for me, especially after I took it aparat. The highlights are: _basic unit of information_, _state with two possible values_. If we get really reductionist and try to think what is the minimal amount of information we can convey is that whether something _is_ or _is not_. And that's how I do interpret bits.

Please note that we did not describe how bits are _physically realized_. We described them as abstract objects. They can be realized on any physical thing that has two distinct states. For example with something as simple as light switch with on and off positions. The core point is we do not really care about this, we just care about properties of bits and what we can do with them as a perfect, mathematical objects.

Of course bits themselves are pretty boring. The action is with logic gates are simply implementations of logical operations - think your ANDs, NOTs, ORs and XORs.

_NOT_ is probably the simplest gate - it takes a bit and return the inverse of it. For `0` (_is not_) it returns `1` (_is not_). _AND_ taktes two bits and checks whether both of them _are_, for `1` and `1` it will return `1` and for every other input it would return `0`. 

# Qubits and amplitude

Now, we will need to climb a steep hill, so it will be a little bit hard, but you can do this. Just one step at a time.

First of all _qubits_ are also (but not only) abstract, mathematical objects. What makes easier for me to deal with them is to treat them as such - if I see a surprising qubit property, but can understand (or at least have intution) about the math behind it - then I am all good.  I tell myself that "surprising properties of qubits are just consequence of math" to avoid mind-bending quantum effects with are so distinct from our day-to-day expirence. 

Just like a bit, qubit is also two state, but instead of represeting a logical state it represents a quantum state. Now let us take a jump head first and try to swim. Quantum state of a qubit 


# Amplitude and probability

# H-gate



