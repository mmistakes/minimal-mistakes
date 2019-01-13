---
title: "Create a sprinkler system: Hydraulic part"
related: true
header:
  overlay_image: /assets/images/sprinkler/hydro_components.JPG
  teaser: /assets/images/sprinkler/hydro_components.JPG
categories:
  - Automation
tags:
  - Sprinkler
  - Hidraulic

---

The objective of this tutorial is to describe step by step how to make the hydraulic part of a sprinkler system.


Use this tutorial as the guideline in order to design yours, all components (brand, size, quantity, capacity...)
described below is my own design as example but each projects are differents. At the end of this tutorial, you will be
able to use the sprinkler manually.

- [Water inflow level](#water-inflow-level)
- [Zones definition](#zones-definition)
- [Network definition](#network-definition)
- [Installation](#installation)
    - [Dig trenches and set main pipe](#dig-trenches-and-set-main-pipe) 
    - [Valve boxes](#valve-boxes)
    - [Water main supply](#water-main-supply)
    - [Valves](#valves) 
    - [Connections](#connections)
- [Drop by Drop](#drop-by-drop)
- [Result test](#result-test)
    
**Useful conversion Inch/Metric**:
1⁄2" = 15/21
3⁄4" = 20/27
1" = 26/34
1⁄4" = 33/42
{: .notice--info}
      
## Water inflow level

### Define system capacity

The Hunter tutorial below helped me:
[Hunter tutorial](https://www.hunterindustries.com/residential-system-design-guide)

### Check pressure level

Check pressure level with a manometer in order to fix the pipe size and number of rotors by zones.

![manometer](/assets/images/sprinkler/manomètre_glycérine_INOX_radial_0_à_6_bars.jpg){:height="48px" width="96px"} 
{: .text-center}

Here my results as example:

- Static pressure: 3.5 Bars 50 PSI
- Water meter: 1"
- Service line: 1"
- Design capacity: 53 l/min 14GPM -> 3,18 m3/h
- Working pressure: 2 Bars 29 PSI
{: .notice--success}

According to the rotor Rainbird 3500 specification:
- Nozzle standard 2; 8.2m radius; 0.47m3/h

So according to my design capacity 3.18 m3/h => 3.18/0.47 = 6.76 so I can use 6 rotors maximum by zone.

Note: The pressure decrease of 0.25 Bar every 10m for a 25mm pipe. So you have to get it in consideration
to calculate the capacity for distanly zones from your manometer.
{: .notice--info}

My biggest zone is a square of 76 m2 = with 4 rotors with 8.2m radius, I will cover the zone with at least pressure.

## Zones definition

Split your land in the largest square and rectangle as possible. But drop by drop irrigation and lawn irrigation
must be separate.

**Note**: According to your rotors selection, you need to choose rotors able to
cover these zones. Example for my surface, I opt to Rainbird 3500 which cover all my requirements.
See more [here](https://rainbird.com/sites/default/files/media/documents/2018-02/ts_3500.pdf).
{: .notice--info}

{% include figure image_path="/assets/images/sprinkler_plan_masse.png" alt="Ground plan" caption="Zones" %}

| Zone | Description              | Diameter (mm) | Surface | Rotors|
|:----:|:------------------------:|:-------------:|:-------:|:-----:|
| A    | Lawn irrigation          | 25            | 21.5m2  | 2     |
| B    | Lawn irrigation          | 25            | 76m2    | 4     |
| C    | Lawn irrigation          | 25            | 45m2    | 4     |
| D    | Lawn irrigation          | 25            | 45m2    | 3     |
| E    | Drop by drop irrigation  | 16            | -       | -     |

## Network definition

1) Locate your water main supply

First check your main supply pressure. For my part, I had 8 Bars ! Yes My water tower is 50m above my house (1 Bar
every 10m and the water tower 30m height). So I set up a pressure reductor in order to limitate the
pressure to 3.5Bars. It's a good option in order to not damage your house equipments (plumbing, washing machine... and
your future sprinkler system).

2) Define valve boxes location

This location must be strategic to optimize pipe length and pressure loss.

3) Place rotors for each zones

Rotors must be place at first in the corner of each zone. See below the best practices to place rotors.

![rotors coverage](/assets/images/sprinkler/rotors_coverage.gif){:height="256px" width="256px"}
{: .text-center}

- Place main network (25mm pipe) as closely as possible to rotors;

**Note**: You can follow your house wall in order to facilitate the maintenance.
{: .notice--info}

- Place secondary network (16mm pipe) to join main network and rotors;

**Note**: You could adjust easily the secondary network with flexible pipe (16mm)
{: .notice--info}

- Place drop by drop network (16mm pipe)

**Note**: Drop by drop must pass through all plants. It will be easy to divide in sub-network with mini gates
{: .notice--info}

{% include figure image_path="/assets/images/sprinkler_plan_masse_hydro_schema.png" alt="Sprinkler hydraulic network" 
caption="Sprinkler hydraulic network" %}

## Installation

### Dig trenches and set main pipe

- Dig trenches: 25cm depth and 20cm wide;
- Roll out and cut the pipe. Leave a margin in order to join easily connectors.

#### Components:

| Component     | Description   |
|:-------------:|:-------------:|
|![Polyethylene pipe](/assets/images/sprinkler/tuyau_polyethylène_25mm_25m_HD_6Bars.jpg){:height="48px" width="96px"} | Polyethylene pipe 25mm 25m HD 6Bars


**Tools**: Pickaxe, Spade, Stanley knife, Tape and Guiding line.
{: .notice--primary}

{% include figure image_path="/assets/images/sprinkler/trenches.jpg" alt="Trenches" caption="Trenches" %}

### Valve boxes

- Valve boxes must locate near the water main and electrical supply;
- Choice the right size according to the number of valves that you need;
- Dig a large hole in order to easily working;
- Create a bed of pebbles for stability and avoiding mud after water leak;
- Cut out the plastic entrance for each valves.

#### Components:

| Component     | Description   | Unit price
|:-------------:|:-------------:|:-------------:|
| ![Valve boxes](/assets/images/sprinkler/regard_jumbo_rectangle_Rain_Bird_VBA_62x46x30.jpg){:height="48px"width="96px"} | Valve boxes Rain Bird 62x46x30,5cm  | 38.81

**Tools**: Pickaxe, Spade, Stanley knife, Tape.
{: .notice--primary}

{% include figure image_path="/assets/images/sprinkler/valve_boxes.jpg" alt="Valve boxes" caption="Valve boxes" %}

### Water main supply

Now the valves box installed, we can connect to the water supply.
In my case, I had planned a 25mm pipe under my house to join directly my garden. So I just added
a brass union to join the water supply with my 1/4 turn gate.

**Tools**: Wrench, teflon tape, stanley knife
{: .notice--primary}

**Note**: I also another 1/4 turn gate in my garage in order to turn off easily in each side. Useful to avoid water pipe
freezes.
{: .notice--info}

| Zone          | Description   | Quantity      | Unit price    | Total  |
|:-------------:|:-------------:|:-------------:|:-------------:|:------:|
| ![coude_laiton](/assets/images/sprinkler/vanne_integrale_manette_papillon_FF_26x34.jpg){:height="48px" width="48px"} | Gate FF 26x34 | 1 | 10.75 | 10.75
| ![coude_laiton](/assets/images/sprinkler/coude_laiton_19x25.jpg){:height="48px" width="96px"}  | Brass elbow 19x25| 1 | 7.5 | 7.5
| ![raccord_laiton](/assets/images/sprinkler/raccord_laiton_M_19x25.jpg){:height="48px" width="96px"}  | Brass adapter male 19x25 | 1 | 4.25 | 4.25
| ![mamelon_F_20x27_M_26x34](/assets/images/sprinkler/mamelon_F_20x27_M_26x34.jpg){:height="48px" width="96px"}  | Brass nipple Female 20/27 -> Male 26/34 | 1 | 4.08 | 4.08
| ![Manometre](/assets/images/sprinkler/manomètre_glycérine_INOX_radial_0_à_6_bars.jpg){:height="48px" width="96px"} | Water Pressure Gauge INOX radial 0 à 6 bars x1 | 1 | 9.65 | 9.65
| ![Mamelon_reduit](/assets/images/sprinkler/mamelon_réduit_MM_26x34_20x27.jpg){:height="48px" width="96px"}  | Brass adapter 26/34 Male -> 20/27 Male | 2 | 4.2 | 8.4
| ![Manchon_reduit](/assets/images/sprinkler/manchon_réduit_FF_20x27_12x17.jpg){:height="48px" width="96px"}  | Brass adapter 20/27 Male -> 12/17 Male | 1 | 2.375 | 5.75
| ![Mamelon](/assets/images/sprinkler/mamelon_F_8x13_M_12x17.jpg){:height="48px" width="96px"}  | Brass nipple 8/13 Female-> 12/17 Male | 2 | 1.425 | 2.85
| ![Clarinet](/assets/images/sprinkler/clarinette_DURA_4S_MFFFFF_PVC.jpg){:height="48px" width="96px"}  |  Clarinet 1" | 1 | 16.06 | 16.06
| ![Bouchon_Male](/assets/images/sprinkler/bouchon_PVC_M_26x34.jpg){:height="48px" width="96px"}  | End plug PVC male 1"| 2 | 1.55 | 3.10
| ![Bouchon_Femelle](/assets/images/sprinkler/bouchon_PVC_F_26x34.jpg){:height="48px" width="96px"}  | End plug PVC female 1" | 2 | 1.95 | 3.9
| ![Coude_collecteur](/assets/images/sprinkler/coude_collecteur_26x34_MF.jpg){:height="48px" width="96px"}  | Elbow collector MF 1" | 1 | 5.05 | 5.05
| ![Croix_collecteur](/assets/images/sprinkler/croix_collecteur_26x34.jpg){:height="48px" width="96px"}  | Cross collector 1"| 1 | 8.95 | 8.95
| ![Te_collecteur](/assets/images/sprinkler/té_collecteur_26x34_MF.jpg){:height="48px" width="96px"}  | Tee collector 26x34 MF 1"| 1 | 4.2 | 4.2
| ![Rotor](/assets/images/sprinkler/electrovanne_RAIN_BIRD_DV_1"_MM_NR_24V.jpg){:height="48px" width="96px"}  |Irrigation valve RAIN BIRD DV 1" MM NR 24V | 4 | 14.94 | 59.76
| ![Raccord compression 25mm ](/assets/images/sprinkler/raccord_compression_25mm_F.jpg){:height="48px" width="96px"}| Adapter compression 25mm  | 4 | 2.5 | 10.0
| - | - | - | - | 164.25


{% include figure image_path="/assets/images/sprinkler/water_main_supply.jpg" alt="Water main supply" caption="Water main supply" %}

### Valves

Each project will be different according to your number of valves, the location, the valves box... 
So you need to pay attention to design your installation.
In my case, I designed with 2 floors in order to install: 5 valves, 2 gates and 1 manometers. 

- Put teflon on each threading which don't contain any seal.
- Every valves are compression connector to join the main network (25mm).
- A pressure reducing is used for drop by drop network (16mm).
- I added another 1/4 gate for supplying my solar shower.
- I added a manometer to control the network pressure.
- Don't forget to keep few space for the electrical part.
     
{% include figure image_path="/assets/images/sprinkler/valves.jpg" alt="Valves" caption="Valves" %}

### Connections

#### Wire pipes, elbows, tees et rotors

| Component     | Description   | Quantity | Unit price | Total    |
|:-------------:|:-------------:|:--------:|:----------:|:--------:|
| ![Coude_25](/assets/images/sprinkler/coude_25_FF.jpg){:height="96px" width="96px"} | Compression elbow connector | 14 | 3.05 | 42.7
| ![Coude_taraudage_centra](/assets/images/sprinkler/coude_taraudage_central_25x05.jpg){:height="96px" width="96px"}| Fitting compression elbow connector | 4 | 3.05 | 12.20
| ![Te_compression_25](/assets/images/sprinkler/te_compression_25.jpg){:height="96px" width="96px"} | Compression tee| 4 | 4.05 | 16.2
| ![Coude_compression_25](/assets/images/sprinkler/coude_compression_25_F20x27_25.jpg){:height="96px" width="96px"}|Compression fitting female tee | 9 | 4.65 | 41.85
| ![Tube_deport](/assets/images/sprinkler/tube_déport_SPX_FLEX_30m.jpg){:height="48px" width="96px"}  |  swing pipe 30m SPX-FLEX 30m | 2 | 27.0 | 54.0
| ![Tuyau_polyethylene](/assets/images/sprinkler/tuyau_polyethylène_25mm_25m_HD_6Bars.jpg){:height="48px" width="96px"}  | polyethylene irrigation pipe 25mm 50m HD 6Bars| 3 | 30.9 | 92.7
| ![Turbine_escamotable](/assets/images/sprinkler/turbine_escamotable_RAIN_BIRD_3504_PC_1_2"_F.jpg){:height="48px" width="96px"}  | Rotor RAIN BIRD 3504 PC (1/2" F) | 13 | 6.97 | 90.61
| ![Coude_tube_déport](/assets/images/sprinkler/coude_tube_déport_SBE_50_16 x_1_2".jpg){:height="48px" width="96px"}|Swing Pipe - 1/2" MNPT Elbow | 13 | 0.24 | 3.12
| ![Coude_16mm](/assets/images/sprinkler/coude_16mm_F_1demi_M.jpg){:height="48px" width="96px"}  | Swing Pipe - 3/4" MNPT Elbow | 13 | 0.24 | 3.12
| - | - | - | - | 356.3

{% include figure image_path="/assets/images/sprinkler/rotors.JPG" alt="Rotors" caption="Rotors" %}

## Drop By Drop

{% include figure image_path="/assets/images/sprinkler/drop_by_drop_schema.png" alt="Drop By Drop" caption="Drop By 
Drop" %}

**Advices**:
- Regarding the drop by drop, we have to add a pressure reductor 1.2bars 17PSI (1 14.5 PSI à 1.5bars 21.75PSI)
- Add mini threading valve in order to control different zones (see components below).
- I set 1 dripper by bush, 3 drippers by palm tree, 2 drippers by conifer, 2 drippers by olive tree

Components:


| Component     | Description   | Quantity | Unit price | Total    |
|:-------------:|:-------------:|:--------:|:----------:|:--------:|
| ![Rotor](/assets/images/sprinkler/electrovanne_RAIN_BIRD_DV_1"_MM_NR_24V.jpg){:height="48px" width="96px"}  | Irrigation valve RAIN BIRD DV 1" MM NR 24V | 1 | 14.94 | 14.94
| ![machon-reduit-femelle-femelle](/assets/images/sprinkler/machon-reduit-femelle-femelle.jpg){:height="48px" width="96px"}  | Reducing Coupling Female Thread female/female 1" -> 3/4"  | 1 | 2.05 | 2.05
| ![mamelon-34-polyp-noir](/assets/images/sprinkler/mamelon-34-polyp-noir.jpg){:height="48px" width="96px"}  | Nipple PVC male/male 3/4" | 1 | 1.09 | 1.09
| ![reducteur_34_femelle_male](/assets/images/sprinkler/reducteur_34_femelle_male.jpg){:height="48px" width="96px"}  | Pressure Regulator 3/4" Hose Thread 25PSI female/male 3/4"  | 1 | 5.99 | 5.99
| ![adaptateur-de-montage](/assets/images/sprinkler/adaptateur-de-montage.jpg){:height="48px" width="96px"}  | Thread adaptator male 3/4" -> 16mm  | 1 | 0.42 | 0.42
| ![tuyau_polyethylene_16mm_25m](/assets/images/sprinkler/tuyau_polyethylene_16mm_25m.jpg){:height="48px" width="96px"}  | polyethylene irrigation pipe 16mm 25m | 5 | 6.90 | 34.5
| ![coude_16mm](/assets/images/sprinkler/coude_16mm.jpg){:height="48px" width="96px"}  | Elbow 16mm  |  6 | 0.25 | 1.50
| ![jonction_16mm](/assets/images/sprinkler/jonction_16mm.jpg){:height="48px" width="96px"}  | Adapter 16mm | 6 | 0.25 | 1.50
| ![te_16mm_MM](/assets/images/sprinkler/té_16mm_MM.jpg){:height="48px" width="96px"}  | Tee 16mm  | 4 | 0.54 | 2.16
| ![bouchon_16mm](/assets/images/sprinkler/bouchon_16mm.jpg){:height="48px" width="96px"}  | End plug connector 16mm| 8 | 1.65 | 13.2
| ![goutteur](/assets/images/sprinkler/goutteur.jpg){:height="48px" width="96px"}  | Dripper | 100 | 0.23 | 23.0
| ![vanette_16mm_16mm](/assets/images/sprinkler/vanette_16mm_16mm.jpg){:height="48px" width="96px"}  | Mini Threading valve 1/4 de turn male/male 16mm  | 6 | 2.45 | 14.7
| -  | -  | - | - | 115.05

Tools:

| Component     | Description   | Price |
|:-------------:|:-------------:|:--------:|
| ![awl](/assets/images/sprinkler/poinçon.jpg){:height="48px" width="96px"}  | Irrigation hole punch  | 3.40

## Result test

- Open the main gate.
- Check the pressure and joins are well set
- Open gate manually with 1/4 turn.
- With a screwdriver adjust your rotor covering.
- Total cost for my project: 677.81€

**Tool**s: screwdriver.
{: .notice--primary}

We can now use the sprinkler manually from the valve box. The next tutorial will describe electrical and electronic
part to automatize the system.


{% include figure image_path="/assets/images/sprinkler/sprinkler_final_result.jpg" alt="Sprinkler final result" 
caption="Sprinkler final result" %}
