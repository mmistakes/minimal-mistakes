---
title: "Blogs"
permalink: /blogs/
layout: splash
---

<!-- Include custom CSS -->
<style>
  /* Main page styling */
  .blogs-page {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
    padding: 40px 20px;
  }

  /* Title and intro text */
  .blogs-title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
  }

  .intro-text {
    font-size: 18px;
    color: #555;
    text-align: center;
    margin-bottom: 40px;
    line-height: 1.6;
  }

  /* Blog Grid styling */
  .blog-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
    margin-top: 40px;
  }

  /* Blog Card styling */
  .blog-card {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    width: 22%; /* Adjust width to make them fill the space */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .blog-card:hover {
    transform: translateY(-10px);
  }

  .blog-card h3 {
    font-size: 22px;
    color: #333;
    font-weight: bold;
    margin: 0;
  }

  .blog-card h3 a {
    text-decoration: none;
    color: #333;
  }

  .blog-card h3 a:hover {
    color: #0073e6;
  }

  .excerpt {
    font-size: 16px;
    color: #777;
    line-height: 1.5;
    margin-top: 10px;
    flex-grow: 1;
  }

  /* Categories section */
  .categories {
    text-align: center;
    margin-top: 60px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .categories ul {
    display: flex;
    justify-content: center;
    gap: 20px;
    list-style: none;
    padding: 0;
  }

  .categories li {
    padding: 8px 15px;
    background-color: #f1f1f1;
    border-radius: 20px;
    transition: background-color 0.3s ease;
  }

  .categories li:hover {
    background-color: #0073e6;
    color: white;
  }

  /* Contribute section */
  .contribute {
    text-align: center;
    margin-top: 60px;
    font-size: 18px;
    font-weight: bold;
    color: #555;
  }

  .contribute a {
    color: #0073e6;
    text-decoration: none;
  }

  .contribute a:hover {
    text-decoration: underline;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .blog-card {
      width: 48%;
    }
  }

  @media (max-width: 480px) {
    .blog-card {
      width: 100%;
    }

    .blogs-title {
      font-size: 28px;
    }

    .intro-text {
      font-size: 16px;
    }
  }
</style>

<!-- Page Content -->
<div class="blogs-page">
  <h1 class="blogs-title">Welcome to the Data Science Group Blogs</h1>

  <p class="intro-text">Here, you will find articles, tutorials, and insights on various topics related to Data Science, Machine Learning, Artificial Intelligence, Deep Learning, and much more. Stay tuned for updates and insightful posts from our talented team!</p>
  
  <div class="blog-grid">
    <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/_blogs/babysteps_tf1.md">Baby steps with Tensorflow #1</a></h3>
      <p class="excerpt">A beginner's guide to understanding TensorFlow and its application in deep learning.</p>
    </div>

   <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/_blogs/babysteps_tf2.md">Baby steps with Tensorflow #2</a></h3>
      <p class="excerpt">Continuing the exploration of TensorFlow, we dive deeper into its functionalities and practical applications.</p>
    </div>

  <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/_blogs/boosting.md">Boosting</a></h3>
      <p class="excerpt">An introduction to boosting algorithms and how they improve model performance.</p>
    </div>

  <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/_blogs/chebnet.md">ChebNet: CNN on Graphs with Fast Localized Spectral Filtering</a></h3>
      <p class="excerpt">Exploring ChebNet, a new approach to graph neural networks using fast localized spectral filtering.</p>
    </div>
    <div class="blog-card">
      <h3><a href="{{ site.baseurl }}/_blogs/clustering.md">Clustering Described</a></h3>
      <p class="excerpt">Learn about clustering techniques and how they're used to group similar data points in machine learning.</p>
    </div>
    <div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/cnn_with_tf.md">Convolutional Neural Network with TensorFlow Implementation</a></h3>
  <p class="excerpt">Dive into the world of CNNs and discover how TensorFlow simplifies the implementation of deep learning models.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/data_science_congress.md">Data Science Congress. Something legendary.</a></h3>
  <p class="excerpt">Get the highlights from the most anticipated Data Science Congress. The future of AI is here, and it's legendary.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/decision_trees.md">Decision Trees. Decoded.</a></h3>
  <p class="excerpt">From theory to practice—unlock the secrets behind Decision Trees and how they power many machine learning algorithms.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/deepwalk.md">Understanding Deepwalk</a></h3>
  <p class="excerpt">Step into the realm of graph-based machine learning and see how DeepWalk revolutionizes the way we understand relationships in data.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/gat.md">Understanding Graph Attention Networks (GAT)</a></h3>
  <p class="excerpt">Explore the world of Graph Attention Networks, where attention mechanisms meet graph theory to create smarter, more accurate models.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/gcn.md">A Review : Graph Convolutional Networks (GCN)</a></h3>
  <p class="excerpt">Uncover the power of Graph Convolutional Networks and their ability to learn from complex, structured data like never before.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/godnet.md">GodNet: A Neural Network Which Can Predict Your Future?</a></h3>
  <p class="excerpt">Is this the next breakthrough or just a glimpse into AI’s potential to predict the unpredictable? GodNet—more than just hype.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/graph_sage.md">Graph SAGE(SAmple and aggreGatE) : Inductive Learning on Graphs</a></h3>
  <p class="excerpt">Discover how Graph SAGE is transforming inductive learning and enabling scalable, dynamic learning on graphs.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/hugo.md">How To Setup Timer Hugo</a></h3>
  <p class="excerpt">Struggling with your Hugo setup? Get the step-by-step guide for setting up Timer Hugo for a smoother experience.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/logistic.md">Logistic Regression. Simplified.</a></h3>
  <p class="excerpt">Logistic Regression doesn’t have to be intimidating. Get a simple, clear breakdown of this powerful algorithm.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/loss_function_optimization.md">Loss Functions and Optimization Algorithms. Demystified.</a></h3>
  <p class="excerpt">Ever wondered why loss functions matter? Unravel the mystery behind them and learn how optimization drives machine learning models.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/placement_experience.md">Placement Experience</a></h3>
  <p class="excerpt">Curious about what it takes to crack data science placements? Here's a first-hand experience that reveals all the secrets!</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/regularization.md">Regularization. Clarified.</a></h3>
  <p class="excerpt">Worried about overfitting? Learn how regularization techniques are the unsung heroes that make your models generalize better.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/roadmap.md">Roadmap To Data Science</a></h3>
  <p class="excerpt">From novice to expert—this roadmap will guide you through the essentials of Data Science. Start your journey now!</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/style_transfer_cnn.md">Artistic Style Transfer with Convolutional Neural Network</a></h3>
  <p class="excerpt">Ever wanted to turn your photos into art? Learn how to use CNNs for artistic style transfer and create masterpieces with AI.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/svd.md">Singular Value Decomposition. Elucidated.</a></h3>
  <p class="excerpt">SVD might sound intimidating, but it’s actually one of the most useful techniques in data science. Let’s break it down and make it crystal clear.</p>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/word_embedding.md">Word Embedding</a></h3>
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
