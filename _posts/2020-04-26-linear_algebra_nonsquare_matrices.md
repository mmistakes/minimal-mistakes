---
title: "Non-square Matrices as Transformations Between Dimensions"
author: "Abdul"
layout: single
categories:
  - linear_algebra
permalink: /categories/math/linear_algebra/non_square_matrices_as_transformations_between_dimensions/
toc: true
---

So far we have only covered two-dimensional vectors to other
two-dimensional vectors, represented by `2 x 2` matrices.
Or three-dimensional vectors to other three dimensional vectors,
represented by `3 x 3` matrices.

# Non-Square Matrices
By now we have most of the tools that we need to be able to ponder
on non-square matrices.

      i  j
    [ 0 -2 ]
    [ 5  1 ]
    [ 1  4 ]

It is perfectly reasonable to talk about transformations between
dimensions, which take two-dimensional vectors and transform them
to three-dimensional vectors.

    [ 2 ]          [ 1 ]
    [ 7 ]-> L(v) ->[ 8 ]
                   [ 2 ]

Again, what makes these transformations linear is that the
gridlines remain parallel and evenly spaced.
Along with the fact that the origin remains fixed in space.

It is important to understand that two-dimensional inputs are
very different from their corresponding three-dimensional outputs.

## Describing the Transformation
Encoding one of these transformations is the same as what we have
done before.
You take a look at where the basis vectors lands and
write the coordinates of each landing spot as the columns of a matrix.
The following matrix takes *i* to the coordinates of `(2, -1, -2)`
and *j* to the coordinates of `(0, 1, 1)`.

      i  j
    [ 2  0 ]
    [-1  1 ]
    [-2  1 ]

This means that the matrix used to encode our transformation has
3 *rows* and 2 *columns*.
Meaning that we are using a `3 x 2` matrix.

## The Columns Space
In the language of the last topic, the column space of this matrix,
the place where all the vectors land, is a *two-dimensional* plane
slicing through the origin of three-dimensional space.
But the matrix is still *full rank*, since the number of dimensions
in the column space is the same as the number of dimensions in
the input space (rank of 2 with only 2 columns).

## The Relationship Between Columns and Rows
So if you see a `3 x 2` matrix, you can know that it has the geometric
interpretation of mapping two-dimensions to three-dimensions.

    [ 1  1 ]
    [ 0  1 ]
    [ 1  0 ]

Since we know that the 2 columns indicate that the input space has
only *two basis vectors*,
meaning that we are starting in two-dimensions.
While the three rows indicate that the
landing spot for each of those basis vectors is described with
*three separate coordinates*, meaning that they are landing in
three-dimensions.

Likewise, if you see a `2 x 3` matrix with two rows and three columns,
it indicates that the input space has *three basis vectors*,
meaning that you are starting in three-dimensions.
While the landing spot for each of those basis vectors is described
with only *two separate coordinates*, meaning that they are
landing in two dimensions.

    [ 3  1  4 ]
    [ 1  5  9 ]

## From Two-Dimensions to a Number Line
You can also have a transformation from two dimensions to one dimension.
One dimensional space is really just the number line.
Therefore a transformation like this takes two-dimensional vectors,
and spits out numbers.

Thinking of the concept of gridlines remaining parallel and
evenly spaced can get a little messy here.
Therefore the understanding for what linearity means is that
if you have a line of evenly spaced dots, they would remain
evenly spaced after they're mapped onto the number line.

One of these transformations is encoded by a `1 x 2` matrix.
Each of whose columns are just a single entry.
Each of those columns represents where those basis vectors land,
and since we are on a flat number line, each of those columns
only requires one number, number where that basis vectors lands on
(see picture one).

    [ 1  2 ]

This is a surprising meaningful transformation, which is
closely related to the dot product, which we will cover in our
next post.


![Image](/assets/images/linear_algebra_inverse_nonsquare_matrices.jpg)
