---
title: "Research"
permalink: /research/
layout: splash
---

<style>
.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  align-items: stretch;
}

.research-card {
  display: flex;                
  flex-direction: column;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  border: 1px solid #f0f0f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: left;
}

.research-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.research-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  aspect-ratio: 16/9;           
  object-fit: cover;
  margin-bottom: 1rem;
}

.research-card h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  line-height: 1.4;
  color: #2c3e50;
}

.research-card p {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex: 1; /* allows description to stretch and fill space */
}

/* ── Conference tags as modern pill badges ── */
.conf-tag {
  display: inline-block;
  align-self: flex-start;
  margin-bottom: 1.25rem;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #007acc;
  background: rgba(0, 122, 204, 0.1);
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.research-links {
  margin-top: auto; /* pins buttons to bottom */
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.research-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: #007acc;
  color: #fff;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
  flex: 1; /* makes buttons span evenly if multiple */
}

.research-links a:hover {
  background: #005eaa;
}

/* ── Filter dropdown ── */
.conf-filter {
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.conf-filter select {
  padding: 10px 20px;
  border: 1px solid #dce1e6;
  border-radius: 8px;
  background: #f8f9fa;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  min-width: 200px;
  appearance: auto;
}

.conf-filter select:hover,
.conf-filter select:focus {
  border-color: #007acc;
  box-shadow: 0 0 0 3px rgba(0,122,204,0.1);
}
</style>

<!-- ── Filter bar (auto-built from card tags) ── -->
<div class="conf-filter"><select id="conf-select"></select></div>

<div class="research-grid">

  <!-- Paper 14 -->
  <div class="research-card" data-conf="aaai">
    <img src="{{ site.baseurl }}/assets/images/research/verifiability-first.png" alt="Paper 14">
    <h3>Verifiability-First Agents: Provable Observability and Lightweight Audit Agents for Controlling Autonomous LLM Systems</h3>
    <p>An architecture with built-in attestations, audit agents, and challenge-response checks, alongside OPERA to benchmark detection and remediation of agent misalignment</p>
    <span class="conf-tag aaai">AAAI</span>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2512.17259" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 13 -->
  <div class="research-card" data-conf="iccv">
    <img src="{{ site.baseurl }}/assets/images/research/dac-lora.png" alt="Paper 13">
    <h3>DAC-LoRA: Dynamic Adversarial Curriculum for Efficient and Robust Few-Shot Adaptation</h3>
    <p>A generalized framework that uses a dynamic, adversarial curriculum to make Vision-Language Models (VLMs) more robust against attacks, improving efficiency and few-shot adaptation</p>
    <span class="conf-tag iccv">ICCV</span>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2509.20792" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 12 -->
  <!-- venue unknown -->
  <div class="research-card" data-conf="icml">
    <img src="{{ site.baseurl }}/assets/images/research/DINOHash.png" alt="Paper 12">
    <h3>DINOHash: Learning Adversarially Robust Perceptual Hashes from Self-Supervised Features</h3>
    <p>An open-source framework for robust perceptual image hashing, DINOHash enables secure and transformation-resilient provenance detection of AI-generated images.</p>
    <span class="conf-tag icml">ICML</span>
    <div class="research-links">
      <a href="https://openreview.net/pdf?id=HrGa8Mq2NE" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 11 -->
  <div class="research-card" data-conf="iclr">
    <img src="{{ site.baseurl }}/assets/images/research/blogpost.png" alt="Paper 11">
    <h3>SPD Attack - Prevention of AI Powered Image Editing by Image Immunization</h3>
    <p>An analysis of methods to safeguard images against misuse in image-to-image editing models through reproduction and extension of existing research across various models and datasets.</p>
    <span class="conf-tag iclr">ICLR</span>
    <div class="research-links">
      <a href="https://iclr-blogposts.github.io/2025/blog/spd/" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 10 -->
  <div class="research-card" data-conf="acl">
    <img src="{{ site.baseurl }}/assets/images/research/img-model-distillation.jpg" alt="Paper 10">
    <h3>From Teacher to Student: Tracking Memorization Through Model Distillation</h3>
    <p>An analysis of knowledge distillation effects on memorization in fine-tuned language models, showing that distillation from large teachers to smaller students mitigates memorization risks while improving efficiency.</p>
    <span class="conf-tag acl">ACL</span>
    <div class="research-links">
      <a href="https://aclanthology.org/2025.l2m2-1.6/" target="_blank">Paper</a>
    </div>
  </div>

  <!-- Paper 9 -->
  <div class="research-card" data-conf="tmlr">
    <img src="{{ site.baseurl }}/assets/images/research/Revisiting_CroPA.png" alt="Paper 9">
    <h3>Revisiting CroPA: A Reproducibility Study and Enhancements for Cross-Prompt Adversarial Transferability in Vision-Language Models</h3>
    <p>In this study, we conduct a comprehensive reproducibility study of "An Image is Worth 1000 Lies: Adversarial Transferability Across Prompts on Vision-Language Models" validating the Cross-Prompt Attack (CroPA), and also proposing several key improvements to the framework.</p>
    <span class="conf-tag tmlr">TMLR</span>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2506.22982" target="_blank">Paper</a>
      <a href="https://github.com/Swadesh06/Revisting_CroPA" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 8 -->
  <!-- venue unknown -->
  <div class="research-card" data-conf="mlrc">
    <img src="{{ site.baseurl }}/assets/images/research/ReCUDA.png" alt="Paper 8">
    <h3>[Re] CUDA: Curriculum of Data Augmentation for Long‐tailed Recognition</h3>
    <p>Using classwise degree of data augmentation to tackle class imbalance in long tailed dataset</p>
    <span class="conf-tag mlrc">MLRC</span>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=Wm6d44I8St" target="_blank">Paper</a>
      <a href="https://github.com/whitewhistle/CUDA-org-" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 7 -->
  <!-- venue unknown -->
  <div class="research-card" data-conf="neurips">
    <img src="{{ site.baseurl }}/assets/images/research/RiemannSum.png" alt="Paper 7">
    <h3>Riemann Sum Optimization for Accurate Integrated Gradients Computation</h3>
    <p>A mathematical framework to reduce computational complexity of Integrated Gradients</p>
    <span class="conf-tag neurips">NeurIPS</span>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2410.04118" target="_blank">Paper</a>
      <a href="https://github.com/ShreeSinghi/RiemannOpt" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 6 -->
  <div class="research-card" data-conf="tmlr">
    <img src="{{ site.baseurl }}/assets/images/research/StrengtheningInterpretability.png" alt="Paper 6">
    <h3>Strengthening Interpretability: An Investigative Study of Integrated Gradient Methods</h3>
    <p>This study reproduces IDGI, showing reduced noise and better stability than Integrated Gradients, while analyzing the effect of step size.</p>
    <span class="conf-tag tmlr">TMLR</span>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2409.09043" target="_blank">Paper</a>
      <a href="https://github.com/ShreeSinghi/TMLR-IDGI" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 5 -->
  <!-- venue unknown -->
  <div class="research-card" data-conf="neurips">
    <img src="{{ site.baseurl }}/assets/images/research/randomisedsmoothing.png" alt="Paper 5">
    <h3>Rethinking Randomized Smoothing from the Perspective of Scalability</h3>
    <p>A study on randomized smoothing, analysed from the perspective of scalability as a challenge to its continued application</p>
    <!-- <span class="conf-tag unknown">Venue Unknown</span> -->
    <span class="conf-tag neurips">NeurIPS</span>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=zkzo72ZQqF" target="_blank">Paper</a>
      <a href="https://github.com/FireShadow05/accelerated_smoothing" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 4 -->
  <div class="research-card" data-conf="iclr">
    <img src="{{ site.baseurl }}/assets/images/research/ImageAlchemy.png" alt="Paper 4">
    <h3>Image-Alchemy: Advancing Subject Fidelity in Personalized Text-to-Image Generation</h3>
    <p>A two-stage personalization pipeline for personalized image generation using LoRA-based attention fine-tuning and segmentation-guided Img2Img synthesis.</p>
    <span class="conf-tag iclr">ICLR</span>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=wOh5cAM9qC" target="_blank">Paper</a>
      <a href="https://github.com/kaustubh202/image-alchemy" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 3 -->
  <div class="research-card" data-conf="iclr">
    <img src="{{ site.baseurl }}/assets/images/research/FluxWatermarking.png" alt="Paper 3">
    <h3>Detection Limits and Statistical Separability of Tree Ring Watermarks in Rectified Flow-based Text-to-Image Generation Models</h3>
    <p>Tree Ring Watermarks are harder to detect in modern rectified flow-based models compared to traditional diffusion models, especially under image attacks.</p>
    <span class="conf-tag iclr">ICLR</span>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2504.03850" target="_blank">Paper</a>
      <a href="https://github.com/dsgiitr/flux-watermarking" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 2 -->
  <div class="research-card" data-conf="cvpr">
    <img src="{{ site.baseurl }}/assets/images/research/OneNoisetoFool.png" alt="Paper 2">
    <h3>One Noise to Fool Them All: Universal Adversarial Defenses Against Image Editing</h3>
    <p>Image immunization involves adding undetectable noise in images to prevent editing via diffusion models. We further extended this to multiple images using a single noise.</p>
    <span class="conf-tag cvpr">CVPR</span>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=Xvc3fyP19Y" target="_blank">Paper</a>
      <a href="https://github.com/dsgiitr/repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Paper 1 -->
  <!-- venue unknown -->
  <div class="research-card" data-conf="arxiv">
    <img src="{{ site.baseurl }}/assets/images/research/LanguageGuidance.png" alt="Paper 1">
    <h3>Impact of Language Guidance: A Reproducibility Study</h3>
    <p>A reproducability study of Language guidance on self-supervised learning frameworks</p>
    <span class="conf-tag arxiv">ArXiv</span>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=qTDDGHvXiU&referrer=%5Bthe%20profile%20of%20Cherish%20Puniani%5D(%2Fprofile%3Fid%3D~Cherish_Puniani1)" target="_blank">Paper</a>
      <a href="https://github.com/dsgiitr/repo" target="_blank">GitHub</a>
    </div>
  </div>

</div>

<script>
(function(){
  const select = document.getElementById('conf-select');
  const cards  = document.querySelectorAll('.research-card');

  // Collect unique venues from data-conf attributes
  const venues = ['all', ...[...new Set([...cards].map(c => c.dataset.conf).filter(Boolean))].sort()];

  // Build options dynamically
  venues.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v === 'all' ? 'All Venues' : v.toUpperCase();
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    const val = select.value;
    cards.forEach(card => {
      card.style.display = (val === 'all' || card.dataset.conf === val) ? '' : 'none';
    });
  });
})();
</script>
