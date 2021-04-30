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

4. Copy the following to the top of the file (replacing fields with appropriate values)

    ```yaml
    ---
    title: "FakeSal"
    excerpt: "FakeSal is a whitebox saliency algorithm."
    tags: 
      - Saliency
      - Computer Vision
    submission_details:
      resource_pointer: https://github.com/XAITK/xaitk-saliency

      version: 1.0
      size: 100MB
      license: https://github.com/XAITK/xaitk-saliency/blob/master/LICENSE.txt

      authors:
        - F. A. Keresearcher
        - Invented Co Author
      organizations:
        - Hamburger University
      point_of_contact:
        name: Nitesh Menon
        email: nitesh.menon@kitware.com
    ---
    ```

5. Fill the rest of the file out with [Markdown](https://www.markdownguide.org/basic-syntax/) formatted text. Images or other multimedia assets should be added to the `docs/assets/<performer-name>/images` folder and referenced in Markdown as `/assets/<performer-name>/images/image-name-here.png` 

6. When ready, submit a pull request to the XAITK repository with these changes