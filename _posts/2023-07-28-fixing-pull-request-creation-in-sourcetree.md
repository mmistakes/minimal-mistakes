---
layout: post
published: true
title: "Fixing pull request creation in Sourcetree"
date: 2023-07-28 15:30:00 +0530
image:  '/images/feature-image.jpg'
description: "I recently had to setup a new machine & realised that I was not able to create pull requests from branches in Sourcetree. Turns out in the newest version 4.2.4(254) for Mac the `Host Type` is not automatically set"
excerpt: "I recently had to setup a new machine & realised that I was not able to create pull requests from branches in Sourcetree. Turns out in the newest version 4.2.4(254) for Mac the `Host Type` is not automatically set"
seo_title: "Fixing pull request creation in Sourcetree"
seo_description: "Fixing pull request creation in Sourcetree"
categories:
  - General
tags:
  - Development
  - Bitbucket
  - Sourcetree
---
<p align="center" style="font-size: 0.85rem;">
  Photo by <a href="https://unsplash.com/@cbpsc1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Clint Patterson</a> on <a href="https://unsplash.com/photos/man-siting-facing-laptop-dYEuFB8KQJk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</p>

I recently had to setup a new machine & realised that I was not able to create pull requests from branches in Sourcetree. Turns out in the newest version 4.2.4(254) for Mac the `Host Type` is not automatically set, well at least in my case it wasn't. As a result, right-clicking on a local branch & selecting the `Create Pull Request...` option did nothing.
Fixing this is fairly easy and you'll see how to do that below.

**Step 1:**
From the `Repository` menu, select `Repository Settings...`

![image](/images/post3/pr-step-1.png)

**Step 2:**
Select the `Remotes` option, select your remote repository path and select `Edit`

![image](/images/post3/pr-step-2.png)

**Step 3:**
Under `Optional extended integration` change `Host Type` which will probably be set to `Unknown` to your repository host type from the drop-down.

![image](/images/post3/pr-step-3.png)

**Step 4:**
Change or update the `Host Root URL` to your repository host url. Make sure to use the correct protocol `http or https`. You may also need to remove trailing forward slashes `(/)` if any at the end of the url. Click `OK` and exit the menus.

![image](/images/post3/pr-step-4.png)

Right click your local branch and right-click to select `Create Pull Request...`. If everything goes well, you should see your default browser window open and allow you to proceed with creating your pull request.

**Troubleshooting:**
If you've followed the above steps and are still facing an issue wherein the url that opens from Sourcetree is not the pull request creation page you'd normally see, create a pull request from the browser and cross verify the url with that opened by Sourcetree. Double check the url for any url sub-paths or forward slashes and modify the `Host Root URL` accordingly.

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@areaswiftyone?sub_confirmation=1) & follow me on [X(Twitter)](https://x.com/areaswiftyone). Leave a comment if you have any questions. 

Share this article if you found it useful !