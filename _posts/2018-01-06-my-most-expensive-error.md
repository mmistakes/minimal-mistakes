---
published: false
---
The title for this may be a little over the top but it is not that far from the truth. I am wanting to show how Units of Measure in F# can protect against some of the most insidious types of errors.

Up to this point one of the most difficult parts of putting together algorithms has been making sure that the Units of Measure for the numbers that I am using match. For example, you shuold not be able to add lbs and cm, it doesn't make sense. In most programming languages though, a number is just a number. You may be working with a strict language which requires to convert from `int` to `float` before multiplying, but many will do this implicility.

When I am writing in R, Python, or C# I don't have any kind of Units of Measure checking for the numbers that I am working with. This has led to a lot of frustrating debugging in the past where I missed some simple multiplication or division in my code. These types of bugs can be really nefarious because you can often get numbers which seem sensible at first but then blow up when outlier data is introducec.

## The Initial Error
I was tasked with writing a simpel fee calculation for our products on Amazon. We wanted to be able to calcualte the impact of the new fees to the cost of our products before the new fees went into effect. This is such a simple thing. On my first pass I decided to just throw something together in Python. When I did this, I made a very expensive mistake. Can you see it?

```python
def calculate_item_fba_fee(cost_config, item):
    weight_tiers = cost_config[item['item_size']]['WeightTiers']
    weight_tier = [tier for tier in weight_tiers if
                   (tier['MinWeight'] < item['item_weight']) & (tier['MaxWeight'] >= item['item_weight'])][0]
    fee = weight_tier['BaseFee'] + max(0.0, item['item_weight'] - weight_tier['weight_fee_lb_cutoff'])
    return fee
```

This is a simple function which is taking a `Dictionary`, `cost_config`, which holds some configuartion values and a row of a Pandas `DataFrame`, `item`. The first line of the function looks up the weight tiers which may apply to the item. It then searches through the tiers to find the `weight_tier` which matches the weight of the `item`. It then calculates the fee, which is where the error is.

The `fee` value is composed of a `base_fee` and a $ per pound fee, if the weight is above the `weight_fee_lb_cutoff` value. In this case the `weight_fee_lb_cutoff` value is 2.0 lbs. So, for every pound over 2.0, the item is charged an additional fee per lb.

You may see the error now, I never multiply the overage weight by the $/lb fee rate. If you look at the units of the fee calculation I am adding the `base_fee`, which is in USD (US Dollars), to `lbs`. That does not make any sense. You can't add different types of units, but most languages will let you do this all day. This was insidious because for most of our items, the fee was right. Only in cases where the item was over 2.0 lbs did we get a wrong fee.

I'll be honest, I didn't actually catch this bug. I put this code in production but I never felt really good about it. I couldn't explain it but there was disquite in my soul. I was already starting to rewrite parts of our system in F# so I decided that I would rewrite this little piece while it was fresh in my head.

## 