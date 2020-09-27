---
title: Counting the unique values in Sheets rows with comma-separated items
tags:
  - spreadsheets
  - google sheets
  -
categories: tech
excerpt: In a Google Sheet, count the number of times a term appears in rows where one column has a comma-separated list
---

Recently, I had to solve this little (Google) sheets conundrum: if you have rows where one column is a free-text string where multiple terms can be present, in a comma-separated way, how do you get to count all unique values overall?

As an example, suppose you have this sheet:

| User        | Likes           |
| ----------- |:-------------:|
| Martina     | burgers, pizzas, stuffed aubergines |
| Bob         | salads, nuts, apples, pizzas      |  
| Alice       | halloumi, beans, stuffed aubergines    |  

namely you have the list of likes each person has, and they appear comma-separated. You want to count the number of unique times each time figures - in this case I share my love of pizza with Bob and my taste for stuffed aubergines with Alice, so these two items are to have a count of 2, everything else has a 1. How do you do this in Sheets? Let's not talk about the fact that both Bob and Alice appear healthier than me here.

Obviously in raw code (SQL/Python) it'd be an immediate calculation, but in sheets you'd have to create some little machinery (unless I'm wrong and there is an immediate way, which I didn't find). In our case (this was a work scenario, and it had to be done in sheet for the use of the team who was using it) the rows for each user came from a form they filled with values and you'd expect that they'd use a comma to distinguish different items if they were expressing more than one preference (like). We used Google Sheets but I guess the logic is the same or easily adaptable with minimal edits to other spreadsheets tools.

I figured I'd first explode the list in each row by separating (in a separate tab of the same sheet) each item by working on the commas. You'd use a `SPLIT` function for this:

```
=SPLIT('Preferences'!B2:B1000, ",")
```

("Preferences" is the main tab, the one where the form responses are registered, and B is the column of interest). This will literally create a column for each of the items in the list of a row. After this, you'd want to append each of these new columns to create one single column with all values concatenated. Basically here I'm trying to translate what I'd do in code into the Sheets machinery. The problem is that obviously not every user would have specified the same number or items, so in the explosion we've done just before not each column has the same number of elements (some are empty). You need to use a `FILTER` to take care of this, and then apply the said concatenation:

```
={filter('exploded choices'!A:A, len('exploded choices'!A:A)); filter('exploded choices'!B:B, len('exploded choices'!B:B)); filter('exploded choices'!C:C, len('exploded choices'!C:C)); filter('exploded choices'!D:D, len('exploded choices'!D:D)); filter('exploded choices'!E:E, len('exploded choices'!E:E)); filter('exploded choices'!F:F, len('exploded choices'!F:F)); filter('exploded choices'!G:G, len('exploded choices'!G:G))}
```

(this is long but it's because in my case the maximum explosion of a row was yielding 7 values, hence I got 7 columns at the end (A-G)).

Voilà, you're done - you can just apply a count of the unique values onto your new concatenated column. I love SQL all in all so I really don't mind working with queries in Sheets, sometimes it's a bit annoying that seemingly easy things may require heavy workarounds but this one was a fun detour and I've learned something.

## Refs
* The [`FILTER`](https://support.google.com/docs/answer/3093197?hl=en-GB) function in Sheets
* This SE useful [Q&A](https://webapps.stackexchange.com/questions/90629/concatenate-several-columns-into-one-in-google-sheets) on the concatenation part
