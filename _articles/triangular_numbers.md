---
title: "Triangular Numbers"
topics: 
  - addition
  - numbers
  - sequences
topic_overview: true
related: 
  - Fibonacci
author: Molly Ireland
sub_date: 2025-08-22
header:
  teaser: /assets/img/triangular_numbers.jpeg
  teaser_alt: The triangular numbers represented with cubes. Each number is a cube and these cubes are stacked so that there is 1 in the first row 2 in the second row 3 in the third row and so on.
  teaser_pos: fit
---

Children who are interested in learning about number sequences may enjoy working with triangular numbers. These are a sequence of numbers that increase by a larger amount each time. The sequence begins with $$1,3,6,10,15,21,...$$ as shown in the image below. You may notice the difference between each number and the next increases by 1 each time. 

{% include figure image_path="/assets/img/triangular_numbers_progression.jpeg" alt=" Arrows connecting the triangular numbers from 1 to 21. Above the arrows is a number denoting the difference between each consecutive triangular number." title="The triangular numbers" %}

These numbers are called triangular numbers, as we can arrange them in stacked triangles as shown below. Children could make these numbers themselves using blocks.

{% include figure image_path="/assets/img/triangular_numbers.jpeg" alt="The triangular numbers represented with squares. Each number is a square and these squares are stacked so that there is 1 in the first row, 2 in the second row, 3 in the third row and so on." title="The triangular numbers" %}

## Handshaking and the Triangular Numbers
One useful property of the triangular numbers is that they tell us how many handshakes would need to happen for a group of people to all shake hands with each other. 

Imagine a group of 5 people. How many handshakes would happen if each person shook the hand of each other person exactly once? We could start by letting the first person shake the hand of every other person; this would take four handshakes in total. Next, the second person could shake hands with all the other people except the first person, as they have already shaken hands, this will take three handshakes in total. We can carry on in this way until everyone has shaken each other's hand, giving in total $$4 + 3 + 2 + 1 = 10$$ handshakes. We can see some graphs representing the handshakes below. 

{% include figure image_path="/assets/img/handshakes_graph.jpeg" alt="Four graphs each with five nodes. In the first one node is connected to all others. In the second, the second node becomes connected to all others and so on. The most recently added edges are shown in red." title= "Handshake graphs" %}

In the final graph, everyone has shaken hands with each other, so each point (node) is connected to all other nodes. When we have a graph where each node is connected to every other node exactly once, we say the graph is complete.

We might notice the total number of handshakes is 10, which is the fourth triangular number. This is because the number of handshakes needed grows as we add people to the group in the same way as the triangular numbers. For example, when we have 2 people 1 hand shake is needed, for 3 people 3 handshakes are needed, for 4 we need 6 and for 5 we need 10. The number of handshakes needed for some $$n$$ people is then the $$(n-1)$$th triangular number.

To get a better idea of how this works, we can think about what happens when we add a sixth person to the group. In the image below, we can see that 5 new lines have to be added to our graph so that the new sixth person shakes hands with each of the original 5. 

When we add a new person to the group they must shake hands with every other person in the group increasing the number of handshakes by the number of people in the new group minus 1. As we add more people to the group the number of extra handshakes needed then increases with respect to the group size.

{% include figure image_path="/assets/img/adding_a_sixth_person.jpeg" alt="Two graphs each with six nodes. In the first graph, five nodes are all connected to each other, and one node is disconnected. In the second graph, the node has been connected to all the other nodes with 5 red lines." title= "Adding a sixth node" %}

## Square and Triangular Numbers

We can also make the square numbers out of consecutive triangular numbers. If we add the fifth and the fourth triangular numbers, which are 10 and 15, we get the fifth square number, 25. In the image below, we can see that the triangular formations of these numbers slot together perfectly.

{% include figure image_path="/assets/img/triangular_square_numbers.jpeg" alt="The triangular numbers are represented with squares. Each number is a square, and these squares are stacked so that there is 1 in the first row, 2 in the second row, 3 in the third row and so on. Consecutive triangular numbers have been added together so that the combination of these two triangular numbers forms a square." title="The square numbers made from triangular numbers" %}

<details markdown ="1">
<summary markdown="span">**To learn more about the algebra behind this click here**</summary>
<p></p>
When we add two consecutive triangular numbers together, one is the $$n$$th triangular number with $$n$$ rows and the other is the $$(n-1)$$th triangular number with $$(n-1)$$ rows. Here $$n$$ is some unknown number greater than 1. When we add the two together, the bottom row with $$n$$ blocks gets no contribution from the smaller triangular number. In the next row up, we have $$(n-1) + 1$$ and in the next row, we have $$(n-2) + 2$$. This continues on until we reach the top row, where we have $$1 + (n-1)$$. This means that we have in total $$n$$ rows containing $$n$$ blocks each. This gives $$n \times n = n^2$$ blocks in total.

In the example above, we added the 5th and 4th triangular numbers together, meaning that we had 5 rows of 5 blocks, making the total number of blocks $$25 = 5^2$$.
</details>
<p></p>

To learn about more number sequences you can read our article about the [Fibonacci numbers]({{site.baseulr}}/articles/fibonacci).