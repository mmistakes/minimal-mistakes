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
  
icl:
  - url: "/assets/images/incontext_influences/icl.png"
    image_path: "/assets/images/incontext_influences/icl.png"
    title: "Few-shot prompting with GPT-3."

order:
  - url: "/assets/images/incontext_influences/icl_reordering.png"
    image_path: "/assets/images/incontext_influences/icl_reordering.png"
    title: "Reordering examples lead to wrong prediction."

distribution:
  - image_path: "/assets/images/incontext_influences/distribution.svg"
    title: "Distribution of in-context influences on BoolQ and SuperGLUE-RTE on OPT models."

bins:
  - image_path: "/assets/images/incontext_influences/influence_bins.svg"
    title: "Validation accuracy improves as examples are selected in increasing influence bins."

signals:
  - image_path: "/assets/images/incontext_influences/signals.svg"
    title: "On Superglue-WIC, in-context influences do not correlate with any known example characteristics in many-shot ICL."

scaling:
  - image_path: "/assets/images/incontext_influences/scaling.svg"
    title: "Influence-based example selection scales performance steadily with increasing k-shot. In other methods, performance can decline when more in-context examples are used."

case_study:
  - image_path: "/assets/images/incontext_influences/positions.svg"
    title: "Aggregated influences of each position in 4-shot prompting. Influence magnitudes are bigger at later positions."

  - image_path: "/assets/images/incontext_influences/positions_dist.svg"
    title: "Influence distribution of each position in 4-shot prompting. Bigger spreads are wider at later positions."


---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

> In-context learning is a powerful paradigm enabled with large language models. However, its sensitivity to the input prompt makes it difficult to trust in practice. 
We propose an influence-based example selection method that links the presence of examples directly to good ICL performance 
through the use of in-context influences.

In recent advances, large language models (LLM) have offered a natural interface for users to interact with AI through the mode of **prompting**.
By describing their needs in natural language, human can steer language models to generate certain desired outputs such as writing computer programs, taking [standardized exams](https://www.cnn.com/2023/01/26/tech/chatgpt-passes-exams/index.html), 
or coming up with original [Thanksgiving dinner recipes](https://www.nytimes.com/2022/11/04/dining/ai-thanksgiving-menu.html).

To elicit better performance out of LLMs, the research community has identified a bag of "tricks" for prompting.
One can help a model generate more precise outputs by outlining a detailed task [instruction](https://arxiv.org/abs/2203.02155) or 
asking the model to think [step-by-step](https://arxiv.org/abs/2201.11903).
in this study, we focus on another common, yet powerful approach to prompting called *In-context learning* (ICL).

### Few-shot ICL
ICL is originally introduced with the release of [GPT-3](https://arxiv.org/abs/2005.14165).
This prompting paradigm involves providing the model with a set of high-quality examples (few-shot) and asking it to generate the next mostly likely text sequence.
Compared to finetuning, ICL requires no parameter updates to the model. 
The model simply "learns" by conditioning on the examples provided in-context, analogous to how a human would learn when asked to perform a task.

As an example, we can prompt GPT-3 to do sentiment analysis:
{% include gallery id="icl" type="center" layout="center" caption="An instance of few-shot ICL with GPT-3. Model completion is highlighted in blue." %}

In the above prompt, we provide GPT-3 with 3 examples (3-shot) and ask it to analyze the sentiment of the last input.
The model recognizes the distribution of the inputs (restaurant reviews), the label space ("Positive" or "Negative"), and the nature of the task. 
It correctly completes the sequence with label "Negative".


### Perils of in-context learning

Unfortunately , ICL comes with many known weaknesses. Its performance is susceptible to
factors that have no relations meaningful prompt semantics or structure. These include prompt formats (the natural language template of an example), example selection (variable effectiveness of demonstrations),
and the order of in-context examples (later examples matter tend to swing final prediction) [[ACL tutorial](https://raw.githubusercontent.com/allenai/acl2022-zerofewshot-tutorial/main/acl2022-zerofewshot-tutorial.pdf)]. 

{% include gallery id="order" layout="" caption="Reordering examples flips the prediction of GPT-3." %}

In other words, ICL is _brittle_. In the example above, simply reordering the examples has potentially exposed the model to recency bias.
It wrongly predicts "Positive" by spuriously following the labels at later positions in the prompt.
From a practicioner's perspective, it is difficult to pinpoint the culprit behind poor ICL performance?
It is not lear if the prompt, the model, or the examples themselves present the problem. 

In this study, we focus on example selection as the basis for robustifying few-shot ICL. We propose an influence-based selection
method that can select a set of high-performing examples against a performance metric that can generalize to test time.

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

$$^1$$In our [paper](https://arxiv.org/abs/2302.11042), we present an alternative method for estimating 
in-context influences by leveraging [datamodels](https://arxiv.org/abs/2202.00622).
{: .notice}

### Influence-based example selection
In the above section, we discuss the influence-based formula adapted to study in-context examples.
The above calculation result in a distribution of example influences over the entire train set:

{% include gallery id="distribution" layout="" caption="Distribution of in-context influences on Hellaswag with OPT models." %}

Here, observing two tails of the influence distribution helps us identify highly impactful in-context examples.
We can use the top influential examples to create the "best" prompt, or use the bottom influential examples to create the "worst" performing prompt for ICL.

The following figure highlights this effect when examples get selected in specific regions of in-context influences:

{% include gallery id="bins" layout="" caption="Validation accuracy improves as examples are selected in increasing influence bins." %}

When example are grouped into their respective influence percentile bins and used for ICL,
we observe a positive and steady validation improvements in most models and tasks. 

Notably, there is a stark contrast between the good and bad in-context examples: a 22.2% 
difference on the task WSC and 21.5% difference on the task WIC when examples from the top bin are used instead of examples from the bottom bin on OPT-30B.
This effect also extends to examples in the middle influence bins, where our selection method also produces stable and predictable results.


### What separate good examples?
Since influence-based selection uncovers the disparity between the good and bad examples, a natural follow-up
is asking what makes these examples different. 
Prior work has associated various characteristics with ICL exemplars such as perplexity, and a similarity distance to the validation set.
Quantitively, we find little to no correlation between these characteristics and in-context influences:

{% include gallery id="signals" layout="" caption="On Superglue-WIC, in-context influences do not correlate with any known example characteristics in many-shot ICL." %}

Qualitatively, some harmful in-context examples appear to be "unnatural", such as example `#12444` in the task PIQA:
 <p style="font-family: Courier;text-align: center;">Goal: flashlight<br>Answer: shines a light</p>

In these cases, we hypothesize that a better template (e.g. one where <span style="font-family:Courier;">Goal:</span> 
and <span style="font-family:Courier;">Answer:</span> get switched) could improve the performance of some low-performing examples.

We list other examples sampled from the top and bottom influence bins on GPT-NeoX (20B).
Do you suspect any qualitative differences that separate the good and bad examples in these tasks?

|
-|-
Arc<br>(Challenge)|**Bottom**<br>Question: Which unit is used to record distances between stars?<br>Answer: light years<br>**Top**<br>Question: Which of these is a function of all cells?<br>Answer: to extract energy from food to sustain life
OpenBookQA|**Bottom**<br>Context: which one of these is false about the greenhouse effect?<br>Answer: it causes green air in the sky<br>**Top**<br>Context: One of the reasons some species go extinct is because predators<br>Answer: murder too many of them
PIQA|**Bottom**<br>Goal: flashlight<br>Answer: shines a light<br>**Top**<br>Goal: To bind fabric before putting it through a sewing machine.<br>Answer: You should use small pins.
WIC|**Bottom**<br>Pull a bank robbery.<br>He regularly pulls 12-hour days, sometimes 14.<br>question: Is the word ’pull’ used in the same sense in the two sentences above?<br>answer: true<br>**Top**<br>He longed for the touch of her hand.<br>This room needs a woman’s touch.<br>question: Is the word ’touch’ used in the same sense in the two sentences above?<br>answer: false


<!--WSC|Passage: We had hoped to place copies of our newsletter on all the chairs in the auditorium, but there were simply too many of them .<br>Question: In the passage above, does the pronoun ’them’ refer to chairs?<br>Answer: true|Passage: Sam took French classes from Adam , because he was known to speak it fluently.<br>Question: In the passage above, does the pronoun ’he’ refer to Adam?<br>Answer: true-->
<!--Arc<br>(Easy)|Question: A farmer sprayed his orange trees with a pesticide to eliminate the insects damaging the trees. Some of the insects survived and produced offspring that were also resistant to the insecticide. Which process is illustrated by the pesticide resistance of the offspring?<br>Answer: natural selection|Question: Modern technology has had some positive and negative effects on society. Which would be a negative effect of advances in technology?<br>Answer: human jobs replaced by more efficient machines-->

### Scaling across _k_-shot
Thus far, our estimation of in-context influences has assumed a many-shot setting where a maximal number of examples is packed into the context window.
How does our influence-based example selection generalize with fewer in-context examples?

{% include gallery id="scaling" layout="" caption="Influence-based example selection scales performance steadily with increasing k-shot. In other methods, performance can decline when more in-context examples are used." %}

At one-shot and very few-shot, in-context influences can perform worse than our baseline comparisons.
However, ICL performance steadily improves with increasing $$k$$.
This differs from random example selection, as validation accuracy does not always improve (and sometimes even declines) with $$k$$.
Given many examples, influence-based selection can be used to squeeze in the last bit of performance.

### Case study: Recency Bias
Beside calculating influences for individual in-context examples, we could further apply our framework to
quantify the influences of different positions in few-shot ICL, which has also been found to be a [problem](https://arxiv.org/pdf/2104.08786.pdf).

To do this, we randomly choose 100 examples from the CB task and assign them into 4 groups for
4-shot prompting on OPT-6.7B. We compute an in-context influence estimate for each example-position
pair over all possible ordering permutations (4 ! = 24) and observe the results below: 

{% include gallery id="case_study" layout="half" caption="Aggregated influences are greater at later positions (left), while greater influence spreads are also seen at later positions (right)." %}

Our influence framework confirms the presence of recency bias in ICL.
Between Position #0 and Position #3, we observe a notable 2% difference in the absolute values of example influences.


### Conclusion
In this blog post, we propose a simple influence-based example selection method that can
robustly identify low- and high- performing examples.
Our framework can quantify the marginal contribution of an example as well as different phenomena associated with ICL, such as the positional biases of examples.

For more details, please check out our [paper](https://arxiv.org/abs/2302.11042) and [code](https://github.com/DebugML/incontext_influences).
We have also included in our pipeline in-context influence calculations based on the new [LLaMA](https://arxiv.org/abs/2302.13971) models 🦙.

Feel free to reach out with any questions!

### Citation

> @article{nguyen2023incontextinfluences,   
       author = {Nguyen, Tai and Wong, Eric},  
       title = {In-context Example Selection with Influences}, 
   journal = {arXiv},  
   year = {2023},   
}
