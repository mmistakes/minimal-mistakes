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


> We introduce “neural programs” as the composition of a DNN followed by a program written in a traditional programming language or an API call to an LLM.
> We introduce new neural program tasks that use Python and calls to GPT-4.
> We present an algorithm for learning neural programs in a data-efficient manner.


Many computational tasks cannot be solved by neural perception alone but can naturally be expressed as a composition of a neural model $M_\theta$ followed by a program $P$.
The program takes the output predictions of the neural model and performs some kind of reasoning over them.
$P$ can take many forms, including a Python program, a logic program, or a call to a state-of-the-art foundation model such as GPT-4.
(We call such composites a neural program.)
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
      {% if forloop.index <= 3 %}
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
Previous works on black-box gradient estimation can be used for learning neural programs.  [REINFORCE](https://link.springer.com/article/10.1007/BF00992696) samples from the probability distribution output by $M_\theta$ and computes the reward for each sample. Updates the parameter to maximize the log probability of the sampled symbols weighed by the reward value. 
<!-- There are variants of REINFORCE TODO.  -->
[A-NeSI](https://arxiv.org/abs/2212.12393) instead uses the samples to train a surrogate neural network of $P$, and updates the parameter by back-propagating through this surrogate model. 


## Our Approach: ISED
Now that we understand neurosymbolic frameworks and algorithms that perform black-box gradient estimation, we introduce an algorithm that combines concepts from both techniques to facilitate learning.

Suppose we want to learn the task of adding two MNIST digits (sum$_2$). In Scallop, we can express this task with the following program:

$\texttt{sum_2(a + b) :- digit_1(a), digit_2(b)}$

and Scallop allows us to differentiate across this program. 
In the general neural program learning setting, we don’t assume that we can differentiate $P$.
We introduce Infer-Sample-Estimate-Descend (ISED), an algorithm that produces a summary logic program representing the task, using only forward evaluation.
Suppose that $M_\theta$ has predicted distributions for digits a and b, and we take categorical samples three times, evaluating the program on the sampled symbols each time.

Suppose that we sample the following pairs of symbols: (1, 2), (1, 0), (2, 1) and obtain their corresponding outputs. ISED would produce the following summary logic program:

$r_1 = 1 \land r_2 = 2 \rightarrow y = 3$

$r_1 = 1 \land r_2 = 0 \rightarrow y = 1$

$r_1 = 2 \land r_2 = 1 \rightarrow y = 3$

ISED is then able to differentiate through this summary logic program continue

## Conclusion

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
