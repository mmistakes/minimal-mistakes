One of the things that most attracted me to F# is the ability to accurately model your domain. What first turned me on to this was a talk by [Scott Wlaschin on Functional programming design patterns](https://www.youtube.com/watch?v=E8I19uA-wGY&t=1102s). Scott has a more focused talk on [Domain Modeling Made Functional](https://www.youtube.com/watch?v=Up7LcbGZFuo&t=229s) that he did a few years later and a [book with the same title](https://fsharpforfunandprofit.com/books/). This whole concept was blowing my mind. The idea of modeling your domain such that illegal states are unrepresentable sounds immensely satisfying to me.

This new way of looking at the world has been slowly transforming all of my code. Everywhere I look now I am asking, "Is it possible for this state to be illegal? What can I do to ensure I am covering all scenarios?" With this new focus I quickly came across an operator in F# that lies, the division operator.

If you hover over the / operator in Visual Studio you will get the following function signature

```fsharp
val(/): x:'T1 -> y:'T2 -> 'T3 (requires member (/))
```

There is nothing surprising here. The `/` operator is expecting two values and will produce a third. Now let's look at what the compiler says is supposed to happen when we divide two decimals. If I input the following lines into a fsx script in Visual Studio I will get the following types from the compiler.

```fsharp
let a = 10M     // val a : decimal
let b = 5M      // val b : decimal
let c = a / b   // val c : decimal
```

This is where my problem is. The compiler says that taking two decimal values and dividing them will produce a third decimal value. This is not always the case though. If `b = 0M` then this will throw an exception. This runs counter to the idea of making illegal states unrepresentable. We would rather that the operator returned `'T option` which would force us to deal with both scenarios.

Fortunately for us, it is easy to add operators to F# but there are a couple of gotchas I will cover here. The F# Language Reference has a great page describing the rules around [Operator Overloading](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/operator-overloading). The key thing to know is that there are a limited set of characters that are permitted: `!`, `%`, `&`, `*`, `+`, `-`, `.`, `/`, `<`, `=`, `>`, `?`, `@`, `^`, `|`, and `~`. `~` is a special character to be used when making a unary operator. In this case, I need a binary operator so I will avoid using it.

I want to create a new divide operator that will check if the divisor is `0`. If the divisor is equivalent to `0`, I want the operator to return `None`. Since I want this to be intuitive when looking at the operator I will combine the divide symbol, `/`, with the bang symbol, `!`, to make my new operator `/!`. The reason I am using the `!` symbol is because it often indicates a warning which is what I am wanting to communicate to the developer. This means my function signature needs to look like this:

```fsharp
val(/!): x:'T1 -> y:'T2 -> 'T3 option (requires member (/))
```
 My first attempt looked like the following:

```fsharp
let (/!) a b =
    match b <> 0 with
    | true -> a / b |> Some
    | false -> None
```

When I look at the function signature of my operator though I see the following:

```fsharp
val(/!): x:int -> y:int -> int option
```

This is no good. This will only work with inputs of `int` and I am wanting something that is generic. The problem is in two places. The first, and more obvious one, is that I am comparing the value of `b` with the value of `0` which is an `int`. The F# compiler is therefore restricting the input types to be `int`. I know this because I can change the value `b` is compared to and change the function signature. For example if I change `0` to `0M`, the type of `a` and `b` is restricted to `decimal`. If I change `0` to `0.`, making it a float, the type of `a` and `b` is restricted to `float`.

Fortunately, F# has a fix for this, it is called `GenericZero`. `GenericZero` is a type function which returns the `0` equivalent for any numeric type or type with a static member called `Zero`. It is contained in the F# Language Primitives, `Microsoft.FSharp.Core.LanguagePrimitives`. More information can be found in the [language reference entry on GenericZero](https://msdn.microsoft.com/visualfsharpdocs/conceptual/languageprimitives.genericzero%5b%5et%5d-type-function-%5bfsharp%5d).

The other problem with this function is that it needs to be an `inline` function. The `inline` keyword in F# tells the compiler to figure out the types for the function at the place of usage instead of restricting the types. Here is a simple example of an `add` function without the `inline` keyword.

```fsharp
// non-inlined function
let add a b =
    a + b
// val add : a:int -> b:int -> int
```

You would think that the `add` function would be generic but the F# compiler will restrict this to `int` because that is the best match it can deduce from the context. Now, if we use the `add` function with `float` values it will change the function signature but it will still be restricted to only a single type. Here I show using the `add` function with `float` values before trying to use it with `int` values. F# updates the function signature to using `float` but now throws an error when we try to use `int` values.

```fsharp
// non-inlined function
let add a b =
    a + b
// val add : a:float -> b:float -> float

let r = add 1. 2. // r : float
let r2 = add 1 2 // compiler error
```

The `inline` keyword can be added the beginning of the function to have the compiler deduce the types at the point the function is used.

```fsharp
let inline add a b =
    a + b
// val add : a:'a -> b:'b -> 'c (requires member(+))

let r = add 1. 2. // r : float
let r2 = add 1 2  // r2 : int
```

We now have all of the ingredients we need to update our new operator `/!` so that it will work with generic types.

```fsharp
open Microsoft.FSharp.Core.LanguagePrimitives

let inline (/!) a b =
    match b <> GenericZero with
    | true -> a / b |> Some
    | false -> None
// val (/!) : a:'a -> b:'b -> 'c option (requires member (/) and member get_Zero and equality)
```

This is exactly what we were looking for in the beginning. Now when we use our new operator we are forced to deal with a situation where divisor is possibly `0`. Now, this solution for dealing with a possible `0` divisor may not be for everyone. Perhaps having to deal with the `None` scenario is too cumbersome for you. I find that I like have this additional safety in place because it forces me to write more robust code.