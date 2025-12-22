---
title: "Research"
permalink: /research/
layout: splash
---

<style>
.research-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));
  gap:30px;
  margin-top:2rem;
  align-items:stretch;          
}

.research-card{
  display:flex;                
  flex-direction:column;
  background:#f9f9f9;
  padding:16px;
  border-radius:12px;
  box-shadow:0 4px 10px rgba(0,0,0,0.05);
  text-align:center;
}

.research-card img{
  width:100%;
  height:auto;
  border-radius:10px;
  aspect-ratio:16/9;           
  object-fit:cover;
}

.research-card h3{
  margin-top:1rem;
  font-size:1.2rem;
}

.research-card p{
  font-size:0.95rem;
  color:#555;
  flex:1;                       /* lets description stretch */
}

.research-links{
  margin-top:auto;              /* pins buttons to bottom */
}

.research-links a{
  display:inline-block;
  margin:8px 10px 0;
  padding:6px 12px;
  background:#007acc;
  color:#fff;
  border-radius:5px;
  font-size:0.9rem;
  text-decoration:none;
}

.research-links a:hover{
  background:#005eaa;
}
</style>

<div class="research-grid">

  <!-- Paper 14 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/verifiability-first.png" alt="Paper 14">
    <h3>Verifiability-First Agents: Provable Observability and Lightweight Audit Agents for Controlling Autonomous LLM Systems</h3>
    <p>An architecture with built-in attestations, audit agents, and challenge-response checks, alongside OPERA to benchmark detection and remediation of agent misalignment</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2512.17259" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 13 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/dac-lora.png" alt="Paper 13">
    <h3>DAC-LoRA: Dynamic Adversarial Curriculum for Efficient and Robust Few-Shot Adaptation</h3>
    <p>A generalized framework that uses a dynamic, adversarial curriculum to make Vision-Language Models (VLMs) more robust against attacks, improving efficiency and few-shot adaptation</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2509.20792" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 12 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/DINOHash.png" alt="Paper 12">
    <h3>DINOHash: Learning Adversarially Robust Perceptual Hashes from Self-Supervised Features</h3>
    <p>An open-source framework for robust perceptual image hashing, DINOHash enables secure and transformation-resilient provenance detection of AI-generated images.</p>
    <div class="research-links">
      <a href="https://openreview.net/pdf?id=HrGa8Mq2NE" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 11 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/blogpost.png" alt="Paper 11">
    <h3>SPD Attack - Prevention of AI Powered Image Editing by Image Immunization</h3>
    <p>An analysis of methods to safeguard images against misuse in image-to-image editing models through reproduction and extension of existing research across various models and datasets.</p>
    <div class="research-links">
      <a href="https://iclr-blogposts.github.io/2025/blog/spd/" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 10 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/img-model-distillation.jpg" alt="Paper 10">
    <h3>From Teacher to Student: Tracking Memorization Through Model Distillation</h3>
    <p>An analysis of knowledge distillation effects on memorization in fine-tuned language models, showing that distillation from large teachers to smaller students mitigates memorization risks while improving efficiency.</p>
    <div class="research-links">
      <a href="https://aclanthology.org/2025.l2m2-1.6/" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 9 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/Revisiting_CroPA.png" alt="Paper 9">
    <h3>Revisiting CroPA: A Reproducibility Study and Enhancements for Cross-Prompt Adversarial Transferability in Vision-Language Models</h3>
    <p>In this study, we conduct a comprehensive reproducibility study of "An Image is Worth 1000 Lies: Adversarial Transferability Across Prompts on Vision-Language Models" validating the Cross-Prompt Attack (CroPA), and also proposing several key improvements to the framework.</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2506.22982" target="_blank">Paper</a>
      <a href="https://github.com/Swadesh06/Revisting_CroPA" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 8 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/ReCUDA.png" alt="Paper 8">
    <h3>[Re] CUDA: Curriculum of Data Augmentation for Long‐tailed Recognition</h3>
    <p>Using classwise degree of data augmentation to tackle class imbalance in long tailed dataset</p>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=Wm6d44I8St" target="_blank">Paper</a>
      <a href="https://github.com/whitewhistle/CUDA-org-" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 7 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/RiemannSum.png" alt="Paper 7">
    <h3>Riemann Sum Optimization for Accurate Integrated Gradients Computation</h3>
    <p>A mathematical framework to reduce computational complexity of Integrated Gradients</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2410.04118" target="_blank">Paper</a>
      <a href="https://github.com/ShreeSinghi/RiemannOpt" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 6 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/StrengtheningInterpretability.png" alt="Paper 6">
    <h3>A reproducability study of Important Direction Gradient Integration (IDGI)</h3>
    <p>Highlight key results or methods involved in 1-2 lines.</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2409.09043" target="_blank">Paper</a>
      <a href="https://github.com/ShreeSinghi/TMLR-IDGI" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 5 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/randomisedsmoothing.png" alt="Paper 5">
    <h3>Rethinking Randomized Smoothing from the Perspective of Scalability</h3>
    <p>A study on randomized smoothing, analysed from the perspective of scalability as a challenge to its continued application</p>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=zkzo72ZQqF" target="_blank">Paper</a>
      <a href="https://github.com/yourrepo4" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 4 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/ImageAlchemy.png" alt="Paper 4">
    <h3>Image-Alchemy: Advancing Subject Fidelity in Personalized Text-to-Image Generation</h3>
    <p>A two-stage personalization pipeline for personalized image generation using LoRA-based attention fine-tuning and segmentation-guided Img2Img synthesis.</p>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=wOh5cAM9qC" target="_blank">Paper</a>
      <a href="https://github.com/kaustubh202/image-alchemy" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 3 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/FluxWatermarking.png" alt="Paper 3">
    <h3>Detection Limits and Statistical Separability of Tree Ring Watermarks in Rectified Flow-based Text-to-Image Generation Models</h3>
    <p>Tree Ring Watermarks are harder to detect in modern rectified flow-based models compared to traditional diffusion models, especially under image attacks.</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2504.03850" target="_blank">Paper</a>
      <a href="https://github.com/dsgiitr/flux-watermarking" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 2 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/OneNoisetoFool.png" alt="Paper 2">
    <h3>One Noise to Fool Them All: Universal Adversarial Defenses Against Image Editing</h3>
    <p>Image immunization involves adding undetectable noise in images to prevent editing via diffusion models. We further extended this to multiple images using a single noise.</p>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=Xvc3fyP19Y" target="_blank">Paper</a>
      <a href="https://github.com/dsgiitr/repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 1 -->
  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/LanguageGuidance.png" alt="Paper 1">
    <h3>Impact of Language Guidance: A Reproducibility Study</h3>
    <p>A reproducability study of Language guidance on self-supervised learning frameworks</p>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=qTDDGHvXiU&referrer=%5Bthe%20profile%20of%20Cherish%20Puniani%5D(%2Fprofile%3Fid%3D~Cherish_Puniani1)" target="_blank">Paper</a>
      <a href="https://github.com/dsgiitr/repo" target="_blank">GitHub</a>
    </div>
  </div>

</div>
