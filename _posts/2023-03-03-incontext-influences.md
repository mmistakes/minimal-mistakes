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
    title: "Distribution of in-context influences on OPT models for Hellaswag."
  

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
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

> Large language models have recently enabled a prompting based, few-shot learning paradigm referred to as in-context learning (ICL). However, the ICL paradigm can be quite sensitive to small differences in the input prompt, such as the template of the prompt or the specific examples chosen. 
To handle this variability, we leverage the framework of influences to select which examples to use in a prompt.
These so-called in-context influences directly quantify the performance gain/loss when including a specific example in the prompt, enabling improved and more stable ICL performance.

Prompting is a recent interface for interacting with general-purpose large language models (LLMs). Instead of fine-tuning an LLM on a specific task and dataset, users can describe their needs in natural language in the form of a "prompt" to guide the LLM towards all kinds of task. 
For example, LLMs have been asked to write computer programs, take [standardized exams](https://www.cnn.com/2023/01/26/tech/chatgpt-passes-exams/index.html), 
or even come up with original [Thanksgiving dinner recipes](https://www.nytimes.com/2022/11/04/dining/ai-thanksgiving-menu.html).

To elicit better performance, the research community has identified techniques for prompting LLMs.
For example, providing detailed [instructions](https://arxiv.org/abs/2203.02155) or asking the model to think [step-by-step](https://arxiv.org/abs/2201.11903) can help direct it to make more accurate predictions.
Another way to provide guidance is to give the model examples of input-output pairs before asking for a new prediction. 
In this work, we focus on this last approach to prompting often referred to as few-shot in-context learning (ICL). 

# Few-shot ICL
<!-- In-context leaning (ICL) was originally introduced with the release of [GPT-3](https://arxiv.org/abs/2005.14165). -->
In-context learning involves providing the model with a small set of high-quality examples (few-shot) via a prompt, followed by generating predictions on new examples. 
As an example, consider [GPT-3](https://arxiv.org/abs/2005.14165), a general-purpose LLM that takes prompts as inputs. We can instruct GPT-3 to do sentiment analysis via the following prompt. 
This prompt contains 3 examples of review-answer pairs for sentiment analysis (3-shot), which are the in-context examples. 
We would like to classify a new review, `My Biryani can be a tad spicier`, as either positive or negative.
We append the input to the end of our in-context examples: 

> Review: The butter chicken is so creamy.  
> Answer: Positive  
> Review: Service is subpar.  
> Answer: Negative  
> Review: Love their happy hours  
> Answer: Positive  
> Review: My Biryani can be a tad spicier.  
> Answer:  
>> **Negative**

To classify the final sentence, we have given this prompt as input to GPT-3 to generate a completion. We simply consider the probability of the model generating the word `Negative` versus the word `Positive`, and use the higher-probability word (conditional on the examples) as the prediction. 
In this case, it turns out that the model can correctly predict `Negative` as being a more likely completion than `Positive`. 

Note that in this example, we were able to adapt the LLM to do sentiment analysis with *no parameter updates* to the model.
In the fine-tuning paradigm, doing a similar task would often require more human-annotated data and extra training.

<!-- Instead of fine-tuning on a task-specific dataset, we have instead constructed a prompt containing both a few examples of input-output pairs as well as the new input to be classified. 
The LLM then learns by conditioning on the prompt. --> 
 <!-- before generating new outputs without needing to calculate any gradients or update any weights.  -->

<!-- {% include gallery id="icl" type="center" layout="center" caption="An instance of few-shot ICL with GPT-3. Model completion is highlighted in blue." %} -->
<!-- In the above prompt, we provide GPT-3 with examples (3-shot) and ask it to classify the sentiment of the last input.
The model recognizes the distribution of the inputs (restaurant reviews), the label space ("Positive" or "Negative"), and the nature of the task. 
It correctly completes the sequence with label "Negative". -->

<!-- Compared to finetuning, ICL requires no parameter updates to the model. 
The model simply "learns" by conditioning on the examples provided in-context, analogous to how a human would learn when asked to perform a task. -->

## Perils of in-context learning

ICL allows general-purpose LLMs to adapt to new tasks without training. 
This lowers the sample complexity and the computational cost of repurposing the model. 
However, these benefits also come with drawbacks. 
In particular, the performance of ICL can be susceptible to various
design decision when constructing prompts. 
For example, the natural language template used to format a prompt, 
the specific examples included in the prompt,
and even the order of examples can all affect how well ICL performs [[ACL tutorial](https://raw.githubusercontent.com/allenai/acl2022-zerofewshot-tutorial/main/acl2022-zerofewshot-tutorial.pdf)]. 

<!-- {% include gallery id="order" layout="" caption="Reordering examples flips the prediction of GPT-3 for the same input." %} -->

In other words, ICL is _brittle_ to small changes in the prompt. Consider the previous prompt that we gave to GPT-3, but suppose we instead swap the order of the first two examples: 

> Review: Service is subpar.  
> Answer: Negative  
> Review: The butter chicken is so creamy.  
> Answer: Positive  
> Review: Love their happy hours  
> Answer: Positive  
> Review: My Biryani can be a tad spicier.  
> Answer:  
>> **Positive**

When given this adjusted prompt, the model's prediction changes and is now incorrectly predicting a positive sentiment! Why did this happen? It turns that in-context learning suffers from what is known as *recency bias*. Specifically, recent examples tend to have a larger impact on the model's prediction. Since the model recently saw two positive examples, it spuriously followed this label pattern when making a new prediction. This behavior makes ICL unreliable---the performance should not be dependent on a random permutation of examples in the prompt! 

<!-- In the example above, simply reordering the examples has potentially exposed the model to recency bias.
It wrongly predicts "Positive" by spuriously following label pattern in the prompt.
From a user perspective, this makes ICL unreliable in practice.
It is not clear if the prompt, the model, or the examples themselves are the culprits behind poor performance.
 -->
<!-- To make ICL more reliable, we study how example-selection techniques can stabilize and improve ICL performance. 
Specifically, we leverage the framework of influences to identify the set of examples that lead to high-performance in ICL. 
It turns out that these highly influential examples can stabilize the impact of example order while improving performance!    -->
<!-- In this study, we focus on *example selection* as the basis for robustifying few-shot ICL. We propose an influence-based selection
method that can select a set of high-performing examples for a task and requires no further tuning at test time. -->

# In-context influences
To address this unreliability, we look towards a variety of methods that aim to quantify and understand how training data affects model performance. 
For example, [Data Shapley values](https://arxiv.org/abs/1904.02868) and [influence functions](https://arxiv.org/abs/1703.04730) 
both aim to measure how much an example affects performance when included in the training dataset. 
Inspired by these frameworks, our goal is to measure how much an in-context example affects ICL performance when included in the prompt. 
In particular, we will calculate the *influence* of each potential example on ICL performance, which we call **in-context influences**.

More formally, let $$S$$ be a training set and $$f(S)$$ be the validation performance after training on $$S$$.
We calculate in-context influences with a two-step process:
1. Collect a "dataset" of $$M$$ training (prompting) runs $$\mathcal D = \{(S_i, f(S_i)\}_{i=1}^M$$ where $$S_i\subseteq S$$ are random subsets of the original training dataset.
2. Estimate the influence of each example $$x\in S$$ as follows:

\\[
  {\mathcal{I}(x_j)=\frac{1}{N_j}\sum_{S_i:x_j\in S_i} f(S_i)} - {\frac{1}{M-N_j}\sum_{S_i:x_j\notin S_i} f(S_i)}
\\]

where $$M$$ is the number of total subsets used to estimate influences, $$N_j$$ is the total number of subsets containing example $$x_j$$, and $$f(S_i)$$ is the performance metric when evaluated on the validation set.$$^1$$

In other words, a higher score for $$\mathcal{I}(x_j)$$ corresponds to a higher average improvement in validation performance when $$x_j$$ was included in the prompt.
This is analogous to the meaning of influences in the classic setting, but adapted to the ICL setting: instead of training models on a dataset, we are prompting models on examples.

<!-- **Cost.** Computing influences is traditionally viewed as a highly costly operation. After all, influences typically require end-to-end training of $$M$$ models on $$M$$ different subsets, where $$M$$ can be in the thousands. Most people don't have the compute or time capabilities to train thousands of ML models! However, the cost of computing in-context influences is drastically lower---prompting a model on a random subset is equivalent to a single forward pass through the LLM.
In contrast to training new models, calculating in-context influences is inexpensive! -->

## Distribution of in-context influences

In the following figure, we visualize the distribution of computed influences of training examples on ICL performance. 

<div>
  <canvas id="distribution_plot" width="800" height="450"></canvas>
</div>
{% include blog_incontext-influences_distribution.html %}


The two tails of the influence distribution identify highly impactful in-context examples.
Examples with large positive influence tend to help ICL performance, whereas examples with large negative influence tend to hurt ICL performance. 
This observation suggests a natural approach for creating prompts for ICL: we can use examples in the right tail to create the "best" prompt, or use examples from the left tail to create the "worst" performing prompt.


<!-- From a cost perspective, our approach also draws a contrast to the classic setting.
Studying example influence requires the end-to-end training of $$M$$ models on randomly sampled subsets.
Instead of training, our cost of "training" equates to a single forward pass through the LLM.
This makes calculating in-context influences relatively cheap! -->

<!-- **Context window.** In ICL paradigm, the size of the sampled subset is limited by the context window.
Depends on the task/dataset, we fit a maximal number of examples for computing in-context influences. -->

$$^1$$This method of estimating influences with random subsets has similarities to the framework of [datamodels](https://arxiv.org/abs/2202.00622), which uses random subsets to train a linear model that predicts performance. In our [paper](https://arxiv.org/abs/2302.11042), we also consider a similar analog of the datamodels approach for estimating 
in-context influences.
{: .notice}

# Influence-based example selection
<!-- Now that we have
In the above section, we discuss the influence-based formula adapted to study in-context examples.
The above calculation result in a distribution of example influences over the entire train set:

Here, observing two tails of the influence distribution helps us identify highly impactful in-context examples.
We can use the top influential examples to create the "best" prompt, or use the bottom influential examples to create the "worst" performing prompt for ICL. -->
Once we have computed in-context influences, we can use these influences to select examples for ICL. 
Intuitively, examples with more positive influences should lead to better ICL performance. As a sanity check, is this indeed the case? 

In the following figure, we partition the training data into 10 percentile bins according to their influence scores, and measure the validation performance of prompts using examples from each bin. 

<div>
  <canvas id="boolq" width="800" height="450"></canvas>
  <canvas id="wic" width="800" height="450"></canvas>
  <canvas id="openbookqa" width="800" height="450"></canvas>

</div>
{% include blog_incontext-influences_influence-bin.html %}

We find a steady and consistent trend: examples with higher influences do in fact result in higher test performance in most models and tasks! 
Interestingly, we find a significant difference between examples with positive and negative influences: a 22.2% 
difference on the task WSC and 21.5% difference on the task WIC when top-bin examples are used instead of bottom-bin examples on OPT-30B. 
This provides one explanation for why the choice of examples can drastically affect ICL performance: according to our influence calculations, there exists a small set of training examples (the top and bottom influential examples) that have a disproportionate impact on ICL performance. 
<!-- This positive trend also extends to examples in the middle influence bins, where our selection method also produces stable and predictable results. -->


## Examples with Positive/Negative Influence
<!-- Since influence-based selection uncovers the disparity between the good and bad examples, a natural follow-up
is asking what makes these examples different. 
Prior work has associated various characteristics with ICL exemplars such as perplexity and a similarity distance to test examples.
Quantitively, we find little to no correlation between these characteristics and in-context influences, as shown in the plots below:

{% include gallery id="signals" layout="" caption="On Superglue-WIC, in-context influences do not correlate with any known example characteristics in many-shot ICL." %} -->

Classic influences have found qualitatively that positively influencial examples tend to be copies of examples from the validation set, while negatively influential examples tend to be mislabeled or noisy examples. Do influences for ICL also show similar trends?   

<!-- We also analyze some examples qualitatively. We identify few instances of harmful examples that also appear to be "unnatural", -->
We find that in some cases, these trends also carry over to the ICL setting. For example, here is a negatively influential examples in the PIQA task: 
<!-- such as example `#12444` in the task PIQA: -->
 <p style="font-family: Courier;text-align: center;">Goal: flashlight<br>Answer: shines a light</p>
In this case, the example is quite unnatural for the task: rather than flashlight being a goal for shining a light, it would be more natural to have shining a light be a goal for the flashlight. This is an example of how the design of the template can result in poor results for certain input-output pairs. This is especially true when the template is not universally suitable for all examples in the training data. 

<!-- In these cases, we hypothesize that a better prompt template (e.g. switching the <span style="font-family:Courier;">Goal</span> 
and <span style="font-family:Courier;">Answer</span> in the above example) could improve the performance of some low-performing examples. -->

However, in general we found that differences between examples with positive or negative influences was not always immediately obvious (more examples are in our [paper](https://arxiv.org/abs/2302.11042)). Although we can separate examples into bins corresponding to positive and negative influence, identifying the underlying factors that resulted in better or worse ICL performance remains an open problem!   
<!-- Here, we list other examples sampled from the top and bottom influence bins on GPT-NeoX (20B). -->
<!-- Do you suspect any qualitative differences that separate the good and bad examples in these tasks? -->

<!-- | -->
<!-- -|- -->
<!-- Arc<br>(Challenge)|**Bottom**<br>Question: Which unit is used to record distances between stars?<br>Answer: light years<br>**Top**<br>Question: Which of these is a function of all cells?<br>Answer: to extract energy from food to sustain life -->
<!-- OpenBookQA|**Bottom**<br>Context: which one of these is false about the greenhouse effect?<br>Answer: it causes green air in the sky<br>**Top**<br>Context: One of the reasons some species go extinct is because predators<br>Answer: murder too many of them -->
<!-- PIQA|**Bottom**<br>Goal: flashlight<br>Answer: shines a light<br>**Top**<br>Goal: To bind fabric before putting it through a sewing machine.<br>Answer: You should use small pins. -->
<!-- WIC|**Bottom**<br>Pull a bank robbery.<br>He regularly pulls 12-hour days, sometimes 14.<br>question: Is the word ’pull’ used in the same sense in the two sentences above?<br>answer: true<br>**Top**<br>He longed for the touch of her hand.<br>This room needs a woman’s touch.<br>question: Is the word ’touch’ used in the same sense in the two sentences above?<br>answer: false -->


<!--WSC|Passage: We had hoped to place copies of our newsletter on all the chairs in the auditorium, but there were simply too many of them .<br>Question: In the passage above, does the pronoun ’them’ refer to chairs?<br>Answer: true|Passage: Sam took French classes from Adam , because he was known to speak it fluently.<br>Question: In the passage above, does the pronoun ’he’ refer to Adam?<br>Answer: true-->
<!--Arc<br>(Easy)|Question: A farmer sprayed his orange trees with a pesticide to eliminate the insects damaging the trees. Some of the insects survived and produced offspring that were also resistant to the insecticide. Which process is illustrated by the pesticide resistance of the offspring?<br>Answer: natural selection|Question: Modern technology has had some positive and negative effects on society. Which would be a negative effect of advances in technology?<br>Answer: human jobs replaced by more efficient machines-->

<!-- ### Effective scaling across _k_-shot
Thus far, our estimation of in-context influences has assumed a many-shot setting where a maximal number of examples is packed into the context window.
How does our influence-based example selection generalize with fewer in-context examples?

{% include gallery id="scaling" layout="" caption="Influence-based example selection scales performance steadily with increasing k-shot. In other methods, performance can decline when more in-context examples are used." %}

At one-shot and very few-shot, in-context influences can perform worse than our baseline comparisons.
However, ICL performance steadily improves with increasing $$k$$.
This differs from random example selection, as validation accuracy does not always improve (and sometimes even declines) with $$k$$.
Given many examples, influence-based selection can be used to squeeze in the last bit of performance. -->

<!-- ### Case study: Recency Bias
Beside calculating influences for individual in-context examples, we could further apply our framework to
quantify the influences of different positions in few-shot ICL, which has also been found to be a [problem](https://arxiv.org/pdf/2104.08786.pdf).

To do this, we randomly choose 100 examples from the CB task and assign them into 4 groups for
4-shot prompting on OPT-6.7B. We compute an in-context influence estimate for each example-position
pair over all possible ordering permutations (4 ! = 24) and observe the results below: 

{% include gallery id="case_study" layout="half" caption="Aggregated influences are greater at later positions (left), while greater influence spreads are also seen at later positions (right)." %}

Our influence framework confirms the presence of recency bias in ICL.
Between Position #0 and Position #3, we observe a notable 2% difference in the absolute values of in-context influences.
The spread between example influences also becomes wider.
 -->

### Conclusion
In this blog post, we propose a simple influence-based example selection method that can
robustly identify low- and high- performing examples.
Our framework can quantify the marginal contribution of an example as well as different phenomena associated with ICL, such as the positional biases of examples. 

For more details and additional experiments (ablation studies, case studies on recency bias, and comparisons to baselines) please check out our [paper](https://arxiv.org/abs/2302.11042) and [code](https://github.com/DebugML/incontext_influences).
<!-- We have also included in our pipeline in-context influence calculations based on the new [LLaMA](https://arxiv.org/abs/2302.13971) models 🦙. -->

Concurrent to our work, Chang and Jia (2023) also employ influences to study in-context learning.
They show the efficacy of influence-based selection on many non-SuperGLUE tasks.
You can check out their work [here](https://arxiv.org/abs/2212.10378).
{: .notice--info}

### Citation

> @article{nguyen2023incontextinfluences,   
       author = {Nguyen, Tai and Wong, Eric},  
       title = {In-context Example Selection with Influences}, 
   journal = {arXiv},  
   year = {2023},   
}