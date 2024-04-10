---
title: 'Financial algorithms on real quantum computers'
date: 2024-04-09
permalink: /_posts/2024-04-09-Financial-Algorithms/
header:
  teaser: /assets/images/vtt-images/VTT_kvanttitietokone_labra-3237.jpg
published: true
author: Olli Mukkula
layout: single
tags:
  - Helmi
  - Leena
---

*With the availability of real, functioning quantum computers, quantum algorithms have transitioned from theory to practice and skyrocketed interest in practical applications. Finance is one of the many fields where quantum algorithms can improve speed and accuracy. Here, we demonstrate a prototype calculation on the Helmi quantum computer through the Finnish Quantum-Computing Infrastructure FiQCI.*

The speed-up offered by quantum computers stems from the probabilistic nature of the laws of physics at the quantum scale. For a quantum system, it is possible to exist simultaneously in a mix of multiple states, a state called quantum superposition. Quantum computing exploits this property by using quantum bits, that is, qubits. A classical bit can attain a value of 0 or 1. The quantum state of the qubit is clouded by uncertainty, allowing the qubit essentially to be both 0 and 1 simultaneously. Another quantum phenomenon, quantum entanglement, allows qubits to be coupled so that changing the state of one qubit affects the state of all entangled qubits simultaneously. An ideal quantum computer can efficiently perform calculations for large and complex systems, as each additional qubit, in principle, doubles the capacity of the quantum computer.

Now is the time to identify algorithms with future potential. Many applications have already been singled out: cryptography, simulations, search algorithms, and optimization problems. In finance, the use of quantum algorithms is investigated in asset pricing, risk analysis, and portfolio optimization, to mention a few [[2](#references),[3](#references)]. One promising quantum algorithm for financial analysis is called quantum amplitude estimation. It provides quadratic speed-up over currently known classical methods, a significant advantage in sufficiently large calculations. 

Today, anyone interested in quantum algorithms can implement them with open-source software and run simulations either on personal laptops or supercomputers. More interestingly, they can also be executed on actual quantum computers, such as Helmi, the first Finnish quantum computer. Helmi is connected to the LUMI supercomputer within the Finnish Quantum-Computing Infrastructure (FiQCI), a world-leading hybrid HPC+QC platform. FiQCI is jointly maintained, operated, and developed by VTT, Aalto University, and CSC.


## Quantum amplitude estimation
Quantum amplitude estimation (QAE) was originally developed by Brassard et al. [1](#references). It is a generalization of the famous Grover’s search algorithm and can be used to find the amplitude of a quantum state. It uses quadratically fewer queries than classical sampling methods. Thus, what would require a million queries using purely classical methods can ideally be done with just a thousand quantum queries. A hundred million classical queries correspond to only ten thousand quantum queries, and so on.

The impatient reader, who just wants to know how all of this works in practice, can skip to the next section. The technically inclined should read on. 

The main idea of the QAE algorithm is to find the solutions to a problem from an unstructured set of possible answers. This set of answers is encoded into the amplitudes of quantum states in a register of quantum bits. Due to the unique properties of quantum computers, a single quantum query is enough to search the whole set of solutions, find the desired answer, and mark it by inverting the phase of the corresponding quantum state. We call this particular quantum state the "good state." The marked phase, however, does not lead to quantum advantage on its own, as it does not show up in measurements. QAE solves this by increasing the amplitude of the “good state” through the process called amplitude amplification. When done correctly, this increases the probability of measuring the good state significantly. Converting the states into the computational basis using the inverse quantum Fourier transform allows classically mapping the measured states into the estimates of the amplitudes of the original states. Because the increased amplitude of the good state causes it to be measured more frequently, the correct answer is recovered with high probability. The efficiency of the amplitude amplification and its effect on the number of queries is the source of the quadratic increase in performance.

<figure>
    <img src="/assets/images/Financial-Algorithms-Blog/Figure1-QAE-circuit.png" alt="Figure 1: QAE circuit">
    <figcaption>
    <p>
    <em>Figure 1: A simple example of a QAE circuit based on Brassard's approach [1]. The “good state” is encoded into the objective (obj) qubit by quantum gate A. The amplitude amplification is implemented by repeatedly applying different powers of the Q operator. In this approach, the amplification operations are controlled by the register of evaluation qubits (eval)</em>
    </p>
    </figcaption>
</figure>

The cool thing about QAE is that adjusting the function that determines the initial amplitudes of the system allows one to calculate different moments of a probability distribution. This makes QAE an extremely versatile tool, as many problems are best approached from a probabilistic point of view. In finance, QAE can calculate, for example, expected profits and VaRs (Value at Risk). Below, we test how quantum amplitude estimation performs on real quantum hardware using examples of financial applications.

## Simulations
The original approach to quantum amplitude estimation proposed by Brassard et al. requires too many qubits for the 5-qubit quantum processing unit (QPU) of Helmi. In addition, the approach involves a lot of two-qubit gates, making the algorithm too error-prone for current quantum computers. Here, we instead consider a variant of QAE called Maximum Likelihood Quantum Amplitude Estimation (MLQAE) [4](#references), which runs multiple iterations of much simpler circuits (see Figure 2). 

To make up for the simplified circuits, MLQAE uses additional postprocessing in the form of maximum likelihood estimation. Though not quite as mathematically rigorous as the original algorithm by Brassard, the MLQAE has been subject to much research and seems to keep up with quadratic speedup [[4](#references),[5](#references)]. The good performance of the MLQAE is corroborated by Figure 3, where we present a comparison between QAE and MLQAE on Helmi. Where MLQAE achieves good accuracy, QAE suffers from a small number of available qubits in addition to a significant error arising from the large number of gates and long execution time of the circuit. On the other hand, the additional classical processing in MLQAE introduces some inaccuracy to the answer. Overall, given the advantages over Brassards QAE, MLQAE looks to be a good choice for implementing financial algorithms on near-term quantum computers.

<figure>
    <img src="/assets/images/Financial-Algorithms-Blog/Figure2-MLQAE.png" alt="Figure 2: MLQAE circuit">
    <figcaption>
    <p>
    <em>Figure 2: Using MLQAE to implement the circuit of Figure 1 consists of a batch of simpler circuits with different powers of amplification operations Q. Compared to the approach in Figure 1, the MLQAE requires no additional evaluation qubits</em>
    </p>
    </figcaption>
</figure>

<figure>
    <img src="/assets/images/Financial-Algorithms-Blog/Figure3-QAE-MLQAE-comparison.png" alt="Figure 3: Comparison between QAE and MLQAE">
    <figcaption>
    <p>
    <em>Figure 3: Comparison between QAE and MLQAE. The amplitude error is plotted as a function of queries, which in QAE are related to the number of qubits and in MLQAE to the number of circuits. Note the different scales of y-axes</em>
    </p>
    </figcaption>
</figure>

The next step is to select a suitable problem. An interesting example algorithm was investigated by CSC and OP Labs in 2021 [6](#references). The algorithm estimated housing prices in Helsinki using previous years’ prices and the annual growth rates from the last ten years. The calculation itself was a simple multiplication of the growth and last year’s prices. To perform the quantum algorithm, one must bin the available data sets and encode corresponding probability distributions in two different quantum registers. The accuracy of this mapping scales exponentially with the number of qubits in the register, making it accurate with large quantum registers. The downside is that even though the algorithm technically can be run using MLQAE with a very low number of qubits, it might not reach decent accuracy. Using a simulator, the estimated relative error of this implementation is 2.5%.

Of course, real-world problems go beyond simple multiplication. Option pricing is another potential application for quantum computing. An option is a contract that allows but does not obligate its owner to perform some specified transaction in the future. Setting a price for an option can be difficult, as the price depends on the future value of its underlying asset and the agreed conditions of the option itself. For certain type of options, the valuation process is computationally expensive, due to the uncertainty of future markets. We chose to implement a quantum algorithm for pricing the European call option, a simple but realistic type of an option. Despite its simplicity, the implementation can be extended for more complicated options with relative ease [2]. The idea is to use MLQAE to calculate the expected value of the option's payoff function. In other words, we use a quantum computer's parallel properties to simultaneously evaluate the option's different future prices, something which classically would be done separately.

Here, a reality check is in order. Both housing price estimation and option pricing encounter challenges on a real QPU. The circuits required for more complex problems are too long for current noise levels. Displayed in Figure 4 are the results of the European option pricing done with MLQAE. A simulation converges faster than the classical sampling method. However, results with a real QPU fall apart due to the qubits' loss of coherence. The good news is that these algorithms work as a concept even with quantum computers like Helmi, with only a few qubits available. Increased accuracy comes in time with more advanced hardware.

<figure>
    <img src="/assets/images/Financial-Algorithms-Blog/Figure4-Statistical-mean-of-amplitude-error.png" alt="Figure 4: Statistical-mean-of-amplitude-error">
    <figcaption>
    <p>
    <em>Figure 4: Statistical mean of amplitude error for evaluating the European call option. Comparison between MLQAE algorithm on a simulator and the Helmi quantum computer, and a classical sampling method</em>
    </p>
    </figcaption>
</figure>

## Finance and quantum computers gather public interest
Experts from different fields interested in gaining a quantum advantage in the future are now working to improve their knowledge and encouraging people to learn about quantum technologies.

Last November, the Hanken School of Economics in Finland and Ultrahack organized a quantum hackathon for finance-oriented minds with the theme of sustainable finance in the quantum era. The competition saw many teams with different backgrounds tackling the challenge and coming up with innovative solutions to combine the financial sector with the capabilities of quantum computers. Taking part in supporting the event, CSC and VTT with colleagues from IQM, provided participants access to the 20-qubit Leena quantum computer through the LUMI supercomputer.

It was great to see teams utilizing the Finnish quantum computer as a part of their projects. One such team, Qumpula Quantum, won 2nd place in the competition. A popular topic in this year's hackathon was quantum machine learning, which was also implemented using Leena.

<figure>
    <img src="/assets/images/Financial-Algorithms-Blog/Figure5-Hanken-Hackathon.png" alt="Figure 5: Hanken-Hackathon">
    <figcaption>
    <p>
    <em>Figure 5: CSC and VTT had teams mentoring at Hanken Quantum Hackathon. Pictured at the bottom left: Nikolas Klemola Tango, Olli Mukkula, Modupe Falodun and Jake Muff. Photos: Aleksi Leskinen</em>
    </p>
    </figcaption>
</figure>

## Closing thoughts
It is already possible to run straightforward quantum financial examples and see how they perform on real quantum hardware. As with quantum algorithms in general, it is vital to learn how to construct algorithms best suited for real quantum devices. 

Hybrid algorithms combining quantum and classical processing are promising, and machine learning models are expected to help optimize quantum circuits for noisy environments. Compared to the history of classical computing, quantum algorithms have been researched for such a short time that much remains to be discovered.It may well be that new and improved algorithms are discovered tomorrow. Research for algorithms cannot sit and wait for better quantum hardware. After all, a suitable combination of both is needed for quantum advantage.

## Notebooks
Those interested in the codes used for this blog can find the Jupyter notebooks with detailed explanations in the link below. They can be executed directly on the FiQCI infrastructure. [More details here](https://github.com/CSCfi/Quantum/tree/main/Finance-Modelling-on-Helmi)

## References

1.	[Quantum Amplitude Amplification and Estimation, G. Brassard et al., 2000](https://arxiv.org/abs/quant-ph/0005055)
2.	[Option Pricing using Quantum Computers, N. Stamatopoulos et al., 2000](https://arxiv.org/abs/1905.02666)
3.	[Quantum Risk Analysis, S. Woerner and D.J. Egger, 2018](https://arxiv.org/abs/1806.06893)
4.	[Amplitude Estimation without Phase Estimation, Y. Suzuki et al., 2020](https://arxiv.org/abs/1904.10246)
5.	[Improved maximum-likelihood quantum amplitude estimation, A. Callison and D. Browne, 2023](https://arxiv.org/abs/2209.03321)
6.	[The housing market’s quantum future, O. Salmenkivi et al., 2021](https://www.csc.fi/-/the-housing-market-s-quantum-future)


## Give feedback!

Feedback is greatly appreciated! You can send feedback directly to [fiqci-feedback@postit.csc.fi](mailto:fiqci-feedback@postit.csc.fi).
