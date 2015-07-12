---
layout: post
title: "Where will the next Chipotle be?"
modified:
excerpt: "Author analyses the demographics of Chipotle locations in America."
tags: [R, data mining, analytics]
modified: 2015-06-28
comments: true
---

A new Chipotle Restaurant opened in my neighborhood, and while I was enjoying a delicious chicken bowl, I began wondering who was Chipotle's primary consumer. In addition to this, I decided to plot a forecast for those folks out there looking to buy a house but not knowing if they will have a Chipotle restuarant close to them in the near future is currently holding them back.

<p><br></p>
The first part of this project consisted of getting every single Chipotle location in America. After my google-fu failed to take me to a site with every Chipotle restaurant, I wrote a scrapper to check each and every every zip code in America on Chipotle's website. There are about 60k zip codes in the United States, so this took a while but in the end I discovered there are 1,140 Chipotle Restaurants in America!

<p><br></p>
I used the choroplethrZip package (<a href="https://github.com/arilamstein/choroplethrZip">GitHub link</a>) to get demographic information at a Zip Code level. This data is from 2013, but for simplicity I assumed not many new restaurants opened since then (I know, BIG flaw).
<p><br></p>
Once I organzied my data I studied the demographic variable. As the histogram below shows, there are more Chipotle resturants in Zip Codes where there is a predominance of white people. The graph on the right is not limited to Zip Codes with a Chipotle restuarant. Comparing them side by side we can see how the reason why there are more restaurants in Zip Codes where the white population is the majority may be simply because there are more Zip Codes where the white population is a majority.

<figure>
	<a href="/images/Chipotle/ChipotleDemo.jpeg"><img src="/images/Chipotle/demographic.jpeg"></a>
	<figcaption></figcaption>
</figure>

Another variable I wanted to test concerned income. Meal prices ranging between $8 and $10 is affordable but not necesarily cheap. The histogram below shows that me majority of the restaurants are located in Zip Codes where the average income ranges between $30k-$50k.  Just like with demographics, the income variable is not too surprising. As shown in the histogram below, the majority of the population in the United States falls between the $20k - $40k per capita income range.  

<figure>
	<a href="/images/Chipotle/America_income.jpeg"><img src="/images/Chipotle/Per_capita_income.jpeg"></a>
	<figcaption></figcaption>
</figure>

Another variable I considered was age. The median age of Chipotle consumers is 37. Four years shy 41, the national median age. Just like the previous two graphics, the graph below shows how the average age of Zip Codes with a Chipotle restaurant is a sample of the national data set. 

<figure>
	<a href="/images/Chipotle/Age_histogram.jpeg"><img src="/images/Chipotle/Age_histogram.jpeg"></a>
	<figcaption></figcaption>
</figure>

The last variable I looked at was population. The average population per Zip Code in the United States is 9,517 and the average population for Zip Codes with a Chipotle restaurant is 32,470 and the minimum population in a Zip Code with a restaurant is 21,140. The graph below shows how regions with a high population are selected to have a Chipotle restuarants. Obviously.

<figure>
	<a href="/images/Chipotle/Population.jpeg"><img src="/images/Chipotle/Population.jpeg"></a>
	<figcaption></figcaption>
</figure>


Once I understood the variables, I decided to run a logistic regression to obtain the probabilty of having a Chipotle store. The probability \\( \pi \\) is determined by the following equation:

\\(\pi(x)= \frac{1}{1+e^{-\beta X}} \\)

where:

\\( \beta X = \beta _{0} +\beta _{1}X _{per \, capita \, income} + \beta _{2}X _{median \, age}+\beta _{3}X _{total \, population}+\beta _{4}X _{total \, population \times median \, age} +\beta _{5}X _{per \, capita \, income \times median \, age}  \\)



<figure>
     <img src="/images/Chipotle/ChipotlePlot.jpeg">
    <figcaption></figcaption>
</figure>







