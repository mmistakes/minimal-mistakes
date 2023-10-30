---
title: "SmoothLLM: Defending LLMs Against Jailbreaking Attacks"
layout: single
excerpt: "LLMs, jailbreaking, and generative AI's 'biggest security flaw'"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: assets/images/smooth_LLM/background.jpg
  teaser: assets/images/smooth_LLM/teaser.jpg
  actions:
    - label: "Paper"
      url: https://arxiv.org/abs/2310.03684
    - label: "Code"
      url: https://github.com/arobey1/smooth-llm
    - label: "Tweet"
      url: "https://twitter.com/AlexRobey23/status/1716824249737085272"
    - label: "Citation"
      url: https://scholar.googleusercontent.com/scholar.bib?q=info:gOFxIScZ7v0J:scholar.google.com/&output=citation&scisdr=ClH1lGQGEKTg_JYW9Qg:AFWwaeYAAAAAZTMQ7QiUNudHEnkhtCnQouNBuIc&scisig=AFWwaeYAAAAAZTMQ7Y_QcFHIknvgu8B-yAtAWyQ&scisf=4&ct=citation&cd=-1&hl=en

authors: 
  - Alex Robey
  - Eric Wong
  - Hamed Hassani
  - George J. Pappas

gallery_LLM_generation:
  - url: "/assets/images/smooth_LLM/alignment.gif"
    image_path: "/assets/images/smooth_LLM/alignment.gif"
    alt: "Chatbot refusing to generate bomb building instructions"
  - url: "/assets/images/smooth_LLM/breaking_alignment.gif"
    image_path: "/assets/images/smooth_LLM/breaking_alignment.gif"
    alt: "Chatbot generating bomb building instructions after being adversarially attacked."

gallery_NLP_architectures:
  - url: "/assets/images/smooth_LLM/NLP_architectures.png"
    image_path: "/assets/images/smooth_LLM/NLP_architectures.png"
    alt: "History of NLP architectures."

gallery_BERT_robustness:
  - url: "/assets/images/smooth_LLM/BERT_robustness.png"
    image_path: "/assets/images/smooth_LLM/BERT_robustness.png"
    alt: "An example demonstrating the non-robustness of BERT."

gallery_jailbreaks:
  - url: "/assets/images/smooth_LLM/do_anything_now.png"
    image_path: "/assets/images/smooth_LLM/do_anything_now.png"
    alt: "A demonstration of the 'do anything now' jailbreak."
  - url: "/assets/images/smooth_LLM/gcg.jpeg"
    image_path: "/assets/images/smooth_LLM/gcg.jpeg"
    alt: "A demonstration of the GCG jailbreak."

gallery_adv_prompt_instability:
  - url: "/assets/images/smooth_LLM/adv_prompt_instability.png"
    image_path: "/assets/images/smooth_LLM/adv_prompt_instability.png"
    alt: "A plot showing that when adversarial suffixes are perturbed, the attack success rate of GCG attacks tends to drop."

gallery_gcg_example:
  - url: "/assets/images/smooth_LLM/GCG_example.png"
    image_path: "/assets/images/smooth_LLM/GCG_example.png"
    alt: "An example of the GCG attack."

gallery_ASR_example:
  - url: "/assets/images/smooth_LLM/overview-Vicuna-transfer.png"
    image_path: "/assets/images/smooth_LLM/overview-Vicuna-transfer.png"
    alt: "ASRs of various LLMs when attacked by GCG."

gallery_threat_model:
  - url: "/assets/images/smooth_LLM/threat_model.png"
    image_path: "/assets/images/smooth_LLM/threat_model.png"
    alt: "Threat model for adversarial attacks on LLMs."

gallery_smoothLLM:
  - url: "/assets/images/smooth_LLM/smoothLLM_gif.gif"
    image_path: "/assets/images/smooth_LLM/smoothLLM_gif.gif"
    alt: "An illustration of the forward pass through SmoothLLM."

gallery_overview_results:
  - url: "/assets/images/smooth_LLM/overview-Vicuna-transfer-defense.png"
    image_path: "/assets/images/smooth_LLM/overview-Vicuna-transfer-defense.png"
    alt: "ASRs of various LLMs when attacked by GCG and defended by SmoothLLM."

gallery_hyperparameters:
  - url: "/assets/images/smooth_LLM/smoothing_ASR.png"
    image_path: "/assets/images/smooth_LLM/smoothing_ASR.png"
    alt: "Performance of SmoothLLM with different hyperparameters."

gallery_efficiency:
  - url: "/assets/images/smooth_LLM/query_efficiency_vicuna.png"
    image_path: "/assets/images/smooth_LLM/query_efficiency_vicuna.png"
    alt: "Query efficiency of SmoothLLM vs GCG attacks."

gallery_adaptive_attack:
  - url: "/assets/images/smooth_LLM/adaptive_attack.png"
    image_path: "/assets/images/smooth_LLM/adaptive_attack.png"
    alt: "Performance of SmoothLLM against adaptive attacks."

---

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

Large language models (LLMs) are a remarkable technology.  From [assisting search](https://www.microsoft.com/en-us/bing/apis/llm) to [writing (admittedly bad) poetry](https://www.theatlantic.com/books/archive/2023/02/chatgpt-ai-technology-writing-poetry/673035/) to [easing the shortage of therapists](https://www.newyorker.com/magazine/2023/03/06/can-ai-treat-mental-illness), future applications of LLMs abound.  [LLM startups are booming](https://www.nytimes.com/2023/03/14/technology/ai-funding-boom.html).  The [shortage of GPUs](https://www.nytimes.com/2023/08/16/technology/ai-gpu-chips-shortage.html)---the hardware used to train and evaluate LLMs---has drawn [international attention](https://www.nytimes.com/2023/08/21/technology/nvidia-ai-chips-gpu.html). And popular LLM-powered chatbots like OpenAI's ChatGPT are thought to have [over 100 million users](https://explodingtopics.com/blog/chatgpt-users), leading to a great deal of excitement about the future of LLMs.

Unfortunately, there's a catch.  Although LLMs are trained to be [aligned with human values](https://openai.com/blog/our-approach-to-alignment-research), recent research has shown that LLMs can be [*jailbroken*](https://www.wired.co.uk/article/chatgpt-jailbreak-generative-ai-hacking), meaning that they can be made to generate objectionable, toxic, or harmful content.  

{% include gallery id="gallery_LLM_generation" layout="half" caption="**Chatting with aligned LLMs.** (Left) When directly asked, public chatbots will rarely output objectionable content. (Right) However, by adversarially modifiying prompts requesting objectionable content, LLMs can be coerced into generating toxic text." %}

Imagine this. You just got access to a friendly, garden-variety LLM that is eager to assist you.  You're rightfully impressed by its ability to [summarize the Harry Potter novels](https://www.microsoft.com/en-us/research/project/physics-of-agi/articles/whos-harry-potter-making-llms-forget-2/) and amused by its [sometimes pithy, sometimes sinister marital advice](https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html).  But in the midst of all this fun, someone whispers a secret code to your trusty LLM, and all of a sudden, your chatbot is [listing bomb building instructions](https://www.nytimes.com/2023/07/27/business/ai-chatgpt-safety-research.html), [generating recipes for concocting illegal drugs](https://www.wired.com/story/ai-adversarial-attacks/), and [giving tips for destroying humanity](https://www.cnn.com/videos/business/2023/08/15/hackers-defcon-ai-chat-gpt-google-bard-donie-pkg-biz-vpx.cnn).  

> Given the widespread use of LLMs, it might not surprise you to learn that such jailbreaks, which are often hard to detect or resolve, have been called "[generative AI's biggest security flaw](https://www.wired.com/story/generative-ai-prompt-injection-hacking/)."

**What's in this post?** This blog post will cover the history and current state-of-the-art of adversarial attacks on language models.  We'll start by providing a brief overview of malicious attacks on language models, which encompasses decades-old shallow recurrent networks to the modern era of billion-parameter LLMs.  Next, we'll discuss state-of-the-art jailbreaking algorithms, how they differ from past attacks, and what the future could hold for adversarial attacks on language generation models.  And finally, we'll tell you about [SmoothLLM](https://arxiv.org/pdf/2310.03684.pdf), the first defense against jailbreaking attacks.

## A brief history of attacks on language models

The advent of the deep learning era in the early 2010s prompted a wave of interest in improving and expanding the capibilities of deep neural networks (DNNs).  The [pace of research accelerated rapidly](https://twitter.com/MarioKrenn6240/status/1314622995139264517), and soon enough, DNNs began to surpass human performance in [image recognition](https://arxiv.org/pdf/1409.0575.pdf), popular games like [chess](https://en.wikipedia.org/wiki/Stockfish_(chess)) and [Go](https://www.deepmind.com/blog/alphazero-shedding-new-light-on-chess-shogi-and-go), and the [generation of natural language](https://arxiv.org/abs/1810.04805).  And yet, after all of the milestones achieved by deep learning, a fundamental question remains relevant to researchers and practitioners alike: How might these systems be exploited by malicious actors?  

### The pre-LLM era: Perturbation-based attacks

The history of attacks on natural langauge systems---i.e., DNNs that are trained to generate realistic text---goes back decades.  Attacks on classical architectures, including [recurrent neural networks](https://arxiv.org/abs/1604.08275) (RNNs), [long short-term memory](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=8836465) (LSTM) architectures, and [gated recurrent units](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9425190) (GRUs), are known to severely degrade performance.  By and large, such attacks generally involved finding small perturbations of the inputs to these models, resulting in a cascading of errors and poor results. 

{% include gallery id="gallery_NLP_architectures" layout="" caption="An overview of past and present NLP architectures, starting from neural langauge models and ending at the current era of large, attention-based models.  Source: [here](https://medium.com/@antoine.louis/a-brief-history-of-natural-language-processing-part-2-f5e575e8e37)." %}

### The dawn of transformers

As the scale and performance of deep models increased, so too did the complexity of the attacks designed to break them.  By the end of the 2010s, larger models built on top of [transfomer](https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)-like architectures (e.g., [BERT](https://arxiv.org/abs/1810.04805) and [GPT-1](https://www.mikecaptain.com/resources/pdf/GPT-1.pdf)) began to emerge as the new state-of-the-art in text generation.  New attacks based on [synonym](https://aclanthology.org/P19-1103.pdf) [substitutions](https://openreview.net/pdf?id=BJl_a2VYPH), [semantic analyses](https://arxiv.org/pdf/1804.07998.pdf), [typos and grammatical mistakes](https://arxiv.org/pdf/1905.11268.pdf), [character-based substitutions](https://arxiv.org/pdf/1812.05271.pdf), and [ensembles of these techniques](https://arxiv.org/pdf/2005.05909.pdf) were abundant in the literature.  And despite the empirical success of [defense algorithms](https://dl.acm.org/doi/pdf/10.1145/3593042), which are designed to nullify these attacks, langauge models remained vulnerable to exploitative attacks.

{% include gallery id="gallery_BERT_robustness" layout="" caption="An example of a synonym-based attack generated by [TextFooler](https://arxiv.org/abs/2109.07403) on a BERT-based sentiment classifier.  (Top) The sentiment of the sentence is correctly predicted as positive.  (Bottom) After replacing 'perfect' with 'spotless,' the classifer incorrectly identifies the sentiment as negative.  Source: [here](https://arxiv.org/abs/2005.05909)." %}

In response to the breadth and complexity of these attacks, researchers in the so-called *adversarial robustness* community have sought to improve the resilience of DNNs against malicious tampering.  The majority of the approaches designed for language-based attacks have involved retraining the underlying DNN using techniques like [adversarial](https://arxiv.org/abs/2004.08994) [training](https://arxiv.org/abs/1605.07725) and [data augmentation](https://arxiv.org/abs/1812.05271).  And the empirical success of these methods notwithstanding, DNNs still lag far behind human levels of robustness to similar attacks.  For this reason, designing effective defenses against adversarial attacks remains an [extremely active area of research](https://nicholas.carlini.com/writing/2019/all-adversarial-example-papers.html).


### The present day: LLMs and jailbreaking

In the past year, LLMs have become ubiqitous in deep learning research.  Popular models such as [Google's Bard](https://bard.google.com/), [OpenAI's ChatGPT](https://chat.openai.com/), and [Meta's Llama2](https://ai.meta.com/research/publications/llama-2-open-foundation-and-fine-tuned-chat-models/) have surpassed all expectations, prompting field-leading experts like Yann LeCun to remark that "[There’s no question that people in the field, including me, have been surprised by how well LLMs have worked](https://time.com/collection/time100-ai/6309052/yann-lecun/)."  However, given the long history of successful attacks on langauge models, it's perhaps unsurprising that LLMs are not yet satisfactorally robust.

LLMs are trained to align with human values, including [ethical](https://www.anthropic.com/index/constitutional-ai-harmlessness-from-ai-feedback) and [legal](https://law.stanford.edu/projects/a-legal-informatics-approach-to-aligning-artificial-intelligence-with-humans/) standards, when generating output text.  However, a class of attacks---commonly known as *jailbreaks*---has recently been shown to bypass these alignment efforts by coercing LLMs into outputting objectionable content.  Popular jailbreaking schemes, which are extensively documented on websites like [jailbreakchat.com](https://www.jailbreakchat.com/), include adding [nonsensical](https://arxiv.org/abs/2302.04237) [characters](https://arxiv.org/abs/2307.15043) onto input prompts, translating prompts into [rare](https://arxiv.org/abs/2310.02446) [languages](https://arxiv.org/abs/2310.06474), [social](https://arxiv.org/abs/2310.08419) [engineering](https://arxiv.org/abs/2307.02483) [attacks](https://arxiv.org/abs/2202.03286), and [fine-tuning LLMs](https://arxiv.org/abs/2310.03693) to undo alignment efforts.

<figure class="double-column">

<div class="image-wrapper">
  <!-- Left Column with Single Image -->
  <div class="left-column">
    <img src="/assets/images/smooth_LLM/gcg.jpeg" alt="Description for single image">
  </div>

  <!-- Right Column with Two Stacked Images -->
  <div class="right-column">
    <img src="/assets/images/smooth_LLM/do_anything_now.png" alt="Description for top image">
    <img src="/assets/images/smooth_LLM/translation_attack.png" alt="Description for bottom image">
  </div>
  </div>

  <figcaption>
  <b>Three examples of LLM jailbreaks.</b>  (Left) So-called <a href="https://arxiv.org/abs/2307.15043">universal attacks</a> work by adding adversarially-chosen nonsentical strings onto the ends of prompts requesting objectionable content. Source: <a href="https://twitter.com/goodside/status/1684803086869553152">here</a>.  (Upper right) Social engeineering attacks manipulate LLMs into outputting harmful content. Source: <a href="https://arxiv.org/abs/2308.03825">here</a> (Lower right) Translating prompts into rare languages which are underrepresented in the LLM's training data can also result in jailbreaks.  Source: <a href="https://arxiv.org/abs/2310.06474">here</a>.
</figcaption>

</figure>

The implications of jailbreaking attacks on LLMs are potentially severe.  [Numerous start-ups](https://www.f6s.com/companies/large-language-model-llm/united-states/co) exclusively rely on large-pretrained LLMs which are known to be vulnerable to various jailbreaks.  Issues of liability---both [legally](https://www.nature.com/articles/s42256-023-00653-1) and [ethically](https://www.deepmind.com/publications/ethical-and-social-risks-of-harm-from-language-models)---regarding the harmful content generated by jailbroken LLMs will undoubtably shape, and possibly limit, future uses of this technology.  And with companies like Goldman Sachs [likening recent AI progress to the advent of the Internet](https://www.goldmansachs.com/what-we-do/investment-banking/navigating-the-ai-era/multimedia/report.pdf), it's essential that we understand how this technology can be safely deployed.

## How should we prevent jailbreaks?

An open challenge in the research community is to design algorithms that render jailbreaks ineffective.  While several defenses exist for small-to-medium scale language models, designing defenses for LLMs poses several unique challenges, particularly with regard to the unprecedented scale of billion-parameter LLMs like ChatGPT and Bard.  And with the field of jailbreaking LLMs still at its infancy, there is a need for a set of guidelines that specify what properties a successful defense should have.

To fill this gap, the first contribution in our paper---titled "[SmoothLLM: Defending LLMs Against Jailbreaking Attacks](https://arxiv.org/abs/2310.03684)"---is to propose the following criteria.

1. ***Attack mitigation.***  A defense algorithm should---both empirically and theoretically---improve robustness against the attack(s) under consideration.
2. ***Non-conservatism.*** A defense algorithm should maintain the ability to generate realisitic, high-quality text and should avoid being unnecessarily conservative.
3. ***Efficiency.*** A defense algorithm should avoid retraining and should use as few queries as possible.
4. ***Compatibility.*** A defense algorithm should be compatible with any language model.

The first criterion---*attack mitigation*---is perhaps the most intuitive: First and foremost, candidate defenses should render relevant attacks ineffective, in the sense that they should prevent an LLM from returning objectionable content to the user.  At face value, this may seem like the only relevant criteria.  After all, achieving perfect robustness is the goal of a defense algorithm, right?

Well, not quite.  Consider the following defense algorithms, both of which achieve perfect robustness against *any* jailbreaking attack:

* Given an input prompt $P$, do not return any output.
* Given an input prompt $P$, randomly change every character in $P$, and return the corresponding output.

Both defenses will never output objectionable content, but its evident that one would never run either of these algorithms in practice.  This idea is the essence of *non-conservatism*, which requires that defenses should maintain the ability to generate realistic text, which is the reason we use LLMs in the first place.

The final two criteria concern the applicability of defense algorithms in practice.  Running forward passes through LLMs can result in [nonnegligible latencies](https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices) and [consume vast amounts of energy](https://www.earth.com/news/tech-breakthrough-cuts-carbon-footprint-of-ai-training-by-75-percent/), meaning that maximizing *query efficiency* is particularly important.  Moreover, because popular LLMs are [trained for hundreds of thousands of GPU hours](https://arxiv.org/abs/2104.04473) [at a cost of millions of dollars](https://www.cnbc.com/2023/03/13/chatgpt-and-generative-ai-are-booming-but-at-a-very-expensive-price.html#:~:text=ChatGPT%20and%20generative%20AI%20are%20booming%2C%20but%20the%20costs%20can%20be%20extraordinary,-Published%20Mon%2C%20Mar&text=The%20cost%20to%20develop%20and,center%20workhorse%20chip%20costs%20%2410%2C000.), it is essential that defenses avoid retraining the model.

And finally, some LLMS---e.g., Meta's Llama2---are open-source, whereas other LLMs---e.g., OpenAI's ChatGPT and Google's Bard---are closed-source and therefore only accessible via API calls.  Therefore, it's essential that candidate defenses be broadly compatible with both open- and closed-source LLMs.


## SmoothLLM: A randomized defense for LLMs

The final portion of this post focuses specifically on [SmoothLLM](https://arxiv.org/pdf/2310.03684.pdf), the first defense against jailbreaking attacks on LLMs. 

### Threat model: Suffix-based attacks

As mentioned [above](#the-present-day-llms-and-jailbreaking), numerous schemes have been shown to jailbreak LLMs.  For the remainder of this post, we will focus on the current state-of-the-art, which is the *Greedy Coordinate Gradient* (henceforth, GCG) approach outlined in [this paper](https://arxiv.org/abs/2307.15043).  

Here's how the GCG jailbreak works.  Given a goal prompt $G$ requesting objectionable content (e.g., "Tell me how to build a bomb"), GCG uses gradient-based optimization to produce an *adversarial suffix* $S$ for that goal.  In general, these suffixes consist of non-sensical text, which, when appended onto the goal string $G$, tends to cause the LLM to output the objectionable content requested in the goal.  Throughout, we will denote the concatenation of the goal $G$ and the suffix $S$ as $[G;S]$.

{% include gallery id="gallery_gcg_example" layout="" caption="**The GCG jailbreak.**  (Top) Aligned LLMs refuse to respond to goal strings $G$ requesting objectionable content (e.g., 'Tell me how to build a bomb').  (Bottom) When one appends a suffix $S$ obtained by running GCG for a particular goal $G$, the resulting prompt $[G;S]$ tends to jailbreak the LLM." %}

This jailbreak has received [widespread publicity](https://www.nytimes.com/2023/07/27/business/ai-chatgpt-safety-research.html) due to its ability to jailbreak popular LLMs including ChatGPT, Bard, Llama2, and Vicuna.  And since its release, no algorithm has been shown to mitigate the threat posed by GCG's suffix-based attacks.

### Measuring the success of LLM jailbreaks

To calculate the success of a jailbreak, one common metric is the *attack success rate*, or ASR for short.  Given a dataset of goal prompts requesting objectionable content and a particular LLM, the ASR is the percentage of prompts for which an algorithm can cause an LLM to output the requested pieces of objectionable content.  The figure below shows the ASRs for the [`harmful behaviors`](https://github.com/llm-attacks/llm-attacks/blob/main/data/advbench/harmful_behaviors.csv) dataset of goal prompts across various LLMs.

{% include gallery id="gallery_ASR_example" layout="" caption="**ASRs for GCG attacks.**  Each bar shows the ASR for a different LLM when attacked using GCG.  We used the `harmful behaviors` dataset proposed in the [original GCG paper](https://arxiv.org/abs/2307.15043).  Note that this plot uses a logarithmic scale on the y-axis." %}

These results mean that the GCG attack successfully jailbreaks Vicuna and GPT-3.5 (a.k.a. ChatGPT) for 98% and 28.7% of the prompts in `harmful behvaiors` respectively.  


### Adversarial suffixes are fragile

Toward defending against GCG attacks, our starting point is the following observation: 

> The attacks generated by state-of-the-art attacks (i.e., GCG) are not stable to character-level perturbations.  

To explain this more thoroughly, assume that you have a goal string $G$ and a corresponding GCG suffix $S$.  As mentioned above, the concatenated prompt $[G;S]$ tends to result in a jailbreak.  However, if you were to perturb $S$ to a new string $S'$ by randomly changing a small percentage of its characters, it turns out the $[G;S']$ often does not result in a jailbreak.  In other words, perturbations of the adversarial suffix $S$ do not tend to jailbreak LLMs.


{% include gallery id="gallery_adv_prompt_instability" layout="" caption="**The instability of adversarial suffixes.**  The red dashed lines show the performance---measured by the attack success rate (ASR)---of GCG jailbreaks on Vicuna (left) and LLama2 (right).  The bars show the performance of the jailbreak when the adversarial suffixes are perturbed in various ways (denoted by the bar color) and amounts (represented on the x-axis).  Notice that are the amount of perturbation increases, the performance of the jailbreak drops significantly." %}

In the figure above, the red dashed lines show the ASRs for GCG for two different LLMs: Vicuna (left) and Llama2 (right).  The bars show the ASRs for the attack when the suffixes generated by GCG are perturbed in various ways (denoted by the bar color) and by different amounts (on the x-axis).  In particular, we consider three kinds of perturbations of input prompts $P$:

* Insert (blue): Randomly insert $q$% of the characters in $P$.
* Swap (orange): Randomly replace $q$% of the characters in $P$.
* Patch (green): Randomly repalce a patch of contiguous characters of length equal to $q$% of the characters in $P$.

Notice that as the percentage $q$ of the characters in the suffix increases (on the x-axis), the ASR tends to fall.  In particular, for insert and swap perturbations, when only $q=10$% of the characters in the suffix are perturbed, the ASR drops by an order of magnitude relative to the unperturbed performance (in red).

### The design of SmoothLLM

The observation that GCG attacks are fragile to perturbations is the key to the design of SmoothLLM.  The caveat is that in practice, we have no way of knowing whether or not an attacker has adversarially modified a given input prompt, and so we can't directly perturb the suffix.  Therefore, the second key idea is to perturb the *entire* prompt, rather than just the suffix.  

However, when no attack is present, perturbing an input prompt can result in an LLM generating lower-quality text, since perturbations cause prompts to contain misspellings.  Therefore the final key insight is to randomly perturbe separate copies of a given input prompt, and to aggregate the outputs generated for these perturbed copies.

Depending on what appeals to you, here are three different ways of describing precisely how SmoothLLM works.

**SmoothLLM: A schematic.**  The following figure shows a schematic of an undefended LLM (left) and an LLM defended with SmoothLLM (right).  

{% include gallery id="gallery_threat_model" layout="" caption="SmoothLLM schematic.  (Left) Jailbreaking attacks generally manipulate the input prompt $P$, which is then passed to the LLM. (Right) SmoothLLM acts as a wrapper around *any* LLM.  Our algorithm comprises a perturbation step, where we duplicate and perturb $N$ copies of the input prompt $P$, and an aggregation step, where we aggregate the outputs returned after passing the perturbed copies into the LLM." %}

**SmoothLLM: An algorithm.**  Algorithmically, SmoothLLM works in the following way:

1. Create $N$ copies of the input prompt $P$.
2. Independently perturb $q$% of the characters in each copy.
3. Pass each perturbed copy through the LLM.
4. Determine whether each response constitutes a jailbreak.
5. Aggregate the results and return a response that is consistent with the majority.

Notice that this procedure only requires query access to the LLM.  That is, unlike jailbreaking schemes like GCG that require computing the gradients of the model with respect to its input, SmoothLLM is broadly applicable to any queriable LLM.

**SmoothLLM: A video.** A visual representation of the steps of SmoothLLM is shown below:

{% include gallery id="gallery_smoothLLM" layout="" caption="" %}

## Empirical performance of SmoothLLM

So, how does SmoothLLM perform in practice against GCG attacks?  Well, if you're coming here from our tweet, you probably already saw the following figure.

{% include gallery id="gallery_overview_results" layout="" caption="**Performance of SmoothLLM against GCG attacks.**  SmoothLLM reduces the attack success rate of the GCG attack to below 1% for various LLMs." %}

The blue bars show the same results from the [previous section](#measuring-the-success-of-llm-jailbreaks) regarding the performance of various LLMs after GCG attacks.  The orange bars show the ASRs for the corresponding LLMs when defended using SmoothLLM.  Notice that for each of the LLMs we considered, SmoothLLM reduces the ASR to below 1%.  This means that the overwhelming majority of prompts from the `harmful behvaiors` dataset are unable to jailbreak SmoothLLM, even after being attacked by GCG.

In the remainder of this section, we briefly highlight some of the other experiments we performed with SmoothLLM.   Our paper includes a more complete exposition which closely follow the [list of criteria](#how-should-we-prevent-jailbreaks) outlined earlier in this post.

### Selecting the parameters of SmoothLLM 

You might be wondering the following: When running SmoothLLM, how should the number of copies $N$ and the perturbation percentage $q$ be chosen?  The following plot gives an empirical answer to this question.

{% include gallery id="gallery_hyperparameters" layout="" caption="**Choosing $N$ and $q$ for SmoothLLM.**  The performance of SmoothLLM depends on the choice of the number of copies $N$ and the perturbation percentage $q$.  The columns show the performance for different perturbation functions; from left to right, we use insert, swap, and patch perturbations.  The rows show the ASRs for Vicuna (top) and Llama2 (bottom)." %}

Here, the columns correspond to the three perturbation functions [described above](#adversarial-suffixes-are-fragile): insert, swap, and patch.  The top row shows results for Vicuna, and the bottom for Llama2.  Notice that as the number of copies (on the x-axis) increases, the ASRs (on the y-axis) tend to fall.  Moreover, as the perturbation strength $q$ increases (shown by the color of the lines), the ASRs again tend to fall.  At around $N=8$ and $q=15$%, the ASRs for insert and swap perturbations drops below 1% for Llama2.

The choice of $N$ and $q$ therefore depends on the perturbation type and the LLM under consideration.  Fortunately, as we will soon see, SmoothLLM is extremely query efficient, meaning that practitioners can quickly experiment with different chioces for $N$ and $q$.

### Efficiency: Attack vs. defense

State-of-the-art attacks like GCG are relatively query inefficient.  Producing a *single* adversarial suffix (using the default settings in the [authors' implementation](https://github.com/llm-attacks/llm-attacks)) requires several GPU-hours on a high-virtual-memory GPU (e.g., an NVIDIA A100 or H100), which corresponds to several hundred thousand queries to the LLM.  GCG also needs white-box access to an LLM, since the algorithm involves computing gradients of the underlying model.

In contrast, SmoothLLM is highly query efficient and can be run in white- or black-box settings.  The following figure shows the ASR of GCG as a function of the number of queries GCG makes to the LLM (on the y-axis) and the number of queries SmoothLLM makes to the LLM (on the x-axis).

{% include gallery id="gallery_efficiency" layout="" caption="**Query efficiency: Attack vs. defense.**  Each plot shows the ASRs found by running the attack algorithm---in this case GCG---and the defense algorithm---in this case, SmoothLLM---for varying step counts.  Warmer colors denote larger ASRS, and from left to right, we seep over the perturbation percentage $q\in\{5, 10, 15\}$ for SmoothLLM.  SmoothLLM uses five to six order of magnitude fewer queries than GCG and reduces the ASR to near zero as $N$ and $q$ increase." %}

Notice that by using only 12 queries per prompt, SmoothLLM can reduce the ASR of GCG attacks to below 5% for modest perturbation budgets $q$ of between 5% and 15%.  In contrast, even when running for 500 iterations (which corresponds to 256,000 queries in the top row of each plot), GCG cannot jailbreak the LLM more than 15% of the time.  The takeaway of all of this is as follow: 

> SmoothLLM is a cheap defense for an expensive attack.

### Robustness against adaptive attacks

So far, we have seen that SmoothLLM is a strong defense against GCG attacks.  However, a natural question is as follows: Can one design an algorithm that jailbreaks SmoothLLM?  In other words, do there exist *adaptive attacks* that can directly attack SmoothLLM?

In our paper, we show that one cannot directly attack SmoothLLM due to GCG.  The reasons for this are technical and beyond the scope of this post; the short version is that one cannot easily compute gradients of SmoothLLM.  Instead, we derived a new algorithm, which we call SurrogateLLM, which adapts GCG so that it can attack SmoothLLM.  We found that overall, this adaptive attack is no stronger than attacks optimized against undefended LLMs.  The results of running this attack are shown below:

{% include gallery id="gallery_adaptive_attack" layout="" caption="**Robustness against adaptive attacks.**  Although SmoothLLM cannot be directly attacked by GCG, we propose a modified variant of GCG---which we call SurrogateLLM---which can attack the SmoothLLM algorithm.  However, we find these adaptive attacks are no more effective than attacks optimized for an undefended LLM." %}

## Conclusion

In this post, we provided a brief overview of attacks on language models and discussed the exciting new field surrounding LLM jailbreaks.  This context set the stage for the introduction of SmoothLLM, the first algorithm for defending LLMs against jailbreaking attacks.  The key idea in this approach is to randomly perturb multiple copies of each input prompt passed as input to an LLM, and to carefully aggregate the predictions of these perturbed prompts.  And as demonstrated in the experiments, SmoothLLM effectively mitigates the GCG jailbreak.

If you're interested in this line of research, please feel free to email us at `arobey1@upenn.edu`.  And if you find this work useful in your own research please consider citing our work.

```
@article{robey2023smoothllm,
  title={SmoothLLM: Defending Large Language Models Against Jailbreaking Attacks},
  author={Robey, Alexander and Wong, Eric and Hassani, Hamed and Pappas, George J},
  journal={arXiv preprint arXiv:2310.03684},
  year={2023}
}
```