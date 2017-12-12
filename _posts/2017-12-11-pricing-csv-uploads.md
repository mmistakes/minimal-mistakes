---
title: "Pricing CSV Uploads"
date: 2017-12-11
---

If you prefer to upload CSV files instead of using our API for pricing we now support it.

To upload your pricing, please upload a CSV with the following format:

Price List Code, Price List Name, Currency Description, Conversion Rate, Markup, Sku, Base Price, Markup, Markup Type

ie. 12345,Price List,USD,1.2,120,54321,9.99,5,fixed

Price List Code: A unique code for the price list.
Price List Name: A descriptive name for the price list.
Currency: The currency of the shop(s) you want to sync with.
Conversion Rate: The conversion rate to apply (ie. 1.2)
Markup: The percentage markup (ie. 200% = prices x 2)
Sku: A variant-specific SKU
Base Price: The base price for that SKU
Markup: A markup, in percent (ie. 120) or dollars (ie. 5)
Markup Type: Specify if markup is percent or dollars

Do not include headers in your CSV file. If the upload fails, double check the format.

If you need any help loading in price lists, email [support@convictional.com](mailto:support@convictional.com)
