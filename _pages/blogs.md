---
title: "Blogs"
permalink: /blogs/
layout: posts
---

.blog-post-container {
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.blog-post-container h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.blog-post-container p.excerpt {
  font-size: 1.1rem;
  color: #666;
}

.read-more {
  text-decoration: none;
  color: #007bff;
}

.read-more:hover {
  text-decoration: underline;
}

/* Style for upcoming blogs or empty containers */
.blog-post-container#empty-blog-1,
.blog-post-container#empty-blog-2 {
  background-color: #f0f8ff; /* Light blue for "Coming Soon" posts */
  border: 2px dashed #007bff; /* Dashed border to highlight upcoming posts */
  color: #007bff;
}

.blog-post-container#empty-blog-1 h2,
.blog-post-container#empty-blog-2 h2 {
  font-style: italic;
}

.blog-post-container#empty-blog-1 p,
.blog-post-container#empty-blog-2 p {
  font-size: 1.2rem;
  font-weight: bold;
}

.read-more {
  color: #007bff;
}

.read-more:hover {
  color: #0056b3;
}


  
<div class="blog-posts">
  <!-- Container for Blog 1 -->
  <div class="blog-post-container" id="blog-1">
    <h2>Blog Title 1</h2>
    <p class="excerpt">Blog excerpt will appear here...</p>
    <p><a href="#" class="read-more">Read More</a></p>
  </div>

  <!-- Container for Blog 2 -->
  <div class="blog-post-container" id="blog-2">
    <h2>Blog Title 2</h2>
    <p class="excerpt">Another excerpt goes here...</p>
    <p><a href="#" class="read-more">Read More</a></p>
  </div>

  <!-- Empty Container for Future Blog Post 1 -->
  <div class="blog-post-container" id="empty-blog-1">
    <h2>Upcoming Blog Post</h2>
    <p class="excerpt">This blog post will be populated soon.</p>
    <p><a href="#" class="read-more">Coming Soon</a></p>
  </div>

  <!-- Empty Container for Future Blog Post 2 -->
  <div class="blog-post-container" id="empty-blog-2">
    <h2>Another Upcoming Blog</h2>
    <p class="excerpt">Stay tuned for more content!</p>
    <p><a href="#" class="read-more">Coming Soon</a></p>
  </div>
</div>
