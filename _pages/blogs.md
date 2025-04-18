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
    width: 30%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    padding: 20px;
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
  <div class="blogs-header"></div>

  <h1 class="blogs-title">Welcome to the Data Science Group Blogs</h1>

  <p class="intro-text">Here, you will find articles, tutorials, and insights on various topics related to Data Science, Machine Learning, Artificial Intelligence, Deep Learning, and much more. Stay tuned for updates and insightful posts from our talented team!</p>
  
  <div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/babysteps_tf1.md">Baby steps with Tensorflow #1</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/babysteps_tf2.md">Baby steps with Tensorflow #2</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/boosting.md">Boosting</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/chebnet.md">ChebNet: CNN on Graphs with Fast Localized Spectral Filtering</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/clustering.md">Clustering Described</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/cnn_with_tf.md">Convolutional Neural Network with TensorFlow Implementation</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/data_science_congress.md">Data Science Congress. Something legendary.</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/decision_trees.md">Decision Trees. Decoded.</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/deepwalk.md">Understanding Deepwalk</a></h3>
</div>

<div class="blog-card">
  <h3><a href="{{ site.baseurl }}/_blogs/gat.md">Understanding Graph Attention Networks (GAT)</a></h3>
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
