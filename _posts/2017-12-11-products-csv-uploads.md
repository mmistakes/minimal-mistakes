---
title: "Products CSV Uploads"
date: 2018-01-31
toc: true
---
## Introduction
To import products via CSV, please use the following format:

code,status,product title,vendor,type,tags,sku,variant title,inventory quantity,price

ie. 12345,true,A Great Product,Vendor,Beauty,"Tags, Tags, Tags",54321,A Great Variant,4,9.99

## Elements
* Code (required): is your unique code for this product
* Status: is true if you want to sync with customers
* Title: is a short description of your product
* Vendor: is your brand or the product brand
* Type: the product type (ie. clothing, beauty)
* Tags: tags for the product (ie. Toronto)
* SKU: is the unique SKU for this variant
* Title: is a description of this variant
* Inventory: is the current stock level
* Price: is the base price for this variant

## Requirements
* Do not include headers in your CSV file.
* If the upload fails, double check the format.
* Leave empty spaces for optional fields (ie. ",,,")
