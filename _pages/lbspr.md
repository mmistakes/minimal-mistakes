---
layout: splash
title: Length-Based SPR 
permalink: /lbspr.html

---

## Length-Based Spawning Potential Ratio
The LBSPR method has been developed for data-limited fisheries, where few data are available other than a representative sample of the size structure of the vulnerable portion of the population (i.e., the catch) and an understanding of the life history of the species.  The LBSPR method does not require knowledge of the natural mortality rate (*M*), but instead uses the ratio of natural mortality and the von Bertalanffy growth coefficient (*K*) (*M*//*K*), which is believed to vary less across stocks and species than *M* (Prince et al. 2015).  

Like any assessment method, the LBSPR model relies on a number of simplifying assumptions. In particular, the LBSPR models are equilibrium based, and assume that the length composition data is representative of the exploited population at steady state. See the publicaitons listed in the reference list for full details of the assumptions of the model, including simulation testing to evauate the effect of violations of these assumptions.  

### Bug Reports
The LBSPR R Shiny application is under constant development. It is possible, even highly likely, that there are bugs and issues with some of the functions. Please contact us if you find any bugs or  other issues (either [email](/contact) or [GitHub](https://github.com/AdrianHordyk/LBSPR_shiny/issues)).

Comments and suggestions for additional features are welcome. GitHub pull requests with modifications or extensions are even more welcome!

Finally, please make sure you understand the data and the biological parameters (and how the model treats these) and critically evaluate any output of the LBSPR model. 

### Download the Code


{::nomarkdown}
Fork the GitHub repos: 
Shiny app 
<iframe style="display: inline-block;" src="https://ghbtns.com/github-btn.html?user=adrianhordyk&repo=LBSPR_shiny&type=fork=true&size=large" frameborder="0" scrolling="0" width="100px" height="30px"></iframe> 
LBSPR R package
<iframe style="display: inline-block;" src="https://ghbtns.com/github-btn.html?user=adrianhordyk&repo=lbspr&type=fork=true&size=large" frameborder="0" scrolling="0" width="120px" height="30px"></iframe> 
{:/nomarkdown}
<br>
Download the files: 
<a href="https://github.com/AdrianHordyk/LBSPR_shiny/zipball/master" class="fa fa-download"><span> Shiny app  </span></a>
&nbsp;
<a href="https://github.com/AdrianHordyk/lbspr/zipball/master" class="fa fa-download"><span> LBSPR R Package </span></a>

## LBSPR R Shiny App
<iframe src="http://142.103.48.20:3838/LBSPR/" height="1600px" width="100%" frameBorder="0">
  Your browser doesn't support iframes
</iframe>




