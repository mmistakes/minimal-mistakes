---
permalink: /docs/arduino/platformio/
title: "PlatformIO"
# tags: Arduino Programmierung ESP8266 Wemos PlatformIO
author_profile: true
author: Diego
comments: true
header:
    teaser: /assets/images/docs/wemos-d1-mini_400x300px.jpg
---
{% include toc %}

[PlatformIO](http://platformio.org) ist eine kommandozeilen-basierte Entwicklungsumgebung (es gibt auch eine [grafische IDE](http://platformio.org/get-started/ide)), mit der sich sehr komfortabel verschiedenste Mikrocontroller-Boards im Handumdrehen programmieren lassen. PlatformIO sorgt dafür, dass alle nötigen Tools, die für das entsprechende Board gebraucht werden, installiert werden. Auch [Arduino-Bibliotheken](http://platformio.org/lib) lassen sich sehr leicht nachinstallieren.

## PlatformIO installieren


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
Vor dem Anschließen System-Logs anzeigen lassen:

    $ tail -f /var/log/syslog

Wenn das Board per USB angeschlossen wird, sollte u. a. eine ähnliche Zeile wie diese hier dabei sein:

    Mar 14 00:17:14 bastelpi kernel: [ 4376.415714] usb 1-1.2: ch341-uart converter now attached to ttyUSB0

Das Board ist also in diesem Fall Gerät ```ttyUSB0```.

{% capture notice-dev %}
**Tipp**

Man findet das Board auch mit dem Befehl ```ls -l```:

    $ ls -l /dev/ttyUSB*
    crw-rw-rw- 1 root dialout 188, 0 Mär 14 00:17 /dev/ttyUSB0
{% endcapture %}

<div class="notice--info">
  {{ notice-dev | markdownify }}
</div>

### Neues Arduino-Projekt anlegen
Zuerst legen wir einen neuen Ordner für unser Projekt an.

    $ mkdir hello-world

Mit ```$ platformio boards``` können wir uns alle von PlatformIO unterstützten Boards anzeigen lassen. Weil da jede Menge Geräte gelistet werden, ist es sinnvoll, die Ausgabe auf die gesuchte Plattform einzugrenzen, in diesem Beispiel auf den Hersteller "WeMos".

    $ platformio boards | grep WeMos

Wir erhalten dann folgende Ausgabe:

    $ platformio boards | grep WeMos
    d1                    ESP8266        80Mhz     4096kB  80kB   WeMos D1(Retired)
    d1_mini               ESP8266        80Mhz     4096kB  80kB   WeMos D1 R2 & mini

Unser neues Projekt legen wir an mit:

    $ platformio init --board d1_mini

{% capture notice-ausgabe %}
**Tipp**

Die Ausgabe verrät schon alle wichtigen Informationen, die wir für die Programmierung des Boards brauchen:

    The next files/directories have been created in /home/pi/coding/arduino/nodemcu/wemos/cansat-2017/hello-world
    platformio.ini - Project Configuration File
    src - Put your source files here
    lib - Put here project specific (private) libraries

    Project has been successfully initialized!
    Useful commands:
    `platformio run` - process/build project from the current directory
    `platformio run --target upload` or `platformio run -t upload` - upload firmware to embedded board
    `platformio run --target clean` - clean project (remove compiled files)
    `platformio run --help` - additional information
{% endcapture %}

<div class="notice--info">
  {{ notice-ausgabe | markdownify }}
</div>

In den neu entstandenen Ordner ```src``` muss die Ino-Datei (hier darf es nur eine mit der Endung ".ino" geben).

{% capture notice-ls %}
**Tipp**

Du kannst überprüfen, ob die o. g. Ordner alle angelegt worden sind, indem du ```ls -l```eingibst.

    $ ls -l
    insgesamt 12
    drwxr-xr-x 2 pi pi 4096 Mär 15 08:22 lib
    -rw-r--r-- 1 pi pi  439 Mär 15 08:22 platformio.ini
    drwxr-xr-x 2 pi pi 4096 Mär 15 08:22 src
{% endcapture %}

<div class="notice--info">
  {{ notice-ls | markdownify }}
</div>

Mit den Befehlen ```platformio run``` kompiliert man das Programm. Gibt man ```platformio run --target upload``` ein, wird das Programm nicht nur übersetzt, sondern auch direkt auf das Board geladen und dort ausgeführt. Letzterer vereint also praktischerweise das Kompilieren und die Übertragung aufs Board. Diesen Befehl wirst du somit in aller Regel am häufigsten brauchen.

{% capture notice-pio %}
**Tipp**

Du kannst statt ```platformio``` auch den kürzeren Alias ```pio``` eingeben, bspw.

    $ pio run --target upload
{% endcapture %}

<div class="notice--info">
  {{ notice-pio | markdownify }}
</div>
