---
title: "Blue-Green Deployment with Akamai"
layout: home
excerpt: "Zero-Downtime Deployments with Blue-Green Strategy"
tags: ["DevOps", "Kubernetes", "AWS", "CDN", "Blue-Green Deployment", "Zero Downtime"]
---

{% if page.tags %}
<div class="page-tags">
  <strong>Tags:</strong>
  {% for tag in page.tags %}
    <a href="/tags/#{{ tag | slugify }}" class="label label--info">{{ tag }}</a>{% unless forloop.last %} {% endunless %}
  {% endfor %}
</div>
{% endif %}

## Achieving Zero-Downtime Deployments with Blue-Green Strategy and Smart Traffic Routing

---

### Introduction

In modern DevOps practices, minimizing downtime and deployment risk is critical—especially for large-scale, high-traffic web applications. One approach that addresses these challenges is the blue-green deployment strategy. In this post, I’ll walk through how we designed and implemented a robust blue-green deployment workflow on a Kubernetes platform, leveraging cloud-native tools and intelligent traffic routing via CDN and load balancers. This solution enabled seamless feature rollouts, granular testing, and zero-downtime production releases.

---

### The Challenge

Our team managed a major public-facing website where new features needed to be released frequently and safely. Traditional deployment strategies carried risks of downtime or inconsistent user experiences during rollouts. We needed a deployment workflow that would:

* Enable zero-downtime deployments
* Allow safe validation of new features in production-like environments
* Make rollbacks and roll-forwards straightforward
* Support targeted testing for select user groups

---

### Blue-Green Deployment on Kubernetes

Our architecture ran on Amazon Elastic Kubernetes Service (EKS), with traffic entering the system via a cloud CDN and an Application Load Balancer (ALB). We adopted a blue-green deployment model as follows:

* **Blue environment:** The current production deployment serving live user traffic.
* **Green environment:** The new version, deployed in parallel but not receiving production traffic initially.

Both environments were represented as separate Kubernetes Deployments and Services.

---

### Smart Traffic Routing: Cookies, Headers, and Query Strings

A key part of our solution was enabling granular, flexible traffic routing. Here’s how we accomplished this:

#### 1. **Routing via CDN and ALB**

* All external traffic was routed through a CDN (e.g., Akamai, CloudFront) to our Application Load Balancer.
* The ALB supported header-based routing rules, which were used to direct requests to either the blue or green deployment in the EKS cluster.

#### 2. **User and Developer Testing**

* To enable selective testing, we used query string parameters, custom cookies, or request headers.
* For example, appending a parameter like `?ENV_TARGET=green` to the URL, or setting a specific cookie/header, signaled the CDN and ALB to forward the request to the green environment.
* This allowed QA engineers or business users to access the new version without exposing it to all users.

#### 3. **Workflow Example**

* When a user or tester visits `www.example.com?ENV_TARGET=green`, the CDN sets a special header or cookie.
* The load balancer evaluates this metadata and routes the request to the green deployment.
* Similarly, requests without the override continue to route to the blue (current production) deployment.

#### 4. **Configuration Management**

* Routing logic was managed using CDN property manager rules and ALB listener rules.
* Variables were set and matched (e.g., environment overrides) to ensure the right backend was selected, without affecting regular user traffic.

---

### Rollout & Cutover

Once the new deployment was thoroughly tested and validated in the green environment, the final cutover was simple:

* ALB configuration was updated to direct all user traffic to the green deployment, making it the new production (“blue”).
* The previous blue deployment could be retained temporarily for instant rollback if needed.

---

### Results & Impact

Implementing this strategy delivered multiple benefits:

* **Zero-downtime deployments:** Users experienced no interruption during releases.
* **Safe rollbacks:** Instantly reverted to the previous version if issues were detected.
* **Targeted testing:** Enabled business and QA teams to validate features before public rollout.
* **Increased confidence:** Streamlined our CI/CD pipeline and accelerated release cycles.

---

### Key Takeaways

* Combining blue-green deployments with CDN-level routing offers powerful, flexible rollout options for cloud-native applications.
* Using cookies, headers, and query strings for environment targeting supports safe and granular testing in production-like environments.
* Automation of routing and deployment steps is key to rapid, reliable releases.

