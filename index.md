---
layout: page
title: Welcome
excerpt: "Whitaker lab home page."
search_omit: true
---

We hope you find this site a useful source of information about the work that Kirstie Whitaker and her collaborators are conducting at the [Alan Turing Institute](https://www.turing.ac.uk/).

### Mental health and adolescent brain development

Adolescence is a period of human brain growth and high incidence of mental health disorders. Kirstie is a member of the [Neuroscience in Psychiatry Network](http://nspn.org.uk): a collaboration between the University of Cambridge and University College London which seeks to better understand adolescent development in brain and behaviour.

Kirstie uses magnetic resonance imaging to investigate changes in the brain’s structure and function. She also uses graph theoretic methods to model the brain as a network. The different parts of the brain do not work alone, they are connected to each other and send messages back and forth in order to generate complex thoughts and social interactions.

In work [published in PNAS](http://dx.doi.org/10.1073/pnas.1601745113) in 2016, the NSPN consortium showed that the particularly well connected regions - the hubs of the network - continue to develop throughout the teenage years, and this may be a mechanism to explain the emergence of mental health disorders during the teenage years.

<iframe width="560" height="315" src="//www.youtube.com/embed/ztm2knaLBFc" frameborder="0"> </iframe>

### Reproducible research

One of the major focuses of the Whitaker Lab is to empower researchers to make their work reproducible from beginning to end.

<figure>
    <a href="https://thenib.com/repeat-after-me">
      <img alt="reproducibility definition from the nib comic strip"
           src="https://thenib.imgix.net/usq/a81ad36e-ecfe-46e2-9710-ab4d77d97a09/repeat-after-me-004-c4c849.jpeg?auto=compress,format"
           width="80%" >
    </a>
    <figcaption>Panel from <a href="https://thenib.com/repeat-after-me">Repeat After Me</a>, by <a href="https://thenib.com/maki-naro">Maki Naro</a>.</figcaption>
</figure>

Reproducible research is work that can be independently verified. In practise it means sharing the data and the code that were used to generate scientific results. Without the evidence of what was done, journal articles are simply nice, interesting stories. All readers, not just collaborators or the original authors, must be able to check published research.

This comic strip, [Repeat After Me](https://thenib.com/repeat-after-me), by [Maki Naro](https://thenib.com/maki-naro) for [The Nib](https://thenib.com/) is a really wonderful explanation of the incentive structure in academic research and how it has contributed to the current reproducibility crisis.

### Working Open

If all research is published reproducibly the scientific community as a whole will benefit. We will be more efficient: the current system requires too much time spent reinventing the wheel.

At the Whitaker Lab we're committed to working open. We believe that by sharing our code, documentation, data (where possible) and works in progress we will be faster at answer the important questions of adolescent brain development and mental health challenges.

You can read more about working open through Mozilla's [Open Leadership Training](https://mozilla.github.io/leadership-training/) program.

### Contact

You can contact Kirstie at [kwhitaker@turing.ac.uk](mailto:kwhitaker@turing.ac.uk) or on twitter [@kirstie_j](https://twitter.com/kirstie_j).

The lab tweets [@Whitaker_Lab](https://twitter.com/Whitaker_Lab). Give us a follow and let us know what you think.

You're very welcome to contact us via [GitHub](https://github.com/whitakerlab) too. Check out the issues at the lab's [project management](https://github.com/WhitakerLab/WhitakerLabProjectManagement/issues) repository. You may be able to help us out!

We have a [gitter chat room](https://gitter.im/WhitakerLab/Lobby) and love to say hello there.

This website is hosted via [GitHub pages](https://github.com/WhitakerLab/whitakerlab.github.io). If you see any typos or other mistakes please let us know...or file a pull request with your edits.

<!---
Commented out the code to list recent posts. Might be useful again one day in the future!
<ul class="post-list">
{% for post in site.posts limit:10 %}
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span>{% if post.excerpt %} <span class="excerpt">{{ post.excerpt | remove: '\[ ... \]' | remove: '\( ... \)' | markdownify | strip_html | strip_newlines | escape_once }}</span>{% endif %}</a></article></li>
{% endfor %}
</ul>
-->
