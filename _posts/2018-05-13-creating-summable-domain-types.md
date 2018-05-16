---
published: true
---
One of the reasons that I love F# is that is makes it incredibly easy to model domains. By creating a Domain Model which represents the business domain it becomes relatively easy to create workflows and algorithms which streamline business processes. In this post I show how to create types for a domain which are summable, a feature I use frequently in my work.

## The Value of Restricting Values

When I have to create a new Domain Model one of the first things that I do is define a single case Discriminated Union of `decimal` for the basic building blocks that I am going to work with (Costs, Items, Sales Rates, Days of Inventory, etc.). For example, when I am creating an algorithm to evaluate the financial viability of a product on marketplaces I have to calculate costs, I therefore create a `Cost` type. In my domain, a `Cost` is never negative therefore I can create a constructor which will enforce this behavior.

```fsharp
type Cost = Cost of decimal // Define a single case DU 'Cost' for decimal

module Cost =
    let create c =         // Function for creating 'Cost' values
        if c <= 0M then    // Check that the value is greater than 0.0M
            None           // Return None if outside bounds
        else
            Some(Cost c)   // Return input wrapped in a 'Cost' value
```

The beautiful thing about this is that when I am working with a `Cost` type I never have to worry about it being negative. This is a powerful thing when it comes to composing algorithms because I have eliminated a whole host of possible values that I would need to handle. It is amazing how easy it is for a negative numbers to sneak in and cause havoc. I force myself to deal with this bad data at the boundary of the domain instead of inside the algorithm performing the analysis.

## The Downside: Where Did Addition Go?

There is a downside to doing this though, basic math operations will not work. At this point if I try to add two different `Cost` values I will get a compiler error.

```fsharp
let totalCost = cost1 + cost2 // Error: The type 'Cost' does not support the '+' operator
```

Fortunately this is easy to overcome. All we need to do is implement the `+` operator for the type. We do this by adding a `static member` to our type alias. We add the keyword `with` to the end of our previous type alias definition and provide the `+` static member.

```fsharp
// Updated definition of 'Cost'
type Cost = Cost of decimal with
    static member (+) (Cost c1, Cost c2) =
        Cost (c1 + c2)
```

The arguments for the `+` function may look a little odd so let me explain. By declaring the arguments of the function as `(Cost c1, Cost c2)` I am telling the compiler that I expect a `Cost` type as the input and I want you to unpack the value inside of `Cost` and put it in the `c1` and `c2` values respectively. This allows me to work with the `decimal` values inside of the `Cost` type. The function itself adds the two values together and then wraps the result in a `Cost`. Now when we go to add two `Cost` values we no longer get an error.

The beauty of this is that I have maintained control over the values that `Cost` can take on. I declared a `create` function which insures positive values. I only allow addition of `Cost` types which means that a `Cost` will only ever be positive. Some people may brush this off as trivial but as someone who has seen the damage that can happen from values going outside of the expected range, this extra work for reliability and peace of mind is worth it. For me, it is more efficient to ensure values cannot go outside their allowed bounds through controlling construction and operator definitions than to have value checks all over the place.

```fsharp
let totalCost = cost1 + cost2
// Result: val totalCost : Cost = Cost 15.0M
```

## Enabling Summation

Well, that is great and all but what happens when we have a `List` of `Cost` values and we want to sum them. What happens then?

```fsharp
let sumCosts =
    [cost1; cost2]
    |> List.sum // Error: The type 'Cost' does not support the operator 'get_Zero'
```

Now when I first came across this I was confused. I had no idea what this `get_Zero` operator meant. After digging around for a while I was able to find some examples of what it was referring to. The `sum` function wants a starting point for the summation and it gets that by calling the `Zero` function on the type. I don't know why the compiler is saying `does not support the operator 'get_Zero'` instead of saying `the type does not have a function named 'Zero'`. Again, F# makes this easy to implement.

```fsharp
// Summable 'Cost' type
type Cost = Cost of decimal with
    static member (+) (Cost c1, Cost c2) =
        Cost (c1 + c2)

    static member Zero =
        Cost 0.0M
```

Now when we try to sum a list of `Cost` values we get the expected result.

```fsharp
let sumCosts =
    [cost1; cost2]
    |> List.sum
// Result: val sumCosts : Cost = Cost 15.0M
```

## Freedom Through Constraints

The more I dive into Domain Driven Design with F#, the more I love it. By ensuring values comply with expectations at the boundary of the domain, I am freed to reason about my algorithms without worrying about data going awry inside the domain. While it takes a few more keystrokes to define operations on these domain types, I hope that I showed you that it takes little effort in F# and can lead to more reliable and robust code. Keep calm and curry on!