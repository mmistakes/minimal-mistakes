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
  font-size: 10px;
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


Many computational tasks cannot be solved by neural perception alone but can naturally be expressed as a composition of a neural model $M_\theta$ followed by a program $P$.
The program takes the output predictions of the neural model and performs some kind of reasoning over them.
$P$ can take many forms, including a Python program, a logic program, or a call to a state-of-the-art foundation model such as GPT-4.
We call such composites a neural program.
One task that can be expressed as a neural program is scene recognition, where $M_\theta$ classifies objects in an image and $P$ prompts GPT-4 to identify the room type given these objects.


<!-- Here are some examples of neural programs: -->
Click on the thumbnails to see different examples of neural programs:

<ul class="tab" data-tab="other-x-examples" data-name="otherxeg">
{% for i in (0..4) %}
<li class="{% if forloop.first %}active{% endif %}" style="width: 10%; padding: 0; margin: 0">
    <a href="#" style="padding: 5%; margin: 0"><img src="/assets/images/neural_programs/blog_figs_attrs/{{ i }}/thumbnail.png" alt="{{ i | plus: 1 }}"></a>
</li>
{% endfor %}
</ul>
<ul class="tab-content" id="other-x-examples" data-name="otherxeg">

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
The main challenge concerns how to differentiate across $P$ to learn in an end-to-end manner.


## Neurosymbolic Learning Frameworks

Neurosymbolic learning is one instance of neural program learning in which $P$ is a logic program.
[Scallop](https://arxiv.org/abs/2304.04812) and [DeepProbLog](https://arxiv.org/abs/1805.10872)
are neurosymbolic learning frameworks that use Datalog and ProbLog respectively.

Here are some examples of logic programs



Restricting neurosymbolic programs to use logic programs makes it easy to differentiate $P$.
However, these frameworks use specialized languages that offer a narrow range of features.
The scene recognition task, as described above, can’t be encoded in Scallop or DeepProbLog due to its use of the GPT-4 API.
To solve the general problem of learning neural programs, a learning algorithm that treats $P$ as black-box is required.
By this, we mean that the learning algorithm must perform gradient estimation through $P$ without being able to explicitly differentiate it.
Such a learning algorithm must rely only on symbol-output pairs that represent inputs and outputs of $P$.


## Black-Box Gradient Estimation 

The key challenge comes from back-propagating the loss across the program $P$ without assuming differentiability of $P$. 
Previous works on black-box gradient estimation can be used for learning neural programs.  [REINFORCE](https://link.springer.com/article/10.1007/BF00992696) samples from the probability distribution output by $M_\theta$ and computes the reward for each sample. Then, it updates the parameter to maximize the log probability of the sampled symbols weighed by the reward value. 
There are various variants of REINFORCE, including [IndeCateR](https://arxiv.org/abs/2311.12569) that improves upon the sampling strategy to lower the variance of gradient estimation and [NASR](https://openreview.net/forum?id=en9V5F8PR-) that targets efficient finetuning with single sample and custom reward function. 
[A-NeSI](https://arxiv.org/abs/2212.12393) instead uses the samples to train a surrogate neural network of $P$, and updates the parameter by back-propagating through this surrogate model. 


## Our Approach: ISED
Now that we understand neurosymbolic frameworks and algorithms that perform black-box gradient estimation, we are ready to introduce an algorithm that combines concepts from both techniques to facilitate learning.

Suppose we want to learn the task of adding two MNIST digits (sum$_2$). In Scallop, we can express this task with the following program:

<!-- <p style="text-align: center;">`sum_2(a + b) :- digit_1(a), digit_2(b)`</p> -->
```
    sum_2(a + b) :- digit_1(a), digit_2(b)
```

and Scallop allows us to differentiate across this program. 
In the general neural program learning setting, we don’t assume that we can differentiate $P$.

We introduce Infer-Sample-Estimate-Descend (ISED), an algorithm that produces a summary logic program representing the task, using only forward evaluation. We describe each step of the algorithm below.

**Infer**

The first step of ISED is for the neural models to perform inference. In this example, $M_\theta$ predicts distributions for digits r1 and r2. Suppose that we obtain the following distributions:

<div style="text-align: center;">
$p_{a} = [0.1, 0.6, 0.3]$<br>
$p_{b} = [0.2, 0.1, 0.7]$
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

We say that this method of aggregation uses the `add-mult` semiring, but a different method of aggregation called the `min-max` semiring uses `min` instead of `mult` and `max`$ instead of `add`. Different semirings might be more or less ideal depending on the task.

This aggregation leads to the following prediction vector:

TODO: SOME GRAPHIC SHOWING THE AGGREGATION STEP

**Descend**

The last step is to optimize $\theta$ based on $\frac{\partial l}{\partial \theta}$ using a stochastic optimizer (e.g., Adam optimizer). This completes the training pipeline for one example, and the algorithm returns the final $\theta$ after iterating through the entire dataset.

<div style="white-space: nowrap; border: 1px solid #ccc; padding: 10px; font-size:12px" id="scrollContainer">
  <p>
    $a = 1$, $b = 2$. $y = 3$. <br>
      Assume $ M_\theta(x_1) = \begin{bmatrix}
              0.1\\
              0.6 \\
              0.3
              \end{bmatrix}$
      and $ M_\theta(x_2) = \begin{bmatrix}
                  0.2\\
                  0.1 \\
                  0.7
                  \end{bmatrix}$.
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
      <math display="inline-block" id="ised" style="margin-left: 15px;"></math>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <div id="isedloss"></div>
      </div>
    </div>
  
  <div id="div2" class="content hidden">
    <table id="dplresult" style="align:center"></table>
    <div class="container">
      <div id="dplagg" style=""></div>
      <img src="/assets/images/neural_programs/sort-down.png" alt="arrow" style="width: 10px">
      <math display="inline-block" style="margin-left: 15px;" id="dpl"></math>
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
      <math display="inline-block" style="margin-left: 15px;" id="scallop"></math>
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
    
    document.getElementById(method).innerHTML = `
      <mo>[</mo>
        <mtable>
          <mtr><mtd><mi>${wmc(zero)}</mi></mtd></mtr>
          <mtr><mtd><mi>${wmc(one)}</mi></mtd></mtr>
          <mtr><mtd><mi>${wmc(two)}</mi></mtd></mtr>
          <mtr><mtd><mi>${wmc(three)}</mi></mtd></mtr>
          <mtr><mtd><mi>${wmc(four)}</mi></mtd></mtr>
        </mtable>
      <mo>]</mo>`;

    document.getElementById(lossname).innerHTML = `
    BCE
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
    BCE
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
</script>

## Evaluation

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
