---
title: "Data-Efficient Learning with Neural Programs"
layout: single
excerpt: "TBD"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: assets/images/neural_programs/scene_recognition.png
  teaser: assets/images/neural_programs/scene_recognition.png
  actions:
    - label: "Paper"
      url:
    - label: "Code"
      url: https://github.com/alaiasolkobreslin/ISED/tree/v1.0.0
authors:
  - Alaia Solko-Breslin
  - Seewon Choi
  - Ziyang Li
  - Neelay Velingker
  - Rajeev Alur
  - Mayur Naik
  - Eric Wong

# gallery_grouped_attributions:
#   - url: /assets/images/sum_of_parts/group_attribution.png
#     image_path: /assets/images/sum_of_parts/group_attribution.png
#     title: Grouped Attributions

# gallery_sop_model:
#   - url: /assets/images/sum_of_parts/sop_model.png
#     image_path: /assets/images/sum_of_parts/sop_model.png
#     title: Sum-of-Parts Model

# gallery_void_cluster:
#   - image_path: /assets/images/sum_of_parts/voids.png
#     title: Voids
#   - image_path: /assets/images/sum_of_parts/clusters.png
#     title: Clusters

# gallery_weak_lensing_maps:
#   - image_path: /assets/images/sum_of_parts/weak_lensing_maps.png
#     title: Weak Lensing Maps

neural_programs:
  - id: 0
    name: scene
    caption: Neural Program for Scene Recognition
  - id: 1
    name: leaf
    caption: Neural Program for Leaf Classification
  - id: 2
    name: hwf
    caption: Neural Program for Hand-Written Formula
  - id: 3
    name: sum2
    caption: Neural Program for 2-Digit Addition
  - id: 4
    name: sudoku
    caption: Neural Program for Sudoku Solving

logic_programs:
  - id: 1
    name: leaf
    caption: Scallop Program for Leaf Classification using a Decision Tree
    code: "rel label = {(\"Alstonia Scholaris\",),(\"Citrus limon\",),\n             (\"Jatropha curcas\",),(\"Mangifera indica\",),\n             (\"Ocimum basilicum\",),(\"Platanus orientalis\",),\n             (\"Pongamia Pinnata\",),(\"Psidium guajava\",),\n             (\"Punica granatum\",),(\"Syzygium cumini\",),\n             (\"Terminalia Arjuna\",)}\n\n

    rel leaf(m,s,t) = margin(m), shape(s), texture(t)\n\n

    rel predict_leaf(\"Ocimum basilicum\") = leaf(m, _, _), m == \"serrate\"\nrel predict_leaf(\"Jatropha curcas\") = leaf(m, _, _), m == \"indented\"\nrel predict_leaf(\"Platanus orientalis\") = leaf(m, _, _), m == \"lobed\"\nrel predict_leaf(\"Citrus limon\") = leaf(m, _, _), m == \"serrulate\"\nrel predict_leaf(\"Pongamia Pinnata\") = leaf(\"entire\", s, _), s == \"ovate\"\nrel predict_leaf(\"Mangifera indica\") = leaf(\"entire\", s, _), s== \"lanceolate\"\nrel predict_leaf(\"Syzygium cumini\") = leaf(\"entire\", s, _), s == \"oblong\"\nrel predict_leaf(\"Psidium guajava\") = leaf(\"entire\", s, _), s == \"obovate\"\n\n

    rel predict_leaf(\"Alstonia Scholaris\") = leaf(\"entire\", \"elliptical\", t), t == \"leathery\"\nrel predict_leaf(\"Terminalia Arjuna\") = leaf(\"entire\", \"elliptical\", t), t == \"rough\"\nrel predict_leaf(\"Citrus limon\") = leaf(\"entire\", \"elliptical\", t), t == \"glossy\"\nrel predict_leaf(\"Punica granatum\") = leaf(\"entire\", \"elliptical\", t), t == \"smooth\"\n\n

    rel predict_leaf(\"Terminalia Arjuna\") = leaf(\"undulate\", s, _), s == \"elliptical\"\nrel predict_leaf(\"Mangifera indica\") = leaf(\"undulate\", s, _), s == \"lanceolate\"\nrel predict_leaf(\"Syzygium cumini\") = leaf(\"undulate\", s, _) and s != \"lanceolate\" and s != \"elliptical\"\n\n

    rel get_prediction(l) = label(l), predict_leaf(l)"

  - id: 2
    name: hwf
    caption: Scallop Program for Hand-Written Formula
    code: "// Inputs\ntype symbol(u64, String)\ntype length(u64)\n\n

    // Facts for lexing\nrel digit = {(\"0\", 0.0), (\"1\", 1.0), (\"2\", 2.0), \n             (\"3\", 3.0), (\"4\", 4.0), (\"5\", 5.0),\n             (\"6\", 6.0),(\"7\", 7.0), (\"8\", 8.0), (\"9\", 9.0)}\nrel mult_div = {\"*\", \"/\"}\nrel plus_minus = {\"+\", \"-\"}\n\n

    // Symbol ID for node index calculation\nrel symbol_id = {(\"+\", 1), (\"-\", 2), (\"*\", 3), (\"/\", 4)}\n\n

    // Node ID Hashing\n@demand(\"bbbbf\")\nrel node_id_hash(x, s, l, r, x + sid * n + l * 4 * n + r * 4 * n * n) =\n     symbol_id(s, sid), length(n)\n\n

    // Parsing\nrel value_node(x, v) =
      symbol(x, d), digit(d, v), length(n), x < n\nrel mult_div_node(x, \"v\", x, x, x, x, x) = value_node(x, _)\nrel mult_div_node(h, s, x, l, end, begin, end) =\n    symbol(x, s), mult_div(s), node_id_hash(x, s, l, end, h),\n    mult_div_node(l, _, _, _, _, begin, x - 1),\n    value_node(end, _), end == x + 1\nrel plus_minus_node(x, t, i, l, r, begin, end) =\n    mult_div_node(x, t, i, l, r, begin, end)\nrel plus_minus_node(h, s, x, l, r, begin, end) =\n    symbol(x, s), plus_minus(s), node_id_hash(x, s, l, r, h),\n    plus_minus_node(l, _, _, _, _, begin, x - 1),\n    mult_div_node(r, _, _, _, _, x + 1, end)\n\n

    // Evaluate AST\nrel eval(x, y, x, x) = value_node(x, y)\nrel eval(x, y1 + y2, b, e) =\n    plus_minus_node(x, \"+\", i, l, r, b, e),\n    eval(l, y1, b, i - 1),\n    eval(r, y2, i + 1, e)\nrel eval(x, y1 - y2, b, e) =\n    plus_minus_node(x, \"-\", i, l, r, b, e),\n    eval(l, y1, b, i - 1),\n    eval(r, y2, i + 1, e)\nrel eval(x, y1 * y2, b, e) =\n    mult_div_node(x, \"*\", i, l, r, b, e),\n    eval(l, y1, b, i - 1),\n    eval(r, y2, i + 1, e)\nrel eval(x, y1 / y2, b, e) =\n    mult_div_node(x, \"/\", i, l, r, b, e),\n    eval(l, y1, b, i - 1),\n    eval(r, y2, i + 1, e), y2 != 0.0\n\n

    // Compute result\nrel result(y) = eval(e, y, 0, n - 1), length(n)"
  - id: 3
    name: sum2
    caption: Scallop Program for 2-Digit Addition
    code: "rel digit_1 = {(0,),(1,),(2,),(3,),(4,),(5,),(6,),(7,),(8,),(9,)}\nrel digit_2 = {(0,),(1,),(2,),(3,),(4,),(5,),(6,),(7,),(8,),(9,)}\n\nrel sum_2(a + b) :- digit_1(a), digit_2(b)"

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

.button-method {
  width: 25%;
  background: rgba(76, 175, 80, 0.0);
  border: 0px;
  border-right: 1px solid #ccc;
  color: #999;
}

.button-sample {
  padding: 5px;
  font-size: 12px;
  background: rgba(76, 175, 80, 0.0);
  display: inline-block;
  margin-right: 15px;
}

.btn-clicked {
  color: black;
}

.container {
  display: flex;
  overflow: auto;
  align-items: center;
}

.container th, .container td {
  text-align: center;
  padding: 1px 5px;
}

.container table {
  width: auto; 
  padding-top:15px;
  margin-right: 5px;
}

.container math, .container div {
  width: auto; 
  margin-right: 15px;
}

.container div {
  margin-left: 15px;
}

.code-block {
  font-size: 14px; /* Adjust the font size as needed */
  text-align: left;
}

.code-snippet {
  display: inline-block;
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
<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>



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


> We introduce “neural programs” as the composition of a DNN followed by a program written in a traditional programming language or an API call to an LLM.
> We introduce new neural program tasks that use Python and calls to GPT-4.
> We present an algorithm for learning neural programs in a data-efficient manner.

In this post, we introduce "neural programs" as the composition of a neural model $M_\theta$ followed by a program $P$.
Neural programs can be used to solve computational tasks that neural perception alone cannot solve.
$P$ can take many forms, including a Python program, a logic program, or a call to an LLM such as GPT-4.
One task that can be expressed as a neural program is scene recognition, where $M_\theta$ classifies objects in an image and $P$ prompts GPT-4 to identify the room type given these objects.


<!-- Here are some examples of neural programs: -->
Click on the thumbnails to see different examples of neural programs:

<ul class="tab" data-tab="neural-program-examples" data-name="otherxeg">
{% for i in (0..4) %}
<li class="{% if forloop.first %}active{% endif %}" style="width: 10%; padding: 0; margin: 0">
    <a href="#" style="padding: 5%; margin: 0"><img src="/assets/images/neural_programs/blog_figs_attrs/{{ i }}/thumbnail.png" alt="{{ i | plus: 1 }}"></a>
</li>
{% endfor %}
</ul>
<ul class="tab-content" id="neural-program-examples" data-name="otherxeg">

{% for example in page.neural_programs %}
<li class="{% if forloop.first %}active{% endif %}">

    <!-- Masked Images - First Row -->
    <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
      {% if forloop.index <= 5 %}
      <figure class="center" style="margin-top: 0; margin-bottom: 5pt;">
      <figcaption>{{ example.caption }}</figcaption>
          <a href="/assets/images/neural_programs/blog_figs_attrs/{{ example.id }}/{{ example.name }}.png" title="Example {{ forloop.parentloop.index }}" class="image-popup">
              <img src="/assets/images/neural_programs/blog_figs_attrs/{{ example.id }}/{{ example.name }}.png" alt="Masked Image {{ forloop.index }} for {{ forloop.parentloop.index }}" style="width: 95%">
          </a>
      </figure>
      {% endif %}
    </div>
</li>


{% endfor %}


</ul>

<figcaption style="margin-top: 0; margin-bottom: 25pt;">Neural programs involve a composition of a neural component and a program component. Input images are fed into the neural model(s), and symbols predicted by the neural component can be passed into the program $P$.</figcaption>

These tasks can be difficult to learn if there are no intermediate labels that can be used to train $M_\theta$.
The main challenge concerns how to differentiate across $P$ to faciliate end-to-end learning.


## Neurosymbolic Learning Frameworks

Neurosymbolic learning is one instance of neural program learning in which $P$ is a logic program.
[Scallop](https://arxiv.org/abs/2304.04812) and [DeepProbLog (DPL)](https://arxiv.org/abs/1805.10872) are neurosymbolic learning frameworks that use Datalog and ProbLog respectively.

Click on the thumbnails to see a few of the neural program examples from before expressed as logic programs in Scallop:

<!-- Second Figure -->
<ul class="tab" data-tab="second-figure" data-name="secondfigure">
  {% for i in (1..3) %}
  <li class="{% if forloop.first %}active{% endif %}" style="width: 10%; padding: 0; margin: 0">
      <a href="#" style="padding: 5%; margin: 0"><img src="/assets/images/neural_programs/blog_figs_attrs/{{ i }}/thumbnail.png" alt="{{ i | plus: 1 }}"></a>
  </li>
  {% endfor %}
</ul>
<ul class="tab-content" id="second-figure" data-name="secondfigure">
  {% for example in page.logic_programs %}
  <li class="{% if forloop.first %}active{% endif %}">
      <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
        {% if forloop.index <= 5 %}
        <figure class="center" style="margin-top: 0; margin-bottom: 5pt;">
        <figcaption>{{ example.caption }}</figcaption>
            <div class="code-popup" style="overflow-y: auto; overflow-x: auto; max-width:600px; max-height: 500px;">
              <pre class="code-block"><code class="code-snippet">{{ example.code }}</code></pre>
            </div>
        </figure>
        {% endif %}
      </div>
  </li>
  {% endfor %}
</ul>

Restricting neurosymbolic programs to use logic programs makes differentiating $P$ straightforward.
However, these frameworks use specialized languages that offer a narrow range of features.
The scene recognition task, as described above, can’t be encoded in Scallop or DPL due to its use of the GPT-4 API.

To solve the general problem of learning neural programs, a learning algorithm that treats $P$ as black-box is required.
By this, we mean that the learning algorithm must perform gradient estimation through $P$ without being able to explicitly differentiate it.
Such a learning algorithm must rely only on symbol-output pairs that represent inputs and outputs of $P$.


## Black-Box Gradient Estimation 

<!-- The key challenge comes from back-propagating the loss across the program $P$ without assuming differentiability of $P$.  -->
Previous works on black-box gradient estimation can be used for learning neural programs.  [REINFORCE](https://link.springer.com/article/10.1007/BF00992696) samples from the probability distribution output by $M_\theta$ and computes the reward for each sample. Then, it updates the parameter to maximize the log probability of the sampled symbols weighed by the reward value. 

There are various variants of REINFORCE, including [IndeCateR](https://arxiv.org/abs/2311.12569) that improves upon the sampling strategy to lower the variance of gradient estimation and [NASR](https://openreview.net/forum?id=en9V5F8PR-) that targets efficient finetuning with single sample and custom reward function. 
[A-NeSI](https://arxiv.org/abs/2212.12393) instead uses the samples to train a surrogate neural network of $P$, and updates the parameter by back-propagating through this surrogate model.

While these techniques can achieve high performance on tasks like Sudoku solving and MNIST addition, they struggle with data inefficiency (learning slowly when there are limited training data) and sample inefficiency (requiring a large number of samples to achieve high accuracy). 


## Our Approach: ISED
Now that we understand neurosymbolic frameworks and algorithms that perform black-box gradient estimation, we are ready to introduce an algorithm that combines concepts from both techniques to facilitate learning.

Suppose we want to learn the task of adding two MNIST digits (sum$_2$). In Scallop, we can express this task with the program

```
    sum_2(a + b) :- digit_1(a), digit_2(b)
```

and Scallop allows us to differentiate across this program. 
In the general neural program learning setting, we don’t assume that we can differentiate $P$.

We introduce Infer-Sample-Estimate-Descend (ISED), an algorithm that produces a summary logic program representing the task, using only forward evaluation. We describe each step of the algorithm below.

**Infer**

The first step of ISED is for the neural models to perform inference. In this example, $M_\theta$ predicts distributions for digits r1 and r2. Suppose that we obtain the following distributions:

<div style="text-align: center;">
$p_a = [0.1, 0.6, 0.3]$<br>
$p_b = [0.2, 0.1, 0.7]$
</div>
<br>

**Sample**

ISED is initialized with a sample count $k$, representing the number of samples to take from the predicted distributions in each training iteration.

Suppose that we initialize $k=3$, and we use a categorical sampling procedure. ISED might sample the following pairs of symbols: (1, 2), (1, 0), (2, 1). ISED would then evaluate $P$ on these symbol pairs, obtaining the following outputs: 3, 1, 3.

**Estimate**

ISED then takes the symbol-output pairs obtained in the last step and produces the following summary logic program:

<div style="text-align: center;">
$a = 1 \land b = 2 \rightarrow y = 3$<br>
$a = 1 \land b = 0 \rightarrow y = 1$<br>
$a = 2 \land b = 1 \rightarrow y = 3$
</div>
<br>

ISED differentiates through this summary program by aggregating the probabilities of inputs for each possible output.

In this example, there are 5 possible output values (0-4). For $y=3$, ISED would consider the pairs (1, 2) and (2, 1) in its probability aggregation. This resulting aggregation would be equal to $p_{a1} * p_{b2} + p_{a2} * p_{b1}$. Similarly, the aggregation for $y=1$ would consider the pair (1, 0) and would be equal to $p_{a1} * p_{b0}$.

We say that this method of aggregation uses the `add-mult` semiring, but a different method of aggregation called the `min-max` semiring uses `min` instead of `mult` and `max` instead of `add`. Different semirings might be more or less ideal depending on the task.

We restate the predicted distributions from the neural model and show the resulting prediction vector after aggregation. Hover over the elements to see where they originated from in $p_a$ and $p_b$. 

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interactive Column Vector</title>
<style>

.vector-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh; /* Adjust as needed */
}

.vector {
  display: flex;
  align-items: center;
}

.bracket {
  font-size: 44px; /* Adjust as needed */
  line-height: 0.8; /* Adjust as needed to align brackets correctly */
}

.elements {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px; /* Adjust spacing between brackets and elements */
}

.element {
  margin: 2px 0;
}

  .probability {
    padding: 0 5px;
    transition: background-color 0.3s ease;
  }
  .fig1-probability-r1-0:hover,
  .fig1-probability-hover-r1-0 {
    background-color: grey;
  }
  .fig1-probability-r1-1:hover,
  .fig1-probability-hover-r1-1 {
    background-color: yellow;
  }
  .fig1-probability-r1-2:hover,
  .fig1-probability-hover-r1-2 {
    background-color: orange;
  }
  .fig1-probability-r2-0:hover,
  .fig1-probability-hover-r2-0 {
    background-color: green;
  }
  .fig1-probability-r2-1:hover,
  .fig1-probability-hover-r2-1 {
    background-color: pink;
  }
  .fig1-probability-r2-2:hover,
  .fig1-probability-hover-r2-2 {
    background-color: red;
  }
  .fig2-probability-r1-0:hover,
  .fig2-probability-hover-r1-0 {
    background-color: grey;
  }
  .fig2-probability-r1-1:hover,
  .fig2-probability-hover-r1-1 {
    background-color: yellow;
  }
  .fig2-probability-r1-2:hover,
  .fig2-probability-hover-r1-2 {
    background-color: orange;
  }
  .fig2-probability-r2-0:hover,
  .fig2-probability-hover-r2-0 {
    background-color: green;
  }
  .fig2-probability-r2-1:hover,
  .fig2-probability-hover-r2-1 {
    background-color: pink;
  }
  .fig2-probability-r2-2:hover,
  .fig2-probability-hover-r2-2 {
    background-color: red;
  }
</style>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const links = [
      {class: 'fig1-probability-r1-0', hoverClass: 'fig1-probability-hover-r1-0'},
      {class: 'fig1-probability-r1-1', hoverClass: 'fig1-probability-hover-r1-1'},
      {class: 'fig1-probability-r1-2', hoverClass: 'fig1-probability-hover-r1-2'},
      {class: 'fig1-probability-r2-0', hoverClass: 'fig1-probability-hover-r2-0'},
      {class: 'fig1-probability-r2-1', hoverClass: 'fig1-probability-hover-r2-1'},
      {class: 'fig1-probability-r2-2', hoverClass: 'fig1-probability-hover-r2-2'}
    ];

    links.forEach(link => {
      const elements = document.querySelectorAll(`.${link.class}`);
      elements.forEach(el => {
        el.addEventListener('mouseover', () => {
          elements.forEach(ele => ele.classList.add(link.hoverClass));
        });
        el.addEventListener('mouseout', () => {
          elements.forEach(ele => ele.classList.remove(link.hoverClass));
        });
      });
    });
  });
</script>
</head>

<body>

<div style="text-align: center;">
  <p>
    $p_a = \left[ \right. $<span class="fig1-probability-r1-0">0.1</span>$, $
    <span class="fig1-probability-r1-1">0.6</span>$, $
    <span class="fig1-probability-r1-2">0.3</span>$\left. \right]$
  </p>
  <p>
    $p_b = \left[ \right. $<span class="fig1-probability-r2-0">0.2</span>$, $
    <span class="fig1-probability-r2-1">0.1</span>$, $
    <span class="fig1-probability-r2-2">0.7</span>$\left. \right]$
  </p>
</div>


<div class="vector-container">
  <div class="vector">
    <div class="bracket left-bracket">⎡<br>⎢<br>⎢<br>⎢<br>⎣</div>
    <div class="elements">
      <div class="element">0.0</div>
      <div class="element"><span class="probability fig1-probability-r1-1">0.6</span> * <span class="probability fig1-probability-r2-0">0.2</span></div>
      <div class="element">0.0</div>
      <div class="element"><span class="probability fig1-probability-r1-1">0.6</span> * <span class="probability fig1-probability-r2-2">0.7</span> + <span class="probability fig1-probability-r1-2">0.3</span> * <span class="probability fig1-probability-r2-1">0.1</span></div>
      <div class="element">0.0</div>
    </div>
    <div class="bracket right-bracket">⎤<br>⎥<br>⎥<br>⎥<br>⎦</div>
  </div>
</div>

</body>


**Descend**

The last step is to optimize $\theta$ based on $\frac{\partial l}{\partial \theta}$ using a stochastic optimizer (e.g., Adam optimizer). This completes the training pipeline for one example, and the algorithm returns the final $\theta$ after iterating through the entire dataset.

**Summary**

We provide an interactive explanation of the differences between the different methods discussed in this blog post. Click through the different methods to see the differences in how they differentiate across programs.

<div style="white-space: nowrap; border: 1px solid #ccc; padding: 10px;" id="scrollContainer">
  <p>
    Ground truth: $a = 1$, $b = 2$, $y = 3$. <br>
      Assume $ M_\theta(a) = $
        <math display="inline-block">
          <mo>[</mo>
            <mtable>
              <mtr><mtd><mi class="fig2-probability-r1-0">0.1</mi></mtd></mtr>
              <mtr><mtd><mi class="fig2-probability-r1-1">0.6</mi></mtd></mtr>
              <mtr><mtd><mi class="fig2-probability-r1-2">0.3</mi></mtd></mtr>
            </mtable>
          <mo>]</mo>
        </math>
      and $ M_\theta(b) = $
      <math display="inline-block">
          <mo>[</mo>
            <mtable>
              <mtr><mtd><mi class="fig2-probability-r2-0">0.2</mi></mtd></mtr>
              <mtr><mtd><mi class="fig2-probability-r2-1">0.1</mi></mtd></mtr>
              <mtr><mtd><mi class="fig2-probability-r2-2">0.7</mi></mtd></mtr>
            </mtable>
          <mo>]</mo>
        </math>.
  </p>
  
  <script>showDiv(1);</script>
  
  <div style="padding-right:20px; border-bottom:1px solid #ccc; border-top:1px solid #ccc;">
    <button onclick="showDiv(1)" class="button-method btn-clicked" id="isedbutton">ISED</button>
    <button onclick="showDiv(2)" class="button-method" id="dplbutton">DeepProbLog</button>
    <button onclick="showDiv(3)" class="button-method">Scallop</button>
    <button onclick="showDiv(4)" class="button-method" style="border-right: 0px">REINFORCE</button>
  </div>
  
  <div id="div1" class="content">
    <div class="container">
        <button onclick="isedshow()" style="display: inline-block;" class="button-sample">Sample</button>
        <table id="isedresult" style="align:center"></table>
    </div>
    <div class="container">
      <div id="isedagg" style=""></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div display="inline-block" id="ised" style="margin-left: 15px;"></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div id="isedloss"></div>
      </div>
    </div>
  
  <div id="div2" class="content hidden">
    <table id="dplresult" style="align:center"></table>
    <div class="container">
      <div id="dplagg" style=""></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div display="inline-block" style="margin-left: 15px;" id="dpl"></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div id="dplloss"></div>
    </div>
  </div>
  
  <div id="div3" class="content hidden">
    <div class="container">
      <button onclick="scallop1show()" style="margin: 0 5px;" class="button-sample">top-1</button>
      <button onclick="scallop3show()" style="display: inline-block;" class="button-sample">top-3</button>
      <table id="scallopresult" style="align:center"></table>
    </div>
    <div class="container" style="overflow-x:auto">
      <div id="scallopagg" style="width: auto;"></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div display="inline-block" style="margin-left: 15px;" id="scallop"></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div id="scalloploss"></div>
    </div>
  </div>
  
  <div id="div4" class="content hidden">
    <div class="container">
      <button onclick="reinforceshow()" style="display: inline-block;" class="button-sample">Sample</button>
      <table id="reinforceresult" style="align:center"></table>
    </div>
    <div id="reinforceloss"></div>
  </div>

</div>

<script>
  // Default sampling when page loads
  document.addEventListener("DOMContentLoaded", function() {
      isedshow();
      dplshow();
      scallop1show();
      reinforceshow();
  });

  const buttons = document.querySelectorAll('.button-method');
   buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(btn => btn.classList.remove('btn-clicked'));
                this.classList.add('btn-clicked');
            });
        });

  function showDiv(divNum) {
      // Hide all divs
      var divElements = document.querySelectorAll('.content');
      for (var i = 0; i < divElements.length; i++) {
        divElements[i].classList.add('hidden');
    }
    document.getElementById('div' + divNum).classList.remove('hidden');
  }

  function get_prob(n, i){
      if(i<=0) return n.zero
      if(i<=1) return n.one
      if(i<=2) return n.two;
    }
  
  function sample(n1, n2, y) {
    function randn_bm(n) {
      let u = 0;
      u = Math.random(); 
      if (u < n.zero) return 0
      if (u < n.zero + n.one) return 1
      return 2;
    }

    let samples = [];
    for (let i = 0; i < 5; i++) {
      a = randn_bm(n1)
      b = randn_bm(n2)
      sum = a + b
      pa = get_prob(n1, a)
      pb = get_prob(n2, b)
      if(sum==y) reward = 1
      else reward = 0
      pab = pa * pb
      minab = Math.min(pa, pb)
      samples.push({a, b, sum, pa, pb, reward, pab, minab});
    }
    return samples;
  }

  function enumerate(n1, n2){
    let samples = [];
    for (let i = 0; i < 3; i ++){
      for (let j = 0; j < 3; j++){
        a = i
        b = j
        sum = a + b
        pa = get_prob(n1, a)
        pb = get_prob(n2, b)
        pab = pa * pb
        minab = Math.min(pa, pb)
        samples.push({a, b, sum, pa, pb, pab, minab});
      }
    }
    return samples;
  }

  function filter(samples) {
    let min = samples[0] 
    samples.forEach(sample => {
      let t = sample.pa * sample.pb;
      let minp = min.pa * min.pb
      if(t > minp) min = sample
      if(t==minp) {
        if(Math.random() < 0.5) min = sample
      } 
    })
    return [min]
  }

  function classify(samples) {
    let zero = [], one = [], two = [], three = [], four = [];
    samples.forEach(sample => {
      let s = sample.sum; 
      if(s == 0) zero.push(sample)
      if(s == 1) one.push(sample)
      if(s == 2) two.push(sample)
      if(s == 3) three.push(sample)
      if(s == 4) four.push(sample)
  })
    return [zero, one, two, three, four]
  }

  function wmc(samples){
    let t = samples.reduce((acc, val) => acc + val.pa.toString()+ ' * ' + val.pb.toString() + ' + ', '').slice(0, -3);
    if(t.length < 1) return '0'
    return t
  }

  function minmax(samples){
    let t = samples.reduce((acc, val) => acc + "min(" + val.pa.toString()+ ' , ' + val.pb.toString() + '), ', '').slice(0, -2);
    if(t.length < 1) return '0'
    if(t.length > 15) return "max(" + t + ")"
    return t
  }

  function ws(samples, method, resultname, lossname){
    document.getElementById(resultname).innerHTML = `
        <tr>
          <th> sample </th>
          ${samples.reduce((acc, val) => acc + "<th> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</th>', '')}
        </tr>
        <tr>
          <th> output </th>
          ${samples.reduce((acc, val) => acc + "<th> " + val.sum.toString()+ '</th>', '')}
        </tr>
        <tr>
          <th> reward </th>
          ${samples.reduce((acc, val) => acc + "<th> " + val.reward.toString()+ '</th>', '')}
        </tr>`;
    
    document.getElementById(lossname).innerHTML = `
      <math display="inline-block" style="margin-right: 0px;"> 
        <mo>[</mo>
        <mtable>
          ${samples.reduce((acc, val) => acc + "<mtr><mtd><mi>log(" + val.pa.toString()+ ') + log(' + val.pb.toString() + ')'+ '</mi></mtd></mtr>', '')}
        </mtable>
        <mo>]</mo>
      </math>
      *
      <math display="inline-block"> 
        <mo>[</mo>
        <mtable>
          ${samples.reduce((acc, val) => acc + "<mtr><mtd><mi>" + val.reward.toString()+ '</mi></mtd></mtr>', '')}
        </mtable>
        <mo>]</mo>
      </math>`;
    
    document.getElementById(method).innerHTML = `
        <mo>[</mo>
        <mtable>
          ${samples.reduce((acc, val) => acc + "<mtr><mtd><mi>log(" + val.pa.toString()+ ') + log(' + val.pb.toString() + ')'+ '</mi></mtd></mtr>', '')}
        </mtable>
        <mo>]</mo>;`
  }

  function isedshow() {
    let samples = sample({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7}, 3);
    let [zero, one, two, three, four] = classify(samples)
    common(samples, zero, one, two, three, four, 'ised', 'isedagg', 'isedresult', 'isedloss')
    //isedminmax(samples, zero, one, two, three, four, 'minmax', 'minmaxloss')
  }

  function reinforceshow() {
    let samples = sample({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7}, 3);
    ws(samples, 'reinforce', 'reinforceresult', 'reinforceloss')
  }

  function dplshow(){
    let samples = enumerate({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7})
    let [zero, one, two, three, four] = classify(samples)
    common(samples, zero, one, two, three, four, 'dpl', 'dplagg', 'dplresult', 'dplloss')
  }

  function scallop3show(){
    let samples = enumerate({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7})
    let [zero, one, two, three, four] = classify(samples)
    common(samples, zero, one, two, three, four, 'scallop', 'scallopagg', 'scallopresult', 'scalloploss')
  }

  function scallop1show(){
    let samples = enumerate({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7})
    let [zero, one, two, three, four] = classify(samples)
    common(samples, filter(zero), filter(one), filter(two), filter(three), filter(four), 'scallop', 'scallopagg', 'scallopresult', 'scalloploss')
  }

  function common(samples, zero, one, two, three, four, method, aggname, resultname, lossname){
    document.getElementById(aggname).innerHTML = `
    <table>
      <tr>
        <th>y=0</th>
        ${zero.reduce((acc, val) => acc + "<th> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</th>', '')}
      </tr>
      <tr>
        <th>y=1</th>
        ${one.reduce((acc, val) => acc + "<th> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</th>', '')}
      </tr>
      <tr>
        <th>y=2</th>
        ${two.reduce((acc, val) => acc + "<th> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</th>', '')}
      </tr>
      <tr>
        <th>y=3</th>
        ${three.reduce((acc, val) => acc + "<th> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</th>', '')}
      </tr>
      <tr>
        <th>y=4</th>
        ${four.reduce((acc, val) => acc + "<th> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</th>', '')}
      </tr>
    </table>`

    var m = document.getElementById(method);
    m.innerHTML = `<math display="inline-block" style="margin-right: 0px;">
                   <mtable>`;
    for(let i = 0; i < 5; i++){
      x = [zero, one, two, three, four][i];
      m.innerHTML += `<mtr><mtd><mi>`;
      if(x.length==0) m.innerHTML += `0`;
      for(let j = 0; j < x.length; j++){
        m.innerHTML += `<span class="probability fig2-probability-r1-${x[j].a}"> ${x[j].pa} </span> * 
                        <span class="probability fig2-probability-r2-${x[j].b}"> ${x[j].pb} </span>`;
        if(j + 1 < x.length) m.innerHTML += `+`;   
      };
      m.innerHTML += `</mi></mtd></mtr>`;
      m.innerHTML += `<br>`;
    }
    m.innerHTML += `</mtable></math>`;
    
    document.getElementById(lossname).innerHTML = `
    <span>\\(\\mathcal{L}\\)</span>
    <math display="inline-block" style="margin-right: 0px;">
      <mo>(</mo>
      <mo>[</mo>
        <mtable>
          <mtr><mtd><mi>${zero.reduce((acc, val) => acc + val.pab, 0).toFixed(2)}</mi></mtd></mtr>
          <mtr><mtd><mi>${one.reduce((acc, val) => acc + val.pab, 0).toFixed(2)}</mi></mtd></mtr>
          <mtr><mtd><mi>${two.reduce((acc, val) => acc + val.pab, 0).toFixed(2)}</mi></mtd></mtr>
          <mtr><mtd><mi>${three.reduce((acc, val) => acc + val.pab, 0).toFixed(2)}</mi></mtd></mtr>
          <mtr><mtd><mi>${four.reduce((acc, val) => acc + val.pab, 0).toFixed(2)}</mi></mtd></mtr>
        </mtable>
      <mo>]</mo>
      </math>
      ,
    <math display="inline-block">
      <mo>[</mo>
        <mtable>
          <mtr><mtd><mi>0</mi></mtd></mtr>
          <mtr><mtd><mi>0</mi></mtd></mtr>
          <mtr><mtd><mi>0</mi></mtd></mtr>
          <mtr><mtd><mi>1</mi></mtd></mtr>
          <mtr><mtd><mi>0</mi></mtd></mtr>
        </mtable>
      <mo>]</mo>
    <mo>)</mo>
    </math>`;

    // Display all samples
    document.getElementById(resultname).innerHTML = `
      <tr>
        <th> sample </th>
        ${samples.reduce((acc, val) => acc + "<th> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</th>', '')}
      </tr>
      <tr>
        <th> output </th>
        ${samples.reduce((acc, val) => acc + "<th> " + val.sum.toString()+ '</th>', '')}
      </tr>`;
  }

  function isedminmax(samples, zero, one, two, three, four, method, lossname){
    document.getElementById(method).innerHTML = `
      <mo>[</mo>
        <mtable>
          <mtr><mtd><mi>${minmax(zero)}</mi></mtd></mtr>
          <mtr><mtd><mi>${minmax(one)}</mi></mtd></mtr>
          <mtr><mtd><mi>${minmax(two)}</mi></mtd></mtr>
          <mtr><mtd><mi>${minmax(three)}</mi></mtd></mtr>
          <mtr><mtd><mi>${minmax(four)}</mi></mtd></mtr>
        </mtable>
      <mo>]</mo>`;

    document.getElementById(lossname).innerHTML = `
    <span>\\(\\mathcal{L}\\)</span>
    <math display="inline-block" style="margin-right: 0px;">
      <mo>(</mo>
      <mo>[</mo>
        <mtable>
          <mtr><mtd><mi>${zero.reduce((acc, val) => Math.max(acc, val.minab), 0).toFixed(1)}</mi></mtd></mtr>
          <mtr><mtd><mi>${one.reduce((acc, val) => Math.max(acc, val.minab), 0).toFixed(1)}</mi></mtd></mtr>
          <mtr><mtd><mi>${two.reduce((acc, val) => Math.max(acc, val.minab), 0).toFixed(1)}</mi></mtd></mtr>
          <mtr><mtd><mi>${three.reduce((acc, val) => Math.max(acc, val.minab), 0).toFixed(1)}</mi></mtd></mtr>
          <mtr><mtd><mi>${four.reduce((acc, val) => Math.max(acc, val.minab), 0).toFixed(1)}</mi></mtd></mtr>
        </mtable>
      <mo>]</mo>
      </math>
      ,
    <math display="inline-block">
      <mo>[</mo>
        <mtable>
          <mtr><mtd><mi>0</mi></mtd></mtr>
          <mtr><mtd><mi>0</mi></mtd></mtr>
          <mtr><mtd><mi>0</mi></mtd></mtr>
          <mtr><mtd><mi>1</mi></mtd></mtr>
          <mtr><mtd><mi>0</mi></mtd></mtr>
        </mtable>
      <mo>]</mo>
    <mo>)</mo>
    </math>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const links = [
      // {class: 'probability', hoverClass: 'probability-hover'},
      {class: 'fig2-probability-r1-0', hoverClass: 'fig2-probability-hover-r1-0'},
      {class: 'fig2-probability-r1-1', hoverClass: 'fig2-probability-hover-r1-1'},
      {class: 'fig2-probability-r1-2', hoverClass: 'fig2-probability-hover-r1-2'},
      {class: 'fig2-probability-r2-0', hoverClass: 'fig2-probability-hover-r2-0'},
      {class: 'fig2-probability-r2-1', hoverClass: 'fig2-probability-hover-r2-1'},
      {class: 'fig2-probability-r2-2', hoverClass: 'fig2-probability-hover-r2-2'}
    ];

    links.forEach(link => {
      const elements = document.querySelectorAll(`.${link.class}`);
      elements.forEach(el => {
        el.addEventListener('mouseover', () => {
          elements.forEach(ele => ele.classList.add(link.hoverClass));
        });
        el.addEventListener('mouseout', () => {
          elements.forEach(ele => ele.classList.remove(link.hoverClass));
        });
      });
    });
  });
</script>

<script>

</script>

## Evaluation

We evaluate ISED on 16 tasks. Two tasks involve calls to GPT-4 and therefore cannot be specified in neurosymbolic frameworks. We use the tasks of scene recognition, leaf classification, Sudoku solving, Hand-Written Formula (HWF), and 11 other tasks involving operations over MNIST digits (called MNIST-R benchmarks).

We use Scallop, DPL, REINFORCE, IndeCateR, NASR, and A-NeSI as baselines. We present our results below.

<table class="styled-table">
    <thead>
      <tr>
        <th></th>
        <th colspan="1" style="text-align: center; vertical-align: middle;">HWF</th>
        <th colspan="2" style="text-align: center; vertical-align: middle;">leaf</th>
        <th colspan="1" style="text-align: center; vertical-align: middle;">scene</th>
        <th colspan="1" style="text-align: center; vertical-align: middle;">sudoku</th>
        <th colspan="11" style="text-align: center; vertical-align: middle;">MNIST-R</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <th></th>
          <td>HWF</td>
          <td>DT leaf</td>
          <td>GPT leaf</td>
          <td>scene</td>
          <td>sudoku</td>
          <td>sum$_2$</td>
          <td>sum$_3$</td>
          <td>sum$_4$</td>
          <td>mult$_2$</td>
          <td>mod$_2$</td>
          <td>less-than</td>
          <td>add-mod-3</td>
          <td>add-sub</td>
          <td>equal</td>
          <td>not-3-or-4</td>
          <td>count-3-4</td>
      </tr>
      <tr>
          <th>DPL</th>
          <td>TO</td>
          <td>81.13</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>TO</td>
          <td>95.14</td>
          <td>93.80</td>
          <td>TO</td>
          <td>95.43</td>
          <td>96.34</td>
          <td><strong>96.60</strong></td>
          <td>95.28</td>
          <td>93.86</td>
          <td><strong>98.53</strong></td>
          <td>98.19</td>
          <td>TO</td>
      </tr>
      <tr>
          <th>Scallop</th>
          <td>96.65</td>
          <td>81.13</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>TO</td>
          <td>91.18</td>
          <td>91.86</td>
          <td>80.1</td>
          <td>87.26</td>
          <td>77.98</td>
          <td>80.02</td>
          <td>75.12</td>
          <td>92.02</td>
          <td>71.60</td>
          <td>97.42</td>
          <td>93.47</td>
      </tr>
      <tr>
          <th>A-NeSI</th>
          <td>3.13</td>
          <td>78.82</td>
          <td>72.40</td>
          <td>61.46</td>
          <td>26.36</td>
          <td><strong>96.66</strong></td>
          <td>94.39</td>
          <td>78.10</td>
          <td><strong>96.25</strong></td>
          <td><strong>96.89</strong></td>
          <td>94.75</td>
          <td>77.44</td>
          <td>93.95</td>
          <td>77.89</td>
          <td>98.63</td>
          <td>93.73</td>
      </tr>
      <tr>
          <th>REINFORCE</th>
          <td>18.59</td>
          <td>23.60</td>
          <td>34.02</td>
          <td>47.07</td>
          <td>79.08</td>
          <td>74.46</td>
          <td>19.40</td>
          <td>13.84</td>
          <td>96.62</td>
          <td>94.40</td>
          <td>78.92</td>
          <td><strong>95.42</strong></td>
          <td>17.86</td>
          <td>78.26</td>
          <td><strong>99.28</strong></td>
          <td>87.78</td>
      </tr>
      <tr>
          <th>IndeCateR</th>
          <td>15.14</td>
          <td>40.38</td>
          <td>52.67</td>
          <td>12.28</td>
          <td>66.50</td>
          <td>95.70</td>
          <td>66.24</td>
          <td>13.02</td>
          <td>96.32</td>
          <td>93.88</td>
          <td>78.20</td>
          <td>94.02</td>
          <td>70.12</td>
          <td>83.10</td>
          <td><strong>99.28</strong></td>
          <td>2.26</td>
      </tr>
      <tr>
          <th>NASR</th>
          <td>1.85</td>
          <td>16.41</td>
          <td>17.32</td>
          <td>2.02</td>
          <td>82.78</td>
          <td>6.08</td>
          <td>5.48</td>
          <td>4.86</td>
          <td>5.34</td>
          <td>20.02</td>
          <td>49.30</td>
          <td>33.38</td>
          <td>5.26</td>
          <td>81.72</td>
          <td>68.36</td>
          <td>25.26</td>
      </tr>
      <tr>
          <th>ISED</th>
          <td><strong>97.34</strong></td>
          <td><strong>82.32</strong></td>
          <td><strong>79.95</strong></td>
          <td><strong>68.59</strong></td>
          <td>80.32</td>
          <td>80.34</td>
          <td><strong>95.10</strong></td>
          <td><strong>94.1</strong></td>
          <td>96.02</td>
          <td>96.68</td>
          <td>96.22</td>
          <td>83.76</td>
          <td><strong>95.32</strong></td>
          <td>96.02</td>
          <td>98.08</td>
          <td><strong>95.26</strong></td>
      </tr>
    </tbody>
</table>

Despite treating $P$ as a black-box, ISED outperforms 

## Conclusion

We proposed ISED, a data- and sample-efficient algorithm for learning neural programs. Unlike existing neurosymbolic frameworks which require differentiable logic programs, ISED is compatible with Python programs and API calls to GPT. 

<!-- For more details in thoeretical proofs and quantitative experiments, see our [paper](https://arxiv.org/abs/2310.16316) and [code](https://github.com/DebugML/sop). -->

### Citation
@misc{solkobreslin2024neuralprograms,
    title={},
    author={Alaia Solko-Breslin and Seewon Choi and Ziyang Li and Neelay Velingker and Rajeev Alur and Mayur Naik and Eric Wong},
    year={2024},
    eprint={},
    archivePrefix={arXiv},
    primaryClass={cs.LG}
}
