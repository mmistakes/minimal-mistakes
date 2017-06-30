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


- [Hydraulic part](#hydraulic-part)
    - [Zones definition](#zones-definition)
   
- [Prerequisites](#prerequisites)
- [Hydraulic](#hydraulic-wiring)
  - [Zones](#hydraulic-wiring)
  - [Network](#hydraulic-wiring)
  - [Dig trenches](#hydraulic-wiring)
  - [Valve box](#hydraulic-wiring)
  - [Water supply](#hydraulic-wiring)
  - [Valves](#hydraulic-wiring)
  - [Rotors](#hydraulic-wiring)
- [Electronic](#electronic-wiring)
    - [Puissance](#hydraulic-wiring)
    - [Commande](#hydraulic-wiring)
- [Software](#electronic-wiring)
  - [Simple](#hydraulic-wiring)
  - [Scenario](#hydraulic-wiring)
  - [Packaging](#hydraulic-wiring)
  - [Accès depuis l'extérieur](#hydraulic-wiring)
- [Electrical](#electronic-wiring)
  - [Installation de l'écran](#hydraulic-wiring)
  - [Raccordement au tableau](#hydraulic-wiring)
  

### Hydraulic part

#### Zones definition

Split your land in the largest square and rectangle as possible. 

Important: Separate drop by drop irrigation and lawn irrigation.

Note: I used [draw.io](https://www.draw.io) to create the plan below.

{% include figure image_path="/assets/images/sprinkler_plan_masse.png" alt="Ground plan" caption="Zones" %}

| Zone        | Description           | Diameter (mm) | Surface  | Turbine
| ------------- |:-------------:| ------| ------| -----:|
| A | Lawn irrigation  | 25 | ? | 2 |
| B | Lawn irrigation  | 25 | ? | 4 |
| C | Lawn irrigation  | 25 | ? | 4 |
| D | Lawn irrigation  | 25 | ? | 3 |
| E | Drop by drop irrigation  | 16 | ? | - |


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

| ![Réduction de pression](/assets/images/sprinkler/raspberry_pi_3.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/power_supply_micro_USB_5V_2500mA.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/multi_conducteur_7_brins_cable_15m.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/cable_MM_MF_FF.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/micro_sd_16go_class_10.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/breadboard_raspberry.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/relay_card_raspberry.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 



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




- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Install Python]({{ site.url }}{{ site.baseurl }}/linux/install-python)

### Electronic wiring

{% include figure image_path="/assets/images/schema_sprinkler.png" alt="Sprinkler Overview" caption="Sprinkler Overview" %}

### Hydraulic wiring

1. Water inflow level

TODO

2. Zones

{% include figure image_path="/assets/images/sprinkler_plan_masse.png" alt="Final result" caption="Zones" %}

| Zone        | Description           | Diameter (mm) | Surface  | Turbine
| ------------- |:-------------:| ------| ------| -----:|
| A | Arrosage gazon  | 25 | ? | ? |
| B | Arrosage gazon  | 25 | ? | ? |
| C | Arrosage gazon  | 25 | ? | ? |
| D | Arrosage gazon  | 25 | ? | ? |
| E | Arrosage plantation en goutte à goutte  | 16 | ? | ? |


3. Network

- Locate your water mains inlet

- Define valves box location

This location must be strategic to optimize pipe length and pressure loss.

- Place your rotors

Rotors must be place at first in the corner of each zone.

{% include figure image_path="/assets/images/sprinkler/rotors_coverage.gif" alt="Rotors coverage" caption="Rotors coverage" %}

-  Place your main network (25mm pipe) as closely as possible to rotors.

You can follow your house wall in order to facilitate the maintenance.

- Place your secondary network (16mm pipe) to join main network and rotors.

You can adjust easily the secondary network with flexible pipe (16mm)

Sprinkler hydraulic plan

{% include figure image_path="/assets/images/sprinkler_plan_masse_hydro_schema.png" alt="Sprinkler hydraulic plan" caption="Sprinkler hydraulic plan" %}

4. Dig trenches

- Dig trenches:  25cm depth and 20cm wide.

- Roll out and cut the pipe. Leave a margin in order to join easily connectors.

Tools:
- Pickaxe
- Spade
- Stanley knife
- Tape
- Guiding line

Materiel

| Zone        | Description           | 
| ------------- |:-------------:|
| photo  | Tuyau propylène 25mm  | 
| photo |  Tuyau propylène 16mm raccord flex   |


{% include figure image_path="/assets/images/sprinkler/trenches.jpg" alt="Trenches" caption="Trenches" %}

5. Wire valves box

Tools:
- Pickaxe
- Spade
- Stanley knife
- Tape

- Dig a large hole in order to easily working.

- Create a bed of pebbles for stability and avoiding mud after water leak.

- Cut out the plastic entrance for each valves.

| Photo        | Description           | 
| ------------- |:-------------:|
| photo  | Un regard 5 electrovannes  | 

{% include figure image_path="/assets/images/sprinkler/valves_box.jpg" alt="Valves box" caption="Valves box" %}

6. Water main supply

Now the valves box installed, we can connect to the water supply.

In my case, I had planned a 25mm pipe under my house to join directly my garden. So I just added
a brass union to join the water supply with my 1/4 turn gate.

Tools:
- Wrench
- Teflon tape
- Stanley knife

Note: 

- I also another 1/4 turn gate in my garage in order to turn off easily in each side. Useful to avoid water pipe
freezes.
 

| Photo        | Description           | 
| ------------- |:-------------:|
| photo  | Un coude laiton  | 
| photo  | Un raccord compression laiton  | 
| photo  | Un raccord laiton pour la vanne  | 
| photo  | une vanne 1/4 de tour  | 
| photo  | tuyau 25mm  | 


{% include figure image_path="/assets/images/sprinkler/water_main_supply.jpg" alt="Water main supply" caption="Water main supply" %}

7. Valves

Each project will be different according to your number of valves, the location, the valves box... 
So you need to pay attention to design your installation.
In my case, I designed with 2 floors in order to install: 5 valves, 2 gates and 1 manometers. 

Note: 

- Put teflon on each threading which don't contain any seal.

- Every valves are compression connector to join the main network (25mm).

- A pressure reducing is used for drop by drop network (16mm).

- I added another 1/4 gate for supplying my solar shower.

- I added a manometer to control the network pressure.

- Don't forget to keep few space for the electrical part.

| Photo        | Description           | 
| ------------- |:-------------:|
| ![Raccord compression 25mm ](/assets/images/sprinkler/raccord_compression_25mm_F.jpg){:height="48px" width="96px"}  | Raccord compression 25mm  | 
| ![Réduction de pression](/assets/images/sprinkler/reducteur_pression.jpg){:height="48px" width="96px"}  | Réducteur de pression  | 
| ![Réduction de pression](/assets/images/sprinkler/vanne_1_4_male_femelle.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/vanne_integrale_manette_papillon_FF_26x34.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/vanne_intégrale_manette_papillon_MM_26x34.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/coude_laiton_19x25.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/raccord_laiton_M_19x25.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/mamelon_26x34_20x27_PVC.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/mamelon_réduit_MM_26x34_20x27.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/manchon_réduit_FF_26x34_20x27.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/mamelon_réduit_MM_26x34_15x21.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/manchon_réduit_FF_20x27_12x17.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/mamelon_F_20x27_M_26x34.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/mamelon_F_8x13_M_12x17.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/teflon.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/bouchon_PVC_M_26x34.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/bouchon_PVC_F_26x34.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/coude_collecteur_26x34_MF.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/croix_collecteur_26x34.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/té_collecteur_26x34_MF.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/té_compression_16mm_MM.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/coude_compression_16mm.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/coude_compression_16mm_M_15x21.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/coude_16mm.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/jonction_16mm.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/té_16mm_MM.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/bouchon_16mm.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  |
| ![Réduction de pression](/assets/images/sprinkler/coude_16mm_F_1demi_M.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/clarinette_DURA_4S_MFFFFF_PVC.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/tube_déport_SPX_FLEX_30m.jpg){:height="48px" width="96px"}  | Vanne 1/4 de tour  | 
| ![Réduction de pression](/assets/images/sprinkler/regard_jumbo_rectangle_Rain_Bird_VBA_62x46x30.jpg){:height="48px" width="96px"}  | Regard Jumbo rectangle Rain Bird VBA 2675 62x46x30,5cm | 
| ![Réduction de pression](/assets/images/sprinkler/electrovanne_RAIN_BIRD_DV_1"_MM_NR_24V.jpg){:height="48px" width="96px"}  | Electrovanne RAIN BIRD DV 1" MM NR 24V x5 | 
| ![Réduction de pression](/assets/images/sprinkler/manomètre_glycérine_INOX_radial_0_à_6_bars.jpg){:height="48px" width="96px"}  | Manomètre glycérine INOX radial 0 à 6 bars x1 | 
| ![Réduction de pression](/assets/images/sprinkler/turbine_escamotable_RAIN_BIRD_3504_PC_1_2"_F.jpg){:height="48px" width="96px"}  | Turbine escamotable RAIN BIRD 3504 PC (1/2" F) x13 | 
| ![Réduction de pression](/assets/images/sprinkler/coude_tube_déport_SBE_50_16 x_1_2".jpg){:height="48px" width="96px"}  | Coude pour tube de déport SBE-50 16 x 1/2"  x13 | 
| ![Réduction de pression](/assets/images/sprinkler/tuyau_polyethylène_25mm_25m_HD_6Bars.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/borne_auto_levier_2_file_2.5mm.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/borne_auto_levier_3_file_2.5mm.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/borne_auto_levier_5_file_2.5mm.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/boite_étanche_IP54_80x80x45.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/boite_étanche_IP54_D70xP40.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/barrette_12_dominos_2.5mm_Legrand.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 
| ![Réduction de pression](/assets/images/sprinkler/tuyau_polyethylene_16mm_25m.jpg){:height="48px" width="96px"}  | Tuyau polyethylène 25mm 25m HD 6BarsTuyau polyethylène 25mm 25m HD 6Bars | 

            
{% include figure image_path="/assets/images/sprinkler/valves.jpg" alt="Valves" caption="Valves" %}

6. Wire pipes, elbows, tees et rotors


| Component        | Quantity           | Price  |
| ------------- |:-------------:| -----:|
| ![Minion](/assets/images/sprinkler/coude_25_FF.jpg){:height="24px" width="48px"} |  | |
| ![Minion](/assets/images/sprinkler/coude_taraudage_central_25x05.jpg){:height="24px" width="48px"} |  | |
| ![Minion](/assets/images/sprinkler/te_compression_25.jpg){:height="24px" width="48px"} |  | |
| ![Minion](/assets/images/sprinkler/coude_compression_25_F20x27_25.jpg){:height="24px" width="48px"} |  | |
| ![Minion](/assets/images/sprinkler/tuyau_25.jpg){:height="24px" width="48px"} |  | |

{% include figure image_path="/assets/images/sprinkler/rotors.JPG" alt="Rotors" caption="Rotors" %}

7. Electrical connection

- Join electrical box to valves boxes with 7 multi-conductor wire

- Install one distribution box at the entrance of the valves box.

 
Tools:
- Electrical screwdriver
- Wire cutter
- Wire stripper

Materiel:
- Domino bar
- Distribution box
- Compact Splicing Connectors

{% include figure image_path="/assets/images/sprinkler/sprinkler_electric_part.png" alt="Sprinkler electric part" caption="Sprinkler electric part" %}

{% include figure image_path="/assets/images/sprinkler/valves_box_final.jpg" alt="Valves box final" caption="Valves box final" %}

11. Relay connection (Power electronics)

- Connect power supply to solenoid valve 24V.

Materiel:
- Transformer 220V AC/24V AC
- Relay AC 250V 10A ; DC 30V 10A


12. Connect relay with Raspberry PI (Control electronics)

- Each relay are supplied in 3.3V via Raspberry PI.
 
Tools:
- 1 Raspberry

13. Control valves with Raspberry PI

{% include figure image_path="/assets/images/sprinkler/electronic_part.jpg" alt="Electronic part" caption="Electronic part" %}


- Prerequisites

Setup raspberry 
install python
git


```python
#!/usr/bin/python
import RPi.GPIO as GPIO
import argparse
import sys

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

# GPIO/BOARD | Relay IN | Rotors | Zone
# 22/15	     | R2 IN2   | 1      | B
# 18/12	     | R1 IN2   | 2      | A
# 24/18	     | R1 IN3   | 3      | D
# 17/11	     | R1 IN4   | 4      | C
# 27/13	     | R2 IN1   | 5      | E

class RelayControl(object):

	def set(self):
		parser = argparse.ArgumentParser(
		    description='Set relay state high=1 or low=0')

		parser.add_argument('--relay', help='Set relay 1/2/3/4/5 or *', required=False)
		parser.add_argument('--state',help='Set state high=1 or low=0', required=False)

		args = parser.parse_args(sys.argv[2:])

		if args.relay:
			print 'Set relay=%(0)s to state=%(1)s' % { '0' : args.relay, '1' : args.state }
			GPIO.setup(self.relayIO[args.relay], GPIO.OUT)
			GPIO.output(self.relayIO[args.relay], int(args.state))       
			GPIO.cleanup()
		else:
			print 'Set all relay to state=%s' % args.state
			self.setAll(args.state)
			
	def toggle(self):
		parser = argparse.ArgumentParser(
		    description='Toggle relay value')

		parser.add_argument('--relay', help='Set relay 1/2/3/4/5', required=False)

		args = parser.parse_args(sys.argv[2:])
		print 'Toggle relay=%s' % args.relay

		GPIO.setup(self.relayIO[args.relay], GPIO.OUT)
		GPIO.output(self.relayIO[args.relay], not GPIO.input(self.relayIO[args.relay]))
		GPIO.cleanup()

	def get(self):
		parser = argparse.ArgumentParser(
		    description='Set relay state high=1 or low=0')

		parser.add_argument('--relay', help='Set relay 1/2/3/4/5 or *', required=False)

		args = parser.parse_args(sys.argv[2:])

		if args.relay:
			print 'Get relay=%s' % args.relay
			GPIO.setup(self.relayIO[args.relay], GPIO.OUT)
			print 'state=' + str(GPIO.input(int(self.relayIO[args.relay])))
			GPIO.cleanup()
		else:
			print 'Get all relay state'
			print 'states=' + str(self.getAll())

	def getAll(self):
		chan_list = []
		state_list = []
		for relay in self.relayIO:
			chan_list.append(self.relayIO[relay])
		GPIO.setup(chan_list, GPIO.OUT)
		for relay in self.relayIO:
			state_list.append(GPIO.input(int(self.relayIO[relay])))
		GPIO.cleanup()
		return state_list

	def setAll(self, state):
		chan_list = []
		for relay in self.relayIO:
			chan_list.append(self.relayIO[relay])
		GPIO.setup(chan_list, GPIO.OUT)
		GPIO.output(chan_list, int(state))
		GPIO.cleanup()

	def __init__(self):
		
		self.relayIO = { "1": 15, "2": 12, "3": 18, "4": 11, "5": 13}
		
		parser = argparse.ArgumentParser(
		    description='Relay control',
		    usage='''relay <command> [<args>]
		The most commonly used relay commands are:
		   set     Set relay value high or low
		   get     Get relay value high or low
		   toggle  Toggle relay value
		''')
		parser.add_argument('command', help='Subcommand to run')
		# parse_args defaults to [1:] for args, but you need to
		# exclude the rest of the args too, or validation will fail
		args = parser.parse_args(sys.argv[1:2])
		if not hasattr(self, args.command):
		    print 'Unrecognized command'
		    parser.print_help()
		    exit(1)
		# use dispatch pattern to invoke method with same name
		getattr(self, args.command)()
	
if __name__ == '__main__':
    RelayControl()
```

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
```

14. Display

Tools:
- Display
- Electrical box


15. Set up electrical box

- Replace power outlet by circuit breaker.

Tools:
- circuit breaker Din rail

16. Create multi-plateform IHM with Kivy

### Install Kivy

```bash
pip install Cython==0.23
pip install kivy
pip install pygame
python sprinkler-control.py
```
see more [here](https://kivy.org/docs/installation/installation-linux.html#installation-linux)

https://kivy.org/docs/guide/basic.html



### Create a package for IOS

#### create a python flask rest server or go-gpio + server

#### create web-app react redux

### Create Manual Mode


### Create Scenario

### Final Result

### Useful

1⁄2" = 15/21
3⁄4" = 20/27
1" = 26/34
11⁄4" = 33/42





