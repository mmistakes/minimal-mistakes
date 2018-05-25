---
published: true
layout: post
title: My Most Expensive error
date: 2018-01-06
categories: fsharp domain-driven-design
---
The title for this may be a little over the top but it is not far from the truth. I am wanting to show how Units of Measure in F# can protect against some of the most insidious types of errors, mismatched units.

One of the most difficult parts of putting together algorithms has been making sure that the Units of Measure for numbers match. For example, you should not be able to add lbs and cm, it doesn't make sense. In most programming languages though, a number is just a number. You may be working with a strict language which requires you to convert from `int` to `float` before multiplying, but many will do this implicitly.

When I am writing in R, Python, or C# I don't have any kind of Units of Measure checking. This has led to a lot of frustrating debugging in the past where I missed some simple multiplication or division in my code. These types of bugs can be really nefarious because you can often get numbers which seem sensible at first but then blow up when outlier data is introduced.

## The Initial Error
I was tasked with writing a simple fee calculation for our products on Amazon. We need to know the impact of the new fees on our costing before they go into effect. This is such a simple thing. On my first pass I decided to just throw something together in Python. When I did this, I made a very expensive mistake. Can you see it?

```python
def calculate_item_fba_fee(cost_config, item):
    weight_tiers = cost_config[item['item_size']]['WeightTiers']
    weight_tier = [tier for tier in weight_tiers if
                   (tier['MinWeight'] < item['item_weight']) & (tier['MaxWeight'] >= item['item_weight'])][0]
    fee = weight_tier['BaseFee'] + max(0.0, item['item_weight'] - weight_tier['weight_fee_lb_cutoff'])
    return fee
```

This function is taking a `Dictionary`, `cost_config`, which holds some configuration values and a row of a Pandas `DataFrame`, called `item`. The first line of the function looks up the weight tiers which may apply to the `item`. It then searches through the tiers to find the `weight_tier` which matches the weight of the `item`. It then calculates the fee, which is where the error is.

The `fee` value is composed of a `base_fee`, in US Dollars (USD), and a USD/lb fee if the weight is above the `weight_fee_lb_cutoff` value. In this case the `weight_fee_lb_cutoff` value is 2.0 lbs. So, for every lb over 2.0, the item is charged an additional fee per lb.

You may see the error now, I never multiply the overage weight by the `[USD/lb]`, (US Dollars / pound), fee rate. If you look at the units of the fee calculation I am adding the `base_fee`, which is in `[USD]`, to `[lbs]`. That does not make any sense. You can't add different types of units, but most languages will let you do this all day. This was insidious because for most of our items, the fee was right. Only in cases where the item was over 2.0 `[lbs]` did we get an incorrect fee.

I'll be honest, I didn't actually catch this bug. I put this code in production but I never felt really good about it. I couldn't explain it but there was disquiet in my soul. I was already starting to rewrite parts of our system in F# so I decided that I would rewrite this little piece while it was fresh in my mind.

## F# Units of Measure Save the Day
For the last several years I have been moving toward more and more strict programming languages. When I heard that F# allows you to put Units of Measure on your numbers, I fell in love. I have longed for such a feature. So many errors can be eliminated when dealing with numbers if you can track and enforce units alignment in numbers.

Because my soul never settled with my initial Python solution, I decided to rewrite the fee calculation. When I started I immediately declared the Units of Measure that I would need:

```fsharp
// Units of Measure Types
[<Measure>] type USD (* US Dollar *)
[<Measure>] type lb (* Imperial pound *)
```

I then wrote my fee calculation with the Units of Measure on the numbers to ensure everything matched. I then immediately saw the mistake. You will notice in this new function that I do multiply by the `feeRate`.

```fsharp
// New fee function
let calculateWeightFee (baseFee : decimal<USD>) (weightFeeCutoff : decimal<lb>) 
    (feeRate : decimal<USD/lb>) (weight : decimal<lb>) =
    baseFee + (max 0M<lb> (weight - weightFeeCutoff)) * feeRate
```

I felt pretty stupid after such an obvious mistake. Fortunately, the previous version of the code was only in production for a couple of days. Had this gone on for longer, we could have missed huge volumes of opportunity because products would have look too expensive due to the new fee.

Now granted, better unit testing would have caught this. Also, this post is not meant to disparage Python, or any other language, in any way. Rather, I am highlighting that F# is eliminating an entire class of errors for me and making me more productive. I much prefer the compiler barking at me about my units not matching than me spending hours or days hunting for where I missed a multiplication or a division. It feels great knowing that my units line up and that if I miss a small detail like this, the compiler will gently guide me back to sanity. Check out this wonderful [post by Scott Wlaschin](https://fsharpforfunandprofit.com/posts/units-of-measure/) for a more detailed discussion on what can be done with F# and Units of Measure.
