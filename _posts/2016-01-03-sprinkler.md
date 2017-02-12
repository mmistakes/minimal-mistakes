---
title: "Control your sprinkler with your Raspberry PI"
excerpt_separator: "Control your sprinkler with your Raspberry PI"
related: true
categories:
  - automation
tags:
  - Raspberry PI
---
### Control your sprinkler with your Raspberry PI 3

I want to control my sprinkler anywhere (out of my LAN when I'm on vacation...) with any device (mobile, pad, laptop...)

- [Prerequisites](#prerequisites)
- [Electronic wiring](#electronic-wiring)
- [Hydraulic wiring](#hydraulic-wiring)

#### Prerequisites

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


- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/tuto/setup-raspberry)
- [Install Python]({{ site.url }}{{ site.baseurl }}/tuto/install-python)

#### Electronic wiring

{% capture fig_img %}
![schema_sprinkler]({{ basepath }}/assets/images/schema_sprinkler.png)
{% endcapture %}

#### Hydraulic wiring

1) Calcul du débit
2) Définition des zones
3) Création du réseau
4) Plan des turbines par zone
5) Création des trancheés
6) Mise en place des tuyaux, des coudes, des té et des turbines
7) Raccordement des électrovannes
8) Raccordement à l'arrivée d'eau
9) Test manuel et ajustements
10) Raccordement électrique
11) Raccordement au relay
12) Branchement du relay avec le Raspberry
13) Test-gpio open vanne
14) Installation de l'écran
15) Creation du boitier
16) Développement du logiciel en mode manuel kivy
17) Test
18) Create un mode scénario pour piloter les zones à la suite
19) Raccordement au réseau électrique tableau
20) Résultat final


#### Install Kivy

```bash
pip install Cython==0.23
pip install kivy
pip install pygame
python sprinkler-control.py
```
see more [here](https://kivy.org/docs/installation/installation-linux.html#installation-linux)

https://kivy.org/docs/guide/basic.html

#### Create Manual Mode


#### Create Scenario


#### Final Result





