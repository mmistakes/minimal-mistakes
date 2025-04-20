---
layout: single
title: "Laminar Neural Mass Model (LaNMM)"
permalink: /lanmm/
---

## Introduction

The Laminar Neural Mass Model (LaNMM) is a computational framework developed to link circuit-level mechanisms to EEG/MEG biomarkers across various brain states, encompassing healthy function, disease, and altered consciousness.

## Foundational Work

**LaNMM Framework (2019, 2022):**

- [A physical neural mass model framework for the analysis of laminar electrophysiological recordings](https://www.sciencedirect.com/science/article/pii/S105381192300085X)
- [Preprint version on bioRxiv](https://www.biorxiv.org/content/10.1101/2022.07.19.500618v2)

These studies introduced a physics-grounded neural mass model capable of generating both alpha/beta and gamma oscillations across cortical layers. The model embeds synaptic sources into a spatially layered medium, enabling simulation of laminar LFPs and their spectral features.

## Key Insights

- Alpha/beta (slow/fast) rhythms are generated in deep layers, while gamma rhythms originate in superficial layers.
- The model's structure allows for the simulation of realistic depth-resolved LFP, bipolar LFP, and CSD, aligning with experimental macaque data and uncovering oscillatory origins.

## Applications of LaNMM

### Alzheimer's Disease (AD) Study (2025)

- [Fast Interneuron Dysfunction in Laminar Neural Mass Model of Alzheimer's Disease](https://www.biorxiv.org/content/10.1101/2025.03.26.645407v1)

This study simulates fast interneuron (PV+) dysfunction and later-stage pyramidal cell loss, reproducing AD's biphasic M/EEG trajectory: early hyperexcitability (↑gamma, ↑alpha), followed by slowing and hypoactivity.

**Mechanistic Findings:**

- Aβ oligomers impair PV+ interneurons leading to disinhibition and hyperactivity.
- Subsequent tau pathology affects pyramidal neurons, resulting in hypoactivity.
- PV+ dysfunction alone explains early-phase EEG biomarkers, but tau-induced hypoactivity is necessary to match reduced firing/metabolism in advanced stages.

**Clinical Relevance:**

The model suggests PV+ cells as therapeutic targets and EEG spectral changes as early-stage biomarkers, bridging molecular pathology and mesoscopic dynamics.

### Psychedelics and AD (2024)

- [Restoring Oscillatory Dynamics in Alzheimer's Disease: A Laminar Neural Mass Model Study](https://www.biorxiv.org/content/10.1101/2024.12.15.628565v1)

In this study, LaNMM is embedded in whole-brain models personalized to AD patients. Activation of 5-HT2A receptors (mimicking psychedelics) increases excitability in L5 pyramidal cells, counteracting AD-related oscillatory deficits.

**Restoration of Dynamics:**

- Decreased alpha power (reduces hypersynchrony)
- Increased gamma power (restores PV-related processing)
- Increased entropy/complexity (a proxy for cognitive flexibility)

**Spatial Specificity:**

Spectral changes correlate with PET-derived 5-HT2A receptor distributions, suggesting that psychedelics could restore oscillatory dynamics in AD via targeted circuit modulation.

### Prediction Error and Cross-Frequency Coupling (CFC) (2025)

- [Cross-Frequency Coupling as a Neural Substrate for Prediction Error in Alzheimer's Disease and Psychedelics](https://www.biorxiv.org/content/10.1101/2025.03.19.644090v1)

This paper proposes that LaNMM supports biologically plausible comparator functions via cross-frequency coupling (CFC), enabling local prediction error evaluation in predictive coding.

**Key Mechanisms:**

- **Signal-Envelope Coupling (SEC):** Low-frequency rhythms modulate the amplitude of fast oscillations (PAC-like).
- **Envelope-Envelope Coupling (EEC):** Slow envelopes modulate fast envelopes, allowing gating and precision weighting (analogous to Kalman gain).

**Comparator Disruption Across Conditions:**

- **In AD:** Interneuron loss disrupts CFC, leading to inflated early prediction errors and their later suppression.
- **In Psychedelics:** Increased gain weakens prediction precision, resulting in "relaxed beliefs" and increased error signaling.

**Comparator Hypothesis:**

CFC in LaNMM instantiates the analog version of the hierarchical XOR-like error computation central to predictive coding and the Kolmogorov Theory (KT)/Active Inference (AIF). This formalization bridges algorithmic models with real electrophysiology. 

## Conclusion

LaNMM provides a unified, mechanistic scaffold for studying:

- Neurodegeneration (e.g., Alzheimer's Disease)
- Psychedelic states
- Predictive inference
- Oscillatory biomarkers
- Interneuron dynamics 
It is a physically grounded, biophysically realistic platform that integrates structure, dynamics, and function, serving as a bridge between biology and theoretical models.

---

*For further inquiries or collaborations, please contact Giulio Ruffini at giulio.ruffini@neuroelectrics.com.*
