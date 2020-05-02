---
title: "Stereo Vision update"
author: "Andrew Huang"
categories: perception
tags: [progress update]
published: true
mathjax: true
---

As a follow up to the [previous post](/perception/stereo-intro/). It was assumed that pixel locations of the object of interest will be provided for triangulation. However, for our use case an image frame will have multiple objects of interest within view, how would we then pair an object located within the left frame to its corresponding position in the right frame? In this post a simple brute force method is demonstrated as a proof of concept before any algorithmic optimizations are applied.

**Prerequisites/Assumptions**

The following technique would require/assume:
- Location of the object in both left and right frames
- Bounding boxes of said object in both frames

Which can be obtained from a trained neural net like YOLOv3.

**Proof of concept**

![Bounding Boxes](/assets/img/stereo-1/bounding_boxes.png "Bounding Boxes")

Starting with the position of each cone and its bounding box, a crop is taken from the original left image frame of the bounding box.

![Gray Crop](/assets/img/stereo-1/gray_crop.png "Gray Crop")

The crops are then compared to every other crop within the right image frame.

Mathematically there are multiple ways of calculating how similar two images are,

- Sum of absolute differences (SAD)

$$\text{SAD}(L,R) = \sum_i\sum_j |L_{i,j} - R_{i,j}|$$

- Sum of squared differences (SSD)

$$\text{SSD}(L,R) = \sum_i\sum_j \left(L_{i,j} - R_{i,j}\right)^2$$

- Normalized Cross correlation (NCC)

$$\text{NCC}(L,R) = \dfrac{\sum_i\sum_j \left(L_{i,j}\ R_{i,j}\right)}{\sigma_L\ \sigma_R}$$

As it can be seen, the above mathematical representation of similarity are in increasing computational complexity. Both SAD and SSD will provide a result within the range $[0, \infty]$, where 0 if the two inputs are exactly the same. NCC on the other hand will provide a bounded range of $[-1, 1]$ in which 0 represents no correlation between images, with 1 and -1 being the two images are identical or exactly inversed.

Further rather than using the raw frame matrix, using the mean normalized ($X' = X - \overline{X}$) data, linear changes in color intensities between two cameras can be accounted for.

By comparing every possible pair in the left and right frame, it is possible to generate a corrolation table,

![corr_map](/assets/img/stereo-1/corr_map.png "Corrolation table")

Next the two images are paired with a linear assignment solver, to solve the optimisation problem which results in the final pairing,

![match_table](/assets/img/stereo-1/match_table.png "Match table")

While the results may look promising currently with the proof of concept, further heureistics and optimisations are possible in order to both increase execution speed and accuracy such as only trying to pair using a k-neareast neighbour algorithm (KNN) and take into stereo setup geometry (Little to no vertical disparity on the y-axis) to reduce redundant or unlikely candidates.