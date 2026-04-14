# 🎯 How to Add Yourself to DSG's About Us Page

Welcome to the DSG team! 🚀 This guide will walk you through adding yourself to our [About Us page](https://dsgiitr.com/about/).

---

## 📋 Quick Overview

You need to do **3 things**:

1. **Upload your photo** → `assets/images/members/{year}/`
2. **Add your member card** → `_pages/about.md` (one HTML snippet)
3. **Create your member page** → `_members/{year}/your_username.md` (your bio page)

**Estimated time**: 10-15 minutes

---

## 🚀 Step-by-Step Instructions

### STEP 1: Prepare Your Photo

1. Take or find a **headshot/profile picture**
2. Make it **square** (preferably 200x200px or larger, max 2MB)
3. **File format**: JPG, PNG, or WebP
4. **Filename**: lowercase, no spaces, no special characters
   - ✅ Good: `aditya_sharma.jpg`, `john_doe.png`
   - ❌ Bad: `Aditya Sharma.jpg`, `aditya sharma.jpg`, `Aditya-Sharma.jpg`

### STEP 2: Upload Your Photo

1. Navigate to: `assets/images/members/{your_year}/`
   - Example: `assets/images/members/y26/` for 1st year
   
2. Upload your photo file there

3. **Remember the filename** - you'll need it in the next steps!

### STEP 3: Add Your Member Card to About Us Page

1. Open file: `_pages/about.md`

2. Find your year section:
   - **Y23** → "4th Year (Y23)" section
   - **Y24** → "3rd Year (Y24)" section
   - **Y25** → "2nd Year (Y25)" section
   - **Y26** → "1st Year (Y26)" section

3. In that section, find where your name should go **alphabetically by first name**

4. Copy this template and fill it in:
   ```html
   <div class="member-card">
     <img src="{{ site.baseurl }}/assets/images/members/y26/YOUR_PHOTO.jpg" alt="Your Full Name" onerror="this.src='{{ site.baseurl }}/assets/images/placeholder.jpeg';">
     <h3><a href="{{ site.baseurl }}/members/your_username">Your Full Name</a></h3>
   </div>
   ```

5. **Replace**:
   - `y26` with your year (y23, y24, y25, or y26)
   - `YOUR_PHOTO.jpg` with your actual photo filename
   - `Your Full Name` with your actual name (twice)
   - `your_username` with your username (lowercase, no spaces)

6. Insert the card in the correct alphabetical position

### STEP 4: Create Your Member Page

1. Copy this file: `_members/y26/TEMPLATE_MEMBER_PAGE.md`

2. Create a new file with your name:
   - Path: `_members/{your_year}/{your_username}.md`
   - Example: `_members/y26/aditya_sharma.md`

3. Open the template file and replace all the `REPLACE WITH...` sections with your actual information:
   - Your name
   - Your photo filename
   - Your role/title
   - About me section
   - Skills
   - Projects
   - Contact info

4. Write meaningful content - don't leave placeholder text!

---

## 📂 File Structure Example

Here's what your changes should look like:

```
dsg-website/
├── assets/images/members/
│   └── y26/
│       └── aditya_sharma.jpg          ← NEW: Your photo
├── _pages/
│   └── about.md                        ← MODIFIED: Added your card
└── _members/
    └── y26/
        └── aditya_sharma.md            ← NEW: Your member page
```

---

## ✅ Checklist Before Submitting PR

- [ ] Photo is square, 200x200px minimum, under 2MB
- [ ] Photo filename is lowercase with underscores (no spaces)
- [ ] Photo uploaded to correct year folder
- [ ] Member card added to about.md in correct year section
- [ ] Member card is in **alphabetical order** by first name
- [ ] All template placeholders replaced with real content
- [ ] Member page created in correct year folder
- [ ] Member page has meaningful bio (not template text)
- [ ] All links (GitHub, LinkedIn) are correct and working
- [ ] Spelling check - no typos in your name or bio

---

## 🔗 Creating Your Pull Request

1. **Create a branch**:
   ```sh
   git checkout -b feature/add-member-your-name
   ```
   Example: `feature/add-member-aditya-sharma`

2. **Make your changes** (photo, about.md, member page)

3. **Commit your changes**:
   ```sh
   git add .
   git commit -m "Add [Your Name] to About Us page

   - Add member photo to assets/images/members/y26/
   - Add member card to about.md (Y26 section, alphabetically sorted)
   - Create member page with bio and projects"
   ```

4. **Push to GitHub**:
   ```sh
   git push origin feature/add-member-your-name
   ```

5. **Create a Pull Request** with title:
   ```
   Add [Your Name] to About Us page
   ```

6. **In PR description**, include:
   ```
   This PR adds me to the DSG About Us page.
   
   **Details:**
   - Year: Y26
   - Role: Core Member
   - Photo: Added to assets/images/members/y26/
   - Member page: _members/y26/your_username.md
   ```

---

## 💡 Tips & Best Practices

### For Your Photo:
- Use a **clear headshot** or profile picture
- Good lighting is important
- Can be professional or casual (you can smile!)
- Square format works best

### For Your Member Page:
- **Be authentic** - Write about what genuinely interests you
- **Add real projects** - Even personal projects are great
- **Include links** - GitHub and LinkedIn help people connect
- **Use markdown formatting** - Feel free to add headers, bold text, etc.
- **Keep it concise** - 2-3 paragraphs is perfect

### For Alphabetical Ordering:
Sort by **first name** only. Examples:
```
Aakash Kumar Singh    (A)
Aayan Yadav           (A)
Agam Pandey           (Ag)
Anant Jain            (An)
Anupriya Kumari       (An)
```

---

## ❓ FAQ

**Q: What if my photo doesn't appear on the website?**
A: Check that:
- File path is exactly correct
- Filename matches what you put in about.md
- File is actually in the folder
- No typos in the path

**Q: Can I use a different image format?**
A: Yes! JPG, PNG, WebP all work. Just update the extension in about.md.

**Q: I already committed something wrong, can I fix it?**
A: Yes! You can make additional commits to your PR. Just push again and the PR will auto-update.

**Q: Where do I put the member card exactly?**
A: In your year section, in alphabetical order by **first name only**. Between the `<div class="member-grid">` tags.

**Q: Can I edit my page later?**
A: Absolutely! Just make changes and submit another PR. Your profile can evolve as you do.

**Q: What if I don't have a GitHub or LinkedIn?**
A: That's fine! You can skip that line or use any other link (portfolio, personal website, etc.).

**Q: Can I add more sections to my member page?**
A: Yes! Feel free to add sections like Education, Experience, Hobbies, Publications, etc. Just keep the same markdown format.

---

## 🎓 Example: Complete Entry

**Photo file**: `assets/images/members/y26/aditya_sharma.jpg`

**In about.md** (Y26 section, alphabetically placed):
```html
<div class="member-card">
  <img src="{{ site.baseurl }}/assets/images/members/y26/aditya_sharma.jpg" alt="Aditya Sharma" onerror="this.src='{{ site.baseurl }}/assets/images/placeholder.jpeg';">
  <h3><a href="{{ site.baseurl }}/members/aditya_sharma">Aditya Sharma</a></h3>
</div>
```

**Member page** at `_members/y26/aditya_sharma.md`:
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

I'm passionate about machine learning and building scalable systems. I love open-source development and working on projects that solve real-world problems.

## Skills

- Python, PyTorch, TensorFlow
- Computer Vision & NLP
- Deep Learning & MLOps

## Projects & Contributions

- [Diffusion Everything](https://github.com/dsgiitr/diffusion-everything) - Open-source diffusion models resource
- [Traffic Sign Classifier](https://github.com/aditya-sharma/traffic-classifier) - CNN-based vehicle sign recognition

## Interests & Goals

I'm interested in:
- Generative AI and diffusion models
- Making ML accessible and sustainable
- Contributing to open-source ML projects

## Contact & Links

- **GitHub**: https://github.com/aditya-sharma
- **LinkedIn**: https://linkedin.com/in/aditya-sharma
- **Email**: aditya@example.com
```

---

## 🆘 Need Help?

- **Questions?** Reach out to DSG leads or seniors
- **Issue with Git?** Ask for help in the DSG Discord/Slack
- **Technical problems?** Create an issue in the repository

---

## 📚 Additional Resources

- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub Pull Requests](https://docs.github.com/en/pull-requests)

---

**That's it! You're ready to contribute! 🚀**

Once your PR is merged, you'll officially be on the DSG About Us page. Welcome aboard! 🎉
