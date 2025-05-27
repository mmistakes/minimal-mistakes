# PowerPlatformTip Template Guide

This guide explains how to use the PowerPlatformTip template to create consistent, structured blog posts.

## Template Structure

Each PowerPlatformTip follows this structured format:

### 1. YAML Front Matter
```yaml
---
title: "PowerPlatformTip [NUMBER] – '[TITLE]'"
date: 2025-05-27  # Insert current date
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatform
  - PowerApps      # Add relevant specific tags
  - PowerAutomate
  - PowerBI
  - Technology
  - Marcel Lehmann
excerpt: "[SHORT DESCRIPTION OF THE TIP]"
header:
  overlay_color: "#2dd4bf"  # Mint color
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---
```

### 2. Content Structure

#### 💡 Challenge
Describe the problem or challenge that users face. This section should:
- Clearly identify the pain point
- Explain why this is a common issue
- Set context for the solution

#### ✅ Solution  
Provide a concise overview of the solution:
- One or two sentences summarizing the approach
- High-level benefits
- What the solution achieves

#### 🔧 How It's Done
Step-by-step implementation:
```markdown
1. [STEP 1]  
   🔸 [DETAIL 1]  
   🔸 [DETAIL 2]

2. [STEP 2]  
   🔸 [DETAIL 1]  
   🔸 [DETAIL 2]
```

#### 🎉 Result
Describe the outcome:
- What users achieve after implementation
- Measurable benefits
- Impact on workflow/performance

#### 🌟 Key Advantages
List the main benefits:
```markdown
🔸 [ADVANTAGE 1]  
🔸 [ADVANTAGE 2]  
🔸 [ADVANTAGE 3]
```

#### 💡 Pro Tip
Additional insights:
- Advanced techniques
- Best practices
- Common pitfalls to avoid

#### 🛠️ FAQ
Address common questions:
```markdown
**1. [QUESTION]**  
[ANSWER]

**2. [QUESTION]**  
[ANSWER]
```

## Creating a New Post

1. **Copy the template**: Use `_post-template.md` as your starting point
2. **Name your file**: Follow the pattern `YYYY-MM-DD-powerplatformtip-[number]-[slug].md`
3. **Fill in the content**: Replace all placeholder text with actual content
4. **Add appropriate tags**: Include specific PowerPlatform technologies mentioned
5. **Set the date**: Use the current date in YYYY-MM-DD format

## Naming Convention

File names should follow this pattern:
```
2025-05-27-powerplatformtip-134-optimize-canvas-apps-yaml.md
```

Where:
- `2025-05-27`: Publication date
- `powerplatformtip`: Consistent prefix
- `134`: Sequential tip number  
- `optimize-canvas-apps-yaml`: URL-friendly slug

## Required Tags

Always include these base tags:
- `PowerPlatform`
- `Technology` 
- `Marcel Lehmann`

Add specific technology tags as relevant:
- `PowerApps`
- `PowerAutomate` 
- `PowerBI`
- `PowerPages`
- `AI` (if AI-related)
- `SharePoint` (if relevant)

## Best Practices

### Writing Style
- **Clear and concise**: Get to the point quickly
- **Action-oriented**: Use active voice
- **Practical**: Include real-world examples
- **Accessible**: Explain technical terms

### Content Quality
- **Tested solutions**: Only share what you've verified
- **Step-by-step**: Break complex processes into clear steps
- **Visual aids**: Include screenshots when helpful
- **Complete**: Provide all necessary information

### SEO Optimization
- **Descriptive titles**: Include key terms users search for
- **Good excerpts**: Summarize the value proposition
- **Relevant tags**: Use tags that users might search by
- **Internal linking**: Reference related tips when appropriate

## Optional Enhancements

### Video Tutorial
If you have a video explanation, add:
```markdown
---

### Video Tutorial

{% include video id="[YOUTUBE_VIDEO_ID]" provider="youtube" %}

---
```

### Code Blocks
For code examples, use appropriate syntax highlighting:
```markdown
```yaml
# YAML example
setting: value
```
```

### Images
Add images with proper alt text:
```markdown
![Description of image](/assets/images/example.png)
```

## Automatic Features

The blog automatically handles:
- **Table of Contents**: Generated from your headings (##)
- **Tag Pages**: Each tag gets its own archive page
- **Category Archives**: Posts grouped by category
- **Related Posts**: Suggested based on tags/categories
- **Social Sharing**: Built-in sharing buttons
- **Mobile Responsive**: Works on all devices

## Publishing

Once your post is ready:
1. Save the file in the `_posts` directory
2. Commit to Git (if using version control)
3. Jekyll will automatically process and publish the post

Your post will appear in:
- The main blog feed
- Category archive (Article, PowerPlatformTip)
- Tag archives (for each tag you've specified)
- Related posts suggestions

---

*This template ensures consistency across all PowerPlatformTip posts while maintaining flexibility for different types of content.*
