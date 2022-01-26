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
*   01150a8d Merge branch 'master' # INTEGRACION de una rama
|\  
| * 737c011d Update Font Awesome (#2102) # MODIFICACION del commit anterior
* | b93ec8ca Update CHANGELOG and history # MODIFICACION del commit anterior
|/  
* baec5d00 more words for pt-br (#2098) # MODIFICACION del commit anterior
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
# Concepto 
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
