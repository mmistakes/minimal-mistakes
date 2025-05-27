# Giscus Comments Setup Guide

This guide will help you set up Giscus comments for your PowerPlatform Tips blog. Giscus uses GitHub Discussions as the backend for comments.

## Prerequisites

1. Your repository must be **public**
2. You need **admin access** to the repository
3. The repository must have **GitHub Discussions enabled**

## Step 1: Enable GitHub Discussions

1. Go to your repository on GitHub
2. Click on the **Settings** tab
3. Scroll down to the **Features** section
4. Check the box next to **Discussions**
5. Click **Set up discussions**
6. GitHub will create a welcome discussion for you

## Step 2: Configure Giscus

1. Visit [giscus.app](https://giscus.app)
2. Enter your repository in the format: `username/repository-name`
   - Example: `MarceLehmann/PowerPlatformTip`
3. Select a **Discussion Category**:
   - Choose "General" or create a new category like "Blog Comments"
4. Choose **Discussion Title Format**:
   - Recommended: "Discussion title contains page pathname"
5. The page will generate a script tag with your configuration

## Step 3: Get Your Giscus IDs

From the generated script at giscus.app, you'll see something like this:

```html
<script src="https://giscus.app/client.js"
        data-repo="MarceLehmann/PowerPlatformTip"
        data-repo-id="R_kgDOxxxxxx"
        data-category="General"
        data-category-id="DIC_kwDOxxxxxx"
        ...>
</script>
```

Copy the values for:
- `data-repo-id` (starts with "R_kgDO")
- `data-category-id` (starts with "DIC_kwDO")

## Step 4: Update Your Blog Configuration

1. Open `_config.yml` in your blog
2. Find the comments section and update it with your values:

```yaml
comments:
  provider: "giscus"
  giscus:
    repo_id: "R_kgDOxxxxxx"          # Your repo ID from step 3
    category_name: "General"          # Your chosen category name
    category_id: "DIC_kwDOxxxxxx"     # Your category ID from step 3
    discussion_term: "pathname"
    reactions_enabled: "1"
    theme: "light"
    strict: "0"
    input_position: "bottom"
    emit_metadata: "0"
    lang: "en"
    lazy: true
```

## Step 5: Test Your Comments

1. Start your Jekyll server: `bundle exec jekyll serve`
2. Navigate to any blog post
3. Scroll down to see the comment section
4. You should see the Giscus comment widget

## Styling Options

The comments will automatically match your site's theme. You can customize the appearance by:

1. Changing the `theme` value in `_config.yml`:
   - `"light"` (default)
   - `"dark"`
   - `"preferred_color_scheme"` (follows system theme)

2. Adding custom CSS to `assets/css/main.scss`:

```scss
// Custom Giscus styling
.giscus {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e5e9;
}

.giscus-frame {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## Troubleshooting

**Comments not appearing?**
- Check that GitHub Discussions is enabled
- Verify your `repo_id` and `category_id` are correct
- Make sure your repository is public
- Check browser console for errors

**Comments in wrong language?**
- Set `lang: "en"` in your Giscus configuration

**Want to disable comments on specific posts?**
Add this to the front matter of any post:
```yaml
comments: false
```

## That's it! 🎉

Your PowerPlatform Tips blog now has a beautiful, GitHub-integrated comment system. Visitors can comment using their GitHub accounts, and all discussions will be stored in your repository's Discussions section.
