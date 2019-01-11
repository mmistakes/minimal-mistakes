---
title: "Organize photo library"
related: true
header:
  overlay_image: /assets/images/maico-amorim-57141.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/maico-amorim-57141.jpg
categories:
  - Computer
tags:
  - Linux
---

- [Environment](#environment)
- [Upload](#upload)
- [Consolidate](#consolidate)
- [Backups](#backups)
- [Show](#show)

### Environment

@startuml
[SonyA6000]
[Iphone1]
[Iphone2]
[Camera XTrem]

[Imac]

[SynologyNAS]
[DLinkDNS320]
[OVHServer]


[SonyA6000]-->[Imac]
[Camera XTrem]-->[Imac]

[Iphone1]--->[SynologyNAS]: DS Photo sync to "Last import"
[Iphone2]--->[SynologyNAS]: DS Photo sync to "Last import"


[Imac]--->[SynologyNAS]: Upload to "Last import"


[SynologyNAS]--> [DLinkDNS320]: Rsync
[SynologyNAS] --> [OVHServer]: Rsync
@enduml

### Upload

- Upload SD Card into Apple Photo in order to show all photos.
Select

- 2 ways
Use synoloy uploader in order to upload photo into Dernière importation folder

### Consolidate

LAST-IMPORT
YEAR
   YEAR-MONTH-DAY
        YEAR-MONTH-DAY-HOURMINUTESECOND_INCR.EXTENSION

ex:

Dernière importation
Iphone 1
Iphone 2
2018
    ...
    2018-10-09
        2018-10-09-056734_1.JPG
        2018-10-09-056734_2.JPG
        2018-10-09-076734_1.JPG
        ...
...

Execute scripts:

Consolidate Dernière Importation to library.
Automatically move all photo into the right directory.
If a as the same timestamp so an incrementation is made.

```code
./clean.sh -s false Dernière\ importation /volume1/photo

./clean.sh -s false iphone\ Lili/ /volume1/photo

./clean.sh -s false iphone\ Jo/ /volume1/photo
``

### Backups


One local backup in the DLinkDNS320
One distant backup in the OVH Server

Google photos backups


### Show

Access to DS Photo anywhere from anydevice`


You manage your library as you want. we aren't coupled with any applicaton
unlike using Apple photo, Microsoft or others.
