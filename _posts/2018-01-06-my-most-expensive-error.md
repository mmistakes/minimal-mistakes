---
published: false
---
The title for this may be a little over the top but it is not that far from the truth. I am wanting to show how Units of Measure in F# can protect against some of the most insidious types of errors.

Up to this point one of the most difficult parts of putting together algorithms has been making sure that the Units of Measure for the numbers that I am using match. For example, you shuold not be able to add lbs and cm, it doesn't make sense. In most programming languages though, a number is just a number. You may be working with a strict language which requires to convert from `int` to `float` before multiplying, but many will do this implicility.

When I am writing in R, Python, or C# I don't have any kind of Units of Measure checking for the numbers that I am working with. This has led to a lot of frustrating debugging in the past where I missed some simple multiplication or division in my code. These types of bugs can be really nefarious because you can often get numbers which seem sensible at first but then blow up when outlier data is introducec.

I was tasked with writing a simpel fee calculation for our products on Amazon. We wanted to be able to calcualte the impact of the new fees to the cost of our products before the new fees went into effect. This is such a simple thing. On my first pass I decided to just throw something together in Python. When I did this, I made a very expensive mistake. Can you see it?

'''
def calculate_item_fba_fee(cost_config, item):
    weight_tiers = cost_config[item['item_size']]['WeightTiers']
    weight_tier = [tier for tier in weight_tiers if
                   (tier['MinWeight'] < item['item_weight']) & (tier['MaxWeight'] >= item['item_weight'])][0]
    fee = weight_tier['BaseFee'] + max(0.0, item['item_weight'] - weight_tier['PerLbFeeWeightStart'])
    return fee
'''