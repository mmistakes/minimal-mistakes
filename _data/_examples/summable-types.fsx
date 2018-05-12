type Cost = Cost of decimal with
    static member (+) (Cost c1, Cost c2) =
        Cost (c1 + c2)

    static member Zero =
        Cost 0.0M

module Cost =
    let create c =
        if c <= 0M then
            None
        else
            Some(Cost c)

let cost1 = Cost 10.0M
let cost2 = Cost 5.0M

let totalCost = cost1 + cost2

let sumCosts = 
    [cost1; cost2]
    |> List.sum
