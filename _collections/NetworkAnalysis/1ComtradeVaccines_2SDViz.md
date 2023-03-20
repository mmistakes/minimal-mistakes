---
layout: single
author_profile: true
title: "Assessing the global trade of vaccines using spatial data visualization and UN's Comtrade data"
categories: ['R','SpatialData']
shorttitle: "1_ComtradeVaccine_SDViz"
shortdesc: "Spatial data analysis "
Method: "Spatial data visualization using R's `ggplot2` package"
Case: "Global trade in vaccines - UN's Comtrade data"
Case_code: 'Comtrade_vaccines'
Datafrom: "United Nations' Comtrade data"
image: "https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/a909016743381ac7937d5b38aa8814800dd996d4/_collections/NetworkAnalysis/1_ComtradeVaccine/2_1_ComtradeVaccine_ExportPathsMap_all.png?raw=true"
excerpt: "Who export vaccines  to who? A spatial data Visualization using UN's Comtrade data and R's `ggplot2` package"
header:
  overlay_color: "#333"
permalink: /collections/NetworkAnalysis/1_ComtradeVaccinesSD
date: '2022-11-04'
output: 
  html_document:
    keep_md: true
header-includes:
- \usepackage{inputenc}
- \DeclareUnicodeCharacter{2076}{⁶}
editor_options: 
  markdown: 
    wrap: 72
---



# 2.1 Spatial visualization

In this post, we assess the global trade regarding vaccine supply
sources and international commerce using UN's Comtrade data.


```r
# The Comtrade data previously acquired
load(paste0(prodClass,'/comtrade_vaccine.RData'))
dt_list<-dt_list[c('2021','2020','2019','2018','2017','2016','2015',
                   '2010','2005','2000','1995','1990')]
```

In this .md, we assess the UN Comtrade's vaccine data acquired
previously by exploring spatial data analysis.

The database does not distinguish the type of vaccines, nor are they
deployed regarding the infections against which they are designed.

The variable selected for the analysis is the total exports in values
for vaccines, as the net weight values were not present for all
countries in the returned data. Also, the records for net weight can be
presented in the database in different identified quantities, comprising
different mass presentations (Kg, thousands of kilograms) to count in
the amount of units, which makes them not easily comparable.

Some inconsistencies in the data, such as missingness and mismatch among
exports and imports because of methodological limitations, are known,
but the Comtrade database is described as already treated for major
inconsistencies.

Also, as the database is about international trade, it does not account
for local consumption and does not reflect the actual production
estimates.

## Spatial data visualization: points and regions in the map

Comtrade's data does not comprise spatial data per se, but it can be
converted to spatial data and conduct visualization and analysis easily,
by attributing coordinates using the country-related (Reporter and
Partner) variables. There are some specific packages for spatial data
analysis. And certainly, ggplot2 is not the mainstream tool for such
analysis. But as the major and the largest R package for visualization,
it has some tools available to ease some basic spatial data
visualization.


```r
library(dplyr)
```

```
## 
## Attaching package: 'dplyr'
```

```
## The following objects are masked from 'package:stats':
## 
##     filter, lag
```

```
## The following objects are masked from 'package:base':
## 
##     intersect, setdiff, setequal, union
```

```r
library(ggplot2)
library(gtable)
library(gridExtra)
```

```
## 
## Attaching package: 'gridExtra'
```

```
## The following object is masked from 'package:dplyr':
## 
##     combine
```

```r
library(maps)
library(viridis)
```

```
## Loading required package: viridisLite
```

```
## 
## Attaching package: 'viridis'
```

```
## The following object is masked from 'package:maps':
## 
##     unemp
```

```r
library(classInt)
library(treemapify)
```

# Preparing the data

Thanks to the ubiquity of `ggplot2`, there are data and functions
available for creating basic visualizations for spatial data analysis.
We can use the `map_data` feature from `ggplot2` to draw the regions as
polygons without needing specialized packages.

The `map_data` enable us to access data for different levels of map data
with coordinates to draw regions (and/or sub-regions) polygons.

-   the dataset (named globe here) is a data frame extracted from
    `ggplot2` to enable to plot 'world' map, comprising coordinates to
    draw the world's regions (countries) polygons.


```r
globe <- map_data("world")
```

-   We prepare the Comtrade data to be compatible with the map data
    file. Fisrt, by making consolidations about different names used in
    thdatasets,ts


```r
comtrade_countries<-dt_list[['2021']]$Reporter%>%unique()
mapdata_countriews<-globe$region%>%unique()
comtrade_countries[!comtrade_countries%in%mapdata_countriews]
```

```
## [1] "Brunei Darussalam"   NA                    "Czechia"            
## [4] "Republic of Moldova" "Trinidad and Tobago"
```

```r
dt_list<-lapply(dt_list,function(dt){
  dt<-dt %>%
      mutate(Reporter = case_when((Reporter == 'Russian Federation') ~ 'Russia',
                             (Reporter == 'United Kingdom')~'UK',
                             (Reporter == "Republic of Korea") ~"South Korea",
                            (Reporter ==  "United States of America") ~'USA',
                            TRUE~Reporter),
             Partner=case_when((Partner=='Russian Federation') ~ 'Russia',
                             (Partner == 'United Kingdom')~'UK',
                            (Partner ==  "Republic of Korea") ~"South Korea",
                           ( Partner ==  "United States of America") ~'USA',
                           TRUE~Partner)
             )
  dt
})
```

-   And computing total trade per exporter:


```r
dt_list<-lapply(dt_list,function(dt){
  dt<-dt%>%group_by(Reporter)%>%mutate(TotalTrade=sum(primaryValue))%>%ungroup()
  dt
})
```

-   We merge the globe data frame with the comtrade data to prepare a
    spatial data.


```r
mapdata_list<-lapply(dt_list,function(dt){
  mapdata <- left_join(globe, dt, by=c("region"="Reporter"))
  mapdata
})
```

-   And also prepare another data frame in parallel, adding cities'
    locations for bubble map, by acquiring the `world.cities` data from
    `maps` package, making consolidation in some country names; and
    merging them with the comtrade acquired data


```r
# getting world.cities data ========== 
data(world.cities)
capital_cities<-world.cities[world.cities$capital==1,]
comtrade_countries<-dt_list[[1]]$Reporter%>%unique()
mapdata_countriews<-capital_cities$country.etc%>%unique()
comtrade_countries[!comtrade_countries%in%mapdata_countriews]
```

```
## [1] "Brunei Darussalam"   NA                    "Czechia"            
## [4] "Fiji"                "South Korea"         "Republic of Moldova"
## [7] "Montenegro"
```

```r
capital_cities<-capital_cities%>%mutate(country.etc2=country.etc)
capital_cities[capital_cities$country.etc=='Korea South','country.etc']<-'South Korea'
capdata_list<-lapply(dt_list,function(dt){
  capdata<-left_join(dt,capital_cities, by=c("Reporter"="country.etc"))
  capdata<-capdata%>%filter(!is.na(lat),!is.na(long))
})
```

-   And treat the resultant data frame to have vectors of trade from
    reporter to partner to draw curves illustrating the flow of
    materials in the trade.Wee treat also to present the partner's name.


```r
capdata_vec_list<-lapply(capdata_list,function(capdata){
  # get geolocation information for partner ===========
  capdata_vec<-left_join(capdata,capital_cities, by=c("Partner"="country.etc"))
})
```

# Visualization

We explore the data with three complementary visualization methods:

-   colored map;
-   bubble map;
-   simple bar plot;
-   and tree map;

## colored map according to total exportation

Note how a colored map is interesting, but cannot illustrate well
countries with small geographical areas.


```r
TotalExpList<-lapply(c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990"),function(x){
  mapdata<-mapdata_list[[x]]
  g<-mapdata%>%ggplot() +
  geom_map(aes(map_id = region, fill = TotalTrade), map = globe) +
  geom_polygon(data = mapdata, aes(x=long, y = lat, group = group), colour = 'black', 
  fill='grey', alpha=0.2) +
  expand_limits(x = globe$long, y = globe$lat) +
  scale_size_continuous(breaks = 10^(1:10),trans='log10') +
    scale_color_viridis(trans="log10",
                      breaks = 10^(1:10),direction=-1,option='cividis') +
  theme_void() + coord_fixed() +ggtitle(paste0('Exports of ',prodClass, ' (U$): ',x,''))
  g
})
names(TotalExpList)<-c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990")

plots_list2<-sapply(names(TotalExpList),function(x){
  p=TotalExpList[[x]]
  p+  theme(legend.position="none")+ggtitle(x)+
    theme(plot.title = element_text(size = 30, face = "bold")) 
},USE.NAMES = TRUE,simplify = FALSE)
legend = gtable_filter(
  ggplot_gtable(
    ggplot_build(
      TotalExpList[[1]]+
        theme(legend.position = "bottom",
              legend.text=element_text(size=25),
              legend.title = element_text(size=30)
      ))
    ), "guide-box")

p<-grid.arrange(arrangeGrob(grobs = plots_list2, ncol = 3),
             legend,
  nrow = 2,
             heights = c(9, 1)
)
```

![TotalExport_countMap](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/a909016743381ac7937d5b38aa8814800dd996d4/_collections/NetworkAnalysis/1_ComtradeVaccine/2_1_ComtradeVaccine_countMap_all.png?raw=true)

## bubble map with total exportation (values)


```r
BubleTotal<-lapply(c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990"),function(x){
  capdata<-capdata_list[[x]]
  g<-ggplot() +
  geom_polygon(data = globe, aes(x=long, y = lat, group = group), colour = 'black', fill = NA)+
  geom_point(data=capdata,aes(x=long,y=lat,color=TotalTrade,size=TotalTrade))+
  scale_size_continuous(range=c(1,13),trans="log10",
                        breaks = 10^(1:10)) +
  scale_color_viridis(guide='legend',trans="log10",
                      breaks = 10^(1:10),direction=-1,option='cividis') +
  theme_void() + coord_map() +
    ggtitle(paste0('Exports of ',prodClass, ' (U$): ',x,''))
  g
})
names(BubleTotal)<-c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990")
plots_list2<-sapply(names(BubleTotal),function(x){
  p=BubleTotal[[x]]
  p+  theme(legend.position="none")+ggtitle(x)+
    theme(plot.title = element_text(size = 30, face = "bold")) 
},USE.NAMES = TRUE,simplify = FALSE)
legend = gtable_filter(
  ggplot_gtable(
    ggplot_build(
      BubleTotal[[1]]+
        theme(legend.position = "bottom",
              legend.text=element_text(size=25),
              legend.title = element_text(size=30)
      ))
    ), "guide-box")

p<-grid.arrange(arrangeGrob(grobs = plots_list2, ncol = 3),
             legend,
  nrow = 2,
             heights = c(9, 1)
)
```
![TotalExport_bubbleMap](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/75c741ae6fc827c49360c55c411861532e9da3ab/_collections/NetworkAnalysis/1_ComtradeVaccine/2_1_ComtradeVaccine_BubbleMap_all.png?raw=true)

## Simple bar plots

In fact, basic bar plots can already illustrate the above, although
without the information about location being actually used.


```r
Barplot_l<-lapply(c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990"),function(x){
  dt<-dt_list[[x]]
  M <- max(dt$TotalTrade)
  a<-dt%>%filter(!is.na(Reporter))%>%select(Reporter,TotalTrade)%>%unique()
  Ma<-sum(a$TotalTrade)
  g<-dt%>%filter(!is.na(Reporter))%>%select(Reporter,TotalTrade)%>%unique()%>%
  arrange(desc(TotalTrade))%>%head(20)%>%
    mutate(cum_TotalTrade = cumsum(TotalTrade)/M) %>%
  ggplot(aes(x=reorder(Reporter,TotalTrade),y=TotalTrade))+
    geom_bar(stat="identity")+
    geom_line(mapping=aes(y=cum_TotalTrade*M,group=1))+
    scale_y_continuous(limits = c(0,Ma),
      sec.axis = sec_axis(~ ./Ma, 
                          labels = scales::percent,
                          name = "Cummulative percentage"))+
    coord_flip()+
  labs(title=paste0('Top 10 Exporters in total traded (U$) - ',x),x='Country')
})
names(Barplot_l)<-c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990")
plots_list2<-sapply(names(Barplot_l),function(x){
  p=Barplot_l[[x]]
  p+  theme(legend.position="none")+ggtitle(x)+
    theme(plot.title = element_text(size = 14, face = "bold")) 
},USE.NAMES = TRUE,simplify = FALSE)
p<-grid.arrange(arrangeGrob(grobs = plots_list2, ncol = 3))
```
![TotalExport_barPlot](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/75c741ae6fc827c49360c55c411861532e9da3ab/_collections/NetworkAnalysis/1_ComtradeVaccine/2_1_ComtradeVaccine_barplot_all.png?raw=true)

And note how the spatial data visualization essentially intends to show
the same information of the bar plot, but has the geographical
information added, which brings is interesting in some sense, but yet
harder to compare.

-   we are ignoring the 1990 data, as apparently, the amount of
    countries reporting the data was limited in that period.
-   we cannot make strict comparisons, as reporting methodologies can be
    different across countries, and it is even known such methodologies
    can even change in time in the same country.
-   the major exporters were almost stable until 2018
-   Looking at Pareto plots and tree maps, we see the major players in
    the global trade related to vaccines changed from 2018 to 2021
    because Covid2019 crisis and what we can call as the entering of new
    players, but still the 5 bigger exporters handle 80% of all global
    trade.

## Tree map

Tree map is another alternative to show the same information, also
without considering spatial/location related information.


```r
# Tree map =============
TreeMapList<-lapply(c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990"),function(x){
  dt<-dt_list[[x]]
  g<-dt%>%filter(!is.na(Reporter))%>%select(Reporter,TotalTrade)%>%unique()%>%
  arrange(desc(TotalTrade))%>%
  ggplot(aes(area = TotalTrade, fill = Reporter,label = paste(Reporter, round(TotalTrade/1000000), sep = "\n"))) +
  geom_treemap()+
  geom_treemap_text(grow = TRUE)+
  theme(legend.position = "none")+
    labs(title=paste0('Total Export (10⁶U$) - ',x))
  g
})
names(TreeMapList)<-c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990")
plots_list2<-sapply(names(TreeMapList),function(x){
  p=TreeMapList[[x]]
  p+  theme(legend.position="none")+ggtitle(x)+
    theme(plot.title = element_text(size = 30, face = "bold")) 
},USE.NAMES = TRUE,simplify = FALSE)
legend = gtable_filter(
  ggplot_gtable(
    ggplot_build(
      TreeMapList[[1]]+
        theme(legend.position = "right",
              legend.text=element_text(size=18),
              legend.title = element_text(size=20),
              legend.key.size = unit(0.2, "cm")
      )+guides(fill=guide_legend(ncol =1))
      )
    ), "guide-box")

p<-grid.arrange(arrangeGrob(grobs = plots_list2, ncol = 3),
             legend,
  ncol = 2,
             widths = c(9, 1)
)
```
![TotalExport_TreeMap](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/75c741ae6fc827c49360c55c411861532e9da3ab/_collections/NetworkAnalysis/1_ComtradeVaccine/2_1_ComtradeVaccine_TreeMap_all.png?raw=true)

Before the Covid Outbreak, the vaccine market was led by companies like
Merck (US), GlaxoSmithCline GSK (mostly manufacturing at Belgium) and
Sanofi (France, US, Canada, Mexico, China, India). Now, Pfizer escalated
their participation in the vaccines world (Sagonowky 2022).

Note the counts above do not reflect the manufacturing capability of
each country, as the attendance of local demand is not included in the
data, just exports. So, it highlights small countries with small (or at
least not big) population which are set as strategical for global
manufacturers, than those targeting local demand.

The Ireland participation is detached as it set itself as strategic for
implantation of manufacturing plants of foreign-owned enterprises
comprising global top 10 biopharmaceutical companies like Pfizer, Eli
Lilly, WuXi, Janssen, MSD, Sanofi, BMS, Alexion, and Allergan.

The major change is the increase of China's participation, which is
based mainly because Sinovac (China) outranking Moderna and several
other previous important players.

The USA participation is mostly stable on time. Pre-covid, such
contribution were because major players like Merk and Sanofi. Currently,
they have been outranked by Pfizer, which also has manufacturing plants
in the US, thought also in Germany, Belgium, Ireland, and Croatia. And
also Moderna, another relevant player in providing solutions for Covid
Outbreak, is a US company, and manufactures vaccines in the US, thought
partnered with Lonza with sites in US and Switzerland; Recipharm, from
France, and Rovi from Spain to offer vaccines. The Germany's
participation is because Pfizer and Moderna's partner BioNTech, the mRNA
technology innovator, is in Germany. AstraZeneca used manufacturing
facilities across Europe, North, Central and South America, Asia and
Australia

# Plotting trade connections

Trade is not just about the total amount, but also, or more, about the
interactions. Here, beyond the information on the exported amount/value,
it is also about connections, about who exports to who.

The below figure confirms how the world vaccine trade is really
interconnected, but yet does not bring clarity on critical supply
sources and bottlenecks which can make, for example, about how
susceptible is the supply chain for disruption.


```r
library(ggnewscale)
plots_list<-(lapply(c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990"),function(x){
  capdata_vec<-capdata_vec_list[[x]]%>%filter(!is.na(long.x),!is.na(lat.x))
  g<-ggplot() +
  geom_polygon(data = globe, aes(x=long, y = lat, group = group), colour = 'black', fill = NA)+
  geom_curve(data = capdata_vec, aes(x = long.x,    y = lat.x, 
                               xend = long.y, yend = lat.y,
                               linewidth=primaryValue,color=primaryValue#,color=NetWgt_cat
                               ),alpha=0.3,
                              #color="blue",
             show.legend=c(linewidth=TRUE,color=TRUE))+
    scale_size_continuous(range=c(0.01,1),trans="log10",limits=c(1,10^9),
                        breaks = 10^(c(1,3,5,7,9))) +
  scale_color_viridis(guide='legend',trans="log10",limits=c(1,10^9),
                      breaks = 10^(c(1,3,5,7,9)),direction=-1,option="mako") +
    new_scale("size") +new_scale_color()+
  geom_point(data=capdata_vec,aes(x=long.x,y=lat.x,
                                  color=TotalTrade,
                                  size=TotalTrade),show.legend=c(size=TRUE,color=TRUE))+
    scale_size_continuous(range=c(1,13),trans="log10",limits=c(1,10^10),
                        breaks = 10^(1:10))+
  scale_color_viridis(guide='legend',trans="log10",limits=c(1,10^10),
                      breaks = 10^(1:10),direction=-1,option='cividis') +
  #scale_size_continuous(range=c(1,9),trans="log10") +
  #scale_color_viridis(trans="log10") +
  coord_equal()+
    ggtitle(paste0('Exports of ',prodClass, '(U$): ',x,''))
  g
}))
names(plots_list)<-c("2021","2020","2019","2018","2017","2016","2015",
         "2010","2005","2000","1995", "1990")

library(gtable)
library(gridExtra)
plots_list2<-sapply(names(plots_list),function(x){
  p=plots_list[[x]]
  p+  theme(legend.position="none")+ggtitle(x)+
    theme(plot.title = element_text(size = 30, face = "bold")) 
},USE.NAMES = TRUE,simplify = FALSE)
legend = gtable_filter(
  ggplot_gtable(
    ggplot_build(
      plots_list[[1]]+
        theme(legend.position = "bottom",
              legend.text=element_text(size=25),
              legend.title = element_text(size=30)
      ))
    ), "guide-box")
p<-grid.arrange(arrangeGrob(grobs = plots_list2, ncol = 3),
             legend,
  nrow = 2,
             heights = c(9, 1)
)
```
![TotalExport_Paths](https://github.com/TomoeGusberti/tomoegusberti.github.io/blob/a909016743381ac7937d5b38aa8814800dd996d4/_collections/NetworkAnalysis/1_ComtradeVaccine/2_1_ComtradeVaccine_ExportPathsMap_all.png?raw=true)

# Conclusion remarks

This markdown has illustrated the value of spatial data, displaying both
the count information along with the localization and geographical
details, then connecting them to show trade routes. This illustration
gave an example of the capability of this type of visualization, which
goes beyond bar graphs or treemaps, and how it can be assembled using
R's ggplot2 package.

But when trying to describe the evolution in time, year-by-year
visualizations of any kind are limited. And abridging measures are more
beneficial. Network analysis is a useful tool to measure the intricacy
of the global trade network and its progression over time, a matter we
will evaluate more deeply in the upcoming markdown.

# References

D. Kahle and H. Wickham. ggmap: Spatial Visualization with ggplot2. The
R Journal, 5(1), 144-161. URL
<http://journal.r-project.org/archive/2013-1/kahle-wickham.pdf>

Laker, Benjamin. Global Supply Chain Crisis: Lessons For Leaders.
Forbes, jan 11 2023. available at:
<https://www.forbes.com/sites/benjaminlaker/2023/01/11/global-supply-chain-crisis-lessons-for-leaders/?sh=20f96e534a8d>

Shiffling, Sarah; Kanellos N.V. 5 challenges facing global supply
chains. World Economic Forum. Sep 7, 2022. available at:
<https://www.weforum.org/agenda/2022/09/5-challenges-global-supply-chains-trade>

Sagonowky, E.; Liu, A.; Kansteiner, F.; Becker, Z.; Dunleavy, K. The top
10 vaccine companies worldwide. Fierce Pharma Special Report- Vaccine
Players. October 17, 2022. Available at:
<https://www.fiercepharma.comSanofi/pharma/top-10-vaccine-companies-worldwide>

Hannah Finch. Where the Moderna vaccine is being made: The Moderna
vaccine is the third Covid-19 vaccine available in the UK and has been
instrumental in the booster programme. BusinessLive. 29 MAR 2021.
available at:
<https://www.business-live.co.uk/technology/moderna-vaccine-being-made-20278092>

At a glance. GSK.
<https://be.gsk.com/en-be/company/at-a-glance/#>:\~:text=Belgium%20is%20the%20heart%20of,industrial%20network%20of%20vaccines%20worldwide.

Vaccines. Merk. <https://www.merck.com/research/vaccines/>

Making vaccines for public health. Sanofi.
<https://www.sanofi.com/en/your-health/vaccines/production>

Pushing boundaries to deliver COVID-19 vaccine across the Globe:
Delivering COVID-19 vaccine part 2. AstraZeneca.
<https://www.astrazeneca.com/what-science-can-do/topics/technologies/pushing-boundaries-to-deliver-covid-19-vaccine-accross-the-globe.html>

Department of Business, Enterprise and Innovation. Government of
Ireland. Focus on Biopharmachem. August 2020
<https://enterprise.gov.ie/en/publications/publication-files/focus-on-biopharmachem-2020.pdf>
