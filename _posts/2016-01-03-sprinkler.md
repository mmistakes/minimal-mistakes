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

{% include figure image_path="/assets/images/sprinkler_plan_masse.png" alt="Final result" caption="Zones" %}

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

1. Calcul du débit

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

At first, you need to locate your water mains inlet. 

Vous devez d'abord identifier où se trouve votre ou vos arrivée(s) d'eau. C'est là que votre
regard avec les électrovannes devra se trouver. Ensuite tout le réseau sera établi à partir de se point
de départ
Le but est d'optimiser le tracer pour utiliser le moins possible de tuyau. De plus,
il est judicieux de longer au maximum les murs. Il sera plus facile d'intervenir pour faire de la
maintenance. Alors que si le réseau en plein milieu du terrain il faudra creuser dans votre beau
gazon... 
Les turbines doivent se trouver en priorité dans les coins afin d'optimiser la couverture d'arrosage.
ex: photo couverture de hunter
Le tuyau 16mm flex permmettra de déporter les turbines aux bons endroits à partir du réseau principal
25mm.
Type de turbine rainbird 3500 spécification. 
Schéma de couverture

Dans mon réseau j'ai ajouté un réseau 25mm pour alimenter une douche solaire pour la piscine.

{% include figure image_path="/assets/images/sprinkler_plan_masse_hydro_schema.png" alt="Final result" caption="Network" %}

4. Dig trenches

- Création des tranchée de 25cm de profondeur sur 20cm


Dérouler et couper le tuyau grossièremment afin d'avoir de la marge pour faire les raccords de jonction

Outillage:
- Pioche ou trancheuse
- 1 bèche
- Cutter
- 1 mètre
- 1 cordo

Materiel

| Zone        | Description           | 
| ------------- |:-------------:|
| photo  | Tuyau propylène 25mm  | 
| photo |  Tuyau propylène 16mm raccord flex   |


{% include figure image_path="/assets/images/sprinkler/trenches.jpg" alt="Trenches" caption="Trenches" %}

5. Wire valves box

Outillage:
- Pioche
- 1 bèche
- Cutter
- 1 mètre

Le regard doit se trouver au plus près de l'arrivée d'eau afin de perdre le moins de pression possible.
Creuser un trou très large afin d'avoir une facilité d'accès pour vos réglages.
Installer un lit de cailloux au fond voir photo ci-dessous. Cela permettra d'avoir une installation
saine pour les électrovannes. En effet, il y aura forcément des pertes d'eau donc si vous êtes au 
contact de la terre cela se transformera en bout.
Découper les emplacements en plastique où vous souhaitez faire passer vos sorties des EV.

| Photo        | Description           | 
| ------------- |:-------------:|
| photo  | Un regard 5 electrovannes  | 

{% include figure image_path="/assets/images/sprinkler/valves_box.jpg" alt="Valves box" caption="Valves box" %}

6. Water main supply

Outillage:
- Clé à molette
- Ruban
- Cutter


Maintenant que le regard est installé, nous pouvons faire venir l'arrivée d'eau à l'intérieur.
J'avais prévu une tuyau 25mm passant sous ma maison qui arrive directement au regard. Il me suffit
de rajouter un raccord en laiton avec un peu de tuyau 25mm pour rejoindre le regard et enfin
de mettre une vanne. J'ai choisi une vanne 1/4 de tour pour plus de faciliter d'accès. J'ai une autre
vanne dans mon garage qui contrôle ce réseau ce qui me permet de pouvoir couper directement. Utile
pour l'hiver car comme cela pas d'eau sous la maison qui pourrait geler.


| Photo        | Description           | 
| ------------- |:-------------:|
| photo  | Un coude laiton  | 
| photo  | Un raccord compression laiton  | 
| photo  | Un raccord laiton pour la vanne  | 
| photo  | une vanne 1/4 de tour  | 
| photo  | tuyau 25mm  | 


{% include figure image_path="/assets/images/sprinkler/water_main_supply.jpg" alt="Water main supply" caption="Water main supply" %}

7. Valves

Pour installer les électrovannes il va falloir un peu de réflexion afin de pouvoir tout faire passer.
Chaque projet aura donc un ajustement différent voici ce que j'ai utilisé.
Comme vous pouvez le constater j'ai une vanne en plus qui me permet d'alimenter ma douche solaire.
De plus j'ai prévu une sortie pour un manomètre utile pour controler la pression du réseau mais
cela est facultatif. Dans mon cas j'ai du faire un montage sur 2 étages afin que tout passe dans 
mon regard prévu pour 5 EV.

Mettre du ruban sur tous les taraudages qui ne contiennent pas de joint.

Chaque electrovanne on un raccord compression pour rejoindre le tuyau du réseau principal 25mm.
Un réducteur de pression est utilisé pour le réseau goutte à goute qui repare en 16mm

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

6. Wire des tuyaux, des coudes, des té et Rotors


| Component        | Quantity           | Price  |
| ------------- |:-------------:| -----:|
| ![Minion](/assets/images/sprinkler/coude_25_FF.jpg){:height="24px" width="48px"} |  | |
| ![Minion](/assets/images/sprinkler/coude_taraudage_central_25x05.jpg){:height="24px" width="48px"} |  | |
| ![Minion](/assets/images/sprinkler/te_compression_25.jpg){:height="24px" width="48px"} |  | |
| ![Minion](/assets/images/sprinkler/coude_compression_25_F20x27_25.jpg){:height="24px" width="48px"} |  | |
| ![Minion](/assets/images/sprinkler/tuyau_25.jpg){:height="24px" width="48px"} |  | |

{% include figure image_path="/assets/images/sprinkler/rotors.JPG" alt="Rotors" caption="Rotors" %}

7. Raccordement électrique

- il faut tout d'abord amener l'électricité jusqu'au regard. comme vous pouvez le constater
sur la photo j'ai une gaine qui passe sous ma maison. Cette gaine arrive directement à mon tableau électrique.
J'y fais passer un câble multi-conducteur 7 brins. 
j'utilise des boitiers de dérivation pour protéger les parties sensibles de la pluie.
voir photo
 
Outillage:
- Tournevis d'électricien
- pince coupante
- pince à dénuder

Materiel:
- dominos
- boitier de dérivation
- raccord séries


{% include figure image_path="/assets/images/sprinkler/sprinkler_electric_part.png" alt="Sprinkler electric part" caption="Sprinkler electric part" %}

{% include figure image_path="/assets/images/sprinkler/valves_box_final.jpg" alt="Valves box final" caption="Valves box final" %}

11. Raccordement au relay

Côté puissance.

Materiel:
- Transformateur 220/24
- Relay

Les EV sont une solenoïde 24V. J'ai donc un transformateur 220/24V


12. Branchement du relay avec le Raspberry

côté commande
 
Les relays sont alimentés en 5V via le Raspberry PI et un GPIO est associé à une input d'un relay

Materiel:
- 1 Raspberry

13. Control valves with Raspberry PI

Maintenant que le câblage la partie commande et puissance sont établis nous pouvons controler les EV via le Raspberry PI.
Etant donné q'un GPIO commande un relay, nous pouvons par impulsion activer ou désactiver une EV. Pour ce faire
j'ai écrit un progamme en python qui permet de piloter les GPIO

- Prerequisites
Setup raspberry 
install python
git

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



En exécutant la commande suivante on ouvre la vanne 1 

```python
python control_relay.py 1 1
```


14. Installation de l'écran

Maintenant que nous avons un programme qui permet de piloter les EV. Nous allons pouvoir créer une IHM plus sexy.
L'idée est de pouvoir encastrer le raspberry PI dans un tableau avec un écran tactile.

Materiel:
- Un écran
- Un boitier tableau electric


15. Installation du boitier électric

Actuellement le raspberry est actuellement alimenté par une prise standard. L'idée est de pouvoir l'incorporer
directement au tableau avec un disjonteur.

- disjoncteur din ??

16. Développement du logiciel en mode manuel kivy

Kivy est un framework multi plateforme écrit en python. J'ai fait ce choix car il est
multi-plateforme ce qui permettra de piloter le programme via l'écran tactile ou
depuis mon smartphone


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





