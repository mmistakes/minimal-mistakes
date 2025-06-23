---
title: "Blogs"
permalink: /blogs/
layout: splash
---

<!-- Custom CSS for Blog Page -->

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
    text-align: center; /* Text aligned to the center */
    line-height: 1.6;
  }

  /* Blog Grid styling */
  .blog-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

  .blog-img {
  width: 100%;
  height: 200px; /* Fixed height */
  object-fit: cover; /* This will crop the image to fit the container without stretching */
  margin-bottom: 15px; /* Add space below the image */
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

  .categories h2 {
    margin-bottom: 18px;
  }

  .categories ul {
    display: flex;
    justify-content: center;
    gap: 22px;
    list-style: none;
    padding: 0;
    flex-wrap: wrap;
  }

  .categories li {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 140px;
    min-height: 70px;
    padding: 10px 18px;
    background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    font-size: 1.05rem;
    font-weight: 600;
    color: #222;
    text-align: center;
    transition: background 0.3s, color 0.3s, box-shadow 0.3s;
    margin-bottom: 10px;
    line-height: 1.2;
  }

  .categories li:hover {
    background-color: #0073e6;
    color: #fff;
    box-shadow: 0 4px 16px rgba(0,115,230,0.12);
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
    .categories ul {
      gap: 12px;
    }
    .categories li {
      min-width: 110px;
      min-height: 60px;
      font-size: 0.98rem;
      padding: 8px 10px;
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
      text-align: center;
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
      <p class="excerpt">Is this the next breakthrough or just a glimpse into AI's potential to predict the unpredictable? GodNet—more than just hype.</p>
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
      <p class="excerpt">Logistic Regression doesn't have to be intimidating. Get a simple, clear breakdown of this powerful algorithm.</p>
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
      <p class="excerpt">SVD might sound intimidating, but it's actually one of the most useful techniques in data science. Let's break it down and make it crystal clear.</p>
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
