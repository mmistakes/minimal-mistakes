---
title:  "For Resume Writing, LaTeX > Word"
header:
  teaser: assets/images/LaTeX.png
categories:
  - LaTeX
gallery:
  - url: /assets/images/resume_templates/moderncv_banking.png
    image_path: /assets/images/resume_templates/moderncv_banking.png
    alt: "Modern CV by ShareLaTeX"
    title: "Modern CV by ShareLaTeX"
  - url: /assets/images/resume_templates/procv.png
    image_path: /assets/images/resume_templates/procv.png
    alt: "Professional CV by Alessandro Plasmati"
    title: "Professional CV by Alessandro Plasmati"
  - url: /assets/images/resume_templates/two_column_cv.png
    image_path: /assets/images/resume_templates/two_column_cv.png
    alt: "Two-column CV by Nicola Fontana"
    title: "Two-column CV by Nicola Fontana"
  - url: /assets/images/resume_templates/professor.png
    image_path: /assets/images/resume_templates/professor.png
    alt: "CV template by Kieran Healy"
    title: "CV template by Kieran Healy"
  - url: /assets/images/resume_templates/Extended_Fancy_CV_Carmine_Benedetto.png
    image_path: /assets/images/resume_templates/Extended_Fancy_CV_Carmine_Benedetto.png
    alt: "Extended Fancy CV by Carmine Benedetto"
    title: "Extended Fancy CV by Carmine Benedetto"
  - url: https://raw.githubusercontent.com/opensorceror/Data-Engineer-Resume-LaTeX/master/screen.png
    image_path: https://raw.githubusercontent.com/opensorceror/Data-Engineer-Resume-LaTeX/master/screen.png
    alt: "Data Engineer Resume by Harsh Gadgil"
    title: "Data Engineer Resume by Harsh Gadgil"
excerpt: "Why you should port your Word resume to LaTeX."
---

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

For several years, I've had an old school resume prepared in Microsoft Word. Although I neither loved nor hated it, I knew that there had to be a better way. Enter $$\LaTeX$$ resume templates:

{% include gallery class="full" caption="Sample $$\LaTeX$$ resume templates" %}

**Note**: All templates shown above, with the exception of 'Data Engineer Resume by Harsh Gadgil', can be found on [ShareLaTeX](https://www.sharelatex.com/templates/cv-or-resume).
{: .notice--info}

For the uninitiated, $$\LaTeX$$ is a document preparation system used for *typesetting* (as opposed to word processing). LaTeX has a steep learning curve; if you're feeling particularly brave, a comprehensive tutorial can be found [here](https://www.latex-tutorial.com/).

Arguably, a resume is more typesetting than word processing. Resumes may contain multiple columns, which can be a pain to get right in Microsoft Word, but comes naturally to LaTeX. Dan McGee [outlines](https://www.toofishes.net/blog/why-i-do-my-resume-latex/) the benefits of LaTeX over Word nicely. In some ways, LaTeX is like HTML - LaTeX projects usually contain two main files - a *.tex* file, that contains markup and content, and a *.cls* file, that contains styling code. Although this means that LaTeX projects are extremely flexible and versatile, a significant amount of coding may be involved in creating a pleasing typeset document. Fortunately, several specialized classes can be downloaded from the web and used as-is, reducing or even eliminating the need to write any styling code.

There are several reasons why I choose to write my resume in LaTeX rather than in Word:

1. I want my resume to look professional and to stand out,
2. I want to design the layout once, and then only focus on the content,
3. I want to be able to effortlessly insert graphics in my resume without worrying that it will mess everything up, and
4. I want my resume to (potentially) look exactly the same years from now.

Point 1 is a no-brainer for anyone who has looked at resumes prepared in LaTeX. As for Point 2 and Point 3, several frightful personal experiences with Word have taught me not to trust the placement of images, or text, or anything for that matter :unamused:. Working with Word just feels *hacky*, while working with LaTeX feels organized and streamlined. Everything just works, as long as you know what you're doing. About Point 4, the miserable backward compatibility of Word is legendary. The document you meticulously prepared in Word 97 refuses to play nice with Word 2003; your carefully placed images and text are all over the place. In contrast, LaTeX documents prepared in 1993 or 2016 will both look exactly the same way they did when they were prepared :relieved:.

My own resume, tailored for a Data Scientist/Software Engineer role, looks like the last image in the gallery above. I've open sourced it [here](https://github.com/opensorceror/Data-Engineer-Resume-LaTeX). If you're feeling creative, you can adapt it for other roles too. Happy hacking! :beers:

[Get the template](https://github.com/opensorceror/Data-Engineer-Resume-LaTeX){: .btn .btn--info .btn--large}
