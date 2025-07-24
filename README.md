# Young Minds Big Maths Website

This repository generates the Young Minds Big Maths website, available at [https://youngmindsbigmaths.co.uk/.](https://youngmindsbigmaths.co.uk/)

[A brief overview of YMBM here and the goal for articles.]

#### Contents
This document covers the following:

* Website framework
* How you can collaborate
* How to add an article 
* How to locally compile the website 
* Who to contact with further questions

## Website Framework
This is a GitHub pages site, built using [Jekyll](jekyllrb.com). The main content of the website is the collection of articles. Each article on the website corresponds to one of the files in the `_articles` folder. Every time a new file (satisfying some basic requirements, as [detailed below](#how-you-can-collaborate)) is added to the `_articles` folder, or an existing file is changed, Jekyll re-builds the website to reflect the changes. These changes can then be viewed in [the live site](youngmindsbigmaths.co.uk).

Using Jekyll and GitHub pages allows anyone with an idea for an article to contribute by simply [writing a file with the articles content (and some basic metadata)](#how-you-can-collaborate). These can then be submitted by making a 'pull-request', which enables one of the website maintainers to check the submission, before approving it for the site. New authors should feel confident making submissions, knowing that there's an opportunity for them to be reviewed before they get added to the site, and all submissions are greatfully received.

Aside from the `_articles` folder, images which need hosting as part of the site are stored in the `assets/img` folder. Most contributors won't need to interact with any of the other folders, but those who are interested should follow the link below to a more complete description of the project structure.

The website uses the Minimal Mistakes Jekyll theme, which can be found at [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes). The documentation for the Minimal Mistakes theme can be found at [https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/).

## How you can collaborate
Collaboration is greatly encouraged, and you can do so in two main ways:

* Write you're own article 
* Add a feature from our wishlist 

### How to write an article 

All articles for the website are markdown (.md) files. When submitting your article, we ask that you use this form. It can be helpful to write the content of your article in Word, Google Docs or another writing software first, then format the text as a markdown document once you are happy with the content. 

To add extra features such as images, links and tables, please refer to our quick guide below. 

For the website to process an article, some metadata must be included at the start of the document. This metadata has the following form (the sections in italics are yours to fill in):
---
title: "*Article Title*"
topics: 
  - *add your key topics here*
topic_overview: *true*
related: *add related topics here*
author: *add your name as given in your author profile here*
sub_date: *yyyy-mm-dd*
header:
  teaser: *add an image*
---
**Title** gives the title your article will appear with on the website.

**Topics** gives the sections where your article will appear when readers use the topic filter to search. Inputs for topics are taken as a list. 

**Topic overview** means that the start of your article will be visible to readers as a description as they search through articles. If this is true but text is not the first line of your article, this will not appear. 

**Related** is a feature not yet in use, but we plan to use it in the future to help link related articles. Please fill this in using broad topic terms, i.e. geometry to describe the areas of maths your article relates to. You can use the topic filter on the website for inspiration. 

The **author** section is where you give your name. This allows you to link to your author profile. When you submit your first article, you will also have to add yourself to the authors file. Instructions for doing this can be found below. You will need to use the same wording in both for your profile to sync correctly.  

The **sub_date** section is the date that you submitted your article to the repository. 

The **teaser** is the image that appears when readers see the summary of your article. You can upload the image you want to use to the repository and then reference it with the following code */assets/img/image_name.jpeg*. Details on how to upload images to the repository are given below.

For an example of how to fill in this metadata, see the article file [properties_of_lines](/articles/properties_of_lines/).  It is important to keep the spacing the same as given in the existing examples.

### Adding Images, Tables and Links
When writing your article, you may want to add some extra features. Here is how to include a few of these. 

#### Images 
One way to include an image in your article is to add your image to the repository and then call it in your markdown document. To do this, first save your images to the folder **/assets/img/**. Then, you can use the code *![alt text]({{site.baseurl}}/assets/img/image_name.jpeg "tooltip")* to place your image in your markdown file. The location of this line is the location your image will appear in. 

Here you need to replace the **alt text** with a meaningful description of the image you are including. The purpose of this text is to help inform readers who are using screen readers what is in the image. This improves the accessibility of the article for people with visual impairments. 

The section **tooltip** is the text that appears when your mouse hovers over an image. This should be replaced with a short meaningful description. 

#### Tables

One way to write tables in a markdown document is to use the formatting 
| Heading 1 | Heading 2 | … |
|-----------|-----------|---|
| data | data | … |
| data | data | … |
| data | data | … |
| data | data | … |

You can add headings in the first row, the second row separates the headings from the data, then the data can be added moving down the page. 

#### Links

To include a link to another section in the same article 
Another article on the website 

## One-time tasks for making updates

When adding your first article to the website, you will have to perform some one-time tasks. 

### Writing an author profile 

To add yourself as an author, you will need to edit the author file in your branch of the repository. Begin by viewing the file authors.yml in the data folder. This can be found at this link [/data/authors.yml](/data/authors.yml).

You can make a copy of a previous entry and then supplement all fields you wish to include with your details (deleting all that you do not want). The minimum you should include is
 **Your name**:
  name        : "Your name"
  bio         : "A short biography"
It is especially important to have the correct spacing here. Please use existing inputs for reference. When referencing your author biography in the metadata of your articles, it is important that your name matches the input given here so that your profile can be linked. Commit your changes explaining in the description that you have added yourself and include this in the same pull request as your first article. 

### Checking your submission and locally compiling the website

To check your article is being displayed correctly (all figures are loading, etc), you should compile the website locally on your device first. When you do this for the first time, you will need to install the required software. You can do this by following the steps below:

1. Install Jekyll. It is a good idea to follow their install guide, which can be found at [https://jekyllrb.com/docs/installation/macos/](https://jekyllrb.com/docs/installation/macos/). This can require installing a few different bits of software such as homebrew and chruby.
2. Download git GitHub Desktop to your device and sign in with your GitHub account. 
3. Download the repository to your device. This can either be done using git clone in your terminal or via GitHub Desktop. Make sure you are working in your own branch of the repository in GitHub Desktop, not the master branch.
4. Select the repository to be your working directory using the cd command. You may need to locate where the repository has been saved to on your device first.
5. Use the command *bundle exec jekyll serve* in your terminal to locally serve the website. Now you should be able to use the link provided in your terminal to view your version of the website generated by your local files.

Once you are happy with all your changes and are ready to submit them to the website, you can do so by committing all changes you have made in your branch with appropriate descriptions and then submitting a pull request to the master branch of the repository. Make sure to leave appropriate comments on your commits and pull requests as this makes it easier to track all the changes you have made. 

### How to add something from our wishlist 

Take a look through the issues labelled as wishlist in the repository issues. If you feel you know how to add the desired feature to our website, please have a go. First, create your branch of this repository. Next, make your updates. Before submitting these changes via a pull request, please check that they compile locally on your device. To locally compile the website, please see the section above. When submitting changes via a pull request, please give a description of your changes to make it easy for admins to understand what you have done. 

### Key things to check before you upload your article

* You need permission from the copyright holder before you publish any data, images, etc
* If the image is not your own, please reference the service the image is from, i.e. Pixabay or Unsplash, in the image file name. 
* Check all image descriptions have been meaningfully filled in, in both the alt text and the tooltip sections. 
* Any images of people must have permission from the individual to be included and should be anonymised. 

### What happens when you submit an article or update to us

When you submit your pull request containing your article or updates, one of our team members will be able to see what you have added. If everything is fine, we will merge the changes and your work will be visible on the website. If we have questions for you, we will reply to the pull request with these. 

### Who to contact with questions that aren't answered here

If you have questions about submitting an article or the website which are not answered here, please contact Sam Fern at *s.m.fearn@durham.ac.uk*. 
