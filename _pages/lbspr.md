---
layout: splash
title: Length-Based SPR 
permalink: /lbspr.html

---

## Length-Based Spawning Potential Ratio
The LBSPR method has been developed for data-limited fisheries, where few data are available other than a representative sample of the size structure of the vulnerable portion of the population (i.e., the catch) and an understanding of the life history of the species.  The LBSPR method does not require knowledge of the natural mortality rate (*M*), but instead uses the ratio of natural mortality and the von Bertalanffy growth coefficient (*K*) (*M*//*K*), which is believed to vary less across stocks and species than *M* (Prince et al. 2015).  

Like any assessment method, the LBSPR model relies on a number of simplifying assumptions. In particular, the LBSPR models are equilibrium based, and assume that the length composition data is representative of the exploited population at steady state. See the publicaitons listed in the reference list for full details of the assumptions of the model, including simulation testing to evauate the effect of violations of these assumptions.  

### Bug Reports
The LBSPR application is still in development. It is possible, even highly likely, that there are bugs and issues with some of the functions. Please alert me to any bugs or issues that you come across (either email or GitHub).

Comments and suggestions for additional features are welcome. GitHub pull requests with modifications or extensions are even more welcome!

Finally, please make sure you understand the data and the biological parameters (and how the model treats these) and critically evaluate any output of the LBSPR model. As they say: 

> All Care Taken But We Accept No Responsibility 

<iframe src="http://server.adrianhordyk.com/shiny/lbspr/" height="1600px" width="100%" frameBorder="0">
  Your browser doesn't support iframes
</iframe>


## References

Hordyk, A.R., Ono, K., Sainsbury, K.J., Loneragan, N., and Prince, J.D. 2015a. Some explorations of the life history ratios to describe length composition, spawning-per-recruit, and the spawning potential ratio. ICES J. Mar. Sci. 72: 204–216.

Hordyk, A.R., Ono, K., Valencia, S.R., Loneragan, N.R., and Prince, J.D. 2015b. A novel length-based empirical estimation method of spawning potential ratio (SPR), and tests of its performance, for small-scale, data-poor fisheries. ICES J. Mar. Sci. 72: 217–231. 

Hordyk, A.R., Loneragan, N.R., and Prince, J.D. 2015c. An evaluation of an iterative harvest strategy for data-poor fisheries using the length-based spawning potential ratio assessment methodology. Fish. Res. 171: 20–32.

Hordyk, A., Ono, K., Prince, J.D., and Walters, C.J. 2016. A simple length-structured model based on life history ratios and incorporating size-dependent selectivity: application to spawning potential ratios for data-poor stocks. Can. J. Fish. Aquat. Sci. 13: 1–13. doi: 10.1139/cjfas-2015-0422.

Prince, J.D., Hordyk, A.R., Valencia, S.R., Loneragan, N.R., and Sainsbury, K.J. 2015. Revisiting the concept of Beverton–Holt life-history invariants with the aim of informing data-poor fisheries assessment. ICES J. Mar. Sci. 72: 194–203.


<!-- <h3> Download the Code </h3>

<div style="width:800px; margin:0 auto; position:relative;">
<section id="downloads" class="clearfix" >
<a href="https://github.com/AdrianHordyk/lbspr/zipball/master" id="download-zip" class="button"><span>Download .zip</span></a>
<a href="https://github.com/AdrianHordyk/lbspr/tarball/master" id="download-tar-gz" class="button"><span>Download .tar.gz</span></a>
<a href="https://github.com/AdrianHordyk/lbspr" id="view-on-github" class="button"><span>View on GitHub</span></a>
</section>
</div>                    
-->

  