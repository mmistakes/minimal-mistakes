---
permalink: /docs/arduino
title: "Arduino"
tags: Arduino Programmierung ESP8266 Wemos
author_profile: true
author: Diego
comments: true
---
## Arduino-Entwicklungs-Werkzeuge installieren

Am komfortabelsten lässt es sich am Pi mit Arduinos mit [PlatformIO](http://platformio.org/) arbeiten.

### Installation

Zuerst [Linuxbrew](http://linuxbrew.sh/) installieren:

    $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install)"
    $ PATH="$HOME/.linuxbrew/bin:$PATH"
    $ echo 'export PATH="$HOME/.linuxbrew/bin:$PATH"' >>~/.bash_profile

Jetzt kann mit Linuxbrew PlatformIO installiert werden:

    $ sudo apt-get update
    $ brew install platformio

## Wemos D1 Mini (Pro)
<figure class="align-center" style="width: 100%;">
	<a href="/assets/images/docs/wemos-d1-mini.jpg"><img src="/assets/images/docs/wemos-d1-mini.jpg" alt="Foto eines Wemos-D1-mini-Boards"></a>
	<figcaption>Wemos D1 mini <i>(<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> Diego Jahn)</i></figcaption>
</figure>

### Board anschließen

Vor dem Anschließen, System-Logs anzeigen lassen:

    $ tail -f /var/log/syslog

Wenn das Board per USB angeschlossen wird, sollte u. a. eine ähnliche Zeile wie diese hier dabei sein:

    Mar 14 00:17:14 bastelpi kernel: [ 4376.415714] usb 1-1.2: ch341-uart converter now attached to ttyUSB0

Das Board ist also in diesem Fall Gerät ```ttyUSB0```. Man findet es auch mit dem Befehl ```ls -l```:

    $ ls -l /dev/ttyUSB*
    crw-rw-rw- 1 root dialout 188, 0 Mär 14 00:17 /dev/ttyUSB0
