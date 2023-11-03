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
      url: https://arxiv.org/abs/2310.16316
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
                var captionText = "<strong>Mask Weight</strong>: " +
                  (data.mask_weight == 1 || data.mask_weight == 0 ? data.mask_weight.toFixed(1) : data.mask_weight) +
                  "<br><strong>Probability</strong>: " +
                  (data.pred_prob == 1 || data.pred_prob == 0 ? data.pred_prob.toFixed(1) : data.pred_prob) +
                  "<br><strong>Predicted</strong>: <span style='color:" + predClassColor + "'>" + predClass + "</span>";

                $figure.find("figcaption").html(captionText);
            });
        });
    });
});
</script>


> We identify a fundamental barrier for feature attributions in faithfulness tests.
> To overcome this limitation, we create faithful attributions to groups of features.
> The groups from our approach help cosmologists discover knowledge about dark matter and galaxy formation.

ML models can assist physicians in diagnosing a variety of lung, heart, and other chest conditions from X-ray images.
However, physicians only trust the decision of the model if an explanation is given and make sense to them.
One form of explanation identifies regions of the X-ray.
This identification of input features relevant to the prediction is called feature attribution.

<!-- Here are some examples of feature attributions: -->
Click on the thumbnails to see different examples of feature attributions:

<ul class="tab" data-tab="other-x-examples" data-name="otherxeg">
{% for i in (0..9) %}
<li class="{% if forloop.first %}active{% endif %}" style="width: 10%; padding: 0; margin: 0">
    <a href="#" style="padding: 5%; margin: 0"><img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/original.png" alt="{{ i | plus: 1 }}"></a>
</li>
{% endfor %}
</ul>
<ul class="tab-content" id="other-x-examples" data-name="otherxeg">

{% for i in (0..9) %}
<li class="{% if forloop.first %}active{% endif %}">

    <!-- Masked Images - First Row -->
    <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
    {% for method in page.attr_methods %}
        {% if forloop.index <= 3 %}
        <figure class="center" style="margin-top: 0; margin-bottom: 5pt;">
        <figcaption>{{ method.caption }}</figcaption>
            <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
                <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 95%">
            </a>
        </figure>
        {% endif %}
    {% endfor %}
    </div>

    <!-- Masked Images - Second Row -->
    <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
    {% for method in page.attr_methods %}
        {% if forloop.index > 3 %}
        <figure class="center" style="margin-top: 0; margin-bottom: 0pt;">
        <figcaption>{{ method.caption }}</figcaption>
            <a href="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
                <img src="/assets/images/sum_of_parts/blog_figs_attrs/{{ i }}/{{ method.name }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 95%">
            </a>
        </figure>
        {% endif %}
    {% endfor %}
    </div>
</li>


{% endfor %}


</ul>

<figcaption style="margin-top: 0; margin-bottom: 25pt;">The overlaying on top of images show the feature attribution scores each attribution method. Orange overlay indicates high positive importance from the method for predicting the class, and blue overlay indicates negative importance.</figcaption>


The maps overlaying on top of images above show the attribution scores from different methods.
[LIME](https://arxiv.org/abs/1602.04938) and [SHAP](https://arxiv.org/abs/1705.07874) build surrogate models,
[RISE](https://arxiv.org/abs/1806.07421) perturb the inputs,
[Grad-CAM](https://arxiv.org/abs/1610.02391) and [Integrated Gradients](https://arxiv.org/abs/1703.01365) inspect the gradients,
and [FRESH](https://arxiv.org/abs/2005.00115) have the attributions built into the model.
Each feature attribution method's scores have different meanings.

<!-- In this post, we discuss a common barrier in feature attributions. -->

## Lack of Faithfulness in Feature Attributions

However, these explanations may not be "faithful", as numerous studies have found that feature attributions fail basic sanity checks ([Sundararajan et al. 2017](https://arxiv.org/abs/1703.01365) [Adebayo et al. 2018](https://arxiv.org/abs/1810.03292)) and interpretability tests ([Kindermans et al. 2017](https://arxiv.org/abs/1711.00867) [Bilodeau et al. 2022](https://arxiv.org/abs/2212.11870)).

An explanation of a machine learning model is considered "faithful" [if it accurately reflects the model's decision-making process](https://arxiv.org/abs/2209.11326).
For a feature attribution method, this means that the highlighted features should actually influence the model's prediction.

Let's formalize feature attributions a bit more.

Given a model $f$, an input $X$ and a prediction $y = f(X)$, a feature attribution method $\phi$ produces $\alpha = \phi(x)$.
Each score $\alpha_i \in [0, 1]$ indicates the level of importance of feature $X_i$ in predicting $y$.

For example, if $\alpha_1 = 0.7$ and $\alpha_2 = 0.2$, then it means that feature $X_1$ is more important than $X_2$ for predicting $y$.

### Curse of Dimensionality in Faithfulness Tests

We now discuss how feature attributions may be fundamentally unable to achieve faithfulness.

<!-- Perturbation tests are a widely-used technique for evaluating faithfulness of an explanation. -->
One widely-used test of faithfulness is _insertion_.
It measures how well the total attribution from a subset of features $S$ aligns with the change in model prediction when we insert the features $X_S$ into a blank image.

For example, if a feature $X_i$ is considered to contribute $\alpha_i$ to the prediction, then adding it to a blank image should add $\alpha_i$ amount to the prediction.
The total attribution scores for all features in a subset $i\in S$ is then $$\sum_{i\in S} \alpha_i$$.

**Definition.** (Insertion error) The _insertion error_ of an feature attribution $\alpha\in\mathbb R^d$ for a model $f:\mathbb R^d\rightarrow\mathbb R$ when inserting a subset of features $S$ from an input $X$ is
<div align="center">
$$
\mathrm{InsErr}(\alpha, S) = \left|f(X_{S}) - f(0_d) - \sum_{i\in S} \alpha_i\right| \\
        \quad\textrm{where}\;\; (X_{S})_j = \begin{cases}
        X_j \quad \text{if}\;\; j \in S\\
        0 \quad \text{otherwise}
    \end{cases}
$$
</div>
The total insertion error is $\sum_{S\in\mathcal{P}} \mathrm{InsErr}(\alpha,S)$ where $\mathcal P$ is the powerset of $$\{1,\dots, d\}$$.

Intuitively, a faithful attribution score of the $i$th feature should reflect the change in model prediction after the $i$th feature is added and thus have low insertion error.

Can we achieve this low insertion error though?
Let's look at this simple example of binomials:

**Theorem 1 Sketch.** (Insertion Error for Binomials)
Let $$p:\{0,1\}^d\rightarrow \{0,1,2\}$$ be a multilinear binomial polynomial function of $d$ variables. Furthermore suppose that the features can be partitioned into $(S_1,S_2,S_3)$ of equal sizes where $p(X) = \prod_{i\in S_1 \cup S_2} X_i + \prod_{j\in S_2\cup S_3} X_j$.
Then, there exists an $X$ such that any feature attribution for $p$ at $X$ will incur exponential total insertion error.
{: .notice--info}

When features are highly correlated such as in a binomial, attributing to individual features separately fails to give low insertion error, and thus fails to faithfully represent features' contributions to the prediction.

<!-- fails to capture the correlation.
This leads to exponentially growing total insertion error, meaning that the attribution scores do not faithfully represent how much the features contribute to the prediction. -->

## Grouped Attributions Overcome Curse of Dimensionality
Highly correlated features cannot be individually faithful.
Our approach is then to group these highly correlated features together.

We investigate _grouped attributions_ as a different type of attributions, which assign scores to groups of features instead of individual features.
A group only contributes its score if all of its features are present, as shown in the following example for images.

{% include gallery id="gallery_grouped_attributions" layout="" caption="Visualization of grouped attributions. For a set of group attributions, scores are assigned to groups of features instead of individual features. The score for each group represents how much each group of features together contributes to the prediction of a class. We can see that masks can be interpreted as objects kept and objects removed. In this example, group 2, which includes the fish and the predator, contributes 15% to predicting \"tench\", while group $$G$$, which has the fish and dark lines removed, contributes only 1% to predicting \"tench\", but 21% to predicting \"Rooster\"." %}

The prediction for each class $$y = f(X)$$ is decomposed into $G$ scores and corresponding predictions $(c_1, y_1), \dots, (c_G, y_G)$ from groups groups $(S_1,\dots, S_G) \in [0,1]^d $.
For example, scores from all the blue lines sum up to 1.0 for the class "tench" in the example above.

The concept of groups is then formalized as following:

**Grouped Attribution:** Let $x\in\mathbb R^d$ be an example, and let $$S_1, \dots, S_G \in \{0,1\}^d$$ designate $G$ groups of features where $j \in S_i$ if feature $j$ is included in the $i$th group. Then,  a grouped feature attribution is a collection $\beta = \{(S_i,c_i)\}_{i=1}^G$ where $c_i\in\mathbb R$ is the attributed score for the $i$th group of features $m_i$.
{: .notice--info}

<!-- If we use one group for all the input features, and assign a score of 1 for the group, then we can achieve zero deletion error for the monomial example. -->
We can prove that there is a constant sized grouped attribution that achieves zero insertion error, when we add whole groups together using their grouped attribution scores.

**Corollary.** Consider the binomial from the Theorem 1 Sketch. Then, there exists a grouped attribution with zero insertion error for the binomial.
{: .notice--info}

Grouped attributions can then faithfully represent contributions from groups of features.
We can then overcome exponentially growing insertion errors when the features interact with each other.


## Our Approach: Sum-of-Parts Models
<!-- In our work, we develop a class of models, SOP, that can generate and select important groups for attribution for any existing model. -->
Now that we understand the need for grouped attributions, how do we ensure they are faithful?

We develop Sum-of-Parts (SOP), a faithful-by-construction model that first assigns features to groups with $\mathsf{GroupGen}$ module, and then select and aggregates predictions from the groups with $\mathsf{GroupSelect}$ module.

In this way, the prediction from each group only depends on the group, and the score for a group is thus faithful to the group's contribution.

<!-- Our model Sum-of-Parts (SOP) then come with two components by design: the subsets of features which are the groups $(S_1,\dots, S_G) \in [0,1]^d $ and the scores for each group $(c_1, \dots, c_G)$. -->

<!-- Our model Sum-of-Parts (SOP) consists of two parts: the subsets of features called groups $(S_1,\dots, S_G) \in [0,1]^d $ and the scores for each group $(c_1, \dots, c_G)$.
The final prediction is a weighted average of predictions from each group $y_i$ by score $c_i$. -->

<!-- We divide our approach into two main modules: $\mathsf{GroupGen}$ which generates the groups $S_i$ of features from an input, and $\mathsf{GroupSelect}$ which assigns scores $c_i$ to select which groups to use for prediction.
The two modules and final aggregation are shown in the following figure. -->


{% include gallery id="gallery_sop_model" layout="" caption="Structure of a Sum-of-Parts model. A group generator $g$ first generates groups of features. Each group of features $$S_i\odot X$$ then goes through the backbone model to obtain the group embedding $$z_i$$. A group selector $q$ then assigns a score $c_i$ to each group $i$'s representation. The logits from groups are then aggregated for final prediction $y$." %}

Click on thumbnails to see different example groups our model obtained for ImageNet:

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

    <figcaption>Grouped attributions from SOP. The masked out areas in the images are zeroed out, and the unmasked areas are preserved features for each group. The first row shows groups that are weighted most in prediction. The second row shows groups that are weighted the least (0) in prediction. Probability for each group's predicted class is shown. Predicted classes marked blue are what is consistent with the final aggregated prediction, while red are inconsistent.</figcaption>
</li>
{% endfor %}

</ul>

We can see that, for example, the second and third groups for goldfish contain most of the goldfish's body, and they together contribute more (0.185 + 0.1554) for goldfish class than the first group which contributes 0.3398 for predicting hen.

## Case Study: Cosmology
To validate the usability of our approach for solving real problems, we collaborated with cosmologists to see if we could use the groups for scientific discovery.

Weak lensing maps in cosmology calculate the spatial distribution of matter density in the universe ([Gatti et al. 2021](https://academic.oup.com/mnras/article/504/3/4312/6211014?login=true)).
Cosmologists hope to use weak lensing maps to predict two key parameters related to the initial state of the universe: $\Omega_m$ and $\sigma_8$.

$\Omega_m$ [captures the average energy density of all matter in the universe](http://hyperphysics.phy-astr.gsu.edu/hbase/Astro/denpar.html) (such as radiation and dark energy), while $\sigma_8$ [describes the fluctuation of this density](http://astro.vaporia.com/start/s8tension.html#:~:text=The%20sigma%208%20tension%20is,is%20a%20measure%20of%20present).

Here is an example weak lensing map:

<figure style="margin-top:10px; margin-bottom:15px">
    <div>
    <a href="/assets/images/sum_of_parts/weak_lensing_maps.png" title=" Weak lensing maps in cosmology calculate the spatial distribution of matter density in the universe using precise measurements of the shapes of ~100 million galaxies. The shape of each galaxy is distorted (sheared and magnified) due to the curvature of spacetime induced by  mass inhomogenities as light travels towards us. Cosmologists have techniques that can infer the distribution of mass in the universe from these distortions, resulting in a weak lensing map." class="image-popup">
        <img src="/assets/images/sum_of_parts/weak_lensing_maps.png" alt="Weak lensing map." style="display: block; margin-left: auto; margin-right: auto; width: 33%;"/>
        </a>
    </div>
    <figcaption style="display: block; margin-left: auto; margin-right: auto">
      Example of a weak lensing map. This map has $\Omega_m = 0.1021$ and $\sigma_8 = 1.023$. The large area being dark matches the low $\Omega_m$.
    </figcaption>
</figure>


<!-- {% include gallery id="gallery_void_cluster" layout="third" caption="(Left) Voids. (Right) Clusters." %} -->

Matilla et al. ([2020](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.102.123506)) and Ribli et al. ([2019](https://academic.oup.com/mnras/article/490/2/1843/5571096?login=true)) have developed CNN models to predict $\Omega_m$ and $\sigma_8$ from simulated weak lensing maps [CosmoGridV1](http://www.cosmogrid.ai/).
Even though these models have high performance, we do not fully understand how they predict $\Omega_m$ and $\sigma_8$.
We then ask a question:

_**What groups from weak lensing maps can we use to infer $\Omega_m$ and $\sigma_8$?**_

We then use SOP on the trained CNN model and analyze the groups from the attributions.

The groups found by SOP are related to two types of important cosmological structures: voids and clusters.
Voids are large regions that are under-dense and appear as dark regions in the weak lensing map, whereas clusters are areas of concentrated high density and appear as bright dots.

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
    <figcaption>The grayed out areas are unselected features for the group. The colored areas are preserved features, which correspond to voids (left) and clusters (right).</figcaption>
</figure>

<!-- One of our findings that intrigue cosmologists relates to the distinction between the two parameters $\Omega_m$ and $\sigma_8$. -->

<!-- We find that voids have especially higher weights for predicting $\Omega_m$, with average of 55.4% weight for $\Omega_m$ over 54.0% weight for $\sigma_8$. Clusters, especially high-significance ones, have higher weights for predicting $\sigma_8$, with average of 14.8% weight for $\sigma_8$ over 8.8% weight for $\Omega_m$. -->

We first find that voids are used more in prediction than clusters in general.
This is consistent with [previous work](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.102.123506) that voids are the most important feature in prediction.

Also, voids have especially higher weights for predicting $\Omega_m$ than $\sigma_8$.
Clusters, especially high-significance ones, have higher weights for predicting $\sigma_8$.

We can see the distribution of weights in the following histograms:

<div style="margin-bottom: 15px">
<canvas id="voids-canvas" style="margin-bottom: 15px"></canvas>
<canvas id="clusters-canvas" style="margin-bottom: 15px"></canvas>
</div>

{% include blog_sum-of-parts_cosmogrid-hist-comb.html %}

The first histogram shows that voids have more high weights in the 0.90-1.00 bin for predicting $\Omega_m$.
Also, clusters have more low weights in the 0~0.1 bin for predicting $\sigma_8$ as in the second histogram.



## Conclusion
In this blog post, we show that group attributions can overcome a fundamental barrier for feature attributions in satisfying faithfulness perturbation tests.
Our Sum-of-Parts models generate groups that are semantically meaningful to cosmologists and revealed new properties in cosmological structures such as voids and clusters.

For more details in thoeretical proofs and quantitative experiments, see our [paper](https://arxiv.org/abs/2310.16316) and [code](https://github.com/DebugML/sop).

### Citation
@misc{you2023sumofparts,
    title={Sum-of-Parts Models: Faithful Attributions for Groups of Features},
    author={Weiqiu You and Helen Qu and Marco Gatti and Bhuvnesh Jain and Eric Wong},
    year={2023},
    eprint={2310.16316},
    archivePrefix={arXiv},
    primaryClass={cs.LG}
}
