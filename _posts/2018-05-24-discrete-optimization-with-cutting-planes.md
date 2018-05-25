---
published: true
title: Discrete Optimization with Cutting Planes
date: 2018-05-25
categories: optimization algorithms mip
---
Previously I described how we can perform Discrete Optimization using the Branch and Bound technique. Today I want to describe another foundational technique for Discrete Optimization, Cutting Planes. Cutting Planes is like the Branch and Bound technique in that it uses a series of LP Relaxations to search for solutions. Where it is different from Branch and Bound is in how it refines the LP Formulations. Branch and Bound would subdivide the solution space by branching on a decision variable and creating two new subproblems. Instead, what Cutting Planes does is iteratively add constraints which eliminate the nonintegral solutions from the feasible space while not eliminating any feasible integral solutions. These constraints that we add are called "Cuts" because they are cutting off nonintegral solutions from the feasible space.

## The Cutting Planes Algorithm

Conceptually the Cutting Plane Algorithm is rather simple. It is made up of the following three steps.

- Step 1: Solve the LP Relaxation of the Current Problem
- Step 2: Check if the integrality requirements of the initial problem have been met. If so, terminate, an optimal solution has been found. If integrality has not been achieved proceed to Step 3.
- Step 3: Add a constraint to the problem which removes the current optimal solution from the feasible space but does not eliminate any of the integer feasible solutions. Return to Step 1

> Obviously you need to check for infeasibility and unboundedness as well. If either one of those conditions arise, terminate.

That is really all there is to this algorithm. The art is in Step 3, generating cuts. A good cut will accelerate the convergence toward an integral solution. Part of the challenge is that there are frequently an infinite number of cuts which could work to reduce the size of the solution space while not eliminating integer feasible solutions. The trick then becomes finding good cuts quickly. Searching for the best cut is in of itself an optimization problem. We cannot afford to spend an infinite amount of time searching for the best cut though. There are recipes for being able to calculate good cuts quickly. We will go over some of them in a future post. For now, let's walk through a graphical example of how Cutting Planes works.

## Graphical Walkthrough

Let's say that we have a Discrete Optimization problem with two constraints, Constraint A and Constraint B. These two constraints define a space in which the solution must lie. Our decision variables are $x_1$ and $x_2$. For this scenario they are integer decision variables. Here is a quick sketch of the example problem. 

![Initial LP](../assets/2018-05-24-discrete-optimization-with-cutting-planes/2018-05-25-11-48-53.png)

This is just a conceptual walkthrough of Cutting Planes so don't fret about exactly what the numbers are. The dotted grey lines are the boundaries of the constraints. The blue dots indicate the integer feasible solutions and the green arrow is the direction in which the objective function is pointing (the direction of greatest improvement). If we take the LP Relaxation of this problem the optimum would be at the intersection of Constraint A and Constraint B. In the following image this point is indicated by the green dot.

![Solution to Initial LP](../assets/2018-05-24-discrete-optimization-with-cutting-planes/2018-05-25-11-49-17.png)

We have labeled the solution to this initial LP $Z_{LP}^{0}$ . The superscript indicates which iteration this is the solution to and the $LP$ subscript indicates it is a solution to the LP Relaxation. We check if the integrality requirements of the original problem have been met. They have not since the optimal solution to the LP does not lie on integer values for $x_1$ and $x_2$. Now we need to generate a new constraint that we can add to the problem which removes $Z_{LP}^{0}$ from the feasible space but does not eliminate any of the integer feasible solutions (the blue dots).

Later we will go over some methods for calculating these constraints. For now let's just use visual analysis. One of the easiest constraints that we can add is $x_2 \leq 4$. It removes $Z_{LP}^{0}$ from the feasible space but does not cut off any of our integer feasible solutions. Let's add this constraint and redraw our problem. Let's draw the new constraint as a yellow dotted line.

![Solution to LP^1](../assets/2018-05-24-discrete-optimization-with-cutting-planes/2018-05-25-11-49-50.png)

I have taken the liberty of marking the new solution $Z_{LP}^{1}$ on the diagram. The good news is that now $x_2$ has taken on an integer value but $x_1$ has not. $x_1$ lies between $2$ and $3$ so we need to add another constraint. Again we can just look at the problem and see we can add the constraint $x_1 + x_2 \leq 6$. This does not remove any integer feasible solutions but it will remove $Z_{LP}^{1}$ from the feasible space. Let's add this constraint and see what we get.

![Solution to LP^2](../assets/2018-05-24-discrete-optimization-with-cutting-planes/2018-05-25-11-54-09.png)

We have added the constraint of $x_1 + x_2 \leq 6$ and found the new solution, $Z_{LP}^{2}$ . Our new solution $Z_{LP}^{2}$ lies on integral values of $x_1$ and $x_2$. We can now end our search since we have found a solution which meets the integrality requirements of the original problem. We have successfully used Cutting Planes to solve a Discrete Optimization problem!

## Next Steps

This walkthrough had some nice pictures but you should have this nagging question, "How do we generate these cuts?" In this problem it was easy to see which cuts were and were not feasible. We just chose some obvious ones based on what we could see. We need to be able to do this in much higher dimensionality though. Next time we will introduce some of the most common cuts and how we generate them. Today we just wanted to lay a conceptual foundation for how Cutting Planes worked. I hope you enjoyed the post and I always welcome feedback!