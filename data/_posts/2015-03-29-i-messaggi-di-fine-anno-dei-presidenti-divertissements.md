---
title: "I messaggi di fine anno dei presidenti della Repubblica: divertissements sui testi"
tags:
  - language
  - nlp
  - italian
categories: data
excerpt: Data visualisation sulle parole usate dai presidenti della Repubblica nei discorsi di fine anno
---

La Repubblica ha avuto finora 11 presidenti, più quello attualmente in carica, che non considerò qui nell'analisi perché mi riferisco ai mandati completati.
La tabella qui sotto riporta la successione di presidenti che abbiamo avuto, considerando gli anni di effettivo conferimento dei messaggi di fine anno (che quindi non concidono necessariamente con gli anni del mandato). De Nicola, il primo presidente della Repubblica, non compare perché la tradizione di presentare un messaggio di fine anno agli italiani inizia solo con Einaudi nel 1949. Dunque ci troviamo con 10 presidenti e con un numero di messaggi totali che non è 70 a causa del fatto che alcuni di essi sono durati per meno dei 7 anni canonici (Napolitano ha fatto il contrario invece).

I testi dei messaggi sono stati estratti dal [sito istutuzionale della presidenza della Repubblica](http://www.quirinale.it/).

| Presidente   | Primo messaggio  | Ultimo messaggio  |
| ------------ |:----------------:| -----------------:|
| Einaudi      | 1949             | 1954              |
| Gronchi      | 1955             | 1961              |
| Segni        | 1962             | 1963              |
| Saragat      | 1964             | 1970              |
| Leone        | 1971             | 1977              |
| Pertini      | 1978             | 1984              |
| Cossiga      | 1985             | 1991              |
| Scàlfaro     | 1992             | 1998              |
| Ciampi       | 1999             | 2005              |
| Napolitano   | 2006             | 2014              |

Il numero di messaggi totali che abbiamo è 66. La prima figura riporta il numero di parole totali profferite dai presidenti nei messaggi di fine anno durante tutta la loro vita presidenziale. Le barre blu sono le parole effettive (i conteggi), la linea arancione rappresenta invece i conteggi rapportati al numero di anni (ovvero di messaggi secondo la definizione adottata), questo al fine di normalizzare per il numero di occasioni che ciascuno ha avuto.

![parole-tot](https://plot.ly/~MartinaPugliese/181.png)

Scàlfaro è stato di gran lunga il più prolisso, se paragoniamo il suo totale normalizzato (3512) a quello del povero Einaudi (che è il più succinto con mediamente 201 parole per messaggio) vediamo un bel fattore 17.
Due sono le cose: o Einaudi era particolarmente avaro di chiacchiere oppure l'emozione di dover parlare ai cittadini della novella Repubblica per primo lo metteva vagamente in imbarazzo. Magari non era tipo da intrudersi nei focolari domestici della gente proprio alla fine dell'anno mentre tutti erano impegnati a godersi un po' di tranquillità post-guerra, con le tavole relativamente ricche rispetto a soli pochi anni prima.
Consideriamo pure che la RAI comincia a trasmettere in televisione nel 1954, quindi i messaggi di Einaudi immagino che andassero su radio (a parte l'ultimo, forse), e magari lui non era al corrente di quanta gente potesse avere interesse ad ascoltarlo quindi si teneva sullo stretto. Purtroppo non disponiamo dei dati storici circa il numero di ascoltatori.

Il numero di parole totali ci dice quanto parlavano, ma nulla afferma circa quanto i messaggi fossero variegati. Dobbiamo considerare, almeno per avere una rozza misura di questo, quante fossero le parole diverse. Ci aspettiamo tendenzialmente che il numero di parole diverse cresca col numero di parole totali, non solo perché è intuitivo ma anche perché risulterebbe piuttosto imbarazzante tenere la gente attaccata alla TV per mezz'ora e dire sempre (letteralmente) le stesse cose.

Il numero di parole diverse per ciascun presidente è riportato qui in figura, assieme alla curva normalizzata per numero di messaggi:

![parole-diverse](https://plot.ly/~MartinaPugliese/191.png)

Scàlfaro vince ancora, ma non alla grande stavolta. Napolitano, pur avendo una media di parole per messaggio più bassa (2258) presenta un bel numero di parole differenti medie (455, contro le 589 di Scàlfaro).
Einaudi ha un misero 94, ma ricordiamo che parlava poco quindi è chiaro che dicesse anche poco.
Segni ha trasmesso solo due messaggi agli italiani, e quindi le barre blu e verde delle due figure di sopra sono molto più distanziate da quelle degli altri, ma i valori normalizzati sono perfettamente in linea.

Vediamo ora che succede in ciascun messaggio (che qui identifico con il mandato). La prossima figura riporta il numero di parole totali per ciascun presidente in ciascuno dei suoi mandati, ho sovrapposto i mandati di ognuno dandogli un identificatore numerico.

![parole-mandato](https://plot.ly/~MartinaPugliese/249.png)

Cossiga ha un andamento interessante: durante l'ultimo messaggio (quindi il 31 dicembre 1991) si è veramente impegnato poco: il suo tassello è veramente strettino (nella fattispecie, ha articolato 418 parole e la sua media temporale è di 2018)!
Saragat è andato crescendo col tempo, possiamo forse ipotizzare che la maturità allunghi i discorsi, oltre a portare saggezza, o semplicemente aveva più e più da dire ogni anno (ha coperto il secondo lustro dei '60, magari con frigoriferi, lavatrici, Fiat 500 e altre amenità che divennero disponibili a molti nell'Italia di quegli anni voleva fare gli auguri con maggiore trasporto).
Ciampi ha tenuto un profilo grosso modo costante in quanto a numero di parole, assieme al solito Einaudi che, ormai l'abbiamo capito, non doveva amare molto i convenevoli.

Di nuovo, è interessante il numero di parole diverse per mandato per ciascuno dei nostri presidenti. Et voilà:

![parole-diverse-mandato](https://plot.ly/~MartinaPugliese/259.png)

Sulle cause dell'improvvisa caduta nelle parole di Cossiga non è dato sapere, quello che è più interessante è notare che sia Napolitano che Leone che Saragat presentano una curva sostanzialmente crescente mentre Pertini ha un simpatico pattern altalenante.
Anche sul perché Scàlfaro abbia sofferto di un'improvvisa penuria lessicale al suo quinto mandato (che si nota pure nel numero di parole totali nella figura di sopra) non possiamo che fare personali speculazioni.

Vediamo ora le 10 parole più frequenti per ciascun presidente:

![parole-diverse-mandato](https://plot.ly/~MartinaPugliese/296.png)

Per ogni presidente ho preso le 10 parole più frequenti, considerando l'intero corpus dei loro discorsi. La taglia delle bolle rappresenta il numero di conteggi per quella parola.
Ho eliminato il sostantivo "stato" in quanto passibile di ambiguità di significato.

Notiamo che diverse parole sono presenti e frequenti in tutti i presidenti: "anno", per esempio, il che non è sorprendente.
Anche "italiani" è abbastanza popolare, come pure "lavoro" (non sono tutte elencate sull'asse x per mancanza di spazio, ma si vedono a passarci sopra il mouse).
Altre parole sono specifiche di questo o quel presidente: Pertini ha usato parecchie volte "terrorismo" (siamo alla fine dei '70, segno dei tempi) e "guerra". "Europa" è un termine tipico di Ciampi e Napolitano, che pure (assieme a Leone) ha favorito la parola "crisi" (probabilmente però noi cittadini della Repubblica di oggi possiamo inferire un significato differente tra l'uso che ne fanno l'uno e l'altro).
