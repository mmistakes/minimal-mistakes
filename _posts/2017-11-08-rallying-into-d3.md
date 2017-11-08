---
title: Rallying into D3
tags:
  - data-viz
  - python
  - d3
  - javascript
excerpt: Following a path to learn D3 for data visualisation 
---

One of the things which really, really fascinates me as a data practitioner is the idea of displaying quantitative information in functional and also beautiful visuals capable of capturing the eye and at the same time producing a _wow_ moment in the spectator. The area, known under the umbrella term _data visualisation_, is a common territory of both "numerical" and "design" people and that's what makes it so interesting. Displaying data with visuals means telling a story, which requires both an understanding of what information to convey and what calculations to perform to quantify it, but also of how to show it in a way that is engaging and illuminating. It's not a straightforward task.

Being a Python practitioner, I regularly use its plotting stack, mainly [matplotlib](https://matplotlib.org) and [seaborn](https://matplotlib.org) for everyday plots aimed at displaying information without a particular attention to its design (altough I have to point out that with these libraries it's possible to intervene on the customisation to create very nice things anyway, it just takes some coding effort). Anyway, these are good for creating "scientific" charts, meant at conveying quantitative information, not at telling stories. [Bokeh](https://bokeh.pydata.org/en/latest/) is a different library which takes more of the visual approach instead and produces D3-like plots through Python code. However, it's not native and I just figured it would be good to have a go at doing things in D3 from scratch. 

And from scratch it really is. To create even a simple chart in D3, you have to take manual care of placing all the elements yourself, no more simple API to create the whole thing in a few lines. You are in control of every bit: if for instance you want to create a bar plot (which would take you a couple lines in maplotlib), you'd have to create the rectangles yourself. It's a bit of a pain, but I'd argue it's worth giving it a go because the rewards pay off quite handsomely. 

## D3 in Jekyll

This blog is built on Jekyll. I've been utilising [this link](http://www.nicksuch.com/2014/03/26/d3-sample/) to learn how to make use of D3 inside a Jekyll post. It shows you the steps to embed the code inside a Markdown file, but it's really simple as in practice you have to:

* call the D3 source
* create a `div` element in the Markdown and attach the SVG container where the visualisation resides to it

You can look at the source of this page for an example.

## The learning and the tutorials

I decided to take a week worth of evenings to go through some material and start the journey to learn D3. Initially I had no proper idea of how it actually works, so good progress at the end. I now understand how to put things together and also understand that to produce a very good viz you have to have lots of practice and also a good amount of time.

I've followed a few resources around and built a repository where to store all material I produced along the way as a reference, you can find it here under the name [d3-rally](https://github.com/martinapugliese/d3-rally), it stores examples of how to do many little things, which is a grand resource to have when you're not practical enough yet.

I started it all with the [classic primer by Sebastian Gutierrez](https://www.dashingd3js.com/table-of-contents), which leads you through generating SVG containers and scaling them, embedding simple elements like circles and rectangles in them and properly setting the scales for your numbers. It's a very good source for complete begineers. 

After that, I found a natural continuation to the journey to be the book (it's an O'Reilly) *Interactive visualisations for the web* by Scott Murray, which has a supplementary Github [repo](https://github.com/alignedleft/d3-book) of code examples. It's quite comprehensive and very well written. 

Other two good sources are the books *D3.js in action* by Elijah Meeks and *D3 tips and tricks* by Malcolm Maclean for subsequent playing around. 

With these three things I was able to crack through the week and get some stuff done. Also, the D3-related questions on stackoverflow provided an answer to all my questions.

## The silly graph to start

The one example I'll put here is a silly bubble plot with tooltips that appear when you hover over the points. It is still quite awful, especially graphically, no doubt. But served me as the playground to get to use most of the basic learnings of the above material. And I will keep going!

<div id="bubbles"></div>

<script src="https://d3js.org/d3.v4.min.js"></script>

<style type="text/css">

    body.circle {
      fill: lightsteelblue;
    }

    div.tooltip {
    position: relative;
    text-align: center;
    width: 100px;
    padding: 2px;
    font: 10px sans-serif;
    background: #348D0E;
    border: 0px;
    border-radius: 4px;
    pointer-events: none;
    }

</style>

<script>

    // Create a SVG container (1000 + padding)X(500 + padding)
    var w = 500;
    var h = 300;
    var padding = 100;
    // Create the tooltip DIVs
    var div = d3.select("div#bubbles").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    var svg = d3.select("div#bubbles")
              .append("svg")
              .attr("width", w + padding)
              .attr("height", h + padding);
    // Function to draw the bubbles
    function drawBubbles(svg, myScaleX, myScaleY, dataset) {

        svg.selectAll("circle")
           .data(dataset)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                return myScaleX(d.x + padding);
            })
            .attr("cy", function(d) {
                return myScaleY(d.y + padding);
            })
            .attr("r", function(d) {
                return d.size * 20;
            })
            .style("fill", "#f26f05")
            .on("mouseover", function(d) {
                  div.transition()
                     .duration(200)
                     .style("opacity", .9);
                  div.html(d.x + ",   " + d.y + ",   " + d.size)
                     .style("left", (myScaleX(d.x)) + "px")
                     .style("top", (myScaleY(d.y)) + "px")
            })
            .on("mouseout", function(d) {
                   div.transition()
                     .duration(500)
                     .style("opacity", 0);
            });
    };

    // Load the CSV data and draw each bubble
    d3.csv("../data/bubbles.csv", function(data) {

    // Casting types of x and y to int
    data.forEach(function(d) {
      d.x = +d.x;
      d.y = +d.y;
    });

    // Find max in x and y
    var maxX = d3.max(data, function(d) {
      return d.x;
    });
    var maxY = d3.max(data, function(d) {
      return d.y;
    });

    // Create linear scales
    var myScaleX = d3.scaleLinear();
    myScaleX.domain([0, maxX])
            .range([0, w]);

    var myScaleY = d3.scaleLinear();
    myScaleY.domain([0, maxY])
            .range([h, 0]);

    // Draw the bubbles
    drawBubbles(svg, myScaleX, myScaleY, data);

    // Draw the X axis
    svg.append("g")
        .attr("transform", "translate(0" + padding/2 +  "," + (h) + ")")
        .call(d3.axisBottom()
                .scale(myScaleX));

    // Draw the Y axis
    svg.append("g")
        .attr("transform", "translate(" + padding/2 + ",0)")
        .call(d3.axisLeft()
                .scale(myScaleY));

    });

</script>
