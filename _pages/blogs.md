---
title: "Blogs"
permalink: /blogs/
layout: splash
---

<!-- Custom CSS for Blog Page -->
<style>
  .blogs-page {
    font-family: 'Segoe UI', sans-serif;
    background-color: #f9f9f9;
    padding: 60px 20px;
  }

  .blogs-title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
    color: #222;
    font-weight: 700;
  }

  .intro-text {
    font-size: 18px;
    color: #555;
    text-align: center;
    margin: 0 auto 50px;
    max-width: 750px;
    line-height: 1.7;
  }

  .blog-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  }

  .blog-card {
    background-color: #fff;
    border-radius: 12px;
    width: 270px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .blog-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .blog-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
    background-color: #e0e0e0;
  }

  .blog-card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .blog-card h3 {
    font-size: 20px;
    margin: 0 0 10px;
    color: #222;
  }

  .blog-card h3 a {
    color: inherit;
    text-decoration: none;
  }

  .blog-card h3 a:hover {
    color: #0073e6;
  }

  .excerpt {
    font-size: 15px;
    color: #666;
    line-height: 1.5;
    flex-grow: 1;
  }

  @media (max-width: 768px) {
    .blog-grid {
      justify-content: center;
    }

    .blog-card {
      width: 90%;
      max-width: 400px;
    }
  }
</style>
<!-- Page Content -->

<!-- Page Content -->
<div class="blogs-page">
  <h1 class="blogs-title">Welcome to the Data Science Group Blogs</h1>

  <p class="intro-text">
    Dive into blogs and insights spanning Machine Learning, AI, Deep Learning, and Data Science.
    From beginner-friendly guides to deep technical explorations, discover content curated by the DSG. Stay tuned for updates and insightful posts from our talented team!
  </p>

  
  <div class="blog-grid">
    <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/blogs/babysteps_tf1">Baby steps with Tensorflow #1</a></h3>
      <p class="excerpt">A beginner's guide to understanding TensorFlow and its application in deep learning.</p>
    </div>

   <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/blogs/babysteps_tf2">Baby steps with Tensorflow #2</a></h3>
      <p class="excerpt">Continuing the exploration of TensorFlow, we dive deeper into its functionalities and practical applications.</p>
    </div>

  <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/blogs/boosting">Boosting</a></h3>
      <p class="excerpt">An introduction to boosting algorithms and how they improve model performance.</p>
    </div>

  <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/blogs/chebnet">ChebNet: CNN on Graphs with Fast Localized Spectral Filtering</a></h3>
      <p class="excerpt">Exploring ChebNet, a new approach to graph neural networks using fast localized spectral filtering.</p>
    </div>
    <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/blogs/clustering">Clustering Described</a></h3>
      <p class="excerpt">Learn about clustering techniques and how they're used to group similar data points in machine learning.</p>
    </div>
    <div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/cnn_with_tf">Convolutional Neural Network with TensorFlow Implementation</a></h3>
  <p class="excerpt">Dive into the world of CNNs and discover how TensorFlow simplifies the implementation of deep learning models.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/data_science_congress">Data Science Congress. Something legendary.</a></h3>
  <p class="excerpt">Get the highlights from the most anticipated Data Science Congress. The future of AI is here, and it's legendary.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/decision_trees">Decision Trees. Decoded.</a></h3>
  <p class="excerpt">From theory to practice—unlock the secrets behind Decision Trees and how they power many machine learning algorithms.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/deepwalk">Understanding Deepwalk</a></h3>
  <p class="excerpt">Step into the realm of graph-based machine learning and see how DeepWalk revolutionizes the way we understand relationships in data.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/gat">Understanding Graph Attention Networks (GAT)</a></h3>
  <p class="excerpt">Explore the world of Graph Attention Networks, where attention mechanisms meet graph theory to create smarter, more accurate models.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/gcn">A Review : Graph Convolutional Networks (GCN)</a></h3>
  <p class="excerpt">Uncover the power of Graph Convolutional Networks and their ability to learn from complex, structured data like never before.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/godnet">GodNet: A Neural Network Which Can Predict Your Future?</a></h3>
  <p class="excerpt">Is this the next breakthrough or just a glimpse into AI’s potential to predict the unpredictable? GodNet—more than just hype.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/graph_sage">Graph SAGE(SAmple and aggreGatE) : Inductive Learning on Graphs</a></h3>
  <p class="excerpt">Discover how Graph SAGE is transforming inductive learning and enabling scalable, dynamic learning on graphs.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/hugo">How To Setup Timer Hugo</a></h3>
  <p class="excerpt">Struggling with your Hugo setup? Get the step-by-step guide for setting up Timer Hugo for a smoother experience.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/logistic">Logistic Regression. Simplified.</a></h3>
  <p class="excerpt">Logistic Regression doesn’t have to be intimidating. Get a simple, clear breakdown of this powerful algorithm.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/loss_function_optimization">Loss Functions and Optimization Algorithms. Demystified.</a></h3>
  <p class="excerpt">Ever wondered why loss functions matter? Unravel the mystery behind them and learn how optimization drives machine learning models.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/placement_experience">Placement Experience</a></h3>
  <p class="excerpt">Curious about what it takes to crack data science placements? Here's a first-hand experience that reveals all the secrets!</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/regularization">Regularization. Clarified.</a></h3>
  <p class="excerpt">Worried about overfitting? Learn how regularization techniques are the unsung heroes that make your models generalize better.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/roadmap">Roadmap To Data Science</a></h3>
  <p class="excerpt">From novice to expert—this roadmap will guide you through the essentials of Data Science. Start your journey now!</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/style_transfer_cnn">Artistic Style Transfer with Convolutional Neural Network</a></h3>
  <p class="excerpt">Ever wanted to turn your photos into art? Learn how to use CNNs for artistic style transfer and create masterpieces with AI.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/svd">Singular Value Decomposition. Elucidated.</a></h3>
  <p class="excerpt">SVD might sound intimidating, but it’s actually one of the most useful techniques in data science. Let’s break it down and make it crystal clear.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/blogs/word_embedding">Word Embedding</a></h3>
  <p class="excerpt">Words are more than just words—discover how word embeddings turn text into numerical representations for smarter machine learning models.</p>
</div>

  </div>

  <div class="categories">
    <h2>Categories</h2>
    <ul>
      <li>Machine Learning</li>
      <li>Deep Learning</li>
      <li>Natural Language Processing</li>
      <li>Reinforcement Learning</li>
      <li>Data Preprocessing</li>
      <li>Computer Vision</li>
      <li>Time Series Analysis</li>
      <li>AI in Industry</li>
    </ul>
  </div>

  <div class="contribute">
    <p>If you're a Data Science enthusiast and want to contribute your knowledge and ideas, feel free to get in touch! We are always looking for new authors who can share their insights and experiences in the world of Data Science and AI.</p>
    <p><a href="{{ site.baseurl }}/contact">Contact Us</a> to contribute!</p>
  </div>
</div>
