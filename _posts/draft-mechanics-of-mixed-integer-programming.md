
# Why are we doing this?

If you have spend any time with me you will know that I am passionate about Optimization. Now, you may pass this off as a bit of geekiness on my part but the reason I care about Optimization is that it has profound implications for how we care for people. When I get a moment to describe Optimization to someone the way I start off is by saying, "Optimization is the mathematics of caring for people." If you care about making the world a better place for humanity, then you should care about Optimization.

Integer Programming and Mixed Integer Programming are amazing tools for mathematically modeling problems. By adding decision variables which must take on integer values we can describe complex logic in ways that Linear Programming cannot. The downside to this is that the problems are for more difficult to solve. Thankfully, there are a host of algorithms which can solve even incredibly large problems in a reasonable amount of time. The performance of these algorithms is highly dependent on the quality of the implementation though. What I hope to accomplish in this series of posts is to demystify some of the magic going on in MIP and hopefully tantalize you into learning more.

Maths at it's heart is art. It is a beautiful set of concepts and theorems which happen to be powerful tools for constructing models of reality. Math is not reality though, it describes reality.

One of the immediate challenges we face when trying to solve IP and MIP problems is that we cannot directly deal with the fact that some of the decision variables need to take on integral values. What most algorithms do is solve a Linear Programming relaxation of the original problem. The integral requirements of the decision variables is relaxed. This relaxed LP is solved and then constraints are added which force the integer decision variables to converge toward integral solutions. This means that we can really think of solving IP and MIP as recursively solving LPs where we add constraints at each recursive step. This series of posts will describe some of the algorithms in this family of solution techniques.

## Branch and Bound

Branch and Bound is the most straightforward method of searching for MIP solutions. We solve an initial LP Relaxation of the original problem. If we find a solution where some of the integer decision variables have taken on nonintegral values we select one to branch one. We end up creating two new nodes which are copies of the original problem but each one has a new constraint which forces the branching variables to take on an integral value.

For example, if we solved the LP Relaxation and the decision variable \(x_1 = 1.5\) but it is supposed to be integral we can branch on \(x_1\). We do this by creating two new instances of the original problem but in one of the nodes we add the constraint \(x_1\leq10\) and in the other we add the constraint that \(x_1\geq11\). These new problems will no longer allow \(x_1\) to take on the value of 10.5. We now solve these new problems and add new constraints to force other nonintegral integer variables toward integral values. Let's walk through a more formal description of the algorithm.

## Algorithm Description

Let's put together a rough outline of how the Brand and Bound algorithm works. For that we will need some parameters.

\(P =\) Our Initial Problem  
\(P_{LP} =\) The LP Relaxation of our initial problem  
\(P^n =\) The \(n^{th}\) subproblem of problem \(P\)  
\(P^k_{LP} =\) The LP relaxation of the \(P^k\) problem  
\(z^n =\) The objective function value for the solution to \(P^n\)   
\(z_{UB}^n =\) The best upper bound on the objective function for node \(n\)  
\(z_{LB}^n =\) The best lower bound on the objective function for node \(n\)  
\(Z_{UB} =\) The best upper bound for the objective function observed so far  
\(Z_{LB} =\) The best lower bound for the objective function so far

### Step 0: Initialize the Problem

Create a LP Relaxation of the original problem \(P\) and solve it. We refer to this relaxed problem as \(P_{LP}\). We attempt to solve \(P_{LP}\) and check for one of the following conditions.

#### Infeasible

If the problem is infeasible at this stage we are done. If there is no solution to the \(P_{LP}\), then there is no solution to the original Integer Program.

#### Unbounded

If \(P_{LP}\) has no bounds then we are done. The problem is unconstrained and therefore no optimal solution exists.

#### Integer Solution

All of the integeral requirements of \(P\) have been met. We are done since the solution to \(P_{LP}\) and \(P\) is the same.

#### Fractional Solution

Some number of the integer variables have taken on nonintegral. We set \(Z_{UB} = z^\ast\) where \(z^\ast\) is the objective value for the initial \(P_{LP}\) and  \(Z_{LB} = -\infty\). Select one of the nonintegral decision variables and branch. To branch we create two new nodes from the parent problem. We make a copy of the parent but we add a constraint to the children which will force the nonintegral variable toward and integral value.

Let's say that in \(P_{LP}\) \(x_1\) is an integer decision variable but due to the relaxation \(x_1 = 1.5\). We decide that we will branch based on \(x_1\). We create a new child node \(P^1\) which is the same as \(P\) but with a new constraint \(x_1\leq1.0\). The corresponding node we could call \(P^2\) which is the same as \(P\) but with the additional constraint that \(x_{1}\geq2.0\). We add both of these nodes to the Candidate List.

### Step 1: Select a Node from the Candidate List

 Now assuming that a feasible solution to \(P\) was not found when we solved \(P_{LP}\) then we need to choose a node to solve from the Candidate List. After Step 0 there will only be 2 nodes to the Candidate List but as we continue to iterate we will add more nodes to the Candidate List.
 
 Which node we choose to solve is a design decision. We could choose the node with the best lower bound or continue down the children of the  node we just solved. What some people do is do a depth first search to find a better \(Z_{LB}\) to aid in pruning other nodes. The best choice is often problem dependent. Whatever strategy you employ, just choose a node. Whatever strategy you employ, you will continue to evaluate nodes until the Candidate List has been emptied.

### Step 2: Solve the LP Relaxation of the \(n^{th}\) node

When you solve the LP Relaxation of the given node, \(P_{LP}^n\), update \(z_{UB}^n\). This represents the best possible objective function that could be achieved by the children of this node.

### Step 3: Check for Infeasibility

If while solving \(P_{LP}^n\) you find the solution is infeasible you can "prune" this branch. None of the children of this node will be feasible either so there is no point in continuing to search down this branch.

### Step 4: Check against \(Z_{LB}\)

If the \(z^n \leq Z_{LB}\)

- If the problem is infeasible, "prune" this node and return to Step 1. No children of this node will yield useful results.
- If the value of the objective function for this node is less than the \(BestLowerBound\) then prune this node and return to Step 1. No child of this node will yield better results than what has already been observed.
- If the solution to the node yields integral results for the integer decision variables then a feasible solution has been found. Since you have already validated the the objective function value is greater than the \(BestLowerBound\) then you have a new *incumbent solution*. An *incumbent solution* is a potential candidate for the global optimum. Update the current \(BestLowerBound\) to the value of the objective function for this nodes solution. The current node is pruned since no better solution will be found down this branch. Return to Step 1.
- If the solution is noninteger then you will generate a branch. Decide which noninteger decision variable to branch on. Let's say you decide to branch on \(x_2\) which had a solution value of \(10.4\). You would create two child nodes. One in which the constraint \(x_2\leq10.0\) and another where the constraint \(x_2\geq11.0\) has been added. Return to Step 1 to select a new node.