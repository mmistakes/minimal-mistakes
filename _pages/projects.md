---
layout: splash
title: "Projects"
permalink: /projects/
---

<style>
/* Modern Full-Width Grid Setup */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  margin-top: 3rem;
  padding: 0 20px;
}

/* Modern Project Card */
.project-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

/* Image styling */
.project-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

/* Content Container */
.project-card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-card h3 {
  margin: 0 0 12px 0;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 700;
}

.project-card p {
  font-size: 1rem;
  color: #5a6c7d;
  line-height: 1.6;
  flex-grow: 1; /* Pushes links to the bottom */
  margin-bottom: 24px;
}

/* Links & Buttons Container */
.project-links {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.project-links a {
  flex: 1;
  text-align: center;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

/* Primary Button (Details) */
.project-links .btn-details {
  background: #007acc;
  color: white;
}

.project-links .btn-details:hover {
  background: #005ea6;
}

/* Secondary Button (GitHub) */
.project-links .btn-github {
  background: #24292e;
  color: white;
}

.project-links .btn-github:hover {
  background: #1b1f23;
}
</style>

<div style="text-align: center; margin: 3rem 0;">
  <h1 style="font-size: 3rem; margin-bottom: 1rem;">Our Projects</h1>
  <p style="font-size: 1.2rem; color: #555; max-width: 600px; margin: 0 auto;">
    Discover the cutting-edge systems, applications, and innovative solutions built by the Data Science Group.
  </p>
</div>

<div class="project-grid">

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/DL_Playground.png" alt="DL-Playground">
    <div class="project-card-content">
      <h3>DL-Playground</h3>
      <p>Interactive, web-based visual editor for designing, prototyping, and understanding PyTorch neural network architectures with drag-and-drop interface.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/DL-Playground" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/DL_playground/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/d2l_pytorch.svg" alt="d2l PyTorch">
    <div class="project-card-content">
      <h3>d2l-pytorch</h3>
      <p>Full reproduction of the acclaimed book Dive Into Deep Learning (www.d2l.ai), adapting the code from MXNet into PyTorch.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/d2l-pytorch" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/d2l-pytorch/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/visualml.png" alt="Visual ML">
    <div class="project-card-content">
      <h3>Visual ML</h3>
      <p>Interactive Visual Machine Learning Demos directly in your browser. Live machine learning training and inference powered by TF JS.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/VisualML" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/visual_ml/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/pikebotrl.png" alt="Pikabot-RL">
    <div class="project-card-content">
      <h3>Pikabot-RL</h3>
      <p>Using Deep Reinforcement Learning for training AI bots to play the online battle game Pokémon Showdown autonomously.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/PikaBot-RL" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/pikabot_rl/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

    <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/kge.png" alt="KGE">
    <div class="project-card-content">
      <h3>Knowledge Graph Embeddings for VLMs</h3>
      <p>Analyzing the impact of vector and graph embeddings on retrieval generation of Vision-Language Models on downstream tasks.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/kge-clip" target="_blank" class="btn-github">GitHub</a>
        <a href="https://agam-pandey.gitbook.io/knowledge-graph-embedding-or-dsg-iitr/" class="btn-details">Details</a>
      </div>
    </div>

  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/diffusion-everything/banner.png" alt="Diffusion-Everything">
    <div class="project-card-content">
      <h3>Diffusion Everything</h3>
      <p>Comprehensive resource and visualizations of diffusion models: Training, inference, VAE and latent diffusion models with live demos.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/diffusion-everything" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/diffusion-everything/" class="btn-details">Details</a>   
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/segmedit-new.png" alt="segment-then-edit">
    <div class="project-card-content">
      <h3>Segment-then-Edit</h3>
      <p>Segment parts of an image and then perform targeted inpainting or high-fidelity generative editing on specific objects.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/segmedit" target="_blank" class="btn-github">GitHub</a>  
        <a href="{{ site.baseurl }}/projects/segment-then-edit/" class="btn-details">Details</a>      
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/research/ImageAlchemy.png" alt="ImageAlchemy">
    <div class="project-card-content">
      <h3>Image-Alchemy</h3>
      <p>Two-stage personalization pipeline for customized image generation using LoRA-based attention fine-tuning and guided Img2Img synthesis.</p>
      <div class="project-links">
        <a href="https://github.com/kaustubh202/image-alchemy" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/image_alchemy/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/projects/feedcode.png" alt="FeedCode">
    <div class="project-card-content">
      <h3>FeedCode</h3>
      <p>Intelligent LLM feedback tool that provides personalized code reviews based on your coding style and GitHub activity.</p>
      <div class="project-links">
        <a href="https://github.com/AbhishekPanwarr/feedCode" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/visual_ml/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/adversarial_example.gif" alt="Adversarial Lab">
    <div class="project-card-content">
      <h3>Adversarial Lab</h3>
      <p>Web-based tool for visualization and generation of adversarial examples by attacking ImageNet models like VGG, AlexNet, and ResNet.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/adversarial_lab" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/adversarial_lab/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/Eye_In_The_Sky.svg" alt="Eye in the Sky">
    <div class="project-card-content">
      <h3>Eye in the Sky</h3>
      <p>Winning solution for Inter IIT Tech Meet 2018 satellite image segmentation challenge. Semantic segmentation of remote sensing data.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/eye_in_the_sky" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/eye_in_the_sky/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/generative.jpg" alt="Fortnite AI">
    <div class="project-card-content">
      <h3>Fortnite AI Agent</h3>
      <p>AI agent capable of playing Fortnite using DreamerV3 reinforcement learning with real-time screen capture and input simulation.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/FORT-N-AI" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/fort-n-ai/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/graph_nets.svg" alt="Graph Nets">
    <div class="project-card-content">
      <h3>Graph Representation Learning</h3>
      <p>Simplified yet exhaustive implementation and explanation of various graph representation learning techniques (DeepWalk, GCN, GraphSAGE, GAT).</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/graph_nets" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/graph_nets/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/neural_style.gif" alt="Neural Style Transfer">
    <div class="project-card-content">
      <h3>Neural Style Transfer</h3>
      <p>Keras implementation of neural style transfer that generates images with content from one image and style from another using deep learning.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/neural_style_transfer" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/neural_style/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/np_detection.gif" alt="Number Plate Detection">
    <div class="project-card-content">
      <h3>Number Plate Detection</h3>
      <p>System for detecting and recognizing vehicle number plates using YOLO object detection and OCR techniques for security purposes.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/np_detection" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/np_detection/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/rl2048.jpeg" alt="RL 2048">
    <div class="project-card-content">
      <h3>Reinforcement Learning 2048</h3>
      <p>Implementation of Deep Q-Network using Double Q-Learning to autonomously play the 2048 game and learn optimal strategies.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/RL2048" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/rl2048/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/generative.jpg" alt="Sarcasm Detection">
    <div class="project-card-content">
      <h3>Sarcasm Detection using BERT</h3>
      <p>NLP project exploring contextual sarcasm detection using BERT and LSTM models on news headlines dataset for sentiment understanding.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/sarcasm-detection" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/sarcasm_detection/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/Traffic_sign.jpg" alt="Traffic Sign Classification">
    <div class="project-card-content">
      <h3>Traffic Sign Classification</h3>
      <p>Beginner-friendly computer vision project recognizing 43 different traffic signs from the GTSRB dataset for autonomous vehicle applications.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/traffic_sign_classification" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/traffic_sign_classification/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

  <div class="project-card">
    <img src="{{ site.baseurl }}/assets/images/visualizing_loss.jpg" alt="Visualizing Loss">
    <div class="project-card-content">
      <h3>Visualizing Loss Functions</h3>
      <p>Visualization of different loss and optimization functions using Autoencoders on MNIST to understand their impact on training.</p>
      <div class="project-links">
        <a href="https://github.com/dsgiitr/visualizing_loss" target="_blank" class="btn-github">GitHub</a>
        <a href="{{ site.baseurl }}/projects/visualizing_loss/" class="btn-details">Details</a>
      </div>
    </div>
  </div>

</div>
