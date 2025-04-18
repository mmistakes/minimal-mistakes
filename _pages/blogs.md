---
title: "Blogs"
permalink: /blogs/
layout: posts
---

<style>
/* General Layout for the Blogs Page */
.blog-posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Auto-columns with minimum size */
  gap: 20px;
  padding: 20px;
}

/* Blog Post Container Styles */
.blog-post-container {
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out; /* Smooth hover effect */
}

.blog-post-container:hover {
  transform: translateY(-5px); /* Lift up effect on hover */
}

/* Blog Title Style */
.blog-post-container h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
}

/* Blog Excerpt Style */
.blog-post-container p.excerpt {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

/* Style for the "Read More" Link */
.read-more {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.read-more:hover {
  text-decoration: underline;
  color: #0056b3;
}

/* Style for upcoming blogs or empty containers (Coming Soon Posts) */
.blog-post-container#empty-blog-1,
.blog-post-container#empty-blog-2 {
  background-color: #f0f8ff; /* Light blue for “Coming Soon” posts */
  border: 2px dashed #007bff; /* Dashed border to highlight upcoming posts */
  color: #007bff;
}

.blog-post-container#empty-blog-1 h2,
.blog-post-container#empty-blog-2 h2 {
  font-style: italic;
  color: #007bff;
}

.blog-post-container#empty-blog-1 p,
.blog-post-container#empty-blog-2 p {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Adjust "Coming Soon" read more link style */
.read-more.coming-soon {
  color: #FF4500; /* A different color to highlight "coming soon" */
  font-weight: bold;
}

.read-more.coming-soon:hover {
  color: #FF6347; /* Change on hover for better visibility */
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-posts {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Smaller columns for smaller screens */
  }
}

@media (max-width: 480px) {
  .blog-posts {
    grid-template-columns: 1fr; /* Stack posts vertically on very small screens */
  }
}
</style>

<div class="blog-posts">
  <!-- Published Blog 1 -->
  <div class="blog-post-container" id="blog-1">
    <h2>Blog Title 1</h2>
    <p class="excerpt">Blog excerpt will appear here...</p>
    <p><a href="/blogs/blog-title-1/" class="read-more">Read More</a></p>
  </div>

  <!-- Published Blog 2 -->
  <div class="blog-post-container" id="blog-2">
    <h2>Blog Title 2</h2>
    <p class="excerpt">Another excerpt goes here...</p>
    <p><a href="/blogs/blog-title-2/" class="read-more">Read More</a></p>
  </div>

  <!-- Empty Blog 1 (Upcoming Blog Post) -->
  <div class="blog-post-container" id="empty-blog-1">
    <h2>Upcoming Blog Post</h2>
    <p class="excerpt">This blog post will be populated soon.</p>
    <p><a href="#" class="read-more coming-soon">Coming Soon</a></p>
  </div>

  <!-- Empty Blog 2 (Upcoming Blog Post) -->
  <div class="blog-post-container" id="empty-blog-2">
    <h2>Another Upcoming Blog</h2>
    <p class="excerpt">Stay tuned for more content!</p>
    <p><a href="#" class="read-more coming-soon">Coming Soon</a></p>
  </div>
</div>
