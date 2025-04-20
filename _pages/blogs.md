---
title: "Blogs"
permalink: /blogs/
layout: splash
---
<style>
  /* Main page styling */
  .blogs-page {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
    padding: 40px 20px;
    display: flex;
    justify-content: space-between;
  }

  /* Title and intro text */
  .blogs-title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
    width: 100%;
  }

  .intro-text {
    font-size: 18px;
    color: #555;
    text-align: center;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  /* Sidebar Styling */
  .sidebar {
    width: 25%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
  }

  .sidebar h4 {
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
  }

  .sidebar ul li a {
    text-decoration: none;
    color: #333;
  }

  .sidebar ul li a:hover {
    color: #0073e6;
  }

  /* Blog List container */
  .blog-list {
    width: 70%; /* Take up the remaining space */
  }

  /* Blog Item Styling */
  .blog-item {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  .blog-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  /* Image styling */
  .blog-img {
    width: 150px; /* Small image size */
    height: 100px; /* Fixed height */
    object-fit: cover;
    margin-right: 20px;
    border-radius: 8px;
  }

  /* Title Styling */
  .blog-item h3 {
    font-size: 22px;
    color: #333;
    font-weight: bold;
    margin: 0;
  }

  .blog-item h3 a {
    text-decoration: none;
    color: #333;
  }

  .blog-item h3 a:hover {
    color: #0073e6;
  }

  /* Excerpt Styling */
  .excerpt {
    font-size: 16px;
    color: #777;
    line-height: 1.5;
    margin-top: 10px;
    flex-grow: 1;
  }

  /* Categories Section */
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

  /* Contribute Section */
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

  /* Responsive Design: Two blogs per row */
  .blog-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  .blog-item {
    width: 48%; /* Two items per row */
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .sidebar {
      width: 25%;
    }

    .blog-item {
      width: 100%; /* Stack the blogs vertically on smaller screens */
    }
  }

  @media (max-width: 480px) {
    .blogs-title {
      font-size: 28px;
    }

    .intro-text {
      font-size: 16px;
      text-align: center;
    }

    .sidebar {
      width: 100%; /* Sidebar takes full width on small screens */
      margin-top: 30px;
    }
  }
</style>
<!-- Page Content -->

<!-- Page Content -->
<div class="blogs-page">
  <h1 class="blogs-title">Welcome to the Data Science Group Blogs</h1>

  <p style="text-align:center;">
    Dive into blogs and insights spanning Machine Learning, AI, Deep Learning, and Data Science.
    From beginner-friendly guides to deep technical explorations, discover content curated by the DSG. Stay tuned for updates and insightful posts from our talented team!
  </p>

  <div class="blog-grid">
    <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/babysteps_with_tf/babysteps_tf1.jpg" alt="Baby steps with Tensorflow #1" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/babysteps_tf1">Baby steps with Tensorflow #1</a></h3>
      <p class="excerpt">A beginner's guide to understanding TensorFlow and its application in deep learning.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/babysteps_with_tf/babysteps_tf12.png" alt="Baby steps with Tensorflow #2" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/babysteps_tf2">Baby steps with Tensorflow #2</a></h3>
      <p class="excerpt">Continuing the exploration of TensorFlow, we dive deeper into its functionalities and practical applications.</p>
    </div>

  <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/boosting/boosting_blog.png" alt="Boosting" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/boosting">Boosting Decrypted</a></h3>
      <p class="excerpt">An introduction to boosting algorithms and how they improve model performance.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/Chebnet.jpg" alt="ChebNet" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/chebnet">ChebNet: CNN on Graphs with Fast Localized Spectral Filtering</a></h3>
      <p class="excerpt">Exploring ChebNet, a new approach to graph neural networks using fast localized spectral filtering.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/clustering/clustering_blog.png" alt="Clustering" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/clustering">Clustering Described</a></h3>
      <p class="excerpt">Learn about clustering techniques and how they're used to group similar data points in machine learning.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/cnn_with_tf/cnn_with_tf1.jpg" alt="Convolutional Neural Network with TensorFlow Implementation" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/cnn_with_tf">Convolutional Neural Network with TensorFlow Implementation</a></h3>
      <p class="excerpt">Dive into the world of CNNs and discover how TensorFlow simplifies the implementation of deep learning models.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/data_science_congress_blog.png" alt="Data Science Congress" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/data_science_congress">Data Science Congress. Something legendary.</a></h3>
      <p class="excerpt">Get the highlights from the most anticipated Data Science Congress. The future of AI is here, and it's legendary.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/dt/dt_blog.jpg" alt="Decision Trees Decoded" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/decision_trees">Decision Trees. Decoded.</a></h3>
      <p class="excerpt">From theory to practice—unlock the secrets behind Decision Trees and how they power many machine learning algorithms.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/deepwalk/deepwalk_blog.png" alt="Understanding Deepwalk" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/deepwalk">Understanding Deepwalk</a></h3>
      <p class="excerpt">Step into the realm of graph-based machine learning and see how DeepWalk revolutionizes the way we understand relationships in data.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/gat/gat_blog.jpg" alt="Understanding GAT" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/gat">Understanding Graph Attention Networks (GAT)</a></h3>
      <p class="excerpt">Explore the world of Graph Attention Networks, where attention mechanisms meet graph theory to create smarter, more accurate models.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/gcn/gcn_blog.png" alt="Graph Convolutional Networks (GCN)" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/gcn">A Review: Graph Convolutional Networks (GCN)</a></h3>
      <p class="excerpt">Uncover the power of Graph Convolutional Networks and their ability to learn from complex, structured data like never before.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/godnet/godnet_blog.jpg" alt="GodNet: Neural Network to Predict the Future" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/godnet">GodNet: A Neural Network Which Can Predict Your Future?</a></h3>
      <p class="excerpt">Is this the next breakthrough or just a glimpse into AI’s potential to predict the unpredictable? GodNet—more than just hype.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/graph_sage/graph_sage_blog.jpg" alt="Graph SAGE" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/graph_sage">Graph SAGE (SAmple and aggreGatE) : Inductive Learning on Graphs</a></h3>
      <p class="excerpt">Discover how Graph SAGE is transforming inductive learning and enabling scalable, dynamic learning on graphs.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/hugo/hugo_blog.svg" alt="How To Setup Timer Hugo" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/hugo">How To Setup Timer Hugo</a></h3>
      <p class="excerpt">Struggling with your Hugo setup? Get the step-by-step guide for setting up Timer Hugo for a smoother experience.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/logistic/logistic_blog.jpg" alt="Logistic Regression Simplified" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/logistic">Logistic Regression. Simplified.</a></h3>
      <p class="excerpt">Logistic Regression doesn’t have to be intimidating. Get a simple, clear breakdown of this powerful algorithm.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/loss_function_optimization/loss_function_optimization1.jpg" alt="Loss Functions and Optimization" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/loss_function_optimization">Loss Functions and Optimization Algorithms. Demystified.</a></h3>
      <p class="excerpt">Ever wondered why loss functions matter? Unravel the mystery behind them and learn how optimization drives machine learning models.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/placement_experience/placement_experience.jpg" alt="Placement Experience" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/placement_experience">Placement Experience</a></h3>
      <p class="excerpt">Curious about what it takes to crack data science placements? Here's a first-hand experience that reveals all the secrets!</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/regularization/regularization_blog.png" alt="Regularization Clarified" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/regularization">Regularization. Clarified.</a></h3>
      <p class="excerpt">Worried about overfitting? Learn how regularization techniques are the unsung heroes that make your models generalize better.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/word_embedding/roadmap.png" alt="Roadmap to Data Science" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/roadmap">Roadmap To Data Science</a></h3>
      <p class="excerpt">From novice to expert—this roadmap will guide you through the essentials of Data Science. Start your journey now!</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/style_with_cnn/style_transfer_with_cnn1.gif" alt="Artistic Style Transfer with CNN" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/style_transfer_cnn">Artistic Style Transfer with Convolutional Neural Network</a></h3>
      <p class="excerpt">Ever wanted to turn your photos into art? Learn how to use CNNs for artistic style transfer and create masterpieces with AI.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/svd/svd_blog.png" alt="Singular Value Decomposition" class="blog-img">
      <h3><a href="{{ site.baseurl }}/blogs/svd">Singular Value Decomposition. Elucidated.</a></h3>
      <p class="excerpt">SVD might sound intimidating, but it’s actually one of the most useful techniques in data science. Let’s break it down and make it crystal clear.</p>
    </div>

   <div class="blog-card">
      <img src="{{ site.baseurl }}/assets/images/blogs/word_embedding/word_embedding9.png" alt="Word Embedding" class="blog-img">
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
