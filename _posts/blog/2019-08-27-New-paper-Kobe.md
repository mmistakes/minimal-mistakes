---
layout: post
title: New paper published in Elife
categories: blog
excerpt: Confidence predicts speed-accuracy tradeoff for subsequent choices
tags: [kobe, new-paper]
image:
  feature:
link:
date: 2019-08-27
modified:
share: true
author: kobe_desender
---

[Desender K, Boldt A, Verguts T & Donner TH. (2019) Confidence Predicts Speed-accuracy Tradeoff for Subsequent Choices. eLife. 8: e43499.](https://kobedesender.files.wordpress.com/2019/08/elife-43499-v2.pdf)

By Kobe Desender & Tobias H Donner.

Humans can provide precise judgments of the accuracy of their choices. When we feel confident in a choice we have just made, the probability is high that it was actually correct. Conversely, when we feel uncertain, the probability of being correct is very low. In recent years, many researchers have examined computational and neural underpinnings of this subjective sense of confidence. A central question for the field is what sense of confidence is good for – in other words, how it is put to use in the brain (Meyniel et al, 2015).

Here, we put forward the hypothesis that the sense of confidence controls how much evidence we gather before making a new choice. The underlying assumption, which is well supported empirically, is that most decisions are based on the protracted accumulation of noisy “evidence”; the agent commits to a choice when a certain level of evidence supporting that particular choice has been accumulated (Bogacz et al, 2006; Gold & Shadlen, 2007). Now, when engaging in such a process, you will continuously face a tradeoff: gathering a lot of evidence before committing to a choice will make you highly accurate, but this comes at the expense of deciding slowly. Conversely, making choices based on little accumulated evidence will make you fast, but also error-prone. It is this so-called “speed-accuracy tradeoff” that we hypothesized might be modulated by the subjective sense of confidence about one’s previous decisions.

To test this hypothesis, we used an established algorithmic model of the above accumulation-to-bound process for two-choice tasks, the drift diffusion model (Ratcliff & McKoon, 2008). The drift diffusion model describes the evidence accumulation into a ‘decision variable’, which grows towards one of two ‘bounds’; when one of the two bounds is reached, the corresponding choice is made (see Figure A). The separation between both bounds determines how much evidence will be gathered (i.e., the higher the bound separation, the more evidence that needs to be integrated in order to reach a bound), and thus determines the tradeoff between speed and accuracy. We fit this model to choice and reaction time data of three different perceptual choice tasks (n = 67 people in total), each of which required participants to first report a choice, followed by subjective confidence ratings, and no trial-by-trial feedback (i.e. participants never knew for sure whether they were correct or wrong on the previous trial).

<figure>
  <img src="/images/Figure 1.jpg"
       alt="A sneak peak on our office">
  <figcaption>A picture of the name tags hanging just outside our new offices.</figcaption>
</figure>
Results summary for Desender et al, 2019, eLife. See blog text for details.

As predicted, the estimated separation between decisions bounds depended on the level of confidence they reported about the decision they had made on the previous trial (see panel B above). When participants reported low relative to high confidence on the previous trial, they increased their current decision bounds. Decision bounds were increased even further when participants perceived to have made an error. Importantly, this modulation by confidence was evident even when assessed separately for confidence ratings made on correct and on error trials only. This finding is important, as it generalizes our findings from previously reported, analogous effects of “post-error slowing”, which were based on the comparison between trials with correct and incorrect previous choices (Purcell & Kiani, 2016). We propose that in real-life settings, which one rarely have full certainty about the correctness of one’s decisions, humans generally use their subjective sense of confidence to continuously adjust their speed-accuracy tradeoff on the fly.

We also unraveled a neurophysiological signature of this online adjustment process. Previous EEG work in humans had shown that a centro-parietal evoked potential is sensitive to fine-grained levels of decision confidence (Boldt & Yeung, 2015). We reused this data, and re-fitted the drift diffusion model, but now replacing participants’ subjective confidence reports with single-trial amplitudes of their centro-parietal EEG signal. As expected, the results showed that higher amplitudes of this signal on the previous trial (i.e., probably reflecting high evidence for an error) predicted increased decision bounds (see panel C). This shows that the centro-parietal EEG signal is not only a sensitive indicator of subjective confidence, but it also seems to be used for the online adjustment of speed-accuracy-tradeoff. This provides an excellent starting point for unravelling the neural pathway that converts this neural confidence signal into the decision bound adjustment on the next trial.

We are excited about this work for a number of reasons. Fitting a computational decision model enabled us to uncover the latent variables affected by decision confidence. This is useful from a mechanistic perspective, because these latent variables are more directly relatable to measurable neural computations. For example, the adjustment of decision bounds seems to depend on cortical-striatal interactions (Lo & Wang, 2006). Further, this paper, as several other published or ongoing projects in our lab, showcases the strength of using multiple datasets in order to establish general principles (i.e., modulation of decision bounds by confidence) and set them apart from less consistent findings (i.e., an inconsistent effect of confidence on the next trial’s drift rate, which we observed in some, but not all datasets). Finally, our findings add to the growing realization that internally computed confidence signals play a key role in the selection and adjustment of “decision policies”, which in turn govern how (e.g. through speed-accuracy tradeoff) an agent forms basic decisions. In sum, our work has illuminated one important function of the subjective sense of confidence in the online control of behavior.

References

Bogacz, R., Brown, E., Moehlis, J., Holmes, P., & Cohen, J. D. (2006). The physics of optimal decision making: A formal analysis of models of performance in two-alternative forced-choice tasks. Psychological Review, 113: 700–765.
Boldt, A., & Yeung, N. (2015). Shared neural markers of decision confidence and error detection. Journal of Neuroscience, 35: 3478-3484.
Gold, J. I., & Shadlen, M. N. (2007). The neural basis of decision making. Annual Review of Neuroscience, 30, 535–561.
Lo, C.-C., & Wang, X.-J. (2006). Cortico-basal ganglia circuit mechanism for a decision threshold in reaction time tasks. Nature Neuroscience, 9: 956–963.
Meyniel, F., Sigman, M., & Mainen, Z. F. (2015). Confidence as Bayesian Probability: From Neural Origins to Behavior. Neuron, 88: 78–92.
Purcell, B. A., & Kiani, R. (2016). Neural Mechanisms of Post-error Adjustments of Decision Policy in Parietal Cortex. Neuron, 1–14.
Ratcliff, R., & McKoon, G. (2008). The Diffusion Decision Model: Theory and Data for Two-Choice Decision Tasks. Neural Computation, 20: 873–922.
