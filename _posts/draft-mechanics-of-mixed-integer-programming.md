# Why are we doing this?

If you have spend any time with me you will know that I am passionate about Optimization. Now, you may pass this off as a bit of geekiness on my part but the reason I care about Optimization is that it has profound implications for how we care for people. When I get a moment to describe Optimization to someone the way I start off is by saying, "Optimization is the mathematics of caring for people." If you care about making the world a better place for humanity, then you should care about Optimization.

Maths at it's heart is art. It is a beautiful set of concepts and theorems which happen to be powerful tools for constructing models of reality. Math is not reality though, it describes reality.

## Branch and Bound

Let us assume that we already have a powerful Linear Program solver. Given this, we can think of Integer Programming as a recursive set of Linear Programs. We start with a Linear Integer Program (typically abbreviated IP) or a Mixed Integer Linear Program (MILP). We cannot directly solve these problems so we solve a "relaxation" of the problem. We allow the integer decision variables to take on non-integer values. 

Now, when we solve this relaxation of the original problem we will check for some potential conditions:

1) The Problem is Unbounded: If this is the case then we can stop because there is no solution. The objective function can be increased to infinity and beyond. We call this "Pruning by Unboundedness".

2) The Problem is Infeasible: The set described by the constraints is empty. There are no values which meet all of the requirements. We refer to this as "Pruning by Infeasibility".

3) The Solution is Integer: All of the decision variables which are required to take on integer values have. This means that a feasible solution to the original problem has been found. This would be a Candidate for Optimality. If it is the best integral solution so far it would become the "Incumbent Solution".

4) The Solution is Fractional: One or more of the integer decision variable have a non-integer value. This means that we must continue our search.

If our solving of the initial LP Relaxation falls into one of the first three situation, then we are done. If it falls into the fourth, then we will need to branch.