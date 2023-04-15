---
layout: single
title: "tzinfoError"
categories: blogging
tag: [github,daily,jekyll]
toc: true
---

# Dependency Error: tzinfo

<br />

## Issues

I'm using `bundle exec jekyll serve`  to preview updates for my GitHub blog on my local live server for convenience; however, an unexpected error has been happened like below:

```powershell
Configuration file: D:/GitHub/Blog/_config.yml

  Dependency Error: Yikes! It looks like you don't have tzinfo or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. If you've run Jekyll with `bundle exec`, ensure that you have included the tzinfo gem in your Gemfile as well. The full error message from Ruby is: 'cannot load such file -- tzinfo' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
jekyll 4.3.2 | Error:  tzinfo
```

<br /><br />

## Reasons

When the Ruby intepretor runs the IANA timezone information, `tz` is needed on Windows as Windows doesn't include it.

<br /><br />

## Solutions

<br />



### 1. Install `tzinfo`

One of the reasons for the error is tzinfo is not installed, so try to install ```tzinfo``` first.

```powershell
D:\GitHub\Blog>gem install tzinfo

Configuration file: D:/GitHub/Blog/_config.yml
  Dependency Error: Yikes! It looks like you don't have tzinfo or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. If you've run Jekyll with `bundle exec`, ensure that you have included the tzinfo gem in your Gemfile as well. The full error message from Ruby is: 'cannot load such file -- tzinfo' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
  
jekyll 4.3.2 | Error:  tzinfo
```

![tzinfo_error]({{site.url}}/assets/images/2023-04-14-tzinfoError/tzinfo_error.PNG)

Well, the same issue is still happened.

<br />

### 2. Install `tzinfo-data`

Try to install tzinfo-data.

```powershell
gem install tzinfo-data
```

```powershell
Fetching tzinfo-data-1.2023.3.gem
Using rubygems directory: C:/Users/genih/.local/share/gem/ruby/3.2.0
Successfully installed tzinfo-data-1.2023.3
Parsing documentation for tzinfo-data-1.2023.3
Installing ri documentation for tzinfo-data-1.2023.3
Done installing documentation for tzinfo-data after 0 seconds
1 gem installed
```

Uh... it's not solved yet.



<br />

### 3. Add `tzinfo` in `Gemfile`

Only two lines of `tzinfo` and `tzinfo-data` are added in Gemfile under the GitHub blog folder and it works!

```python
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo'
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```



Tada!

```python
Configuration file: D:/GitHub/Blog/_config.yml
To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
            Source: D:/GitHub/Blog
       Destination: D:/GitHub/Blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
Deprecation Warning: Using / for division is deprecated and will be removed in Dart Sass 2.0.0.

Recommendation: math.div(9, 16)

More info and automated migrator: https://sass-lang.com/d/slash-div

   ╷
31 │ $mfp-iframe-ratio:                    9/16;                       // Ratio of iframe (9/16 = widescreen, 3/4 = standard, etc.)
   │                                       ^^^^
   ╵
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\magnific-popup\_settings.scss 31:39      @import
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\magnific-popup\_magnific-popup.scss 3:9  @import
    minimal-mistakes.scss 13:9                                                            @import
    D:\GitHub\Blog\assets\css\main.scss 4:9                                               root stylesheet
Deprecation Warning: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.

Recommendation: math.div($value, 16px) or calc($value / 16px)

More info and automated migrator: https://sass-lang.com/d/slash-div

   ╷
28 │     @return $value / 16px * 1em;
   │             ^^^^^^^^^^^^^
   ╵
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\breakpoint\_helpers.scss 28:13                base-conversion()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\breakpoint\_helpers.scss 20:13                breakpoint-to-base-em()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\breakpoint\parsers\single\_default.scss 8:29  breakpoint-parse-default()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\breakpoint\parsers\_single.scss 22:14         breakpoint-parse-single()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\breakpoint\_parsers.scss 153:18               breakpoint-parse()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\breakpoint\_parsers.scss 48:22                breakpoint()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\breakpoint\_breakpoint.scss 46:16             breakpoint()
    D:\GitHub\Blog\_sass\minimal-mistakes\_reset.scss 13:3                                     @import
    minimal-mistakes.scss 18:9                                                                 @import
    D:\GitHub\Blog\assets\css\main.scss 4:9                                                    root stylesheet
Deprecation Warning: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.

Recommendation: math.div(5px, 2) or calc(5px / 2)

More info and automated migrator: https://sass-lang.com/d/slash-div

   ╷
28 │     margin-bottom: (5px / 2);
   │                     ^^^^^^^
   ╵
    D:\GitHub\Blog\_sass\minimal-mistakes\_forms.scss 28:21  @import
    minimal-mistakes.scss 20:9                               @import
    D:\GitHub\Blog\assets\css\main.scss 4:9                  root stylesheet
Deprecation Warning: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.

Recommendation: math.div(($red * 299) + ($green * 587) + ($blue * 114), 1000) or calc((($red * 299) + ($green * 587) + ($blue * 114)) / 1000)

More info and automated migrator: https://sass-lang.com/d/slash-div

   ╷
68 │   $yiq: (($red*299)+($green*587)+($blue*114))/1000;
   │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ╵
    D:\GitHub\Blog\_sass\minimal-mistakes\_mixins.scss 68:9   yiq-is-light()
    D:\GitHub\Blog\_sass\minimal-mistakes\_mixins.scss 81:14  yiq-contrast-color()
    D:\GitHub\Blog\_sass\minimal-mistakes\_mixins.scss 91:10  yiq-contrasted()
    D:\GitHub\Blog\_sass\minimal-mistakes\_buttons.scss 46:7  @import
    minimal-mistakes.scss 25:9                                @import
    D:\GitHub\Blog\assets\css\main.scss 4:9                   root stylesheet
Deprecation Warning: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.

Recommendation: math.div($span-width, $container) or calc($span-width / $container)

More info and automated migrator: https://sass-lang.com/d/slash-div

   ╷
93 │     @return percentage($span-width / $container);
   │                        ^^^^^^^^^^^^^^^^^^^^^^^^
   ╵
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\susy\susy\_su-math.scss 93:24          su-span()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\susy\susy\_syntax-helpers.scss 190:11  su-call()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\susy\susy\_api.scss 146:13             susy-span()
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\susy\susy\_unprefix.scss 19:11         span()
    D:\GitHub\Blog\_sass\minimal-mistakes\_utilities.scss 185:24                        @content
    D:\GitHub\Blog\_sass\minimal-mistakes\vendor\breakpoint\_breakpoint.scss 66:7       breakpoint()
    D:\GitHub\Blog\_sass\minimal-mistakes\_utilities.scss 184:3                         @import
    minimal-mistakes.scss 34:9                                                          @import
    D:\GitHub\Blog\assets\css\main.scss 4:9                                             root stylesheet
Warning: 1 repetitive deprecation warnings omitted.
Run in verbose mode to see all warnings.
                    done in 1.932 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'D:/GitHub/Blog'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.

```

<br /><br />

## Conclusion

Just try the number 3!



