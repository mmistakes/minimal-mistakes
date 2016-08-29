---
title: "Email Encryption"
permalink: /software/
excerpt: "Email Encryption"
modified: 2016-08-15T15:00:00-00:00
---

{% include base_path %}

{% include toc %}

All email applications on this page support the OpenPGP standard either directly or with additional software.
The authors of this webpage are not actively participating in the development of each of these third-party apps.
No security audits have been done by us and, thus, we cannot provide any security guarantees.

## Windows
* Outlook: [Gpg4Win](https://www.gpg4win.de) with [GpgOL](https://www.gpg4win.org/about.html)
* Outlook: [gpg4o](https://www.giepa.de/produkte/gpg4o/)
* Outlook: [p≡p](https://prettyeasyprivacy.com)
* [Thunderbird](https://www.mozilla.org/de/thunderbird/): [Enigmail](https://enigmail.net)

## Mac OS
* Apple Mail: [GPGTools](https://gpgtools.org)
* [Thunderbird](https://www.mozilla.org/de/thunderbird/): [Enigmail](https://enigmail.net)

## Android
* [K-9 Mail](https://k9mail.github.io/): [OpenKeychain](http://www.openkeychain.org)
* [p≡p](https://prettyeasyprivacy.com)
* [R2Mail2](https://r2mail2.com)

## iOS
* [iPGMail](https://ipgmail.com/)

## GNU/Linux
* [Evolution](https://wiki.gnome.org/Apps/Evolution): [GnuPG](https://gnupg.org)/[Seahorse](https://wiki.gnome.org/action/show/Apps/Seahorse)
* [KMail](https://www.kde.org/applications/internet/kmail/): [GnuPG](https://gnupg.org)/[Kleopatra](https://www.kde.org/applications/utilities/kleopatra/)
* [Thunderbird](https://www.mozilla.org/de/thunderbird/): [Enigmail](https://enigmail.net)

## Browser Plugins
* [Mailvelope](https://www.mailvelope.com)

## Webmail Provider with Browser Plugins
The following webmail providers support email encryption via the OpenPGP standard using browser plugins.

* [GMX](http://www.gmx.net/) (Mailvelope)
* [mailbox.org](https://mailbox.org/) (Mailvelope, also In-Browser Cryptography)
* [POSTEO](https://posteo.de) (Mailvelope)
* [WEB.DE](http://web.de/) (Mailvelope)

## Webmail Provider with In-Browser Cryptography
In contrast to the previous section, the following webmail providers do not require the installation of additional plugins, instead JavaScript cryptographic libraries are served by the website itself.
While these are easier to set up and provide basic security guarantees with OpenPGP, [some people don't consider this "end-to-end"](https://tonyarcieri.com/whats-wrong-with-webcrypto).

* [Hushmail](https://www.hushmail.com/)
* [ProtonMail](https://protonmail.com/)

## Gateways
* [Symantec PGP Encryption Software](https://www.symantec.com/de/de/encryption/)

## Project Missing?
If a project is missing and you would like it included, please open a pull request at [github.com/OpenPGP/openpgp.github.io](https://github.com/OpenPGP/openpgp.github.io).
Please note that we only include published, working software, which implements the standard.
The software is ordered alphabetically within the sections.
