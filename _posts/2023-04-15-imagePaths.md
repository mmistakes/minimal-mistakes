---
layout: single
title: "Image Path Issues on GitHub Blog"
categories: blogging
tag: [github,daily,typora]
toc: true
author_profile: false
sidebar:
    nav: "docs"
search: true
---



<br />

## Issues

I'm using Typor the Markdown editor for my GitHub Blog. 

The setting was okay to upload images to GitHub; but a new issue has been happened since I made categories for my posts.

<br />

### **1. Current Settings: Looks okay**

​	My current settings are below:

​	![imagePaths01]({{site.url}}/assets/images/2023-04-15-imagePaths/imagePaths01.PNG)

<br />

### **2. Paths on the editors: Looks okay**

​	And its path looks okay:

​	![image02]({{site.url}}/assets/images/2023-04-15-imagePaths/imagePaths02.png)

<br />

### **3. Images in the folder: Looks okay**

​	Images are uploaded in the right path as its paths on Settings.

​	![image-3-1]({{site.url}}/assets/images/2023-04-15-imagePaths/imagePaths03-1.png)

​	![image-3-2]({{site.url}}/assets/images/2023-04-15-imagePaths/imagePaths03-2.png)	

<br />

### **4. Image errors on posts: Issue happend**

​	It looks okay above, however, images are not shown on posts:

![image-4-1]({{site.url}}/assets/images/2023-04-15-imagePaths/imagePaths04-1.png)

<br />

### 5. Image errors on server: Issue happened

​	When a post containing images is updated on a local live server, there are error meesages:		

```powershell
[2023-04-15 00:50:33] ERROR `/blogging/assets/images/2023-04-15-imagePaths/imagePaths01.PNG' not found.
[2023-04-15 00:50:33] ERROR `/blogging/assets/images/2023-04-15-imagePaths/imagePaths02.png' not found.
[2023-04-15 00:50:33] ERROR `/blogging/assets/images/2023-04-15-imagePaths/imagePaths03-1.png' not found.
[2023-04-15 00:50:33] ERROR `/blogging/assets/images/2023-04-15-imagePaths/imagePaths03-2.png' not found.
[2023-04-15 00:50:33] ERROR `/blogging/assets/images/2023-04-15-imagePaths/imagePaths04-1.png' not found.
```



​	Based on the error messages, the newly set 'category' is also set as a part of the image path which I have never set. This post belongs to the 'blogging' category, so the 'blogging' is added to the top path.

<br />

<br />

## Reasons

I have no idea what is the exam reason causing the path error; however, I have found it's a common error who made categories on this theme.

<br />

<br />

## Solutions

I have got a solution from TeddyNote YouTube video:



### 1. Check the url in `config.yml`

Firstly, I check whether the url in `config.yml` is good.



![image-5-1]({{site.url}}/assets/images/2023-04-15-imagePaths/imagePaths05-1.png)



<br />

### 2. Add `{ { s i t e.u r l } }` to the beginning of each image path

​	When I add an image in Typora, an image path is automatically set based on the preference.

​	For example, when I add an image in this post, then the url of the image is shown:

```powershell
../assets/images/2023-04-15-imagePaths/imagePaths05-1.png)
```

<br />

​	The url path is correct and it works in a common situation; however, due to the category, the path doesn't work and images are now shown in the post. 

​	So, here is my solution. Add `{ { s i t e.u r l } }` to the beginning of each image path:

```powershell
{ { s i t e.u r l } }/assets/images/2023-04-15-imagePaths/imagePaths05-1.png
```

* Notes: Please remove all space in `{ { s i t e . u r l}}`

​	Then, it works successfully!

<br />

​	Tada! So now you can see these images in this post above!





