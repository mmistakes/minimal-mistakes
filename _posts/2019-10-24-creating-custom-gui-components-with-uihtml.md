---
title: "Creating custom gui components with uihtml"
categories:
- Graphical user interface
tags:
- javascript
- material design
- gui
- button
- uihtml
- object oriented programming
---
For the last couple of years Mathworks have been pushing to move Matlab over from usign Java based graphics into the world of web components e.g. App Designer. Advanced users have long been able to create custom java components but until now this hasn't been possible for the javascript based components. Introduced in R2019b, uihtml finally introduces this functionality albeit with some limitations.

This was my first real play with this functionality, so I've started with something simple to trial it. We'll be implementing a material style button as shown.

{% include figure image_path="/assets/posts/uihtml/button_example.png" alt="Material UI button using uihtml" caption="Material UI button using uihtml" %}

## Gathering our dependencies
Not wanting to rely on multiple javascript libraries, I've kept it simple and used [Googles own set of web components](https://material.io/develop/web/docs/getting-started/). It comes with two files, one javascript and one css.

Go ahead and download these from here and here. To keep things tidy, I've placed them in an assets folder with sub folders denoting file type.

```
.
├── assets
|   ├── js
|   |  	└── material-components-web.min.js
|   └── css
|       └── material-components-web.min.css
```

## Writing the html

Next, lets get a basic version of our html up and running. We can test this directly in the browser.


## Testing using uihtml 

## Wrapping our component in a class

## Thoughts

It does however come with some limitations. All content must be local, so there'll be no embeding youtube videos or similar in your applications. This is for security reasons, and so any javascript libraries will need to be downloaded and included in an applications source code.

We also only get one callback, `DataChangedFcn` through which all information must pass between matlab and javascript. For simple components this is fine, but we'll begin to see as we offer more functionality that this will become a hinderance.

## Creating a custom component