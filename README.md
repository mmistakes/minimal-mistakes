[![Stories in Ready](https://badge.waffle.io/machinegurning/machinegurning.github.io.png?label=ready&title=Ready)](https://waffle.io/machinegurning/machinegurning.github.io)
# MachineGurning.com

## Guidelines for authoring posts

MachingGurning.com makes use of the [Minimal Mistakes](http://mmistakes.github.io/minimal-mistakes) theme, and so additional documentation on this theme can be found [here](http://mmistakes.github.io/minimal-mistakes).

### Instructions for authoring

* Author a post as normal using RStudio in `.Rmd` format and save in _rmd/
* Files should be named date first in the format: `2016-03-12-a_blog_post.Rmd` (note that it must be `2016-03-12-...` not 2016-03-12_...` -- **this will not work**). All associated files should be prefixed with the same date (e.g. data or figures; to achieve the latter, you must ensure that every figure producing R chunk is named appropriately, e.g. `{r 2016-03-12_image_producing_code}`).
* Drafts should be completed in the `dev` branch, and multiple commits rebased in the to `master` branch so that each new post is based on just a single commit (at first).
* All data should be saved in `data/`, and all figures/images saved in `figures/` **Do not save anything in `_data/`: this will cause a build failure when uplaoding to github**
* Look at a previous post and copy the YAML header for consistency. Pay particular attention to the categories. Posts predominantly written in R should be categorised as Rstats. This is to ensure the post is picked up by the correct feed for sites like RBloggers (we still need to register as of 2016-03-12).
* When authoring a post in Rstudio you will need to adjust links to `../_data/myfile.csv` to find relevant files, as the compilation process will begin from `_rmd`. The final version commited to github should take machinegurning.github.io/ to be the base dir. with all links relative to this (i.e. for data: `_data/mydata.csv`).
* Each post should be completely reproducible. Shrink data using `.Rds` format as required, and include a session info at the end of each post. Reproducibility tools such as `checkpoint::checkpoint()` are to be encouraged.

### Compiling

* Run `sudo Rscript Rmd2md.R` from base dir. This will:
    * compile the Rmd into a github acceptable format saved in `_posts/`
    * remove exifs from jpegs saved in `figures/`
* Add the newly created `*.md* file to the repository using `git add`.
* **Be sure to changed the status to `status: processed` to ensure that this `.Rmd` is not continually compiled.
* Be sure to add all related files (e.g. data and especially figures).
* Push the data to the machinegurning repository. Avoid making forced pushes, and ideally squash all commits prior to pushing to ensure that each post occupies just a single commit on the master branch.

### Other things

* svg format is preferable: use `dev="svg"` in chunk options. Very large images with many many poitns should be rendered as png to avoid slow loading.
* Large figures should be posted as links to raw image file in github. This can be achieved automatically using `sed`. For example `[Image 1](figures/image1.svg)` should become `![(Image 1](figures/image1.svg)](figures/image1.svg)`. This change needs to made in the raw .md document. Be aware that future changes to the Rmd will overwrite this. Something like this may help:
* Use `$$ a + b $$` and `$ a + b $` for math blocks and inline math respectively.
```
# To find relevant figure links:

grep "\s\[(.*?)\]\(.*?\)\s" -E *.md 

```

* Use a consistent style; [this](http://adv-r.had.co.nz/Style.html) is a good place to start!
