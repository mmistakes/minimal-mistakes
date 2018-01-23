---
title: "Partner CSV Uploads"
date: 2017-12-11
---

To import partners via CSV, please use the following format:

code,shop name,email,price list,invited status, active status, relationship

ie. 12345,My Trading Partner,partner@domain.com,My Price List,true,true,child

#### Elements
* Code: is a unique code for this customer
* Shop name: is the shop name from their myshopify.com URL
* Email: is the email to invite to trade with you
* Price list: name is the name of the price list they are assigned
* Invited status: is true if they have been invited, false if not
* Active status: is true if you want to sync, false if not
* Relationship: 'child', 'self' or 'parent'

#### Requirements
* Do not include headers in your CSV file.
* If the upload fails, double check the format.
* The code is the only mandatory field.
* Leave empty spaces for optional fields (ie. ",,,")

For support email [support@convictional.com](mailto:support@convictional.com)
