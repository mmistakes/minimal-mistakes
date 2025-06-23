---
layout: splash
title: "Projects"
permalink: /projects/
---

<style>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

.project-card {
  background: #f2f2f2;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: center;
}

.project-card img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.project-card h3 {
  margin-top: 1rem;
  font-size: 1.25rem;
}

.project-card p {
  font-size: 0.95rem;
  color: #555;
}

.project-links a {
  display: inline-block;
  margin: 8px 10px 0;
  padding: 6px 12px;
  background: #007acc;
  color: white;
  border-radius: 5px;
  font-size: 0.9rem;
  text-decoration: none;
}

.project-links a:hover {
  background: #005eaa;
}
</style>

<div class="project-grid">

<div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/pikebotrl.png" alt="Pikabot-RL">
    <h3>Pikabot-RL</h3>
    <p>Using RL for training bots to play the online battle game Pokémon Showdown</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/PikaBot-RL" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/visual_ml/">Details</a>
    </div>
  </div>


<div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/diffusion-everything/banner.png" alt="Diffusion-Everything">
    <h3>Diffusion Everything</h3>
    <p>Demos involving diffusion models : 1. Training and inference of diffusion on a custom 2D dataset. 2. Training and inference of VAE and latent diffusion models   3. Inference of large diffusion models with different reverse samplers</p>
    <div class="project-links">
      <a href="https://github.con/dsgiitr/diffusion-everything" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/diffusion-everything/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/segmedit-new.png" alt="segment-then-edit">
    <h3>Segment-then-Edit</h3>
    <p>Segment parts of image and then perform inpainting or editing on specific object.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/segmedit" target="_blank">GitHub</a>
      <!-- <a href="https://huggingface.co/spaces/aakashks/adv-photo-editing">HF Demo</a> -->
      <a href="https://advikasinha.github.io/dsg-website/projects/segment-then-edit/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/research/ImageAlchemy.png" alt="ImageAlchemy">
    <h3>Image-Alchemy</h3>
    <p> A two-stage personalization pipeline for personalized image generation using LoRA-based attention fine-tuning and segmentation-guided Img2Img synthesis.</p>
    <div class="project-links">
      <a href="https://github.com/kaustubh202/image-alchemy" target="_blank">GitHub</a>
      <a href="https://agam-pandey.gitbook.io/knowledge-graph-embedding-or-dsg-iitr/">Details</a>
    </div>
  </div>


<div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/kge.png" alt="KGE">
    <h3>Knowledge Graph Embeddings for VLMs</h3>
    <p>Analysing impact of vector and graph embeddings on retrieval generation of VLMs on downstream tasks.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/kge-clip" target="_blank">GitHub</a>
      <a href="https://agam-pandey.gitbook.io/knowledge-graph-embedding-or-dsg-iitr/">Details</a>
    </div>
  </div>




  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/feedcode.png" alt="FeedCode">
    <h3>FeedCode</h3>
    <p>FeedCode is an intelligent feedback tool that provides personalized code reviews based on your coding style and activity</p>
    <div class="project-links">
      <a href="https://github.com/AbhishekPanwarr/feedCode" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/visual_ml/">Details</a>
    </div>
  </div>
  
  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/visualml.png" alt="Visual Ml">
    <h3>Visual ML</h3>
    <p>Interactive Visual Machine Learning Demos. Machine Learning in the browser powered by TF JS.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/VisualML" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/visual_ml/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/d2l_pytorch.svg" alt="d2l PyTorch">
    <h3>d2l-pytorch</h3>
    <p>This project reproduces the book Dive Into Deep Learning (www.d2l.ai), adapting the code from MXNet into PyTorch.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/d2l-pytorch" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/d2l-pytorch/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/graph_nets.svg" alt="Graph Nets">
    <h3>Graph Representation Learning</h3>
    <p>Implementation and Explanation Graph Representation Learning papers involving DeepWalk, GCN, GraphSAGE, ChebNet and GAT.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/graph_nets" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/graph_nets/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/rl2048.jpeg" alt="Visual Ml">
    <h3>Reinforcement Learning 2048</h3>
    <p>This project builds on a demo for playing the game 2048 using Reinforcement Learning.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/rl_2048" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/rl2048/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/visualml.png" alt="Sarcasm Detection">
    <h3>Sarcasm Detection using BERT</h3>
    <p>Implementation of BERT based Sarcasm Detection Classification model using Tensorflow.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/Sarcasm-Detection-Tensorflow" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/sarcasm_detection/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/adversarial_example.gif" alt="Adversarial Example">
    <h3>Adversarial Lab</h3>
    <p>This project builds on a demo for several Adversarial Attacks on ImageNet Classifier Models.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/adversarial_lab" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/adversarial_lab/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/np_detection.gif" alt="Number Plate Detection">
    <h3>Number Plate Detection</h3>
    <p>This is a step towards automating the vehicles entering IIT Roorkee campus using state of the art Deep learning & Computer Vision.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/np_detection" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/np_detection/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/Eye_In_The_Sky.svg" alt="Eye in the Sky">
    <h3>Eye In The Sky: Image Segmentation Challenge Inter IIT 2018</h3>
    <p>Winning Solution in the Inter IIT Tech Meet 2018 Machine Learning Challenge, "Eye In The Sky".</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/Eye-In-The-Sky-Image_Segmentation_Challenge" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/eye_in_the_sky/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/visualizing_loss.jpg" alt="Visualizing Loss">
    <h3>Visualizing Loss Functions</h3>
    <p>Visualising different loss and optimisation functions using Autoencoders.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/Visualizing-Loss-Functions" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/visualizing_loss/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/neural_style.gif" alt="Neural Style Transfer">
    <h3>Neural Style Transfer</h3>
    <p>Implementation of Neural Style Transfer described in the paper by Gatys et.al.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/Neural-Style-Transfer" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/neural_style/">Details</a>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/Traffic_sign.jpg" alt="Traffic Sign">
    <h3>Beginner Friendly Project: Traffic Sign Classification</h3>
    <p>Using GTSRB dataset to build a CNN based Traffic Sign Classifier.</p>
    <div class="project-links">
      <a href="https://github.com/dsgiitr/Traffic-Sign-Classification" target="_blank">GitHub</a>
      <a href="https://advikasinha.github.io/dsg-website/projects/traffic_sign_classification/">Details</a>
    </div>
  </div>

</div>
