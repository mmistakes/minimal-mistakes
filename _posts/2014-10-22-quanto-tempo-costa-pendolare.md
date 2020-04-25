---
title: "Quanto tempo costa pendolare"
#tags:
#  - italian
#  - train
#  - commute
#  - data
#  - italy
#  - data-science
excerpt: Data visualisation sui dati del treno Roma-Tivoli e viceversa
---

In questo post parliamo di treni. Fino all'estate scorsa vivevo a Tivoli, un'allegra cittadina in quel di Roma di cui però parlerò un'altra volta. Per andare a Roma ogni giorno prendevo il treno.

Mi son messa a registrare i ritardi giorno per giorno (talvolta mi dimenticavo però), sia del treno di andata (Tivoli - Roma Termini, 7.59 - 8.45) che di quello di ritorno (Roma Tiburtina - Tivoli 18.33 - 19.06). Questi almeno sono gli orari da tabellone.

Il ritardo (o anticipo, nel caso di valori negativi) che riporto in figura è misurato come il numero di minuti di differenza con l'orario stabilito di arrivo, a prescindere dall'eventuale ritardo in partenza. Non tutti i punti sono comunicanti perché c'è stata qualche mia dimenticanza. Inoltre ho smesso di prendere dati a marzo 2014 perché a quel punto ho cambiato treni.

![ritardi](https://plot.ly/~MartinaPugliese/2/treno-tivoli-roma-e-viceversa-ritardi-in-t.png)

Tutto sommato sembra forse meglio delle aspettative pregiudiziali, a parte alcune volte (vedi quel 70 al ritorno). Vediamo gli istogrammi dei ritardi.

![istog-ritardi](https://plot.ly/~MartinaPugliese/3/istogrammi-dei-ritardi.png)

Infine, lo scatter plot dei due ritardi, si vede bene che gli anticipi pertengono all'andata.

![scatter-ritardi](https://plot.ly/~MartinaPugliese/4/scatter-plot-dei-ritardi.png)
