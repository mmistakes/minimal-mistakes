---
layout: post
published: true
title: "Automating README Generation Across My GitHub Projects"
date: 2026-02-01 13:43:00 +0530
image: '/images/posts/readme-automation/featured.jpg'
description: "How I stopped copy-pasting support links across repos and built a simple GitHub Actions system to auto-generate consistent READMEs."
excerpt: "Tired of manually updating every README? Here’s a workflow setup that keeps your documentation in sync using Python and GitHub Actions."
seo_title: "Automate GitHub READMEs with Templates and Actions"
seo_description: "Learn how to auto-generate consistent README files across multiple repositories using a shared template, GitHub Actions, and a Python script."
categories:
  - Automation
tags:
  - GitHub
  - Python
  - CI/CD
  - Developer Workflow
---
<p align="center" style="font-size: 0.85rem;">
Photo by <a href="https://unsplash.com/@brett_jordan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Brett Jordan</a> on <a href="https://unsplash.com/photos/white-printer-paper-on-brown-wooden-table-rhCZIm9pp54?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</p>      

## The Challenge

Over the past few years, I’ve accumulated a few repositories. Some are experiments, others are demo apps, and many support my [YouTube](https://www.youtube.com/@areaswiftyone) tutorials. As an occasional creator, I wanted all these public facing repositores to have the same standard information in the `README.md` in addition to the standard title and description:

*   Support and donation links
*   Contact information and social handles
*   A consistent footer

For the longest time, I handled this inefficiently: **Copy → Paste → Tweak → Repeat.**

Every new repo meant manually copying badges and links. Worse, if I decided to change a social handle (which happened more times than I care to admit) or add a new platform, I had to hunt down every old repository and update it one by one. It was a maintenance nightmare. We automate builds, tests, and deployments; so why not documentation?

---

## The Architecture

I needed a system that allowed me to **"Write once, update everywhere."**

However, I had a specific constraint: I didn't want a "push" model where updating a central file immediately triggers a commit on all repositories simultaneously. That approach is difficult to maintain and could break multiple repos if the script has a bug.

Instead, I opted for a **"pull" model**:
1.  **Central Content:** One repo to hold shared markdown snippets.
2.  **Local Template:** A specific template file inside each project.
3.  **On-Demand Automation:** A GitHub Action that runs independently for each repo.

This setup ensures that I can update the central content once, and then trigger updates on specific repositories individually when I'm ready.

---

## Step 1: Create a Central Content Repository

First, I separated the content from the projects. I created a public repository dedicated solely to shared markdown sections.

**Central Repo:** [github.com/anupdsouza/central-readme](https://github.com/anupdsouza/central-readme)

This repo contains modular files like `support.md` and `contact.md`. Whenever I need to update a BuyMeACoffee link or change a Twitter handle, I only edit files in this repository. This also allows me to add more sections if I ever need to in the future.

---

## Step 2: Create a Template README

In my actual project repositories, I no longer edit `README.md` directly. Instead, I created a template file named `README_template.md`.

This file contains the project-specific documentation plus placeholders for the shared content. See the template README below. I've also created a repo containing all these files that you can [check out here](https://github.com/anupdsouza/readme-template). This template serves as the starting point for new repositories.

```markdown
# My Project Name

This is the specific description for this project.

{{support}}

## Features
- Feature A
- Feature B

{{contact}}
```

**Flexibility is key here.** Because the script looks for specific placeholders, the injection is entirely optional. If a specific project doesn't need a support section, I simply omit the *{{support}}* tag from the template. I can pick and choose exactly which shared blocks appear and where they sit in the layout.

---

## Step 3: The Generator Script

To glue this together, I wrote a small Python script. It reads the local template, fetches the content from the central repository, and writes the final `README.md`.

```python
import os

TEMPLATE_README = "README_template.md"
# Paths to the cloned central content
SUPPORT_FILE = "central-readme/support.md"
CONTACT_FILE = "central-readme/contact.md"

# 1. Read the template
with open(TEMPLATE_README) as f:
    readme_content = f.read()

# 2. Inject Support Section
if "{{support}}" in readme_content:
    with open(SUPPORT_FILE) as f:
        readme_content = readme_content.replace("{{support}}", f.read())

# 3. Inject Contact Section & Dynamic Links
if "{{contact}}" in readme_content:
    with open(CONTACT_FILE) as f:
        contact_content = f.read()

    # Dynamically insert the current repo URL
    repo_slug = os.getenv("GITHUB_REPOSITORY", "")
    repo_url = f"https://github.com/{repo_slug}"
    contact_content = contact_content.replace("{{repo_url}}", repo_url)

    readme_content = readme_content.replace("{{contact}}", contact_content)

# 4. Write the final file
with open("README.md", "w") as f:
    f.write(readme_content)
```

**Extensibility:** This approach makes it incredibly easy to add future sections. If I decide later that I want a standardized "Contributing" or "License" section, I just add the file to the central repo, add a few lines to this script to check for a *{{contributing}}* tag, and I'm good to go.

---

## Step 4: Automate with GitHub Actions

Finally, I wired everything together with a GitHub Actions workflow.

I encourage you to view the actual workflow file in the template repository to see the implementation:

**View Workflow:** [update-readme.yml](https://github.com/anupdsouza/readme-template/blob/main/.github/workflows/update-readme.yml)

### What the workflow does:
1.  **Triggers:** It runs whenever code is pushed to the `main` branch, or when triggered manually via `workflow_dispatch`.
2.  **Checkout:** It checks out the current repository.
3.  **Clone:** It clones the `central-readme` repository to access the shared snippets.
4.  **Execute:** It sets up Python and runs the generator script shown in Step 3.
5.  **Commit:** If (and only if) the `README.md` has changed, the bot commits and pushes the update.

The manual trigger (`workflow_dispatch`) is essential here. It allows me to go to the Actions tab on GitHub and trigger a README update for a specific repo without needing to push any code.

---

## Final Takeaway

This system isn't complex architecture; it's just plumbing: Shared Content + Template + Automation. However, the impact on my workflow has been significant:

> **New Repos:** I copy the template and workflow, push, and I'm done.
>
> **Updates:** I edit the central repo once.
>
> **Maintenance:** I can trigger updates individually per repo, keeping the process controlled.

I still have a backlog of older repositories that need to be migrated to this system. However, having a standardized starting point which fits my needs perfectly for all new projects is a massive step forward.

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@areaswiftyone?sub_confirmation=1) & follow me on [X(Twitter)](https://x.com/areaswiftyone). Leave a comment if you have any questions. 

Share this article if you found it useful !