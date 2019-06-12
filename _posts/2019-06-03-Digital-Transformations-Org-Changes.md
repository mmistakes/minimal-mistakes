---
title: DRAFT How to Execute a Smooth Digital Transformations
category: "Digital Transformation"
tag: ["Organization", "Agile", "Design Sprints", "Conway's law"]
toc: true
---

Aside from the tech giants, established corporations have achieved success without ever depending on their ability to write (good, user-centered) software fast and efficiently. And even seemingly very technologically competent and customer-centric organizations such as Sony, Blackberry, and Nokia have failed in good part due to poor delivery of digital products. Delivering products they did, but not ones that met the user experience demanded by the market. 

Enters the [Digital Transformation (DX)](https://en.wikipedia.org/wiki/Digital_transformation), which includes everything from "going paperless" to applying machine learning in real time to predict outcomes from semi-structured data. It is hard to find a large organization that isn't discussing directly or indirectly their digital strategy, using loosely defined terms like UX, AI, and Agile.

I'm not going to rehash here the many [tips](https://www.cio.com/article/3211428/what-is-digital-transformation-a-necessary-disruption.html) and [roadmaps](https://www.mckinsey.com/industries/financial-services/our-insights/a-roadmap-for-a-digital-transformation) created by the likes of CIO maganize and McKinsey&Company respectively. Rather, I'm going to be more prescriptive and propose a simple approach to begin a DX, one that is infused from the start with the inevitability of having re-organizational changes down the road. To make the name memorable, I found the word SILK to be appropriate. Here are the four steps of the approach:

1. **S**etup a VC Model 
2. **I**dentify problems worth solving
3. **L**aunch to production early
4. **K**ill the dogs, and accelerate the stars

The main driver behind this approach is the realization that the building digital products (data science involved or not) is filled with uncertainties, but also very rich in opportunities to capture savings, generate revenue, and be better corporate citizens for the environment. 

# 1. Setup the VC Model

Create a new container organization setup like an internal Venture Capitalist. The Venture Capitalist model is very simple to understand, but sometimes not totally obvious to implement. The fundamental idea is to set aside funds to finance the operation of a series of small product-teams (each with their own Product Manager) and establish a cross-function board accountable for the deployment of the funds and stage gate reviews. It is important that the board be composed of senior leaders who represent the business, and who have a vested interest in seeing both the “funded ideas” and the affected businesses succeed. It is also important that the board be ready to take calculated risks.

## 1.1 Warning: do not replicate your existing organization in software

> "organizations which design systems ... are constrained to produce designs which are copies of the communication structures of these organizations." - M. Conway

A strong motivation for creating small independent teams that are unconstrained from the existing organization is that they will be free to find inefficiencies of the current organization. For instance, imagine if Uber had been developed by an incumbent taxi company. A most likely feature would have been a way to call dispatch, because the head of dispatch wanted to have those features in the app. Parts of your orgnaization will necessarily have to change and evolve, and setting up a VC model protects the product lines from the old habits of the organization.

## 1.2 Maintain a fluid team structure

It may be tempting to create the ideal centralized or decentralized org chart from the start of the DX, but since you do not know ahead of time which ideas will succeed and by how much, it is better to delay this rigidity for as long as possible. In the same vein, it is important to be agile and capable of quickly scaling up and down teams. For this reason, a healthy mix of employees, contractors and consultants will be more efficient and adaptive in both the short and long run.


# 2. Identify problems worth solving

To mitigate the risks of failures, I recommend narrowing the scope of the teams at the on-set. This gives the team a clearer direction, and allows for a simpler set of metrics to evaluate the progress. For skunkworks type projects, I recommend strong guidelines limiting burn rate, and have clearly defined stage gates to avoid digging a bottomless pit.

Start picking a problem in the upper right corner of the feasibility vs. upside matrix. In other words, a highly feasible problem, with high potential upside. Make the scope as narrow as possible without sacrificing the need to have a positive return on investment (ROI). A DX needs to show tangible benefits to shareholders. Now pick a metric that will be easy to measure for the business so that the project’s success will not be debatable. The best metrics have a clear line of sight to either revenue, cost, or risks/compliance metrics. Accuracy here, is less important than precision, and relative improvement.

## 2.1 Visualize the future

Paint a picture of what future success would look like. It’s easy to skip over this step, but it is integral to the selection the problem space. By creating a clear, crisp picture (or even a video), it is easier to communicate to the affected organization and to the people joining the team what the future looks like. Make it real and involve stakeholders. Equipped with this picture, seek out a seasoned practitioner who will give you the right time of day and who will be overseeing the work from a critical vantage point of view. I highly recommend that you seek outside help and bring this person as a contractor/advisor. 

A good practititioner could be a successful company founder or a University professor. Avoid avisors or consultants who never got their hands dirty before - they are too high level to be relevant and ask the right questions. A note on consultants: you can use them as a source of inspiration for an optimistic future. 

One added benefit of having a credible practitioner is recruting. It will be significantly easier to get the very best talent to want to commit to working with you, and it will mitigate the downside risks for everyone.

# 3. Launch to production early

Your primary goal is to find so called "product market fit" (as originally defined, I believe, by [Marc Andreesen in 2007](https://web.stanford.edu/class/ee204/ProductMarketFit.html)), or in other words find the "stars" in the [growth share matrix](https://en.wikipedia.org/wiki/Growth%E2%80%93share_matrix) (also known as the BCG matrix). 

Engage the relevant stakeholder and do something quick and dirty at first. Pull a small data set and test. The key here is to focus on doing one thing that will move the metric as defined in Step 1. Review and improve on the User Experience and Communication developed in Step 2. Don't build a massive data pipeline unless your product as traction with end-users. Sometimes just a great real-time visual might capture 80% of the value. 

## 3.1 Google design sprint

I recommend that you head over to [Alex Jupiter's post](https://medium.theuxblog.com/a-product-design-toolkit-a-sprint-through-google-s-product-design-methodology-412b0743fadf), or watch the [videos](https://www.youtube.com/watch?v=Fc6A2WuEkZI&feature=youtu.be) and the book [Sprint](https://amzn.to/2WDMkB2) by Jake Knapp and John Zeratsky from Google Ventures.

## 3.2 Agile, Devops, and Products

Please do not fall into the Agile trap. It's a lot easier to look Agile than to be Agile. And even Nokia, the poster child of Agile in the late 2000s with a market cap of above $90B at the time, failed miserably. Writing large software is one of the most diffucult (and humbly) exercise there is. I highly recommend that you read the following two books on the topic of software delivery:

+ [The DevOps Handbook](https://amzn.to/2MIlfYI)
+ [Projects to Product](https://amzn.to/2MFuHMJ)

# 4. Kill the dogs, and accelerate the stars

Anticipate that the bigger cost of this engine is the long term maintenance, updates and evolution of the product. It's a product, not a project. As long as the product lives, you will incur costs. So ensure that you will set aside budget going forward to maintain and continue to tune the engine. Do not build in a silo or build a shadow IT organization. Instead, leverage your existing IT as much as possible but do not expect that they have infinite resources to support you either. You may need to complement their team with temporary flex resources.

## 4.1 Kill the dogs

The dogs will be easy to spot and don't be afraid to pull the trigger. The last thing a designer or an engineer wants to do is to work on a doomed project. Everyone will love you for it. If you see a lot of resistance from the team after you've made clear your intentions to stop it, you might want to understand this better. One effective approach is to give the time deliminated sandbox to do everything they can fight from behind and make a good comeback. 

## 4.2 Accelerate the stars

Killing the dogs might be the easiest part of this last step. The more difficult one comes from success, because success means that there will players from the old organization who stand to lose relative influence.  But recalling Conway's Law again, it will be a lot easier to scale these new lines of business because they were setup as such from the start.

