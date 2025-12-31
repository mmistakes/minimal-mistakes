---
title: "CISO"
permalink: /publications/ciso/
author_profile: false
layout: splash
sidebar: false
classes: wide

custom_css:
  - "academic_template/bulma.min.css"
  - "academic_template/bulma-carousel.min.css"
  - "academic_template/bulma-slider.min.css"
  - "academic_template/index.css"
  - "academic_template/fontawesome.all.min.css"

custom_js:
  - "academic_template/bulma-carousel.min.js"
  - "academic_template/bulma-carousel.js"
  - "academic_template/bulma-slider.min.js"
  - "academic_template/bulma-slider.js"
  - "academic_template/index.js"
  - "academic_template/fontawesome.all.min.js"
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/academicons@1.9.4/css/academicons.min.css"
      integrity="sha384-FQC0RRnwLGAeE0vz3BXhosES7aq6v3cZlK1KJ71Z5gB8HuF6I4BhJwkdoUJ0W6qL"
      crossorigin="anonymous">

  <!-- Scroll to Top Button -->
  <button class="scroll-to-top" onclick="scrollToTop()" title="Scroll to top" aria-label="Scroll to top">
    <i class="fas fa-chevron-up"></i>
  </button>

  <!-- More Works Dropdown -->
<!-- <div class="more-works-container tooltip" data-tooltip="More publications">
  <a href="https://www.epfl.ch/labs/eceo/eceo/publications" 
     target="_blank" 
     rel="noopener noreferrer">
    <button class="more-works-btn">
      <img src="{{ '/assets/images/academic_template/eceo.png' | relative_url }}" width="70" alt="Icon" class="btn-icon">
    </button>
  </a>
</div> -->

<main id="main-content">
  <section class="hero hero-with-bg">
    <div class="hero-image-container">
      <!-- TODO: Change background image. Set opacitiy to 0 if you don't want an image background -->
      <img style="opacity: 0;" src="{{ '/assets/images/academic_template/background.png' | relative_url }}" alt="Background picture">
    </div>

<div class="hero-body">
<div class="container is-max-desktop">
<div class="columns is-centered">
<div class="column has-text-centered">
<div class="hero-text-wrapper">
<!-- TODO: Replace paper name and authors -->
<h1 class="title is-1 publication-title">CISO</h1>
<h2 class="title is-2 publication-title">Species Distribution Modeling Conditioned on Incomplete
Species Observations</h2>

<div class="is-size-7 publication-authors">
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/hager.png" alt="Hager Radi Abdelwahed">
    <a href="https://hagerrady13.github.io/" target="_blank" style="text-decoration:none;">Hager Radi Abdelwahed*,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/melisande.png" alt="Mélisande Teng">
    <a href="https://melisandeteng.github.io/" target="_blank" style="text-decoration:none;">Mélisande Teng*,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/bio-photo.jpeg" alt="Robin Zbinden">
    <a href="/" target="_blank" style="text-decoration:none;">Robin Zbinden*,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/laura.png" alt="Laura Pollock">
    <a href="/" target="_blank" style="text-decoration:none;">Laura Pollock,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/hugo.png" alt="Hugo Larochelle">
    <a href="/" target="_blank" style="text-decoration:none;">Hugo Larochelle,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/devis.png" alt="Devis Tuia">
    <a href="https://scholar.google.com/citations?hl=en&user=p3iJiLIAAAAJ" target="_blank" style="text-decoration:none;">Devis Tuia</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/david.png" alt="David Rolnick">
    <a href="/" target="_blank" style="text-decoration:none;">David Rolnick,</a>
  </span>
  </div>
  <div class="is-size-5 publication-authors" style="margin-top: -2rem;">
  <span class="author-block"><br>Methods in Ecology and Evolution (2026), in press</span>
  </div>
</div>

<!-- TODO: Replace with your pdf, supplementary, github, etc. -->
<!--  To delete a block if not applicable: from span class="link-block" to </span>.  -->
<!--<div class="column has-text-centered">
<div class="publication-links">
  <span class="link-block">
    <a href="" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fas fa-file-pdf"></i>
      </span>
      <span>Paper</span>
    </a>
  </span>-->

  <span class="link-block">
    <a href="https://github.com/RolnickLab/CISO-SDM" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fab fa-github"></i>
      </span>
      <span>Code</span>
    </a>
  </span>

  <span class="link-block">
    <a href="https://arxiv.org/abs/2508.06704" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fas fa-file-alt"></i>
      </span>
      <span>arXiv</span>
    </a>
  </span>

  <span class="link-block">
    <a href="https://huggingface.co/cisosdm" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fas fa-download"></i>
      </span>
      <span>Data</span>
    </a>
  </span>

  <span class="link-block">
    <a href="/assets/pdf/CISO/CISO_TIBS2026.pdf" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fas fa-image"></i>
      </span>
      <span>Poster</span>
    </a>
  </span>

</div> <!-- publication-links -->
</div> <!-- column has-text-centered -->

</div> <!-- column -->
</div> <!-- columns -->

  </section>
</main>



<!-- TODO: Replace with your overview- -->
<section class="section hero is-light">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column is-four-fifths"> <!-- "is-f" instead of is-full if you want smaller margins -->
        <h2 class="title is-3">Abstract</h2>
        <!-- <div style="text-align: center; margin: 20px 0;">
            <img src="static/images/eceo.png" alt="Dataset Overview" style="max-width: 100%; height: auto;">
        </div> -->
        <div class="content has-text-justified">
          <!-- TODO: Replace with your paper overview -->
<p>
  Species distribution models (SDMs) are widely used to predict species' geographic distributions, serving as critical tools for ecological research and conservation planning. Typically, SDMs relate species occurrences to environmental variables representing abiotic factors, such as temperature, precipitation, and soil properties. However, species distributions are also strongly influenced by biotic interactions with other species, which are often overlooked in traditional models. While some methods, such as joint species distribution models (JSDMs), partially address this limitation by incorporating biotic interactions, they often assume symmetrical pairwise relationships between species and require consistent co-occurrence data. In practice, species observations are often sparse, and the availability of information about the presence or absence of other species varies significantly across locations. To address these challenges, we propose CISO, a deep learning-based method for species distribution modeling conditioned on incomplete species observations. CISO enables predictions to be conditioned on a flexible number of species observations alongside environmental variables, accommodating the variability and incompleteness of available biotic data. We demonstrate our approach using three datasets representing different species groups: sPlotOpen for plants, SatBird for birds, and a new dataset, SatButterfly, for butterflies. Our results show that including partial biotic information improves predictive performance on spatially separate test sets. When conditioned on a subset of species within the same dataset, CISO outperforms alternative methods in predicting the distribution of the remaining species, for plants and birds. Furthermore, we show that combining and conditioning on observations from multiple datasets can improve the prediction of species occurrences in scenarios with sufficient co-occurrences between datasets to train CISO effectively. Our results show that CISO is a promising ecological tool, capable of incorporating incomplete biotic information and identifying potential interactions between species from disparate taxa.
</p>

<div style="text-align:center; margin-top:1.5rem;">
  <img src="/assets/images/ciso/CISO_overview_dataset.png" 
      alt="CISO illustration"
      style="max-width:100%; height:auto; border-radius:10px;">
</div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End paper overview -->


<!-- Citation section -->

<!--BibTex citation -->
  <section class="section" id="BibTeX">
    <div class="container is-max-desktop content">
      <div class="bibtex-header">
        <h2 class="title">Citation</h2>
        <button class="copy-bibtex-btn" onclick="copyBibTeX()" title="Copy BibTeX to clipboard">
          <i class="fas fa-copy"></i>
          <span class="copy-text">Copy</span>
        </button>
      </div>
      <pre id="bibtex-code"><code>@article{abdelwahed2025ciso,
  title={CISO: Species Distribution Modeling Conditioned on Incomplete Species Observations},
  author={Abdelwahed, Hager Radi and Teng, M{\'e}lisande and Zbinden, Robin and Pollock, Laura and Larochelle, Hugo and Tuia, Devis and Rolnick, David},
  journal={Methods in Ecology and Evolution},
  year={2025}
}</code></pre>
    </div>
</section>
<!--End BibTex citation -->

  <footer class="footer">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="content">

          <p>
            This page was built using the <a href="https://github.com/eliahuhorwitz/Academic-project-page-template" target="_blank">Academic Project Page Template</a> which was adopted from the <a href="https://nerfies.github.io" target="_blank">Nerfies</a> project page. This website is licensed under a <a rel="license"  href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative
            Commons Attribution-ShareAlike 4.0 International License</a>.
          </p>

        </div>
      </div>
    </div>
  </div>
</footer>

<!-- Statcounter tracking code -->
  
<!-- You can add a tracker to track page visits by creating an account at statcounter.com -->

<!-- End of Statcounter Code -->
