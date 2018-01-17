---
title: "Pricing CSV Uploads"
date: 2017-12-11
---

Updated: 2018-01-17

If you prefer to upload CSV files instead of using our API for pricing we now support it.

To upload your pricing, please upload a CSV with the following format:

Price List Code, Price List Name, Currency Description, Conversion Rate, List Markup, Rounding, Sku, Base Price, Markup, Markup Type

ie. 12345,Price List,USD,1.2,120,99,54321,9.99,5,fixed

* Price List Code: A unique code for the price list.
* Price List Name: A descriptive name for the price list.
* Currency: The currency of the shop(s) you want to sync with.
* Conversion Rate: The conversion rate to apply (ie. 1.2)
* List Markup: The percentage markup (ie. 200% = prices x 2)
* Rounding: The last two digits you want prices to round up to (ie. 99 = $1.99)
* Sku: A variant-specific SKU
* Base Price: The base price for that SKU
* Markup: A markup, in percent (ie. 120) or dollars (ie. 5)
* Markup Type: Specify if markup is percent or dollars

Some final tips:
* Do not include headers in your CSV file. 
* Only upload one price list (ie. code) per file.
* If the upload fails, double check the format.

For support email [support@convictional.com](mailto:support@convictional.com)
