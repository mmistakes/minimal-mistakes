I recently attended a training event hosted by Gurobi. For those who don't know, Gurobi produces one of the best mathematical solvers in the industry. It was a great event and we were able to spend ample time with engineers and experts in the field.

Using a mathematical solver requires the ability to formulate models and at this time one of the easiest languages for doing that is Python. Python is a great language for many use cases. One is providing a quick and easy means of formulating models that can then be fed to a solver. I was able to spend some time with one of the engineers who implemented Gurobi's Python library, `gurobipy`. He pointed to the formulation of the `netflow` problem as an example of how terse and concise Python could be for modeling.

Since I love F#, I naturally wanted to see if I could accomplish the same thing using F#. What started as a silly proof of concept is slowly turning into a more full fledged library for wrapping the Gurobi .NET library in a functional F# wrapper. Below I give an example of how the power of functions in F# allows us to nearly duplicate the functionality of Python.

> ***Note*** I am not saying one language is better than another. I merely like to challenge myself with formulating ideas in different languages. It forces me to translate across paradigms which I find a useful exercise for the mind.

## Netflow Example

The following shows an example of a network flow problem provided by Gurobi and modeled in Python. The full formulation can be [found here](http://www.gurobi.com/documentation/8.0/examples/netflow_py.html). In this example I am just comparing and contrasting the Python and F# constraint formulation methods.

> ***Disclaimer***: All Python code is copyrighted by Gurobi Optimization, LLC

### Creating a model

#### Python

In Python the creation of the model and decision variables is quite straightforward.

```python
# Create optimization model
m = Model('netflow')

# Create variables
flow = m.addVars(commodities, arcs, obj=cost, name="flow")
```

#### F#

In F# we have a similar syntax but instead of `flow` being a `Dictionary` of decision variables, we produce a `Map<string list, GRBDecVar>` which is essentially the same for our purposes.

```fsharp
// Create a new instance of the Gurobi Environment object
// to host models
let env = Environment.create

// Create a new model with the environment variable
let m = Model.create env "netflow"

// Create a Map of decision variables for the model
// addVarsForMap <model> <lower bound> <upper bound> <type> <input Map>
let flow = Model.addVarsForMap m 0.0 INF CONTINUOUS costs
```

Instead of using the methods on the object, functions have been provided which operate on the values that are passed in. This is more idiomatic for F#. The `Model` module in the library hosts all of the functions for working with objects of type `Model`.

The `Model.adddVarsForMap` function takes a `Map<string list, float>` and produces a `Map<string list, GRBDecVar>` for the modeler to work with. This is similar to how the Python tuples are working in the `gurobipy` library. Instead of indexing into a Python dictionary with `tuples`, F# uses a `string list` as the index.

### Adding Constraints

#### Python
The `gurobipy` library offers a succinct way of expressing a whole set of constraints by using generators. There is additional magic going on under the hood though that may not be obvious at first. The following method generates a set of constraints for each element in `arcs` but also creates a meaningful constraint name. The prefix for the constraint name is the last argument of the method (`"capacity"` in this instance).

```python
# Arc capacity constraints
capacityConstraints = 
    m.addConstrs(
        (flow.sum('*',i,j) <= capacity[i,j] for i,j in arcs), "capacity")
```


There is also special sauce occuring in the `flow.sum('*',i,j)` syntax. `flow` is a dictionary which is indexed by a 3 element tuple. What this `sum()` method is doing is summing across all elements in the dictionary which fit the pattern. The `*` symbol is a wildcard and will match against any element. This is a powerful way to sum across dimensions of the optimization model.

#### F#

In F# we can do something similar but instead of having a generator we pass in a lambda to create the constraints.

```fsharp
let capacityConstraints =
    Model.addConstrs m "capacity" arcs
        (fun [i; j] -> (sum flow ["*"; i; j] <== capacity.[[i; j]]))
```

The function `Model.addConstrs` takes a `model` object as its first argument (`m` in this case), the prefix for what the constraints are going to be named (`"capacity"` in this case), and the set of indices the constraints will be created over, `arcs` in this case. The key point is that the types of the indices must match the input type of the lambda.

The `addConstrs` function will iterate through each of the indices in the set, create a constraint from the lambda that was passed, and name the constraint appropriatly. If the first element of the `arcs` set was `["Detroit"; "Boston"]` then the name of the first constraint would be `capacity_Detroit_Boston`. This helps the modeler by maintaining a consistent naming scheme for the constraints in the model.
