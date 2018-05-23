
# Why are we doing this?

If you have spend any time with me you will know that I am passionate about Optimization. Now, you may pass this off as a bit of geekiness on my part but the reason I care about Optimization is that it has profound implications for how we care for people. When I get a moment to describe Optimization to someone the way I start off is by saying, "Optimization is the mathematics of caring for people." If you care about making the world a better place for humanity, then you should care about Optimization.

Maths at it's heart is art. It is a beautiful set of concepts and theorems which happen to be powerful tools for constructing models of reality. Math is not reality though, it describes reality.

## Branch and Bound

Let us assume that we already have a powerful Linear Program solver (LP Solver). Given this, we can think of Integer Programming as a recursive set of Linear Programs. We start with a Linear Integer Program (typically abbreviated IP) or a Mixed Integer Linear Program (MILP). We cannot directly solve these problems so we solve a "relaxation" of the problem. We allow the integer decision variables to be continuous. This is called the LP Relaxation of the original problem. We then use our LP Solver to find a solution to this easier version of the problem.

Branch and Bound is a method for recursively solving LP Relaxations and at each step adding constraints so that the integer decision variables that we initially relaxed converge to integer values. At each iteration we check if all of the integer decision variables have taken on integer values. If they have not, we add constraints to force them to and resolve. This method looks very much like search through a binary tree. Let's put together a rough description of this heuristic and then apply it.

## Algorithm Description

Let's put together a rough outline of how the Brand and Bound algorithm works. For that we will need some parameters.

\(P =\) Our Initial Problem  
\(P_{LP} =\) The LP Relaxation of our initial problem  
\(P^k =\) The \(k^{th}\) subproblem of problem \(P\)  
\(P^k_{LP} =\) The LP relaxation of the \(P^k\) problem  
\(z_{UB}^n =\) The best upper bound on the objective function for node \(n\)  
\(z_{LB}^n =\) The best lower bound on the objective function for node \(n\)  
\(Z_{UB} =\) The best upper bound for the objective function observed so far  
\(Z_{LB} =\) The best lower bound for the objective function so far


### Step 0: Initialize the Problem

Create a LP Relaxtion of the original problem and solve it. Check for the following conditions:

- Infeasible: If the problem is infeasible at this stage we are done. If there is no solution to the LP Relaxation, then there is no solution to the original Integer Program.

- Unbounded: If the objective function has no bounds then we are done. The problem is unconstrained and therefore no optimal solution exists.

- Integer Solution: All of the integer decision variables have taken on integral values. We are done since the solution to the LP Relaxation and the IP problem are the same.

- Fractional Solution: Some or all of the Integer Decision Variables have taken on fractional values and have not met the integrality requirements. We set \(BestUpperBound = z^\ast\) where \(z^\ast\) is the objective value for the initial LP relaxation and  \(BestLowerBound = -\infty\). Select one of the Integer Decision Variables and branch on it. For example, if \(x_1 = 1.5\) in the initial solution and it is supposed to be an integer we would create a branch with a new constraint \(x_1\leq1.0\) and a separate branch where \(x_{1}\geq2.0\). Which fractional integer variable is up to the implementer. It could be the one with the lowest index or the one who's fractional component is closed to 0.5. This is where some of the art in the algorithm is. When you decide on the variable, add these new subproblems to the list of candidate nodes.

### Step 1: Solve an LP Relaxation of the Node

 Now assuming that a feasible solution was not found with the initial LP Relaxation we need to choose a node to solve. After Step 0 there will only be 2 nodes to the candidate node list but as we continue to iterate we will add more nodes to the candidate list. Which node we solve is a design decision. The node with the best lower bound or continuing down the children of the previous node. What some people do is do a depth first search to find a better \(BestLowerBound\) to aid in pruning other nodes. The best choice is often problem dependent. Whatever strategy you employ, just choose a node.

Whatever strategy you employ, you will continue to evaluate nodes until the list of candidate nodes has been emptied.

Step 2: Solve the LP Relaxation of the chosen node.

- If the problem is infeasible, "prune" this node and return to Step 1. No children of this node will yield useful results.
- If the value of the objective function for this node is less than the \(BestLowerBound\) then prune this node and return to Step 1. No child of this node will yield better results than what has already been observed.
- If the solution to the node yields integral results for the integer decision variables then a feasible solution has been found. Since you have already validated the the objective function value is greater than the \(BestLowerBound\) then you have a new *incumbent solution*. An *incumbent solution* is a potential candidate for the global optimum. Update the current \(BestLowerBound\) to the value of the objective function for this nodes solution. The current node is pruned since no better solution will be found down this branch. Return to Step 1.
- If the solution is noninteger then you will generate a branch. Decide which noninteger decision variable to branch on. Let's say you decide to branch on \(x_2\) which had a solution value of \(10.4\). You would create two child nodes. One in which the constraint \(x_2\leq10.0\) and another where the constraint \(x_2\geq11.0\) has been added. Return to Step 1 to select a new node.