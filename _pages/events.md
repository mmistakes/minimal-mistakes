---
layout: splash
title: "Events"
permalink: /events/
---

<style>
/* General Grid Setup */
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

/* Event Card Container */
.event-card {
  background: #ffffff; /* White background for a clean look */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px; /* Keeps card size uniform */
}

.event-card:hover {
  transform: translateY(-5px); /* Subtle lift on hover */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* Deeper shadow on hover */
}

/* Event Image */
.event-card img {
  width: 100%;
  height: auto;
  max-height: 150px; /* Limited height for images */
  object-fit: cover;
  border-radius: 8px;
  background: #e0e0e0; /* Light grey background for placeholder effect */
  margin-bottom: 20px;
  transition: background 0.3s ease;
}

.event-card img:hover {
  background: #bdbdbd; /* Slightly darker grey when hovered */
}

/* Title Text */
.event-card h3 {
  font-size: 1.25rem;
  color: #333; /* Darker text for visibility */
  margin: 10px 0;
  font-weight: 600; /* Bold title for emphasis */
}

/* Event Description */
.event-card p {
  font-size: 1rem;
  color: #666; /* Soft grey text for description */
  line-height: 1.5;
  margin-bottom: 15px;
}

/* Links Section */
.event-links a {
  display: inline-block;
  margin: 8px 10px 0;
  padding: 8px 16px;
  background: #007acc; /* Matching blue */
  color: white;
  border-radius: 5px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.3s ease;
}

.event-links a:hover {
  background: #005eaa; /* Darker blue for hover effect */
}

/* Placeholder Cards */
.event-card.placeholder {
  background: #f7f7f7; /* Very light background for placeholders */
  border: 2px dashed #007acc; /* Blue dashed border for empty cards */
}

.event-card.placeholder img {
  background: #e6f7ff; /* Light blue background for placeholders */
}

.event-card.placeholder h3 {
  color: #bbb; /* Lighter grey for the title of the placeholder */
}

.event-card.placeholder p {
  color: #bbb; /* Lighter grey for the description of the placeholder */
}
</style>

<!-- Event Grid -->
<div class="event-grid">

  <!-- Event 1: Competitions and Hackathon -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/competitions-hackathon.jpg" alt="Competitions and Hackathons">
    <h3>Competitions and Hackathon</h3>
    <p>Annual hackathons and tech competitions held at IITR, offering a platform for students to innovate and collaborate.</p>
    <div class="event-links">
      <a href="https://example-link.com" target="_blank">Details</a>
      <a href="https://github.com/example-repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Event 2: Inter IIT Tech Meet 11, 12, 13 -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/inter-iit-tech-meet.jpg" alt="Inter IIT Tech Meet">
    <h3>Inter IIT Tech Meet 11, 12, 13</h3>
    <p>Inter IIT Technical Meets bringing together the brightest minds from IITs to collaborate on technology projects.</p>
    <div class="event-links">
      <a href="https://example-link.com" target="_blank">Details</a>
      <a href="https://github.com/example-repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Event 3: BYOP (Bring Your Own Project) -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/byop.jpg" alt="BYOP">
    <h3>BYOP</h3>
    <p>A unique event where participants bring their own tech projects for a chance to showcase and get feedback from experts.</p>
    <div class="event-links">
      <a href="https://example-link.com" target="_blank">Details</a>
      <a href="https://github.com/example-repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Event 4: Blogathon -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/blogathon.jpg" alt="Blogathon">
    <h3>Blogathon</h3>
    <p>Participants write blogs on a variety of tech topics with a chance to win exciting prizes and recognition.</p>
    <div class="event-links">
      <a href="https://example-link.com" target="_blank">Details</a>
      <a href="https://github.com/example-repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Event 5: WWT Talk (Workshop Talk) -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/wwt-talk.jpg" alt="WWT Talk">
    <h3>WWT Talk</h3>
    <p>Workshops and talks conducted by industry experts, aimed at sharing knowledge on the latest trends in technology.</p>
    <div class="event-links">
      <a href="https://example-link.com" target="_blank">Details</a>
      <a href="https://github.com/example-repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Event 6: Techshila 2024 Workshop on Adversarial Attacks on LLMs -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/techshila-2024.jpg" alt="Techshila 2024 Workshop">
    <h3>Techshila 2024 Workshop on Adversarial Attacks on LLMs</h3>
    <p>A workshop on understanding and mitigating adversarial attacks in Large Language Models (LLMs), featuring hands-on sessions.</p>
    <div class="event-links">
      <a href="https://example-link.com" target="_blank">Details</a>
      <a href="https://github.com/example-repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Event 7: Srishti 2025 Workshops -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/srishti-2025.jpg" alt="Srishti 2025 Workshops">
    <h3>Srishti 2025 Workshops</h3>
    <p>Workshops conducted as part of Srishti 2025, focusing on innovative tech and design thinking for students across disciplines.</p>
    <div class="event-links">
      <a href="https://example-link.com" target="_blank">Details</a>
      <a href="https://github.com/example-repo" target="_blank">GitHub</a>
    </div>
  </div>

  <!-- Placeholder Event Cards -->
  <div class="event-card placeholder">
    <img alt="Placeholder">
    <h3>Event Title</h3>
    <p>Event description here</p>
    <div class="event-links">
      <a href="#">Details</a>
      <a href="#">GitHub</a>
    </div>
  </div>

  <div class="event-card placeholder">
    <img alt="Placeholder">
    <h3>Event Title</h3>
    <p>Event description here</p>
    <div class="event-links">
      <a href="#">Details</a>
      <a href="#">GitHub</a>
    </div>
  </div>

</div>
