# How I got a 20% discount for changing one variable

To begin with: _I hate shopping online with my phone._
And for various reasons: No adblock, FOV way too small, it is slower, too less information, no possiblity to compare.
I am a keyboard type of guy.

One morning I woke up and had a hurting foot. 
Out of nowhere. Overnight. Evening good. Morning bad. Really bad.
We went to the ER because it felt broken. 
Long story short: X-ray without any anomalies, and after walking on crutches for a few days the pain went away.

My girlfriend (she hates to see me suffer) pointed out, it _maybe_ was my fault for only wearing wornout shoes (which is maybe 50% true).
To be fair, when it comes to my footware, I am quite pragmatic.
All the shoes I wear are all the shoes I need.
The shoes I have are one of three kinds:

- Business shoes (which I do not need currently, because of COVID)
- Casual white sneaker
- Running/hiking/sport shoes (maybe one pair each)

But I accepted, that it was _maybe_ time for a new pair of shoes that would give a better distribution of pressure on my foot.

## The shoe

It was again my girlfriend who pointed me to the [ON Running The Roger Advantage](https://www.on-running.com/de-de/products/theroger-advantage).
I really liked the style right from the beginning.

<figure>
    <img alt="The Roger Advantage" src="https://images.ctfassets.net/hnk2vsx53n6l/3KGDI3hdsttpQtE08cKDbU/0d7411ba398fdd5ae73ba4e7c8348c1e/mcyx8kegovwkuizpw33p.png?w=1400&h=1400&fm=webp&f=center&fit=fill&q=80">
    <figcaption><i>What a beauty</i></figcaption>
</figure>

Eventhough I do not like shopping on mobile, I like to lay on my couch, with my had in the lap of my beautiful girlfriend.
So it came to be, that I was in the heat of the moment checking out the ON Running store and bought the shoes.
And the experience was... in need of improvement.

## The problem

In the purchase order form (where you input your adress) the iPhone keyboard did not capitalize the first letter when you jumped into the field.
For me this was annoying, since I want to input correct data into a purchase order form.
To often my packages did not arrive for abstruse reasons.

Back at my computer I was analyzing the root of the problem and found it quite quickly.
Have a look at the source code for the purchase order form:

<figure>
    <img alt="The root of the problem" src="/assets/images/variable-1.png">
    <figcaption><i>The root of the problem: Wrong attribute!</i></figcaption>
</figure>

If you are familiar with HTML, you might see the problem. `autocapitalize='off'`.


I reached out to the support and told them about my _unpleasurable experience_ with the order process.
The Email I wrote:    
    
<figure>
    <img alt="The Email" src="/assets/images/email-1.png">
    <figcaption><i>What a beauty</i></figcaption>
</figure>

More details (and the link I shared with the support) can be found in the [FireFox Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize)

## The solution

I promptly got a response from the support, where they thanked me for my input and send me a **whopping 20% discount code*:

<figure>
    <img alt="The response" src="/assets/images/on-running-response.png">
    <figcaption><i>Thanks alot Ramon</i></figcaption>
</figure>

To be fair, I did not use it myself, but my girlfriend was more than happy to get her own pair of Rogers for 20% off.

Weird to think that such a thing can happen with a company that big (EBITDA of approx 96 million CHF [^1]


So the tl;dr of the story is, I got a 20% discount for pointing out if would be more convinient to set `autocapitalze=true` in the shipping form.


[^1] [ON Running 2021 FY Financial Report](https://s28.q4cdn.com/811960755/files/doc_financials/2021/q4/On-Annual-Report_2021_vF.pdf)
