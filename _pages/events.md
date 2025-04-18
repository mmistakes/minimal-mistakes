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
  /* height: 300px;  Keeps card size uniform */
}

  /* Exclusive DSG Events Section - 3 items per row */
.specific-event-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Force 3 items per row */
  gap: 30px;
  margin-top: 2rem;
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



<!-- External Hackathons Section -->
<h2 style="margin-top: 2rem; color: #007acc;">External Hackathons</h2>
<div class="event-grid">
  <!-- Add external hackathon cards here -->
    <!-- Event 1: Competitions and Hackathon -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/hackathons.png" alt="Competitions and Hackathons">
    <h3>Competitions and Hackathon</h3>
    <p>Annual hackathons and tech competitions held at IITR, offering a platform for students to innovate and collaborate.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/C1chUrJP6-P/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank">Details</a>
    </div>
  </div>

  <!-- Event 2: Inter IIT Tech Meet 11, 12, 13 -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/interiit.png" alt="Inter IIT Tech Meet">
    <h3>Inter IIT Tech Meet 11, 12, 13</h3>
    <p>Inter IIT Technical Meets bringing together the brightest minds from IITs to collaborate on technology projects.</p>
    <div class="event-links">
      <a href="https://example-link.com" target="_blank">Details</a>
    </div>
  </div>
  
</div>




<!-- Exclusive DSG Events Section -->
<h2 style="margin-top: 2rem; color: #007acc;">Exclusive DSG Events</h2>
<div class="specific-event-grid">
  
  <!-- Event 3: BYOP (Bring Your Own Project) -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/BYOP.png" alt="BYOP">
    <h3>Bring Your Own Project</h3>
    <p>A unique event where participants bring their own tech projects for a chance to showcase, build and get feedback from DSG members to have a chance at getting recruited into DSG.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/DBEfOXDSesx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank">Details</a>

  </div>
  </div>

    <!-- Event 4: BH (Beginners' Hypothesis) -->

  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/BH.png" alt="BYOP">
    <h3>Beginner's Hypothesis</h3>
    <p>A Kaggle based challenge where participants wrack their brains to climb up the leaderboard in order to secure direct interviews for DSG recruitments.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/DEiMi1ThHQW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank">Details</a>

  </div>
  </div>

  <!-- Event 5: Blogathon -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/Blogathon.png" alt="Blogathon">
    <h3>Blogathon</h3>
    <p>Participants write fascinating blogs on a variety of tech topics with a chance to secure direct interviews for DSG recruitments.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/DE8_DhvPy6h/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank">Details</a>

  </div>
  </div>

  <!-- Event 6: workshop25 1 -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/workshop1.png" alt="workshop1">
    <h3>Workshop: How To Build Your 1st ML Project</h3>
    <p>To turn freshers' nervous energy into confidence, DSG members shared how to start building their , the challenges they faced, and how you can do it too.Participants write fascinating blogs on a variety of tech topics with a chance to secure direct interviews for DSG recruitments.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/DE8_DhvPy6h/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank">Details</a>

  </div>
  </div>

  <!-- Event 7: workshop25 2 -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/workshop2.png" alt="workshop2">
    <h3>Workshop: ML Optimisation for Beginners</h3>
    <p>An engaging session where attendees explored the essentials of machine learning optimization, its key techniques, algorithms, and real-world applications guided by DSG members with hands-on exercises to help grasp these concepts practically</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/DBK9PpRvLrw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank">Details</a>

  </div>
  </div>

  <!-- Event 8: workshop25 3-->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/workshop3.png" alt="workshop3">
    <h3>Workshop: Brainwaves to Bytes</h3>
    <p>To build an AI from scratch, we helped build fully functional neural network from scratch using Python—and hit 95% accuracy on predicting handwritten digits in order to lower the entry barrier into this unique field.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/DBawa3MP3o2/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">Details</a>

  </div>
  </div>

</div>

<!-- Industry Collaborations Section -->
<h2 style="margin-top: 2rem; color: #007acc;">Industry Collaborations</h2>
<div class="event-grid">
  <!-- Add industry collaboration event cards here -->
    <!-- Event 6: WWT Talk (Workshop Talk) -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/wwt-talk.jpg" alt="WWT Talk">
    <h3>WWT Talk</h3>
    <p>Workshops and talks conducted by industry experts, aimed at sharing knowledge on the latest trends in technology.</p>
    <div class="event-links">
      <a href="https://www.linkedin.com/posts/dsg-iitr_we-are-delighted-to-share-that-the-data-science-activity-7228720941470470144-qL41?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEw1IwABLy-Q1qawlBnaKH-pRr6c3hPiuno" target="_blank">Details</a>
    </div>
  </div>
</div>

<!-- Internal IITR Events Section -->
<h2 style="margin-top: 2rem; color: #007acc;">Internal IITR Collaborations</h2>
<div class="event-grid">
  <!-- Add intra IITR event cards here -->
    <!-- Event 6: Techshila 2024 Workshop on Adversarial Attacks on LLMs -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/techshila.png" alt="Techshila 2024 Workshop">
    <h3>Techshila 2024 Workshop on Adversarial Attacks on LLMs</h3>
    <p>A workshop on understanding and mitigating adversarial attacks in Large Language Models (LLMs), featuring hands-on sessions.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/C5uubbOP_F3/?utm_source=ig_web_copy_link" target="_blank">Details</a>

  </div>
  </div>

  <!-- Event 7: Srishti 2025 Workshops -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/srishti.png" alt="Srishti 2025 Workshops">
    <h3>Srishti 2025 Workshops</h3>
    <p>Workshops conducted as part of Srishti 2025, focusing on innovative tech behind GANs and design thinking for students across disciplines.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/DIbpC1FoM5Y/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank">Details</a>

  </div>
  </div>

  <!-- Event 8: RMS DSG 2025 Workshops -->
  <div class="event-card">
    <img src="{{ site.baseurl }}/assets/images/events/rmsxdsg.png" alt="DSG x RMS Workshop">
    <h3>DSG x RMS Autonomous 2025 Workshop</h3>
    <p>An exclusive workshop in collaboration with RMS, where we unraveled the process of fabricating an autonomous vehicle and how to drive innovation in the driverless technology arena.</p>
    <div class="event-links">
      <a href="https://www.instagram.com/p/DGECAXLtvle/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank">Details</a>

  </div>
  </div>

</div>


