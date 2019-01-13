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
- [Electronic part](#electronic-part)
- [Software part](#software-part)


## Electrical part

### Prerequisites

- [Sprinkler hydraulic part]({{ site.url }}{{ site.baseurl }}/automation/sprinkler-hydraulic)

### Overview

{% include figure image_path="/assets/images/sprinkler/valve_boxes_final.jpg" alt="Valves box final" caption="Valves 
box final" %}

### Components

| Component     | Description   | Quantity  | Unit price | Total  |
|:-------------:|:-------------:|:---------:|:----------:|:------:|
| ![borne_auto_levier_2](/assets/images/sprinkler/borne_auto_levier_2_file_2.5mm.jpg){:height="48px" width="96px"}  | Wago electrical lever connectors 2-way |  10 | 0.59 | 5.9
| ![borne_auto_levier_3](/assets/images/sprinkler/borne_auto_levier_3_file_2.5mm.jpg){:height="48px" width="96px"}  | Wago electrical lever connectors 3-way |  5 | 0.78 | 3.90
| ![borne_auto_levier_5](/assets/images/sprinkler/borne_auto_levier_5_file_2.5mm.jpg){:height="48px" width="96px"}  |  Wago electrical lever connectors 5-way |  1 | 1.04 | 1.04
| ![boite_étanche_IP54_80x80x45](/assets/images/sprinkler/boite_étanche_IP54_80x80x45.jpg){:height="48px" width="96px"}  | Water proof distribution box IP54 80x80x45 |  1 | 1.2 | 1.2
| ![boite_étanche_IP54_D70xP40](/assets/images/sprinkler/boite_étanche_IP54_D70xP40.jpg){:height="48px" width="96px"}| Water proof distribution box IP54 70x40 |  3 | 1.40 | 4.20
| ![barrette_12_dominos_2.5mm](/assets/images/sprinkler/barrette_12_dominos_2.5mm_Legrand.jpg){:height="48px" width="96px"}  | Domino bar x12 |  1 | 1.9 | 1.9
| ![multi_conducteur_7_brins](/assets/images/sprinkler/multi_conducteur_7_brins_cable_15m.jpg){:height="48px" width="96px"}  | 7 core Multi conductor cable wire 15m 1mm | 1 | 31.32 | 31.32
| ![transformer](/assets/images/sprinkler/transformer_220_24.jpg){:height="48px" width="96px"}  | Transformer 220VAC/24VAC |  1 | 31.19 | 31.19
| - | - |  - | - | 80.65€

### Wiring

#### Electrical connection

- Join electrical box to valves boxes with 7 multi-conductors wire
- Install one distribution box at the entrance of the valves box.
- Connect power supply to solenoid valve 24V with a transformer.


**Tools**: Electrical screwdriver, wire cutter, wire stripper.
{: .notice--info}

{% include figure image_path="/assets/images/sprinkler/sprinkler_electric_part.png" alt="Sprinkler electric part" caption="Sprinkler electric part" %}

## Electronic part

### Prerequisites

 - [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
 - [Install Python]({{ site.url }}{{ site.baseurl }}/linux/install-python)
 
### Overview 

{% include figure image_path="/assets/images/sprinkler/electrical_part.jpg" alt="Electronic part" caption="Electronic 
part" %}

### Components

| Component      | Description   | Quantity   | Site     | Price  |
|:--------------:|:-------------:|:----------:|:--------:|:------:|
| ![relay_card_raspberry](/assets/images/sprinkler/relay_card_raspberry.jpg){:height="48px" width="96px"}  | Relay AC 250V 10A ; DC 30V 10A Relay card module AC/DC 5V  4 channels | 1 | [Ebay](https://www.ebay.com) | 8.00 € |
| ![cable_MM_MF_FF](/assets/images/sprinkler/cable_MM_MF_FF.jpg){:height="48px" width="96px"}  | 10 x Cables male/female female/female male/male |  30 | [ebay](www.ebay.com)      |   1.00 € |
| ![raspberry_pi_3](/assets/images/sprinkler/raspberry_pi_3.jpg){:height="48px" width="96px"}   | Raspberry PI 3 | 1 | [Farnell](https://www.farnell.com)  | 37.69 € |
| ![power_supply_micro_USB_5V_2500mA](/assets/images/sprinkler/power_supply_micro_USB_5V_2500mA.jpg){:height="48px" width="96px"}   | Power supply Micro USB 5V 2500mA | 1  | [Amazon](https://www.amazon.com) | 8.99 € |
| ![micro_sd_16go_class_10](/assets/images/sprinkler/micro_sd_16go_class_10.jpg){:height="48px" width="96px"}  |Micro SD Card 16go class 10 | 1 | [amazon](www.amazon.com)  | 9.90€ |
| ![breadboard_raspberry](/assets/images/sprinkler/breadboard_raspberry.jpg){:height="48px" width="96px"}  | Bread board  |  1 | [ebay](www.ebay.com)  | 3.50€ |
| -  | -  |  - | -  | 69.08 € |

### Wiring

{% include figure image_path="/assets/images/schema_sprinkler.png" alt="Sprinkler Overview" caption="Sprinkler Overview" %}

**Note**:Connect relay with Raspberry PI (Control electronics).
Each relay are supplied in 3.3V via Raspberry PI.
{: .notice--info}

## Software part
 
### Prerequisites

 - [Install Git]({{ site.url }}{{ site.baseurl }}/linux/install-git)
 - [ssh](https://support.suso.com/supki/SSH_Tutorial_for_Linux)

### Program

Get clone from github or this project.

```bash
git clone https://github.com/jluccisano/rpi-sprinkler-control.git
```

See more details:

```bash
https://github.com/jluccisano/raspberry-scripts/tree/master/scripts/home-automation
```

Follow install step describe in the README.md.

```bash
pip install https://github.com/jluccisano/rpi-sprinkler-control/archive/v0.0.2.tar.gz
```

```bash
pip show rpi-sprinkler-control
```

```bash
Name: rpi-sprinkler-control
Version: 0.0.1
Summary: Control your sprinkler system via a Raspberry PI
Home-page: https://github.com/jluccisano/rpi-sprinkler-control
Author: Joseph Luccisano
Author-email: joseph.luccisano@gmail.com
License: UNKNOWN
Location: /home/pi/.local/lib/python2.7/site-packages
Requires:
```

### Create a service

[See more]({{ site.url }}{{ site.baseurl }}/linux/create-service)


```bash
[Unit]
Description=Home Automation Server
After=multi-user.target

[Service]
ExecStart=/usr/bin/python /opt/home-automation/server.py
Type=simple
Restart=on-abort
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```


### Install release package

- Connect to Rpi via SSH
- Install package
- Create Service
- Run


### Test

Get state of each valve
 
```python
python zone_control.py get
```

Get state of specific zone

```python
python zone_control.py get --zone 1
```

Set state of specific valve

```python
python zone_control.py set --zone 1 --state 1
```

Set state of each valve

```python
python zone_control.py set --state 1
```

Toggle state of specific valve

```python
python zone_control.py toggle --zone 1
```

Now we are able to control sprinkler system from a Raspberry PI. That's already a good point but we need to 
control directly from his smartphone and from anywhere... Go to the next tutorial.