---
title: "Data-Efficient Learning with Neural Programs"
layout: single
excerpt: "Combining neural perception with symbolic or GPT-based reasoning"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: assets/images/neural_programs/scene_recognition.png
  teaser: assets/images/neural_programs/scene_recognition.png
  actions:
    - label: "Paper"
      url: https://arxiv.org/abs/2406.06246
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
  margin-left: 15px;
  margin-right: 15px;
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
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


> This post introduces neural programs: the composition of neural networks with general programs, such as those written in a traditional programming language or an API call to an LLM.
> We present new neural programming tasks that consist of generic Python and calls to GPT-4.
> To learn neural programs, we develop ISED, an algorithm for data-efficient learning of neural programs.

Neural programs are the composition of a neural model $M_\theta$ followed by a program $P$.
Neural programs can be used to solve computational tasks that neural perception alone cannot solve, such as those involving complex symbolic reasoning.

Neural programs also offer the opportunity to interface existing black-box programs, such as GPT or other custom software, with the real world via sensoring/perception-based neural networks.
$P$ can take many forms, including a Python program, a logic program, or a call to a state-of-the-art foundation model.
One task that can be expressed as a neural program is scene recognition, where $M_\theta$ classifies objects in an image and $P$ prompts GPT-4 to identify the room type given these objects.


<!-- Here are some examples of neural programs: -->
Click on the thumbnails to see different examples of neural programs:

<ul class="tab" data-tab="neural-program-examples" data-name="otherxeg" style="margin-left:3px">
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

These tasks can be difficult to learn without intermediate labels for training $M_\theta$.
The main challenge concerns how to estimate the gradient across $P$ to facilitate end-to-end learning.


## Neurosymbolic Learning Frameworks

Neurosymbolic learning is one instance of neural program learning in which $P$ is a logic program.
[Scallop](https://arxiv.org/abs/2304.04812) and [DeepProbLog (DPL)](https://arxiv.org/abs/1805.10872) are neurosymbolic learning frameworks that use Datalog and ProbLog respectively.

Click on the thumbnails to see examples of neural programs expressed as logic programs in Scallop.
Notice how some programs are much more verbose than they would be if written in Python. 
For instance, the Python program for Hand-Written Formula could be a single line of code calling the built-in `eval` function,
instead of the manually built lexer, parser, and interpreter.  

<!-- Second Figure -->
<ul class="tab" data-tab="second-figure" data-name="secondfigure" style="margin-left:3px">
  {% for i in (1..3) %}
  <li class="{% if forloop.index == 2 %}active{% endif %}" style="width: 10%; padding: 0; margin: 0">
      <a href="#" style="padding: 5%; margin: 0"><img src="/assets/images/neural_programs/blog_figs_attrs/{{ i }}/thumbnail.png" alt="{{ i | plus: 1 }}"></a>
  </li>
  {% endfor %}
</ul>
<ul class="tab-content" id="second-figure" data-name="secondfigure">
  {% for example in page.logic_programs %}
  <li class="{% if forloop.index == 2 %}active{% endif %}">
      <div style="text-align: center; display: flex; justify-content: space-around; align-items: center;">
        {% if forloop.index <= 5 %}
        <figure class="center" style="margin-top: 0; margin-bottom: 5pt;">
        <figcaption>{{ example.caption }}</figcaption>
          <div class="code-popup" style="overflow-y: auto; overflow-x: auto; width:600px; max-height: 320px; background-color: #231E18; color: #CABCB1; border-radius: 5px;">
              <pre class="code-block"><code class="code-snippet">{{ example.code }}</code></pre>
            </div>
        </figure>
        {% endif %}
      </div>
  </li>
  {% endfor %}
</ul>

When $P$ is a logic program, techniques have been developed for differentiation by exploiting its structure.
However, these frameworks use specialized languages that offer a narrow range of features.
The scene recognition task, as described above, can’t be encoded in Scallop or DPL due to its use of GPT-4, which cannot be expressed as a logic program.

To solve the general problem of learning neural programs, a learning algorithm that treats $P$ as black-box is required.
By this, we mean that the learning algorithm must perform gradient estimation through $P$ without being able to explicitly differentiate it.
Such a learning algorithm must rely only on symbol-output pairs that represent inputs and outputs of $P$.


## Black-Box Gradient Estimation 

Previous works on black-box gradient estimation can be used for learning neural programs. [REINFORCE](https://link.springer.com/article/10.1007/BF00992696) samples from the probability distribution output by $M_\theta$ and computes the reward for each sample. It then updates the parameter to maximize the log probability of the sampled symbols weighed by the reward value. 

There are different variants of REINFORCE, including [IndeCateR](https://arxiv.org/abs/2311.12569) that improves upon the sampling strategy to lower the variance of gradient estimation and [NASR](https://openreview.net/forum?id=en9V5F8PR-) that targets efficient finetuning with single sample and custom reward function. 
[A-NeSI](https://arxiv.org/abs/2212.12393) instead uses the samples to train a surrogate neural network of $P$, and updates the parameter by back-propagating through this surrogate model.

While these techniques can achieve high performance on tasks like Sudoku solving and MNIST addition, they struggle with data inefficiency (i.e., learning slowly when there are limited training data) and sample inefficiency (i.e., requiring a large number of samples to achieve high accuracy). 


## Our Approach: ISED
Now that we understand neurosymbolic frameworks and algorithms that perform black-box gradient estimation, we are ready to introduce an algorithm that combines concepts from both techniques to facilitate learning.

Suppose we want to learn the task of adding two MNIST digits (sum$_2$). In Scallop, we can express this task with the program

```
    sum_2(a + b) :- digit_1(a), digit_2(b)
```

and Scallop allows us to differentiate across this program. 
In the general neural program learning setting, we don’t assume that we can differentiate $P$, and we use a Python program for evaluation:

```
    def sum_2(a, b):
        return a + b
```

We introduce Infer-Sample-Estimate-Descend (ISED), an algorithm that produces a summary logic program representing the task using only forward evaluation, and differentiates across the summary. We describe each step of the algorithm below.

**Step 1: Infer**

The first step of ISED is for the neural models to perform inference. In this example, $M_\theta$ predicts distributions for digits $a$ and $b$. Suppose that we obtain the following distributions:

<div style="text-align: center; margin-bottom:25px">
$p_a = [p_{a0}, p_{a1}, p_{a2}] = [0.1, 0.6, 0.3]$<br>
$p_b = [p_{b0}, p_{b1}, p_{b2}] = [0.2, 0.1, 0.7]$
</div>

**Step 2: Sample**

ISED is initialized with a sample count $k$, representing the number of samples to take from the predicted distributions in each training iteration.

Suppose that we initialize $k=3$, and we use a categorical sampling procedure. ISED might sample the following pairs of symbols: (1, 2), (1, 0), (2, 1). ISED would then evaluate $P$ on these symbol pairs, obtaining the outputs 3, 1, and 3.

**Step 3: Estimate**

ISED then takes the symbol-output pairs obtained in the last step and produces the following summary logic program:

```
    a = 1 /\ b = 2 -> y = 3
    a = 1 /\ b = 0 -> y = 1
    a = 2 /\ b = 1 -> y = 3
```

ISED differentiates through this summary program by aggregating the probabilities of inputs for each possible output.

In this example, there are 5 possible output values (0-4). For $y=3$, ISED would consider the pairs (1, 2) and (2, 1) in its probability aggregation. This resulting aggregation would be equal to $p_{a1} * p_{b2} + p_{a2} * p_{b1}$. Similarly, the aggregation for $y=1$ would consider the pair (1, 0) and would be equal to $p_{a1} * p_{b0}$.

We say that this method of aggregation uses the `add-mult` semiring, but a different method of aggregation called the `min-max` semiring uses `min` instead of `mult` and `max` instead of `add`. Different semirings might be more or less ideal depending on the task.

We restate the predicted distributions from the neural model and show the resulting prediction vector after aggregation. Hover over the elements to see where they originated from in the predicted distributions.

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
    background-color: rgba(128,128,128,0.5);
  }
  .fig1-probability-r1-1:hover,
  .fig1-probability-hover-r1-1 {
    background-color: rgba(255,255,0,0.5);
  }
  .fig1-probability-r1-2:hover,
  .fig1-probability-hover-r1-2 {
    background-color: rgba(255,165,0,0.5);
  }
  .fig1-probability-r2-0:hover,
  .fig1-probability-hover-r2-0 {
    background-color: rgba(0,128,0,0.5);
  }
  .fig1-probability-r2-1:hover,
  .fig1-probability-hover-r2-1 {
    background-color: rgba(255,192,203,0.5);
  }
  .fig1-probability-r2-2:hover,
  .fig1-probability-hover-r2-2 {
    background-color: rgba(255,0,0,0.5);
  }
  .fig2-probability-r1-0:hover,
  .fig2-probability-hover-r1-0 {
    background-color: rgba(128,128,128,0.5);
  }
  .fig2-probability-r1-1:hover,
  .fig2-probability-hover-r1-1 {
    background-color: rgba(255,255,0,0.5);
  }
  .fig2-probability-r1-2:hover,
  .fig2-probability-hover-r1-2 {
    background-color: rgba(255,165,0,0.5);
  }
  .fig2-probability-r2-0:hover,
  .fig2-probability-hover-r2-0 {
    background-color: rgba(0,128,0,0.5);
  }
  .fig2-probability-r2-1:hover,
  .fig2-probability-hover-r2-1 {
    background-color: rgba(255,192,203,0.5);
  }
  .fig2-probability-r2-2:hover,
  .fig2-probability-hover-r2-2 {
    background-color: rgba(255,0,0,0.5);
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

<div style="text-align: center;">
  <p style="margin-bottom:0;  margin-top:0">
    $p_a = \left[ \right. $<span class="fig1-probability-r1-0">$0.1$</span>$, $
    <span class="fig1-probability-r1-1">$0.6$</span>$, $
    <span class="fig1-probability-r1-2">$0.3$</span>$\left. \right]$
  </p>
  <p>
    $p_b = \left[ \right. $<span class="fig1-probability-r2-0">$0.2$</span>$, $
    <span class="fig1-probability-r2-1">$0.1$</span>$, $
    <span class="fig1-probability-r2-2">$0.7$</span>$\left. \right]$
  </p>
</div>

<div class="vector-container" style="margin-top:45px">
  <div class="vector">
    <div class="bracket left-bracket">⎡<br>⎢<br>⎢<br>⎢<br>⎣</div>
    <div class="elements">
      <div class="element">$0.0$</div>
      <div class="element" style="text-align:center"><span class="probability fig1-probability-r1-1">$0.6$</span> * <span class="probability fig1-probability-r2-0">$0.2$</span></div>
      <div class="element">$0.0$</div>
      <div class="element" style="align:center; text-align:center"><span class="probability fig1-probability-r1-1">$0.6$</span> * <span class="probability fig1-probability-r2-2">$0.7$</span> $+$<span class="probability fig1-probability-r1-2">$0.3$</span> * <span class="probability fig1-probability-r2-1">$0.1$</span></div>
      <div class="element">$0.0$</div>
    </div>
    <div class="bracket right-bracket">⎤<br>⎥<br>⎥<br>⎥<br>⎦</div>
  </div>
</div>
<br>

We then set $\mathcal{l}$ to be equal to the loss of this prediction vector and a one-hot vector representing the ground truth final output.

**Step 4: Descend**

The last step is to optimize $\theta$ based on $\frac{\partial \mathcal{l}}{\partial \theta}$ using a stochastic optimizer (e.g., Adam optimizer). This completes the training pipeline for one example, and the algorithm returns the final $\theta$ after iterating through the entire dataset.

**Summary**

We provide an interactive explanation of the differences between the different methods discussed in this blog post. Click through the different methods to see the differences in how they differentiate across programs.
You can also sample different values for ISED and REINFORCE and change the semiring used in Scallop.

<div style="white-space: nowrap; border: 1px solid #ccc; padding: 10px;" id="scrollContainer">
  <p style="margin-bottom:5px">
    Ground truth: $a = 1$, $b = 2$, $y = 3$. </p>
  <p style="margin-bottom:15px">
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
  
  <div style="padding-right:20px; border-bottom:1px solid #ccc; border-top:1px solid #ccc;">
    <button onclick="showDiv(1)" class="button-method btn-clicked" id="isedbutton" style="background-color: lightblue">ISED</button>
    <button onclick="showDiv(2)" class="button-method" id="dplbutton" style="background-color: lightblue">DeepProbLog</button>
    <button onclick="showDiv(3)" class="button-method" style="background-color: lightblue">Scallop</button>
    <button onclick="showDiv(4)" class="button-method" style="border-right: 0px" style="background-color: lightblue">REINFORCE</button>
  </div>
  
  <div id="div1" class="content">
    <div class="container">
        <button onclick="isedshow()" style="display: inline-block;" class="button-sample" style="background-color: lightgrey">Sample</button>
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
    <div class="container">
      <table id="dplresult" style="align:center"></table>
    </div>
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
      <button onclick="scallop1show()" style="margin: 0 5px; background-color: lightgrey" class="button-sample">top-1</button>
      <button onclick="scallop3show()" style="display: inline-block; background-color: lightgrey" 
      class="button-sample">top-3</button>
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
      <button onclick="reinforceshow()" style="display: inline-block; background-color: lightgrey" class="button-sample">Sample</button>
      <table id="reinforceresult" style="align:center"></table>
    </div>
    <div class="container">
      <div id="reinforce"></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div id="reinforceagg"></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div id="reinforceloss"></div>
    </div>
  </div>

</div>

<script>
  // Default sampling when page loads
  document.addEventListener("DOMContentLoaded", function() {
      isedshow();
      dplshow();
      scallop1show();
      reinforceshow();
      linkcolors();
  });

  function linkcolors(){
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
  }

  const links = [
      // {class: 'probability', hoverClass: 'probability-hover'},
      {class: 'fig2-probability-r1-0', hoverClass: 'fig2-probability-hover-r1-0'},
      {class: 'fig2-probability-r1-1', hoverClass: 'fig2-probability-hover-r1-1'},
      {class: 'fig2-probability-r1-2', hoverClass: 'fig2-probability-hover-r1-2'},
      {class: 'fig2-probability-r2-0', hoverClass: 'fig2-probability-hover-r2-0'},
      {class: 'fig2-probability-r2-1', hoverClass: 'fig2-probability-hover-r2-1'},
      {class: 'fig2-probability-r2-2', hoverClass: 'fig2-probability-hover-r2-2'}
    ];

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

  function ws(samples, method, resultname, aggname, lossname){
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

    var m = document.getElementById(method);
    var html = '';
    html += `<math display="block"><mrow><mo>[</mo><mtable>`;
    for (let i = 0; i < 5; i++) {
      let x = i;
      html += `<mtr><mtd>`;
      html += `<mrow>`;
      html += `<mi class="probability fig2-probability-r1-${samples[i].a}">log(${samples[i].pa})</mi><mo>+</mo><mi class="probability fig2-probability-r2-${samples[i].b}">log(${samples[i].pb})</mi>`;
      html += `</mrow>`;
      html += `</mtd></mtr>`;
    }
    html += `</mtable><mo>]</mo></mrow></math>`;
    m.innerHTML = html;


    document.getElementById(aggname).innerHTML = `
      <math display="inline-block" style="margin-right: 0px;"> 
        <mo>[</mo>
        <mtable>
          ${samples.reduce((acc, val) => acc + "<mtr><mtd><mi>" + val.reward*(Math.log(val.pa)+Math.log(val.pb)).toFixed(2)+ '</mi></mtd></mtr>', '')}
        </mtable>
        <mo>]</mo>
      </math>`
      
    document.getElementById(lossname).innerHTML = `
      <math display="inline-block" style="margin-right: 0px;"> 
        <mi>-
          (${samples.reduce((acc, val) => acc + val.reward*(Math.log(val.pa)+Math.log(val.pb)).toFixed(2), 0)})
        </mi>
      </math>`;
  }

  function isedshow() {
    let samples = sample({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7}, 3);
    let [zero, one, two, three, four] = classify(samples);
    common(samples, zero, one, two, three, four, 'ised', 'isedagg', 'isedresult', 'isedloss');
    linkcolors();
  }

  function reinforceshow() {
    let samples = sample({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7}, 3);
    ws(samples, 'reinforce', 'reinforceresult', 'reinforceagg', 'reinforceloss');
    linkcolors();
  }

  function dplshow(){
    let samples = enumerate({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7})
    let [zero, one, two, three, four] = classify(samples)
    common(samples, zero, one, two, three, four, 'dpl', 'dplagg', 'dplresult', 'dplloss')
  }

  function scallop3show(){
    let samples = enumerate({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7})
    let [zero, one, two, three, four] = classify(samples)
    common(samples, zero, one, two, three, four, 'scallop', 'scallopagg', 'scallopresult', 'scalloploss');
    linkcolors();
  }

  function scallop1show(){
    let samples = enumerate({zero : 0.1, one: 0.6, two:0.3}, {zero : 0.2, one: 0.1, two:0.7})
    let [zero, one, two, three, four] = classify(samples)
    common(samples, filter(zero), filter(one), filter(two), filter(three), filter(four), 'scallop', 'scallopagg', 'scallopresult', 'scalloploss');
    linkcolors();
  }

  function common(samples, zero, one, two, three, four, method, aggname, resultname, lossname){
    document.getElementById(aggname).innerHTML = `
    <math display="inline-block">
    <mtable>
      <mtr>
      <mtd><mi>y=0 : </mi></mtd>
        ${zero.reduce((acc, val) => acc + "<mtd><mi> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</mi></mtd>', '')}
      </mtr>
      <mtr>
      <mtd><mi>y=1 : </mi></mtd>
        ${one.reduce((acc, val) => acc + "<mtd><mi> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</mi></mtd>', '')}
      </mtr>
      <mtr>
      <mtd><mi>y=2 : </mi></mtd>
        ${two.reduce((acc, val) => acc + "<mtd><mi> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</mi></mtd>', '')}
      </mtr>
      <mtr>
      <mtd><mi>y=3 : </mi></mtd>
        ${three.reduce((acc, val) => acc + "<mtd><mi> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</mi></mtd>', '')}
      </mtr>
      <mtr>
      <mtd><mi>y=4 : </mi></mtd>
        ${four.reduce((acc, val) => acc + "<mtd><mi> (" + val.a.toString()+ ' , ' + val.b.toString() + ')</mi></mtd>', '')}
      </mtr>
    </mtable></math>`;    

    var m = document.getElementById(method);
    var html = '';
    html += `<math display="block"><mrow><mo>[</mo><mtable>`;
    for (let i = 0; i < 5; i++) {
      let x = [zero, one, two, three, four][i];
      html += `<mtr><mtd>`;
      if (x.length == 0) {
        html += `<mn>0.0</mn>`;
      } else {
        html += `<mrow>`;
        for (let j = 0; j < x.length; j++) {
          html += `<mi class="probability fig2-probability-r1-${x[j].a}">${x[j].pa}</mi><mo>*</mo><mi class="probability fig2-probability-r2-${x[j].b}">${x[j].pb}</mi>`;
          if (j + 1 < x.length) {
            html += `<mo>+</mo>`;
          }
        }
        html += `</mrow>`;
      }
      html += `</mtd></mtr>`;
    }
    html += `</mtable><mo>]</mo></mrow></math>`;
    m.innerHTML = html;

    document.getElementById(lossname).innerHTML = `
    <math display="inline-block" style="margin-right: 0px;">
    <mi mathvariant="script">L</mi>
    </math>
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
</script>

<script>

</script>

## Evaluation

We evaluate ISED on 16 tasks. Two tasks involve calls to GPT-4 and therefore cannot be specified in neurosymbolic frameworks. We use the tasks of scene recognition, leaf classification (using decision trees or GPT-4), Sudoku solving, Hand-Written Formula (HWF), and 11 other tasks involving operations over MNIST digits (called MNIST-R benchmarks).

Our results demonstrate that on tasks that can be specified as logic programs, ISED achieves similar, and sometimes superior accuracy compared to neurosymbolic baselines.
Additionally, ISED often achieves superior accuracy compared to black-box gradient estimation baselines, especially on tasks in which the black-box component involves complex reasoning.
Our results demonstrate that ISED is often more data- and sample-efficient than state-of-the-art baselines.

**Performance and Accuracy**

Our results show that ISED achieves comparable, and often superior accuracy compared to neurosymbolic and black-box gradient estimation baselines on the benchmark tasks.

We use [Scallop](https://arxiv.org/abs/2304.04812), [DPL](https://arxiv.org/abs/1805.10872), [REINFORCE](https://link.springer.com/article/10.1007/BF00992696), [IndeCateR](https://arxiv.org/abs/2311.12569), [NASR](https://openreview.net/forum?id=en9V5F8PR-), and [A-NeSI](https://arxiv.org/abs/2212.12393) as baselines.
We present our results in the tables below, divided by "custom" tasks (HWF, leaf, scene, and sudoku), MNIST-R arithmetic, and MNIST-R other.
"N/A" indicates that the task cannot be programmed in the given framework, and "TO" means that there was a timeout.

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table Selector</title>
</head>
<body>
    <button id="customButton" style="background-color: lightgrey" onclick="showCustomTable()">Custom</button>
    <button id="mnistArithButton" style="background-color: lightgrey" onclick="showMnistArithTable()">MNIST-R (arithmetic)</button>
    <button id="mnistOtherButton" style="background-color: lightgrey" onclick="showMnistOtherTable()">MNIST-R (other)</button>
    
    <table id="customTable" class="styled-table">
        <thead>
            <tr>
                <th></th>
                <th>HWF</th>
                <th>DT leaf</th>
                <th>GPT leaf</th>
                <th>scene</th>
                <th>sudoku</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>DPL</th>
                <td>TO</td>
                <td>81.13</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>TO</td>
            </tr>
            <tr>
                <th>Scallop</th>
                <td>96.65</td>
                <td>81.13</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>TO</td>
            </tr>
            <tr>
                <th>A-NeSI</th>
                <td>3.13</td>
                <td>78.82</td>
                <td>72.40</td>
                <td>61.46</td>
                <td>26.36</td>
            </tr>
            <tr>
                <th>REINFORCE</th>
                <td>18.59</td>
                <td>23.60</td>
                <td>34.02</td>
                <td>47.07</td>
                <td>79.08</td>
            </tr>
            <tr>
                <th>IndeCateR</th>
                <td>15.14</td>
                <td>40.38</td>
                <td>52.67</td>
                <td>12.28</td>
                <td>66.50</td>
            </tr>
            <tr>
                <th>NASR</th>
                <td>1.85</td>
                <td>16.41</td>
                <td>17.32</td>
                <td>2.02</td>
                <td><strong>82.78</strong></td>
            </tr>
            <tr>
                <th>ISED</th>
                <td><strong>97.34</strong></td>
                <td><strong>82.32</strong></td>
                <td><strong>79.95</strong></td>
                <td><strong>68.59</strong></td>
                <td>80.32</td>
            </tr>
        </tbody>
    </table>
    
    <table id="mnistArithTable" class="styled-table" style="display:none;">
        <thead>
            <tr>
                <th></th>
                <th>sum_2</th>
                <th>sum_3</th>
                <th>sum_4</th>
                <th>mult_2</th>
                <th>mod_2</th>
                <th>add-mod-3</th>
                <th>add-sub</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>DPL</th>
                <td>95.14</td>
                <td>93.80</td>
                <td>TO</td>
                <td>95.43</td>
                <td>96.34</td>
                <td>95.28</td>
                <td>93.86</td>
            </tr>
            <tr>
                <th>Scallop</th>
                <td>91.18</td>
                <td>91.86</td>
                <td>80.10</td>
                <td>87.26</td>
                <td>77.98</td>
                <td>75.12</td>
                <td>92.02</td>
            </tr>
            <tr>
                <th>A-NeSI</th>
                <td><strong>96.66</strong></td>
                <td>94.39</td>
                <td>78.10</td>
                <td><strong>96.25</strong></td>
                <td><strong>96.89</strong></td>
                <td>77.44</td>
                <td>93.95</td>
            </tr>
            <tr>
                <th>REINFORCE</th>
                <td>74.46</td>
                <td>19.40</td>
                <td>13.84</td>
                <td>96.62</td>
                <td>94.40</td>
                <td><strong>95.42</strong></td>
                <td>17.86</td>
            </tr>
            <tr>
                <th>IndeCateR</th>
                <td>95.70</td>
                <td>66.24</td>
                <td>13.02</td>
                <td>96.32</td>
                <td>93.88</td>
                <td>94.02</td>
                <td>70.12</td>
            </tr>
            <tr>
                <th>NASR</th>
                <td>6.08</td>
                <td>5.48</td>
                <td>4.86</td>
                <td>5.34</td>
                <td>20.02</td>
                <td>33.38</td>
                <td>5.26</td>
            </tr>
            <tr>
                <th>ISED</th>
                <td>80.34</td>
                <td><strong>95.10</strong></td>
                <td><strong>94.10</strong></td>
                <td>96.02</td>
                <td>96.68</td>
                <td>83.76</td>
                <td><strong>95.32</strong></td>
            </tr>
        </tbody>
    </table>

    <table id="mnistOtherTable" class="styled-table" style="display:none;">
        <thead>
            <tr>
                <th></th>
                <th>less-than</th>
                <th>equal</th>
                <th>not-3-or-4</th>
                <th>count-3-4</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>DPL</th>
                <td><strong>96.60</strong></td>
                <td><strong>98.53</strong></td>
                <td>98.19</td>
                <td>TO</td>
            </tr>
            <tr>
                <th>Scallop</th>
                <td>80.02</td>
                <td>71.60</td>
                <td>97.42</td>
                <td>93.47</td>
            </tr>
            <tr>
                <th>A-NeSI</th>
                <td>94.75</td>
                <td>77.89</td>
                <td>98.63</td>
                <td>93.73</td>
            </tr>
            <tr>
                <th>REINFORCE</th>
                <td>78.92</td>
                <td>78.26</td>
                <td><strong>99.28</strong></td>
                <td>87.78</td>
            </tr>
            <tr>
                <th>IndeCateR</th>
                <td>78.20</td>
                <td>83.10</td>
                <td><strong>99.28</strong></td>
                <td>2.26</td>
            </tr>
            <tr>
                <th>NASR</th>
                <td>49.30</td>
                <td>81.72</td>
                <td>68.36</td>
                <td>25.26</td>
            </tr>
            <tr>
                <th>ISED</th>
                <td>96.22</td>
                <td>96.02</td>
                <td>98.08</td>
                <td><strong>95.26</strong></td>
            </tr>
        </tbody>
    </table>

    <script>
        function showCustomTable() {
            document.getElementById("customTable").style.display = "table";
            document.getElementById("mnistArithTable").style.display = "none";
            document.getElementById("mnistOtherTable").style.display = "none";
        }

        function showMnistArithTable() {
            document.getElementById("customTable").style.display = "none";
            document.getElementById("mnistArithTable").style.display = "table";
            document.getElementById("mnistOtherTable").style.display = "none";
        }

        function showMnistOtherTable() {
            document.getElementById("customTable").style.display = "none";
            document.getElementById("mnistArithTable").style.display = "none";
            document.getElementById("mnistOtherTable").style.display = "table";
        }

        // Show custom table by default
        showCustomTable();
    </script>
</body>

Despite treating $P$ as a black-box, ISED outperforms neurosymbolic solutions on many tasks.
In particular, while neurosymbolic solutions time out on Sudoku, ISED achieves high accuracy and even comes within 2.46% of NASR, the state-of-the art solution for this task.

The baseline that comes closest to ISED on most tasks is A-NeSI. However, since A-NeSI trains a neural model to approximate the program and its gradient, it struggles to learn tasks involving complex programs, namely HWF and Sudoku.

**Data Efficiency**

We demonstrate that when there are limited training data, ISED learns faster than A-NeSI, a state-of-the-art black-box gradient estimation baseline.

We compared ISED to A-NeSI in terms of data efficiency by evaluating them on the sum$_4$ task. This task involves just 5K training examples, which is less than what A-NeSI would have used in its evaluation on the same task (15K). In this setting, ISED reaches high accuracy much faster than A-NeSI, suggesting that it offers better data efficiency than the baseline.

<div style="margin-bottom:20px">
<canvas width="200" height="130" id="time-compare-canvas">
{% include blog_neural_programs_time_compare.html %}
</canvas>
</div>

**Sample Efficiency**

Our results suggest that on tasks with a large input space, ISED achieves superior accuracy compared to REINFORCE-based methods when we limit the sample count.

We compared ISED to REINFORCE, IndeCateR, and IndeCateR+, a variant of IndeCateR customized for higher dimensional settings, to assess how they compare in terms of sample efficiency.
We use the task of MNIST addition over 8, 12, and 16 digits, while varying the number of samples taken.
We report the results below.

<table class="styled-table">
    <thead>
      <tr>
        <th></th>
        <th colspan="2" style="text-align: center; vertical-align: middle;">sum$_8$</th>
        <th colspan="2" style="text-align: center; vertical-align: middle;">sum$_{12}$</th>
        <th colspan="2" style="text-align: center; vertical-align: middle;">sum$_{16}$</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <th></th>
          <td>$k=80$</td>
          <td>$k=800$</td>
          <td>$k=120$</td>
          <td>$k=1200$</td>
          <td>$k=160$</td>
          <td>$k=1600$</td>
      </tr>
      <tr>
          <td>REINFORCE</td>
          <td>8.32</td>
          <td>8.28</td>
          <td>7.52</td>
          <td>8.20</td>
          <td>5.12</td>
          <td>6.28</td>
      </tr>
      <tr>
          <td>IndeCateR</td>
          <td>5.36</td>
          <td><strong>89.60</strong></td>
          <td>4.60</td>
          <td>77.88</td>
          <td>1.24</td>
          <td>5.16</td>
      </tr>
      <tr>
          <td>IndeCateR+</td>
          <td>10.20</td>
          <td>88.60</td>
          <td>6.84</td>
          <td><strong>86.92</strong></td>
          <td>4.24</td>
          <td><strong>83.52</strong></td>
      </tr>
      <tr>
          <td>ISED</td>
          <td><strong>87.28</strong></td>
          <td>87.72</td>
          <td><strong>85.72</strong></td>
          <td>86.72</td>
          <td><strong>6.48</strong></td>
          <td>8.13</td>
      </tr>
    </tbody>
</table>

For lower numbers of samples, ISED outperforms all other methods on the three tasks, outperforming IndeCateR by over 80% on 8- and 12-digit addition.
These results demonstrate that ISED is more sample efficient than than the baselines for these tasks.
This is due to ISED providing a stronger learning signal than other REINFORCE-based methods.
IndeCateR+ significantly outperforms ISED for 16-digit addition with 1600 samples, which suggests that our approach is limited in its scalability.

## Limitations and Future Work

The main limitation of ISED concerns scaling with the dimensionality of the space of inputs to the program.
For future work, we are interested in exploring better sampling techniques to allow for scaling to higher-dimensional input spaces.
For example, techniques can be borrowed from the field of Bayesian optimization where such large spaces have traditionally been studied.

Another limitation of ISED involves its restriction of the structure of neural programs, only allowing the composition of a neural model followed by a program.
Other types of composites might be of interest for certain tasks, such as a neural model, followed by a program, followed by another neural model.
Improving ISED to be compatible with such composites would require a more general gradient estimation technique for the black-box components.

## Conclusion

We proposed ISED, a data- and sample-efficient algorithm for learning neural programs.
Unlike existing neurosymbolic frameworks which require differentiable logic programs, ISED is compatible with Python programs and API calls to GPT.
We demonstrate that ISED achieves similar, and often better, accuracy compared to the baselines.
ISED also learns in a more data- and sample-efficient manner compared to the baselines.

For more details about our method and experiments, see our [paper](https://arxiv.org/abs/2406.06246) and [code](https://github.com/alaiasolkobreslin/ISED/tree/v1.0.0).

### Citation
```
@article{solkobreslin2024neuralprograms,
  title={Data-Efficient Learning with Neural Programs},
  author={Solko-Breslin, Alaia and Choi, Seewon and Li, Ziyang and Velingker, Neelay and Alur, Rajeev and Naik, Mayur and Wong, Eric},
  journal={arXiv preprint arXiv:2406.06246},
  year={2024}
}
```