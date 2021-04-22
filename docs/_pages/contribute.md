---
permalink: /contribute/
title: "Contribute"
last_modified_at: 2021-02-05T20:54:41-05:00
classes: wide2
---

## How to contribute a new document

1. Clone the [xaitk website repository](https://github.com/XAITK/xaitk.github.io/)
```bash
git clone https://github.com/XAITK/xaitk.github.io
```

2. Create a branch off of master with a meaningful name
```bash
git checkout -b dev/add-fakesal-description
```

3. In the `docs/_posts` folder of the repository, add a new file with the filename `YYYY-MM-DD-slug.md` (e.g. `2021-04-22-fakesal.md`)

4. Copy the following to the top of the file (replacing `title`, `excerpt`, and `tags` with appropriate values)
```yaml
---
title: "FSal"
classes: wide
excerpt: "FSal is a blackbox saliency algorithm"
tags: 
  - Saliency
  - Computer Vision
---
```

5. Fill the rest of the file out with [Markdown](https://www.markdownguide.org/basic-syntax/) formatted text. Images or other multimedia assets should be added to the `docs/assets/images` folder and referenced in Markdown as `/assets/images/image-name-here.png` 

6. When ready, submit a pull request to the XAITK repository with these changes