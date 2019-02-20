---
title: Installing Linux on Chromebook
excerpt: How to install linux on a Chromebook using Crouton
date: 2018-11-04 11:32:00 +0000
layout: single
categories: posts
tags:
 - linux
 - chromebook
---

key reference: [install-crouton-chromebook](https://www.codedonut.com/chromebook/install-crouton-chromebook/)


This guide walks through installing Linux on a Chromebook using [Crouton](https://github.com/dnschneid/crouton)


**Note:** I did this on a Toshiba Chromebook 2.  Your mileage may vary.
{: .notice--info}

## Enable Developer Mode
In order to install linux you have to enable developer mode. Note that this disables OS verficiation.

1. Enter recovery mode. 
 * Power off chromebook
 * press and hold [**ESC + Refresh + Power Button**] at the same time
 * You'll see a notice that says "Chrome OS is missing or damaged" (it's okay, don't worry)
 
2. Enable Developer Mode
 * On recovery screen above, press [**CTRL +D**]
 * Turn OS verification off by pressing [**Enter**]
 * When you see the warning about OS verification being off, press [**CTRL + D**] to skip it now and in the future

 ## Sign in to the Chromebook like normal
 You'll now be given a fresh boot of Chrome OS. Just log in like normal.

## Download Crouton
* Visit the [Crouton Site](https://github.com/dnschneid/crouton) and download the latest release
* Or click [here](https://goo.gl/fd3zc)

## Bring up the terminal
 1. Open the chrome browser
 2. Press [**CTRL + ALT + T**]
 3. Type **shell** at the command line:
```bash
crosh> shell
```

## install crouton
There are a lot of options for installing crouton. The docs are pretty good, so I'm not going to go into all of them. The following is what is what I typically do.

```bash
$ sudo sh ~/Downloads/crouton -r bionic -t xfce,extension
```

This installs crouton with:
* -r (release): Ubuntu 18.04 LTS
* -t (xfce): xfce desktop environment
* -t (extension): browser extension

## start ubuntu
In the shell, type the following
```bash
$ sudo startxfce4
```

## Additional configuration
#### Touchpad issues
key reference: [Touchpad_Synaptics](https://wiki.archlinux.org/index.php/Touchpad_Synaptics)

1. pre-req: install synaptics drivers for xorg
```bash
$ sudo apt-get install xserver-xorg-input-synaptics
```
2. get touchpad config file in the right place
```bash
$ cd /etc/X11
$ sudo mkdir xorg.conf.d
$ cd xorg.conf.d
$ cp /usr/share/X11/xorg.conf.d/70-synaptics.conf .
```
3. Edit that file and add this just after the first section
 * details here: [Touchpad_Synaptics#Configuration](https://wiki.archlinux.org/index.php/Touchpad_Synaptics#Configuration)

 ```bash
    Section "InputClass"
        Identifier "touchpad catchall"
        Driver "synaptics"
        MatchIsTouchpad "on"
            # these three fix the tap-to-click
            Option "TapButton1" "1"
            Option "TapButton2" "3"
            Option "TapButton3" "2"
            Option "MaxTapTime" "125"
            # these two add 'natural scrolling'
            Option      "VertScrollDelta"          "-111" 
            Option      "HorizScrollDelta"         "-111"
    EndSection
```

#### Volume, brightness keys
In order to get the brightness and volume keys to work, do the following in the chrome OS shell (not from Ubuntu)

```bash
$ sudo sh -e ~/Downloads/crouton -r bionic -t keyboard -u
```
You can now enable these keys by pressing the **Search** button and then the approprate key (ex: brighness)

## Other Fun customizations
#### Installing oh-my-zsh
I like the oh-my-zsh terminal setup found [here](https://github.com/robbyrussell/oh-my-zsh)

```bash
$ sudo apt-get install git
$ sudo apt-get install zsh
$ <run wget install from site above>
```

Fix locale
```bash
$ sudo locale-gen en_US.UTF-8
$ sudo update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
```

Alternate fix for locale
```bash
$ sudo locale-gen en_US en_US.UTF-8
$ sudo dpkg-reconfigure locales
```

Now I like the agnoster theme for this.
1. install powerline fonts
```bash
$ sudo apt-get install fonts-powerline ##requires reboot
```
2. install theme
 Set them to 'agnoster' in ~/.zshrc

3. install zsh-syntax-highlight
https://github.com/zsh-users/zsh-syntax-highlighting

## Conclusion
Have fun in linux on your chromebook!

## References
* https://www.codedonut.com/chromebook/install-crouton-chromebook/
* https://github.com/dnschneid/crouton
* https://medium.freecodecamp.org/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38
* https://github.com/zsh-users/zsh-syntax-highlighting
* https://github.com/robbyrussell/oh-my-zsh
* https://wiki.archlinux.org/index.php/Touchpad_Synaptics

