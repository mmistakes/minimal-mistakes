
# Why are we doing this?

If you have spend any time with me you will know that I am passionate about Optimization. Now, you may pass this off as a bit of geekiness on my part but the reason I care about Optimization is that it has profound implications for how we care for people. When I get a moment to describe Optimization to someone the way I start off is by saying, "Optimization is the mathematics of caring for people." If you care about making the world a better place for humanity, then you should care about Optimization.

Maths at it's heart is art. It is a beautiful set of concepts and theorems which happen to be powerful tools for constructing models of reality. Math is not reality though, it describes reality.

## Branch and Bound

Let us assume that we already have a powerful Linear Program solver (LP Solver). Given this, we can think of Integer Programming as a recursive set of Linear Programs. We start with a Linear Integer Program (typically abbreviated IP) or a Mixed Integer Linear Program (MILP). We cannot directly solve these problems so we solve a "relaxation" of the problem. We allow the integer decision variables to be continuous. This is called the LP Relaxation of the original problem. We then use our LP Solver to find a solution to this easier version of the problem.

Branch and Bound is a method for recursively solving LP Relaxations and at each step adding constraints so that the integer decision variables that we initially relaxed converge to integer values. At each iteration we check if all of the integer decision variables have taken on integer values. If they have not, we add constraints to force them to and resolve. This method looks very much like search through a binary tree. Let's put together a rough description of this heuristic and then apply it.

## Algorithm Description

Let's put together a rough outline of how the Brand and Bound algorithm works. For that we will need some parameters.

\(P =\) Our Initial Problem\
\(P_{LP} =\) The LP Relaxation of our initial problem


Step 0: Create a LP Relaxtion of the original problem and solve it. Check for the following conditions:

- Infeasible: If the problem is infeasible at this stage we are done. If there is no solution to the LP Relaxation, then there is no solution to the original Integer Program.

- Unbounded: If the objective function has no bounds then we are done. The problem is unconstrained and therefore no optimal solution exists.

- Integer Solution: All of the integer decision variables have taken on integral values. We are done since the solution to the LP Relaxation and the IP problem are the same.

- Fractional Solution: Some or all of the Integer Decision Variables have taken on fractional values and have not met the integrality requirements. We set \(BestUpperBound = z^\ast\) where \(z^\ast\) is the objective value for the initial LP relaxation and  \(BestLowerBound = -\infty\). Select one of the Integer Decision Variables and branch on it. For example, if \(x_1 = 1.5\) in the initial solution and it is supposed to be an integer we would create a branch with a new constraint \(x_1\leq1.0\) and a separate branch where \(x_{1}\geq2.0\).

After we have solved the relaxation we check for the following conditions:

1) The Problem is Unbounded: If this is the case then we can stop because there is no solution. The objective function can be increased infinitely.

2) The Problem is Infeasible: The set described by the constraints is empty. There are no values which meet all of the requirements. We refer to this as "Pruning by Infeasibility". If this occurs with our initial LP Relaxation then the problem has no solution.

3) The Solution is Integer: All of the decision variables which are required to take on integer values have. This means that a feasible solution to the original problem has been found. This would be a Candidate for Optimality. If it is the best integral solution so far it would become the "Incumbent Solution".

4) The Solution is Fractional: One or more of the integer decision variable have a non-integer value. This means that we must continue our search.

If our solving of the initial LP Relaxation falls into one of the first three situation, then we are done. If it falls into the fourth, then we will need to branch.