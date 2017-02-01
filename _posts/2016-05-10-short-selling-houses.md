---
categories: [ finance ]
disqus_id: 20160510
excerpt: >
  An exploration of the profitability of short selling houses.
header:
  teaser: portland_home_values.png

shortsale:
  functionplot:
    data:
      -
        fn: (home_value + (mortgage - principal_per_month) * 6) - (home_value * (100 - x)/100 + home_value * realtor_commission/100 + rent * 6) + ((home_value - loan_amount) - home_value*realtor_commission/100)*(nthRoot(1+investment_apy/100, 2) - 1)
    yAxis:
      label: Profit
      domain: [-50000, 100000]
    xAxis:
      label: "% Decrease during winter"
      domain: [-5, 20]
  inputs:
    -
      label: Home Value
      name: home_value
      value: 300000
    -
      label: Mortgage
      name: mortgage
      value: 1500
    -
      label: Principal/Month
      name: principal_per_month
      value: 300
    -
      label: Realtor Commission %
      name: realtor_commission
      value: 6
    -
      label: Rent
      name: rent
      value: 1500
    -
      label: Loan Amount
      name: loan_amount
      value: 225000
    -
      label: Investment APY
      name: investment_apy
      value: 1

gallery:
  - url: http://www.trulia.com/real_estate/Portland-Oregon/market-trends/
    image_path: portland_home_values.png
    alt: portland home values 

---
Since the housing market in Portland (and my neighborhood especially) is really
hot right now I've been thinking a lot about home values and whether or not to sell.
One bit of advice I heard a few years ago that I've always been intrigued by was the
idea of selling your home in the summer, when home values are the highest, renting
for 6 months, then buying in the winter, when home values are the lowest. The idea is
somewhat similar to [short selling](https://en.wikipedia.org/wiki/Short_(finance)), 
in that profits are directly proportional to losses in the market.

To dig into this a little deeper, we need to start with some assumptions

  1. The home we buy must be of equal or greater value to the home we sell at all times.

     We'll be looking at houses in the same city which should be rising and falling
     at the same rate, and we want to make sure we're not downgrading.

  2. Rent will not be less than the mortgage payment.
  
     Landlords usually have mortgages too, and we don't want to downgrade _too_
     much during the rental period.

Looking at home values over the last few years, you can clearly see a seasonal rise and fall in home values,
higher in the summer and lower in the winter.  This gives hope that it might really
be possible to make money by delaying buying after selling.

{% include gallery caption="Portland area pricing data taken from [Trulia.com](http://www.trulia.com)" %}

We want the housing market to lose as much of its value as possible between selling and buying 6 months later.  To make any profit, home values must drop enough to cover selling costs, the increase in monthly housing costs, and the principal we would have put into our house during the rental period if we hadn't sold.

```ruby
cost_of_renting = monthly_rent * months
cost_of_owning  = (monthly_mortgage - monthly_principal_paid) * months

revenue         = sell_price + cost_of_owning
expenses        = buy_price + selling_costs + cost_of_renting

# profit        = revenue - expenses
profit          = (sell_price + monthly_mortgage*months) - (buy_price + selling_costs + monthly_rent*months - monthly_principal_paid*months)
```

{% include base_path %}

Based on my completely unscientific practice of randomly looking at different
areas in Trulia, it seems like summer time generally accounts for almost all of
the yearly growth, and the winter generally loses about 10-20% of what the
summer gained.  Since we're only concerned with losses, and since year-over-year
growth in my area last year was are around 20%, I'm going to use a `buy_price`
4% less than my `sell_price` (`20% * 20% = 4%`). To help our profits a little
more, I'll also assume `monthly_rent` and `monthly_mortgage` are equal.  Finally,
selling a house in a reasonable amount of time usually requires a realtor, and
[realtor commissions are usually about 6%](http://www.mortgagecalculator.biz/c/commissions.php), so we'll stick with that.

```ruby
sell_price             = 300_000
buy_price              = 300_000 * (1 - 0.04) # 288,000
selling_costs          = 300_000 * 0.06       # 18,000

monthly_rent           = 1_500
monthly_mortgage       = 1_500
monthly_principal_paid = 300

cost_of_renting        = 1_500*6              # 9,000
cost_of_owning         = (1_500 - 300)*6      # 7,200

profit = (300_000 + 7_200) - (288_000 + 18_000 + 9_000) # -7,800
```

That puts us $7,800 in the red for selling our hypothetical house in the summer and
buying one of equal value in the winter.  But there is still the income from selling
the house to consider.  Assuming 25% equity, that gives us $57,000 to invest elsewhere while we rent.

```ruby
selling_costs = 300_000 * 0.06         # 18,000
equity        = 300_000 * 0.25         # 75,000
revenue       = equity - selling_costs # 57,000
```

Historically the stock market as a whole [averages 10.4% per year](http://www.stockpickssystem.com/historical-rate-of-return/),
and if we could count on that return we would make $2,890.70 in 6 months, though
the portfolio required to get that rate would be almost as likely to lose
that much in the 6 months we could invest it.  The better choice would be to invest
the majority of that money in bonds, <abbr title="Certificates of Deposit">CDs</abbr>, or money markets that are much safer but
unfortunately have much lower returns (0.5-1% currently), which only gets us $284
in 6 months (not counting brokerage fees).

```ruby
future_value = present_value * (1 + rate)^time
# risky portfolio
57_000 * (1 + .104)^.5 # 59,890.70

# safer portfolio
57_000 * (1 + .01)^.5 # 57,284.29
```

So, in a perfect world where we can sell at the absolute top of the market and
buy at the absolute bottom 6 months later, and find a suitable rental between for
the same price, the total profit (not counting moving expenses, storage, taxes,
brokerage fees, closing costs, title insurance, <abbr title="Home Owner's Association">HOA</abbr> fees, or anything else I've
forgotten) is $-7,515.71.

The biggest expense cutting into our profits from this example was the realtor
fees, as you can see from the graph below, as long as the market drop is less
than the realtor fees, its almost impossible to come out ahead.  While there
are ways to save money on realtor fees such as selling yourself or using an
online listing agent, short-selling houses just doesn't seem like a practical
way to make money to me.
{% include graph.html graph=page.shortsale %}

