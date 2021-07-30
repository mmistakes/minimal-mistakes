Concept Maps README (for the XAI toolkit)
===============================================

This document is intended to explain how to generate an interactive concept
map, which is inspired by the scikit-learn machine learning cheat sheet:

(https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html)

A concept map can be created using the set of steps explained below. 
Modifying the map is currently a little bit tedious (and a manual process),
so I'll try to make it as simple as possible.

1. Generating an initial concept map.
-------------------------------------

Use CmapTools (https://cmap.ihmc.us/) to create a concept map. Save when
done, and make sure to export the concept map as a .SVG file.

2. Editing the layout of the map and adding links.
--------------------------------------------------

Use a Graphics editor like Inkscape Vector Graphics Editor to open the .SVG
file. From there you can move objects around, etc. as you need.
Additionally, I deleted the two white background layers and created text
boxes by grouping the text and surrounding boxes together.

In Inkscape, manually create links for each text box. Fill in the "Href"
and "Title" object attributes with the url and overlay text that you want
to be shown when a user hovers over the text box, respectively.

3. Save the .SVG file and convert to .HTML
------------------------------------------

Once you are satisfied with the final result, save the file. Then, change
the file extension from .SVG to .HTML. Clicking on the new .HTML file 
should open up a webpage with working links.

4. Edit the .HTML file
----------------------

In the .HTML file, remove the first line, which is an XML header (you may 
have to use a text editor). Additionally, in order for the map to be 
responsive (e.g. on mobile displays), change the width and height 
attributes inside the <svg> command to be "100%" and "auto", respectively.

Save the file, and you're done.

-----------------------------------------------------

This process can probably be improved or even potentially automated in the
future. Feel free to reach out if you have any feedback or suggestions.

-Brian Hu
(brian.hu@kitware.com)
