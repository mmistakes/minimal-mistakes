---
layout: single
author_profile: true
title: "Assessment of Vaccine Networks inside continents"
categories: ['R','igraph','graphAnalysis']
shorttitle: "1_ComtradeVaccine_SDViz"
shortdesc: "ContinentNetwork"
Method: "graph analysis using igraph"
Case: "Global trade in vaccines - UN's Comtrade data"
Case_code: 'Comtrade_vaccines'
Datafrom: "United Nations' Comtrade data"
image: ""
excerpt: "How intracontinental vaccine trade are structured? A graph analysis using UN's Comtrade data and R's `igraph` package"
header:
  overlay_color: "#333"
permalink: /collections/NetworkAnalysis/7_ComtradeVaccinesCont
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



# 7. Data analysis: Assessment of continents

This post advance in the analysis of the global trade regarding vaccine supply sources and international commerce using UN Comtrade data, exploring it using Network visualization and Network Analysis.

The Network analysis gives us some ways to:
- identify central players;
- identify those countries in the periphery of the network, interacting with fewer partners;
Which, in turn, enables discussions like:
- Identification of critical supply sources to focus the analysis for the assessment of the influence of geopolitical uncertainty, labor unrest; energy shortages; extreme weather;
- and how such sources evolved in the time
- those destine which appear to have no additional buffer to adjust inventories in case of any shortage regarding one supplier, though the data does not distinguish specific vaccines or sub types…
- The more distant a product is manufactured from its destinations, the more susceptible it is to a supply chain disruption.


```r
# The Comtrade data previously acquired
load(paste0('./vaccine','/comtrade_vaccine.RData'))
# we ignore 2022, as just small part of countries show data (may 2023)
# we also ignore 1985 and 1980, as no data is returned
time_aq=c(2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,
           2010,2009,2007,2005,2003,2001,1999,1997,1995,1993,1991,1990,1989)
dt_list<-dt_list[as.character(time_aq)]
# treating for compatibility with maps
dt_list<-sapply(names(dt_list),function(x){
  dt<-dt_list[[x]]
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
},USE.NAMES = TRUE,simplify = FALSE)
# getting igraph objects
net_list<-sapply(dt_list[!names(dt_list)=="1980"],function(dt){
  #getting igraph object ============
  net_c <- graph_from_data_frame(
    d=dt%>%select(Reporter,Partner,primaryValue)%>%
      rename(weight=primaryValue)%>%
      filter(!is.na(weight),!is.na(Partner),!is.na(Reporter))
    , directed=T) 
  #Reversion to convert primary value to 'distances': we want high primaryValue, closer the nodes/countries
  #(+0.001 because layout does not accept weight zero)
  E(net_c)$weight <- max(E(net_c)$weight) - E(net_c)$weight+0.001
  net_c
},USE.NAMES = TRUE,simplify = FALSE)
```

In this section,we:
- store the graph-measures in the time
- and get some plots for 2018 and 2021, where we expect major changes in the global trade panorama

In network analysis, we have two major tasks: 
- identification of communities
- and assessment of graph-related measures. which, in turn, can:
  - measure/summarize a property of all the network;
  - or measure/summarize the centrality or relevance of each entity/member in the network.

# Evolution of Components and communities inside continents
Considering the low reciprocity in most continents, let's check how the countries connect each other forming components inside continents.

```r
library(countrycode)
net_list<-sapply(net_list,function(net_c){
  V(net_c)$continent <- countrycode(sourcevar = V(net_c)$name,
                              origin = "country.name",
                              destination = "continent")
  V(net_c)$continent[is.na(V(net_c)$continent)]<-'other'
  return(net_c)
},USE.NAMES=TRUE,simplify=FALSE)
```

```
## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Belgium-Luxembourg

## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Belgium-Luxembourg

## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Belgium-Luxembourg

## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Belgium-Luxembourg

## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Belgium-Luxembourg

## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Belgium-Luxembourg
```

### community detection
There are several community detection algorithms. 

considering we are dealing with directed and weighted graphs, the community detection algorithms applicable are Edge-betweenness cluster edge betweenness and InfoMAP cluster infomap - *ref Luke 2015

#### edge betweeness cluster
The edge betweenness cluster allows the identification of densely connected modules which are sparsely connected to other modules.


```r
net_betwcl_c<-lapply(names(net_list),function(x){
  net_c<-net_list[[x]]
  E(net_c)$weight<-max(E(net_c)$weight)-E(net_c)$weight+.001
  #detecting communities ============
  cl_edgB<-cluster_edge_betweenness(net_c)
  
  Vdf<-data.frame(continent='World',
             year=as.numeric(x),
             nClusters=max(membership(cl_edgB)),
             method='Edge Betweeness'
             )
  return(Vdf)
})%>%bind_rows()
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(net_c): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```r
net_betwcl_continents<-lapply(names(net_list),function(x){
  net_c<-net_list[[x]]
  lapply(c("Americas","Europe" , "Asia","Africa","Oceania" ),function(c){
    g_sub <- induced_subgraph(net_c, V(net_c)$name[V(net_c)$continent==c])
    E(g_sub)$weight<-max(E(g_sub)$weight)-E(g_sub)$weight+.001
    #detecting communities ============
    cl_edgB<-cluster_edge_betweenness(g_sub)
    Vdf<-data.frame(continent=c,
                    year=as.numeric(x),
               nClusters=max(unlist(membership(cl_edgB)),na.rm = TRUE),
               method='Edge Betweeness'
               )
    return(Vdf)
  })%>%bind_rows()
})%>%bind_rows()
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in max(E(g_sub)$weight): no non-missing arguments to max; returning -Inf
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in max(E(g_sub)$weight): no non-missing arguments to max; returning -Inf
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```
## Warning in max(E(g_sub)$weight): no non-missing arguments to max; returning -Inf
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:492 : Membership vector will be selected based
## on the highest modularity score.
```

```
## Warning in cluster_edge_betweenness(g_sub): At
## core/community/edge_betweenness.c:497 : Modularity calculation with weighted
## edge betweenness community detection might not make sense -- modularity treats
## edge weights as similarities while edge betwenness treats them as distances.
```

```r
net_betwcl_continents
```

```
##     continent year nClusters          method
## 1    Americas 2021         2 Edge Betweeness
## 2      Europe 2021         1 Edge Betweeness
## 3        Asia 2021        16 Edge Betweeness
## 4      Africa 2021        30 Edge Betweeness
## 5     Oceania 2021         4 Edge Betweeness
## 6    Americas 2020        10 Edge Betweeness
## 7      Europe 2020         1 Edge Betweeness
## 8        Asia 2020        11 Edge Betweeness
## 9      Africa 2020        29 Edge Betweeness
## 10    Oceania 2020         3 Edge Betweeness
## 11   Americas 2019         4 Edge Betweeness
## 12     Europe 2019         2 Edge Betweeness
## 13       Asia 2019         2 Edge Betweeness
## 14     Africa 2019        25 Edge Betweeness
## 15    Oceania 2019         5 Edge Betweeness
## 16   Americas 2018        11 Edge Betweeness
## 17     Europe 2018         2 Edge Betweeness
## 18       Asia 2018         6 Edge Betweeness
## 19     Africa 2018        20 Edge Betweeness
## 20    Oceania 2018         2 Edge Betweeness
## 21   Americas 2017        15 Edge Betweeness
## 22     Europe 2017         2 Edge Betweeness
## 23       Asia 2017         9 Edge Betweeness
## 24     Africa 2017        11 Edge Betweeness
## 25    Oceania 2017         2 Edge Betweeness
## 26   Americas 2016        14 Edge Betweeness
## 27     Europe 2016         2 Edge Betweeness
## 28       Asia 2016         8 Edge Betweeness
## 29     Africa 2016        30 Edge Betweeness
## 30    Oceania 2016         4 Edge Betweeness
## 31   Americas 2015        14 Edge Betweeness
## 32     Europe 2015         6 Edge Betweeness
## 33       Asia 2015        12 Edge Betweeness
## 34     Africa 2015        16 Edge Betweeness
## 35    Oceania 2015         1 Edge Betweeness
## 36   Americas 2014         9 Edge Betweeness
## 37     Europe 2014         1 Edge Betweeness
## 38       Asia 2014         7 Edge Betweeness
## 39     Africa 2014        32 Edge Betweeness
## 40    Oceania 2014         1 Edge Betweeness
## 41   Americas 2013        16 Edge Betweeness
## 42     Europe 2013         1 Edge Betweeness
## 43       Asia 2013         3 Edge Betweeness
## 44     Africa 2013        40 Edge Betweeness
## 45    Oceania 2013         6 Edge Betweeness
## 46   Americas 2012        15 Edge Betweeness
## 47     Europe 2012         3 Edge Betweeness
## 48       Asia 2012        17 Edge Betweeness
## 49     Africa 2012        41 Edge Betweeness
## 50    Oceania 2012         6 Edge Betweeness
## 51   Americas 2011         3 Edge Betweeness
## 52     Europe 2011         3 Edge Betweeness
## 53       Asia 2011        14 Edge Betweeness
## 54     Africa 2011        41 Edge Betweeness
## 55    Oceania 2011         4 Edge Betweeness
## 56   Americas 2010        15 Edge Betweeness
## 57     Europe 2010         1 Edge Betweeness
## 58       Asia 2010        13 Edge Betweeness
## 59     Africa 2010        23 Edge Betweeness
## 60    Oceania 2010         6 Edge Betweeness
## 61   Americas 2009         2 Edge Betweeness
## 62     Europe 2009         1 Edge Betweeness
## 63       Asia 2009        17 Edge Betweeness
## 64     Africa 2009        14 Edge Betweeness
## 65    Oceania 2009         5 Edge Betweeness
## 66   Americas 2007        21 Edge Betweeness
## 67     Europe 2007         2 Edge Betweeness
## 68       Asia 2007        10 Edge Betweeness
## 69     Africa 2007        35 Edge Betweeness
## 70    Oceania 2007         6 Edge Betweeness
## 71   Americas 2005        20 Edge Betweeness
## 72     Europe 2005         2 Edge Betweeness
## 73       Asia 2005         3 Edge Betweeness
## 74     Africa 2005        15 Edge Betweeness
## 75    Oceania 2005         6 Edge Betweeness
## 76   Americas 2003         5 Edge Betweeness
## 77     Europe 2003         2 Edge Betweeness
## 78       Asia 2003        13 Edge Betweeness
## 79     Africa 2003        29 Edge Betweeness
## 80    Oceania 2003         6 Edge Betweeness
## 81   Americas 2001        13 Edge Betweeness
## 82     Europe 2001         1 Edge Betweeness
## 83       Asia 2001         6 Edge Betweeness
## 84     Africa 2001        12 Edge Betweeness
## 85    Oceania 2001         6 Edge Betweeness
## 86   Americas 1999         5 Edge Betweeness
## 87     Europe 1999         2 Edge Betweeness
## 88       Asia 1999        21 Edge Betweeness
## 89     Africa 1999        34 Edge Betweeness
## 90    Oceania 1999         6 Edge Betweeness
## 91   Americas 1997         5 Edge Betweeness
## 92     Europe 1997         2 Edge Betweeness
## 93       Asia 1997        10 Edge Betweeness
## 94     Africa 1997        34 Edge Betweeness
## 95    Oceania 1997         6 Edge Betweeness
## 96   Americas 1995         9 Edge Betweeness
## 97     Europe 1995        14 Edge Betweeness
## 98       Asia 1995        31 Edge Betweeness
## 99     Africa 1995        39 Edge Betweeness
## 100   Oceania 1995         3 Edge Betweeness
## 101  Americas 1993         5 Edge Betweeness
## 102    Europe 1993        13 Edge Betweeness
## 103      Asia 1993        21 Edge Betweeness
## 104    Africa 1993        42 Edge Betweeness
## 105   Oceania 1993         7 Edge Betweeness
## 106  Americas 1991         5 Edge Betweeness
## 107    Europe 1991         5 Edge Betweeness
## 108      Asia 1991        23 Edge Betweeness
## 109    Africa 1991        35 Edge Betweeness
## 110   Oceania 1991         3 Edge Betweeness
## 111  Americas 1990        11 Edge Betweeness
## 112    Europe 1990         5 Edge Betweeness
## 113      Asia 1990        22 Edge Betweeness
## 114    Africa 1990        37 Edge Betweeness
## 115   Oceania 1990         3 Edge Betweeness
## 116  Americas 1989         6 Edge Betweeness
## 117    Europe 1989         4 Edge Betweeness
## 118      Asia 1989        25 Edge Betweeness
## 119    Africa 1989        35 Edge Betweeness
## 120   Oceania 1989         6 Edge Betweeness
```


```r
g<-rbind(net_betwcl_continents,net_betwcl_c)%>%ggplot(aes(x=year,y=nClusters,color=continent))+
  geom_line()+ geom_point()+theme_economist()+theme(legend.position="right",
        plot.title = element_text(size=12),
            legend.text = element_text(size=10),
            legend.title = element_text(size=12),
            legend.key.size = unit(0.5, 'cm')
            )+  ggtitle('Edge Betweeness')
ggsave(g,file=paste0(prodClass,'/4_',prodClass,'_EdgeBetw_Contcounts','.png'),width=13,height=5)
plot(g)
```

![](2_ComtradeVaccines_7NtwkA_Continents_files/figure-html/unnamed-chunk-4-1.png)<!-- -->


#### info map cluster
info map algorithm use random walker trajectories, and find the structure that minimizes the expected description length

```r
net_infoMapcl_c<-lapply(names(net_list),function(x){
  net_c<-net_list[[x]]
  
  #detecting communities ============
  cl_infoMap<-cluster_infomap(net_c)
  
  # plot dendrograms ===========
    Vdf<-data.frame(continent='World',
             year=as.numeric(x),
             nClusters=membership(cl_infoMap)%>%as.numeric()%>%max(),
             method='InfoMap'
             )
 
  return(Vdf)
})%>%bind_rows()

net_infoMapcl_continents<-lapply(names(net_list),function(x){
  net_c<-net_list[[x]]
  lapply(c("Americas","Europe" , "Asia","Africa","Oceania" ),function(c){
    g_sub <- induced_subgraph(net_c, V(net_c)$name[V(net_c)$continent==c])
    #detecting communities ============
    cl_infoMap<-cluster_infomap(g_sub)    # plot dendrograms ===========
      Vdf<-data.frame(continent=c,
               year=as.numeric(x),
               nClusters=membership(cl_infoMap)%>%as.numeric()%>%max(),
               method='InfoMap',
               Country=V(g_sub)$name,
             infoMap_membership=membership(cl_infoMap)%>%as.numeric()
               )
    return(Vdf)
  })
})%>%bind_rows()
```


```r
g<-rbind(net_infoMapcl_c,net_infoMapcl_continents%>%select(continent,year,nClusters,method)%>%unique())%>%ggplot(aes(x=year,y=nClusters,color=continent))+geom_line()+ geom_point()+theme_economist()+theme(legend.position="right",
        plot.title = element_text(size=12),
            legend.text = element_text(size=10),
            legend.title = element_text(size=12),
            legend.key.size = unit(0.5, 'cm')
            )+ggtitle('InfoMap')
ggsave(g,file=paste0(prodClass,'/4_',prodClass,'_InfoMap_Contcounts','.png'),width=13,height=5)
plot(g)
```

![](2_ComtradeVaccines_7NtwkA_Continents_files/figure-html/unnamed-chunk-6-1.png)<!-- -->

## Detecting components 


```r
net_components_c<-lapply(names(net_list),function(x){
  net_c<-net_list[[x]]
  data.frame(
      year=x,
      nClusters=components(net_c)$no,
      method='Components',
      continent='World'
  )
})%>%bind_rows()
net_components_continents<-lapply(names(net_list),function(x){
  net_c<-net_list[[x]]
  lapply(c("Americas","Europe" , "Asia","Africa","Oceania" ),function(c){
    g_sub <- induced_subgraph(net_c, V(net_c)$name[V(net_c)$continent==c])
    #detecting communities ============
    #cl_infoMap<-cluster_infomap(g_sub)    # plot dendrograms ===========
      Vdf<-data.frame(continent=c,
               year=as.numeric(x),
               nClusters=components(g_sub)$no%>%as.numeric()%>%max(),
               method='Components',
               Country=V(g_sub)$name,
             Comp_membership=membership(components(g_sub))%>%as.numeric()
               )
    return(Vdf)
  })
})%>%bind_rows()
g<-rbind(net_components_continents%>%select(continent,year,nClusters,method)%>%unique,net_components_c)%>%ggplot(aes(x=year,y=nClusters,group=continent,color=continent))+geom_line()+ geom_point()+theme_economist()+theme(legend.position="right",
        plot.title = element_text(size=12),
            legend.text = element_text(size=10),
            legend.title = element_text(size=12),
            legend.key.size = unit(0.5, 'cm')
            )+ggtitle('Components')
ggsave(g,file=paste0(prodClass,'/4_',prodClass,'_ClComponents_Contcounts','.png'),width=13,height=5)
plot(g)
```

![](2_ComtradeVaccines_7NtwkA_Continents_files/figure-html/unnamed-chunk-7-1.png)<!-- -->

```r
net_clsComponents<-rbind(net_infoMapcl_c,net_components_c,net_betwcl_c)
g<-net_clsComponents%>%ggplot(aes(x=year,y=nClusters,group=method,color=method))+geom_line()+ scale_y_log10()+ geom_point()+theme_economist()+theme(legend.position="right",
        plot.title = element_text(size=12),
            legend.text = element_text(size=10),
            legend.title = element_text(size=12),
            legend.key.size = unit(0.5, 'cm')
            )
ggsave(g,file=paste0(prodClass,'/4_',prodClass,'_ClComponents_Wcounts','.png'),width=13,height=5)
plot(g)
```

![](2_ComtradeVaccines_7NtwkA_Continents_files/figure-html/unnamed-chunk-7-2.png)<!-- -->



Note that Asia and Americas, even presenting just a single component, it is comprised mostly by countries showing out degrees of zero (0 - no export) to two, with in degree low as 4 for Asia, and 1 or 2 for Americas. This contrast with Europe, in which although some zero out degree countries exist, their in-degrees are mostly above 8.

As previously mentioned from visual inspection, the worse scenario is present for Africa and Oceania. The amount of zero in-degree countries in these continents demonstrate their clear dependency of external (mostly Asian, European) suppliers.
Note we can possibly argue the scenario is worse, if we consider the distance of the countries in these continents, compared with the European ones, which usually imply also in higher influences of disturbances in the routes/system.

# Looking continents in more detail at 2021?  
##Preparing plot objects for each continent:
- generate list of plots, but plot each continent a time with different plots together
###First, visually 2021:

```r
library(countrycode)
library(threejs)
net_c<-net_list[['2021']]


ContinentNetwidgets<-function(continent){
  V(net_c)$continent <- countrycode(sourcevar = V(net_c)$name,
                            origin = "country.name",
                            destination = "continent")
  V(net_c)$continent[is.na(V(net_c)$continent)]<-'other'
  V(net_c)$vertex_degree <-  degree(net_c,mode='out')
  # if Asia, remove Cyprus, add Russia
  V(net_c)$continent[V(net_c)$name=='Russia']<-'Asia'
  V(net_c)$continent[V(net_c)$name=='Cyprus']<-'Europe'
  
  countrieslist=V(net_c)$name[V(net_c)$continent==continent]
  g_sub <- induced_subgraph(net_c, countrieslist)
  
  layout3d <- layout_with_fr(g_sub,dim=3)
  threejs_gplot<-graphjs(g_sub, curvature = 0, bg = "white",
        layout=layout3d,
        showLabels = TRUE,
        attraction = 1, repulsion = 3,
        max_iterations = 1500, opacity = 1,
        stroke = TRUE, width = NULL,
     vertex.size = (log(V(g_sub)$vertex_degree)/max(log(V(g_sub)$vertex_degree))),
        height = NULL,
     edge.color='cornflowerblue',
     edge.width=2,
     edge.alpha=0.2,
     edge.arrow.size= 30,
     main=x)%>%
  points3d(
    vertices(.), 
    color="blue",
    pch=(attr(V(g_sub),'names')),
    size=0.1
    )
  #htmlwidgets::saveWidget(threejs_gplot,
                    #    file=paste0(prodClass,'/4_',prodClass,'_3dgjs_',continent,'.html'))
  return(threejs_gplot)
}
```
### clusters and components in 2021
and by extracting components, and the centrality (out-degree) of its members, considering just the connections in the network

```r
library(countrycode)
library(threejs)
net_c<-net_list[['2021']]
V(net_c)$continent <- countrycode(sourcevar = V(net_c)$name,
                            origin = "country.name",
                            destination = "continent")
V(net_c)$continent[is.na(V(net_c)$continent)]<-'other'
V(net_c)$vertex_degree <-  degree(net_c,mode='out')

contdf<-lapply(c("Americas","Europe" , "Asia","Africa","Oceania" ),function(x){
  g_sub <- induced_subgraph(net_c, V(net_c)$name[V(net_c)$continent==x])
  V(g_sub)$vertex_degree <-  degree(g_sub,mode='out')
  V(g_sub)$in_degree <-  degree(g_sub,mode='in')
  lapply(components(g_sub)%>%igraph::groups(),function(y){
    data.frame(
      continent=x,
      n_components=components(g_sub)$no,
      comp_out_in_degree=paste0(
        paste0(y,' (',V(g_sub)$vertex_degree[V(g_sub)$name%in%y],'/ ',V(g_sub)$in_degree[V(g_sub)$name%in%y],')',collapse='; '),
        collapse='; '),
      components_out_degree=paste0(
        paste0(y,' (',V(g_sub)$vertex_degree[V(g_sub)$name%in%y],')',collapse='; '),
        collapse='; '),
      components_in_degree=paste0(
        paste0(y,' (',V(g_sub)$in_degree[V(g_sub)$name%in%y],')',collapse='; '),
        collapse='; '),
      components=paste0(y,collapse='; ')
    )
  })%>%bind_rows()
})%>%bind_rows()
contdf
```

```
##    continent n_components
## 1   Americas            1
## 2     Europe            1
## 3       Asia            2
## 4       Asia            2
## 5     Africa           21
## 6     Africa           21
## 7     Africa           21
## 8     Africa           21
## 9     Africa           21
## 10    Africa           21
## 11    Africa           21
## 12    Africa           21
## 13    Africa           21
## 14    Africa           21
## 15    Africa           21
## 16    Africa           21
## 17    Africa           21
## 18    Africa           21
## 19    Africa           21
## 20    Africa           21
## 21    Africa           21
## 22    Africa           21
## 23    Africa           21
## 24    Africa           21
## 25    Africa           21
## 26   Oceania            4
## 27   Oceania            4
## 28   Oceania            4
## 29   Oceania            4
##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    comp_out_in_degree
## 1                                                                                                                                                                                    Belize (1/ 2); Barbados (8/ 4); Brazil (19/ 2); Canada (21/ 2); Colombia (2/ 4); Dominican Republic (4/ 4); Honduras (1/ 3); Guyana (2/ 2); Guatemala (1/ 3); Peru (1/ 2); Nicaragua (3/ 2); Trinidad and Tobago (1/ 3); USA (33/ 3); Argentina (0/ 3); Panama (0/ 4); Saint Lucia (0/ 4); Saint Kitts and Nevis (0/ 4); Antigua and Barbuda (0/ 3); Dominica (0/ 2); Bahamas (0/ 3); Saint Vincent and the Grenadines (0/ 3); Grenada (0/ 2); Ecuador (0/ 4); Jamaica (0/ 3); Costa Rica (0/ 3); Venezuela (0/ 3); Paraguay (0/ 3); Bolivia (0/ 2); Haiti (0/ 3); El Salvador (0/ 3); Uruguay (0/ 3); Chile (0/ 2); Mexico (0/ 2); Suriname (0/ 1); Cuba (0/ 1)
## 2                                                                                  Belarus (1/ 5); Bulgaria (21/ 8); Belgium (37/ 11); Austria (7/ 11); Czechia (12/ 15); Croatia (5/ 9); Denmark (27/ 11); Estonia (4/ 10); Finland (1/ 5); Germany (32/ 20); Greece (2/ 9); Hungary (24/ 12); Italy (30/ 13); Latvia (4/ 9); Malta (0/ 9); Ireland (13/ 12); Iceland (1/ 4); Lithuania (7/ 14); Portugal (2/ 11); Russia (15/ 9); Netherlands (28/ 14); Republic of Moldova (2/ 9); Montenegro (1/ 11); Norway (7/ 10); Romania (14/ 6); Slovenia (2/ 7); Slovakia (9/ 9); Serbia (5/ 12); Spain (19/ 12); Sweden (19/ 6); Switzerland (22/ 10); UK (17/ 14); Ukraine (2/ 15); Bosnia and Herzegovina (0/ 10); North Macedonia (0/ 8); Albania (0/ 11); Andorra (0/ 5); Poland (0/ 10); Luxembourg (0/ 3); Faeroe Islands (0/ 1); San Marino (0/ 2)
## 3  Azerbaijan (1/ 4); Armenia (1/ 4); Brunei Darussalam (1/ 6); China (42/ 6); Sri Lanka (1/ 8); Georgia (2/ 4); Indonesia (28/ 7); Kuwait (1/ 6); Malaysia (6/ 8); Israel (1/ 3); South Korea (34/ 5); Lebanon (1/ 4); Japan (22/ 3); Saudi Arabia (3/ 4); Oman (0/ 4); Philippines (1/ 10); Pakistan (1/ 6); Vietnam (4/ 7); India (43/ 5); Singapore (19/ 7); Thailand (13/ 8); United Arab Emirates (22/ 6); Uzbekistan (1/ 2); Turkey (1/ 7); Timor-Leste (0/ 6); Bahrain (0/ 5); Lao People's Democratic Republic (0/ 8); Bangladesh (0/ 8); Afghanistan (0/ 5); Turkmenistan (0/ 4); Syrian Arab Republic (0/ 5); Kyrgyzstan (0/ 4); Mongolia (0/ 3); Tajikistan (0/ 5); Bhutan (0/ 5); Nepal (0/ 6); Myanmar (0/ 8); Maldives (0/ 9); Yemen (0/ 5); Iraq (0/ 5); Cambodia (0/ 6); Iran (0/ 6); Kazakhstan (0/ 4); Qatar (0/ 4); Jordan (0/ 4)
## 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Cyprus (0/ 0)
## 5                                                                                                                                                                                                                                                              Botswana (3/ 1); Madagascar (1/ 0); Kenya (16/ 2); Mauritius (1/ 1); Malawi (1/ 3); Niger (1/ 1); Senegal (2/ 0); South Africa (12/ 3); Tunisia (2/ 0); Zambia (1/ 3); Egypt (1/ 1); Tanzania (3/ 1); Burundi (0/ 1); Mali (0/ 1); Liberia (0/ 1); Rwanda (0/ 2); Comoros (0/ 1); Mauritania (0/ 1); Guinea (0/ 2); Eswatini (0/ 1); Democratic Republic of the Congo (0/ 1); Djibouti (0/ 1); Zimbabwe (0/ 3); South Sudan (0/ 1); Namibia (0/ 2); Ethiopia (0/ 1); Chad (0/ 1); Lesotho (0/ 1); Mozambique (0/ 1); Uganda (0/ 2); Burkina Faso (0/ 1); Angola (0/ 1); Somalia (0/ 2)
## 6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Morocco (0/ 0)
## 7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Ghana (0/ 0)
## 8                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Togo (0/ 0)
## 9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Côte d'Ivoire (0/ 0)
## 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Gabon (0/ 0)
## 11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Equatorial Guinea (0/ 0)
## 12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Algeria (0/ 0)
## 13                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Sudan (0/ 0)
## 14                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Gambia (0/ 0)
## 15                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Central African Republic (0/ 0)
## 16                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Eritrea (0/ 0)
## 17                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Libya (0/ 0)
## 18                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Sao Tome and Principe (0/ 0)
## 19                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Cape Verde (0/ 0)
## 20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Guinea-Bissau (0/ 0)
## 21                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Sierra Leone (0/ 0)
## 22                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Seychelles (0/ 0)
## 23                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Congo (0/ 0)
## 24                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Nigeria (0/ 0)
## 25                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Cameroon (0/ 0)
## 26                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Australia (5/ 2); Fiji (9/ 2); New Zealand (6/ 2); Samoa (1/ 2); Papua New Guinea (0/ 3); Vanuatu (0/ 2); Nauru (0/ 2); Solomon Islands (0/ 1); Kiribati (0/ 2); Tuvalu (0/ 1); Tonga (0/ 2)
## 27                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Marshall Islands (0/ 0)
## 28                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Micronesia(Federated States of) (0/ 0)
## 29                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Palau (0/ 0)
##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         components_out_degree
## 1                                                                                                                                                     Belize (1); Barbados (8); Brazil (19); Canada (21); Colombia (2); Dominican Republic (4); Honduras (1); Guyana (2); Guatemala (1); Peru (1); Nicaragua (3); Trinidad and Tobago (1); USA (33); Argentina (0); Panama (0); Saint Lucia (0); Saint Kitts and Nevis (0); Antigua and Barbuda (0); Dominica (0); Bahamas (0); Saint Vincent and the Grenadines (0); Grenada (0); Ecuador (0); Jamaica (0); Costa Rica (0); Venezuela (0); Paraguay (0); Bolivia (0); Haiti (0); El Salvador (0); Uruguay (0); Chile (0); Mexico (0); Suriname (0); Cuba (0)
## 2                                                                                           Belarus (1); Bulgaria (21); Belgium (37); Austria (7); Czechia (12); Croatia (5); Denmark (27); Estonia (4); Finland (1); Germany (32); Greece (2); Hungary (24); Italy (30); Latvia (4); Malta (0); Ireland (13); Iceland (1); Lithuania (7); Portugal (2); Russia (15); Netherlands (28); Republic of Moldova (2); Montenegro (1); Norway (7); Romania (14); Slovenia (2); Slovakia (9); Serbia (5); Spain (19); Sweden (19); Switzerland (22); UK (17); Ukraine (2); Bosnia and Herzegovina (0); North Macedonia (0); Albania (0); Andorra (0); Poland (0); Luxembourg (0); Faeroe Islands (0); San Marino (0)
## 3  Azerbaijan (1); Armenia (1); Brunei Darussalam (1); China (42); Sri Lanka (1); Georgia (2); Indonesia (28); Kuwait (1); Malaysia (6); Israel (1); South Korea (34); Lebanon (1); Japan (22); Saudi Arabia (3); Oman (0); Philippines (1); Pakistan (1); Vietnam (4); India (43); Singapore (19); Thailand (13); United Arab Emirates (22); Uzbekistan (1); Turkey (1); Timor-Leste (0); Bahrain (0); Lao People's Democratic Republic (0); Bangladesh (0); Afghanistan (0); Turkmenistan (0); Syrian Arab Republic (0); Kyrgyzstan (0); Mongolia (0); Tajikistan (0); Bhutan (0); Nepal (0); Myanmar (0); Maldives (0); Yemen (0); Iraq (0); Cambodia (0); Iran (0); Kazakhstan (0); Qatar (0); Jordan (0)
## 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Cyprus (0)
## 5                                                                                                                                                                                                                         Botswana (3); Madagascar (1); Kenya (16); Mauritius (1); Malawi (1); Niger (1); Senegal (2); South Africa (12); Tunisia (2); Zambia (1); Egypt (1); Tanzania (3); Burundi (0); Mali (0); Liberia (0); Rwanda (0); Comoros (0); Mauritania (0); Guinea (0); Eswatini (0); Democratic Republic of the Congo (0); Djibouti (0); Zimbabwe (0); South Sudan (0); Namibia (0); Ethiopia (0); Chad (0); Lesotho (0); Mozambique (0); Uganda (0); Burkina Faso (0); Angola (0); Somalia (0)
## 6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Morocco (0)
## 7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Ghana (0)
## 8                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Togo (0)
## 9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Côte d'Ivoire (0)
## 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Gabon (0)
## 11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Equatorial Guinea (0)
## 12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Algeria (0)
## 13                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Sudan (0)
## 14                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Gambia (0)
## 15                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Central African Republic (0)
## 16                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Eritrea (0)
## 17                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Libya (0)
## 18                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Sao Tome and Principe (0)
## 19                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Cape Verde (0)
## 20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Guinea-Bissau (0)
## 21                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Sierra Leone (0)
## 22                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Seychelles (0)
## 23                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Congo (0)
## 24                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Nigeria (0)
## 25                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Cameroon (0)
## 26                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Australia (5); Fiji (9); New Zealand (6); Samoa (1); Papua New Guinea (0); Vanuatu (0); Nauru (0); Solomon Islands (0); Kiribati (0); Tuvalu (0); Tonga (0)
## 27                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Marshall Islands (0)
## 28                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Micronesia(Federated States of) (0)
## 29                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Palau (0)
##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   components_in_degree
## 1                                                                                                                                                 Belize (2); Barbados (4); Brazil (2); Canada (2); Colombia (4); Dominican Republic (4); Honduras (3); Guyana (2); Guatemala (3); Peru (2); Nicaragua (2); Trinidad and Tobago (3); USA (3); Argentina (3); Panama (4); Saint Lucia (4); Saint Kitts and Nevis (4); Antigua and Barbuda (3); Dominica (2); Bahamas (3); Saint Vincent and the Grenadines (3); Grenada (2); Ecuador (4); Jamaica (3); Costa Rica (3); Venezuela (3); Paraguay (3); Bolivia (2); Haiti (3); El Salvador (3); Uruguay (3); Chile (2); Mexico (2); Suriname (1); Cuba (1)
## 2                                                                             Belarus (5); Bulgaria (8); Belgium (11); Austria (11); Czechia (15); Croatia (9); Denmark (11); Estonia (10); Finland (5); Germany (20); Greece (9); Hungary (12); Italy (13); Latvia (9); Malta (9); Ireland (12); Iceland (4); Lithuania (14); Portugal (11); Russia (9); Netherlands (14); Republic of Moldova (9); Montenegro (11); Norway (10); Romania (6); Slovenia (7); Slovakia (9); Serbia (12); Spain (12); Sweden (6); Switzerland (10); UK (14); Ukraine (15); Bosnia and Herzegovina (10); North Macedonia (8); Albania (11); Andorra (5); Poland (10); Luxembourg (3); Faeroe Islands (1); San Marino (2)
## 3  Azerbaijan (4); Armenia (4); Brunei Darussalam (6); China (6); Sri Lanka (8); Georgia (4); Indonesia (7); Kuwait (6); Malaysia (8); Israel (3); South Korea (5); Lebanon (4); Japan (3); Saudi Arabia (4); Oman (4); Philippines (10); Pakistan (6); Vietnam (7); India (5); Singapore (7); Thailand (8); United Arab Emirates (6); Uzbekistan (2); Turkey (7); Timor-Leste (6); Bahrain (5); Lao People's Democratic Republic (8); Bangladesh (8); Afghanistan (5); Turkmenistan (4); Syrian Arab Republic (5); Kyrgyzstan (4); Mongolia (3); Tajikistan (5); Bhutan (5); Nepal (6); Myanmar (8); Maldives (9); Yemen (5); Iraq (5); Cambodia (6); Iran (6); Kazakhstan (4); Qatar (4); Jordan (4)
## 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Cyprus (0)
## 5                                                                                                                                                                                                                    Botswana (1); Madagascar (0); Kenya (2); Mauritius (1); Malawi (3); Niger (1); Senegal (0); South Africa (3); Tunisia (0); Zambia (3); Egypt (1); Tanzania (1); Burundi (1); Mali (1); Liberia (1); Rwanda (2); Comoros (1); Mauritania (1); Guinea (2); Eswatini (1); Democratic Republic of the Congo (1); Djibouti (1); Zimbabwe (3); South Sudan (1); Namibia (2); Ethiopia (1); Chad (1); Lesotho (1); Mozambique (1); Uganda (2); Burkina Faso (1); Angola (1); Somalia (2)
## 6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Morocco (0)
## 7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Ghana (0)
## 8                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Togo (0)
## 9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Côte d'Ivoire (0)
## 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Gabon (0)
## 11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Equatorial Guinea (0)
## 12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Algeria (0)
## 13                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Sudan (0)
## 14                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Gambia (0)
## 15                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Central African Republic (0)
## 16                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Eritrea (0)
## 17                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Libya (0)
## 18                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Sao Tome and Principe (0)
## 19                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Cape Verde (0)
## 20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Guinea-Bissau (0)
## 21                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Sierra Leone (0)
## 22                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Seychelles (0)
## 23                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Congo (0)
## 24                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Nigeria (0)
## 25                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Cameroon (0)
## 26                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Australia (2); Fiji (2); New Zealand (2); Samoa (2); Papua New Guinea (3); Vanuatu (2); Nauru (2); Solomon Islands (1); Kiribati (2); Tuvalu (1); Tonga (2)
## 27                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Marshall Islands (0)
## 28                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Micronesia(Federated States of) (0)
## 29                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Palau (0)
##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        components
## 1                                                                                                        Belize; Barbados; Brazil; Canada; Colombia; Dominican Republic; Honduras; Guyana; Guatemala; Peru; Nicaragua; Trinidad and Tobago; USA; Argentina; Panama; Saint Lucia; Saint Kitts and Nevis; Antigua and Barbuda; Dominica; Bahamas; Saint Vincent and the Grenadines; Grenada; Ecuador; Jamaica; Costa Rica; Venezuela; Paraguay; Bolivia; Haiti; El Salvador; Uruguay; Chile; Mexico; Suriname; Cuba
## 2                                                                                  Belarus; Bulgaria; Belgium; Austria; Czechia; Croatia; Denmark; Estonia; Finland; Germany; Greece; Hungary; Italy; Latvia; Malta; Ireland; Iceland; Lithuania; Portugal; Russia; Netherlands; Republic of Moldova; Montenegro; Norway; Romania; Slovenia; Slovakia; Serbia; Spain; Sweden; Switzerland; UK; Ukraine; Bosnia and Herzegovina; North Macedonia; Albania; Andorra; Poland; Luxembourg; Faeroe Islands; San Marino
## 3  Azerbaijan; Armenia; Brunei Darussalam; China; Sri Lanka; Georgia; Indonesia; Kuwait; Malaysia; Israel; South Korea; Lebanon; Japan; Saudi Arabia; Oman; Philippines; Pakistan; Vietnam; India; Singapore; Thailand; United Arab Emirates; Uzbekistan; Turkey; Timor-Leste; Bahrain; Lao People's Democratic Republic; Bangladesh; Afghanistan; Turkmenistan; Syrian Arab Republic; Kyrgyzstan; Mongolia; Tajikistan; Bhutan; Nepal; Myanmar; Maldives; Yemen; Iraq; Cambodia; Iran; Kazakhstan; Qatar; Jordan
## 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Cyprus
## 5                                                                                                                                                                   Botswana; Madagascar; Kenya; Mauritius; Malawi; Niger; Senegal; South Africa; Tunisia; Zambia; Egypt; Tanzania; Burundi; Mali; Liberia; Rwanda; Comoros; Mauritania; Guinea; Eswatini; Democratic Republic of the Congo; Djibouti; Zimbabwe; South Sudan; Namibia; Ethiopia; Chad; Lesotho; Mozambique; Uganda; Burkina Faso; Angola; Somalia
## 6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Morocco
## 7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Ghana
## 8                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Togo
## 9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Côte d'Ivoire
## 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Gabon
## 11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Equatorial Guinea
## 12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Algeria
## 13                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Sudan
## 14                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Gambia
## 15                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Central African Republic
## 16                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Eritrea
## 17                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Libya
## 18                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Sao Tome and Principe
## 19                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Cape Verde
## 20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Guinea-Bissau
## 21                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Sierra Leone
## 22                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Seychelles
## 23                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Congo
## 24                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Nigeria
## 25                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Cameroon
## 26                                                                                                                                                                                                                                                                                                                                                                                                Australia; Fiji; New Zealand; Samoa; Papua New Guinea; Vanuatu; Nauru; Solomon Islands; Kiribati; Tuvalu; Tonga
## 27                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Marshall Islands
## 28                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Micronesia(Federated States of)
## 29                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Palau
```

```r
write.csv(contdf,file=paste0(prodClass,'/4_',prodClass,'_Continents.csv'))
```

### in and out degrees in detail at 2021
We compare the in and out degrees at 2021, considering the global network and the continent (sub)network

```r
net_c<-net_list[['2021']]
V(net_c)$continent <- countrycode(sourcevar = V(net_c)$name,
                            origin = "country.name",
                            destination = "continent")
V(net_c)$continent[is.na(V(net_c)$continent)]<-'other'
# if Asia, remove Cyprus, add Russia
V(net_c)$continent[V(net_c)$name=='Russia']<-'Asia'
V(net_c)$continent[V(net_c)$name=='Cyprus']<-'Europe'
# in and out degrees considering the global network
degreedf<-data.frame(
  country=V(net_c)$name,
  continent=V(net_c)$continent,
  out_degree=degree(net_c,mode='out'),
  in_degree=degree(net_c,mode='in'),
  out_strength=strength(net_c, mode="out"),
  scope='global'
)%>%arrange(out_degree,in_degree)
degreedf%>%ggplot()+
  geom_point(aes(x=in_degree,y=out_degree,colour=continent),position=position_jitter(width=2,height=1))+
  geom_text(aes(x=in_degree,y=out_degree,label=country), position=position_jitter(width=3,height=3),size=2,color='darkgrey')+ theme_economist() 
```

![](2_ComtradeVaccines_7NtwkA_Continents_files/figure-html/unnamed-chunk-10-1.png)<!-- -->

```r
degreedf
```

```
##                                                           country continent
## Marshall Islands                                 Marshall Islands   Oceania
## Faeroe Islands                                     Faeroe Islands    Europe
## Palau                                                       Palau   Oceania
## Tuvalu                                                     Tuvalu   Oceania
## San Marino                                             San Marino    Europe
## Micronesia(Federated States of)   Micronesia(Federated States of)   Oceania
## Nauru                                                       Nauru   Oceania
## Luxembourg                                             Luxembourg    Europe
## Dominica                                                 Dominica  Americas
## Eritrea                                                   Eritrea    Africa
## Tonga                                                       Tonga   Oceania
## Andorra                                                   Andorra    Europe
## Kiribati                                                 Kiribati   Oceania
## Cuba                                                         Cuba  Americas
## Grenada                                                   Grenada  Americas
## Equatorial Guinea                               Equatorial Guinea    Africa
## Seychelles                                             Seychelles    Africa
## Somalia                                                   Somalia    Africa
## Suriname                                                 Suriname  Americas
## Vanuatu                                                   Vanuatu   Oceania
## Saint Kitts and Nevis                       Saint Kitts and Nevis  Americas
## Sao Tome and Principe                       Sao Tome and Principe    Africa
## Solomon Islands                                   Solomon Islands   Oceania
## Haiti                                                       Haiti  Americas
## Guinea-Bissau                                       Guinea-Bissau    Africa
## Lesotho                                                   Lesotho    Africa
## Saint Lucia                                           Saint Lucia  Americas
## Saint Vincent and the Grenadines Saint Vincent and the Grenadines  Americas
## Togo                                                         Togo    Africa
## Côte d'Ivoire                                       Côte d'Ivoire    Africa
## Turkmenistan                                         Turkmenistan      Asia
## Gabon                                                       Gabon    Africa
## Algeria                                                   Algeria    Africa
## Mongolia                                                 Mongolia      Asia
## Comoros                                                   Comoros    Africa
## Central African Republic                 Central African Republic    Africa
## South Sudan                                           South Sudan    Africa
## Libya                                                       Libya    Africa
## Venezuela                                               Venezuela  Americas
## Cape Verde                                             Cape Verde    Africa
## Chad                                                         Chad    Africa
## Mozambique                                             Mozambique    Africa
## Congo                                                       Congo    Africa
## Papua New Guinea                                 Papua New Guinea   Oceania
## Bahamas                                                   Bahamas  Americas
## Syrian Arab Republic                         Syrian Arab Republic      Asia
## Eswatini                                                 Eswatini    Africa
## Djibouti                                                 Djibouti    Africa
## Jamaica                                                   Jamaica  Americas
## Namibia                                                   Namibia    Africa
## El Salvador                                           El Salvador  Americas
## Burkina Faso                                         Burkina Faso    Africa
## Cameroon                                                 Cameroon    Africa
## Timor-Leste                                           Timor-Leste      Asia
## Afghanistan                                           Afghanistan      Asia
## Kyrgyzstan                                             Kyrgyzstan      Asia
## Gambia                                                     Gambia    Africa
## Cyprus                                                     Cyprus    Europe
## Nepal                                                       Nepal      Asia
## Yemen                                                       Yemen      Asia
## Costa Rica                                             Costa Rica  Americas
## Kazakhstan                                             Kazakhstan      Asia
## Bahrain                                                   Bahrain      Asia
## Antigua and Barbuda                           Antigua and Barbuda  Americas
## North Macedonia                                   North Macedonia    Europe
## Mali                                                         Mali    Africa
## Liberia                                                   Liberia    Africa
## Sudan                                                       Sudan    Africa
## Bhutan                                                     Bhutan      Asia
## Iraq                                                         Iraq      Asia
## Ethiopia                                                 Ethiopia    Africa
## Bolivia                                                   Bolivia  Americas
## Sierra Leone                                         Sierra Leone    Africa
## Uruguay                                                   Uruguay  Americas
## Ghana                                                       Ghana    Africa
## Burundi                                                   Burundi    Africa
## Democratic Republic of the Congo Democratic Republic of the Congo    Africa
## Zimbabwe                                                 Zimbabwe    Africa
## Myanmar                                                   Myanmar      Asia
## Cambodia                                                 Cambodia      Asia
## Angola                                                     Angola    Africa
## Qatar                                                       Qatar      Asia
## Jordan                                                     Jordan      Asia
## Nigeria                                                   Nigeria    Africa
## Chile                                                       Chile  Americas
## Poland                                                     Poland    Europe
## Panama                                                     Panama  Americas
## Bosnia and Herzegovina                     Bosnia and Herzegovina    Europe
## Mauritania                                             Mauritania    Africa
## Tajikistan                                             Tajikistan      Asia
## Guinea                                                     Guinea    Africa
## Mexico                                                     Mexico  Americas
## Bangladesh                                             Bangladesh      Asia
## Maldives                                                 Maldives      Asia
## Paraguay                                                 Paraguay  Americas
## Lao People's Democratic Republic Lao People's Democratic Republic      Asia
## Ecuador                                                   Ecuador  Americas
## Albania                                                   Albania    Europe
## Iran                                                         Iran      Asia
## Rwanda                                                     Rwanda    Africa
## Uganda                                                     Uganda    Africa
## Argentina                                               Argentina  Americas
## Iceland                                                   Iceland    Europe
## Samoa                                                       Samoa   Oceania
## Belize                                                     Belize  Americas
## Madagascar                                             Madagascar    Africa
## Uzbekistan                                             Uzbekistan      Asia
## Brunei Darussalam                               Brunei Darussalam      Asia
## Belarus                                                   Belarus    Europe
## Malawi                                                     Malawi    Africa
## Niger                                                       Niger    Africa
## Trinidad and Tobago                           Trinidad and Tobago  Americas
## Honduras                                                 Honduras  Americas
## Guatemala                                               Guatemala  Americas
## Zambia                                                     Zambia    Africa
## Peru                                                         Peru  Americas
## Montenegro                                             Montenegro    Europe
## Sri Lanka                                               Sri Lanka      Asia
## Lebanon                                                   Lebanon      Asia
## Armenia                                                   Armenia      Asia
## Philippines                                           Philippines      Asia
## Azerbaijan                                             Azerbaijan      Asia
## Guyana                                                     Guyana  Americas
## Morocco                                                   Morocco    Africa
## Mauritius                                               Mauritius    Africa
## Pakistan                                                 Pakistan      Asia
## Kuwait                                                     Kuwait      Asia
## Republic of Moldova                           Republic of Moldova    Europe
## Tunisia                                                   Tunisia    Africa
## Colombia                                                 Colombia  Americas
## Georgia                                                   Georgia      Asia
## Ukraine                                                   Ukraine    Europe
## Turkey                                                     Turkey      Asia
## Finland                                                   Finland    Europe
## Botswana                                                 Botswana    Africa
## Slovenia                                                 Slovenia    Europe
## Portugal                                                 Portugal    Europe
## Tanzania                                                 Tanzania    Africa
## Saudi Arabia                                         Saudi Arabia      Asia
## Estonia                                                   Estonia    Europe
## Senegal                                                   Senegal    Africa
## Dominican Republic                             Dominican Republic  Americas
## Nicaragua                                               Nicaragua  Americas
## Egypt                                                       Egypt    Africa
## Malta                                                       Malta    Europe
## Israel                                                     Israel      Asia
## Vietnam                                                   Vietnam      Asia
## Croatia                                                   Croatia    Europe
## Oman                                                         Oman      Asia
## Latvia                                                     Latvia    Europe
## Malaysia                                                 Malaysia      Asia
## Barbados                                                 Barbados  Americas
## Fiji                                                         Fiji   Oceania
## Greece                                                     Greece    Europe
## Slovakia                                                 Slovakia    Europe
## Norway                                                     Norway    Europe
## New Zealand                                           New Zealand   Oceania
## Lithuania                                               Lithuania    Europe
## Serbia                                                     Serbia    Europe
## Austria                                                   Austria    Europe
## Czechia                                                   Czechia    Europe
## Romania                                                   Romania    Europe
## Kenya                                                       Kenya    Africa
## South Africa                                         South Africa    Africa
## Australia                                               Australia   Oceania
## Thailand                                                 Thailand      Asia
## Sweden                                                     Sweden    Europe
## Ireland                                                   Ireland    Europe
## Singapore                                               Singapore      Asia
## Japan                                                       Japan      Asia
## Hungary                                                   Hungary    Europe
## Spain                                                       Spain    Europe
## Brazil                                                     Brazil  Americas
## Canada                                                     Canada  Americas
## United Arab Emirates                         United Arab Emirates      Asia
## UK                                                             UK    Europe
## Switzerland                                           Switzerland    Europe
## Indonesia                                               Indonesia      Asia
## Bulgaria                                                 Bulgaria    Europe
## Germany                                                   Germany    Europe
## Italy                                                       Italy    Europe
## Russia                                                     Russia      Asia
## Denmark                                                   Denmark    Europe
## South Korea                                           South Korea      Asia
## China                                                       China      Asia
## USA                                                           USA  Americas
## Netherlands                                           Netherlands    Europe
## India                                                       India      Asia
## Belgium                                                   Belgium    Europe
##                                  out_degree in_degree out_strength  scope
## Marshall Islands                          0         1 0.000000e+00 global
## Faeroe Islands                            0         1 0.000000e+00 global
## Palau                                     0         1 0.000000e+00 global
## Tuvalu                                    0         2 0.000000e+00 global
## San Marino                                0         2 0.000000e+00 global
## Micronesia(Federated States of)           0         2 0.000000e+00 global
## Nauru                                     0         3 0.000000e+00 global
## Luxembourg                                0         3 0.000000e+00 global
## Dominica                                  0         4 0.000000e+00 global
## Eritrea                                   0         4 0.000000e+00 global
## Tonga                                     0         4 0.000000e+00 global
## Andorra                                   0         5 0.000000e+00 global
## Kiribati                                  0         5 0.000000e+00 global
## Cuba                                      0         5 0.000000e+00 global
## Grenada                                   0         6 0.000000e+00 global
## Equatorial Guinea                         0         6 0.000000e+00 global
## Seychelles                                0         6 0.000000e+00 global
## Somalia                                   0         6 0.000000e+00 global
## Suriname                                  0         6 0.000000e+00 global
## Vanuatu                                   0         7 0.000000e+00 global
## Saint Kitts and Nevis                     0         7 0.000000e+00 global
## Sao Tome and Principe                     0         7 0.000000e+00 global
## Solomon Islands                           0         7 0.000000e+00 global
## Haiti                                     0         7 0.000000e+00 global
## Guinea-Bissau                             0         7 0.000000e+00 global
## Lesotho                                   0         7 0.000000e+00 global
## Saint Lucia                               0         8 0.000000e+00 global
## Saint Vincent and the Grenadines          0         8 0.000000e+00 global
## Togo                                      0         8 0.000000e+00 global
## Côte d'Ivoire                             0         8 0.000000e+00 global
## Turkmenistan                              0         8 0.000000e+00 global
## Gabon                                     0         8 0.000000e+00 global
## Algeria                                   0         8 0.000000e+00 global
## Mongolia                                  0         8 0.000000e+00 global
## Comoros                                   0         8 0.000000e+00 global
## Central African Republic                  0         8 0.000000e+00 global
## South Sudan                               0         8 0.000000e+00 global
## Libya                                     0         8 0.000000e+00 global
## Venezuela                                 0         8 0.000000e+00 global
## Cape Verde                                0         8 0.000000e+00 global
## Chad                                      0         8 0.000000e+00 global
## Mozambique                                0         8 0.000000e+00 global
## Congo                                     0         8 0.000000e+00 global
## Papua New Guinea                          0         9 0.000000e+00 global
## Bahamas                                   0         9 0.000000e+00 global
## Syrian Arab Republic                      0         9 0.000000e+00 global
## Eswatini                                  0         9 0.000000e+00 global
## Djibouti                                  0         9 0.000000e+00 global
## Jamaica                                   0         9 0.000000e+00 global
## Namibia                                   0         9 0.000000e+00 global
## El Salvador                               0         9 0.000000e+00 global
## Burkina Faso                              0         9 0.000000e+00 global
## Cameroon                                  0         9 0.000000e+00 global
## Timor-Leste                               0        10 0.000000e+00 global
## Afghanistan                               0        10 0.000000e+00 global
## Kyrgyzstan                                0        10 0.000000e+00 global
## Gambia                                    0        10 0.000000e+00 global
## Cyprus                                    0        10 0.000000e+00 global
## Nepal                                     0        10 0.000000e+00 global
## Yemen                                     0        10 0.000000e+00 global
## Costa Rica                                0        10 0.000000e+00 global
## Kazakhstan                                0        10 0.000000e+00 global
## Bahrain                                   0        11 0.000000e+00 global
## Antigua and Barbuda                       0        11 0.000000e+00 global
## North Macedonia                           0        11 0.000000e+00 global
## Mali                                      0        11 0.000000e+00 global
## Liberia                                   0        11 0.000000e+00 global
## Sudan                                     0        11 0.000000e+00 global
## Bhutan                                    0        11 0.000000e+00 global
## Iraq                                      0        11 0.000000e+00 global
## Ethiopia                                  0        11 0.000000e+00 global
## Bolivia                                   0        11 0.000000e+00 global
## Sierra Leone                              0        11 0.000000e+00 global
## Uruguay                                   0        11 0.000000e+00 global
## Ghana                                     0        12 0.000000e+00 global
## Burundi                                   0        12 0.000000e+00 global
## Democratic Republic of the Congo          0        12 0.000000e+00 global
## Zimbabwe                                  0        12 0.000000e+00 global
## Myanmar                                   0        12 0.000000e+00 global
## Cambodia                                  0        12 0.000000e+00 global
## Angola                                    0        12 0.000000e+00 global
## Qatar                                     0        12 0.000000e+00 global
## Jordan                                    0        12 0.000000e+00 global
## Nigeria                                   0        12 0.000000e+00 global
## Chile                                     0        12 0.000000e+00 global
## Poland                                    0        12 0.000000e+00 global
## Panama                                    0        13 0.000000e+00 global
## Bosnia and Herzegovina                    0        13 0.000000e+00 global
## Mauritania                                0        13 0.000000e+00 global
## Tajikistan                                0        13 0.000000e+00 global
## Guinea                                    0        13 0.000000e+00 global
## Mexico                                    0        13 0.000000e+00 global
## Bangladesh                                0        14 0.000000e+00 global
## Maldives                                  0        14 0.000000e+00 global
## Paraguay                                  0        14 0.000000e+00 global
## Lao People's Democratic Republic          0        15 0.000000e+00 global
## Ecuador                                   0        15 0.000000e+00 global
## Albania                                   0        15 0.000000e+00 global
## Iran                                      0        15 0.000000e+00 global
## Rwanda                                    0        16 0.000000e+00 global
## Uganda                                    0        16 0.000000e+00 global
## Argentina                                 0        17 0.000000e+00 global
## Iceland                                   1         5 8.387713e+09 global
## Samoa                                     1         6 8.387713e+09 global
## Belize                                    1         7 8.387710e+09 global
## Madagascar                                1         8 8.387713e+09 global
## Uzbekistan                                1         8 8.387163e+09 global
## Brunei Darussalam                         1         9 8.387705e+09 global
## Belarus                                   1        10 8.387650e+09 global
## Malawi                                    1        10 8.387713e+09 global
## Niger                                     1        10 8.387710e+09 global
## Trinidad and Tobago                       1        10 8.387713e+09 global
## Honduras                                  1        12 8.387713e+09 global
## Guatemala                                 1        12 8.387713e+09 global
## Zambia                                    1        12 8.386643e+09 global
## Peru                                      1        13 8.387698e+09 global
## Montenegro                                1        13 8.387713e+09 global
## Sri Lanka                                 1        14 8.387712e+09 global
## Lebanon                                   1        14 8.387695e+09 global
## Armenia                                   1        15 8.387707e+09 global
## Philippines                               1        20 8.387678e+09 global
## Azerbaijan                                2         9 1.677418e+10 global
## Guyana                                    2        10 1.677527e+10 global
## Morocco                                   2        10 1.677533e+10 global
## Mauritius                                 2        11 1.677359e+10 global
## Pakistan                                  2        11 1.677527e+10 global
## Kuwait                                    2        13 1.677535e+10 global
## Republic of Moldova                       2        13 1.677534e+10 global
## Tunisia                                   2        13 1.677396e+10 global
## Colombia                                  2        14 1.677485e+10 global
## Georgia                                   2        14 1.677509e+10 global
## Ukraine                                   2        20 1.677540e+10 global
## Turkey                                    2        21 1.677540e+10 global
## Finland                                   3         5 2.516313e+10 global
## Botswana                                  3         8 2.516269e+10 global
## Slovenia                                  3         8 2.516107e+10 global
## Portugal                                  3        12 2.516291e+10 global
## Tanzania                                  3        12 2.516310e+10 global
## Saudi Arabia                              3        13 2.516167e+10 global
## Estonia                                   4        10 3.354936e+10 global
## Senegal                                   4        10 3.355081e+10 global
## Dominican Republic                        4        12 3.355059e+10 global
## Nicaragua                                 4        13 3.353421e+10 global
## Egypt                                     4        18 3.355057e+10 global
## Malta                                     5        10 4.193634e+10 global
## Israel                                    5        14 4.193846e+10 global
## Vietnam                                   5        24 4.193838e+10 global
## Croatia                                   6         9 5.032554e+10 global
## Oman                                      6         9 5.032627e+10 global
## Latvia                                    6        10 5.032436e+10 global
## Malaysia                                  7        17 5.871007e+10 global
## Barbados                                  8        10 6.710142e+10 global
## Fiji                                      9         9 7.548677e+10 global
## Greece                                    9        11 7.547971e+10 global
## Slovakia                                 10         9 8.386416e+10 global
## Norway                                   10        10 8.385887e+10 global
## New Zealand                              10        12 8.387359e+10 global
## Lithuania                                12        15 1.006361e+11 global
## Serbia                                   12        16 1.006525e+11 global
## Austria                                  14        14 1.171219e+11 global
## Czechia                                  14        17 1.174073e+11 global
## Romania                                  15         8 1.257742e+11 global
## Kenya                                    19        17 1.593618e+11 global
## South Africa                             20        18 1.674382e+11 global
## Australia                                21        21 1.760170e+11 global
## Thailand                                 23        21 1.928647e+11 global
## Sweden                                   24         8 2.012753e+11 global
## Ireland                                  30        17 2.474797e+11 global
## Singapore                                34        19 2.851171e+11 global
## Japan                                    40        13 3.353367e+11 global
## Hungary                                  40        15 3.353233e+11 global
## Spain                                    41        18 3.378417e+11 global
## Brazil                                   42        19 3.522762e+11 global
## Canada                                   48        16 4.022244e+11 global
## United Arab Emirates                     55        16 4.606790e+11 global
## UK                                       56        26 4.691360e+11 global
## Switzerland                              57        17 4.729053e+11 global
## Indonesia                                69        14 5.786621e+11 global
## Bulgaria                                 70        10 5.871003e+11 global
## Germany                                  74        31 6.105173e+11 global
## Italy                                    80        19 6.679520e+11 global
## Russia                                   84        20 7.031621e+11 global
## Denmark                                 106        15 8.890517e+11 global
## South Korea                             117        20 9.808480e+11 global
## China                                   140        17 1.158737e+12 global
## USA                                     145        34 1.201802e+12 global
## Netherlands                             153        26 1.282119e+12 global
## India                                   162        16 1.357711e+12 global
## Belgium                                 168        25 1.372753e+12 global
```

```r
write.csv(degreedf,file=paste0(prodClass,'/4_',prodClass,'_2021_degree','.csv'))

# considering continent sub networks
degreedf_c=lapply(c("Americas","Europe" , "Asia","Africa","Oceania" ),function(x){
  g_sub <- induced_subgraph(net_c, V(net_c)$name[V(net_c)$continent==x])
  data.frame(
    country=V(g_sub)$name,
    continent=V(g_sub)$continent,
    out_degree=degree(g_sub,mode='out'),
    in_degree=degree(g_sub,mode='in'),
  out_strength=strength(g_sub, mode="out"),
    scope='continent'
  )
})%>%bind_rows()%>%arrange(out_degree,in_degree)

degreedf_c%>%ggplot()+
  geom_point(aes(x=in_degree,y=out_degree,colour=continent,size=out_strength),position=position_jitter(width=2,height=1))+
  geom_text(aes(x=in_degree,y=out_degree,label=country), position=position_jitter(width=3,height=3),size=2,color='darkgrey')+ theme_economist() +
  ggtitle('in and out degrees, considering just connections in respective continents')
```

![](2_ComtradeVaccines_7NtwkA_Continents_files/figure-html/unnamed-chunk-10-2.png)<!-- -->

```r
degreedf_c
```

```
##                                                           country continent
## Morocco                                                   Morocco    Africa
## Ghana                                                       Ghana    Africa
## Togo                                                         Togo    Africa
## Côte d'Ivoire                                       Côte d'Ivoire    Africa
## Gabon                                                       Gabon    Africa
## Equatorial Guinea                               Equatorial Guinea    Africa
## Algeria                                                   Algeria    Africa
## Sudan                                                       Sudan    Africa
## Gambia                                                     Gambia    Africa
## Central African Republic                 Central African Republic    Africa
## Eritrea                                                   Eritrea    Africa
## Libya                                                       Libya    Africa
## Sao Tome and Principe                       Sao Tome and Principe    Africa
## Cape Verde                                             Cape Verde    Africa
## Guinea-Bissau                                       Guinea-Bissau    Africa
## Sierra Leone                                         Sierra Leone    Africa
## Seychelles                                             Seychelles    Africa
## Congo                                                       Congo    Africa
## Nigeria                                                   Nigeria    Africa
## Cameroon                                                 Cameroon    Africa
## Marshall Islands                                 Marshall Islands   Oceania
## Micronesia(Federated States of)   Micronesia(Federated States of)   Oceania
## Palau                                                       Palau   Oceania
## Suriname                                                 Suriname  Americas
## Cuba                                                         Cuba  Americas
## Faeroe Islands                                     Faeroe Islands    Europe
## San Marino                                             San Marino    Europe
## Burundi                                                   Burundi    Africa
## Mali                                                         Mali    Africa
## Liberia                                                   Liberia    Africa
## Comoros                                                   Comoros    Africa
## Mauritania                                             Mauritania    Africa
## Eswatini                                                 Eswatini    Africa
## Democratic Republic of the Congo Democratic Republic of the Congo    Africa
## Djibouti                                                 Djibouti    Africa
## South Sudan                                           South Sudan    Africa
## Ethiopia                                                 Ethiopia    Africa
## Chad                                                         Chad    Africa
## Lesotho                                                   Lesotho    Africa
## Mozambique                                             Mozambique    Africa
## Burkina Faso                                         Burkina Faso    Africa
## Angola                                                     Angola    Africa
## Solomon Islands                                   Solomon Islands   Oceania
## Tuvalu                                                     Tuvalu   Oceania
## Dominica                                                 Dominica  Americas
## Grenada                                                   Grenada  Americas
## Bolivia                                                   Bolivia  Americas
## Chile                                                       Chile  Americas
## Mexico                                                     Mexico  Americas
## Rwanda                                                     Rwanda    Africa
## Guinea                                                     Guinea    Africa
## Namibia                                                   Namibia    Africa
## Uganda                                                     Uganda    Africa
## Somalia                                                   Somalia    Africa
## Vanuatu                                                   Vanuatu   Oceania
## Nauru                                                       Nauru   Oceania
## Kiribati                                                 Kiribati   Oceania
## Tonga                                                       Tonga   Oceania
## Argentina                                               Argentina  Americas
## Antigua and Barbuda                           Antigua and Barbuda  Americas
## Bahamas                                                   Bahamas  Americas
## Saint Vincent and the Grenadines Saint Vincent and the Grenadines  Americas
## Jamaica                                                   Jamaica  Americas
## Costa Rica                                             Costa Rica  Americas
## Venezuela                                               Venezuela  Americas
## Paraguay                                                 Paraguay  Americas
## Haiti                                                       Haiti  Americas
## El Salvador                                           El Salvador  Americas
## Uruguay                                                   Uruguay  Americas
## Luxembourg                                             Luxembourg    Europe
## Zimbabwe                                                 Zimbabwe    Africa
## Papua New Guinea                                 Papua New Guinea   Oceania
## Panama                                                     Panama  Americas
## Saint Lucia                                           Saint Lucia  Americas
## Saint Kitts and Nevis                       Saint Kitts and Nevis  Americas
## Ecuador                                                   Ecuador  Americas
## Belarus                                                   Belarus    Europe
## Mongolia                                                 Mongolia      Asia
## Qatar                                                       Qatar      Asia
## Andorra                                                   Andorra    Europe
## Oman                                                         Oman      Asia
## Afghanistan                                           Afghanistan      Asia
## Turkmenistan                                         Turkmenistan      Asia
## Syrian Arab Republic                         Syrian Arab Republic      Asia
## Kyrgyzstan                                             Kyrgyzstan      Asia
## Bhutan                                                     Bhutan      Asia
## Yemen                                                       Yemen      Asia
## Iraq                                                         Iraq      Asia
## Kazakhstan                                             Kazakhstan      Asia
## Jordan                                                     Jordan      Asia
## Timor-Leste                                           Timor-Leste      Asia
## Bahrain                                                   Bahrain      Asia
## Tajikistan                                             Tajikistan      Asia
## Nepal                                                       Nepal      Asia
## Cambodia                                                 Cambodia      Asia
## Iran                                                         Iran      Asia
## North Macedonia                                   North Macedonia    Europe
## Malta                                                       Malta    Europe
## Bosnia and Herzegovina                     Bosnia and Herzegovina    Europe
## Cyprus                                                     Cyprus    Europe
## Lao People's Democratic Republic Lao People's Democratic Republic      Asia
## Bangladesh                                             Bangladesh      Asia
## Myanmar                                                   Myanmar      Asia
## Albania                                                   Albania    Europe
## Poland                                                     Poland    Europe
## Maldives                                                 Maldives      Asia
## Madagascar                                             Madagascar    Africa
## Mauritius                                               Mauritius    Africa
## Niger                                                       Niger    Africa
## Egypt                                                       Egypt    Africa
## Belize                                                     Belize  Americas
## Peru                                                         Peru  Americas
## Samoa                                                       Samoa   Oceania
## Honduras                                                 Honduras  Americas
## Guatemala                                               Guatemala  Americas
## Trinidad and Tobago                           Trinidad and Tobago  Americas
## Uzbekistan                                             Uzbekistan      Asia
## Malawi                                                     Malawi    Africa
## Zambia                                                     Zambia    Africa
## Iceland                                                   Iceland    Europe
## Finland                                                   Finland    Europe
## Armenia                                                   Armenia      Asia
## Lebanon                                                   Lebanon      Asia
## Brunei Darussalam                               Brunei Darussalam      Asia
## Pakistan                                                 Pakistan      Asia
## Kuwait                                                     Kuwait      Asia
## Turkey                                                     Turkey      Asia
## Sri Lanka                                               Sri Lanka      Asia
## Montenegro                                             Montenegro    Europe
## Philippines                                           Philippines      Asia
## Senegal                                                   Senegal    Africa
## Tunisia                                                   Tunisia    Africa
## Guyana                                                     Guyana  Americas
## Israel                                                     Israel      Asia
## Colombia                                                 Colombia  Americas
## Azerbaijan                                             Azerbaijan      Asia
## Georgia                                                   Georgia      Asia
## Slovenia                                                 Slovenia    Europe
## Republic of Moldova                           Republic of Moldova    Europe
## Portugal                                                 Portugal    Europe
## Ukraine                                                   Ukraine    Europe
## Botswana                                                 Botswana    Africa
## Tanzania                                                 Tanzania    Africa
## Nicaragua                                               Nicaragua  Americas
## Saudi Arabia                                         Saudi Arabia      Asia
## Greece                                                     Greece    Europe
## Dominican Republic                             Dominican Republic  Americas
## Vietnam                                                   Vietnam      Asia
## Latvia                                                     Latvia    Europe
## Estonia                                                   Estonia    Europe
## Serbia                                                     Serbia    Europe
## Australia                                               Australia   Oceania
## Croatia                                                   Croatia    Europe
## New Zealand                                           New Zealand   Oceania
## Malaysia                                                 Malaysia      Asia
## Austria                                                   Austria    Europe
## Norway                                                     Norway    Europe
## Lithuania                                               Lithuania    Europe
## Barbados                                                 Barbados  Americas
## Slovakia                                                 Slovakia    Europe
## Fiji                                                         Fiji   Oceania
## South Africa                                         South Africa    Africa
## Czechia                                                   Czechia    Europe
## Thailand                                                 Thailand      Asia
## Ireland                                                   Ireland    Europe
## Romania                                                   Romania    Europe
## Kenya                                                       Kenya    Africa
## UK                                                             UK    Europe
## Brazil                                                     Brazil  Americas
## Sweden                                                     Sweden    Europe
## Singapore                                               Singapore      Asia
## Spain                                                       Spain    Europe
## Canada                                                     Canada  Americas
## Switzerland                                           Switzerland    Europe
## Japan                                                       Japan      Asia
## Bulgaria                                                 Bulgaria    Europe
## United Arab Emirates                         United Arab Emirates      Asia
## Hungary                                                   Hungary    Europe
## Russia                                                     Russia      Asia
## Denmark                                                   Denmark    Europe
## Indonesia                                               Indonesia      Asia
## Netherlands                                           Netherlands    Europe
## Italy                                                       Italy    Europe
## Germany                                                   Germany    Europe
## USA                                                           USA  Americas
## South Korea                                           South Korea      Asia
## Belgium                                                   Belgium    Europe
## China                                                       China      Asia
## India                                                       India      Asia
##                                  out_degree in_degree out_strength     scope
## Morocco                                   0         0            0 continent
## Ghana                                     0         0            0 continent
## Togo                                      0         0            0 continent
## Côte d'Ivoire                             0         0            0 continent
## Gabon                                     0         0            0 continent
## Equatorial Guinea                         0         0            0 continent
## Algeria                                   0         0            0 continent
## Sudan                                     0         0            0 continent
## Gambia                                    0         0            0 continent
## Central African Republic                  0         0            0 continent
## Eritrea                                   0         0            0 continent
## Libya                                     0         0            0 continent
## Sao Tome and Principe                     0         0            0 continent
## Cape Verde                                0         0            0 continent
## Guinea-Bissau                             0         0            0 continent
## Sierra Leone                              0         0            0 continent
## Seychelles                                0         0            0 continent
## Congo                                     0         0            0 continent
## Nigeria                                   0         0            0 continent
## Cameroon                                  0         0            0 continent
## Marshall Islands                          0         0            0 continent
## Micronesia(Federated States of)           0         0            0 continent
## Palau                                     0         0            0 continent
## Suriname                                  0         1            0 continent
## Cuba                                      0         1            0 continent
## Faeroe Islands                            0         1            0 continent
## San Marino                                0         1            0 continent
## Burundi                                   0         1            0 continent
## Mali                                      0         1            0 continent
## Liberia                                   0         1            0 continent
## Comoros                                   0         1            0 continent
## Mauritania                                0         1            0 continent
## Eswatini                                  0         1            0 continent
## Democratic Republic of the Congo          0         1            0 continent
## Djibouti                                  0         1            0 continent
## South Sudan                               0         1            0 continent
## Ethiopia                                  0         1            0 continent
## Chad                                      0         1            0 continent
## Lesotho                                   0         1            0 continent
## Mozambique                                0         1            0 continent
## Burkina Faso                              0         1            0 continent
## Angola                                    0         1            0 continent
## Solomon Islands                           0         1            0 continent
## Tuvalu                                    0         1            0 continent
## Dominica                                  0         2            0 continent
## Grenada                                   0         2            0 continent
## Bolivia                                   0         2            0 continent
## Chile                                     0         2            0 continent
## Mexico                                    0         2            0 continent
## Rwanda                                    0         2            0 continent
## Guinea                                    0         2            0 continent
## Namibia                                   0         2            0 continent
## Uganda                                    0         2            0 continent
## Somalia                                   0         2            0 continent
## Vanuatu                                   0         2            0 continent
## Nauru                                     0         2            0 continent
## Kiribati                                  0         2            0 continent
## Tonga                                     0         2            0 continent
## Argentina                                 0         3            0 continent
## Antigua and Barbuda                       0         3            0 continent
## Bahamas                                   0         3            0 continent
## Saint Vincent and the Grenadines          0         3            0 continent
## Jamaica                                   0         3            0 continent
## Costa Rica                                0         3            0 continent
## Venezuela                                 0         3            0 continent
## Paraguay                                  0         3            0 continent
## Haiti                                     0         3            0 continent
## El Salvador                               0         3            0 continent
## Uruguay                                   0         3            0 continent
## Luxembourg                                0         3            0 continent
## Zimbabwe                                  0         3            0 continent
## Papua New Guinea                          0         3            0 continent
## Panama                                    0         4            0 continent
## Saint Lucia                               0         4            0 continent
## Saint Kitts and Nevis                     0         4            0 continent
## Ecuador                                   0         4            0 continent
## Belarus                                   0         4            0 continent
## Mongolia                                  0         4            0 continent
## Qatar                                     0         4            0 continent
## Andorra                                   0         5            0 continent
## Oman                                      0         5            0 continent
## Afghanistan                               0         5            0 continent
## Turkmenistan                              0         5            0 continent
## Syrian Arab Republic                      0         5            0 continent
## Kyrgyzstan                                0         5            0 continent
## Bhutan                                    0         5            0 continent
## Yemen                                     0         5            0 continent
## Iraq                                      0         5            0 continent
## Kazakhstan                                0         5            0 continent
## Jordan                                    0         5            0 continent
## Timor-Leste                               0         6            0 continent
## Bahrain                                   0         6            0 continent
## Tajikistan                                0         6            0 continent
## Nepal                                     0         6            0 continent
## Cambodia                                  0         6            0 continent
## Iran                                      0         6            0 continent
## North Macedonia                           0         7            0 continent
## Malta                                     0         9            0 continent
## Bosnia and Herzegovina                    0         9            0 continent
## Cyprus                                    0         9            0 continent
## Lao People's Democratic Republic          0         9            0 continent
## Bangladesh                                0         9            0 continent
## Myanmar                                   0         9            0 continent
## Albania                                   0        10            0 continent
## Poland                                    0        10            0 continent
## Maldives                                  0        10            0 continent
## Madagascar                                1         0   8387712719 continent
## Mauritius                                 1         1   8385878367 continent
## Niger                                     1         1   8387710301 continent
## Egypt                                     1         1   8387660019 continent
## Belize                                    1         2   8387709851 continent
## Peru                                      1         2   8387697758 continent
## Samoa                                     1         2   8387712727 continent
## Honduras                                  1         3   8387712631 continent
## Guatemala                                 1         3   8387712617 continent
## Trinidad and Tobago                       1         3   8387712730 continent
## Uzbekistan                                1         3   8387163397 continent
## Malawi                                    1         3   8387712694 continent
## Zambia                                    1         3   8386642568 continent
## Iceland                                   1         4   8387712699 continent
## Finland                                   1         5   8387712725 continent
## Armenia                                   1         5   8387707057 continent
## Lebanon                                   1         5   8387695146 continent
## Brunei Darussalam                         1         6   8387704646 continent
## Pakistan                                  1         6   8387559806 continent
## Kuwait                                    1         7   8387661438 continent
## Turkey                                    1         8   8387687606 continent
## Sri Lanka                                 1         9   8387712180 continent
## Montenegro                                1        10   8387712707 continent
## Philippines                               1        11   8387678107 continent
## Senegal                                   2         0  16775380052 continent
## Tunisia                                   2         0  16773958779 continent
## Guyana                                    2         2  16775267592 continent
## Israel                                    2         3  16775340462 continent
## Colombia                                  2         4  16774846444 continent
## Azerbaijan                                2         5  16774180014 continent
## Georgia                                   2         5  16775087279 continent
## Slovenia                                  2         7  16773885609 continent
## Republic of Moldova                       2         8  16775335265 continent
## Portugal                                  2        11  16775199825 continent
## Ukraine                                   2        14  16775402095 continent
## Botswana                                  3         1  25162690607 continent
## Tanzania                                  3         1  25163096438 continent
## Nicaragua                                 3         2  25146526221 continent
## Saudi Arabia                              3         5  25161668331 continent
## Greece                                    3         9  25159090995 continent
## Dominican Republic                        4         4  33550588011 continent
## Vietnam                                   4         8  33550663535 continent
## Latvia                                    4         9  33550558207 continent
## Estonia                                   4        10  33549356619 continent
## Serbia                                    4        11  33550783874 continent
## Australia                                 5         2  41937109759 continent
## Croatia                                   5         9  41937950411 continent
## New Zealand                               6         2  50325539713 continent
## Malaysia                                  6         8  50322360494 continent
## Austria                                   6        11  50021772179 continent
## Norway                                    7        10  58709654165 continent
## Lithuania                                 7        13  58698584645 continent
## Barbados                                  8         4  67101422409 continent
## Slovakia                                  8         8  67090622003 continent
## Fiji                                      9         2  75486765273 continent
## South Africa                             12         3 100649354941 continent
## Czechia                                  12        15 100633307564 continent
## Thailand                                 13         9 108987609326 continent
## Ireland                                  13        12 105125965356 continent
## Romania                                  14         6 117423711321 continent
## Kenya                                    16         2 134200033692 continent
## UK                                       17        13 142195733176 continent
## Brazil                                   19         2 159362965061 continent
## Sweden                                   19         6 159360454718 continent
## Singapore                                19         7 159327569434 continent
## Spain                                    20        12 161721634696 continent
## Canada                                   21         2 175818852184 continent
## Switzerland                              21        10 171232080259 continent
## Japan                                    22         3 184373333542 continent
## Bulgaria                                 22         8 184512393393 continent
## United Arab Emirates                     23         7 192581727065 continent
## Hungary                                  25        11 209533015580 continent
## Russia                                   27         7 225817417753 continent
## Denmark                                  27        11 226451424078 continent
## Indonesia                                29         7 243185257493 continent
## Netherlands                              29        14 242772680030 continent
## Italy                                    30        12 249342491951 continent
## Germany                                  32        19 261763589622 continent
## USA                                      33         3 269995738197 continent
## South Korea                              35         6 293325422715 continent
## Belgium                                  37        11 295894744097 continent
## China                                    43         6 351036610872 continent
## India                                    44         6 368450215317 continent
```

```r
# joint plots
library(cowplot)
```

```
## 
## Attaching package: 'cowplot'
```

```
## The following object is masked from 'package:ggthemes':
## 
##     theme_map
```

```r
c_degreedf=rbind(degreedf,degreedf_c)
c_degreedf_2=c_degreedf%>%reshape(direction='wide',idvar =c( 'country','continent'),timevar='scope')
ggplot()+
  geom_segment(data=c_degreedf_2,
                 aes(x = in_degree.global, y = out_degree.global, 
                     xend = in_degree.continent, yend = out_degree.continent),
               color='#FFCCCC',
               arrow = arrow(length = unit(0.03, "npc")))+
  scale_x_continuous(limits = c(0, 40))+scale_y_continuous(limits = c(0, 175))+ theme_economist() +
  geom_text(data=c_degreedf_2,
            aes(x=in_degree.global,y=out_degree.global,label=country),
            color='blue', size=6,position=position_jitter(width=1,height=3)) +
  geom_point(data=c_degreedf, 
             aes(x=in_degree,y=out_degree,color=interaction(scope, continent, sep=':'),size=out_strength),
             )+
  guides(color=guide_legend(title='Scope and Continent'))+
  theme(legend.position="right",
        legend.text=element_text(size=12),
        legend.title=element_text(size=12))
```

```
## Warning: Removed 56 rows containing missing values (`geom_text()`).
```

![](2_ComtradeVaccines_7NtwkA_Continents_files/figure-html/unnamed-chunk-10-3.png)<!-- -->

```r
ggsave(file=paste0(prodClass,'/4_',prodClass,'_2021_degreesGlobe','.png'),width=13,height=8)
```

```
## Warning: Removed 56 rows containing missing values (`geom_text()`).
```

### in-out degrees For each continent

```r
# separated plots for continents
plotDegreesChange<-function(continent,c_degree_f,c_degree2_f){
  library(dplyr)
  c_degree_f=c_degreedf[c_degreedf$continent==continent,]
  c_degree2_f=c_degreedf_2[c_degreedf_2$continent==continent,]
  g<-ggplot()+
  geom_segment(data=c_degree2_f,
                 aes(x = in_degree.global, y = out_degree.global, 
                     xend = in_degree.continent, yend = out_degree.continent),color='#FFCCCC',
               arrow = arrow(length = unit(0.03, "npc")))+
  geom_point(data=c_degree_f, aes(x=in_degree,y=out_degree,color=scope,size=out_strength),
             )+
  scale_x_continuous(limits = c(0, 40))+scale_y_continuous(limits = c(0, 175))+ theme_economist() +
  geom_text(data=c_degree2_f, aes(x=in_degree.global,y=out_degree.global,label=country),color='blue', 
            size=3)+
  theme(legend.position="right",
        legend.text=element_text(size=14),
        legend.title=element_text(size=14))
  return(g)
}
```

### trade connections in each continent 


```r
x='2021'
dt=dt_list[['2021']]


plotTradeConnections<-function(dt,continent){
  library(countrycode)
  library(maps)
  library(viridis)
  
  dt<-dt%>%group_by(Reporter)%>%mutate(TotalTrade=sum(primaryValue))%>%ungroup()
  # getting world.cities data ========== 
  data(world.cities)
  capital_cities<-world.cities[world.cities$capital==1,]
  
  capital_cities[capital_cities$long < -30,'long'] = capital_cities[capital_cities$long < -30,'long'] + 360
  capital_cities$Continent <- countrycode(sourcevar = capital_cities$country.etc,
                                origin = "country.name",
                                destination = "continent")
    #TODO if Asia, remove  Russia
  capital_cities[capital_cities$country.etc=='Russia','Continent']<-'Asia'
  capital_cities<-capital_cities%>%filter(Continent==continent)
  
  comtrade_countries<-dt$Reporter%>%unique()
  mapdata_countriews<-capital_cities$country.etc%>%unique()
  comtrade_countries[!comtrade_countries%in%mapdata_countriews]
  capital_cities[capital_cities$country.etc=='Korea South','country.etc']<-'South Korea'
  
  capdata<-left_join(dt,capital_cities, by=c("Reporter"="country.etc"))
  capdata<-capdata%>%filter(!is.na(lat),!is.na(long))
  
  # get geolocation information for partner ===========
  capdata_vec<-left_join(capdata,capital_cities, by=c("Partner"="country.etc"))%>%filter(!is.na(long.x),!is.na(lat.x))
  
  capdata_vec$Rep_continent <- countrycode(sourcevar = capdata_vec$Reporter,
                                origin = "country.name",
                                destination = "continent")
  capdata_vec$Part_continent <- countrycode(sourcevar = capdata_vec$Partner,
                                origin = "country.name",
                                destination = "continent")
  
  #TODO if Asia, add  Russia, if Europe, remove Russia
  capdata_vec<-capdata_vec%>%filter(Part_continent==continent)
  if (continent=='Europe'){
    capdata_vec<-capdata_vec%>%filter(Reporter!='Russia',Partner!='Russia')
  } else if (continent=='Asia'){
    capdata_vec[capdata_vec$Reporter=='Russia','Rep_continent']<-'Asia'
    capdata_vec[capdata_vec$Partner=='Russia','Part_continent']<-'Asia'
    #capdata_vec[capdata_vec$Reporter=='Cyprus','Rep_continent']<-'Europe'
    #capdata_vec[capdata_vec$Partner=='Cyprus','Part_continent']<-'Europe'
  }
  
  capdata_vec<-capdata_vec%>%filter(Rep_continent==continent)
  countries_list=capital_cities$country.etc
  countries_list<-c(countries_list,capdata_vec$Partner)%>%unique()
  some.eu.maps <- map_data("world2", region = countries_list,
                           wrap=c(-30,330), ylim=c(-55,75))
  some.eu.maps<-left_join(some.eu.maps,net_infoMapcl_continents,by=c('region'='Country'))
  xmax= max(some.eu.maps$long)+10
  if (continent=='Americas'){
    xmin=min(some.eu.maps[some.eu.maps$long>10,'long'])
  }else{
    xmin=min(some.eu.maps$long)
  }
  
  mapdata <- left_join(some.eu.maps, dt, by=c("region"="Reporter"))
  #net_infoMapcl_continents
  g<-ggplot() +
    geom_map(data=mapdata,aes(map_id = region, fill = factor(infoMap_membership)), map = some.eu.maps, show.legend=FALSE) +
  geom_polygon(data = some.eu.maps, aes(x=long, y = lat, group = group), colour = 'black', fill = NA)+
  geom_curve(data = capdata_vec, aes(x = long.x,    y = lat.x, 
                               xend = long.y, yend = lat.y,
                               linewidth=primaryValue,color=primaryValue
                               ),alpha=0.3,arrow = arrow(length = unit(0.03, "npc")),
             show.legend=c(linewidth=FALSE,color=FALSE))+
    scale_size_continuous(range=c(0.01,1),trans="log10",limits=c(1,10^9),
                        breaks = 10^(c(1,3,5,7,9))) +
  scale_color_viridis(guide='legend',trans="log10",limits=c(1,10^9),
                      breaks = 10^(c(1,3,5,7,9)),direction=-1,option="mako") +
    #new_scale("size") +new_scale_color()+
  geom_point(data=capdata_vec,aes(x=long.x,y=lat.x,
                                  color=TotalTrade,
                                  size=TotalTrade),show.legend=c(size=FALSE,color=TRUE))+
    scale_size_continuous(range=c(1,13),trans="log10",limits=c(1,10^10),
                        breaks = 10^(1:10))+
  scale_color_viridis(guide='legend',trans="log10",limits=c(1,10^10),
                      breaks = 10^(1:10),direction=-1,option='cividis') +
  coord_equal()+ theme_economist()+
    ggtitle('Trade')+
    coord_fixed(ratio=1.6, 
                xlim = c(xmin,xmax),
                ylim=c(min(some.eu.maps$lat),max(some.eu.maps$lat)),expand=TRUE)+
        theme(legend.position = "bottom",
              legend.text=element_text(size=12),
              legend.title = element_text(size=12),
              axis.title.x=element_blank(),
              axis.text.x=element_blank(),
              axis.ticks.x=element_blank())
  return(g)
}
```

# Continents
now, we use the functions above to allow visualization per continent:
- the ggplot with in-and out degrees, 
- continent subnet structure
- TradeMap in the continent



## Americas

```r
x='Americas'
library(manipulateWidget)
library(plotly)
```

```
## 
## Attaching package: 'plotly'
```

```
## The following object is masked from 'package:igraph':
## 
##     groups
```

```
## The following object is masked from 'package:ggplot2':
## 
##     last_plot
```

```
## The following object is masked from 'package:stats':
## 
##     filter
```

```
## The following object is masked from 'package:graphics':
## 
##     layout
```

```r
g<-plotTradeConnections(dt=dt,continent=x)
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

```
## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Micronesia
```

```
## Scale for size is already present.
## Adding another scale for size, which will replace the existing scale.
```

```
## Scale for colour is already present.
## Adding another scale for colour, which will replace the existing scale.
## Coordinate system already present. Adding new coordinate system, which will
## replace the existing one.
```

```r
contWidg<-ContinentNetwidgets(continent=x)
degPlot<-plotDegreesChange(continent=x,c_degree_f=c_degree_f,c_degree2_f=c_degree2_f)
allws<-combineWidgets(ncol=2,colsize=c(2,2),
                      # TradeMaps at left vertical 1/3
                      staticPlot(plot(g), height =800, width=600),
                     combineWidgets(nrow=2,rowsize=c(1,1),
                        # network ContinentNetwidgets (threejs plots)
                          contWidg,
                        # in-out-dgrees plot cplots
                          staticPlot(plot(degPlot),height = 350, width=500)
                            #)
                      )
)
```

```
## Warning: Removed 3 rows containing missing values (`geom_curve()`).
```

```
## Warning: Removed 34 rows containing missing values (`geom_point()`).
```

```r
htmlwidgets::saveWidget(allws, paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'))
knitr::include_url(paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'), height="1080px")
```

<iframe src="7_ComtradeVaccine/7_ComtradeVaccine_ContDegreesAmericas.html" width="100%" height="1080px" data-external="1"></iframe>

## Europe

```r
x='Europe'
# To ease visualization, Russia is not added as Europe, as its major part is at Asia
rm(g,contWidg,degPlot)
g<-plotTradeConnections(dt=dt,continent=x)
```

```
## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Micronesia
```

```
## Scale for size is already present.
## Adding another scale for size, which will replace the existing scale.
## Scale for colour is already present.
## Adding another scale for colour, which will replace the existing scale.
## Coordinate system already present. Adding new coordinate system, which will
## replace the existing one.
```

```r
contWidg<-ContinentNetwidgets(continent=x)
degPlot<-plotDegreesChange(continent=x,c_degree_f=c_degree_f,c_degree2_f=c_degree2_f)
allws<-combineWidgets(ncol=2,colsize=c(3,2),
                      # TradeMaps at top
                      staticPlot(plot(g), height =800, width=800),
                     combineWidgets(nrow=2,rowsize=c(1,1),
                        # network ContinentNetwidgets (threejs plots)
                          contWidg,
                        # in-out-dgrees plot cplots
                          staticPlot(plot(degPlot),height = 350, width=500)
                            #)
                      )
)
```

```
## Warning: Removed 34 rows containing missing values (`geom_curve()`).
```

```
## Warning: Removed 67 rows containing missing values (`geom_point()`).
```

```r
htmlwidgets::saveWidget(allws, paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'))
knitr::include_url(paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'), height="1080px")
```

<iframe src="7_ComtradeVaccine/7_ComtradeVaccine_ContDegreesEurope.html" width="100%" height="1080px" data-external="1"></iframe>

## Asia

```r
x='Asia'
# Russia is added here, not Europe, for better visualization
rm(g,contWidg,degPlot)
g<-plotTradeConnections(dt=dt,continent=x)
```

```
## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Micronesia
```

```
## Scale for size is already present.
## Adding another scale for size, which will replace the existing scale.
## Scale for colour is already present.
## Adding another scale for colour, which will replace the existing scale.
## Coordinate system already present. Adding new coordinate system, which will
## replace the existing one.
```

```r
contWidg<-ContinentNetwidgets(continent=x)
degPlot<-plotDegreesChange(continent=x,c_degree_f=c_degree_f,c_degree2_f=c_degree2_f)
allws<-combineWidgets(ncol=2,colsize=c(3,2),
                      # TradeMaps at top
                      staticPlot(plot(g), height =800, width=800),
                     combineWidgets(nrow=2,rowsize=c(1,1),
                        # network ContinentNetwidgets (threejs plots)
                          contWidg,
                        # in-out-dgrees plot cplots
                          staticPlot(plot(degPlot),height = 350, width=500)
                            #)
                      )
)
```

```
## Warning: Removed 26 rows containing missing values (`geom_curve()`).
```

```
## Warning: Removed 42 rows containing missing values (`geom_point()`).
```

```r
htmlwidgets::saveWidget(allws, paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'))
knitr::include_url(paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'), height="1080px")
```

<iframe src="7_ComtradeVaccine/7_ComtradeVaccine_ContDegreesAsia.html" width="100%" height="1080px" data-external="1"></iframe>
## Africa

```r
x='Africa'
rm(g,contWidg,degPlot)
g<-plotTradeConnections(dt=dt,continent=x)
```

```
## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Micronesia
```

```
## Scale for size is already present.
## Adding another scale for size, which will replace the existing scale.
## Scale for colour is already present.
## Adding another scale for colour, which will replace the existing scale.
## Coordinate system already present. Adding new coordinate system, which will
## replace the existing one.
```

```r
contWidg<-ContinentNetwidgets(continent=x)
degPlot<-plotDegreesChange(continent=x,c_degree_f=c_degree_f,c_degree2_f=c_degree2_f)
allws<-combineWidgets(ncol=2,colsize=c(2,2),
                      # TradeMaps at top
                      staticPlot(plot(g), height =800, width=600),
                     combineWidgets(nrow=2,rowsize=c(1,1),
                        # network ContinentNetwidgets (threejs plots)
                          contWidg,
                        # in-out-dgrees plot cplots
                          staticPlot(plot(degPlot),height = 350, width=500)
                            #)
                      )
)
```

```
## Warning: Removed 3 rows containing missing values (`geom_curve()`).
```

```r
htmlwidgets::saveWidget(allws, paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'))
knitr::include_url(paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'), height="1080px")
```

<iframe src="7_ComtradeVaccine/7_ComtradeVaccine_ContDegreesAfrica.html" width="100%" height="1080px" data-external="1"></iframe>
## Oceania

```r
x='Oceania'
rm(g,contWidg,degPlot)
g<-plotTradeConnections(dt=dt,continent=x)
```

```
## Warning in countrycode_convert(sourcevar = sourcevar, origin = origin, destination = dest, : Some values were not matched unambiguously: Micronesia
```

```
## Scale for size is already present.
## Adding another scale for size, which will replace the existing scale.
## Scale for colour is already present.
## Adding another scale for colour, which will replace the existing scale.
## Coordinate system already present. Adding new coordinate system, which will
## replace the existing one.
```

```r
contWidg<-ContinentNetwidgets(continent=x)
degPlot<-plotDegreesChange(continent=x,c_degree_f=c_degree_f,c_degree2_f=c_degree2_f)
allws<-combineWidgets(ncol=2,colsize=c(3,2),
                      # TradeMaps at top
                      staticPlot(plot(g), height =800, width=800),
                     combineWidgets(nrow=2,rowsize=c(1,1),
                        # network ContinentNetwidgets (threejs plots)
                          contWidg,
                        # in-out-dgrees plot cplots
                          staticPlot(plot(degPlot),height = 350, width=500)
                            #)
                      )
)
```

```
## Warning: Removed 2 rows containing missing values (`geom_curve()`).
```

```r
htmlwidgets::saveWidget(allws, paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'))
knitr::include_url(paste0(prodClass,'/',prodClass,'_ContDegrees',x,'.html'), height="1080px")
```

<iframe src="7_ComtradeVaccine/7_ComtradeVaccine_ContDegreesOceania.html" width="100%" height="1080px" data-external="1"></iframe>

```r
# TradeMaps at top-left

# network bottom ContinentNetwidgets

# cplots in-out-dgrees plot  at top-right (small)
```
- global providers are characterized by the significant vertical shift.
- although USA and major Asia and European exporter countries show diagonal shift in the plot, Africa and Oceania's major exporters show mostly a horizontal shift  with proportionally lower vertical shift.
- almost horizontal shift for Australia  and South Africa point they are local providers, whereas are also depend on suppliers external to the continent.



# Final considerations

The use of network centrality measures enable us several interesting insights:
- the increase in the connectivity in terms of number of export partners (out-degree centrality) from 2018 to 2021 mostly followed an already existent trend.
- The closeness (the measure of steps required bye each node - country - to reach all members in the network) shows high connectedness was taking place since 2000 already.
- The evolution of countries strength illustrates all major players increased their export volumes, thought Belgium, India,Netherlands,USA, Germany and Sought Korea appears to have increased more than the remaining members of the analyzed countries.
- The change om the (out-) betweeness centrality was present in all period. USA have increased its centrality since 2015, and kept such role, reaching the Belgium's level.

- Considering the eigen centrality, it appears the centrality of the countries have no changed notably from 2019 to 2021; 

The hub score, otherwise, indicate 
- Belgium kept its role of higher hub-score;
- the India increased its centrality role, but following the trend already presented previously;
- USA had already a trend for increase, but we can say it appears the COVID crisis accelerated it;
- Netherlands showed also a increase which can be yet following a previous trend;
- the notorious is China, which show higher increase than others

# possibly useful
what to assess:
- critical supply sources and the influence of geopolitical uncertainty; labor unrest; energy shortages; extreme weather
- there are additional buffer to adjust inventories in case of any shortage regarding one supplier? 
- The further away a product is manufactured, the more susceptible it is to a supply chain disruption.



# Refs
D. Kahle and H. Wickham. ggmap: Spatial Visualization with ggplot2. The R Journal,  5(1), 144-161. URL http://journal.r-project.org/archive/2013-1/kahle-wickham.pdf

Laker, Benjamin. Global Supply Chain Crisis: Lessons For Leaders. Forbes, jan 11 2023. available at: https://www.forbes.com/sites/benjaminlaker/2023/01/11/global-supply-chain-crisis-lessons-for-leaders/?sh=20f96e534a8d

Shiffling, Sarah; Kanellos N.V. 5 challenges facing global supply chains. World Economic Forum.  Sep 7, 2022. available at: https://www.weforum.org/agenda/2022/09/5-challenges-global-supply-chains-trade
