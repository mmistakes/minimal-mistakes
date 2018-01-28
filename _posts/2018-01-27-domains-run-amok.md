---
published: true
---
I am a huge fan of Domain Driven Design and I have been trying to apply it more and more. I ran into a problem last week that kept beating me over the head though. I kept using a bottom up approach and kept coming up with terrible solutions. Finally, I took a more outside to in approach which cleaned up the solution. I credit [Mark Seaman](http://blog.ploeh.dk/) for the idea to work from the outside in. I am wanting to show some of the difficulties you can run into using a bottom up approach so that others don't make the same mistakes that I did. Hopefully this little exercise helps provide others some guidance on how to get unstuck when attempting Domain Driven Design.

## Our Refactoring Problem

I have a project where we are rebuilding how we calculate the replenishment logic for our Supply Chain. Replenishment is the process of ordering product from Vendors for your Warehouses so that we can fill customer orders. I work for an e-commerce company so Replenishment is at the heart of what we do.

The current solution is a monolith application which is all fed from an Azure SQL instance. It is comprised of a large set of batch process that run in order and populate tables in the database. This mess was inherited from an old system and has been warped beyond comprehension at this point. It is so fragile we don't dare touch it. The plan is to decompose the monolith into separate services which communicate via messages. To do this though, we need to create those separate services. At the heart of one of those services is the analysis of Time Series data. This is my attempt to create a tiny little domain for modeling this analysis and the mistakes I made along the way.

## Modeling TimeSeries Take 1: From the Bottom Up

All of our Replenishment logic is built on analyzing Time Series data. This data can be thought of as a array of tuples where one value is the timestamp and the other is the observed value, `DateTimeOffset * 'a`.

What I set out to do is create a domain model that allows us to analyze these Time Series in a robust and performant way. My initial thought was, "I know that my data will always be `Decimal` or `String` so I can think of an `ObservedValue` in my Time Series as a Discriminated Union and an `Observation` is a record with a `DateTimeOffset` and an `ObservedValue`. A `TimeSeries` is just an array of the type `Observation`. When I am done with an analysis the result will be either `decimal` or `string` so I'll define an `AnalysisResult` type to contain the result."

```fsharp
type ObservedValue =
    | Decimal of decimal
    | String of string

type Observation = {
    DateTime : DateTimeOffset
    Value : ObservedValue
}

type TimeSeries = array<Observation>

type AnalysisResult =
    | Decimal of decimal
    | String of string
```

This doesn't seem bad so far. Now I need to add some basic functions for analyzing my `TimeSeries`. Some simple and obvious ones are `mean`, `first`, and `last`. There are actually many functions I will need but these will suffice to make my point. I now try to write these simple functions for my `TimeSeries` type.

```fsharp
module TimeSeries =
    let first (ts : TimeSeries) =
        ts.[0].Value

    let last (ts : TimeSeries) =
        ts.[-1].Value

    let mean (ts : TimeSeries) =
        ts
        |> Array.averageBy (fun x -> x.Value) // Error: The type ObservedValue does not support the operator '+'
```

I have encountered my first problem with this approach. I want to be able to take the `mean` of my `TimeSeries` but the `ObservedValue` type does not support the `+` operator. I think, "No problem, I'll just add the `+` operator." I then look at the type again and realize I may be doing something wrong. Adding a `decimal` to a `decimal` makes sense and I also understand adding `string` to `string` but this is going to require me to have a `+` defined for `decimal` to `string` and `string` to `decimal`. That does not make any sense.

## Modeling TimeSeries Take 2: Homogenous Values

My problem is that I am allowing a single `TimeSeries` to be heterogenous, containing both `decimal` and `string` values. Really a single `TimeSeries` needs to be homogeneous, containing only `decimal` or only `string`. Okay, no problem! I'll reformulate the domain to have the `TimeSeries` be a Discriminated Union instead of the `ObservedValue`.

```fsharp
open System

type Observation<'a> = {
    DateTime : DateTimeOffset
    Value : 'a
}

type TimeSeries =
    | Decimal of array<Observation<decimal>>
    | String of array<Observation<string>>

type AnalysisResult =
    | Decimal of decimal
    | String of string
```

Now let's try to implement our analysis functions again. Don't judge me for what you see next. Once I wrote it, I felt a little ill. I'll go into why after the code.

```fsharp
module TimeSeries =
    let private map df sf ts =
        match ts with
        | TimeSeries.Decimal t -> df t
        | TimeSeries.String t -> sf t

    let first (ts : TimeSeries) =
        let f = fun (t : Observation<'a> []) -> t.[0].Value
        map (f >> AnalysisResult.Decimal) (f >> AnalysisResult.String) ts

    let last (ts : TimeSeries) =
        let f = fun (t : Observation<'a> []) -> t.[-1].Value
        map (f >> AnalysisResult.Decimal) (f >> AnalysisResult.String) ts

    let mean (ts : TimeSeries) =
        let df =
            fun (t : Observation<decimal> []) ->
                t |> Array.averageBy (fun x -> x.Value) |> AnalysisResult.Decimal
        let sf =
            fun (t : Observation<string> []) -> "" |> AnalysisResult.String
        map df sf ts
```

I will readily admit this is clunky. Let me explain the thought process. I know that the `TimeSeries` type is a Discriminated Union and therefore I should have a `map` like function for easily applying the correct function, depending on which value `TimeSeries` takes on. In many cases I would use the exact same logic (Ex: `first` and `last`) so I just defined a generic function and used that for both arguments of the `map` function. 

When I get to the `mean` function I run into another problem. It does not make sense to take the `mean` of a set of `string` observations but the code allows it. In this code I am returning an empty `string` but that is not in line with the heart of what I am going for. If something does not make sense, I don't want to allow it. I want invalid states to be unrepresentable in the code. I don't want myself or someone else to even be able to call `mean` with a `TimeSeries` containing `string` values.

It's at this point I start to feel really dumb. How can this be so hard? Here is what I am wanting to accomplish:

* Model a TimeSeries made up of either `decimal` or `string`
* Reuse function logic wherever I can (DRY principle)
* Prevent unrepresentable states

## Modeling TimeSeries Take 3: Generic TimeSeries

I would rather not admit how long I was stumped at this point. It felt like I was missing something glaringly obvious. I mulled on this problem for awhile until the next thought came to me, "What is really going on is that I have two special cases of `TimeSeries<'a>` here. I have a `TimeSeries<decimal>` and a `TimeSeries<string>`. Why not have a full set of functions for `TimeSeries<'a>` and then have two different types for the `TimeSeries<decimal>` case and the `TimeSeries<string>` case which only have a subset of the functions available?" Here is what I came up with.

```fsharp
open System

type Observation<'a> = {
    DateTime : DateTimeOffset
    Value : 'a
}

type TimeSeries<'a> = array<Observation<'a>>

type DecimalSeries = TimeSeries<decimal>

type StringSeries = TimeSeries<string>

type AnalysisResult =
    | Decimal of decimal
    | String of string

module TimeSeries =
    let first (ts : TimeSeries<'a>) =
        ts.[0].Value

    let last (ts : TimeSeries<'a>) =
        ts.[-1].Value

    let inline mean (ts : TimeSeries<'a>) =
        ts |> Array.averageBy (fun x -> x.Value)

module DecimalSeries =
    open TimeSeries

    let first (ds : DecimalSeries) =
        first ds |> AnalysisResult.Decimal

    let last (ds : DecimalSeries) =
        last ds |> AnalysisResult.Decimal

    let mean (ds : DecimalSeries) =
        mean ds |> AnalysisResult.Decimal

module StringSeries =
    open TimeSeries

    let first (ds : StringSeries) =
        first ds |> AnalysisResult.String

    let last (ds : StringSeries) =
        last ds |> AnalysisResult.String
```

One thing to note, I had to add the keyword `inline` to the `mean` function in the `TimeSeries` module. This makes the compiler figure out the types at the point the function is used. Now I am still not really proud of this code yet but it is accomplishing most of my goals. I am getting code reuse while being able to control which functions can be used by which type of `TimeSeries`. Now, if I only define `create` functions for the `DecimalSeries` and `StringSeries` types, it should not be possible to call a `TimeSeries` function with an invalid `TimeSeries` sub-type.

## Conclusion

I hope my failures prove useful and an encouragement to others wandering through the process of learning Domain Driven Design. This was just one small problem that made me feel rather silly as I wrestled with it. Maybe I will come up with a more elegant solution but as of now, I like the code reuse and guarantees this is providing me. If you have a better solution, please message me on Twitter (@McCrews). When you get stuck coding, remember most of progress feels like wandering down dark halls until you come to the light. Keep calm and curry on!