In my [previous post](http://matthewcrews.com/fsharp-for-optimization-modeling/) I provided a compare and contrast with modeling optimization models in Python versus what could be done with F#. In this post I talk about some of the challenges I faced when I tried to translate the `gurobipy` library syntax to F#.

## Why are we doing this?

I find that it is a useful exercise to try and take a solution in one domain and translate it to another. Taking a problem that has been stated in a Object Oriented manner and translating it to a Functional paradigm exercises the mind. This is similar to what you need to do when you are talking to a domain expert and need to translate their problem to code. It also teaches you where the strengths of OO are compared to functional. There is no paradigm that is the best for all situations. By learning to translate between different paradigms it becomes easier to recognize which is the most applicable for a given situation.

Python and F# are not as far apart as some people may believe. They both use indentation to denote scope and have terse syntax for expressing loops and iteration. I really enjoy Python and think it is a great language. They both support lambdas and make it easy to import and export data. They are both "extroverted" languages, according to Scott Wlaschin, meaning they are good at talking with the outside world. The main place where these languages diverge is in dynamic versus static typing.

I believe that arguments of static versus dynamic typing are a fruitless effort. My thought is, "If you are productive in a dynamically typed language, great! If you are productive in a statically typed language, great!" Fundamentally we are called to solve peoples problems and how we do that is really an afterthought. Choose the language that allows you to care for people the best. For me, in my current position, that is F#.

## The Syntax Challenge

When I was spending time with the Gurobi engineers I was pointed to the `netflow` problem as an example where the expressivity of Python really shined. The specific piece of code is the following.

```python
# Copyright 2018, Gurobi Optimization, LLC

capacityConstraints = 
    m.addConstrs(
        (flow.sum('*',i,j) <= capacity[i,j] for i,j in arcs), "capacity")
```

Let's unpack what this method is doing. In this instance the `arcs` object is a set of tuples which represent indices. The `m` object is an optimization model object that we are adding constraints to. The `flow` object is a `Dictionary` indexed by a 3 element `tuple` which holds decision variables for the model that we are building. The `capacity` object is a `Dictionary` indexed by a 2 element `tuple` which indicate the amount of flow which can move between node `i` and `j`.

At the heart of this whole thing is a Python generator which creates a constraint for each element in `arcs`.

```python
flow.sum('*',i,j) <= capacity[i,j] for i,j in arcs
```

Those familiar with Python will recognize this as similar to a list comprehension. What is really magical about this is that the `addConstrs` method recognizes that it is taking this comprehension as an argument and is doing some kind of reflection to see what the indices are. The `addConstrs` method creates an appropriately named constraint in the `m` model object for each set of indices. How this is done, I have no idea. It was just explained to me that this was the really magical piece of this code and I agree. I have no idea how Gurobi is pulling this off.

The other magical thing going on is in the `flow.sum('*',i,u)` method. What this is saying is sum all of the elements in the `flow` dictionary which match the expression `*,i,u`. In this case `*` is considered a wildcard character.

Oh, and did I mention that this whole thing returns an indexed set of constraints based on the indices that are used? `arcs` in this case.

## The Requirements

My take away from this discussion was that if I wanted to do something equivalent in F# it need to do the following:

- Take an expression for the constraint
- Create a constraint from the expression for each element in a set of indices
- Name the constraint something meaningful based on the indices
- Be able to sum across dimensions when using a wildcard character
- Create an indexed collection of the results based on the input index set

So I put on my functional hat and and surmised the following. "I need to create a function which takes a `Model` object, a function to create `Constraint` objects, a set of indices to create them over, and a prefix for naming the set of constraints. Oh, and the result needs to provide a indexed collection based on the indices that were passed in." In F#, the function signature is the following:

```fsharp
type MagicConstraintFunction = model:Model -> constraintBuilder:(index -> constraint) -> indices:index list -> prefix:string -> Map<index, constraint>
```

Now, I am going to point out right off the bat that this is not purely function. The process of creating constraints is mutating the `Model` object. I am not worried about that. I am  focused on creating a productive environment for creating optimization models, not maintaining functional purity. The goal is to create a syntactically F# idiomatic way of doing this. I am not going to go to the effort to create a monad for managing all of this state mutation.

## Creating Constraints

The first thing that I needed to be able to tackle was the creation of `Constraints` in an F# idiomatic way. The Gurobi .NET library is Object Oriented and therefore is wanting the user to call methods on an instance of an object, a `Model` object in this case. The `addContr` method in the Gurobi library has two overloads but the one I wanted to use has the following method signature:

```csharp
GRBModel.addConstr(expr1:GRBLinExpr, sense: char, expr2:GRBLinExpr, name:string): GRBConstr
```

In mathematical terms the `expr1` is the left hand side of the equation, the `sense` is the comparison type, the `expr2` is the right hand side, and the `name` parameter is the name given to the constraint. If your constraint was the following:

```
2x1 + 3x2 <= 4x3
```

`2x1 + 3x2` would be the `expr1`, `<=` would be the `sense`, `4x3` would be `expr2`. This is simple enough to turn into something more idiomatic for F#. I created a `Model` module to hold all of the functions for interacting with `Model` objects. The function for creating a single constraint is the following:

```fsharp
module Model =
    let addConstr (m:GRBModel) (name:string) (constraintExpr: GRBLinExpr * char * GRBLinExpr) =
        let LHS, sense, RHS = constraintExpr
        m.addConstr(LHS, sense, RHS, name)
```

I am making my life easy by making the `constraintExpr` a tuple which includes the `LHS`, `sense`, and `RHS`. This new function is nice but I need something that will operate over a set of indices. Something like this...

```fsharp
let addConstrs (m:GRBModel) (setName:string) (indices: 'a list) (constraintFunc: 'a -> GRBLinExpr * char * GRBLinExpr) =
    let constraintName idx = setName + "_" + idx.ToString()

    setIndexes
    |> List.map (fun x -> x, addConstr model (constraintName x) (constraintExpr x))
    |> Map.ofList
```

This function makes it ridiculously simple to pass in a function for generating constraints based on a set of indices. The obvious restriction is that the `indices` must be of the same type that the `constraintFunc` takes as input. The result of this function will be a `Map<'a, GRBConstr>`.

> ***Note***: I am including type annotations to make the code easier to follow. The actual source code does not have these because it is not required. The F# compiler is smart enough to figure them out based on context.