---
title: "Electrical part"
related: true
header:
  overlay_image: /assets/images/anthony-rossbach-59486.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/anthony-rossbach-59486.jpg
categories:
  - Automation
tags:
  - Electrical
  - Electronic
  - Linux
  - Raspberry
  - Python
  - Software
  
---

The aim of this tutorial is to wire the electrical part of a sprinkler system. At the end of this tutorial,
We have able to control the sprinkler system from a Raspberry PI.

- [Electrical part](#electrical-part)
  - [Prerequisites](#rerequisites)
  - [Overview](#overview)
  - [Components](#components)
  - [Wiring](#wiring)
- [Electronic part](#electronic-part)
  - [Prerequisites](#rerequisites)
  - [Overview](#overview)
  - [Components](#components)
  - [Wiring](#wiring)
- [Software part](#software-part)
  - [Prerequisites](#rerequisites)
  - [Overview](#overview)
  - [Program](#program)
  - [Test](#test)


## Electrical part

### Prerequisites

### Overview

{% include figure image_path="/assets/images/sprinkler/valve_boxes_final.jpg" alt="Valves box final" caption="Valves 
box final" %}

### Components

| Component      | Description    | Quantity      | Site     | Price  |
| ------------- |:-------------:| -----:|
| ![borne_auto_levier_2](/assets/images/sprinkler/borne_auto_levier_2_file_2.5mm.jpg){:height="48px" width="96px"}  |  |  Quantity | Site | 0 EUR |
| ![borne_auto_levier_3](/assets/images/sprinkler/borne_auto_levier_3_file_2.5mm.jpg){:height="48px" width="96px"}  |  |  Quantity | Site | 0 EUR |
| ![borne_auto_levier_5](/assets/images/sprinkler/borne_auto_levier_5_file_2.5mm.jpg){:height="48px" width="96px"}  |  |  Quantity | Site | 0 EUR |
| ![boite_étanche_IP54_80x80x45](/assets/images/sprinkler/boite_étanche_IP54_80x80x45.jpg){:height="48px" width="96px"}  | Distribution box |  Quantity | Site | 0 EUR |
| ![boite_étanche_IP54_D70xP40](/assets/images/sprinkler/boite_étanche_IP54_D70xP40.jpg){:height="48px" width="96px"}| Distribution box Compact Splicing Connectors |  Quantity | Site | 0 EUR |
| ![barrette_12_dominos_2.5mm](/assets/images/sprinkler/barrette_12_dominos_2.5mm_Legrand.jpg){:height="48px" width="96px"}  | Domino bar |  Quantity | Site | 0 EUR |
| ![multi_conducteur_7_brins](/assets/images/sprinkler/multi_conducteur_7_brins_cable_15m.jpg){:height="48px" width="96px"}  | multi conducteur 7 brins cable 15m | 1 | [Technic-achat](https://www.technic-achat.fr) | 31.32 EUR |
| ![transformer](/assets/images/sprinkler/transformer_220_24.jpg){:height="48px" width="96px"}  | Transformer 220V AC/24V AC |  Quantity | Site | 0 EUR |

### Wiring

#### Electrical connection

- Join electrical box to valves boxes with 7 multi-conductor wire
- Install one distribution box at the entrance of the valves box.
- Connect power supply to solenoid valve 24V.


**Tools**: Electrical screwdriver, wire cutter, wire stripper.
{: .notice--info}

{% include figure image_path="/assets/images/sprinkler/sprinkler_electric_part.png" alt="Sprinkler electric part" caption="Sprinkler electric part" %}

#### Relay connection (Power electronics)


Display
 
**Tools**: Display, electrical box.
 
 
#### Set up electrical box
 
 - Replace power outlet by circuit breaker.
 
**Tools**: circuit breaker Din rail


## Electronic part

### Prerequisites

 - [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
 - [Install Python]({{ site.url }}{{ site.baseurl }}/linux/install-python)
 
### Overview 

{% include figure image_path="/assets/images/sprinkler/electronic_part.jpg" alt="Electronic part" caption="Electronic part" %}

### Components

| Component      | Description    | Quantity      | Site     | Price  |
| ------------- |:-------------:| -----:|
| ![relay_card_raspberry](/assets/images/sprinkler/relay_card_raspberry.jpg){:height="48px" width="96px"}  | Relay AC 250V 10A ; DC 30V 10A Relay card module AC/DC 5V  4 channels | 1 | [Ebay](https://www.ebay.com) | 8.00 EUR |
| ![cable_MM_MF_FF](/assets/images/sprinkler/cable_MM_MF_FF.jpg){:height="48px" width="96px"}  | 10 x Cables male/female female/female male/male |  30 | [ebay](www.ebay.com)      |   1.00 EUR |
| ![raspberry_pi_3](/assets/images/sprinkler/raspberry_pi_3.jpg){:height="48px" width="96px"}   | Raspberry PI 3 | 1 | [Farnell](https://www.farnell.com)  | 37.69 EUR |
| ![power_supply_micro_USB_5V_2500mA](/assets/images/sprinkler/power_supply_micro_USB_5V_2500mA.jpg){:height="48px" width="96px"}   | Power supply Micro USB 5V 2500mA | 1  | [Amazon](https://www.amazon.com) | 8.99 EUR |
| ![micro_sd_16go_class_10](/assets/images/sprinkler/micro_sd_16go_class_10.jpg){:height="48px" width="96px"}  | Micro SD Card 16go class 10 | 1 | [amazon](www.amazon.com)  | 0 EUR |
| ![breadboard_raspberry](/assets/images/sprinkler/breadboard_raspberry.jpg){:height="48px" width="96px"}  | Bread board  |  1 | [ebay](www.ebay.com)  | 0 EUR |
 
### Wiring

{% include figure image_path="/assets/images/schema_sprinkler.png" alt="Sprinkler Overview" caption="Sprinkler Overview" %}

**Note**:Connect relay with Raspberry PI (Control electronics).
Each relay are supplied in 3.3V via Raspberry PI.
{: .notice--info}

## Software part
 
### Prerequisites

 - [Install Git]({{ site.url }}{{ site.baseurl }}/linux/install-git)
 - [ssh](https://support.suso.com/supki/SSH_Tutorial_for_Linux)
 
### Overview 

TODO plantuml

### Program

Get clone from github

```bash
git clone https://github.com/jluccisano/raspberry-scripts.git
```

Follow install step describe in the README.md.


### Test

Get state of each valve
 
 ```python
 python relay_control.py get
 ```
 
 Get state of specific valve
 
 ```python
 python relay_control.py get --relay 1
 ```
 
 Set state of specific valve
 
 ```python
 python relay_control.py set --relay 1 --state 1
 ```
 
 Set state of each valve
 
 ```python
 python relay_control.py set --state 1
 ```
 
 Toggle state of specific valve
 
 ```python
 python relay_control.py toggle --relay 1
 ````
 
 
Now we are able to control sprinkler system from a Raspberry PI. That's already a good point but we need to 
connect to ssh... The next tutorial describe how to control the sprinkler from his smartphone or raspberry
display directly.

