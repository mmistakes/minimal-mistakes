---
title: "Create a sprinkler system"
related: true
header:
  overlay_image: /assets/images/anthony-rossbach-59486.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/anthony-rossbach-59486.jpg
categories:
  - Automation
tags:
  - Raspberry PI
  - Hidraulic
  - Electronic
  
---
The objective of this tutorial is to create and control a sprinkler system with a Raspberry PI.

- [Prerequisites](#prerequisites)
- [Electronic wiring](#electronic-wiring)
- [Hydraulic wiring](#hydraulic-wiring)

### Prerequisites

- Components < ? EUR:

Electronic components

| Component        | Site           | Price  |
| ------------- |:-------------:| -----:|
| Raspberry PI 3   | [Farnell](https://www.farnell.com) | 37.69 EUR |
| Power supply Micro USB 5V 2500mA   | [Amazon](https://www.amazon.com) | 8.99 EUR |
| Micro SD Card (16 Go class 10)  | [Amazon](https://www.amazon.com) | 9.99 EUR |
| Relay card module AC/DC 5V  4 channels | [Ebay](https://www.ebay.com) | 8.00 EUR |
| multi conducteur 7 brins cable 15m | [Technic-achat](https://www.technic-achat.fr) | 31.32 EUR |
| 10 x Cables male/female | [ebay](www.ebay.com)      |   1.00 EUR |
| 10 x Cables male/male | [ebay](www.ebay.com)      |    1.00 EUR |
| Total: |      |    97.99 EUR |

Hydraulic components


{% include figure image_path="/assets/images/sprinkler/hydro_components.JPG" alt="Hydro components" caption="Hydro components" %}


| Component        | Site           | Price  |
| ------------- |:-------------:| -----:|
| Gate van Rainbird DV 1" 24V | [Jardinet](https://www.jardinet.fr) | 22.10 EUR |
| Gate van Rainbird DV 1" 24V | [Jardinet](https://www.jardinet.fr) | 14.94 EUR |
| tuyau 25m goutte à goutte | [Jardinet](https://www.jardinet.fr) | ? EUR |
| 2 x tuyau 30m tube de déport | [Jardinet](https://www.jardinet.fr) | 27 EUR |
| 13 x turbines | [Jardinet](https://www.jardinet.fr) | 6.97 EUR |
| manomètre 0 à 6 bars | [Jardinet](https://www.jardinet.fr) | 9.65 EUR |
| Regard rectangle | [Jardinet](https://www.jardinet.fr) | 38.81 EUR |
| Clarinette 1" | [Jardinet](https://www.jardinet.fr) | 32.12 EUR |
| Total: |      |    ? EUR |


- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/automation/setup-raspberry)
- [Install Python]({{ site.url }}{{ site.baseurl }}/linux/install-python)

### Electronic wiring

{% include figure image_path="/assets/images/schema_sprinkler.png" alt="Sprinkler Overview" caption="Sprinkler Overview" %}

### Hydraulic wiring

1. Calcul du débit


2. Zones

{% include figure image_path="/assets/images/sprinkler_plan_masse.png" alt="Final result" caption="Zones" %}

3. Network

{% include figure image_path="/assets/images/sprinkler_plan_masse_hydro_schema.png" alt="Final result" caption="Network" %}

4. Dig trenches

{% include figure image_path="/assets/images/sprinkler/trenches.jpg" alt="Trenches" caption="Trenches" %}

5. Wire valves box

{% include figure image_path="/assets/images/sprinkler/valves_box.jpg" alt="Valves box" caption="Valves box" %}

6. Water main supply

{% include figure image_path="/assets/images/sprinkler/water_main_supply.jpg" alt="Water main supply" caption="Water main supply" %}

7. Valves

{% include figure image_path="/assets/images/sprinkler/valves.jpg" alt="Valves" caption="Valves" %}

6. Wire des tuyaux, des coudes, des té et Rotors


| Component        | Quantity           | Price  |
| ------------- |:-------------:| -----:|
| ![Minion](/assets/images/sprinkler/coude_25_FF.jpg) |  | |
| ![Minion](/assets/images/sprinkler/coude_taraudage_central_25x05.jpg) |  | |
| ![Minion](/assets/images/sprinkler/te_compression_25.jpg) |  | |
| ![Minion](/assets/images/sprinkler/coude_compression_25_F20x27_25.jpg) |  | |
| ![Minion](/assets/images/sprinkler/tuyau_25.jpg) |  | |

{% include figure image_path="/assets/images/sprinkler/rotors.JPG" alt="Rotors" caption="Rotors" %}

7. Raccordement électrique

{% include figure image_path="/assets/images/sprinkler/sprinkler_electric_part.png" alt="Sprinkler electric part" caption="Sprinkler electric part" %}

{% include figure image_path="/assets/images/sprinkler/valves_box_final.jpg" alt="Valves box final" caption="Valves box final" %}

11. Raccordement au relay


12. Branchement du relay avec le Raspberry


13. Control valves with Raspberry PI

```python
#!/usr/bin/python
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

relayIO = { "1": 15, "2": 16, "3": 17, "4": 18, "5": 19}

def setState(relay, state):
	GPIO.output(relayIO[relay], state)

	if getState(relay) != state:
		print("relay: " + relay + "is not set to " + state)

	print("relay: " + relay + "is set to " + getState(relay))

def getState(relay):
	return GPIO.input(relayIO[relay])

def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('--relay', help='Set relay 1/2/3/4/5', required=True)
    parser.add_argument('--state',help='Set state high=1 or low=0', required=True)

    args = parser.parse_args()

    setState(args.relay, args.state)

if __name__ == '__main__':
    main()
```

Output:

```python
python control_relay.py 1 1
```


14. Installation de l'écran
15. Installation du boitier électric



16. Développement du logiciel en mode manuel kivy


### Install Kivy

```bash
pip install Cython==0.23
pip install kivy
pip install pygame
python sprinkler-control.py
```
see more [here](https://kivy.org/docs/installation/installation-linux.html#installation-linux)

https://kivy.org/docs/guide/basic.html

### Create Manual Mode


### Create Scenario




19. Raccordement au réseau électrique tableau



### Final Result


### Useful

1⁄2" = 15/21
3⁄4" = 20/27
1" = 26/34
11⁄4" = 33/42





