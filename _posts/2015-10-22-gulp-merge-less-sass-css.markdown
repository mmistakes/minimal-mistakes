---
layout: post
title:  "How to merge less, scss and css into a single css file"
excerpt: "How to merge less, sass and css into a single css file"
tags: [gulp, gulpfile, sass, scss, less, css, merge]
image: gulp.png
modified: "2016-02-15"
comments: true
---

Sometimes when working on "frontend tasks" with gulp,
we need to merge different formats such as **less**, **scss**, **css** into a single minified css file.

![Gulp](/images/posts/gulp.png)

## Modules

**Of course you have to install and require the good modules:**

{% highlight javascript %}
{
  "name": "project",
  "version": "0.1.0",
  "main": "gulpfile.js",
  "dependencies": {},
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-concat": "^2.6.0",
    "gulp-less": "^3.0.3",
    "gulp-minify-css": "^1.2.1",
    "gulp-sass": "^2.0.4",
    "merge-stream": "^1.0.0"
  }
}

{% endhighlight %}

{% highlight javascript %}
var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
{% endhighlight %}

## Task

To do this we need to have multiple steps inside the gulp task.

* LESS:

{% highlight javascript %}
var lessStream = gulp.src([...])
    .pipe(less())
    .pipe(concat('less-files.less'))
;
{% endhighlight %}

* SCSS/SASS:

{% highlight javascript %}
var scssStream = gulp.src([...])
    .pipe(sass())
    .pipe(concat('scss-files.scss'))
;
{% endhighlight %}

* CSS:

{% highlight javascript %}
var cssStream = gulp.src([...])
    .pipe(concat('css-files.css'))
;
{% endhighlight %}

* The final gulp task:

{% highlight javascript %}
gulp.task('build/admin', function() {

    var lessStream = gulp.src([...])
        .pipe(less())
        .pipe(concat('less-files.less'))
    ;

    var scssStream = gulp.src([...])
        .pipe(sass())
        .pipe(concat('scss-files.scss'))
    ;
    
    var cssStream = gulp.src([...])
        .pipe(concat('css-files.css'))
    ;

    var mergedStream = merge(lessStream, scssStream, cssStream)
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('web/css'));

    return mergedStream;
});
{% endhighlight %}




