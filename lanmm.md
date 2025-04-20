---
layout: single
title: "Laminar Neural Mass Model (LaNMM)"
permalink: /lanmm/
---

## Introduction

The Laminar Neural Mass Model (LaNMM) is a computational framework developed to link circuit-level mechanisms to EEG/MEG biomarkers across various brain states, encompassing healthy function, disease, and altered consciousness.

## Foundational Work

**LaNMM Framework (2019, 2022):**

- [(2019) P118 A Biophysically Realistic Laminar Neural Mass Modeling Framework for Transcranial Current Stimulation](https://www.sciencedirect.com/science/article/pii/S1388245719315950) (Clinical Neurophysiology)  
  **Abstract summary:** Presents a biophysically realistic laminar neural mass model that embeds synaptic sources across cortical layers to simulate and predict the mesoscopic effects of transcranial current stimulation—including laminar current distribution and resulting local field potential dynamics.  [pdf](https://github.com/giulioruffini/giulioruffini.github.io/blob/master/assets/papers/Ruffini2020P118laminar.pdf)

- [(2023) A physical neural mass model framework for the analysis of laminar electrophysiological recordings](https://www.sciencedirect.com/science/article/pii/S105381192300085X) -  [Preprint version on bioRxiv](https://www.biorxiv.org/content/10.1101/2022.07.19.500618v2)

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



# All Computational Neuroscience related Publications

#### 2025

- **[Cross-Frequency Coupling as a Neural Substrate for Prediction Error Evaluation: A Laminar Neural Mass Modeling Approach](https://www.biorxiv.org/content/10.1101/2025.03.19.644090.abstract)**  
  **Abstract summary:** Predictive coding frameworks suggest that neural computations rely on hierarchical error minimization, where sensory signals are evaluated against internal model predictions ….  

- **[Structured dynamics in the algorithmic agent](https://pmc.ncbi.nlm.nih.gov/articles/PMC11765005/)**  
  **Abstract summary:** In the Kolmogorov Theory of Consciousness, algorithmic agents utilize inferred compressive models to track coarse-grained data produced by simplified world models, capturing ….  

- **[Fast Interneuron Dysfunction in Laminar Neural Mass Model Reproduces Alzheimer's Oscillatory Biomarkers](https://www.biorxiv.org/content/10.1101/2025.03.26.645407.abstract)**  
  **Abstract summary:** Alzheimer's disease (AD) is characterized by a progressive cognitive decline underpinned by disruptions in neural circuit dynamics.  

#### 2024

- **[Neural geometrodynamics, complexity, and plasticity: a psychedelics perspective](https://www.mdpi.com/1099-4300/26/1/90)**  
  **Abstract summary:** We explore the intersection of neural dynamics and the effects of psychedelics in light of distinct timescales in a framework integrating concepts from dynamics, complexity, and ….  

- **[The algorithmic agent perspective and computational neuropsychiatry: From etiology to advanced therapy in major depressive disorder](https://www.mdpi.com/1099-4300/26/11/953)**  
  **Abstract summary:** Major Depressive Disorder (MDD) is a complex, heterogeneous condition affecting millions worldwide.  

- **[Multiscale neuro-inspired models for interpretation of EEG signals in patients with epilepsy](https://www.sciencedirect.com/science/article/pii/S1388245724000762)**  
  **Abstract summary:** Objective The aim is to gain insight into the pathophysiological mechanisms underlying interictal epileptiform discharges observed in electroencephalographic (EEG) and stereo ….  

- **[NeoCOMM: A neocortical neuroinspired computational model for the reconstruction and simulation of epileptiform events](https://www.sciencedirect.com/science/article/pii/S0010482524010199)**  
  **Abstract summary:** Background: Understanding the pathophysiological dynamics that underline Interictal Epileptiform Events (IEEs) such as epileptic spikes, spike-and-waves or High-Frequency ….  

- **[Restoring Oscillatory Dynamics in Alzheimer's Disease: A Laminar Whole-Brain Model of Serotonergic Psychedelic Effects](https://www.biorxiv.org/content/10.1101/2024.12.15.628565.abstract)**  
  **Abstract summary:** Classical serotonergic psychedelics show promise in addressing neurodegenerative disorders such as Alzheimer's disease by modulating pathological brain dynamics ….  

- **[Collapse of directed functional hierarchy under classical serotonergic psychedelics](https://www.biorxiv.org/content/10.1101/2024.12.21.629922.abstract)**  
  **Abstract summary:** It has been proposed that psychedelics induce profound functional changes to the hierarchical organisation of the human brain.  


#### 2023

- **[LSD-induced increase of Ising temperature and algorithmic complexity of brain dynamics](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1010811)**  
  **Abstract summary:** A topic of growing interest in computational neuroscience is the discovery of fundamental principles underlying global dynamics and the self-organization of the brain.  

- **[A physical neural mass model framework for the analysis of oscillatory generators from laminar electrophysiological recordings](https://www.sciencedirect.com/science/article/pii/S105381192300085X)**  
  **Abstract summary:** Cortical function emerges from the interactions of multi-scale networks that may be studied at a high level using neural mass models (NMM) that represent the mean activity of large ….  

- **[Comparison between an exact and a heuristic neural mass model with second-order synapses](https://link.springer.com/article/10.1007/s00422-022-00952-7)**  
  **Abstract summary:** Neural mass models (NMMs) are designed to reproduce the collective dynamics of neuronal populations.  

- **[Complex spatiotemporal oscillations emerge from transverse instabilities in large-scale brain networks](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1010781)**  
  **Abstract summary:** Spatiotemporal oscillations underlie all cognitive brain functions.  

- **[Spherical harmonics representation of the steady-state membrane potential shift induced by tDCS in realistic neuron models](https://iopscience.iop.org/article/10.1088/1741-2552/acbabd/meta)**  
  **Abstract summary:** Objective.  

- **[Towards a mesoscale physical modeling framework for stereotactic-EEG recordings](https://iopscience.iop.org/article/10.1088/1741-2552/acae0c/meta)**  
  **Abstract summary:** Objective.  

- **[Biophysical modeling of the electric field magnitude and distribution induced by electrical stimulation with intracerebral electrodes](https://iopscience.iop.org/article/10.1088/2057-1976/acd385/meta)**  
  **Abstract summary:** Intracranial electrodes are used clinically for diagnostic or therapeutic purposes, notably in drug-refractory epilepsy (DRE) among others.  

- **[Model-driven tACS in Alzheimer's disease with personalized hybrid brain models](https://www.brainstimjrnl.com/article/S1935-861X(23)00804-5/fulltext)**  
  **Abstract summary:** Animal models suggest that 40 Hz induced gamma oscillations reduce Aβ and p-Tau deposition, which is considered central to Alzheimer's disease (AD) pathophysiology ….  


- **[CONNECTIVITY PROFILES OF THE BRAIN AND THE IMPORTANCE OF HOMOTOPIC CONNECTIVITY FOR INFORMATION PROCESSING](https://www.ibroneuroreports.org/article/S2667-2421(23)01726-8/fulltext)**  
  **Abstract summary:** Methods: Functional connectomes derived from functional magnetic resonance imaging are an intuitive summary of various brain states.  

- **[N° 73–Multiscale neuro-inspired models for interpretation of EEG signals in epilepsy patients](https://hal.science/hal-04350240/)**  
  **Abstract summary:** N73 – Multiscale neuro-inspired models for interpretation of EEG signals in epilepsy patients - Archive ouverte HAL Recherche Accéder directement au contenu Pied de page Logo Logo ….  

- **[N° 60–Signal processing and modeling for interpretation of interictal epileptic discharges in partial epilepsies](https://hal.science/hal-04350247/)**  
  **Abstract summary:** N60 – Signal processing and modeling for interpretation of interictal epileptic discharges in partial epilepsies - Archive ouverte HAL Recherche Accéder directement au contenu Pied de ….  

#### 2022

- **[Toward noninvasive brain stimulation 2.0 in Alzheimer's disease](https://www.sciencedirect.com/science/article/pii/S1568163721003020)**  
  **Abstract summary:** Noninvasive brain stimulation techniques (NiBS) have gathered substantial interest in the study of dementia, considered their possible role in help defining diagnostic biomarkers of ….  

- **[Digitalized transcranial electrical stimulation: a consensus statement](https://www.sciencedirect.com/science/article/pii/S1388245722008719)**  
  **Abstract summary:** Objective Although relatively costly and non-scalable, non-invasive neuromodulation interventions are treatment alternatives for neuropsychiatric disorders.  

- **[A personalizable autonomous neural mass model of epileptic seizures](https://iopscience.iop.org/article/10.1088/1741-2552/ac8ba8/meta)**  
  **Abstract summary:** Work in the last two decades has shown that neural mass models (NMM) can realistically reproduce and explain epileptic seizure transitions as recorded by electrophysiological ….  

- **[Stereo-EEG based personalized multichannel transcranial direct current stimulation in drug-resistant epilepsy](https://www.sciencedirect.com/science/article/pii/S1388245722001961)**  
  **Abstract summary:** Objective In epilepsy, multichannel transcranial direct electrical stimulation (tDCS) is applied to decrease cortical activity through the delivery of weak currents using several scalp ….  

- **[Signal processing and computational modeling for interpretation of SEEG-recorded interictal epileptiform discharges in epileptogenic and non-epileptogenic zones](https://iopscience.iop.org/article/10.1088/1741-2552/ac8fb4/meta)**  
  **Abstract summary:** Objective.  

- **[Modeling implanted metals in electrical stimulation applications](https://iopscience.iop.org/article/10.1088/1741-2552/ac55ae/meta)**  
  **Abstract summary:** Objective.  

- **[Digitizing non-invasive neuromodulation trials: scoping review, process mapping, and recommendations from a Delphi panel](https://www.medrxiv.org/content/10.1101/2022.03.03.22271837.abstract)**  
  **Abstract summary:** Although relatively costly and non-scalable, non-invasive neuromodulation interventions are treatment alternatives for neuropsychiatric disorders.  

- **[A spherical harmonics-based framework for representing steady-state shifts in neuron models induced by weak electric fields](https://www.biorxiv.org/content/10.1101/2022.07.19.500653.abstract)**  
  **Abstract summary:** Objective We provide a systematic framework for the quantification of the effect of externally applied weak electric fields on realistic neuron compartment models as captured by ….  

- **[TH-199. Towards model-driven tES in epilepsy: From SEEG to optimized stimulation protocols]()**  

- **[TH-230. Mechanistic understanding of Alzheimer's disease through hybrid brain models: from mesoscale to macroscale, and design of personalized …]()**  

#### 2021

- **[Analysis and extension of exact mean-field theory with dynamic synaptic currents](https://www.biorxiv.org/content/10.1101/2021.09.01.458563.abstract)**  
  **Abstract summary:** Neural mass models such as the Jansen-Rit system provide a practical framework for representing and interpreting electrophysiological activity (–) in both local and global brain ….  

- **[An individualized Neural Mass Model of ictal activity based on GABA-A pathology for personalization of brain stimulation protocols in epilepsy](https://www.brainstimjrnl.com/article/S1935-861X(21)00528-3/fulltext)**  
  **Abstract summary:** The creation of personalized brain network models for therapeutic intervention with brain stimulation is a promising direction of research in epilepsy.  

- **[A physical neural mass modeling framework for laminar cortical circuits in brain stimulation](https://www.brainstimjrnl.com/article/S1935-861X(21)00260-6/fulltext)**  
  **Abstract summary:** Brain function emerges from the interactions of multi-scale networks that may be modeled using neural mass models (NMM)–effective or lumped models of large numbers of neurons ….  

- **[Spherical harmonics based model of electric field effects on neocortical neurons](https://www.brainstimjrnl.com/article/S1935-861X(21)00323-5/fulltext)**  
  **Abstract summary:** Transcranial electrical stimulation (tES) techniques generate electric fields in the brain whose effects on single neurons can be approximated from the cable equation as a ….  

- **[From neural mass models to stereotactic-EEG recordings](https://www.brainstimjrnl.com/article/S1935-861X(21)00430-7/fulltext)**  
  **Abstract summary:** In the last decades neural mass models (NMM) have been extensively used to model the brain activity during different tasks or under different pathologies.  

- **[Evaluating optimal strategies for electric field dosimetry from intracranial electrodes](https://hal.science/hal-03388585/)**  
  **Abstract summary:** Intracranial electrodes are used clinically for diagnostic (eg in drug-refractory epilepsy) or therapeutic (deep brain stimulation, eg epilepsy) purposes.  


- **[Personalized multichannel transcranial direct current electrical stimulation guided by SEEG in epilepsy: Clinical and neurophysiological effects](https://hal.science/hal-03469066/)**  
  **Abstract summary:** Personalized multichannel transcranial direct current electrical stimulation guided by SEEG in epilepsy: Clinical and neurophysiological effects - Archive ouverte HAL Accéder ….  

#### 2020

- **[Realistic modeling of mesoscopic ephaptic coupling in the human brain](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1007923)**  
  **Abstract summary:** Several decades of research suggest that weak electric fields may influence neural processing, including those induced by neuronal activity and proposed as a substrate for a ….  

- **[Clinical drivers for personalization of transcranial current stimulation (tES 3.0)](https://link.springer.com/chapter/10.1007/978-3-030-43356-7_24)**  
  **Abstract summary:** The brain is a complex, plastic, electrical network where dysfunctions result in neurological disorders.  

- **[Convolutional neural network MRI segmentation for fast and robust optimization of transcranial electrical current stimulation of the human brain](https://www.biorxiv.org/content/10.1101/2020.01.29.924985.abstract)**  
  **Abstract summary:** The segmentation of structural MRI data is an essential step for deriving geometrical information about brain tissues.  

- **[Convolutional neural network MRI segmentation for fast and robust optimization of transcranial electrical current stimulation of the human brain](https://www.academia.edu/download/91283181/2020.01.29.924985.full.pdf)**  
  **Abstract summary:** The segmentation of structural MRI data is an essential step for deriving geometrical information about brain tissues.  

#### 2019

- **[Algorithmic complexity of EEG for prognosis of neurodegeneration in idiopathic rapid eye movement behavior disorder (RBD)](https://link.springer.com/article/10.1007/s10439-018-02112-0)**  
  **Abstract summary:** Idiopathic rapid eye movement sleep behavior disorder (RBD) is a serious risk factor for neurodegenerative processes such as Parkinson's disease (PD).  

- **[Evaluating complexity of fetal MEG signals: a comparison of different metrics and their applicability](https://www.frontiersin.org/articles/10.3389/fnsys.2019.00023/full)**  
  **Abstract summary:** In this work, we aim to investigate whether information based metrics of neural activity are a useful tool for the quantification of consciousness before and shortly after birth.  


- **[Realistic modeling of ephaptic fields in the human brain](https://www.biorxiv.org/content/10.1101/688101.abstract)**  
  **Abstract summary:** Several decades of research suggest that weak electric fields may influence neural processing, including those induced by neuronal activity and recently proposed as substrate ….  

- **[A deep learning approach with event-related spectral EEG data in attentional deficit hyperactivity disorder](https://www.medrxiv.org/content/10.1101/19005611.abstract)**  
  **Abstract summary:** Attention deficit hyperactivity disorder (ADHD) is a heterogeneous neurodevelopmental disorder that affects 5% of the pediatric and adult population worldwide.  

- **[Resting eyes closed beta-phase high gamma-amplitude coupling deficits in children with attention deficit hyperactivity disorder](https://www.biorxiv.org/content/10.1101/598003.abstract)**  
  **Abstract summary:** Objective Attention-deficit hyperactivity disorder (ADHD) is the neurobehavioral disorder with the largest prevalence rate in childhood.  
  

#### 2018


- **[Targeting brain networks with multichannel transcranial current stimulation (tCS)](https://www.sciencedirect.com/science/article/pii/S2468451118300564)**  
  **Abstract summary:** The brain is a complex, plastic, electrical network whose dysfunctions result in neurological disorders.  

- **[Realistic modeling of transcranial current stimulation: The electric field in the brain](https://www.sciencedirect.com/science/article/pii/S2468451118300333)**  
  **Abstract summary:** Computational models of transcranial current stimulation (tCS) derived from MRI predict the electric field distribution in individual brains with reasonable accuracy and should be used to ….  

- **[Detection of generalized synchronization using echo state networks](https://pubs.aip.org/aip/cha/article/28/3/033118/685031)**  
  **Abstract summary:** Generalized synchronization between coupled dynamical systems is a phenomenon of relevance in applications that range from secure communications to physiological ….  

- **[Personalization of hybrid brain models from neuroimaging and electrophysiology data](https://www.biorxiv.org/content/10.1101/461350.abstract)**  
  **Abstract summary:** Personalization is rapidly becoming standard practice in medical diagnosis and treatment.  

- **[Deep learning using EEG spectrograms for prognosis in idiopathic rapid eye movement behavior disorder (RBD)](https://www.biorxiv.org/content/10.1101/240267.abstract)**  
  **Abstract summary:** Abstract REM Behavior Disorder (RBD) is now recognized as the prodromal stage of α-synucleinopathies such as Parkinson's disease (PD).  

- **[Echo state networks ensemble for SSVEP dynamical online detection](https://www.biorxiv.org/content/10.1101/268581.abstract)**  
  **Abstract summary:** Background Recent years have witnessed an increased interest in the use of steady state visual evoked potentials (SSVEPs) in brain computer interfaces (BCI), SSVEP is considered ….  

- **[Editorial overview: Neuromodulation]()**  

#### 2017


- **[Lempel-Zip Complexity Reference](https://arxiv.org/abs/1707.09848)**  
  **Abstract summary:** The aim of this note is to provide some reference facts for LZW---mostly from Thomas and Cover\cite {Cover: 2006aa} and provide a reference for some metrics that can be derived ….  

- **[Algorithmic complexity of EEG as a prognosis biomarker of neurodegeneration in idiopathic rapid eye movement behavior disorder (RBD)](https://www.biorxiv.org/content/10.1101/200543.abstract)**  
  **Abstract summary:** Rapid eye movement sleep (REM) behavior disorder (RBD) is a serious risk factor for neurodegenerative ailments such as Parkinson's disease (PD).  


#### 2016

- **[EEG-driven RNN classification for prognosis of neurodegeneration in at-risk patients](https://link.springer.com/chapter/10.1007/978-3-319-44778-0_36)**  
  **Abstract summary:** Abstract REM Behavior Disorder (RBD) is a serious risk factor for neurodegenerative diseases such as Parkinson's disease (PD).  

- **[Evaluation of the electric field in the brain during transcranial direct current stimulation: a sensitivity analysis](https://ieeexplore.ieee.org/abstract/document/7591062/)**  
  **Abstract summary:** The use of computational modeling studies accounts currently for the best approach to predict the electric field (E-field) distribution in transcranial direct current stimulation.  


#### 2015

- **[Application of the reciprocity theorem to EEG inversion and optimization of EEG-driven transcranial current stimulation (tCS, including tDCS, tACS, tRNS)](https://arxiv.org/abs/1506.04835)**  
  **Abstract summary:** Multichannel transcranial current stimulation (tCS) systems offer the possibility of EEG-guided optimized, non-invasive brain stimulation.  



#### 2014

- **[Optimization of multifocal transcranial current stimulation for weighted cortical pattern targeting from realistic modeling of electric fields](https://www.sciencedirect.com/science/article/pii/S1053811913012068)**  
  **Abstract summary:** Recently, multifocal transcranial current stimulation (tCS) devices using several relatively small electrodes have been used to achieve more focal stimulation of specific cortical ….  

- **[Conscious brain-to-brain communication in humans using non-invasive technologies](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0105225&onwardjourney=584162_c1)**  
  **Abstract summary:** Human sensory and motor systems provide the natural means for the exchange of information between individuals, and, hence, the basis for human civilization.  


- **[Quantitative EEG for Brain–Computer Interfaces](https://api.taylorfrancis.com/content/chapters/edit/download?identifierName=doi&identifierValue=10.1201/b17605-11&type=chapterpdf)**  
  **Abstract summary:** This chapter attempts to give different examples of applications of quantitative EEG (qEEG) for the realization of brain–computer interfaces (BCIs).  


- **[Advanced Machine Learning for classification of EEG traits as Parkinson's biomarker](https://www.frontiersin.org/10.3389/conf.fninf.2014.18.00071/event_abstract)**  
  **Abstract summary:** We aim to develop non-invasive, low-cost preclinical markers for synucleinopathies (Parkinson's Disease-PD or Dementia with Lewy Bodies-DLB) with impact on ….  


#### 2013

- **[The electric field in the cortex during transcranial current stimulation](https://www.sciencedirect.com/science/article/pii/S1053811912012190)**  
  **Abstract summary:** The electric field in the cortex during transcranial current stimulation was calculated based on a realistic head model derived from structural MR images.  

- **[Effects of transcranial Direct Current Stimulation (tDCS) on cortical activity: a computational modeling study](https://www.sciencedirect.com/science/article/pii/S1935861X11001926)**  
  **Abstract summary:** Although it is well-admitted that transcranial Direct Current Stimulation (tDCS) allows for interacting with brain endogenous rhythms, the exact mechanisms by which externally ….  

- **[From oscillatory transcranial current stimulation to scalp EEG changes: a biophysical and physiological modeling study](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0057330)**  
  **Abstract summary:** Both biophysical and neurophysiological aspects need to be considered to assess the impact of electric fields induced by transcranial current stimulation (tCS) on the cerebral ….  

- **[Guest editorial: special issue on noninvasive electromagnetic brain stimulation](https://ieeexplore.ieee.org/abstract/document/6514149/)**  
  **Abstract summary:** For several decades, electromagnetic brain stimulation for clinical applications has been investigated mainly with invasive techniques, such as deep brain stimulation (DBS), and this ….  


#### 2012

- **[Transcranial current brain stimulation (tCS): models and technologies](https://ieeexplore.ieee.org/abstract/document/6290404/)**  
  **Abstract summary:** In this paper, we provide a broad overview of models and technologies pertaining to transcranial current brain stimulation (tCS), a family of related noninvasive techniques ….  


- **[The relationship between transcranial current stimulation electrode montages and the effect of the skull orbital openings](https://ieeexplore.ieee.org/abstract/document/6346060/)**  
  **Abstract summary:** Due to its low electric conductivity, the skull has a major impact on the electric field distribution in the brain in transcranial current stimulation (tCS).  


#### 2005

- **[Combined ICA-LORETA analysis of mismatch negativity](https://www.sciencedirect.com/science/article/pii/S1053811904007116)**  
  **Abstract summary:** A major challenge for neuroscience is to map accurately the spatiotemporal patterns of activity of the large neuronal populations that are believed to underlie computing in the ….  


#### 2004

- **[Strategies for targeting brain networks in consciousness using tCS](https://www.researchgate.net/profile/Giulio-Ruffini/publication/333566543_Strategies_for_targeting_brain_networks_in_consciousness_using_tCS_Introduction/links/5cf4f3a0299bf1fb185328d0/Strategies-for-targeting-brain-networks-in-consciousness-using-tCS-Introduction.pdf)**  
  **Abstract summary:** Disorders of Consciousness (DOC) and other consciousness-related alterations can result from completely different events, like traumatic brain injuries (TBI) or functional changes (ie ….  

- **[Complex spatiotemporal oscillations emerge from transverse instabilities in large-scale brain networks](https://recercat.cat/handle/2117/406270)**  
  **Abstract summary:** Spatiotemporal oscillations underlie all cognitive brain functions.  

- **[Comparison between an exact and a heuristic neural mass model with second-order synapses](https://recercat.cat/handle/2117/406318)**  
  **Abstract summary:** Neural mass models (NMMs) are designed to reproduce the collective dynamics of neuronal populations.  

