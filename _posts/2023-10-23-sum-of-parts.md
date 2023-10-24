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

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


<script>
$(document).ready(function(){
    // Iterate over each figure
    $("figure.sopfig").each(function(){
        var $figure = $(this);
        var imgSrc = $figure.find("img").attr("src");
        var jsonURL = imgSrc.replace(".png", ".json").replace("/figs/", "/json/");
        var jsonURLorig;
        if (imgSrc.includes("good/")) {
            jsonURLorig = imgSrc.replace("/figs/", "/json/").replace(/good\/.*$/, "original.json");
        } else if (imgSrc.includes("bad/")) {
            jsonURLorig = imgSrc.replace("/figs/", "/json/").replace(/bad\/.*$/, "original.json");
        }
        console.log(jsonURLorig);

        // Fetch the JSON data from jsonURL
        $.getJSON(jsonURL, function(data){
            var predClass = data.pred_class;

            // Fetch the JSON data from jsonURLorig inside the previous callback
            $.getJSON(jsonURLorig, function(dataOrig){
                var predClassOrig = dataOrig.pred_class;
                var predClassColor = (predClass === predClassOrig) ? "#3a66a3" : "#b23030";

                var captionText = "<strong>Mask Weight</strong>: " + data.mask_weight +
                                  "<br><strong>Probability</strong>: " + data.pred_prob +
                                  "<br><strong>Predicted</strong>: <span style='color:" + predClassColor + "'>" + predClass + "</span>";

                $figure.find("figcaption").html(captionText);
            });
        });
    });
});
</script>


> We identify a fundamental barrier for feature attributions in faithfulness tests.
> To overcome this limitation, we propose grouped attributions as opposed to individual feature attributions.
<!-- where groups of features are selected with each given an attribution score, and develop a model to generate and use the groups. -->
> Our model finds faithful groups and helps cosmologists discover knowledge about dark matter and galaxy formation.

ML models can assist physicians in diagnosing a variety of lung, heart, and other chest conditions from X-ray images.
However, physicians only trust the decision of the model if an explanation identifies regions of the X-ray that make sense.
This identification of input features relevant to the prediction is feature attribution.

<!-- Feature attribution is a type of explanations for machine learning (ML) models.
Specifically, it identifies input features that are relevant to the prediction.
For example, in medicine, ML models can assist physicians in diagnosing a variety of lung, heart, and other chest conditions from X-ray images.
However, physicians only trust the decision of the model if an explanation identifies regions of the X-ray that make sense. -->

To obtain useful attributions, researchers have proposed various methods.
For example, post-hoc methods include building surrogate models ([LIME](https://arxiv.org/abs/1602.04938),
[SHAP](https://arxiv.org/abs/1705.07874)), inspecting the gradients ([Grad-CAM](https://arxiv.org/abs/1610.02391), [Integrated Gradients](https://arxiv.org/abs/1703.01365)), or perturbing the inputs ([RISE](https://arxiv.org/abs/1806.07421), [Anchor](https://homes.cs.washington.edu/~marcotcr/aaai18.pdf)).
Other works have the attributions built into the ML models ([FRESH](https://arxiv.org/abs/2005.00115), [NAM](https://arxiv.org/abs/2004.13912), [GAM](https://www.cs.cornell.edu/~yinlou/papers/lou-kdd12.pdf), [GA$^2$M](https://www.cs.cornell.edu/~yinlou/papers/lou-kdd13.pdf)).
In this work, we discuss common barriers from faithfulness in both lines of research.

## Lack of Faithfulness in Feature Attributions
Feature attribution methods aim at attributing how much each feature $x_i$ contributes to the final prediction $y = f(x)$.
In attribution $\alpha = \phi(x)$, larger score $\alpha_i \in [0, 1]$ shows that feature $x_i$ is more important in predicting $y$.
<!-- Larger $\alpha_i$ means that feature $x_i$ is more important for prediction $y$. -->

Let's look at what existing feature attribution methods offer:
<!-- Let's look at some examples of what existing feature attribution methods offer: -->

<ul class="tab" data-tab="other-x-examples" data-name="otherxeg">
{% for i in (0..9) %}
<li class="{% if forloop.first %}active{% endif %}" style="width: 10%; padding: 0; margin: 0">
    <!-- <a href="#">{{ i | plus: 1 }} </a> -->
    <a href="#" style="padding: 5%; margin: 0"><img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/original.png" alt="{{ i | plus: 1 }}"></a>
</li>
{% endfor %}
</ul>
<ul class="tab-content" id="other-x-examples" data-name="otherxeg">

{% for i in (0..9) %}
<li class="{% if forloop.first %}active{% endif %}">
    <!-- <div style="text-align: center; display: flex; justify-content: center; align-items: center;">
        <figure class="center" style="margin-top: 0; margin-bottom: 10pt;">
            <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/original.png" title="Example {{ forloop.index }}" class="image-popup">
                <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/original.png" alt="Original Image for {{ forloop.index }}" style="width: 33%">
            </a>
            <figcaption style="display: block; margin-left: auto; margin-right: auto">Original Image</figcaption>
        </figure>
    </div> -->

    <!-- Masked Images - First Row -->
    <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
    {% for method in page.attr_methods %}
        {% if forloop.index <= 3 %}
        <figure class="center" style="margin-top: 0; margin-bottom: 5pt;">
        <figcaption>{{ method.caption }}</figcaption>
            <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
                <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 100%">
            </a>
        </figure>
        {% endif %}
    {% endfor %}
    </div>

    <!-- Masked Images - Second Row -->
    <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
    {% for method in page.attr_methods %}
        {% if forloop.index > 3 %}
        <figure class="center" style="margin-top: 0; margin-bottom: 10pt;">
        <figcaption>{{ method.caption }}</figcaption>
            <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
                <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 100%">
            </a>
        </figure>
        {% endif %}
    {% endfor %}
    </div>
</li>


{% endfor %}


</ul>

The scores in each saliency map are hard to interpret as they mean different things.
It is unclear if these attributions are faithful.

An explanation of a machine learning model is considered "faithful" [if it accurately reflects the model's decision-making process](https://arxiv.org/abs/2209.11326).
For a feature attribution method, this means that the highlighted features should actually influence the model's prediction.
<!-- Built-in methods then have the advantage of being faithful by construction. -->

However, when inputs highly correlate with each other, even faithful-by-construction models can have a potential failure.

### Curse of Dimensionality in Faithfulness Tests

<!-- Perturbation tests are a widely-used technique for evaluating faithfulness of an explanation. -->
One widely-used faithfulness test is _deletion_.
It measures how well the total attribution from a subset of features $S$ aligns with the change in model prediction when we remove the features from input $x$.

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

Intuitively, a faithful attribution score of the $i$th feature should reflect the change in model prediction after the $i$th feature is removed and thus have low deletion error.

Can we achieve this low deletion error though?
Let's look at this simple example of monomial:

**Theorem Sketch.** (Deletion Error for Monomials) Let $p:\{0,1\}^d\rightarrow \{0,1\}$ be a multilinear monomial function of $d$ variables, $p(x) = \prod_{i=1}^d x_i$. Then, there exists an $x$ such that any feature attribution for $p$ at $x$ will incur exponential total deletion error.
{: .notice--info}

Supposed we have $x_i=1$ for all $$i\in\{1,\dots,d\}$$.
Removing any individual feature will result in the change of 1 in prediction.
Thus we give every feature an attribution of 1.

However, when we remove more features at a time, the total attribution increases and no longer lines up with the change of 1 in model prediction.
With exponentially many choices of subsets of features, there is exponentially growing total error.

Thus assigning attribution scores to highly correlated individual features will not be able to cap the error due to curse of dimensionality.

## Grouped Attributions Overcome Curse of Dimensionality

<!-- There is a fundamental problem in the above monomial example.
All the features are corelated as the prediction is their product, but we remove one feature at a time. -->
A natural thought is then:

_**Can we instead group features together, and each time remove a whole group together?**_

We then investigate _grouped attributions_ as a different type of attributions, which assign scores to groups of instead of individual features.
A group only contributes its score if all of its features are present, as shown in the following example for images.

{% include gallery id="gallery_grouped_attributions" layout="" caption="Visualization of grouped attributions. For a set of group attributions, scores are assigned to groups of features instead of individual features. The score for each group represents how much each group of features together contributes to the prediction. We can see that masks can be interpreted as objects kept and objects removed. In this example, group 2, which includes the fish and the predator, contributes 15% to predicting \"tench\", while group $$G$$, which has the fish and dark lines removed, contributes only 1% to predicting \"tench\", but 21% to predicting \"Rooster\"." %}

The concept of groups is then formalized as following:

**Grouped Attribution:** Let $x\in\mathbb R^d$ be an example, and let $S_1, \dots, S_G \in \{0,1\}^d$ designate $G$ groups of features where $j \in S_i$ if feature $j$ is included in the $i$th group. Then,  a grouped feature attribution is a collection $\beta = \{(S_i,c_i)\}_{i=1}^G$ where $c_i\in\mathbb R$ is the attributed score for the $i$th group of features $m_i$.
{: .notice--info}

If we use one group for all the input features, and assign a score of 1 for the group, then we can achieve zero deletion error for the monomial example.

Grouped attributions are thus able to overcome exponentially growing deletion errors when the features interact with each other.

In our work, we develop a class of models, SOP, that can generate and select important groups for attribution for any existing model.

## Our Approach: Sum-of-Parts Models
Our proposed grouped attributions consist of two parts: the subsets of features called groups $(S_1,\dots, S_G) \in [0,1]^d $ and the scores for each group $(c_1, \dots, c_G)$.

We divide our approach into two main modules: $\mathsf{GroupGen}$ which generates the groups $S_i$ of features from an input, and $\mathsf{GroupSelect}$ which assigns scores $c_i$ to select which groups to use for prediction.
The final prediction is then a weighted average of predictions from each group $y_i$ by score $c_i$, as shown in the following figure.

{% include gallery id="gallery_sop_model" layout="" caption="Structure of a Sum-of-Parts Model. A group generator $g$ first generates groups of features. Each group of features $$S_i\odot X$$ then goes through the backbone model to obtain the group embedding $$z_i$$. A group selector $q$ then assigns a score $c_i$ to each group $i$'s representation. The logits from groups are then aggregated for final prediction $y$." %}

Here are some examples groups our model obtain for ImageNet:

<ul class="tab" data-tab="sop-examples" data-name="sopeg">
{% for i in (0..9) %}
<li class="{% if forloop.first %}active{% endif %}" style="width: 10%; padding: 0; margin: 0">
    <!-- <a href="#">{{ i | plus: 1 }} </a> -->
    <a href="#" style="padding: 5%; margin: 0"><img src="/assets/images/sum_of_parts/blog_figs_sop/figs/{{ i }}/original.png" alt="{{ i | plus: 1 }}"></a>
</li>
{% endfor %}
</ul>

<ul class="tab-content" id="sop-examples" data-name="sopeg">

{% for i in (0..9) %}
<li class="{% if forloop.first %}active{% endif %}">
    {% for row in (0..0) %}
        <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
        {% for j in (0..2) %}
            {% assign img_idx = row | times: 3 | plus: j %}
            <figure class="center sopfig" style="margin-top: 0; margin-bottom: 0pt;">
            <figcaption style="width: 95%">{{ img_idx }}</figcaption>
                <a href="/assets/images/sum_of_parts/blog_figs_sop/figs/{{ i }}/good/{{ img_idx }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
                    <img src="/assets/images/sum_of_parts/blog_figs_sop/figs/{{ i }}/good/{{ img_idx }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 95%">
                </a>
            </figure>
        {% endfor %}
        </div>
    {% endfor %}

    {% for row in (0..0) %}
        <div style="text-align: center; display: flex; justify-content: space-around; align-items: center; margin-bottom: 15px">
        {% for j in (0..2) %}
            {% assign img_idx = row | times: 3 | plus: j %}
            <figure class="center sopfig" style="margin-top: 0; margin-bottom: 0;">
            <figcaption style="width: 95%">{{ img_idx }}</figcaption>
                <a href="/assets/images/sum_of_parts/blog_figs_sop/figs/{{ i }}/bad/{{ img_idx }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
                    <img src="/assets/images/sum_of_parts/blog_figs_sop/figs/{{ i }}/bad/{{ img_idx }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 95%">
                </a>
            </figure>
        {% endfor %}
        </div>
    {% endfor %}

    <figcaption>Grouped attributions from SOP. The first row shows groups that are weighted most in prediction. The second row shows groups that are weighted the least (0) in prediction. Probability for each group's predicted class is shown. Predicted classes marked blue are what is consistent with the final aggregated prediction, while red are inconsistent.</figcaption>
</li>


{% endfor %}


</ul>

To validate the usability of our approach for solving real problems, we collaborate with cosmologists to see if we can use the groups for scientific discovery.

## Case Study: Cosmology
Weak lensing maps in cosmology calculate the spatial distribution of matter density in the universe ([Gatti et al. 2021](https://academic.oup.com/mnras/article/504/3/4312/6211014?login=true)).
Cosmologists hope to use weak lensing maps to predict two key parameters related to the initial state of the universe: $\Omega_m$ and $\sigma_8$.

$\Omega_m$ captures the average energy density of all matter in the universe (such as radiation and dark energy), while $\sigma_8$ describes the fluctuation of this density.

Here is an example weak lensing map.

<figure style="margin-top:10px; margin-bottom:15px">
    <div>
    <a href="/assets/images/sum_of_parts/weak_lensing_maps.png" title=" Weak lensing maps in cosmology calculate the spatial distribution of matter density in the universe using precise measurements of the shapes of ~100 million galaxies. The shape of each galaxy is distorted (sheared and magnified) due to the curvature of spacetime induced by  mass inhomogenities as light travels towards us. Cosmologists have techniques that can infer the distribution of mass in the universe from these distortions, resulting in a weak lensing map." class="image-popup">
        <img src="/assets/images/sum_of_parts/weak_lensing_maps.png" alt="Weak lensing map." style="display: block; margin-left: auto; margin-right: auto; width: 33%;"/>
        </a>
    </div>
    <figcaption style="display: block; margin-left: auto; margin-right: auto">
      Example of a weak lensing map.
    </figcaption>
</figure>

There are two types of structures important for cosmologists: voids and clusters.
Voids are wide areas of negative density and appear as dark regions, whereas clusters are areas of concentrated high density and appear as bright dots in the weak lensing map.

<figure style="margin-top:10px; margin-bottom:15px">
    <div style="display: block; margin-left: auto; margin-right: auto; width: 33%;">
    <a href="/assets/images/sum_of_parts/voids.png" title="Void: wide areas of negative density and appear as dark regions in the weak lensing map." class="image-popup">
        <img src="/assets/images/sum_of_parts/voids.png" alt="Voids." />
        </a>
        <figcaption style="text-align: center;">Voids</figcaption>
    </div>
    <div style="display: block; margin-left: auto; margin-right: auto; width: 33%;">
        <a href="/assets/images/sum_of_parts/clusters.png" title="Clusters: areas of concentrated high density and appear as bright dots in the weak lensing map." class="image-popup">
        <img src="/assets/images/sum_of_parts/clusters.png" alt="Clusters." />
        </a>
        <figcaption style="text-align: center;">Clusters</figcaption>
    </div>
</figure>

<!-- {% include gallery id="gallery_void_cluster" layout="third" caption="(Left) Voids. (Right) Clusters." %} -->


Matilla et al. ([2020](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.102.123506)) and Ribli et al. ([2019](https://academic.oup.com/mnras/article/490/2/1843/5571096?login=true)) have developed CNN models to predict $\Omega_m$ and $\sigma_8$ from simulated weak lensing maps.
The following remains an open question in cosmology:

_**What structures from weak lensing maps can we use to infer $\Omega_m$ and $\sigma_8$?**_

We then use SOP on the trained CNN model and analyze the groups found by combining the segments.
We use watershed to pre-segment the images from [CosmoGridV1](http://www.cosmogrid.ai/) dataset into segments, and consider each segment as a feature.

One of our findings most surprising to cosmologists relates to the distinction between the two parameters $\Omega_m$ and $\sigma_8$.

We find that voids have especially higher weights for predicting $\Omega_m$, with average of 55.4% weight for $\Omega_m$ over 54.0% weight for $\sigma_8$. Clusters, especially high-significance ones, have higher weights for predicting $\sigma_8$, with average of 14.8% weight for $\sigma_8$ over 8.8% weight for $\Omega_m$.

We can see the distribution of weights in the following histograms:

<div style="margin-bottom: 15px">
<canvas id="voids-canvas" style="margin-bottom: 15px"></canvas>
<canvas id="clusters-canvas" style="margin-bottom: 15px"></canvas>
</div>

{% include blog_sum-of-parts_cosmogrid-hist-comb.html %}

The first histogram shows that voids have more high weights in the 0.9~1 bin for predicting $\Omega_m$.
Also, clusters have more low weights in the 0~0.1 bin for predicting $\sigma_8$ as in the second histogram.



## Conclusion
In this blog post, we propose group attributions to overcome a fundamental barrier for feature attributions in satisfying faithfulness perturbation tests.
Our Sum-of-Parts models generate groups that are semantically meaningful to cosmologists and revealed new properties in cosmological structures such as voids and clusters.

For more details in thoeretical proofs and quantitative experiments, see our [paper](https://fallcat.github.io/assets/pdf/sop_preprint.pdf) and [code](https://github.com/DebugML/sop).

### Citation
