---
title: "Navigation"
permalink: /docs/navigation/
excerpt: "Instructions on how to customize the main navigation and enabling breadcrumb links."
last_modified_at: 2016-11-03T10:50:03-04:00
toc: true
---

## Masthead

The masthead links use a "priority plus" design pattern. Meaning, show as many navigation items that will fit horizontally with a toggle to reveal the rest.

To define these links add titles and URLs under the `main` key in `_data/navigation.yml`:

```yaml
main:
  - title: "Quick-Start Guide"
    url: /docs/quick-start-guide/
  - title: "Posts"
    url: /year-archive/
  - title: "Categories"
    url: /categories/
  - title: "Tags"
    url: /tags/
  - title: "Pages"
    url: /page-archive/
  - title: "Collections"
    url: /collection-archive/
  - title: "External Link"
    url: https://google.com
```

Which will give you a responsive masthead similar to this:

![priority plus masthead animation]({{ "/assets/images/mm-priority-plus-masthead.gif" | absolute_url }})

**ProTip:** Put the most important links first so they're always visible and not hidden behind the **menu toggle**.
{: .notice--info}

## Breadcrumbs (Beta)

Enable breadcrumb links to help visitors better navigate deep sites. Because of the fragile method of implementing them they don't always produce accurate links reliably. For best results:

1. Use a category based permalink structure e.g. `permalink: /:categories/:title/`
2. Manually create pages for each category or use a plugin like [jekyll-archives](https://github.com/jekyll/jekyll-archives) to auto-generate them. If these pages don't exist breadcrumb links to them will be broken.

![breadcrumb navigation example]({{ "/assets/images/mm-breadcrumbs-example.jpg" | absolute_url }})

```yaml
breadcrumbs: true  # disabled by default
```

Breadcrumb start link text and separator character can both be changed in `_data/ui-text.yml`.

```yaml
breadcrumb_home_label : "Home"
breadcrumb_separator  : "/"
```

For breadcrumbs that resemble something like `Start > Blog > My Awesome Post` you'd apply these settings:

```yaml
breadcrumb_home_label : "Start"
breadcrumb_separator  : ">"
```

## Custom Sidebar Navigation Menu

See the [**sidebars** documentation]({{ "/docs/layouts/#custom-sidebar-navigation-menu" | absolute_url }}) for information on setting up a custom navigation menu.