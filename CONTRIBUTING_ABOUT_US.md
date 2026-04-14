# Contributing to About Us Page

Welcome to DSG! This guide will help you add yourself to the About Us page. Follow these steps carefully:

## Step 1: Add Your Photo

1. **Take a square photo** (ideally 200x200px or larger)
2. **Format**: JPG, PNG, or WebP
3. **Upload location**: `assets/images/members/{your_year}/your_name.{ext}`
   - Example: `assets/images/members/y26/john_doe.jpg`
   - Replace `{your_year}` with your current year (e.g., y26, y25, y24, y23)
   - Use a simple, lowercase filename without spaces

## Step 2: Add Your Member Card to `_pages/about.md`

1. Open the file: `_pages/about.md`
2. Find the section matching your year:
   - **Y23** → "4th Year (Y23)"
   - **Y24** → "3rd Year (Y24)"
   - **Y25** → "2nd Year (Y25)"
   - **Y26** → "1st Year (Y26)"

3. **Copy the template below** and modify it with your details:

```html
<div class="member-card">
  <img src="{{ site.baseurl }}/assets/images/members/y26/your_name.jpg" alt="Your Full Name" onerror="this.src='{{ site.baseurl }}/assets/images/placeholder.jpeg';">
  <h3><a href="{{ site.baseurl }}/members/yourusername">Your Full Name</a></h3>
</div>
```

4. **Important**: Keep members **alphabetically sorted by first name** within their year section
5. Insert your card in the correct alphabetical position

## Step 3: Create Your Member Page

1. Create a new file: `_members/{your_year}/yourusername.md`
   - Example: `_members/y26/john_doe.md`
   - Use lowercase, no spaces in filename

2. **Copy the template below** into the new file and fill in your content:

```markdown
---
title: ""
permalink: /members/yourusername
layout: single
---

# Your Full Name

<img src="{{ site.baseurl }}/assets/images/members/y26/your_name.jpg" width="200" height="200" alt="Your Full Name">

*Your title/role, e.g., "Liaison Officer, DSG IIT Roorkee"*

## About Me

Write a brief bio about yourself. What are your interests? What projects have you worked on? What are your goals?

You can add multiple sections like:

## Skills

- Machine Learning
- Python
- Deep Learning

## Projects

- [Project Name](link) - Brief description
- [Another Project](link) - Brief description

## Contact

- LinkedIn: https://linkedin.com/in/yourprofile
- GitHub: https://github.com/yourprofile
```

## Step 4: File Structure Summary

Your changes should affect only these files:

```
├── assets/images/members/y26/
│   └── your_name.jpg                 # NEW: Your photo
├── _pages/about.md                   # MODIFY: Add your member card
└── _members/y26/
    └── yourusername.md               # NEW: Your member page
```

## Step 5: Create a Pull Request

1. **Branch name**: `feature/add-member-{your_name}`
   - Example: `feature/add-member-john-doe`

2. **Commit message**:
   ```
   Add John Doe to About Us page

   - Add member photo to assets/images/members/y26/
   - Add member card to about.md (Y26 section, alphabetically sorted)
   - Create member page with bio and projects
   ```

3. **PR Title**: `Add [Your Name] to About Us page`

4. **PR Description**:
   ```
   This PR adds me to the About Us page.

   - Year: Y26
   - Role/Title: [Your Role]
   - Photo: Added to assets/images/members/y26/
   - Member page: Created at _members/y26/
   ```

## Important Notes

✅ **DO:**
- Keep photos square (200x200px minimum)
- Use lowercase filenames without spaces
- Maintain alphabetical order by first name within your year
- Write a meaningful bio in your member page
- Include links to GitHub/LinkedIn if available

❌ **DON'T:**
- Upload photos larger than 2MB
- Use spaces or uppercase in filenames
- Break the alphabetical ordering
- Leave placeholder text in your member page
- Add yourself to the wrong year section

## Examples

### Member Card (in about.md)
```html
<div class="member-card">
  <img src="{{ site.baseurl }}/assets/images/members/y26/aditya_sharma.jpg" alt="Aditya Sharma" onerror="this.src='{{ site.baseurl }}/assets/images/placeholder.jpeg';">
  <h3><a href="{{ site.baseurl }}/members/aditya_sharma">Aditya Sharma</a></h3>
</div>
```

### Member Page (yourusername.md)
```markdown
---
title: ""
permalink: /members/aditya_sharma
layout: single
---

# Aditya Sharma

<img src="{{ site.baseurl }}/assets/images/members/y26/aditya_sharma.jpg" width="200" height="200" alt="Aditya Sharma">

*Core Member, DSG IIT Roorkee*

## About Me

I'm passionate about machine learning and open-source development. I love working on projects that bridge the gap between research and industry.

## Skills

- Python, PyTorch, TensorFlow
- Computer Vision
- NLP

## Projects

- [Neural Style Transfer](https://github.com/dsgiitr/neural_style_transfer) - CNN-based image stylization
- [Traffic Sign Classification](https://github.com/dsgiitr/traffic_sign_classification) - Deep learning for autonomous vehicles

## Contact

- LinkedIn: https://linkedin.com/in/aditya-sharma
- GitHub: https://github.com/adityasharma
```

---

**Questions?** Reach out to the DSG leads or create an issue in the repository!

Happy contributing! 🚀
