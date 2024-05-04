---
title: "About"
layout: splash
permalink: /about
hidden: false
header:
  #overlay_color: "#000"
  overlay_image: /assets/images/FiQCI-banner.jpg
excerpt: >
  The Finnish Quantum-Computing Infrastructure<br />
  <small></small>
intro: 
  - excerpt: 'The FiQCI consortium maintains, operates, and develops the infrastructure'
funders_gallery:
 - url: /assets/images/funder-Academy_of_Finland.png
   image_path: /assets/images/funder-Academy_of_Finland.png
   alt: "Academy of Finland logo"
   title: "Academy of Finland"
 - url: /assets/images/funder-EU-RRF.jpg
   image_path: /assets/images/funder-EU-RRF.jpg
   alt: "European Union NextGenerationEU logo"
   title: "European Union NextGenerationEU"

---

{% include feature_row id="intro" type="center" %}

## In Brief

The Finnish Quantum-Computing Infrastructure (FiQCI) was established in 2020, when it became part of the Finnish Research Infrastructure (FIRI) roadmap of significant national research infrastructures within the Finnish research infrastructure ecosystem, maintained by the Research Council of Finland.

The mission of FiQCI is to provide state-of-the-art quantum-computing services such as computing time and training to the Finnish RDI communities. This includes providing a hybrid high-performance computing and quantum computing (HPC+QC) platform for developing, testing, and exploiting quantum-accelerated computational workflows. Through FiQCI, Finnish researchers have access to one of the most powerful hybrid HPC+nQC resources in the world, available for quantum accelerated research and development. The infrastructure also aims to offer possibilities to carry out experiments in quantum physics.

FiQCI is jointly maintained, operated, and developed by **VTT**, **Aalto University**, and **CSC – IT Center for Science**.

## Components

### LUMI supercomputer

The backbone of the classical HPC resources in FiQCI, and the portal for quantum computing resources, is the pan-European EuroHPC LUMI supercomputer. LUMI is the fastest and greenest supercomputer in Europe, hosted by CSC in Kajaani, Finland. For more information, see [https://www.lumi-supercomputer.eu/](https://www.lumi-supercomputer.eu/)

### Helmi quantum computer

Helmi, the first Finnish quantum computer, co-developed by VTT and IQM Quantum Computers, is operated by VTT in Espoo, Finland. Helmi is based on superconducting technology, and presently provides five qubits. Upgrades to 20, then 50 qubits is planned for the near future.

### Kvasi quantum computer simulator

Kvasi, the Atos Quantum Learning Machine or Qaptiva is a quantum computing simulator with which you can learn to use and develop new quantum algorithms. Kvasi provides a platform for developing and simulating quantum algorithms in both ideal and realistic, noisy conditions. Kvasi is capable of simulating algorithms for quantum computers of 30+ qubits. For more information, see [https://research.csc.fi/-/kvasi](https://research.csc.fi/-/kvasi)

### Other resources

Other quantum resources will continuously be added to the FiQCI infrastructure.

## Scientific and Technical Advisory Group 

The Scientific and Technical Advisory Group (STAG) provides input for the operation of the infrastructure. The current (2023) members of the STAG are:

* Dr. Valeria Bartsch, Fraunhofer Institute for Industrial Mathematics, Germany
* Dr. Alba Cervera Lierta, Barcelona Supercomputing Center, Spain
* Prof. Tommi Mikkonen, University of Jyväskylä, Finland
* Prof. Martin Schulz, Technical University of Munich, Germany
* Prof. Göran Wendin, Chalmers University of Technology, Sweden

## Management

* Prof. Mika Prunnila, VTT, FiQCI director
* Dr. Mikael Johansson, CSC, FiQCI vice-director
* Prof. Tapio Ala-Nissilä, Aalto University, FiQCI vice-director

## Acknowledgement

When publishing the results that utilise the FiQCI infrastructure, users should acknowledge the use of FiQCI, preferably in the format: "These [results] have been acquired using the Finnish Quantum-Computing Infrastructure (https://fiqci.fi)". [Additionally, users should also acknowledge using Helmi if applicable](./posts/2022-11-01-Helmi-pilot.md#acknowledgement). 

## Supported by

{% include gallery id="funders_gallery" %}

