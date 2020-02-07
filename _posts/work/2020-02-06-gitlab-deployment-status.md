---
title: "My first venture into Vue and Vuetify"
tags: gitlab vue vuejs vuetify
---

As part of my job I had to very often check which branch was deployed, and when, to a specific environment, usually a
UAT client's site.

We use GitLab for deployments, and each of our deployment has an environment associate with it. So, my workflow was
to click on the deployment job for the site I was interested in. For there click on the environment link on the
top of the page. There GitLab shows all the deployment, so it was just a matter of looking for the latest successful
one. And this is where the problem was.

From some time ago, a lot of cancelled jobs started appearing. I have never found out exactly why, some collegues told
me it was because with every push to any branch GitLab was creating a job, which was automatically cancelled as the
deployment is only manually triggered. Whether that was tru or not, or whether it was our setup at fault or GitLab
didn't matter. What mattered was that it took me too long to find what I was looking for: the latest deployment
information. Once I had to go through more than 40 pages!! Something had to be done.

I am learning Vue and in one of the lessons I was following [Vuetify](https://vuetifyjs.com/en/) was mentioned. It
looked very impressive so I decided to build something in VueJS and using Vuetify to help me in my work.

You can find the result of my efforts in [this repository](https://github.com/troccoli/gitlab-deployments-status).

I went through few iterations, as yuo can see from the tags. Initially, I fixed the project I was working, as that
was the one I was, well, doing my work in. But then I realised I could make it more general and I added a select
field for choosing which project to display.

Also, I started by retrieving the information for all environments in the project. We have over 170 environments in
that project and making all those API call every time didn't seem the right thing to do. So later I refactored the
code and added a toggle for each environment. I'm never interested in all the environments to just getting the
information I required seemed a good solution.

You may also noticed that although the table is sortable by various columns, I don't order the data, and if you
refresh the page a few times you'll see the initial 10 are not always the same. Apart from being a waste of time to
sort them beforehand since you can sort them with a simple click, I never scroll through the table but instead
use the amazing searching capability that the `<v-data-table>` Vuetify component offers.

That's pretty much it. It's not a very complicated Vue app, but I am very happy with the result. It looks amazing
and it was fun to write. But most importantly, it saves me SO much time.
