---
title: "MaskSDM"
permalink: /publications/masksdm/
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
<h1 class="title is-1 publication-title">MaskSDM</h1>
<h2 class="title is-2 publication-title">with Shapley values to improve flexibility, robustness and explainability in species distribution modelling</h2>

<div class="is-size-6 publication-authors">
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/bio-photo.jpeg" alt="Robin Zbinden">
    <a href="/" target="_blank" style="text-decoration:none;">Robin Zbinden,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/nina.png" alt="Nina van Tiel">
    <a href="https://scholar.google.com/citations?user=pCOoHuAAAAAJ&hl=en" target="_blank" style="text-decoration:none;">Nina van Tiel,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/gencer.png" alt="Gencer Sumbul">
    <a href="https://scholar.google.com/citations?user=beJ28JMAAAAJ&hl=tr" target="_blank" style="text-decoration:none;">Gencer Sumbul,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/chiara.png" alt="Chiara Vanalli">
    <a href="https://chiaravanalli.weebly.com/" target="_blank" style="text-decoration:none;">Chiara Vanalli,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/beni.png" alt="Benjamin Kellenberger">
    <a href="https://bkellenb.github.io/" target="_blank" style="text-decoration:none;">Benjamin Kellenberger,</a>
  </span>
  <span class="author-block stacked">
    <img class="author-avatar" src="/assets/images/authors/devis.png" alt="Devis Tuia">
    <a href="https://scholar.google.com/citations?hl=en&user=p3iJiLIAAAAJ" target="_blank" style="text-decoration:none;">Devis Tuia</a>
  </span>
  </div>
  <div class="is-size-5 publication-authors" style="margin-top: -2rem;">
  <span class="author-block"><br>Methods in Ecology and Evolution (2025)</span>
  </div>
</div>

<!-- TODO: Replace with your pdf, supplementary, github, etc. -->
<!--  To delete a block if not applicable: from span class="link-block" to </span>.  -->
<div class="column has-text-centered">
<div class="publication-links">
  <span class="link-block">
    <a href="https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210x.70200" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fas fa-file-pdf"></i>
      </span>
      <span>Paper</span>
    </a>
  </span>

  <span class="link-block">
    <a href="https://github.com/zbirobin/MaskSDM-MEE" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fab fa-github"></i>
      </span>
      <span>Code</span>
    </a>
  </span>

  <span class="link-block">
    <a href="https://arxiv.org/abs/2503.13057" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fas fa-file-alt"></i>
      </span>
      <span>arXiv</span>
    </a>
  </span>

  <span class="link-block">
    <a href="https://zenodo.org/records/17314090" target="_blank"
      class="external-link button is-normal is-rounded is-dark">
      <span class="icon">
        <i class="fas fa-download"></i>
      </span>
      <span>Data</span>
    </a>
  </span>

  <span class="link-block" style="display:none;">
    <a href="https://<POSTER LINK>" target="_blank"
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
</div> <!-- container -->
</div> <!-- hero-body -->

  </section>
</main>



<!-- TODO: Replace with your overview- -->
<section class="section hero is-light">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column is-four-fifths"> <!-- "is-f" instead of is-full if you want smaller margins -->
        <h2 class="title is-3">Overview</h2>
        <!-- <div style="text-align: center; margin: 20px 0;">
            <img src="static/images/eceo.png" alt="Dataset Overview" style="max-width: 100%; height: auto;">
        </div> -->
        <div class="content has-text-justified">
          <!-- TODO: Replace with your paper overview -->
<p>
  As biodiversity declines, deep learning can help us understand <i>where</i> species occur and <i>why</i>. 
  In this work, we introduce <strong>MaskSDM</strong>, a new <strong>multimodal</strong> 
  <strong>masked-modeling approach</strong> that allows us to model the distributions of 
  <strong>12,738 plant species worldwide</strong> 🌱 <br>
  MaskSDM brings three key advantages for species distribution modeling (SDM) by enabling predictions to be generated using any subset of variables or modalities:
</p>

<ul style="list-style:none; padding-left:0;">
  <li>🧩 <strong>Flexibility</strong> — users can choose which environmental variables to include when making predictions </li>
  <li>⚙️ <strong>Robustness</strong> — the model still works even when some environmental data are missing </li>
  <li>🔍 <strong>Explainability</strong> — thanks to a novel way of computing Shapley values, we can identify which environmental factors matter most for each species </li>
</ul>

<p>
  Using the transformer architecture, MaskSDM is designed as a <strong>general and scalable tool</strong> 
  for ecologists and anyone working with biodiversity data, setting the stage for a foundation model in SDM 🗺️
</p>
<div style="text-align:center; margin-top:1.5rem;">
  <img src="/assets/images/masksdm/MaskSDM_applications.png" 
      alt="MaskSDM illustration"
      style="max-width:100%; height:auto; border-radius:10px;">
</div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End paper overview -->

<!-- TODO: Replace with your main contribution (e.g. a methodology or a dataset)-->
<section class="section">
  <div class="container is-max-desktop">
      <h2 class="title">Methodology</h2>
      <p>
          MaskSDM overcomes the limitations of traditional models that rely on a fixed set of environmental predictors. Instead, it is designed to work with <strong>any subset of available variables</strong>, making it adaptable to real-world situations where data availability varies across locations or species.
          Each input variable or modality is first converted into a shared high-dimensional representation through <strong>tokenization</strong>. These tokens are then processed by a <strong>transformer encoder</strong>, which captures complex, non-linear relationships between variables using self-attention.
          A key innovation is the use of <strong>masked data modelling</strong> (as in models such as BERT, MAE, 4M) during training. At each iteration, a random selection of variables is intentionally hidden and replaced with a learned <strong>mask token</strong>, forcing the model to correctly predict species presence even when information is missing. This strategy makes MaskSDM naturally robust to incomplete data and enables it to flexibly accept different combinations of predictors during inference.
      </p>

<div style="text-align:center; margin-top:1.5rem;">
  <img src="/assets/images/masksdm/main_masksdm.png" 
      alt="MaskSDM illustration"
      style="max-width:100%; height:auto; border-radius:10px;">
</div>

<script>
window.MathJax = {
  tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
  svg: {fontCache: 'global'}
};
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></script>

<p>
          <br>
          MaskSDM is also used to improve the estimation of <strong>Shapley values for assessing predictor importance</strong>. Because MaskSDM can natively operate on arbitrary subsets of variables, it avoids the biased approximations that conventional approaches require like predictor independence. To efficiently handle the exponential number of possible predictor subsets, we apply a stratified Monte Carlo sampling strategy with Latin squares, which ensures a balanced coverage of subset sizes and leads to <strong>faster and more stable convergence when computing Shapley values</strong>.
      </p>
      <div style="margin-top: 8px; padding: 10px; border-left: 4px solid #3a7bd5; background-color: #f5f9ff;">
  <strong>What are Shapley values?</strong><br>
  Shapley values come from cooperative game theory and provide a fair way to distribute the total contribution of all predictors among them.
  For a predictor \(i\), the Shapley value \(\phi_i\) is defined as the average marginal contribution of \(i\) across all possible subsets \(S\) of the predictor set that do not include \(i\):
  <br><br>
  \[
  \phi_i = \sum_{S \subseteq F \setminus \{x_i\}} 
  \frac{|S|!\,(|F|-|S|-1)!}{|F|!}
  \Big(
  f(S \cup \{x_i\}) - f(S)
  \Big)
  \]
  <br>
  where \(N\) is the set of all predictors and \(f(\cdot)\) denotes the model prediction or performance computed using a given subset of predictors.
</div>
  </div>
</section>

<section class="section">
  <div class="container is-max-desktop">
      <h2 class="title">Dataset</h2>
      <p>
          We use the <strong>sPlotOpen</strong> global vegetation dataset, covering <strong>12,738 plant species</strong> and containing <strong>95,104 plots</strong> that are split using spatial block cross-validation. The long-tail distribution caused by class imbalance is addressed using the <a href="/publications/pseudo_absences/" target="_blank" rel="noopener"> full weighted loss</a>. Each plot is associated to <strong>61 environmental predictors</strong> including climate (WorldClim), soil (SoilGrids), topography (SRTM), human footprint data, coordinates, and Sentinel-2 satellite features (SatCLIP), with MaskSDM handling missing variables.
      </p>

<!-- Image carousel -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <div id="data-carousel" class="carousel data-carousel">
       <div class="item" style="display:block; margin:0 auto; max-width:70%; height:auto;">
        <!-- TODO: Replace with your research result images -->
        <img src="/assets/images/masksdm/geo_distribution.png" alt="geographic distribution" loading="lazy" />
        <!-- TODO: Replace with description of this result -->
        <h2 class="subtitle has-text-centered">
          Geographic distribution of sPlotOpen plots across training, validation, and testing splits generated via spatial block cross-validation.
        </h2>
      </div>
      <div class="item" style="text-align:center;">
        <!-- Your image here -->
        <img src="/assets/images/masksdm/class_imbalance.png" alt="class imbalance" loading="lazy" style="display:block; margin:0 auto; max-width:80%; height:auto;"/>
        <h2 class="subtitle has-text-centered">
          Distribution of presence records per plot and per species.
        </h2>
      </div>
  </div>
</div>
</div>
</section>
<!-- End image carousel -->

  </div>
</section>

<section class="section">
  <div class="container is-max-desktop">
      <h2 class="title">Results</h2>
      <p>
        A single MaskSDM model performs nearly as well on each tested input subset as an oracle model trained specifically for that subset, while <strong>outperforming imputation-based approaches</strong>. This enables predictions, performance metrics, and maps to be generated for <strong>any variable subset using only simple inference passes</strong>:
      </p>

<!-- Image carousel -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <div id="data-carousel" class="carousel data-carousel">
       <div class="item" style="display:block; margin:0 auto; max-width:80%; height:auto;">
        <!-- TODO: Replace with your research result images -->
        <img src="/assets/images/masksdm/results_table.png" alt="performance comparison" loading="lazy" />
        <!-- TODO: Replace with description of this result -->
        <h5 class="subtitle has-text-centered">
          Mean test AUC performance of MaskSDM and baselines across subsets of input variables. Each row is produced by a single model for MaskSDM and imputing baselines, whereas the oracle trains one model per column.
        </h5>
      </div>
      <div class="item" style="display:block; margin:0 auto; max-width:90%; height:auto;">
        <!-- Your image here -->
        <img src="/assets/images/masksdm/venn.png" alt="venn diagram of input subsets" loading="lazy"/>
        <h5 class="subtitle has-text-centered">
          Mean test AUC performance on the test set for different subsets of predictors using MaskSDM.
        </h5>
      </div>
  </div>
</div>
</div>
</section>
<!-- End image carousel -->
<br>
Then, we can <strong>generate prediction maps for different input subsets</strong> to visualize how MaskSDM adapts to varying data availability: <br>

<div style="display:block; margin:0 auto; max-width:55%; height:auto;">
  <!-- Your image here -->
  <img src="/assets/images/masksdm/map.png" alt="Prediction map of input subsets" loading="lazy" />
  <h2 class="subtitle has-text-centered">
    MaskSDM predicted suitability maps for kidney vetch (<i>Anthyllis vulneraria</i>) using different subsets of input variables.
  </h2>
</div>

<p>
        <br>A major contribution is our <strong>new Shapley value computation method</strong>, which avoids common assumptions like predictor independence by leveraging MaskSDM’s flexible-input design. This provides more precise insights into how climate, soil, topography, or human impact shape species distributions, both locally and globally:
      </p>

<!-- Image carousel -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <div id="data-carousel" class="carousel data-carousel">
       <div class="item" style="display:block; margin:0 auto; max-width:70%; height:auto;">
        <!-- TODO: Replace with your research result images -->
        <img src="/assets/images/masksdm/shap.png" alt="Shapley values visualization" loading="lazy" />
        <!-- TODO: Replace with description of this result -->
        <h2 class="subtitle has-text-centered">
          Shapley values explaining global AUC performance across all species on the test set, indicating the average contribution of individual predictors and predictor groups to the global performance
        </h2>
      </div>
      <div class="item" style="display:block; margin:0 auto; max-width:60%; height:auto;">
        <!-- Your image here -->
        <img src="/assets/images/masksdm/shap_map.png" alt="Shapley values map visualization" loading="lazy"/>
        <h2 class="subtitle has-text-centered">
          Shapley value maps representing the contribution of each predictor group to the MaskSDM predictions of kidney vetch (<i>Anthyllis vulneraria</i>), European blueberry (<i>Vaccinium myrtillus</i>), and holm oak (<i>Quercus ilex</i>).
        </h2>
      </div>
  </div>
</div>
</div>
</section>
<!-- End image carousel -->

<strong>Many more results are available in the</strong> <a href="https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210x.70200" target="_blank"
      class="external-link">
      <span><strong>paper</strong></span></a>
 <strong>and its supplementary materials.</strong>
  </div>
</section>


<!--
<section class="section">
  <div class="container is-max-desktop" >
          <h2 class="title">Getting Started</h2>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd; font-family: Arial, sans-serif;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Follow the steps below to get started:
            </p>
            <ol style="margin: 15px 0; padding-left: 20px; color: #333;">
                <li style="margin-bottom: 10px;">
                    <strong>Download the dataset </strong> on
                    <a href="https://zenodo.org/records/<ZENODO LINK>" target="_blank" style="color: #007bff; text-decoration: none;">Zenodo</a>.
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>Training models:</strong> Clone the <a href="https://github.com/YOUR REPO HERE" target="_blank" style="color: #007bff; text-decoration: none;">training code repository </a> and follow the setup instructions to start fine-tuning models.
                </li>
            </ol>
            <p style="font-size: 14px; color: #555;">
                If you encounter any issues, feel free to open an issue on our 
                <a href="https://github.com/YOUR REPO HERE" target="_blank" style="color: #007bff; text-decoration: none;">GitHub Issues page</a>.
            </p>
        </div>
</section>
-->

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
      <pre id="bibtex-code"><code>@article{zbinden2025masksdm,
  title={MaskSDM with Shapley values to improve flexibility, robustness and explainability in species distribution modelling},
  author={Zbinden, Robin and Van Tiel, Nina and Sumbul, Gencer and Vanalli, Chiara and Kellenberger, Benjamin and Tuia, Devis},
  journal={Methods in Ecology and Evolution},
  year={2025},
  publisher={Wiley Online Library}
}</code></pre>
    </div>
</section>
<!--End BibTex citation -->

<!--BibTex citation -->
  <section class="section" id="BibTeX2">
    <div class="container is-max-desktop content">
      <div class="bibtex-header">
        <h5 class="title">MaskSDM was first briefly presented at the Computer Vision for Ecology workshop at ECCV 2024:</h5>
      </div>
      <pre id="bibtex-code2"><code>@inproceedings{zbinden2024masksdm,
  title={MaskSDM: Adaptive Species Distribution Modeling Through Data Masking},
  author={Zbinden, Robin and Tiel, Nina van and Sumbul, Gencer and Kellenberger, Benjamin and Tuia, Devis},
  booktitle={European Conference on Computer Vision Workshops},
  pages={188--197},
  year={2024},
  organization={Springer}
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
