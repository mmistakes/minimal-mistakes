---
layout: single
author_profile: true
read_time: true
comments: false
share: true
related: false
permalink: diy.html
---
# DIY Builds
<img src="/media/DIY-Electronic-Project-2.png" width="80%">

There is no definitive way to build your own. Every build is unique. Environment, use case, budget, all inform the build process. For example, there is no reason to include a GPS receiver on a stationary node since the position is known and fixed.

These are not the best, the most efficient, nor most cost-effective designs...they're just early prototyes which have performed fairly well.
## Solar Base Station
<img src="/media/base_mounted.jpg" width="67%">

This unit serves as a stationary, always-on, rooftop router node for the BERN. Solar charging keeps a high capacity battery unit topped off infefinitely with enough reserve power to operate without sun for a week or more. 

 - [Waterproof Project Box](https://www.amazon.com/gp/product/B06XSQZ5M6): $10
 - [Rak Wireless Meshtastic Starter Kit](https://store.rokland.com/products/rak-wireless-wisblock-meshtastic-starter-kit): $35
 - [4dbi Fixed Mount Outdoor Antenna](https://www.amazon.com/gp/product/B09D7K986W)$40
 - [V25 6,400mAh Always On Battery](https://www.amazon.com/gp/product/B07ZS3WYZY): $44
 - [10W Solar Panel Charger, IP66 Waterproof](https://www.amazon.com/gp/product/B0CJ5C2QY5): $22
 - [Vinyl Waterproof Tape](https://www.amazon.com/gp/product/B00K5GW67O): $15
 - [U.FL IPEX to N Type Female Coaxial Cable](https://www.amazon.com/gp/product/B09N3LPBYB)(pk of 2): $8
 - [Hose Clamp Wall Mount Bracket](https://www.amazon.com/gp/product/B08YRBR5FB)(pk of 2): $16
 - [Chassis Drain Plug](https://www.mouser.com/ProductDetail/Amphenol-LTW/VENT-PS1YBK-N8001?qs=5aG0NVq1C4wAxWre7fChJA%3D%3D): $3

**Total: $181**
<img src="/media/base_hoseclamps.jpg"><img src="/media/base_board.jpg" width="67%">
<img src="/media/base_antenna.jpg"><img src="/media/base_inside.jpg" width="67%">

This can almost certainly be done more cheaply. The battery bank solves an important issue for outdoor installations, especially in cold climates. It prevents charging above or bellow dangerous thresholds. Time will tell if it can sustain itself all winter, but I'll update here once I find out!
## Handheld Client Unit
<img src="/media/handhelds_closed.jpg" width="67%">

This unit is meant to be a medium range walking-around client node. It's got decent range due to 1/4 wave 2dbi antenna, which diminishes its portability somewhat. It's single, rechargeable battery is sufficient to keep the unit on constantly for over a month between charges!
 - [Rak Wireless Meshtastic Starter Kit](https://store.rokland.com/products/rak-wireless-wisblock-meshtastic-starter-kit): $35
 - [1/4 Wave 2dbi antenna](https://www.amazon.com/gp/product/B07HZ3BSHM): $10
 - [Mini PCI to RP-SMA Pigtails](https://www.amazon.com/gp/product/B072VWKXCR)(pk of 6): $14
 - [10mm on/off switch](https://www.amazon.com/gp/product/B07MQ86LYD)(pk of 3): $12
 - [USB-C Dust Plug](https://www.amazon.com/gp/product/B0CJ9DT6QR)(pk of 6): $5
 - [Handheld Enclosure 1553BYLBK](https://www.digikey.com/en/products/detail/hammond-manufacturing/1553DYLBK/2094892): $10
 - [Enclosure Belt Clip](https://www.digikey.com/en/products/detail/hammond-manufacturing/1599CLIP/460760): $3
 - [NCR18650GA 3450mAh 10A Battery](https://store.rokland.com/products/sanyo-ncr18650ga-3450mah-10a-battery-lilygo-ttgo-meshtastic-t-beam)(pk of 2): $12
 - [18650 Battery Holder](https://www.amazon.com/DIANN-10pcs-Battery-Holder-Single/dp/B0BJV7SK5D/)(pk of 10): $6

**Total: $71**

<img src="/media/handhelds_open.jpg" width="67%"><img src="/media/handheld_solo.jpg" width="67%">

I was able to source a number of components from eBay sellers at a substantial discount. My unit-cost was ~$50, but wanted to represent a worst-case number here.

## [Let's move on to Software](/app.html)
<img src="/media/meshtastic-logo.png">