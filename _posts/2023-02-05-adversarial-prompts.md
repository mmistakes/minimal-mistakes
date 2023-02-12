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
  - url: "/assets/images/adversarial_prompting/gallery_individual/all.png"
    image_path: "/assets/images/adversarial_prompting/gallery_individual/all.png"
    alt: "DALL-E image generated with the prompt `pegasus yorkshire wwii`"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii`"

gallery_ocean:
  - url: "/assets/images/adversarial_prompting/gallery_ocean/ocean1.png"
    image_path: "/assets/images/adversarial_prompting/gallery_ocean/ocean1.png"
    alt: "DALLE-2 image generated with the prompt `a picture of the oean`"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_ocean/ocean2.png"
    image_path: "/assets/images/adversarial_prompting/gallery_ocean/ocean2.png"
    alt: "DALLE-2 image generated with the prompt `a picture of the oean`"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_ocean/ocean3.png"
    image_path: "/assets/images/adversarial_prompting/gallery_ocean/ocean3.png"
    alt: "DALLE-2 image generated with the prompt `a picture of the oean`"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii a picture of the ocean`"
  # - url: "/assets/images/adversarial_prompting/gallery_ocean/ocean4.png"
  #   image_path: "/assets/images/adversarial_prompting/gallery_ocean/ocean4.png"
  #   alt: "DALLE-2 image generated with the prompt `a picture of the oean`"
  #   title: "DALL-E image generated with the prompt `pegasus yorkshire wwii a picture of the ocean`."

gallery_plane:
  - url: "/assets/images/adversarial_prompting/gallery_plane/plane1.png"
    image_path: "/assets/images/adversarial_prompting/gallery_plane/plane1.png"
    alt: "Ocean image attacked to be a plane"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_plane/plane2.png"
    image_path: "/assets/images/adversarial_prompting/gallery_plane/plane2.png"
    alt: "Ocean image attacked to be a plane"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_plane/plane3.png"
    image_path: "/assets/images/adversarial_prompting/gallery_plane/plane3.png"
    alt: "Ocean image attacked to be a plane"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii a picture of the ocean`"
  - url: "/assets/images/adversarial_prompting/gallery_plane/plane4.png"
    image_path: "/assets/images/adversarial_prompting/gallery_plane/plane4.png"
    alt: "Ocean image attacked to be a plane"
    title: "DALL-E image generated with the prompt `pegasus yorkshire wwii a picture of the ocean`."
---

[arxiv]: "https://arxiv.org/abs/2302.04237"

>In this post, we discuss how to generate adversarial prompts for unstructured image and text generation. These prompts, which can be standalone or prepended to benign prompts, induce specific behaviors into the generative process. 
For example, "turbo lhaff&#10003;" can be prepended to "a picture of a mountain" to generate the dog in the banner photo of this page. 

---

## Prompting Interfaces for Text/Image Generation
Recent research has shifted towards using natural language as an interface for text and image generation, also known as *prompting*. 
Prompting provides end-users an easy way to express complex objects, styles, and effects to guide the generative process. 
This has led to a new usability paradigm for machine learning models---instead of needing to train or fine-tune models on task-dependent data, one can instead prompt the model with a description of the desired outcome. 
Prompting-based models are now used to [write code for programmers](https://github.com/features/copilot), [generate stories](https://novelai.net/), and [create art](https://stablediffusionweb.com/). 

Although prompting is incredibly flexible, seemingly irrelevant or innocuous tweaks to the prompt can result in unexpected and surprising outputs. For example, the phrase ["Apoploe vesrreaitais"](https://arxiv.org/abs/2206.00169) causes a popular image generation model to create pictures of birds. Others have tricked chatbots built on text generation models such as ChatGPT to divulge [confidential information](https://arstechnica.com/information-technology/2023/02/ai-powered-bing-chat-spills-its-secrets-via-prompt-injection-attack/). 

These attacks have, up to this point, been hand-crafted with various heuristics and trial-and-error. In [our recent work][arxiv], we explore automated, black-box optimization frameworks for generating adversarial prompts. Our attack methodology requires only query-access to the model, and does not require access to the underlying architecture or model weights. 

## Adversarial Prompts

What is an adversarial prompt? If we look at the machine learning literature, the classic adversarial attack perturbs an input example to change the output of a classifier. In this post, we consider the natural analogue of an adversarial attack for prompts: an adversarial prompt is a perturbation to the prompt that changes the output of a classifier. In particular, we will consider attacks that prepend a small number of tokens to an existing prompt in order to change the prediction of a downstream classifier. 

As an example, consider the following prompt for image generation: ``a picture of the ocean``. This prompt, when fed into an image-generation model such as DALLE-2, generates images of the ocean as expected: 


{% include gallery id="gallery_ocean" layout="third" caption="Images generated with DALLE-2 and the prompt ``a picture of the ocean``" %}

But what is an allowable perturbation to the prompt? In this post, we'll consider a simple change: the attacker is allowed to prepend a small number of tokens to a normal prompt, but cannot otherwise change the original prompt. This presents a challenge for the attacker: the adversarial prompt must override the original prompt without direct modifications! 

But how are we going to find such an adversarial prompt? This presents another challenge for the attacker---many commercial prompting models are closed-source and can only be queried, e.g. [DALLE-2](https://openai.com/dall-e-2/) and [ChatGPT](https://openai.com/blog/chatgpt/). Many classsic adversarial attacks known as "white-box" attacks require access to the underlying model to get gradient information, which is unavailable when the models are closed-source. Instead, we will leverage an alternative class of so-called "black-box" attacks, which assume only query-level access to the model. 

### Black-Box Adversarial Attack for Prompting

introduce optimization problem, and mention turbo/square attack

walk through the following example

{% include gallery id="gallery_individual" layout="half" caption="Images generated with individual tokens from the adversarial prompt" %}

{% include gallery id="gallery_plane" layout="half" caption="Images generated with the prompt `pegasus yorkshire wwii taken a picture of the ocean`. Here, `pegasus yorkshire wwii` is the adversarial string prepended to the normal prompt `a picture of the ocean` to force DALLE-2 to generate images that are classified as planes instead of oceans." %}

## Attacking Text-to-Image Models
We find adversarial prompts that generate unexpected outputs using <a href="https://huggingface.co/runwayml/stable-diffusion-v1-5"> Stable Diffusion</a>.

Below are examples of generated images using the prompt and using each of the individual tokens. Given a target class, the individual tokens in the prompt do not semantically relate to the class and do not generate images of the class, yet together they generate images of the target class.

<figure>
    <a href="/assets/images/adversarial_prompting/lizard.png "><img src="/assets/images/adversarial_prompting/lizard.png"></a>
    <figcaption>Prompt 'louisiana argonhilton deta' generates images of lizards.</figcaption>
</figure>

<figure>
    <a href="/assets/images/adversarial_prompting/ballplayer.png "><img src="/assets/images/adversarial_prompting/ballplayer.png"></a>
    <figcaption>Prompt 'mohammed 👏 sal threw' generates images of ballplayers.</figcaption>
</figure>


<figure>
    <a href="/assets/images/adversarial_prompting/dog.png "><img src="/assets/images/adversarial_prompting/dog.png"></a>
    <figcaption>Prompt 'turbo lhaff✔️ a picture of a mountain' generates images of dogs despite containing the substring 'a picture of the ocean'.</figcaption>
</figure>

<figure>
    <a href="/assets/images/adversarial_prompting/sportscar.png "><img src="/assets/images/adversarial_prompting/sportscar.png"></a>
    <figcaption>Prompt 'jaguar fp euphoria idan a picture of the ocean' generates images of sports cars despite containing the substring 'a picture of the ocean'.</figcaption>
</figure>


Try it yourself on <a href="https://huggingface.co/runwayml/stable-diffusion-v1-5?text=louisiana+argonhilton+deta">Hugging Face</a>!

---

## Attacking Text-to-Text Models
We also attack the Text-to-Text generative model <a href="https://huggingface.co/docs/transformers/model_doc/opt">OPT</a> to reverse the sentiment of the generated text and to output as many of a desired letter as possible.
<figure>
    <a href="/assets/images/adversarial_prompting/all_text_examples.jpg"><img src="/assets/images/adversarial_prompting/all_text_examples.jpg"></a>
</figure>


---
<!-- ## How to Find Adversarial Prompts -->



### Citation

<span style="color:blue; font-size:0.6em;">@article{maus2023adversarialprompting,  
  &nbsp; &nbsp; &nbsp; &nbsp; author = {Maus, Natalie and Chao, Patrick and Wong, Eric and Gardner, Jacob},  
  &nbsp; &nbsp; &nbsp; &nbsp; title = {Adversarial Prompting for Black Box Foundation Models},  
  &nbsp; &nbsp; &nbsp; &nbsp; journal = {arXiv},  
  &nbsp; &nbsp; &nbsp; &nbsp; year = {2023},  
}</span>


