---
published: false
---
# Programming is a Mess

One of the things that I am wanting to show in this blog is that development is often a circuitous path. Even with the wonders of the F# language, it is easy to design yourself into a corner which makes your solution clunky and awkward. I wanting to show how my initial approach in applying Domain Driven Design from the bottom up ended up causing me some serious headaches. I then show what happened when I approached the problem from the top down. I credit Mark Seaman for the idea of working from the outside in. I think it is important for people to see the messy side of development as an encouragement for others. I often find myself struggling with a problem for several days before having some realization that my approach was fundamentally flawed. This struggle is important and should not make anyone feel like less of a developer.

## Modeling a Time Series

I have a project where we are reformulating how we calculate the replenishment logic for our supply chain. Replenishment is the process of ordering product from Vendors for your Warehouses so that we can fill customer orders. The current solution is a monolith application which is all fed from an Azure SQL instance. The whole thing is comprised  We monitor several metrics to evaluate the risk of price movement and shifts in demand. This data is all Time Series data
