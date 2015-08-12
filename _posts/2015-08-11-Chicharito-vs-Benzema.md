---
layout: post
title: "Bayesian Analysis on Javier Hernandez and Benzema's scoring probabilities "
modified:
excerpt: "Use Bayesian Analysis to calculate probability of scoring in game"
tags: [Python, data mining, analytics, Bayesian]
modified: 2015-06-28
comments: true
---

The 2014/2015 Season for Real Madrid was a disaster in terms of expectations. Real Madrid finished second in La Liga, was knocked out in Champions League semi-finals and was knocked out in Copa by Atletico de Madrid, the home city rival. This outcome seemed impossible during the first half of the season, when the team was on route to break the Guiness Record of consecutive wins. The second half of the tournament was not so favorable, multiple injuries led to forced rotations or lack of rotations for some players. 

A particular case was the striker situation. In the Mourinho era, Karim Benzema and Gonzalo Higuain would rotate the starter role. This was not the case under Ancelotti, where Benzema was an indisputable starter leaving Chicharito very few game time.

In this post I will be using Bayesian Analysis in Python to determine the probabilities of scoring at least 1 goal for Chicharito and Karim Benzema. 

<p><br></p>
The first part of this project consisted of getting every single Chipotle location in America. After my google-fu failed to take me to a site with every Chipotle restaurant, I wrote a scrapper to check each and every every zip code in America on Chipotle's website. There are about 60k zip codes in the United States, so this took a while but eventually I discovered there are 1,140 Chipotle Restaurants in America!

<p><br></p>
To population data at a Zip Code level, I used the choroplethrZip package (<a href="https://github.com/arilamstein/choroplethrZip">GitHub link</a>).The variables I had access where total population, race, average age and income per capita. This data is from 2013, but for simplicity I assumed no restaurants opened or closed since then. 
<p><br></p>


Once I organzied my data I studied the demographic variable. To do this, I separated the Zip Codes in four (White, Hispanic, Asian, Black) and assigned a Zip Code to the race where the majority of its population belonged to. As the histogram below shows, there are more Chipotle resturants in Zip Codes where there is a predominance of white people. The graph on the right is not limited to Zip Codes with a Chipotle restuarant. Comparing them side by side we can see how the reason why there are more restaurants in Zip Codes where the white population is the majority may be simply because there are more Zip Codes where the white population is a majority.

<figure>
	<a href="/images/Chipotle/ChipotleDemo.jpeg"><img src="/images/Chipotle/demographic.jpeg"></a>
	<figcaption></figcaption>
</figure>

The second variable I observed was income. Meal prices ranging between $8 and $10 is affordable but not necesarily cheap. The histogram below shows that me majority of the restaurants are located in Zip Codes where the average income ranges between $30k-$50k.  Just like with demographics, the income variable is not too surprising. As shown in the histogram below, the majority of the population in the United States falls between the $20k - $40k per capita income range.  

<figure>
	<a href="/images/Chipotle/America_income.jpeg"><img src="/images/Chipotle/Per_capita_income.jpeg"></a>
	<figcaption></figcaption>
</figure>

Another variable I considered was age. The median age of Chipotle consumers is 37. Four years shy 41, the national median age. Just like the previous two graphics, the graph below shows how the average age of Zip Codes with a Chipotle restaurant is a sample of the national data set. 

<figure>
	<a href="/images/Chipotle/Age_histogram.jpeg"><img src="/images/Chipotle/Age_histogram.jpeg"></a>
	<figcaption></figcaption>
</figure>

The last variable I looked at was population. The average population per Zip Code in the United States is 9,517 and the average population for Zip Codes with a Chipotle restaurant is 32,470 and the minimum population in a Zip Code with a restaurant is 21,140. The graph below shows how regions with a high population are selected to have a Chipotle restuarants. Obviously. Unlike the previous variables, this variable does not look like a subset of the total population.

<figure>
	<a href="/images/Chipotle/Population.jpeg"><img src="/images/Chipotle/Population.jpeg"></a>
	<figcaption></figcaption>
</figure>


Once I understood the variables, I decided to run a logistic regression to obtain the probabilty of having a Chipotle store. After experimenting with many equations testing for Type I and Type II errors, I concluded the probability \\( \pi \\) is determined by the following equation:
<p><br></p>
\\(\pi(x)= \frac{1}{1+e^{-\beta X}} \\)
<p><br></p>

where:

<p><br></p>

\\( \beta X = \beta _{0} +\beta _{1}X _{per \, capita \, income} + \beta _{2}X _{median \, age}+\beta _{3}X _{total \, population}+\beta _{4}X _{total \, population \times median \, age} +\beta _{5}X _{per \, capita \, income \times median \, age}  \\)

<p><br></p>


Using this equation to find Chipotle-like regions, I produced the map bellow.

<figure>
     <img src="/images/Chipotle/ChipotlePlot.jpeg">
    <figcaption></figcaption>
</figure>



To summarize, California, Texas, New York and FLorida are the states where Chipotle new restuarants should/would likely open. The plots below show the top 10 States and Citues for potential new Chipotle restaurants. 

<figure>
     <img src="/images/Chipotle/topStates.jpeg">
    <figcaption></figcaption>
</figure>

<figure>
     <img src="/images/Chipotle/topCities.jpeg">
    <figcaption></figcaption>
</figure>


