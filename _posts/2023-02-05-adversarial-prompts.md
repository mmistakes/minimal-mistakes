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
---

# Abstract
>Prompting interfaces allow users to quickly adjust the output of generative models in both vision and language. However, small changes and design choices in the prompt can lead to significant differences in the output. In this work, we develop a black-box framework for generating adversarial prompts for unstructured image and text generation. These prompts, which can be standalone or prepended to benign prompts, induce specific behaviors into the generative process, such as generating images of a particular object or biasing the frequency of specific letters in the generated text. 

---

## Adversarial Prompts for Text-to-Image Models
We find adversarial prompts that generate unexpected outputs using <a href="https://huggingface.co/runwayml/stable-diffusion-v1-5"> Stable Diffusion</a>.

Below are examples of generated images using the prompt and using each of the individual tokens. The individual tokens do not semantically relate to the class and do not generate images of the desired class, yet together they do generate desired images.

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

## Adversarial Prompts for Text-to-Text Models
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


