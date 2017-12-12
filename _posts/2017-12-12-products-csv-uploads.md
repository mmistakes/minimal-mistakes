---
title: "Products CSV Uploads"
date: 2017-12-11
---

Convictional allows you to upload products from a CSV file. In order for products to upload successfully, we need the CSV in the following format:

code,status,description,vendor,variant sku,variant title,variant inventory quantity,variant price

ie. 12345,true,A Great Product,54321,A Great Variant,9,9.99

* Code is your unique code for this product
* Status is true if you want to sync with customers, false if not
* Description is a short description of your product
* Vendor is your brand or the product brand
* Variant SKU is the unique SKU for this variant
* Variant title is a description of this variant
* Variant inventory is the current stock level
* Variant price is the base price for this variant

Do not include any headers in the file, just the data formatted as described. 

If you need help importing a product catalog, email [support@convictional.com](mailto:support@convictional.com)
