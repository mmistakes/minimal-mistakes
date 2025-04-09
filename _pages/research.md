---
title: "Research"
permalink: /research/
layout: splash
---


<style>
.research-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 2rem;
}

.research-card {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: center;
}

.research-card img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.research-card h3 {
  margin-top: 1rem;
  font-size: 1.2rem;
}

.research-card p {
  font-size: 0.95rem;
  color: #555;
}

.research-links a {
  display: inline-block;
  margin: 8px 10px 0;
  padding: 6px 12px;
  background: #007acc;
  color: white;
  border-radius: 5px;
  font-size: 0.9rem;
  text-decoration: none;
}

.research-links a:hover {
  background: #005eaa;
}
</style>



<div class="research-grid">

  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research/ReCUDA.png" alt="Paper 1">
    <h3>[Re] CUDA: Curriculum of Data Augmentation for Long‐tailed Recognition</h3>
    <p>Using classwise degree of data augmentation to tackle class imbalance in long tailed dataset</p>
    <div class="research-links">
      <a href="https://openreview.net/forum?id=Wm6d44I8St" target="_blank">Paper</a>
      <a href="https://github.com/whitewhistle/CUDA-org-" target="_blank">GitHub</a>
    </div>
  </div>

  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/RiemannSum.png" alt="Paper 2">
    <h3>Riemann Sum Optimization for Accurate Integrated Gradients Computation</h3>
    <p>A mathematical framework to reduce computational complexity of Integrated Gradients</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/2410.04118" target="_blank">Paper</a>
      <a href="https://github.com/ShreeSinghi/RiemannOpt" target="_blank">GitHub</a>
    </div>
  </div>

  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research3.png" alt="Paper 3">
    <h3>Third Paper Title</h3>
    <p>Highlight key results or methods involved in 1-2 lines.</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/yourpaper3" target="_blank">Paper</a>
      <a href="https://github.com/yourrepo3" target="_blank">Code</a>
    </div>
  </div>

  <div class="research-card">
    <img src="{{ site.baseurl }}/assets/images/research4.png" alt="Paper 4">
    <h3>Fourth Research Paper</h3>
    <p>Brief overview — could be results, methods, or dataset focus.</p>
    <div class="research-links">
      <a href="https://arxiv.org/abs/yourpaper4" target="_blank">Paper</a>
      <a href="https://github.com/yourrepo4" target="_blank">Code</a>
    </div>
  </div>

</div>
