---
title: "Phat Maps"
author: matt_gregory
comments: yes
date: '2016-06-22'
modified: 2016-06-22
layout: post
excerpt: "Mapping obesity in the UK"
published: true
status: publish
tags:
- Mapping
- Maps
- R
categories: Rstats
---
 

 
 
There be dragons here! I've never drawn a map in R, let's change that by using R bloggers as a [guide](http://www.r-bloggers.com/visualizing-obesity-across-united-states-by-using-data-from-wikipedia/). This post introduces some basic web-scraping to get some relevant data that can then be visualised on a map of the United Kingdom. Obesity in the UK is a significant health concern and we map an aspect of it here.
 
First we start by loading the relevant packages. See the session info at the end for full details. Perhaps you can guess the packages, given that we are Hadley fans on this [blog](http://www.machinegurning.com/rstats/hadley-effect/)?
 

 
## The Data (Get and Clean)
We read the data in and discover the exact selector we need by using the excellent [Selector Gadget](http://selectorgadget.com/) (see the [tutorial here](http://flukeout.github.io/)). We easily extract the precise piece of the HTML document we are interested in, the table of data on the wikipedia page. We then tidy up the variable names as we recognise that the square parantheses can cause issues.
 
Remember read the chaining `%>%` as "then", to help the code to be more readable. 
 

{% highlight r %}
obesity <- read_html("https://en.wikipedia.org/wiki/Obesity_in_the_United_Kingdom")
 
obesity <- obesity %>%
     html_nodes("table") %>%
     .[[1]] %>%
     html_table(fill = T)
 
#Rename variables using base function
names(obesity) <- make.names(names(obesity))  #  make syntactically valid names
names(obesity)
{% endhighlight %}



{% highlight text %}
## [1] "Local.Authority"                                     
## [2] "County"                                              
## [3] "Level.of.overweight.or.obese.people..BMI.25..45..46."
{% endhighlight %}
 
These names are still pretty horrendous, let's make them easier to work with.
 

{% highlight r %}
obesity <- obesity %>%
  rename(LA = Local.Authority,
         BMI_obese = Level.of.overweight.or.obese.people..BMI.25..45..46.)  #  use names(obesity), copy and paste, or subset but needs to be unquoted
str(obesity)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	10 obs. of  3 variables:
##  $ LA       : chr  "Copeland" "Doncaster" "East Lindsey" "Ryedale" ...
##  $ County   : chr  "Cumbria" "South Yorkshire" "Lincolnshire" "North Yorkshire" ...
##  $ BMI_obese: chr  "75.9%" "74.4%" "73.8%" "73.7%" ...
{% endhighlight %}
We need to sort out the `BMI_obese` and correct to numeric class after removing the percentage sign.
 

{% highlight r %}
obesity$BMI_obese <- lapply(X = obesity$BMI_obese,
                            FUN = gsub, pattern = "%", replacement = "") %>%
  as.numeric()
 
str(obesity)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	10 obs. of  3 variables:
##  $ LA       : chr  "Copeland" "Doncaster" "East Lindsey" "Ryedale" ...
##  $ County   : chr  "Cumbria" "South Yorkshire" "Lincolnshire" "North Yorkshire" ...
##  $ BMI_obese: num  75.9 74.4 73.8 73.7 73.4 72.9 72.8 72.5 72.5 72.5
{% endhighlight %}
 
Much bettter! Now we need some map polygons to plot this data on.
 
## Maps
We need a few tools:

* Some way to handle the polygons which are used to draw lines of a map (the sp package)
* Data describing the position of these polygons
* A hierarchy of these polygon shapes which describe interesting geographical boundaries, in our case we are interested in the [County level](http://www.gadm.org/country).
 
{% highlight r %}
library(sp)  #  Allows us to plot the spatial polygon that the GADM data is stored as
mapdata <- "data/2016-06-22-GBR_adm2.rds"
gadm <- readRDS(mapdata)
{% endhighlight %}
 
According the GADM website we are interested in Level 2 UK map data. Looking at the `names(gadm)` it is obvious that the `NAME_2` likely contains our level 2 data, or county level identifiers.
 
{% highlight r %}
head(gadm$NAME_2)
{% endhighlight %}

{% highlight text %}
## [1] "Barking and Dagenham"         "Bath and North East Somerset"
## [3] "Bedfordshire"                 "Berkshire"                   
## [5] "Bexley"                       "Blackburn with Darwen"
{% endhighlight %}

{% highlight r %}
length(gadm$NAME_2)
{% endhighlight %}



{% highlight text %}
## [1] 192
{% endhighlight %}



{% highlight r %}
#plot(gadm)  #  county level plot
{% endhighlight %}
 
So we can draw a map but we want to identify these counties in the UK that have the Local Authorities with the highest percentage of its population with a BMI greater than or equal to 25.
 
Now we need to find the `OBJECTID` or row of the Counties that harbour these LAs with high obesity rates. I refer back to an earlier post and remind myself how to use [lookup table like strategies](http://www.machinegurning.com/rstats/lookup_tables/). The `gadm` object looks to be of S4 class thus we can extract slots or fields using the special `@` operator.
 

{% highlight r %}
counties <- gadm@data$NAME_2  #  hold this info
#counties %in% obesity$County  #  value matching
{% endhighlight %}
 
Now that we know the appropriate rows that were positive for Counties with high obesity levels in at least one LA, we can incorporate this information into our colour vector.
 

{% highlight r %}
myColours <- ifelse(counties %in% obesity$County == 0, 
        "forestgreen",
        "red")  #  matches get coloured red
{% endhighlight %}
 
## The Plot
Now when we plot the UK map the appropriate Counties will be coloured red. Thus we've made use of the County data how do we make use of the more obscure Local Authority data? That's something I intend to look into.
 

{% highlight r %}
plot(gadm, col = myColours, border = 'grey')
{% endhighlight %}

![plot of chunk 2016-06-22-fat_map](/figures/2016-06-22-fat_map-1.svg)
 
## Conclusion
I demonstrated basic webscraping, getting and cleaning data and then handling a large `.rds` file type for final map production with highlights at the County level. The plotting itself takes almost no time, getting the data and preparing it is the time consuming part. That sounds like Data Science to me!
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.2.3 (2015-12-10)
## Platform: x86_64-w64-mingw32/x64 (64-bit)
## Running under: Windows >= 8 x64 (build 9200)
## 
## locale:
## [1] LC_COLLATE=English_United Kingdom.1252 
## [2] LC_CTYPE=English_United Kingdom.1252   
## [3] LC_MONETARY=English_United Kingdom.1252
## [4] LC_NUMERIC=C                           
## [5] LC_TIME=English_United Kingdom.1252    
## 
## attached base packages:
## [1] stats     graphics  grDevices utils     datasets  methods   base     
## 
## other attached packages:
##  [1] sp_1.2-3        scales_0.4.0    rvest_0.3.1     xml2_0.1.2     
##  [5] purrr_0.2.1     ggplot2_2.0.0   broom_0.4.0     magrittr_1.5   
##  [9] dplyr_0.4.3     testthat_0.11.0 knitr_1.12     
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.4      formatR_1.2.1    plyr_1.8.3       tools_3.2.3     
##  [5] digest_0.6.9     evaluate_0.8     memoise_0.2.1    nlme_3.1-122    
##  [9] gtable_0.2.0     lattice_0.20-33  psych_1.5.8      DBI_0.4-1       
## [13] curl_0.9.4       yaml_2.1.13      parallel_3.2.3   stringr_1.0.0   
## [17] httr_1.0.0       grid_3.2.3       R6_2.1.2         XML_3.98-1.3    
## [21] rmarkdown_0.9.2  selectr_0.2-3    tidyr_0.4.0      reshape2_1.4.1  
## [25] htmltools_0.3    rsconnect_0.4.3  assertthat_0.1   mnormt_1.5-4    
## [29] colorspace_1.2-6 labeling_0.3     stringi_1.0-1    lazyeval_0.1.10 
## [33] munsell_0.4.3    crayon_1.3.1
{% endhighlight %}
 
