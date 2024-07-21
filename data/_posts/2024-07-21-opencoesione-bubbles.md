---
title: OpenCoesione, progetti conclusi e costi 
tags:
  - italy
  - italiano
  - eu
  - eu projects
categories: data
excerpt: Looking at the differences between predicted and effective realisation
---

Questa è la seconda della serie di data cards (visualizzazioni delle mie fatte a mano) che sto facendo per il progetto [AwareEU](https://www.infonodes.org/awareeu) assieme agli amici di [Ondata](https://www.ondata.it/). Il mio contributo mira a realizzare visualizzazioni sui dati di [OpenCoesione](https://opencoesione.gov.it/it/), il portale istituzionale italiano che raccoglie e rende accessibili i dati sui progetti di coesione dell'Unione Europea, ovvero quei fondi mirati a livellare economia e welfare delle regioni europee. Nella [prima viz](https://martinapugliese.github.io/data/opencoesione-delays/) mi sono occupata dei progetti a tema ambiente del ciclo 2014-2020 (l'ultimo concluso, ad oggi) e sono andata a guardare, per ciascuna regione italiana, la percentuale di progetti completati e la distribuzione di ritardi per quelli conclusi oltre il tempo previsto.

Qui ho considerato ancora lo stesso ciclo, 2014-2020, e i progetti per i temi "ambiente" e "inclusione sociale e salute". Ho seguito la stessa procedura in termini di raccolta dati, vale a dire ho scaricato e usato i CSV compilati da OpenCoesione. Nella viz dell'altra volta ho spiegato brevemente come la piattaforma presenta i dati. 

## La data card 

La viz è un grafico piuttosto classico, un "bubble plot". Per le due serie di dati, cioè i due temi, ho aggregato i dati per regione. Su x ho messo la percentuale di progetti conclusi (ad oggi) e su y il finanziamento totale dalle politiche di coesione. Ogni regione è una bolla di taglia pari al numero di progetti finanziati in totale per quel tema.

<figure class="responsive">
  <img src="{{ site.url }}{{site.posts_images_path}}oc-bubbles.jpg" alt="Data viz fatta a a mano che presenta un grafico con % di progetti completati sull'asse x e costo su y. Ogni punto è una regione italiana, rappresentata da un cerchio di taglia pari al suo numero di progetti totali. Son rappresentate due serie di dati: i progetti a tema ambiente e quelli a tema inclusione sociale/salute.">
  <figcaption>Progetti delle politiche di coesione UE a tema ambiente e inclusione sociale/salute per le regioni italiane, il grafico riporta il costo complessivo dei progetti e la percentuale di completamento, e le bolle (una per regione) hanno grandezza proporzionale al numero di progetti, indicato orientativamente dalla legenda in basso.</figcaption>
</figure>

Nota: per il tema ambiente i dati sull'asse x sono esattamente quelli con cui ho ordinato le regioni nella [scorsa viz](https://martinapugliese.github.io/data/opencoesione-delays/). 

Quello che si nota immediatamente è che **i progetti di inclusione sociale/salute sono generalmente più copiosi**: le bolle sono più grosse di quelle del tema ambiente. **Tendono anche a venire conclusi in percentuali più alte**, infatti le bolle arancioni sono spostate tendenzialmente più a destra rispetto a quelle verdi, e ci sono diverse regioni con percentuali molto alte. 

Inoltre, mentre **nel caso delle bolle verdi le regioni del Sud hanno chiaramente più progetti** (sono le più grosse, Campania e Sicilia in particolare hanno il maggior numero di progetti, più di 1500 ciascuna), nel caso di quelle arancioni la differenza Nord-Sud non si vede, abbiamo infatti la Lombardia in cima con più di 8000 progetti, seguita dalla Sardegna con più di 7000, e poi a seguire le altre. Per questo tema ci si aspetterebbe una certa correlazione con la taglia della popolazione della regione (popolazione maggiore implicherebbe intuitivamente un maggior numero di progetti di stampo sociale), che non sembra vedersi però (ci sarà, ma debole). Chiaramente non è solo la taglia di una popolazione che determina la necessità di aiuti finanziari, ci sono complessi fattori economici e sociali in interazione.

Il numero di progetti va appunto dai circa 8000 della Lombardia per inclusione sociale/salute ai circa 10 della Valle d'Aosta per ambiente. 

Per quanto riguarda i costi finanziati, prima di tutto notiamo che l'asse y porta i dati in scala logaritmica, cioè spaziati di ordine di grandezza e non linearmente, il che significa che graficamente la distanza tra 10 e 100 è la stessa che tra 100 e 1000, per esempio. La scelta è un artificio grafico, serve a due cose:
1. riuscire a rappresentare agevolmente dati che spaziano di molto tra minimo e massimo,
2. riuscire a vedere meglio le differenze tra quei punti che si accavallano nella stessa zona, per esempio tutte le regioni attorno a $$10^8$$ (100 milioni), che in scala lineare apparirebbero troppo vicini per essere distinti.

**Il grosso delle regioni sta nella banda tra i 100 milioni ($$10^8$$) e il miliardo ($$10^9$$)**. Notiamo la Valle d'Aosta (la regione [più piccola](https://www.tuttitalia.it/regioni/superficie/)) con il finanziamento meno sostanzioso di tutte per entrambi i temi (e anche il minor numero di progetti).

Tra parentesi, ho cercato di scegliere i colori dei due temi in modo da creare un facile rimando mentale - non mi andava di usare la classica combinazione rosso/blu perché spesso si usa per differenze politiche. Ovviamente per "ambiente" è immediato scegliere il verde; per l'altro tema, non essendo così evocativo di un particolare colore, la scelta è caduta su uno che creasse una differenza ben visibile. 

## References
* Il mio Jupyter [notebook](https://nbviewer.org/github/martinapugliese/doodling-data-cards/blob/master/opencoesione/oc_ambiente.ipynb) su questo lavoro 
* [Slides](https://docs.google.com/presentation/d/1KV57lAFSVfjmO6XHeZ5vH9FtiIFrikJ4BxMPwQB6zGA/edit#slide=id.g2e7a510a23c_8_0) del workshop che ho tenuto per AwareEU a giugno 
* Il [video](https://www.youtube.com/watch?v=__0CPTtp70w&t=2s&ab_channel=infonodes) del workshop stesso, dove ho parlato di come creo le mie visualizzazioni
* [La newsletter di Ondata](https://ondata.substack.com/)

---

*Spero questo post vi sia piaciuto e vi abbia detto qualcosa che non sapevate. Condivido queste visualizzazioni, di solito su temi leggeri e principalmente in inglese, nella mia newsletter, ci si può iscrivere qui:*

<iframe
scrolling="no"
style="width:100%!important;height:220px;border:1px #ccc solid !important"
src="https://buttondown.email/martinapugliese?as_embed=true"
></iframe><br /><br />
