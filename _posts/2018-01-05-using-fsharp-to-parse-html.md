---
published: false
---
At work I have been tasked with extracting the product description information for several of our products to be used as an import for an external system. Normally I would just write a query for the database to get all of this information but in this case I do not have access to the database directly. Even if I did have it, I am not familiar with the schema so I would rather not have to spend the effort digging into if I do not have to. I have been putting off this project since it was not high priority but recently I came across an excellent talk by [Evelina Gabasova at NDC Oslo](https://www.youtube.com/watch?v=K_AlkvZsUus&t=1219s) where she showed the use of TypeProviders to connect to IMDB to extract data on cast members of Star Wars. As I watched this I had a eureka moment, "Why not just use F# to pull the data directly from the website instead of dealing with the SQL Schema?"

# Initial Attempt with HtmlProvider

Now, this may seem a little silly but for my case it has some advantages. I do not have to bother with getting permissions for the database running the company e-commerce website and it allows me to use some F#. I quickly fire up a new F# project in VS Code and stub out the following:

```fsharp
#I "./packages"
#r "FSharp.Data/lib/net40/FSharp.Data.dll"
open FSharp.Data

type Product = HtmlProvider<"https://www.b-glowing.com/skincare/cleansers/paulas-choice-calm-redness-relief-cleanser-for-oily-skin/">

let test = Product.GetSample()
```

This is when I run into a problem. In the talk that [Evelina Gabasova](http://evelinag.com/) gave the data on IMDB was in a nice table. This meant that the TypeProvider could detect it automatically and provide it as a nice property of the `test` object in the above example. My problem is that the data I need is in the Description area of the page, specifically the `<span>` with the attribute `itemprop="description"`. I am trying to turn this information:

```
<span itemprop="description">
	<p>
		<strong>WHAT IT IS&nbsp;</strong>
		<br>
		A lightweight silky gel cleanser for Normal to Oily skin types that gently removes makeup and soothes red, sensitive skin.
	</p>
	<p>
		<strong>BENEFITS FOR YOU</strong>
		<br>• Safe for even the most sensitive skin.
		<br>• Removes excess oil and makeup.
		<br>• Soothes and refreshes senstive, irritated&nbsp;skin.
	</p>
	<p>
		<strong>YOU’LL EXPERIENCE</strong>
		<br>This lightweight gel texture lathers beautifully to remove excess oils, impurities and makeup. Skin is left calm, clean and soft.
	</p>
	<p>
		<strong>WHY IT’S GLOWING</strong>
		<br>
		The calming cleanser works wonders for those of us who&nbsp;experience sensitivity and redness without drying or stripping skin. The formula increases our skins natural barrier so overtime skin is less sensitive and red on its own.&nbsp;
	</p>
</span>
```

into something like this:

| Tag | Text |
|-----|------|
|WHAT IT IS|A lightweight silky gel cleanser for Normal to Oily skin types that gently removes makeup and soothes red, sensitive skin.|
|BENEFITS FOR YOU|Safe for even the most sensitive skin. Removes excess oil and makeup. Soothes and refreshes senstive, irritated skin.|

This means that I need a different approach. Thankfully, F# delivered.

# Using HTML Parser
If the `HtmlProvider` does not give you what you need for HTML parsing then `FSharp.Data` also has a handy [HTML Parser](http://fsharp.github.io/FSharp.Data/library/HtmlParser.html) which includes some excellent documentation and examples. I put together a new script to extract the data from the website.

```
#I "./packages"
#r "FSharp.Data/lib/net40/FSharp.Data.dll"
open FSharp.Data

let productHtml = HtmlDocument.Load("https://www.b-glowing.com/skincare/cleansers/paulas-choice-calm-redness-relief-cleanser-for-oily-skin/")

let getDescription (html:HtmlDocument) = 
    html.Descendants ["span"]
    |> Seq.filter (fun x ->
        match x.TryGetAttribute("itemprop") with
        | None -> false
        | Some att ->
            match att.Value() with
            | "description" -> true
            | _ -> false
    )
    |> Seq.exactlyOne
    |> (fun x -> 
        x.Descendants ["p"]
        |> Seq.map (fun t -> 
            let tag = 
                t.Descendants ["strong"] 
                |> Seq.exactlyOne 
                |> (fun b -> b.InnerText())
            let text = t.InnerText().[(tag.Length)..(t.InnerText().Length - 1)]
            tag, text
        )
    )

let productDescription = getDescription productHtml
```

Lines 1 through 5 are just getting the HTML for the product listing. The `getDescription` function is what actually breaks down the HTML to return a tuple with the information that I am interested in. What I like most about this is that I did not have to use `XPath` or some other `XML` querying tool. While `XPath` may be powerful, I find I I have difficulty achieving what I really want. I find the F# approach shown here much more straightforward.

In line 8 the function is extracting every node in the HTML which is a `span`. This will obviously return spans that we are not interested in which is why we need to filter the result using `Seq.filter`. Since I know that the span I am interested in has the attribute `itemprop="description"`, I use a function to return `false` when that attribute is not present and `true` when it is present. Line 10 highlights one of my favorite features of F# which is the returning of an `Option` type. The function `TryGetAttribute` will either succesfully return the attribute which is a type of `Some 'T` or it returns `None`. In the case of `None` I simply have the function return `false`. If the attribute does exist I then test if it is equal to "description" on line 14. If it does match, the function returns `true`. In all other cases the function returns `false`.

Since I know how the HTML is rendered on these pages, I know that there will only ever be one of these `<span>` elements in the HTML so I use the function `Seq.exactlyOne` to select a single element from the sequence. Line 18 to 27 is where I actually pull out the information that I want. I have an odd problem in that the text in the `<strong>` element is what I want the tag name to be for the output table and the rest of the text in the parent `<p>` element is to be the text data. To do this I first extract the text in the `<strong>` element on lines 21 through 24. I then extract all of the text from the parent `<p>` element, which includes the `<strong>` text, and then select a substring which excludes the `<strong>` text on line 22. I then return a tuple of the tag name and the associated text.

While I am sure this is not the most elegant way to go about this, it was incredibly simple compared to some previous efforts I have had trying to get `XPath` to work on other projects. I find the F# syntax and approach much more straightforward and easier to understand. Is there a better way for me to have done this? Could the code be more idiomatic? All comments and suggestions are appreciated.
