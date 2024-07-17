---
layout: single
title: "Setting up Google Domains for static GitHub websites in 2023"
excerpt: "In the last post we learnt how you can create a static website using the GitHub Pages feature and apply themes to it using jekyll themes."
seo_title: "Setting up Google Domains for static GitHub websites in 2023"
seo_description: "Setting up Google Domains for static GitHub websites in 2023"
categories:
  - Web
tags:
  - Web Development
  - Google
  - Google Domains
  - GitHub
---
In the [last post](https://www.anupdsouza.com/posts/create-website-github-and-jekyll/) we learnt how you can create a static website using the [GitHub Pages](https://pages.github.com/) feature and apply themes to it using [jekyll](https://jekyllrb.com/) themes. In this post we will learn how to set up a Google Domain for your website so that users no longer have to visit `username.github.io` to view your website but rather visit your shiny `awesomewebsite.com` domain. Let's get started.

Head over to [Google Domains](https://domains.google.com/registrar/search) and search for a domain of your choice. Proceed to make the payment and complete the purchase. Once done, go to the `My Domains` section from the left menu and click on the `Manage` link shown on the right of your domain.

![image](/assets/images/post4/gd-step-1.png)

On the next page, select `DNS` from the left menu, tap on `Create new record` and add the following entries as you see below.

![image](/assets/images/post4/gd-step-2.png)

For the first record of type `A`, the IP address records under the `Data` column can be found in the GitHub [documentation here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
The ones you see above are the latest values as of writing this post. Make sure to check the GitHub documentation to ensure you are entering the current values. For the second record of type `CNAME` enter your static GitHub website url which we created in the previous post. Click `Save` when you are done.

Go to your static website GitHub repo and select the `Settings` tab.
Next, select `Pages` under the `Code and automation` section on the left and scroll to `Custom domain` field.

![image](/assets/images/post4/gd-step-3.png)

Enter the domain url that was created in Google Domains here and click `Save`. Make sure to check the `Enforce HTTPS checkbox` for added security, it should be checked by default. You will see a `DNS Check in Progress` message below the domain field which will verify that GitHub can connect to the domain successfully.

![image](/assets/images/post4/gd-step-4.png)

![image](/assets/images/post4/gd-step-5.png)

On completion it should say `DNS check successful` as you see above. Scroll back up and you should see a message saying your website is now live at your domain. Click `Visit site` to check your website now residing at your new domain.

![image](/assets/images/post4/gd-step-6.png)

Now if you try to visit your old website url at `username.github.io` you will find that it redirects to your domain! How cool is that?

And that's it! Share this article if you found it useful.


