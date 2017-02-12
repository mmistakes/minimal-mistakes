---
title: The impact of containers to application life cycle management (ALM)
excerpt: Containers are such an innovative technology for many reasons but the one I like the most is how it has the potential to redefine the application life cycle management.
tags: Container
categories: 
header:
  overlay_image: http://im2.olx.biz.id/images_olxid/172511815_2_644x461_container-bahan-modifikasi-upload-foto.jpg
---

I'm a big fan of the container technology as I believe it to be a major game changer in software engineering. 

Containers are many things and I'm sure you've already read about them but there are a couple that I find the most interesting:

- Optimize virtualization. 
Until the emerging of containers technology we virtualized on the operating system level although there have been some alternatives. This is kind of a waste, as for a small micro-service, the overhead of the operating system is massive especially with windows.
- Redefine the application life cycle management (ALM). 

Optimizations are always welcome and they are constant within the technology world. 
I'm always impressed with what has the potential to change the game and that's what interests me the most with containers.

All software engineering teams incorporate ALM principals where each stage of the workflow e.g. Local->Development ->Test->Production contains the *deliverable*. 

Recently I gave a presentation within our engineering team where I was trying to visualize this concept. 
This is the picture I used:

{% include figure image_path="/assets/images/posts/2017-02-12-docker-containers-application-lifecycle-management-alm.png" alt="Application life cycle management" caption="Deliverable moving through the ALM workflow" %}

Don't give too much importance to the verticals as they are not of importance. 
What is important is what moves between each vertical that is the input and output of the ALM workflow.

Depending on each team the deliverable can change but without container technology it was almost impossible for that *deliverable* to be the **actual proper** deliverable that will run **as-is**. 
At best it was a collection of scripts and files that has the potential to create your production environment. 
Cloud providers like Azure and Amazon Web Services and version control services such as Visual Studio Team Services, Github, Bitbucket etc have always provided tools to help offer a seamless ALM from development to production also known as Continuous delivery. 
But as good as their tooling has been, it was always a promise for the functioning deployment and required quite a bit of effort to develop, hence the DEVOPS name came to be.
Even the best traditional ALM workflows enforce consistency of what moves between each stage with rules, code reviews etc but at the end there is always the potential that something has changed and the produced environment for *Test* is a bit different than the one of *Development*. 
This is even worse when trying to reproduce a fault from production in engineering. 
It's almost never the same.

Container technology has the potential to completely redefine what moves within the ALM workflow. 
Docker promises that the container executes as-is on any host. 
It doesn't have to change, it doesn't have to recompile it just needs to be referenced and executed. 
This makes it the best candidate for the project deliverable to be as close as possible to the real thing in the above workflow picture.

Let me explain this another way. 
The container (aka docker image) created by your automation build on your development branch **will** find it's way to power your official deliverable **as-is** and without any changes. 
It has also the potential to go backwards, that is from production to your engineer's workstation.
Add to this the ability to describe the composition of a micro-service cluster and your deliverable becomes your cluster definition aka **docker compose**.
Isn't this a game changer? Doesn't this redefine the concepts of CI, CD and all other acronyms that exist?
For me, it surely does and that is a major step forward.

There is no developers, testers, professional services, support and devops segregation any longer, at least not in the traditional context where each team waits for the zip file to be delivered by the previous team. There is one software engineering team, with some segregation of responsibilities that work  altogether for the `https://youramazingservice.com/`.