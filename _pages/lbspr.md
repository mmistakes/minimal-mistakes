---
layout: splash
title: Length-Based SPR 
permalink: /lbspr.html

---

## Length-Based Spawning Potential Ratio
The LBSPR method has been developed for data-limited fisheries, where few data are available other than a representative sample of the size structure of the vulnerable portion of the population (i.e., the catch) and an understanding of the life history of the species.  The LBSPR method does not require knowledge of the natural mortality rate (*M*), but instead uses the ratio of natural mortality and the von Bertalanffy growth coefficient (*K*) (*M*//*K*), which is believed to vary less across stocks and species than *M* (Prince et al. 2015).  

Like any assessment method, the LBSPR model relies on a number of simplifying assumptions. In particular, the LBSPR models are equilibrium based, and assume that the length composition data is representative of the exploited population at steady state. See the publicaitons listed in the reference list for full details of the assumptions of the model, including simulation testing to evauate the effect of violations of these assumptions.  

### Bug Reports
The LBSPR application is still in development. It is possible, even highly likely, that there are bugs and issues with some of the functions. Please contact us if you find any bugs or  other issues (either email or GitHub).

Comments and suggestions for additional features are welcome. GitHub pull requests with modifications or extensions are even more welcome!

Finally, please make sure you understand the data and the biological parameters (and how the model treats these) and critically evaluate any output of the LBSPR model. As they say: 

> All Care Taken But We Accept No Responsibility 

<iframe src="http://server.adrianhordyk.com/shiny/lbspr/" height="1600px" width="100%" frameBorder="0">
  Your browser doesn't support iframes
</iframe>

<!-- <h3> Download the LBSPR R Package </h3>
<div style="width:800px; margin:0 auto; position:relative;">
<section id="downloads" class="clearfix" >
<a href="https://github.com/AdrianHordyk/lbspr/zipball/master" id="download-zip" class="button"><span>Download .zip</span></a>
<a href="https://github.com/AdrianHordyk/lbspr/tarball/master" id="download-tar-gz" class="button"><span>Download .tar.gz</span></a>
<a href="https://github.com/AdrianHordyk/lbspr" id="view-on-github" class="button"><span>View on GitHub</span></a>
</section>
</div>                    
-->

  