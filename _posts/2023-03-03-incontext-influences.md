---
title:  "In-context Learning Influences"
layout: single
excerpt: "An influence framework for studying in-context learning examples"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: assets/images/incontext_influences/thumbnail.png
  teaser: assets/images/incontext_influences/thumbnail.png
  actions:
    - label: "Paper"
      url: "https://arxiv.org/abs/2302.11042"
    - label: "Code"
      url: "https://github.com/DebugML/incontext_influences"
authors: 
  - Tai Nguyen
  - Eric Wong
  
order:
  - url: "/assets/images/incontext_influences/example_order.png"
    image_path: "/assets/images/incontext_influences/example_order.png"
    title: "An instance of few-shot prompting with GPT-3. Reordering examples lead to wrong prediction."

distribution:
  - url: "/assets/images/incontext_influences/distribution.png"
    image_path: "/assets/images/incontext_influences/distribution.png"
    title: "Distribution of in-context influences on BoolQ and SuperGLUE-RTE on OPT models."

bins:
  - url: "/assets/images/incontext_influences/influence_bins.png"
    image_path: "/assets/images/incontext_influences/influence_bins.png"
    title: "Validation accuracy improves as examples are selected in increasing influence bins."

signals:
  - url: "/assets/images/incontext_influences/signals.png"
    image_path: "/assets/images/incontext_influences/signals.png"
    title: "On Superglue-WIC, in-context influences do not correlate with any known example characteristics in many-shot ICL."

scaling:
  - url: "/assets/images/incontext_influences/scaling.png"
    image_path: "/assets/images/incontext_influences/scaling.png"
    title: "Influence-based example selection scales performance steadily with increasing k-shot. In other methods, performance can decline when more in-context examples are used."

case_study:
  - url: "/assets/images/incontext_influences/positions.png"
    image_path: "/assets/images/incontext_influences/positions.png"
    title: "Aggregated influences of each position in 4-shot prompting. Influence magnitudes are bigger at later positions."

  - url: "/assets/images/incontext_influences/positions-dist.png"
    image_path: "/assets/images/incontext_influences/positions-dist.png"
    title: "Influence distribution of each position in 4-shot prompting. Bigger spreads are wider at later positions."


---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

> In-context learning is a powerful paradigm. However, its sensitivity to the input prompt makes it difficult to trust in practice. 
We propose an influence-based example selection method that links the presence of examples directly to good ICL performance through the comptuation of in-context influences.

In recent years, in-context learning (ICL) has emerged as a powerful prompting method popularized with the introduction of [GPT-3](https://arxiv.org/abs/2005.14165).
Provided a few examples, large language models (LLMs) can perform inference by generating the next most likely continuations of texts.
Compared to finetuning, ICL requires few examples and requires no parameter updates to the model.
It also displays amazing versatility with methods such as [chain-of-thought](https://arxiv.org/abs/2201.11903) prompting 
or the ability to follow task [instructions](https://arxiv.org/abs/2203.02155).

### Perils of in-context learning

Despite these promises, ICL comes with many known weaknesses. For example, ICL is susceptible to
factors such as prompt format (natural language template), example selection (variable effectiveness of demonstrations),
and the order of in-context examples (later examples matter tend to swing model predictions) [[ACL tutorial](https://raw.githubusercontent.com/allenai/acl2022-zerofewshot-tutorial/main/acl2022-zerofewshot-tutorial.pdf)]. 

{% include gallery id="order" layout="" caption="An instance of few-shot prompting with GPT-3. Reordering examples lead to wrong prediction." %}

ICL is _brittle_. In the example above, simply reordering the examples exposes GPT-3 to recency bias.
It wrongly predicts "Positive" by spuriously following the labels at later positions in the prompt.
From a practicioner perspective, it is difficult to understand the culprits behind poor ICL performance.
Is it the prompt, the model, or the examples themselves? 

In this study, we focus on example selection as basis for making ICL more robust and propose an influence-based selection
method that can select a set of high-performing examples optimized for a performance metric.

### In-context influence
Traditional ML frameworks present a variety of methods to understand how training data affects model performance.
Methods such as Shapley values and influence functions all aim to quantify how a training example affects the prediction of a test example after training. 
Inspired by these frameworks, our goal is to trace ICL performance directly back to in-context examples.
We call the impact of these training points **in-context influence**.

Let $$S$$ be a training set and $$f(S)$$ be the validation performance after training on $$S$$.
We calculate in-context influences in a two-step process:
1. Collect a "dataset" of $$M$$ training (prompting) runs $$\mathcal D = \{(S_i, f(S_i)\}_{i=1}^M$$ where $$S_i\subseteq S$$ are random subsets of the original training dataset.
2. Estimate the influence of each example $$x\in S$$ by the equation:

\\[
  {\mathcal{I}(x_j)=\frac{1}{N_j}\sum_{S_i:x_j\in S_i} f(S_i)} - {\frac{1}{M-N_j}\sum_{S_i:x_j\notin S_i} f(S_i)}
\\]

where $$M$$ is the number of total subsets used to estimate influences, $$N_j$$ is the total number of subsets containing example $$x_j$$, and $$f(S_i)$$ is the performance metric when evaluated on the validation set.$$^1$$

When $$f$$ measures validation performance, a higher score for $$\mathcal{I}(x_j)$$ corresponds to a higher average improvement in validation performance when including $$x_j$$ in the prompt.
This is analogous to the meaning of influences in the classic, non-prompted setting.

**Cost.** From a cost perspective, our approach also draws a contrast to the classic setting.
Studying example influence requires the end-to-end training of $$M$$ models on randomly sampled subsets.
Instead of training, our cost of "training" equates to a single forward pass through the LLM.
This makes calculating in-context influences relatively cheap!

**Context window.** In ICL paradigm, the size of the sampled subset is limited by the context window.
Depends on the task/dataset, we fit a maximal number of examples for computing in-context influences.

<small>$$^1$$In our [paper](https://arxiv.org/abs/2302.11042), we present an alternative method for estimating in-context influences by leveraging [datamodels](https://arxiv.org/abs/2202.00622).</small>

### Influence-based example selection
In the above section, we discuss the influence-based formula adapted to study in-context examples.
The result of the above computations is a distribution of example influences over the entire train set:

{% include gallery id="distribution" layout="" caption="Distribution of in-context influences on BoolQ and SuperGLUE-RTE on OPT models." %}

Here, observing two tails of the influence distribution helps us identify highly impactful in-context examples.
We can use the top influential examples to create the "best" prompt, or use the bottom influential examples to create the "worst" performing prompt for ICL.

The following figure highlights this effect when examples get selected in specific regions of in-context influences:

{% include gallery id="bins" layout="" caption="Validation accuracy improves as examples are selected in increasing influence bins." %}

When example are grouped into their respective influence percentile bins and used for ICL,
we observe a positive and steady validation improvements in most models and tasks. 

Notably, there is a stark contrast between the top and the bottom in-context examples: specifically, a 22.2% 
difference in the task WSC and 21.5% difference in the task WIC on OPT-30B.
We note that this effect not only applies to the top and bottom examples but also extends to examples in the middle influence bins.
Our influence-based example selection produces stable and predictable validation performance in this setting. 


### What separate good examples?
Since influence-based selection uncovers the disparity between the good and bad examples, a natural follow-up
lies in an understanding of what makes these examples different. 
Prior work has associated various characteristics with ICl examplars: character length, perplexity, and a similarity distance to the validation set.
Quantitively, little to no correlation is seen between these characteristics and in-context influences:

{% include gallery id="signals" layout="" caption="On Superglue-WIC, in-context influences do not correlate with any known example characteristics in many-shot ICL." %}

Qualitatively, some harmful in-context examples appear to be "unnatural", such as example `#12444` in the task PIQA:
 <p style="font-family: Courier;text-align: center;">Goal: flashlight<br>Answer: shines a light</p>

In these cases, we hypothesize that a better template (e.g. one where <span style="font-family:Courier;">Goal:</span> 
and <span style="font-family:Courier;">Answer:</span> get switched) could improve the performance of some low-performing examples.

We list other examples sampled from the top and bottom influence bins on GPT-NeoX (20B).
Do you suspect any qualitative differences that separate the good and bad examples in these tasks?

Task|Bottom|Top
-|-|-
PIQA|Goal: flashlight<br>Answer: shines a light|Goal: To bind fabric before putting it through a sewing machine.<br>Answer: You should use small pins.
WIC|Pull a bank robbery.<br>He regularly pulls 12-hour days, sometimes 14.<br>question: Is the word ’pull’ used in the same sense in the two sentences above?<br>answer: true|He longed for the touch of her hand.<br>This room needs a woman’s touch.<br>question: Is the word ’touch’ used in the same sense in the two sentences above?<br>answer: false
WSC|Passage: We had hoped to place copies of our newsletter on all the chairs in the auditorium, but there were simply too many of them .<br>Question: In the passage above, does the pronoun ’them’ refer to chairs?<br>Answer: true|Passage: Sam took French classes from Adam , because he was known to speak it fluently.<br>Question: In the passage above, does the pronoun ’he’ refer to Adam?<br>Answer: true
Arc<br>(Challenge)|Question: Which unit is used to record distances between stars?<br>Answer: light years|Question: Which of these is a function of all cells?<br>Answer: to extract energy from food to sustain life
OpenBookQA|Context: which one of these is false about the greenhouse effect?<br>Answer: it causes green air in the sky|Context: One of the reasons some species go extinct is because predators<br>Answer: murder too many of them

<!--Arc<br>(Easy)|Question: A farmer sprayed his orange trees with a pesticide to eliminate the insects damaging the trees. Some of the insects survived and produced offspring that were also resistant to the insecticide. Which process is illustrated by the pesticide resistance of the offspring?<br>Answer: natural selection|Question: Modern technology has had some positive and negative effects on society. Which would be a negative effect of advances in technology?<br>Answer: human jobs replaced by more efficient machines-->

### Scaling across _k_-shot
Thus far, our estimation of in-context influences has assumed a many-shot setting where a maximal number of examples is packed into the context window.
How does our influence-based example selection generalize with fewer in-context examples?

{% include gallery id="scaling" layout="" caption="Influence-based example selection scales performance steadily with increasing k-shot. In other methods, performance can decline when more in-context examples are used." %}

At one-shot and very few-shot, in-context influences can perform worse than our baseline comparisons.
However, ICL performance steadily improves with increasing $$k$$.
This differs from random example selection, as validation accuracy does not always improve (and sometimes declines) with increasing $$k$$.

### Case study: Recency Bias
Beside calculating influences for individual in-context examples, we could further apply our framework to
quantify the influences of different positions in few-shot ICL.

To do this, we randomly choose 100 examples from the CB task and assign them into 4 groups for
4-shot prompting on OPT-6.7B. We compute an in-context influence estimate for each example-position
pair over all possible ordering permutations (4 ! = 24) and observe the results below: 

{% include gallery id="case_study" layout="half" caption="Aggregated influences are greater at later positions (left), while greater influence spreads are also seen at later positions (right)." %}

Our influence framework confirms the presence of recency bias in ICL.
Between Position #0 and Position #3, we observe a notable 2% difference in the absolute values of example influences.


### Conclusion
In this blog post, we propose a simple influence-based example selection method that can
robustly identify low- and high- performing examples.
Our framework can quantify the marginal contribution of an example as well as different phenomena associated with ICL.

For more details, please check out our [paper](https://arxiv.org/abs/2302.11042) and [code](https://github.com/DebugML/incontext_influences)
and reach out with any questions!

### Citation

> @article{nguyen2023incontextinfluences,   
       author = {Nguyen, Tai and Wong, Eric},  
       title = {In-context Example Selection with Influences}, 
   journal = {arXiv},  
   year = {2023},   
}
