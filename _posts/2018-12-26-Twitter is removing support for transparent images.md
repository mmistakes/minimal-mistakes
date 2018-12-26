---
layout: single
author_profile: true
read_time: true
comments: true
share: true
title: Twitter is removing support for transparent images
date: December 26, 2018 at 07:04PM
categories: Tech News
---
<img class="align-center" src="%20http://d2.alternativeto.net/dist/icons/twitter_80009.png?width=36&amp;height=36&amp;mode=crop&amp;upscale=false">
<p><p>Twitter users, especially those that have used the short-form social network to share their art, are in for a disappointing change in a couple of months: the discontinuation of support for transparent images.</p>
<p>As announced <a href="https://twittercommunity.com/t/upcoming-changes-to-png-image-support/118695" rel="nofollow">in a post on its official developer forums</a>, Twitter will remove support for PNG images with any transparent pixels on February 11th. This post details the change and its justification:</p>
<blockquote>
<p>What are the changes being made?<br />
The way Twitter handled PNG uploads in the past was not always consistent and could lead to large PNG images being used when a JPEG would have been preferable for image load latency and user data costs. The changes we’re making will provide consistent behavior that can be depended on by those uploading images to Twitter to reach a global audience.</p>
</blockquote>
<p>All JPG and WebP images will continue to be converted to 85% JPEG File Interchange Format (JFIF) quality. PNG images will be handled in a much more intricate and complex manner:</p>
<blockquote>
<p>The most common PNGs are PNG-24 and PNG-32. PNG-24 has RGB Color with 8 bit depth color, that is to say it uses 8 bits per channel with 3 color channels (RGB) for a total of 24 bits per pixel. PNG-32 has RGB Color w/ Alpha with 8 bit depth color, that is to say it uses 8 bits per channel with 3 color channels (RGB) plus an alpha channel for a total of 32 bits per pixel. Both PNG-24 and PNG-32 will be tested to consider if they will remain PNG or if they will be converted to JPEG, which is more likely.<br />
A not so uncommon PNG format is PNG-8. PNG-8 is a Palette Based image with 8 bit depth color, that is to say it uses a palette to look up all of its colors and can support full RGB and Alpha color but has a maximum of 8 bits worth of colors, a.k.a. 256 colors in the palette. PNG-8 images will always stay as PNG-8 and won’t be converted.</p>
</blockquote>
<p>Any images uploaded to <a href='//alternativeto.net/software/twitter/'><img alt='Small Twitter icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/twitter_80009.png?width=36&height=36&mode=crop&upscale=false' />Twitter</a> that have transparency in them will have a white background applied instead of those transparent pixels starting February 11th. Feedback is being collected from developers in <a href="https://twittercommunity.com/t/feedback-for-upcoming-changes-to-png-image-support/118901" rel="nofollow">a thread of Twitter's developer forums</a>.</p>
</p>
<a class="btn btn--info" href="https://alternativeto.net/news/2018/12/twitter-removing-support-for-transparent-image-uploading">View Complete Article</a>