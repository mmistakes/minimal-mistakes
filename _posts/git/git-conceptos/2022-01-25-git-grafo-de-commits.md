---
layout: single
title: Git - Grafo de Commits
date: 2022-01-25
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-grafo-de-commits
  - git-grafo
  - git-commits
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Grafo de Commits del Repositorio

* Grafo con la relación de todos los **commits** generados en un **[Repositorio Local]**

### Flechas - Integración o Modificación

* Las flechas de salida de los **commits** indican la relación que tiene con sus anteriores **commits**

  * Una flecha / palitos : **commit** generado por **modificación** del **commit anterior**

  * Dos flecha / palitos : **commit** generado por **integración** de una **rama** o con el **commit anterior**

```bash
*   01150a8d Merge branch 'master' # INTEGRACIÓN de una rama
|\  
| * 737c011d Update Font Awesome (#2102) # MODIFICACIÓN del commit anterior
* | b93ec8ca Update CHANGELOG and history # MODIFICACIÓN del commit anterior
|/  
* baec5d00 more words for pt-br (#2098) # MODIFICACIÓN del commit anterior
```

## Historial de Commits

* Es una secuencia ordenada por fechas ``por defecto`` de los **commits** que hemos ido generando cada vez que hemos confirmado un cambio en el proyecto

## Concepto de Ancestros "~" de los commits - Integración

* Representado por el símbolo ``~`` significa que es el **ancestro** del historial de **commit**

* El número **(n = posiciones)** indica cuantas posiciones avanzas hacia atrás en el historial de **commits**

```bash
# Concepto 
<commit>~n 
```

## Concepto de Padres "^" de los commits - Modificación

* Representado por el símbolo ``^`` significa que es el **padre** de un **commit**

* Indica el número de **(n = posiciones)** de **padre de un commit** de **integración**

```bash
# Concepto git
<commit>^n 
```

## Grafo de Commits

* Gráfico para explicar el funcionamiento de los **commits** a través del **grafo de commits**

![Grafo de commits](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/grafo_commits/grafo_commits.jpg?raw=true "Grafo de Commits")

### Ejemplo de Ancestro ~ de un commit

* Suponiendo que nos encontramos en el **último commit** de la **rama master**

```bash
# Concepto 
<commit>~1=<commit> 
```

* Situados en la **rama master** avanzamos una posición hacía atrás en el **historial de commits** del gráfico

```bash
# Retrocede 1 commit en el gráfico de commits
46g8g8~1=dd12f9  
```

![Grafo de commits](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/grafo_commits/ancestro1.jpg?raw=true "Grafo de Commits")

* Situados en la **rama master** avanzamos una posición hacía atrás en el **historial de commits** del gráfico

```bash
# Retrocede 2 commit en el gráfico de commits
master~2=46g8g8 
```

![Grafo de commits](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/grafo_commits/ancestro2.jpg?raw=true "Grafo de Commits")

### Ejemplo de Padre ^ de un commit

* Suponiendo que nos encontramos en el **último commit** de la **rama master**

* Desde la **rama master** avanzamos **una posición** hacía atrás en el **historial de commits** del gráfico

* Esta acción haría retroceder **1 commit** hacia atrás en la **rama master**

```bash
master^1=g699g8 
```

![Grafo de commits](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/grafo_commits/padre1.jpg?raw=true "Grafo de Commits")

* En esta acción haría retroceder **2 commit** hacia atrás en la **rama master**
  
  * Como hubo una ``integración`` entre los **commits** ``ah78j9`` y ``g699g8`` de las distintas **ramas** como son la ramas ``teamone/master`` y la **rama** ``master`` , nos situarnos en el ``commit C4'`` que fue el **2º commit** en la **integración** del ``último commit``

```bash
master^2=ah78j9
```

![Grafo de commits](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/grafo_commits/padre2.jpg?raw=true "Grafo de Commits")

## Gráfico de ejemplo para seguir los conceptos

![Grafico del Ancestros y Padres](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/checkout/grafico-checkout-padre-ancestro.jpg?raw=true "Grafico del Ancestros y Padres")

```bash
git checkout <commit>^n
```

### Desde la rama master

* Todos los **(ANCESTROS)** de la ``rama master`` siguen una línea principal / recta hacia abajo

  * ( Desde el ``commit C8`` hasta el ``commit C1``)

* Los **(PADRES)** principales del ``commit C8`` de la **rama master** son

``master^1 (a05eba6) - Commit C7``

``master^2 (a46936d) - Commit C4'``

``master^3`` - Nunca funcionará - ya que no hay ningún 3º padre para es ``commit`` de ``C8``

### Desde la rama teamone

* El **PADRE** de la ``rama C4'`` es el **ANCESTRO** es ``C5``
  * Solo permite un **padre** ``(C5)`` pero si permite todo los demás **ANCESTROS** hasta llegar al ``commit C1`` porque todos desciende de la misma **rama 'master'**

* Desde **teamone** : ``C4'``
  * Su padre es ``C5``
    * **ANCESTRO** del ``commit C5~4`` es igual al **PADRE** del ``commit C5^1``

### Desde la rama_x / rama_y

* El **PADRE** : **C5** → ``commit (adadea4)``

* **ANCESTROS**
  * ``rama_x~1`` → **C5**
  * ``rama_x~2`` → **C4** hasta el **C1**

## Resumen de conceptos

* Los commits **PADRES**
  * El siguiente ``commit`` **(Antepenúltimo)** por debajo del **último commit** del grafo de **commits**
  * Indicado con **2 flechas** que apunta a un **commit** concreto
    * Los ``2 commits`` que se producen de la **INTEGRACIÓN** de ``2 ramas`` distintas (``master`` y ``teamone``) se unen en un solo commit de una de las ramas como por ejemplo : ``rama master``

```bash
 (C4') → rama teamone (2º Padre)
    ↖
      ↖
        ↖
          ↖ 
            ↖
              ↖
                ↖
  (C7) ← ← ← ← ← (C8) ← "Commit de Integración" dentro de la rama master
    ↓              
# rama master (1º Padre)   
```

* Los commits **ANCESTROS**
  * Todos los ``commits`` que van detrás del ``último commit`` de la rama en la que nos encontremos
  * Indicado con **1 flecha**
    * Ejemplo : Rama ``master`` siguiendo una línea recta desde el **primer commit**
      * La 1º linea del **último commit** ``C8`` hasta el primer ``commit C1``

```bash
# Cada commit es una modificación 
# con respeto al anterior commit siguiendo
# una linea recta con recto a su 
# rama principal en este caso 'rama master'
#
#                             
(C5) ← ←  (C6) ← ← (C7) ← ← (C8) # Commit de Modificación dentro de la "rama master"
#                    ↓                         
#           (Padre^1 y Ancestro^1)              
```

* Recuerda:

* 1º **PADRE** siempre será el 1º **ANCESTRO** y viceversa
  * 1º **ANCESTRO** siempre será el 1º **PADRE** pero el 2º **ANCESTRO** no sera el 2º **PADRE**
  * ( Recuerda que el 2º **ANCESTRO** siempre sigue la linea del 1º **PADRE** pero el 2º **PADRE** es la 2º linea de la **FLECHA DE INTEGRACIÓN**)

### Resume : MODIFICACIÓN de los commits

```bash
(C8) → Rama master - Último commit                          
  ↓                   
  ↓
  ↓
(C7) → 1º PADRE & 1º ANCESTRO de la rama master
  ↓
  ↓
  ↓
(C6) → 2º ANCESTRO
```

### Resume : INTEGRACIÓN de los commits

```bash
# Rama master                          
  ↓
(C8) ← Último commit
  ↓ ↖ 
  ↓   ↖ 
  ↓     ↖ 
  ↓       ↖ 
  ↓         ↖ 
  ↓           ↖ 
  ↓          (C4') → 2º PADRE                          
  ↓                    
(C7) → 1º PADRE 
```
