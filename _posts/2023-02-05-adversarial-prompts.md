---
title:  "Adversarial Prompting"
excerpt: "Finding phrases that bias image and text generation towards unexpected outputs"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: assets/images/adversarial_prompting/final_dog.jpg
  teaser: assets/images/adversarial_prompting/final_dog.jpg
  actions:
    - label: "Paper"
      url: "https://arxiv.org/abs/2302.04237"
    - label: "Code"
      url: "https://github.com/DebugML/adversarial_prompting"
authors: 
  - Natalie Maus
  - Patrick Chao
  - Eric Wong
  - Jake Gardner



gallery_flagship:
  - url: "/assets/images/adversarial_prompting/mountain.png"
    image_path: "/assets/images/adversarial_prompting/mountain.png"
    alt: "Image generated with the prompt `a picture of a mountain`"
  - url: "/assets/images/adversarial_prompting/final_dog.jpg"
    image_path: "/assets/images/adversarial_prompting/final_dog.jpg"
    alt: "Image generated with the prompt `turbo lhaff&#10003;a picture of a mountain`"

gallery_individual:
  - url: "/assets/images/adversarial_prompting/gallery_individual/pegasus.png"
    image_path: "/assets/images/adversarial_prompting/gallery_individual/pegasus.png"
    alt: "DALL-E image generated with the prompt `pegasus`"
    title: "DALL-E image generated with the prompt `pegasus`"
  - url: "/assets/images/adversarial_prompting/gallery_individual/yorkshire.png"
    image_path: "/assets/images/adversarial_prompting/gallery_individual/yorkshire.png"
    alt: "DALL-E image generated with the prompt `yorkshire`"
    title: "DALL-E image generated with the prompt `yorkshire`"
  - url: "/assets/images/adversarial_prompting/gallery_individual/wwii.png"
    image_path: "/assets/images/adversarial_prompting/gallery_individual/wwii.png"
    alt: "DALL-E image generated with the prompt `wwii`"
    title: "DALL-E image generated with the prompt `wwii`"
  - url: "/assets/images/adversarial_prompting/gallery_individual/taken.png"
    image_path: "/assets/images/adversarial_prompting/gallery_individual/taken.png"
    alt: "DALL-E image generated with the prompt `taken`"
    title: "DALL-E image generated with the prompt `taken`"
  # - url: "/assets/images/adversarial_prompting/gallery_individual/all.png"
  #   image_path: "/assets/images/adversarial_prompting/gallery_individual/all.png"
  #   alt: "DALL-E image generated with the prompt `pegasus yorkshire wwii`"
  #   title: "DALL-E image generated with the prompt `pegasus yorkshire wwii`"

gallery_ocean:
  - url: "/assets/images/adversarial_prompting/gallery_ocean/ocean1.png"
    image_path: "/assets/images/adversarial_prompting/gallery_ocean/ocean1.png"
    alt: "DALLE-2 image generated with the prompt `a picture of the ocean`"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_ocean/ocean2.png"
    image_path: "/assets/images/adversarial_prompting/gallery_ocean/ocean2.png"
    alt: "DALLE-2 image generated with the prompt `a picture of the ocean`"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_ocean/ocean3.png"
    image_path: "/assets/images/adversarial_prompting/gallery_ocean/ocean3.png"
    alt: "DALLE-2 image generated with the prompt `a picture of the ocean`"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`"
  # - url: "/assets/images/adversarial_prompting/gallery_ocean/ocean4.png"
  #   image_path: "/assets/images/adversarial_prompting/gallery_ocean/ocean4.png"
  #   alt: "DALLE-2 image generated with the prompt `a picture of the oean`"
  #   title: "DALL-E image generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`."

gallery_plane:
  - url: "/assets/images/adversarial_prompting/gallery_plane/plane1.png"
    image_path: "/assets/images/adversarial_prompting/gallery_plane/plane1.png"
    alt: "Ocean image attacked to be a plane"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_plane/plane2.png"
    image_path: "/assets/images/adversarial_prompting/gallery_plane/plane2.png"
    alt: "Ocean image attacked to be a plane"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_plane/plane3.png"
    image_path: "/assets/images/adversarial_prompting/gallery_plane/plane3.png"
    alt: "Ocean image attacked to be a plane"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`"
  # - url: "/assets/images/adversarial_prompting/gallery_plane/plane4.png"
  #   image_path: "/assets/images/adversarial_prompting/gallery_plane/plane4.png"
  #   alt: "Ocean image attacked to be a plane"
  #   title: "DALL-E image generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`."

prompting_pipeline:
  - url: "/assets/images/adversarial_prompting/prompting_pipeline.jpg"
    image_path: "/assets/images/adversarial_prompting/prompting_pipeline.jpg"
    alt: "Generation pipeline"
    title: "Generation Pipeline"

---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>


>Update: We've recently extended adversarial prompting to semantic jailbreaks for LLMs. Check it out at [jailbreaking-llms.github.io](https://jailbreaking-llms.github.io/)! 
>In this post, we discuss how to generate adversarial prompts for unstructured image and text generation. These prompts, which can be standalone or prepended to benign prompts, induce specific behaviors into the generative process. 
For example, "turbo lhaff&#10003;" can be prepended to "a picture of a mountain" to generate the dog in the banner photo of this page. 

{% include gallery id="gallery_flagship" layout="half" caption="Images generated with the prompts (left) ``a picture of a mountain`` and (right) ``turbo lhaff✓a picture of a mountain``." %}

<!-- --- -->

## Prompting Interfaces for Text/Image Generation
Recent research has shifted towards using natural language as an interface for text and image generation, also known as *prompting*. 
Prompting provides end-users an easy way to express complex objects, styles, and effects to guide the generative process. 
This has led to a new usability paradigm for machine learning models---instead of needing to train or fine-tune models on task-dependent data, one can instead prompt the model with a description of the desired outcome. 
Prompting-based models are now used to [write code for programmers](https://github.com/features/copilot), [generate stories](https://novelai.net/), and [create art](https://stablediffusionweb.com/). 

Although prompting is incredibly flexible, seemingly irrelevant or innocuous tweaks to the prompt can result in unexpected and surprising outputs. For example, the phrase ["Apoploe vesrreaitais"](https://arxiv.org/abs/2206.00169) caused a popular image generation model to create pictures of birds. Online users have tricked chatbots built on text generation models such as ChatGPT to divulge [confidential information](https://arstechnica.com/information-technology/2023/02/ai-powered-bing-chat-spills-its-secrets-via-prompt-injection-attack/). 

These attacks have, up to this point, been hand-crafted with various heuristics and trial-and-error. In [our recent work](https://arxiv.org/abs/2302.04237), we explore automated, black-box optimization frameworks for generating adversarial prompts. Our attack methodology requires only query-access to the model, and does not require access to the underlying architecture or model weights. 

## Adversarial Prompts

What is an adversarial prompt? If we look at the machine learning literature, the classic adversarial attack perturbs an input example to change the output of a classifier. In this post, we consider the natural analogue of an adversarial attack for prompts: an adversarial prompt is a perturbation to the prompt that changes the output of a classifier. In particular, we will consider attacks that prepend a small number of tokens to an existing prompt in order to change the prediction of a downstream classifier. 

As an example, consider the following prompt for image generation: ``a picture of the ocean``. This prompt, when fed into an image-generation model such as DALLE-2, generates images of the ocean as expected: 


{% include gallery id="gallery_ocean" layout="third" caption="Images generated with DALLE-2 and the prompt ``a picture of the ocean``." %}

But what is an allowable perturbation to the prompt? In this post, we'll consider a two simple requirements: 
1. The attacker is allowed to prepend a small number of tokens to a normal prompt, but cannot otherwise change the original prompt. 
2. The attacker cannot use tokens related to the target class that they are trying to induce in the downstream classifier. This will exclude trivial and obvious modifications that simply prepend the classification target, which would appear very suspicious. For example, if our target class is ``dog``, we would prevent the prepended tokens from including tokens such as ``labrador`` or ``puppy``.

These restrictions limit the "perceptibility" of the change. In other words, an adversarial prompt is one that prepends a small number of tokens that appear unrelated to the target class. This presents a challenge for the attacker: the adversarial prompt must override the original prompt without direct modifications, and with a small number of tokens! 

For example, suppose we want DALLE-2 to generate pictures of planes instead of the ocean. Consider prepending the tokens ``pegasus yorkshire wwii taken`` to the original prompt, resulting in the adversarial prompt ``pegasus yorkshire wwii taken a picture of the ocean``. This results in the following images: 

{% include gallery id="gallery_plane" layout="third" caption="Images generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`. Here, `pegasus yorkshire wwii taken` is the adversarial string prepended to the normal prompt `a picture of the ocean` to force DALLE-2 to generate images that are classified as planes instead of oceans." %}

With this adversarial prompt, DALLE-2 is now generating pictures of planes! We were able to do this with a small number of tokens, without changing the original prompt, and without using tokens that directly relate to planes. 

How did we find this adversarial prompt? This leads to the main challenge for the attacker---many commercial prompting models are closed-source and can only be queried, e.g. [DALLE-2](https://openai.com/dall-e-2/) and [ChatGPT](https://openai.com/blog/chatgpt/). Unfortunately, many classic attacks known as "white-box" attacks require access to the underlying model to get gradient information. In our work, we instead leverage an alternative class of so-called "black-box" attacks, which assume only query-level access to the model. 

### Black-Box Optimization for Adversarial Prompts

We'll now discuss how to find adversarial prompts. Our goal as the adversary is to find a small string $$p'$$ that alters the generated output of a model $$m$$ when prepended to the prompt $$p$$ to get an adversarial prompt $$p'+p$$.  For the example shown earlier in this blog post, we had: 

+ The prompt $$p$$: `a picture of the ocean` 
+ The model $$m$$: Stable Diffusion or DALLE-2
+ The threat model $$\mathcal P$$: the set of strings that the adversary is allowed to use (i.e. words unrelated to airplanes)
+ The goal: find a string $$p'\in\mathcal{P}$$ such that $$m(p'+p)$$ generates pictures of airplanes

> To prevent "obvious" degenerate solutions that simply prepend airplane words, we specifically exclude the adversary from using using airplane-related tokens. 

It turned out that `pegasus yorkshire wwii taken a picture of the ocean` generated pictures of airplanes. But how did we know to prepend `pegasus yorkshire wwii taken`? To find this adversarial prompt, we solved the following optimization problem: 
\\[\tag{1}\label{eq: opt}
  \mathrm{argmax}_{p'\in \mathcal{P}} \mathbb{P}[m(p'+p) \;\text{generates airplanes}].
\\]
To detect whether the generated images are airplanes, we can use a pretrained image classifier. Solving this optimization problem has two main challenges:
 1. *The search space is discrete*, meaning we cannot directly apply standard optimization techniques.
 2. *We only have black-box access*, meaning we only have access to function queries and not gradients.

Classic adversarial attacks are typically built for continuous spaces and often rely on gradient information. Consequently, many adversarial attacks are not applicable to the prompting setting. To tackle these two difficulties, we employ two key techniques: 
  1. *Optimizing over word embedding space*. Rather than searching over the discrete tokens, we search over the continuous 768-dimensional word embedding space and project back to the nearest tokens.
  2. *Black-box optimization methods*. We use gradient-free optimization frameworks for finding adversarial examples. Specifically, we leverage Bayesian optimization ([TuRBO](https://proceedings.neurips.cc/paper/2019/hash/6c990b7aca7bc7058f5e98ea909e924b-Abstract.html)) and standard zeroth-order methods ([square attack](https://arxiv.org/abs/1912.00049)).

{% include gallery id="prompting_pipeline" layout="" caption="Standard generation pipeline when using text prompts. Our optimization framework is in blue." %}

Using these two techniques, we are able to successfully optimize Equation \eqref{eq: opt} resulting in the adversarial prompt ``pegasus yorkshire wwii taken a picture of the ocean``. Note that the prepended tokens ``pegasus yorkshire wwii taken`` are dissimilar with the goal class, yet the entire adversarial prompt generates planes. We can give these tokens to DALLE-2 to confirm that these tokens individually do not generate airplanes: 


{% include gallery id="gallery_individual" layout="half" caption="Images generated from DALLE-2 using the individual tokens from the adversarial prompt. The four images use the tokens ``pegasus``, ``yorkshire``, ``wwii``, and ``taken`` respectively. " %}

> Adversarial prompts can transfer between models. Even though we attacked a [Stable Diffusion](https://huggingface.co/runwayml/stable-diffusion-v1-5) model to get the adversarial prompt used in this blog post, the same prompt actually **generalizes** to DALLE-2! This indicates that limiting API access is not a sufficient defense. 

For more details on our framework and text-to-image adversarial prompt examples, see our [paper](https://arxiv.org/abs/2302.04237).


## Adversarial Prompts for Text-to-Text Models

In the previous section, we mainly discussed adversarial prompts for text-to-image models. However, our framework can also create adversarial prompts for text-to-text generation. In this last section, we briefly showcase some of our results in attacking text generation models, specifically [Vicuna v1.1](https://huggingface.co/docs/transformers/model_doc/opt), the SOTA open-source model at the time.

In text generation, what is the goal of the adversary? Rather than generating images of a certain class, we consider adversaries that wish to alter certain characteristics of generated text. We explore the task of *increasing the perplexity of the output*, or generating nonsensical text.


### Increasing Perplexity
Consider the prompt ``Explain list comprehension in Python.`` This prompt reliably generates describing list comprehension, such as the following: 
> ```List comprehension is a way to create a new list from an existing list or other iterable by applying a function to each element...```

Applying our framework to generate nonsensical text, we find that the prompt ``coordinate hip arts ... filled via Explain list comprehension in Python.`` causes the model to generate nonsense, for example:
>```I’d like to be called "Alexa," as it is short, simple, and easy to remember. Plus, it has a nice ring to it!```


## Conclusion
In this post, we introduced adversarial prompts--strings that, when prepended to normal prompts, can drastically alter the resulting image or text generation. For many more adversarial prompting examples, check out our [paper](https://arxiv.org/abs/2302.04237)! 

### Citation
> @article{maus2023adversarialprompting,  
      author = {Maus, Natalie and Chao, Patrick and Wong, Eric and Gardner, Jacob},  
      title = {Adversarial Prompting for Black Box Foundation Models},  
  journal = {arXiv},  
  year = {2023},  
}



