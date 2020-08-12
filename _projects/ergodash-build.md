---
layout: single
title: "ErgoDash Custom Mechanical Keyboard"
excerpt: "Motivation, building logs and notes of the ErgoDash rev1.2 Split Mechanical Keyboard"
header:
  teaser: assets/projects/ergodash_build/FinalPics/IMG_20200812_161004.jpg
tags:
  - Mechanical Keyboard
  - DIY
  - Ergonomy
  - Productivity
  - Keeb
  - ErgoDash
toc: true
toc_sticky: true
author_profile: true
classes: wide
---

# TL;DR
For the sake of brevity, the abridged version of the core components and features.

## Pics and n00d5
<figure class="one">
    <a href="/assets/projects/ergodash_build/FinalPics/IMG_20200812_161558.jpg"><img src="/assets/projects/ergodash_build/FinalPics/IMG_20200812_161558.jpg"></a>
    <a href="/assets/projects/ergodash_build/FinalPics/IMG_20200812_161518.jpg"><img src="/assets/projects/ergodash_build/FinalPics/IMG_20200812_161518.jpg"></a>
</figure>
<figure class="half">
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200803_070658.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200803_070658.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200803_070643.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200803_070643.jpg"></a>
</figure>
<figure class="half">
    <a href="/assets/projects/ergodash_build/FinalPics/IMG_20200812_161207.jpg"><img src="/assets/projects/ergodash_build/FinalPics/IMG_20200812_161207.jpg"></a>
    <a href="/assets/projects/ergodash_build/FinalPics/IMG_20200812_161119.jpg"><img src="/assets/projects/ergodash_build/FinalPics/IMG_20200812_161119.jpg"></a>
</figure>
<figure class="half">
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200810_182951.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200810_182951.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200810_183001.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200810_183001.jpg"></a>
</figure>
<figure class="one">
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200809_095811.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200809_095811.jpg"></a>
</figure>
<figure class="third">
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200809_095851.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200809_095851.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200809_095831.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200809_095831.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200809_095838.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200809_095838.jpg"></a>
</figure>
<figure class="half">
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_170338.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_170338.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_165240.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_165240.jpg"></a>
</figure>
<figure class="half">
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_165216.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_165216.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_165332.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_165332.jpg"></a>
</figure>
<figure class="half">
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_165352.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_165352.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_170116.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_170116.jpg"></a>
</figure>
<figure class="third">
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_151523.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_151523.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_151614.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_151614.jpg"></a>
    <a href="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_132422.jpg"><img src="/assets/projects/ergodash_build/PreviewGallery/IMG_20200802_132422.jpg"></a>
</figure>

## Specifications

**PCB**: [Ergo Dash rev 1.2](https://github.com/omkbd/ErgoDash)

**Case**: Custom transparent acrylic case with tenting support [(Original author](https://twitter.com/clomie/status/1134790717656616962), [AI, DXF files)](https://github.com/clomie/ergodash-tilting-tenting-case)

**Switches**: Khail Switch Copper x 50, Khail Box Brown x 20

**Keycaps**: DSA PBT Blank Caps (68 x 1U, 2 x 2U)

**Miscellaneous**:
- Mill-Max 0305 receptacles for switch hot-swapping
- No stabilizers
- RGB LED x 24 for underglow
- Backlight LED x 70 (Red, Blue, and White fixed assortment)
- Set of screws, spacer/standoffs and nuts for tenting

(Exhaustive part list below)

## Pros
- Better leverage of the thumbs with 5 x 2 thumb key clusters, as well as 3 additional keys per index (no more moving the right hand to reach *Backspace*, *Delete*, *Home*, etc... keys)
- Improved workflow on i3wm Tiling based window management for switching between workspaces and windows (maybe subjective though)
- Split keyboard allows for better posture, with straightened back and shoulder facing outward.
- Less pronation with the tenting kit.
- Highly customizable keyboard layout via the QMK Toolbox.
{: .text-justify}

## Cons
- Relatively expensive (but can shave off a bit by skipping the RGB and switch quality, and hot-swap feature). Hot-swapping and tenting are quite expensive (~35$ each. 35$ worth of screws, standoffs, and nuts, just imagine...)
- Still need to move the right hand to reach the mouse. In retrospect, [a trackball or trackpad around the right-hand thumb cluster would be ideal](https://medium.com/@kincade/track-beast-build-log-a-trackball-dactyl-manuform-19eaa0880222). Nevertheless, it is possible to enable mouse keys in the QMK firmware to serve a workaround, albeit a less precise one. (See Firmware Flash Notes).
- Learning curve that might take around four days for the alphabetic keys, and more for the numeric and other symbol keys.
{: .text-justify}
- This tenting method is not as flexible as the original one, and might require a higher investment.

## Important build notes

- If not using hot-swap, the build order is really important, especially regarding soldering the switches, which requires to pre-install the upper side of the case. The Pro Micro covers the holes of 2 switches and their LEDs, so those must also be soldered BEFORE soldering down the Pro Micro.
- When installing the Pro Micro, make sure it is not too elevated and the pins are trimmed to be able to close the case properly. From my experience in this build, not doing so ended up in a slight bow of the bottom side of the case.

From here onward is the long version, which, in retrospect, just reads like a huge rant and excuses gave to myself for this "purchase", all disguised as a build log.

# Long version: The Why
After serendipitously stumbling upon the [Typeracer](https://play.typeracer.com/) typing competition website, then on the [Keybr](www.keybr.com) touch typing tutoring website, it turned out that I was using my keyboard wrong all along.
No wonder, since my typing skills were mostly improvised on the go, and deeply influenced by gamings habits (WASD looking at you ...).
Embarking a new journey to improve my typing by exercising on [Keybr](www.keybr.com), it dawned on me that the typing experience could be drastically improved by switching to a more tailored keyboards.
{: .text-justify}

First, the slight shift to the right of the keyboard keys, which seems to have been inherited from physical constraints that occurred during the design of typewriters appeared to be not necessary, and even counter-productive at times.
Furthermore, the under-exploitation of the thumbs, at least on the Realforce keyboard that was my daily driver so far could be vastly improved upon with thumb cluster keys.
For example, the *Backspace*, *Delete*, *Home*, *End* keys, the arrow keys, etc... would require to move the right hand quite far away.
Furthermore, when using the i3 Window Tiling Manager, it is quite cumbersome to, say, switch between workspaces, windows, or switching input methods on the IME, because it requires the use of the Meta key to do so, requiring to often shift either left or right hand down to hit it.
To put it simply, the standard keyboard layouts could be considered inefficient in those aspects, at least for my personal use case.
Besides, learning about pronation that usually occurs during prolonged use, as well as the posture problem, namely the slightly hunched (and arched inward shoulder) position I would have to sit in due to the "flatness" and "centered" nature of the general consumer-oriented keyboard finally motivated me to look deeper into the matter of customized keyboards.
{: .text-justify}

After immersing myself in the awesome community of [r/MechanicalKeyboards](https://www.reddit.com/r/MechanicalKeyboards/) and learning more mechanical keyboards from scratch, the image of the ideal (at that time) keyboard slowly started to form in my mind.
Namely, it had to be (1) a split keyboard, (2) with enough thumb cluster keys to map the Meta and Layer keys, and (3) tilting and tenting support to reduce pronation and allow for a "straight back and wide shoulder" position while typing.
Turns out that besides the potential benefits cited above, customized mechanical keyboards can also result in faster-typing speed depending on the switches installed, and allows for an in-depth customization of the key layouts via firmware editing and flashing.
{: .text-justify}

Other reasons would be the itches that slowly crept into my hands, as I sat in the "ivory tower" for more than 3 years straight, without using my hand to realize something that physically exists in the real world.
Another would be my childhood dream of soldering all day long to build some electronic devices.
This was also one of the motivations for adding all that RGB "bling-bling", as I originally aimed to spend the minimal amount and passing over the lightning components.
In retrospect, I got the opportunity to solder to my heart's content, *ad nauseum*, and gain quite some experience via salvaging of the many mistakes that occurred, so I have no regret.
Furthermore, I can still turn off the LEDs with a few key shortcuts (props to the QMK firmware which has a solid implementation of RGB modes by the way).
{: .text-justify}

Looking around the various split mechanical keyboards building kits available where I resided at the time of writing narrowed down the choice to the Iris model,
While learning about mechanical keyboards in general, a few more features happened to crawl up and latch down into my mind.
Namely the ability to hot-swap switches to further improve upgradability, which was mainly inspired by [this Reddit post](https://www.reddit.com/r/MechanicalKeyboards/comments/bvm3pe/my_first_build_ergodash_with_hotswappable/).
The tenting and tilting of the case was also a feature that was further consolidated after watching getting acquainted with the ShortCircuits (Linus Tech Tips) channel's [Dygma Ergonomic Keyboard Review](https://www.youtube.com/watch?v=i4TCbc9oB1E), the [ErgoDash custom case with tenting and tilting support of @clomie](https://twitter.com/clomie/status/1134790717656616962), and finally this [アメ_ツチ_ホシ_ソラ Custom Iris tenting](https://www.reddit.com/r/MechanicalKeyboards/comments/e89x8g/%E3%82%A2%E3%83%A1_%E3%83%84%E3%83%81_%E3%83%9B%E3%82%B7_%E3%82%BD%E3%83%A9/).
{: .text-justify}

# Part List (Exhaustive)
Arguably a critical phase depending on the extent to which the build is to be customized.
{: .text-justify}

| Part name and quantity           | Core           | LED / RGB (Option  )   | Tenting (Option)           | Hotswap  (Option)|
| :---------------------------:    | :------------: | ---------------------: | :----------------:         | :----------------: |
| [ErgoDash PCB (rev 1.2)](https://keycapsss.com/keyboard-parts/pcb/63/ergodash-split-keyboard-pcb) x 2       |  ✓             |                        |                            |                    |
| [ErgoDash Case](https://keycapsss.com/keyboard-parts/cases/76/ergodash-acrylic-plate-case) x 2              |  ✓             |                        | ✓ [Custom  version !!!](https://github.com/clomie/ergodash-tilting-tenting-case)            |                    |
| M2 x 5mm Screw x 22              |  ✓             |                        |                            |                    |
| M2 x 6mm Screwable spacer x 14   |  ✓             |                        |                            |                    |
| M2 x 8mm Screw spacer x 6        |  ✓             |                        |                            |                    |
| TRRS Jack MJ-4PP-9 x 2           |  ✓             |                        |                            |                    |
| MJTP1117 Reset Switch x 2        |  ✓             |                        |                            |                    |
| Arduino Pro Micro ATmega32U4 x 2 |  ✓             |                        |                            |                    |
| Keyswitches x 66-70              |  ✓             |                        |                            |                    |
| Keycaps x 66-70                  |  ✓             |                        |                            |                    |
| 1N4148 diode x 66-70             |  ✓             |                        |                            |                    |
| TRRS Cable x 1                   |  ✓             |                        |                            |                    |
| [Cushion for case / tenting bottom](https://www.amazon.co.jp/gp/product/B07PLQMK4C/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1) 8~10mm diameter x 8| ✓ |
| :---------------------------:    | :------------: | ---------------------: | :----------------:         | :----------------: |
| 470 Ohm Resistor x 66~70         |                |  ✓                     |                            |                    |
| 1K Ohm Resistor x 2              |                |  ✓                     |                            |                    |
| LED 3mm x 66~70 (Backlight, not SMD) |            |  ✓                     |                            |                    |
| NchMOSFET IRLML6344TRPbF × 2     |                |  ✓                     |                            |                    |
| LED WS2812B × 24                 |                |  ✓                     |                            |                    |
| :---------------------------:    | :------------: | ---------------------: | :----------------:         | :----------------: |
| [M5 x 16mm Bind Scew](https://wilco.jp/products/F/FB-EB.html#page6) x 4 | | |  ✓                        |                    |
| [M5 x 20mm Bind Scew](https://wilco.jp/products/F/FB-EB.html#page6) x 4 | | |  ✓                        |                    |
| [M5 x 30mm Flat head Scew](https://wilco.jp/products/F/FF-EB.html#page6) x 4 | | |  ✓                   |                    |
| [M5 x 6mm non screwable spacer](https://wilco.jp/products/F/CF-0000E.html#page5) x 8 | | |  ✓           |                    |
| [M5 x 25mm hexagonal spacer](https://wilco.jp/products/F/ASF-0000E.html#page4) x 4 | | |  ✓             |                    |
| [M5 x 4mm Nut](https://wilco.jp/products/F/FNT-EB.html#page1) x 4       | | |  ✓                        |                    |
| [M5 x 0.125mm screw cushion](https://wilco.jp/products/LL/LL.html#page8) x 32| | |  ✓                   |                    |
| :---------------------------:    | :------------: | ---------------------: | :----------------:         | :----------------: |
| [Mill-Max 0305 Holtite sockets](https://keycapsss.com/keyboard-parts/parts/73/mill-max-0305-holtite-for-switches-hotswap-sockets?number=KC10042_50x) × 150  | |  |  | ✓  |

Note that the links are provided mostly to give an idea of the part and its dimensions.
Ultimately, the acquisition method is dependent on the geographical location.
{: .text-justify}

# Part selection and planning
Before ordering the switches. keycaps and LEDs for the backlight, it was quite useful to plan their respective layout using a mock design.
This namely took the form of the following final picture, which was the result of experimenting with various configuration, for example, the type and the position of the switches, the type of keycaps and such, while at the same time balancing their respective cost (Khail Copper switches were ~30% more expensive than the Khail Box brown ones, and were each sold in sets of 10, the best offer I could find.)
Also, following the key switches selection was inspired following this [reddit thread comment](https://www.reddit.com/r/MechanicalKeyboards/comments/bvm3pe/my_first_build_ergodash_with_hotswappable/epqo9md?utm_source=share&utm_medium=web2x), but made relatively cheaper: the copper speed for the alphanumeric and common symbols keys for faster typing speed, the more stable Khail BOX Brown for stability of the 2U keys and those that are likely to be held down for long period of times (Shift, Control, Meta, etc...).
{: .text-justify}

<figure class="one">
    <a href="/assets/projects/ergodash_build/ergodash-layout-Build1.png"><img src="/assets/projects/ergodash_build/ergodash-layout-Build1.png"></a>
    <figcaption>Mock design before ordering the parts. Planning the keycaps color, switches and LED arrangement. Light brown are Khail Copper swiches, Dark Brown Khail Box Switches</figcaption>
</figure>

The same process also went into selecting the keycaps and the amount of LED to order for the build.
All this was also done while thinking of the optimal way to order the various components to strike a good trade-off between the actual cost of the keyboard, the quality of its components, the delivery cost and the time needed for delivery of said parts.
{: .text-justify}

# Building order and notes
**DISCLAIMER** This should not be considered as a build guide, but just additional reference with some potential problems that do not necessarily appear at the conceptual level when planning the keyboard build.
It is more of an attempt to document what worked well for me, as well as the mistakes made along the way.
{: .notice--danger}
{: .text-justify}

## 1. Diodes and resistors

Mounting the diodes, 1K, and 470 Ohm resistors ( if using backlight) is pretty straightforward.
Using some kind of sign to not mess up the underside and upper board for each of the left and right boards is recommended.
Otherwise, one might end up with two left or two right-hand boards if not careful enough.
{: .text-justify}

<figure class="one">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200730_023400.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200730_023400.jpg"></a>
    <figcaption>Blue sticker for underboard, red one for upper board. Usefull to avoid confusion when no components are moounted yet.</figcaption>
</figure>

For the diodes, as per the official guide, it is important to align the black stripe leg with the square holes, and the other leg in the round one.
The resistors, on the other hand, can be mounted without a specific orientation, into the slots with both round holes.
{: .text-justify}

<figure class="half">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200730_030414.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200730_030414.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200730_042415.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200730_042415.jpg"></a>
    <figcaption>Left board diodes and resistor setup</figcaption>
</figure>

For efficiency, I found it useful to first insert all the diodes or resistors while bending and pre-trimming their legs on the other side, then flipping the border and soldering them in one pass.
{: .text-justify}
Double-checking, and even triple-checking the orientation of the diodes especially is advised before going to the soldering phase.
Final trimming after everything is soldered.
{: .text-justify}

<figure class="half">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200730_042511.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200730_042511.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200730_042516.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200730_042516.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200730_042604.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200730_042604.jpg"></a>
    <figcaption>Left board diodes and resistor setup. Backside with bent legs and final result.</figcaption>
</figure>

## 2. Mill-Max 0305 receptacles (Switch hot-swap, optional)

Experimented with a few methods, namely:
- Mounting the diodes and the resistors first, then the receptacles. Unfortunately, doing it in this order made it hard to solder the receptacles since the already installed diodes and resistors elevated the board from the soldering board, making it hard to get the receptacles to sit flat in the holes. (Did this on the left board at first)
- Installing the receptacles first (right board) then the diodes and resistor later, to mitigate the problem that occurred when mounting the left board as expended above. Despite the board being flattened down on the working mat, it was still hard to get the alignment of the receptacles right.
{: .text-justify}

The final strategy to set up the Mill-Max receptacle efficient and with optimal accuracy, with either diodes and resistors already mounted or not, was to first set all the receptacles for one board, then insert the switches as it is.
Then, using a cardboard to press on the switches on top, flip the board to get access to the underboard where we solder the receptacles.
When soldering the receptacle, press down the board until the switches are all the way done.
This makes sure that not only the receptacles are well aligned with the switch legs, but that they sit nicely and as closely as possible to the board.
Once done, remove and store away the switches to continue mounting the other components.
{: .text-justify}

The final result on the right board which got the receptacles installed first is as follows. The left board already had diodes installed before the receptacles were soldered on with the help of the switches as a support, but the results were the same anyway.
{: .text-justify}

<figure class="one">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200801_061006.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200801_061006.jpg"></a>
    <figcaption>Left upperboard after Mill Max receptacle intallation.</figcaption>
</figure>

<figure class="half">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200801_170325.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200801_170325.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200801_170315.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200801_170315.jpg"></a>
    <figcaption>Right underboard and upperboard after Mill Max receptacle installation. This was done before installing the diodes and the resistors.</figcaption>
</figure>

## 3. RGB Underglow Leds (Optional)

The RBG LEDs being quite light, and its pad quite small, soldering them can be quite challenging.
Inspired from the original building guide, it was quite useful and efficient to set all the LED down with some tape so they hold onto the board well enough, with the pad properly aligned.
To be able to do all the soldering in one go, cutting a slim piece of tape so that all the 4 pads are exposed was quite useful.
Regarding the soldering itself, with a standard soldering tip, first putting the tin on the pad and the board, then quickly touching it with the soldering iron was enough.
This was even better than I expected as I had a bad experience soldering really small components back when I used a really old and thick tip iron.
{: .text-justify}

<figure class="one">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200801_054836.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200801_054836.jpg"></a>
    <figcaption>Underglow LED preinstalled with fine tape so as to expose all the pads at the same time and solder in one go.</figcaption>

    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200801_060307.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200801_060307.jpg"></a>
    <figcaption>All underglow LED soldered. Mosfet is also included, albeit a litte bit quite hard to see: upper left of the "ErgoDash Rev 1.2" label.</figcaption>
</figure>

## 4. Mosfet for Undeglow / Backlight (Optional)

Similarly to the underglow LED, pre-installing the Mosfet with some tape to hold it down was useful.
Given its small size, however, first set the tape to cover the side with only one pin. This way, soldering the two pads on the other side is more stable.
Then remove the tape, and solder the remaining pad.
Soldering procedure with standard iron tip size is the same as with the underglow LED: first approach the tin to the pad and the board, then a quick touch with the iron tip and it holds it down.
See the latest picture above.
{: .text-justify}

## 5. Shorting the jumpers to designated left and right-hand board

This part can be a little bit confusing given that the way connect the pad depends on which version of the board is owned (rev 1.1 or 1.1).
After a bit of trial and error, what happened to work was to just follow the top instruction of the guide, namely to fform that "z"-shaped Tetris block and have them facing each other when the boards are flipped upside down. (Board Revision 1.2)

<figure class="half">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200812_162052.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200812_162052.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200812_162059.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200812_162059.jpg"></a>
    <figcaption>Left underboard pads (Left) and right underboard pads (Right)</figcaption>
</figure>

## 6. TRRS Jack and Reset switch

Probably one of the easiest parts. Both are to be inserted on the underside of the board, then soldered on the upper side.
No particular comments.

## 7. Backlight 3mm LED (Optional)

Similarly to the diodes, first inserted them all and bent only one leg so they do not fall off when the board is flipped for soldering.
Then, after flipping the board, pull the LED by the leg until it sits flat on the other side of the board, then soldered both legs, while pressing the LED from the other side with a finger.
Once all the LEDs were submitted to such a process, trim the legs for the final result.

<figure class="half">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_120501.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_120501.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_120505.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_120505.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_120514.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_120514.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_132451.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_132451.jpg"></a>
    <figcaption>LED legs forest before soldering them (Right underboard)</figcaption>
</figure>

<figure class="one">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_132442.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_132442.jpg"></a>
    <figcaption>All LED set on the right upperboard, soldered underboard.</figcaption>
</figure>

## 8. Pro Micro and its headers

**Warning** Soldering the Pro Micro on is a no-going back operation, as desoldering it down is quite difficult (speaking from experience).
The danger here is that for each board, two switches as well as their corresponding LED have to be soldered in a location the Pro Micro covers afterward.
It is therefore important to make sure that especially those key switches are soldered (in case no hot-swapping is used), and their LEDs also installed BEFORE soldering on the Pro Micro.
Furthermore, soldering the switches requires to install the upper side of the case. Therefore, the build order when not using hot-swappable switches is drastically different.
{: .notice--warning}
{: .text-justify}

First installing and soldering the headers of the pro micro on the underside of each board.
Then, after sliding the Pro Micro at the appropriate height on the header pins, we solder again.
{: .text-justify}

To avoid the switch receptacle touching the Pro Micros, I first made the mistake of setting the latter too high. By the time I realized the mistake however, it was already too late, as the Pro Micro were virtually impossible to desolder: an overly elevated Pro Micro results being unable to properly flatten the last, smallest part of the sandwich case that is supposed to cover the Pro Micro itself.
In this case, it was still possible of closing the case completely, but at the price of that last small part bowing slightly, depending on the elevation of the Pro Micro ...
{: .text-justify}

<figure class="one">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200812_165205.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200812_165205.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200812_165235.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200812_165235.jpg"></a>
    <figcaption>Slightly over-raise Pro Micro resulting in the bottom part of the case bowing and touching with the pins.</figcaption>
</figure>

In retrospect, probably not that big of a deal, but it kept me awake for a few nights.
{: .text-justify}

## 8.5 Testing the boards

At this point, it should probably be better to test the board to make sure that it works, and fix up the potential flaws before assembling the case.
It might be useful to flash the firmware at this step and set up a few keys to check that the RGB under low and backlight LEDs work, and that keystrokes are registered.
For this build, a wacky initial soldering of the pro micro pins resulted in only a few RGB under glow LED working at the same time, so it was easier to just fix it during this testing phase, rather than disassembling the whole case, which might not even be possible if you are not using hot swapping.
Also had to change a LED that was not working out of the box.
{: .text-justify}

<figure class="one">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200801_142242.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200801_142242.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200801_152914.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200801_152914.jpg"></a>
</figure>

## 9. Case assembly

No particular comment here. Note, however, that the upper side of the case must be installed before even inserting and soldering the switches, so the order is really important.
{: .text-justify}

<figure class="one">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_151834.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_151834.jpg"></a>
</figure>

<figure class="half">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_161116.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_161116.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_165327.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_165327.jpg"></a>
</figure>


## 10. Tenting screws assembly and switch mounting

Last but not least, the screws and standoff for the tenting solutions can be set, with a cushion pad on the bottom to not ruin the desk.
Another mistake when ordering the screws was failing to taking into account the additional 3mm thickness the smallest part of the case add, and ending up with 4 screws of the appropriate length (16mm) missing.
Besides that, the key switches can be easily installed or removed thanks to the hot-swapping support.
{: .text-justify}

<figure class="half">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_165235.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_165235.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_165703.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_165703.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_165346.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_165346.jpg"></a>
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_161656.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_161656.jpg"></a>
</figure>

<figure class="one">
    <a href="/assets/projects/ergodash_build/BuildLog/IMG_20200802_170341.jpg"><img src="/assets/projects/ergodash_build/BuildLog/IMG_20200802_170341.jpg"></a>
    <figcaption>Whoops, some n00d5 again tee-hee ;)</figcaption>
</figure>

# Firmware Flash Notes

After [installing the QKM Toolbox](https://docs.qmk.fm/#/getting_started_build_tools), clone the [qmk_firmware] repository somewhere on the hard drive. (Current procedure assumes Linux system.)
Then, after accessing said repository's directory via the command line, running `qmk setup` will set that working directory (the previously cloned `qmk firmware` folder) will set it as the default folder `qmk` will compile and flash keymaps from.
Additionally, setting the following configuration variable saves us some time downstream.
{: .text-justify}

```
qmk config user.keyboard=ergodash/rev1

qmk config user.keymap=dosssman
```

Next, as suggested by the last command above, we need the corresponding `dosssman` keymap folder, which has to be created in  `/path/to/qmk_firmware/keyboards/ergodash/rev1/keymaps/`.
For convenience, copying the  `default` folder in that same `.../ergodash/rev1/keymaps/` folder, then renaming it the profile name (dosssman in this case) is recommended.
{: .text-justify}

Next comes in the layout configuration, which can be done either using the [QMK Online Configurator](https://config.qmk.fm/#/ergodash/rev1/LAYOUT) or the GUI QMK Toolbox provided for Windows and macOS systems.
Once the layout is configured, and the corresponding `.json` configuration file downloaded, the Pro Micro can be flashed by running
{: .text-justify}

```
qmk flash /path/to/keymap_configuration.json
# Note: this assumes the user.keyboard and user.keymap are configured,
# otherwise they need to be specified using the corresponding arguments
```

When mapping mouse keys, the appropriate build rules had to be updated in the `.../qmk_firmware/keyboards/ergodash/rev1/keymaps/dosssman/rules.mk` file.
The content as of the final version I use (Mouse and Extra Keys enabled) is as follows:

```
BACKLIGHT_ENABLE = yes
RGBLIGHT_ENABLE = yes
AUDIO_ENABLE = no
EXTRAKEY_ENABLE = yes
MOUSEKEY_ENABLE = yes
```

Note that with the `EXTRA_KEY` set to yes, one can configure the keyboard itself to switch either the backlight or the underglow directly, using a combination of keys.

And that is pretty much it.
