---
title: "Sum-of-Parts Models: Faithful Attributions for Groups of Features"
layout: single
excerpt: "Overcoming fundamental barriers in feature attribution methods with grouped attributions"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: assets/images/sum_of_parts/weak_lensing_maps.png
  teaser: assets/images/sum_of_parts/weak_lensing_maps.png
  actions:
    - label: "Paper"
      url: https://fallcat.github.io/assets/pdf/sop_preprint.pdf
    - label: "Code"
      url: https://github.com/DebugML/sop
authors:
  - Weiqiu You
  - Helen Qu
  - Marco Gatti
  - Bhuvnesh Jain
  - Eric Wong

gallery_grouped_attributions:
  - url: /assets/images/sum_of_parts/group_attribution.png
    image_path: /assets/images/sum_of_parts/group_attribution.png
    title: Grouped Attributions

gallery_sop_model:
  - url: /assets/images/sum_of_parts/sop_model.png
    image_path: /assets/images/sum_of_parts/sop_model.png
    title: Sum-of-Parts Model

gallery_void_cluster:
  - image_path: /assets/images/sum_of_parts/voids.png
    title: Voids
  - image_path: /assets/images/sum_of_parts/clusters.png
    title: Clusters

gallery_weak_lensing_maps:
  - image_path: /assets/images/sum_of_parts/weak_lensing_maps.png
    title: Weak Lensing Maps

sop_galleries:
  - id: 100
    original:
      image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/100/original.png
      title: 100_original
    masks:
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/100/100_0.png
          title: 100_0
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/100/100_7.png
          title: 100_7
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/100/100_31.png
          title: 100_31
  - id: 101
    original:
      image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/101/original.png
      title: 101_original
    masks:
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/101/101_9.png
          title: 101_9
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/101/101_12.png
          title: 101_12
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/101/101_45.png
          title: 101_45
  - id: 102
    original:
      image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/102/original.png
      title: 102_original
    masks:
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/102/102_4.png
          title: 102_4
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/102/102_18.png
          title: 102_18
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/102/102_41.png
          title: 102_41
  - id: 103
    original:
      image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/103/original.png
      title: 103_original
    masks:
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/103/103_0.png
          title: 103_0
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/103/103_10.png
          title: 103_10
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/103/103_39.png
          title: 103_39
  - id: 104
    original:
      image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/104/original.png
      title: 104_original
    masks:
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/104/104_0.png
          title: 104_0
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/104/104_2.png
          title: 104_2
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/104/104_46.png
          title: 104_46
  - id: 105
    original:
      image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/105/original.png
      title: 105_original
    masks:
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/105/105_27.png
          title: 105_27
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/105/105_10.png
          title: 105_10
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/105/105_40.png
          title: 105_40
  - id: 106
    original:
      image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/106/original.png
      title: 106_original
    masks:
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/106/106_3.png
          title: 106_3
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/106/106_4.png
          title: 106_4
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/106/106_27.png
          title: 106_27
  - id: 107
    original:
      image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/107/original.png
      title: 107_original
    masks:
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/107/107_22.png
          title: 107_22
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/107/107_25.png
          title: 107_25
        - image_path: /assets/images/sum_of_parts/blog_figs_sop/figs/107/107_6.png
          title: 107_6

attr_methods:
  - id: 1
    name: lime
    caption: LIME
  - id: 2
    name: shap
    caption: SHAP
  - id: 3
    name: rise
    caption: RISE
  - id: 4
    name: gradcam
    caption: Grad-CAM
  - id: 5
    name: intgrad
    caption: IntGrad
  - id: 6
    name: fresh
    caption: FRESH

---
<style>
.histogram-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
}

.histogram-row > * {
    flex: 0 0 48%; /* this ensures the child takes up 48% of the parent's width (leaving a bit of space between them) */
}

</style>

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

> We identify a fundamental barrier for feature attributions in faithfulness tests.
> To overcome this limitation, we propose grouped attributions as opposed to individual feature attributions.
<!-- where groups of features are selected with each given an attribution score, and develop a model to generate and use the groups. -->
> Our model finds faithful groups and helps cosmologists discover knowledge about dark matter and galaxy formation.


<!-- In many high-stakes domains like medicine, law, and automation, important decisions must be backed by well-informed and well-reasoned arguments.
However, many machine learning (ML) models are not able to give explanations for their behaviors. -->
Feature attribution is a type of explanations for machine learning (ML) models.
Specifically, it identifies input features that are relevant to the prediction.
<!-- One type of explanations for ML models is _feature attribution_: the identification of input features that were relevant to the prediction. -->
For example, in medicine, ML models can assist physicians in diagnosing a variety of lung, heart, and other chest conditions from X-ray images.
However, physicians only trust the decision of the model if an explanation identifies regions of the X-ray that make sense.
<!-- Such explanations are increasingly requested as new biases are discovered in these models. -->

<!-- Different qualities of feature attribution methods are considered important in by different end users: consistency, stability, human comprehensibility, faithfulness, etc. -->
To obtain useful explanations, researchers have proposed various feature attribution methods.
For example, some post-hoc methods include building surrogate models ([LIME](https://arxiv.org/abs/1602.04938),
[SHAP](https://arxiv.org/abs/1705.07874)), inspecting the gradients ([Grad-CAM](https://arxiv.org/abs/1610.02391), [Integrated Gradients](https://arxiv.org/abs/1703.01365)), or perturbing the inputs ([RISE](https://arxiv.org/abs/1806.07421), [Anchor](https://homes.cs.washington.edu/~marcotcr/aaai18.pdf)).
<!-- Another line or research -->
Other works have the attributions built into the ML models ([FRESH](https://arxiv.org/abs/2005.00115), [NAM](https://arxiv.org/abs/2004.13912), [GAM](https://www.cs.cornell.edu/~yinlou/papers/lou-kdd12.pdf), [GA$^2$M](https://www.cs.cornell.edu/~yinlou/papers/lou-kdd13.pdf)).
In this work, we discuss common barriers from faithfulness in both lines of research.

## Lack of Faithfulness in Feature Attributions
Feature attribution methods aim at attributing how much each feature $x_i\in\mathbb{R}^d$ contributes to the final prediction $y = f(x)$ in attribution $\alpha = \phi(x)$ where $\alpha_i \in [0, 1]$.
Larger $\alpha_i$ means that feature $x_i$ is more important for prediction $y$.

Let's look at some examples of what existing feature attribution methods offer:

<!-- < Put a toggle figure here to show feature attribution for previous methods > -->

<ul class="tab" data-tab="other-x-examples" data-name="otherxeg">
{% for i in (0..9) %}
<li class="{% if forloop.first %}active{% endif %}">
    <a href="#">Example {{ i | plus: 1 }} </a>
</li>
{% endfor %}
</ul>

<ul class="tab-content" id="other-x-examples" data-name="otherxeg">

{% for i in (0..9) %}
<!-- <li class="{% if forloop.first %}active{% endif %}">
    <div style="text-align: center; display: flex; justify-content: center; align-items: center;">
      <figure class="center ">
      <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/original.png" title="Example {{ forloop.index }}" class="image-popup">
      <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/original.png" alt="Original Image for {{ forloop.index }}" style="width: 95%">
      </a>
      <figcaption>Original Image</figcaption>
      </figure>
    {% for method in page.attr_methods %}
    <figure class="center">
        <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
          <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 100%">
        </a>
        <figcaption>{{ method.caption }}</figcaption>
    </figure>
    {% endfor %}
    </div>
</li> -->

<li class="{% if forloop.first %}active{% endif %}">
    <div style="text-align: center; display: flex; justify-content: center; align-items: center;">
        <!-- Original Image -->
        <figure class="center" style="margin-top: 0; margin-bottom: 10pt;">
            <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/original.png" title="Example {{ forloop.index }}" class="image-popup">
                <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/original.png" alt="Original Image for {{ forloop.index }}" style="width: 33%">
            </a>
            <figcaption style="display: block; margin-left: auto; margin-right: auto">Original Image</figcaption>
        </figure>
    </div>

    <!-- Masked Images - First Row -->
    <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
    {% for method in page.attr_methods %}
        {% if forloop.index <= 3 %}
        <figure class="center" style="margin-top: 0; margin-bottom: 10pt;">
            <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
                <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 100%">
            </a>
            <figcaption>{{ method.caption }}</figcaption>
        </figure>
        {% endif %}
    {% endfor %}
    </div>

    <!-- Masked Images - Second Row -->
    <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
    {% for method in page.attr_methods %}
        {% if forloop.index > 3 %}
        <figure class="center" style="margin-top: 0; margin-bottom: 10pt;">
            <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
                <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 100%">
            </a>
            <figcaption>{{ method.caption }}</figcaption>
        </figure>
        {% endif %}
    {% endfor %}
    </div>
</li>


{% endfor %}


</ul>

<!-- < maybe add some sentences to discuss how these explanations are hard to interpret? > -->
<!-- Each method gives a saliency map, which might describe [how including some pixels in a random mask is more or less likely to change prediction](https://arxiv.org/abs/1806.07421) or [how infinitesimally small change in the pixel slightly affects the prediction](https://arxiv.org/abs/1610.02391). -->
It is hard to interpret as the scores in each saliency map all have different meanings.
It is also unclear if these attributions are faithful.
<!-- The scores in each saliency map have different meanings. -->
<!-- The saliency maps themselves are hard to interpret, and it is unclear if these attributions are faithful. -->

An explanation of a machine learning model is considered "faithful" if it accurately reflects the model's decision-making process ([Lyu et al. 2022](https://arxiv.org/abs/2209.11326)).
For a feature attribution method, this means that the highlighted features should actually influence the model's prediction.
<!-- It is hard to say how much the attributions found by post-hoc methods faithfully reflect what the model uses to make the predictions, when the attribution methods are after the fact. -->
<!-- Built-in methods then have the advantage of being faithful by construction. -->
<!-- that how much the model uses each input feature is known by construction. -->

However, when inputs highly correlate with each other, even faithful-by-construction models can have a potential failure.
 <!-- if they attribute to input features individually. -->

### Curse of Dimensionality in Faithfulness Tests

Perturbation tests are a widely-used technique for evaluating faithfulness of an explanation.
<!-- These tests insert or delete various subsets of features from the input and check if the change in model prediction is in line with the scores from the feature attribution. -->
One type of perturbation test is _deletion_.
It measures how well the total attribution from a subset of features $S$ sligns with the change in model prediction when we remove the features from input $x$.
<!-- It checks if the change from deleting a subset of features from the input in model prediction is in line with the scores from the feature attribution. -->

**Definition.** (Deletion error) The _deletion error_ of an feature attribution $\alpha\in\mathbb{R}^d$ for a model $f:\mathbb R^d\rightarrow\mathbb R$ when removing a subset of features $S$ from an input $x$ is
<div align="center">
$$
\mathrm{DelErr}(\alpha, S) = \left|f(x) - f(x_{\lnot S}) - \sum_{i\in S} \alpha_i\right| \\
    \quad\textrm{where}\;\; (x_{\lnot S})_j = \begin{cases}
        x_j \quad \text{if}\;\; j \not \in S\\
        0 \quad \text{otherwise}
    \end{cases}
$$
</div>
The total deletion error is $\sum_{S\in\mathcal{P}} \mathrm{DelErr}(\alpha,S)$ where $\mathcal P$ is the powerset of $$\{1,\dots, d\}$$.

<!-- The deletion error measures how well the total attribution from features in $S$ aligns with the change in model prediction when removing the same features from $x$.  -->

Intuitively, a faithful attribution score of the $i$th feature should reflect the change in model prediction after the $i$th feature is removed and thus have low deletion error.

Can we achieve this low deletion error though?
Let's look at this simple example of monomial $p(x) = \prod_{i=1}^d x_i$:

<!-- we can see below that if we assign attribution scores to individual features -->

**Theorem Sketch.** (Deletion Error for Monomials) Let $p:\{0,1\}^d\rightarrow \{0,1\}$ be a multilinear monomial function of $d$ variables, $p(x) = \prod_{i=1}^d x_i$. Then, there exists an $x$ such that any feature attribution for $p$ at $x$ will incur exponential total deletion error.
{: .notice--info}

Supposed we have $x_i=1$ for all $i\in{1,\dots,d}$.
Removing any individual feature will result in the change of 1 in prediction.
Thus we give every feature an attribution of 1.

However, when we remove more features at a time, the total attribution increases and no longer lines up with the change of 1 in model prediction.
With exponentially many choices of subsets of features, there is exponentially growing total error.

<!-- For a simple monomial, if we have $x_i=1$ for all $i\in{1,\dots,d}$, removing any individual feature will result in the change of 1 in prediction, thus they should all be attributed with a score of 1. -->
<!-- However, removing $k$ features will also change the prediction for 1 to 0.
The sum of attribution, $k$, then does not align with the actual change of 1.
We can in fact prove that the total deletion error grows exponentially as the number of features $d$ grows since there are exponentially many ways to choose the features to delete while all giving high errors. -->
<!-- The intuition is that, deleting any feature by itself will incur the error, and the search of deleting the correct features one by one is growing exponentially, while all the features together are needed for the error to be none. -->
Thus assigning attribution scores to individual features will not be able to cap the error due to curse of dimensionality.

<!-- For the full proofs of the above deletion error and also theorems and proofs for insertion error, see our [paper](https://fallcat.github.io/assets/pdf/sop_preprint.pdf). -->

## Grouped Attributions Overcome Curse of Dimensionality

<!-- The exponential error in regular feature attribution methods motivates our search for attributions that overcomes the curse of dimensionality.
The inherent limitation of feature attributions here stems from the highly correlated features.
A standard feature attribution is limited to assigning one number to each feature.
This design is fundamentally unable to accurately model interactions between multiple features. -->

There is a fundamental problem in the above monomial example.
All the features are related as the prediction is their product, but we remove one feature at a time.
A natural thought is then:

_**Can we instead group features together, and each time only remove a group together?**_

We then present _grouped attributions_ as a different type of attributions.
Grouped attributions assign scores to groups of features instead of individual features.
A group only contributes its score if all of its features are present, as shown in the following example for images.

{% include gallery id="gallery_grouped_attributions" layout="" caption="Visualization of grouped attributions. For a set of group attributions, scores are assigned to groups of features instead of individual features. Each group has a binary assignment in whether or not to include each feature. The score for each group represents how much each group of features together contributes to the prediction. We can see that masks can be interpreted as objects kept and objects removed. In this example, group 2, which includes the fish and the predator, contributes 15% to predicting \"tench\", while group $$G$$, which has the fish and dark lines removed, contributes only 1% to predicting \"tench\", but 21% to predicting \"Rooster\"." %}


The concept of groups is then formalized as following:

**Grouped Attribution:** Let $x\in\mathbb R^d$ be an example, and let $S_1, \dots, S_G \in \{0,1\}^d$ designate $G$ groups of features where $j \in S_i$ if feature $j$ is included in the $i$th group. Then,  a grouped feature attribution is a collection $\beta = \{(S_i,c_i)\}_{i=1}^G$ where $c_i\in\mathbb R$ is the attributed score for the $i$th group of features $m_i$.
{: .notice--info}

There exists groups that can give zero deletion error for the monomial example.
We need to use one group for all the input features, and assign a score of 1 for the group.

To summarize, grouped attributions are able to overcome exponentially growing insertion and deletion errors when the features interact with each other.

In our work, we develop a class of models, SOP, that can generate and select important groups for attribution for any existing model.

## Our Approach: Sum-of-Parts Models
Our proposed grouped attributions consist of two parts: the subsets of features called groups $(S_1,\dots, S_G) \in [0,1]^d $ and the scores for each group $(c_1, \dots, c_G)$.

We divide our approach into two main modules: $\mathsf{GroupGen}$ which generates the groups $S_i$ of features from an input, and $\mathsf{GroupSelect}$ which assigns scores $c_i$ to select which groups to use for prediction.
The final prediction is then a weighted average of predictions from each group $y_i$ by score $c_i$, as shown in the following figure.

{% include gallery id="gallery_sop_model" layout="" caption="Structure of a Sum-of-Parts Model. A group generator $g$ first generates groups of features. Each group of features $$S_i\odot X$$ is then passed through the black-box model to obtain the group embedding $$z_i$$. A group selector $q$ then assigns a score $c_i$ to each group $i$'s representation. The partial logits are then aggregated with a weighted sum to get the predicted logit $$y$$ for a class." %}

Here are some examples of groups our model uses to predict one of ten classes in ImageNet:

<ul class="tab" data-tab="sop-examples" data-name="sopeg">
      <li class="active">
          <a href="#">Example 1 </a>
      </li>

      <li class="">
          <a href="#">Example 2 </a>
      </li>

      <li class="">
          <a href="#">Example 3 </a>
      </li>

      <li class="">
          <a href="#">Example 4 </a>
      </li>

      <li class="">
          <a href="#">Example 5 </a>
      </li>

      <li class="">
          <a href="#">Example 6 </a>
      </li>

      <li class="">
          <a href="#">Example 7 </a>
      </li>

      <li class="">
          <a href="#">Example 8 </a>
      </li>

</ul>
<ul class="tab-content" id="sop-examples" data-name="sopeg">

{% for gallery in page.sop_galleries %}
<li class="{% if forloop.first %}active{% endif %}">
<div style="text-align: center; display: flex; justify-content: center; align-items: center;">
  <!-- Original Image -->
  <figure class="center ">
  <a href="{{ gallery.original.image_path }}" title="Example {{ forloop.index }}" class="image-popup">
  <img src="{{ gallery.original.image_path }}" alt="Original Image for {{ gallery.id }}" style="width: 95%">
  </a>
  </figure>

  <!-- Masked Images -->
  <div style="display: flex; justify-content: space-between;">
    {% for mask in gallery.masks %}
    <figure class="center ">
    <a href="{{ mask.image_path }}" title="Example {{ forloop.parentloop.index }}" class="image-popup">
      <img src="{{ mask.image_path }}" alt="Masked Image {{ forloop.index }} for {{ gallery.id }}" style="width: 95%">
    </a>
    </figure>
    {% endfor %}
  </div>
</div>
</li>
{% endfor %}


</ul>

<!--
## Empirical Evaluations
We perform standard evaluations on ImageNet and PASCAL VOC 07 for image classification.
Our model gives good performance on insertion scores, grouped insertion scores and grouped deletion scores, while maintaining comparable accuracy.
For quantitative results, see our [paper](https://fallcat.github.io/assets/pdf/sop_preprint.pdf).

While outperforming other methods on standard metrics shows the advantage of our grouped attributions, the ultimate goal of interpretability methods is for domain experts to use these tools and be able to use the explanation in real settings.
To validate the usability of our approach, we collaborated with domain experts and used SOP to discover new cosmological knowledge about the expansion of the universe and the growth of cosmic structure. -->

To validate the usability of our approach for solving real problems, we collaborate with cosmologists to see if we can use the groups for scientific discovery.

## Case Study: Cosmology
Weak lensing maps in cosmology calculate the spatial distribution of matter density in the universe ([Gatti et al. 2021](https://academic.oup.com/mnras/article/504/3/4312/6211014?login=true)).
Cosmologists hope to use weak lensing maps to predict two key parameters related to the initial state of the universe: $\Omega_m$ and $\sigma_8$.

$\Omega_m$ captures the average energy density of all matter in the universe (such as radiation and dark energy), while $\sigma_8$ describes the fluctuation of this density.

Here is an example weak lensing map.

<!-- {% include gallery id="gallery_weak_lensing_maps" layout="" caption="Example of a weak lensing map." %} -->
<figure>
    <div>
        <img src="/assets/images/sum_of_parts/weak_lensing_maps.png" alt="Weak lensing map." style="display: block; margin-left: auto; margin-right: auto; width: 48%;"/>
    </div>
    <figcaption style="display: block; margin-left: auto; margin-right: auto">
      Example of a weak lensing map.
    </figcaption>
</figure>

<!-- <div class="center-half-width">
    <img src="/assets/images/sum_of_parts/weak_lensing_maps.png" alt="Weak lensing map." />
    <figcaption>
      Example of a weak lensing map.
    </figcaption>
</div> -->

There are two types of structures important for cosmologists: voids and clusters.
Voids are wide areas of negative density and appear as dark regions, whereas clusters are areas of concentrated high density and appear as bright dots in the weak lensing map.


{% include gallery id="gallery_void_cluster" layout="half" caption="(Left) Voids. (Right) Clusters." %}


Matilla et al. ([2020](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.102.123506)) and Ribli et al. ([2019](https://academic.oup.com/mnras/article/490/2/1843/5571096?login=true)) have developed deep learning models that can predict $\Omega_m$ and $\sigma_8$ from simulated weak lensing maps.
The following remains an open question in cosmology:

_**What structures from weak lensing maps can we use to infer $\Omega_m$ and $\sigma_8$?**_

We then use SOP on the trained CNN model and analyze the groups found by combining the segments.
We use watershed to pre-segment the images from [CosmoGridV1](http://www.cosmogrid.ai/) dataset into segments, and consider each segment as a feature.

One of our findings most surprising to cosmologists relates to the distinction between the two parameters $\Omega_m$ and $\sigma_8$.

We find that voids have especially higher weights for predicting $\Omega_m$, with average of 55.4% weight for $\Omega_m$ over 54.0% weight for $\sigma_8$. Clusters, especially high-significance ones, have higher weights for predicting $\sigma_8$, with average of 14.8% weight for $\sigma_8$ over 8.8% weight for $\Omega_m$.

The whole distribution of weights can be seen from the following histograms.

<div>
<canvas id="voids-canvas"></canvas>
<canvas id="clusters-canvas"></canvas>
</div>

We can see from first histogram that voids have more high weights in the 0.9~1 bin for predicting $\Omega_m$.
Also, clusters have more low weights in the 0~0.1 bin for predicting $\sigma_8$ as shown in the second histogram.


{% include blog_sum-of-parts_cosmogrid-hist-comb.html %}

## Conclusion
In this blog post, we propose group attributions which overcome a fundamental barrier for feature attributions in satisfying faithfulness perturbation tasks.
Our corresponding Sum-of-Parts models show groups that are semantically meaningful to cosmologists and revealed new properties in cosmological structures such as voids and clusters.

For more details in thoeretical proofs and quantitative experiments, see our [paper](https://fallcat.github.io/assets/pdf/sop_preprint.pdf) and [code](https://github.com/DebugML/sop).

### Citation
