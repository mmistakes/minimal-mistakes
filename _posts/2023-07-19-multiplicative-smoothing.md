---
title: "Stable Explanations with Multiplicative Smoothing"
layout: single
excerpt: "Achieving stability guarantees for feature attribution methods"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: assets/images/multiplicative_smoothing/x289.png
  teaser: assets/images/multiplicative_smoothing/x289.png
  actions:
    - label: "Paper"
      url: https://arxiv.org/abs/2307.05902
    - label: "Code"
      url: https://github.com/DebugML/multiplicative_smoothing
authors: 
  - Anton Xue
  - Rajeev Alur
  - Eric Wong
  

gallery_feature_attribution:
  - image_path: /assets/images/multiplicative_smoothing/x289.png
    title: The full image
  - image_path: /assets/images/multiplicative_smoothing/x289_ab.png
    title: Explanation-masked image

gallery_consistency:
  - image_path: /assets/images/multiplicative_smoothing/x289.png
    title: The full image
  - image_path: /assets/images/multiplicative_smoothing/m289.png
    title: The explanation mask
  - image_path: /assets/images/multiplicative_smoothing/x289_ab.png
    title: Explanation-masked image

gallery_not_stable:
  - image_path: /assets/images/multiplicative_smoothing/x289_ab_box.png
    title: The full image
  - image_path: /assets/images/multiplicative_smoothing/x289_bad_box.png
    title: Explanation-masked image
    title: Not Stable

gallery_explainable_model:
  - image_path: /assets/images/multiplicative_smoothing/explainable_model_transparent.png
    title: Explainable Model

gallery_mus_pipeline:
  - url: /assets/images/multiplicative_smoothing/durt_voting_transparent.png
    image_path: /assets/images/multiplicative_smoothing/durt_voting_transparent.png
    title: Pipeline of MuS

gallery_experiments:
  - url: /assets/images/multiplicative_smoothing/blog_plots.png
    image_path: /assets/images/multiplicative_smoothing/blog_plots.png
    title: Experiments


---

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>


> Explanation methods for machine learning models tend to not provide any formal guarantees and may not reflect the underlying decision-making process.
> In this post, we analyze stability as a property for reliable feature attribution methods.
> We show that relaxed variants of stability are guaranteed if the model is sufficiently Lipschitz smooth with respect to the masking of features. 
> To achieve such a model, we develop a smoothing method called Multiplicative Smoothing (MuS) and demonstrate its theoretical and practical effectiveness.


Modern machine learning models are incredibly powerful at challenging prediction tasks but notoriously black-box in their decision-making.
One can therefore achieve impressive performance without fully understanding **why**.
In domains like healthcare, finance, and law, it is not enough that the model is accurate --- the model's reasoning step must also be well-justified and explainable.
In order to fully wield the power of such models while ensuring reliability and trust, a user needs accurate and insightful explanations of model behavior.


At its core, explanations of model behavior aim to accurately and succinctly describe why a decision was made, often with human comprehension as the objective.
However, what constitutes the form and content of a good explanation is highly context dependent.
A good explanation varies by problem domain (e.g. vision vs. language), the objective function (e.g. classification vs. regression), and the intended audience (e.g. beginners vs. experts).
All of these are critical factors to consider when engineering for comprehesion.
In this post we will focus on a popular family of explanation methods known as **feature attributions** and study some provable guarantees that one can attain.


For extensive surveys on explainability methods in explainable AI (XAI), we refer to
[Burkart et al.](https://arxiv.org/abs/2011.07876)
and
[Nauta et al.](https://arxiv.org/abs/2201.08164).



## Explanations with Feature Attributions
Feature attribution methods aim to idenitfy the input features most important to a prediction.
Given a model and input, a feature attribution method assigns each input feature a score of its relative importance to the model output.
Well known feature attribution methods include:
gradient saliency
([CNN models](https://arxiv.org/abs/1312.6034), 
[Grad-CAM](https://arxiv.org/abs/1610.02391),
[SmoothGrad](https://arxiv.org/abs/1706.03825)).
surrogate model-based
([LIME](https://arxiv.org/abs/1602.04938),
[SHAP](https://arxiv.org/abs/1705.07874)),
axiomatic approaches
([Integrated Gradients](https://arxiv.org/abs/1703.01365),
[SHAP](https://arxiv.org/abs/1705.07874)),
and [others](https://arxiv.org/abs/2201.08164) .



In this post we focus on _binary-valued_ feature attributions, wherein the attribution scores denote the selection ($$1$$ values) or exclusion ($$0$$ values) of features for the final explanation.


<!--
{% include gallery id="gallery_feature_attribution" layout="half" caption="(Left) The original image. (Right) The top-25% of features, as selected by SHAP. $$f(x) = a$$" %}
-->


<figure>
<div style="display:flex; margin:auto">
  <div style="flex:1;" align="center">
    <img src="/assets/images/multiplicative_smoothing/x289.png"/>
    <br/> Full image $x$
  </div>

  <div>
  <div style="margin:5%; height:80%; display:flex; justify-content:center; flex-direction:column" align="center">
    Feature attribution method

    $$\longrightarrow$$
  </div>
  </div>

  <div style="flex:1;" align="center">
    <img src="/assets/images/multiplicative_smoothing/m289.png"/>
    <br/> Explanation $\alpha$
  </div>
</div>

<figcaption>
  The binary feature attribution $\alpha = \varphi(x)$ is a vector where white is $1$ and black is $0$.
</figcaption>
</figure>


That is, given a model $$f$$ and input $$x$$ that yields prediction $$y = f(x)$$, a feature attribution method $$\varphi$$ yields a binary vector $$\alpha = \varphi(x)$$ where $$\alpha_i = 1$$ iff feature $$x_i$$ is important for $$y$$.


<!--
# Analyzing Feature Attributions
-->

Although many feature attribution methods exist with various heuristics for attribution scores, it is unclear whether they serve as good explanations.
In fact, there is remarkably little literature about their formal mathematical properties as relevant to explanations.
However, this benefits us with considerable freedom when studying feature attribution-based explanations, and we therefore begin with broader considerations about what makes a good explanation in general.
In particular, we propose that to comprehend and use _any_ explanation, the user must consider at minimum the two following questions:


* **Q1.** What is the appropriate metric of quality for evaluating the explanation?
* **Q2.** Does the explanation behave as expected with respect to this quality metric?

<!--
**Q1.** What is the appropriate metric of quality for evaluating this explanation?  
**Q2.** Does this explanation behave as expected with respect to this metric?
{: .notice}
-->


<!--
first, what is the _criteria_ that the explanation is designed for, and
second, how does this explanation _behave_?
In particular, we propose the behavior question based on the observation that one typically desires an explanation to be "reasonable" or "logical", which would then allow one to "explain the explanation" if needed.


We articulate these two points as the two following questions.

**Q1.** What is the metric of quality for this explanation?  
**Q2.** What are the formal properties with respect to this quality metric?
{: .notice}


We ask two key questions in studying explanation behavior.
1. How does one evaluate the quality of an explanation?
2. What are the desirable properties that one should expect with respect to this quality metric?
{: .notice}
-->

The first question concerns which inquiry this explanation is intended to resolve.
In our context, binary feature attributions aim to answer: "which features are evidence of the predicted class?", and any metric must appropriately evaluate for this.
The question of behavior is more subtle, but is based on the observation that one typically desires an explanation to be "reasonable".
A reasonable explanation promotes confidence as it allows one to "explain the explanation" if necessary, and in this post we will present and study _stability_ as one such criteria.



### Q1: Quality Metric
To resolve the question of a quality metric, we propose to use the original model, where consider a given input vector $$x$$ on classifier $$f$$ with output prediction $$y = f(x)$$.
The goal of the feature attribution method $$\varphi$$ is to generate a binary mask $$\alpha = \varphi(x)$$, where element-wise vector multiplication $$\odot$$ is used to yield an explanation-masked input $$x \odot \alpha$$.
We then evaluate the quality of $$\alpha$$ via the prediction of $$f(x \odot \alpha)$$.


<!--
{% include gallery id="gallery_consistency" layout="third" caption="(Left) The full image $$x$$, classified as \"Goldfish\". (Middle) The explanation $$\alpha$$. (Right). The explanation-masked image $$x \odot \alpha$$, which is consistently classified as \"Goldfish\"." %}
-->

<figure>
<div style="display:flex; margin:auto">
  <div style="flex:1;" align="center">
    <img src="/assets/images/multiplicative_smoothing/x289.png"/>
    <br/>
    Full image $x$
  </div>

  <div>
    <div style="width:40px; height:80%; display:flex; align-items:center; justify-content:center" align="center">
      $\odot$
    </div>
  </div>

  <div style="flex:1;" align="center">
    <img src="/assets/images/multiplicative_smoothing/m289.png"/>
    <br/>
    Explanation $\alpha$
  </div>

  <div>
    <div style="width:40px; height:80%; display:flex; align-items:center; justify-content:center" align="center">
      $=$
    </div>
  </div>

  <div style="flex:1;" align="center">
    <img src="/assets/images/multiplicative_smoothing/x289_ab.png"/>
    <br/>
    Masked $x \odot \alpha$
  </div>

</div>

<figcaption>
  Visual representation of the explanation-masked input $x \odot \alpha$.
  In this case both $f(x)$ and $f(x \odot \alpha)$ predict "Goldfish", where $f$ is the Vision Transformer model.
</figcaption>
</figure>



If $$\alpha$$ is a good explanation, then one should intuitively expect the explanation-masked $$f(x \odot \alpha)$$ to yield the same prediction as the original $$f(x)$$.
This form of masking is a common approach in domains like computer vision, and indeed modern neural architectures like [Vision Transformers](https://arxiv.org/abs/2010.11929) can accurately classify even heavily masked images.

<!--
Input masking is a common approach in computer vision, and is a natural method for evaluating feature attributions over images.
If $$\alpha$$ is a good explanation, then one should expect that $$x \odot \alpha$$ retains enough of the relevant features to recover the same classification as the full image.
Indeed, modern neural architectures like [Vision Transformers](https://arxiv.org/abs/2010.11929) can accurately classify heavily masked images, where only a small fraction of the full image is shown.
-->


### Q2: Stability as an Expected Behavior
Having picked a metric of quality, we next consider how an explanation should behave with respect to this metric.
Principally, we argue that a satisfactory explanation should be strongly confident in its claims, and we express this in two properties.
First, the explanation should be **consistent**: $$\alpha$$ should contain enough of the salient features such that $$f(x \odot \alpha)$$ and $$f(x)$$ both yield the same prediction.
Second, the explanation should be **stable**: $$\alpha$$ should contain so much of the salient features, such that including any more features does not alter the prediction of $$f(x \odot \alpha)$$.

In this post we focus on stability, which necessarily implies consistency.
We argue that stability is a desirable property, as it allows for greater predictablity when manipulating explanations.
However, _**many feature attribution methods are not stable!**_
An example of this is shown in the following.


<!--
Having picked a quality metric, we next consider desirable properties with repsect to such measures.
In this post we focus on the notion of **stability**.
Intuitively, we expect that the selected features in an explanation $$\alpha$$ should be sufficiently explanatory of the prediction, such that including any more features should not alter its explanatory meaning.
Because we have chosen to use the original model to evaluate explanation quality, there is a natural way to define "explanatory meaning".
In particular, the meaning of an explanation can be taken as the class it predicts.
That is, $$\alpha$$ means "Goldfish" with respect to input $$x$$ and classifier $$f$$ if evaluating $$f(x \odot \alpha)$$ predicts "Goldfish".
However, many feature attribution methods are not designed with stability in mind, and hence do not have stability guarantees.
-->

<!--
{% include gallery id="gallery_not_stable" layout="half" caption="(Left) \"Goldfish\". (Right) \"Axolotl\". For presentation we highlight differences are marked in a green box. This green box is not visible to the model." %}
-->


<figure>
<div style="display:flex; margin:auto">
  <div style="flex:1;" align="center">
    <img src="/assets/images/multiplicative_smoothing/x289_ab_box.png"/>
    <br/>
    $f(x \odot \alpha) = $ Goldfish
  </div>

  <div style="width:80px" align="center">
  </div>

  <div style="flex:1;" align="center">
    <img src="/assets/images/multiplicative_smoothing/x289_bad_box.png"/>
    <br/>
    $f(x \odot \alpha') = $ Axolotl
  </div>

</div>

<figcaption>
  A single added patch of perturbation with $\alpha' = \alpha + \varepsilon$ causes a prediction flip from "Goldfish" to "Axolotl".
  The difference is highlighted in a green box; this box is not visible to the model.
</figcaption>
</figure>



We argue that a lack of stability is undesirable, since revealing _more_ of the image should intuitively yield stronger evidence towards the overall prediction.
This is especialy the case if the proposed $$\alpha$$ was consistent to begin with.
Without stability, slightly modifying an explanation may induce a very different class, which suggests that $$\alpha$$ is merely a _plausible_ explanation rather than a _convincing_ explanation.
This may undermine user confidence, as one may believe that the given explanation are not sufficiently convincing.
This principle of stability is described as follows.


**Stability Principle:** once the explanatory features are selected, including more features should not alter its meaning.
{: .notice--info}


Our work studies **stability** as a desirable property for feature attributions.
We introduce a smoothing method, MuS, that can provide stability guarantees on top of any existing model and feature attribution method.



<!--
{% include gallery id="gallery_not_stable" layout="" caption="The full image (top left) classifies as \"Goldfish\", as does its partial masking (center). However, revealing one more patch of the original image now tricks the classifier into classifing \"Axolotl\"." %}


This behavior is undesirable, as one may intuitively expect that revealing __more__ of the image should give stronger evidence towards the classification.
This inconsistency in classification suggests that the selection of features may not be sufficiently explanatory for the desired class: the inclusion of additional features may sway the prediction.
We would like to avoid this behavior, and we formalize such notions in terms of **stability**, and show in the [next section](#stability-properties) how Multiplicative Smoothing can help.
Chiefly, the idea of explanation stability is summarized in the following point:

-->


<!--
A flaw in feature attribution methods is that they may often have difficulty answering the following questions:

* Does the metric of feature attribution (e.g. sensitivity) make sense?
* How does one translate this sensitivity into a quantifiable property (e.g. using gradients for sensitivity)
* Is this metric helpful for human comprehension?
* What formal mathematical guarantees should one expect this attribution to satisfy?
-->




## Stability Properties

In this section we formalize and discuss the aforementioned notion of stability, and show how relaxed variants of stability are attained if the model is Lipschitz smooth with respect to the masking of features.
This smoothness will be guaranteed by our proposed method, Multiplicative Smoothing (MuS).


<!--
We propose to jointly study the classifier model $$f$$ and the feature attribution method $$\varphi$$.
This is because any explanation is necessarily a function of both, and we call the pairing $$\langle f, \varphi \rangle$$ an **explainable model**.
This pairing is a light-weight abstraction, and evaluating $$\langle f, \varphi \rangle (x)$$ simply returns the pair $$\langle y, \alpha \rangle$$ where $$y = f(x)$$ and $$\alpha = \varphi(x)$$.
-->

<!--
{% include gallery id="gallery_explainable_model" layout="" caption="An _explainable model_ $$\langle f, \varphi \rangle$$ is a pairing of a classifier $$f$$ and afeature attribution method $$\varphi$$. Evaluating an input $$x$$ will output both a classification $$y$$ (here, evaluating to \"Goldfish\") and a binary-valued feature attribution mask $$\alpha$$. Element-wise multiplying $$x \odot \alpha$$ will produce a masked input." %}
-->

We consider models $$f : \mathbb{R}^{n} \to [0,1]^m$$, where the output is a class-probability vector whose coordinates denotes the relative confidence for each of the $$m$$ classes.
Explanations are then binary vectors $$\alpha \in \{0,1\}^n$$ that determine the selection of features from inputs $$x \in \mathbb{R}^n$$.


<!--
We first present the notion of consistency, which is a precursor to stability:
**Definition.** (Consistency) An explanation $$\alpha = \varphi(x)$$ is consistent if $$f(x) \cong f(x \odot \alpha)$$.
-->

<!--
**Definition.** (Consistency) The explainable model $$\langle f, \varphi \rangle$$ is consistent at $$x$$ if $$f(x) \cong f(x \odot \varphi(x))$$.
-->


<!--
We use the congruence $$\cong$$ to mean that two predictions yield the same class.
In particular, the classifier $$f : \mathbb{R}^{n} \to [0,1]^m$$ operates as $$y = f(x)$$.
Each input $$x$$ has $$n$$ features (e.g. $$n = 3 \times 224 \times 224$$ for images),
and each output $$y$$ is a logit vector, i.e. a vector whose elements denotes the class probability of each of the $$m$$ labels.
The class of a prediction $$y$$ is then the index of its largest coordinate (i.e. $$\text{argmax}_{i}\, y_i$$), and we say that two vectors $$y \cong y'$$ if they have the same class.
-->


<!--
Before presenting stability, it will be useful to present the notion of supersets of features in an explanation vector.
For two binary vectors $$\alpha, \alpha'$$, we write $$\alpha \succeq \alpha'$$ iff $$\alpha$$ includes all the features selected by $$\alpha'$$.
That is, $$\alpha \succeq \alpha'$$ iff at every coordinate $$\alpha_i \geq \alpha_i '$$, which we remark is a [partial ordering](https://en.wikipedia.org/wiki/Partially_ordered_set).
This then gives us the sufficient vocabulary to formalize the stability principle described earlier.
-->

**Definition.** (Stability) An explanation $$\alpha = \varphi(x)$$ is stable if $$f(x \odot \alpha') \cong f(x \odot \alpha)$$ for all $$\alpha' \succeq \alpha$$.

We use the congruence operator $$\cong$$ to mean that two different model outputs $$y, y' \in [0,1]^m$$ share the same class, i.e. that they share the same largest coordinate position.
For two binary vectors we write $$\alpha' \succeq \alpha$$ to mean that $$\alpha'$$ supersets the selected features of $$\alpha$$.
That is, $$\alpha' \succeq \alpha$$ iff each $$\alpha_i ' \geq \alpha_i$$.

This definition of stability means that including additional features into $$\alpha$$ to yield $$\alpha'$$ will not change the prediction.
We also remark that stability of $$\alpha = \varphi(x)$$ necessarily implies its _consistency_: which is when $$f(x) \cong f(x \odot \alpha)$$.

<!--
**Definition.** (Stability) The explainable model $$\langle f, \varphi \rangle$$ is stable at $$x$$ if $$f(x \odot \alpha) \cong f(x \odot \varphi(x))$$ for all $$\alpha \succeq \varphi(x)$$.
-->


However, it is not clear how to efficiently enforce stability in practice.
This is because stability is defined as _all_ $$\alpha' \succeq \alpha$$, and so there is $$2^{n - k}$$ different choices of $$\alpha'$$ to consider, where $$k$$ is the number of selected features in $$\alpha = \varphi(x)$$.
For complex models like neural networks, it is not immediately obvious how to incorporate such stringent guaratees of stability without incurring a non-trivial accuracy or speed penalty.
This challenge of enforcing the above criteria motivates us to introduce _incremental stability_ as a relaxed condition, which we present next.



### Incremental Stability

Rather than enforcing a property over all $$\alpha \succeq \varphi(x)$$, we instead aim for local versions.
In particular, we will focus on values of $$\alpha \succeq \varphi(x)$$ where $$\alpha$$ is close to $$\varphi(x)$$.
We call the stability results for such $$\alpha$$ **incremental stability**, and refer to our
[paper](https://arxiv.org/abs/2307.05902)
for different variants of stability.

To measure explanation proximity, we introduce a metric of dissimilarity between binary vectors:

$$ \Delta (\alpha, \alpha') = \# \{i : \alpha_i \neq \alpha_i '\} $$

We remark that on binary vectors this $$\Delta$$ is exactly the $$\ell^1$$ metric.
This notion then allows us to precisely quantify the quality of would-be explanations close to $$\varphi(x)$$.

<!--
In this post we show how Lipschitz smoothness is used to enforce stability at the extreme values of $$\alpha$$.
We begin with the $$\alpha$$ values close to $$\varphi(x)$$, and call this notion _incremental stability_.
-->

**Definition.** (Incremental Stability) An explanation $$\alpha = \varphi(x)$$ is incrementally stable with radius $$r$$ if $$f(x \odot \alpha') \cong f(x \odot \alpha)$$ for all $$\alpha' \succeq \alpha$$ where $$\Delta(\alpha', \alpha) \leq r$$.

<!--
**Definition.** (Incremental Stability). The explainable model $$\langle f, \varphi \rangle$$ is incrementally stable at $$x$$ with radius $$r$$ if $$f(x \odot \alpha) \cong f(x \odot \varphi(x))$$ for all $$\alpha \succeq \varphi(x)$$ where $$\Delta(\alpha, \varphi(x)) \leq r$$.
-->

Incremental stability at $$x$$ means that up to $$r$$ features may be added to $$\alpha = \varphi(x)$$ without altering the explanatory meaning.
Importantly, we need for $$r \geq 1$$ to have a non-trivial guarantee.

Note that incremental stability does not imply consistency, in contrast to stability.
In our brodder context, we would therefore like $$\alpha = \varphi(x)$$ to be both _consistent_ and _incrementally stable_ with radius $$r \geq 1$$.
Consistency means that $$\alpha$$ is explanatory of the prediction, while incremental stability means that the prediction is locally robustness to the inclusion of features.



<!--
At the other extreme for values of $$\alpha$$ close to $$\varphi(x)$$ we present decremental stability.

**Definition.** (Decremental Stability). The explainable model $$\langle f, \varphi \rangle$$ is decrementally stable at $$x$$ with radius $$r$$ if $$f(x \odot \alpha) \cong f(x \odot \varphi(x))$$ for all $$\alpha \succeq \varphi(x)$$ where $$\Delta(\mathbf{1}, \alpha) \leq r$$.

One may think of decremental stability as measuring the _accuracy_ of the explanation method: $$\varphi(x)$$ selects the absolutely critical features, whose exclusion (up to a count of $$r$$) from the full image $$x$$ would cause misclassification.
-->


### Lipschitz Smoothness for Incremental Stability

It is easy to check whether incremental stability holds provided that we have smoothness information about $$f$$.
In particular, we will use the notion of _Lipschitz smoothness_ with respect to the masking of features.
If $$f$$ is Lipschitz in this manner, then we can provably guarantee a radius of incremental stability through our smoothing method MuS.


Fundamentally, Lipschitz smoothness aims to measure the change of a function in response to input perturbations.
In the context of masking inputs, the goal is to compare the difference between $$f(x \odot \alpha)$$ and $$f(x \odot \alpha')$$ as a function of $$\Delta (\alpha, \alpha')$$.
Specifically, we say that $$f$$ is $$\lambda$$-Lipschitz to the masking of features if

$$ \mathsf{outputDiff}(f(x \odot \alpha), f(x \odot \alpha')) \leq \lambda \Delta (\alpha, \alpha') $$

where $$\mathsf{outputDiff}$$ is a metric of difference on the classifier output that we further detail in our
[paper](https://arxiv.org/abs/2307.05902).
In effect, the above posits that the change in confidence scores from $$f(x \odot \alpha)$$ to $$f(x \odot \alpha')$$ is bounded by $$\lambda \Delta (\alpha, \alpha')$$.
Under this assumption, sufficiently small changes in $$ \lambda \Delta (\alpha, \alpha')$$ can provably guarantee that $$ f(x \odot \alpha) \cong f(x \odot \alpha')$$.
Observe that a smaller Lipschitz constant $$\lambda$$ is generally desirable, as it allows one to tolerate larger $$\Delta (\alpha, \alpha')$$.

Quantifying the admissible perturbations to an explanation $$\alpha = \varphi(x)$$ in relation to the Lipschitz smoothness of $$f$$ is one of our main results, which we sketch below.

**Theorem Sketch.** (Radius of Incremental Stability)
Suppose that $$f$$ is $$\lambda$$-Lipschitz to the masking of features, then an explanation $$\alpha = \varphi(x)$$ is incrementally stable with radius $$r = \mathsf{confidenceGap}(f(x \odot \alpha)) / (2 \lambda)$$.
{: .notice--info}

The $$\mathsf{confidenceGap}$$ function computes the difference between the first and second highest confidence classes.
A greater confidence gap indicates that $$f$$ is more confident about its prediction, and that the second-best choice does not even come close.
We next show how MuS can guarantee Lipschitz smoothness with respect to the masking of features.

<!--
**Theorem (Sketch).** (Incremental Stability).
Consider an explainable model $$\langle f, \varphi \rangle$$ where for all $$x$$ the mapping $$g(x, \alpha) = f(x \odot \alpha)$$ is $$\lambda$$-Lipschitz in $$\alpha$$ with respect to $$(\Delta, \Gamma)$$.
Then at any $$x$$ the radius of incremental stability is
$$r = [g_A (x, \varphi(x)) - g_B (x, \varphi(x))] / (2 \lambda)$$.
{: .notice}

The difference $$g_A - g_B$$ is referred to as the logit gap, with $$g_A, g_B$$ the first and second-largest logits of $$g$$.
The logit gap can be interpreted as a metric of _confidence_: a larger logit gap means that the classifier $$f$$ is more confident about its prediction, and that the second-best choice does not even come close.
We next show how this Lipschitz smoothness is attained using our technique, MuS.
-->




## MuS for Lipschitz Smoothness

The goal of smoothing is to transform a base classifier $$h : \mathbb{R}^n \to [0,1]^m$$ into a smoothed classifier $$f : \mathbb{R}^n \to [0,1]^m$$, such that $$f$$ is $$\lambda$$-Lipschitz with respect to the masking of features.
Our key insight is that randomly dropping features from the input attains the desired smoothness, which we will simulate by sampling $$N$$ binary masks $$s^{(1)}, \ldots, s^{(N)} \sim \mathcal{D}$$.
Many choices of $$\mathcal{D}$$ will in fact work, but one may intuit it as the $$n$$-dimensional coordinate-wise iid $$\lambda$$-parameter Bernoulli distribution $$\mathcal{B}^n(\lambda)$$.

Given input $$x$$ and base classifier $$h$$, the evaluation of $$f(x)$$ is shown in the following and can be understood in three stages.

{% include gallery id="gallery_mus_pipeline" layout="" caption="The smoothed output $$f(x)$$ is an average over evaluations of $$h(x \odot s^{(1)}), \ldots, h(x \odot s^{(N)})$$." %}

<!--
In particular, we will drop features from $$x$$ uniformly at random with probability $$1 - \lambda$$ by sampling binary masks $$s$$, where each coordinate is distributed as $$\mathrm{Pr}[s_i = 1] = \lambda$$.
We will then define $$f$$ as follows:

$$ f(x) = \underset{s \sim \mathcal{D}}{\mathbb{E}}\, h(x \odot s), \quad \text{with each $s_i \sim \mathcal{B}(\lambda)$}.$$

We say that $$f$$ is the MuS-smoothing of $$h$$.
Here $$\mathcal{D}$$ is a distribution over binary masks and $$\mathcal{B}(\lambda)$$ is the Bernoulli distribution with probability parameter $$\lambda > 0$$.
That is, each $$s_i = 1$$ with probability $$\lambda$$, and $$s_i = 0$$ with probability $$1 - \lambda$$.
We defer discussion on explicit constructions of $$\mathcal{D}$$, since many choices are valid, and for now assume that we can sample from it with the stated properties.

Given $$x$$, the evaluation of $$f(x)$$ can be understood as a three-stage process, and is illustrated in the following figure.

{% include gallery id="gallery_mus_pipeline" layout="" caption="The smoothed output $$f(x)$$ is an average over evaluations of $$h(x \odot s^{(1)}), \ldots, h(x \odot s^{(N)})$$." %}
-->

<!--
{% include gallery id="gallery_mus_pipeline" layout="" caption="Evaluating the MuS-smoothed classifier $$f$$ using the base classifier $$h$$ is done in three stages. (**Stage 1**) Generate $$N$$ samples of binary masks $$s^{(1)}, \ldots, s^{(N)} \in \{0,1\}^n$$, where each coordinate is Bernoulli with parameter $$0 \leq \lambda \leq 1$$. (**Stage 2**) Apply each mask on the input to yield $$x \odot s^{(i)}$$ for $$i = 1, \ldots, N$$. (**Stage 3**) Average over $$h(x \odot s^{(i)})$$ to compute $$f(x)$$, and note that the predicted class is is given as a weighted average." %}
-->


* (**Stage 1**) Sample binary masks $$s^{(1)}, \ldots, s^{(N)} \sim \mathcal{D}$$.
* (**Stage 2**) Generate masked inputs $$x \odot s^{(1)}, \ldots, x \odot s^{(N)}$$.
* (**Stage 3**) Average over $$h(x \odot s^{(1)}), \ldots, h(x \odot s^{(N)})$$. This average is the value of $$f(x)$$.

In expectation, this $$f$$ is $$\lambda$$-Lipschitz with respect to the masking of features.
We remark that this $$\lambda$$ is fixed before smoothing, and doubles as both the keep-probability and the Lipschitz constant.
In addition, this smoothing is applied for any $$x$$, even explanation-masked inputs like $$x = x' \odot \alpha$$.


Although it is simple to view $$\mathcal{D}$$ as $$\mathcal{B}^n (\lambda)$$, there are multiple valid choices for $$\mathcal{D}$$.
In particular, it suffices that each coordinate of $$s \sim \mathcal{D}$$ is _marginaly_ Bernoulli: that is, each $$s_i \sim \mathcal{B}(\lambda)$$.
The distribution $$\mathcal{B}^n (\lambda)$$ will of course satisfy this marginality condition, but so will others.
We now present our main smoothing result.


**Theorem Sketch.** (MuS)
Let $$s \sim \mathcal{D}$$ be any random binary vector where each coordinate is marginally $$s_i \sim \mathcal{B}(\lambda)$$.
Consider any $$h$$ and define $$f(x) = \underset{s \sim \mathcal{D}}{\mathbb{E}}\, h(x \odot s)$$, then $$f$$ is $$\lambda$$-Lipschitz to the masking of features.
{: .notice--info}


Not assuming independence in $$\mathcal{D}$$ has strong implications for efficiently evaluating $$f$$:
if $$\mathcal{D}$$ were coordinate-wise independent (e.g. $$\mathcal{B}^n(\lambda)$$),
then one needs $$N = 2^n$$ deterministic samples of $$s \sim \mathcal{D}$$ to _exactly_ evaluate $$f$$, which may be prohibitively expensive.
We further discuss in our
[paper](https://arxiv.org/abs/2307.05902)
how one can inject structured statistical dependence into $$\mathcal{D}$$ to allow for efficient evaluations of $$f$$ in $$N \ll 2^n$$ samples.


<!--
**Theorem Sketch.** (MuS) Let $$\mathcal{D}$$ be a distribution on binary masks where each coordinate of $$s \sim \mathcal{D}$$ is marginally $$\mathsf{Bern}(\lambda)$$.
Consider any $$h$$ and define $$f(x) = \underset{s \sim \mathcal{D}}{\mathbb{E}}\, h(x \odot s)$$, then $$f$$ is $$\lambda$$-Lipschitz to the masking of features.


**Theorem.** (MuS) Let $$\mathcal{D}$$ be any distribution on $$\{0,1\}^n$$ where each coordinate of $$s \sim \mathcal{D}$$ is distributed as $$s_i \sim \mathcal{B}(\lambda)$$.
Consider any $$h : \mathbb{R}^n \to [0,1]$$ and define the mapping
$$g(x, \alpha) = \underset{s \sim \mathcal{D}}{\mathbb{E}}\, h(x \odot \tilde{\alpha})$$
with $$\tilde{\alpha} = \alpha \odot s$$.
Then $$g(x, \cdot) : \{0,1\}^n \to [0,1]$$ is $$\lambda$$-Lipschitz in the $$\ell^1$$ norm for all $$x$$.
-->



<!--
## Related Works

We present some related works to explainablation methods in XAI.
For surveys,
[Burkart et al.](https://arxiv.org/abs/2011.07876)
offers a broad summary of the existant approaches.
The work of
[Nauta et al.](https://arxiv.org/abs/2201.08164) 
presents a general categorization of the different quantiative properties desirable when studying explanations.

For feature attributions in particular, there exist a large number of ways to select the importance score.
A short sampling of such methods is given below:

* **Gradient Saliency:** the sensitivity (gradient) of features or network components are used as a proxy to importance.
Notable works include earlier ones like [applying saliency maps to CNN models](https://arxiv.org/abs/1312.6034), and later ones like [Grad-CAM](https://arxiv.org/abs/1610.02391) and [SmoothGrad](https://arxiv.org/abs/1706.03825).
The common theme is that gradient information is used in some manner.

* **Surrogate Models:** a simplified model that is considered more explainable is used.
This simplified model is called the surrogate model, and is often taken from a model architecture that is considered explainable by construction, e.g. linear models and decision-trees.
Well-known examples include [LIME](https://arxiv.org/abs/1602.04938) and [SHAP](https://arxiv.org/abs/1705.07874).

* **Axiomatic Approach:**
Attribution scores are selected so that they either satisfy or approximate some proposed set of axioms.
Well-known examples include [SHAP](https://arxiv.org/abs/1705.07874), which is based on [Shapley value](https://arxiv.org/abs/1908.08474).
Another is [Integrated Gradients](https://arxiv.org/abs/1703.01365), which is also another gradient saliency-based method.

* **Hybrid-Domain Approaches:**
Some of these methods seek to combine different domains to produce an explanation, for instance by [using natural language explanations](https://arxiv.org/abs/1805.03818) for classification tasks.
-->


## Empirical Evaluations


We refer to our
[paper](https://arxiv.org/abs/2307.05902)
for a comprehensive suite of experiments that evaluate the effectiveness of MuS.
In this post, we showcase two experiments in which we ask the following:

* **E1**. How good are the stability guarantees?
* **E2**. What is the cost of smoothing?

All experiments are run with $$\langle f, \varphi \rangle$$ where $$f$$ is
[Vision Transformer](https://arxiv.org/abs/2010.11929)
and $$\varphi$$ is
[SHAP](https://arxiv.org/abs/1705.07874)
with top-25% feature selection.
A sample of $$2000$$ images are taken from
[ImageNet1K](https://www.image-net.org/challenges/LSVRC/2012/index.php).
We report the radius $$r$$ as a fraction of the total feaures, i.e. as $$r / n$$ where $$n = 3 \times 224 \times 224$$.
We present our results in the following figure with E1 on the left and E2 on the right.

{% include gallery id="gallery_experiments" layout="" caption="(Left) E1 curves that show how often consistency and incremental stability hold as a function of the guaranteeable radius. This curve serves to demonstrate the effectiveness of $$\varphi$$ (here: SHAP) in conjunction with MuS. (Right) E2 curves that show the accuracy obtained as a function of guarnateeable radius, under the assumption that $$\varphi(x) = \mathbf{1}$$. This essentially measures the quality of MuS independent of the choice of $$\varphi$$." %}

### E1: Goodness of Stability Guarantees
There exists a nautral measure of quality for stability guarantees over a dataset: what radii are achieved, and at what frqequency.
In this experiment we show how different values of $$\lambda$$ affect the rates at which the desired property (consistency and incremental stability) hold up to some radius $$r$$ (expressed as $$r /n$$).
We see that as $$\lambda$$ decreases (i.e. more noise), we achieve larger radii of guarantees, but overall the generated explanation is less consistent, i.e. at the far left, since everything is trivially incrementally stable with radius $$r = 0$$.


### E2: Cost of Smoothing
Here we plot the accuracy at different radii (i.e. the certified accuracy) when one evaluates $$f(x)$$ using different $$\lambda$$.
Note that this is equivalent to taking $$\varphi(x) = \mathbf{1}$$, the binary vector of all ones, and we remark that this is related to a notion of _decremental stability_ that is further discussed inour paper.
We see that as $$\lambda$$ decreases, one can achieve greater radii at a small degredation to accuracy.
This suggests that our smoothing process does not significantly harm the classifier accuracy, and that with a more careful selection and construction of $$\varphi$$ for E1 we may improve performance.

### Discussion
We remark there is an upper-bound on the radius of stability MuS can guarantee.
In particular, we will always have a radius of $$r \leq 1 / (2 \lambda)$$, which explains why curves for the same value of $$\lambda$$ have the same zero-points.
This upper-bound is because our results for smoothing requires that the classifier $$f$$ be bounded, and we pick a range of $$[0,1]^m$$ without loss of generality.


## Conclusion
We study provable stability guarantees for binary feature attribution methods through the framework of explainable models.
A selection of features is stable if the additional inclusion of other features do not alter its explanatory power.
We show that if the classifier is Lipschitz with respect to the masking of features, then one can guarantee relaxed variants of stability.
To achieve this Lipschitz condition we develop a smoothing method called Multiplicative Smoothing (MuS).
We show that MuS yields strong stability guarantees at only a small cost to accuracy.



### Citation

> @misc{xue2023stability,  
      author = {Anton Xue and Rajeev Alur and Eric Wong},  
      title = {Stability Guarantees for Feature Attributions with Multiplicative Smoothing},  
      year = {2023},  
      eprint = {2307.05902},  
      archivePrefix = {arXiv},  
      primaryClass = {cs.LG}  
}



