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
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Grafo de Commits del Repositorio

* Grafo con la relación de todos los **commits** generados en un **[Repo.Local]**

### Flechas - Integración o Modificación

* Las flechas de salida de los **commits** indican la relación que tiene con sus anteriores **commits**

  * Una flecha : **commit** generado por **modificación** del **commit anterior**

  * Dos flecha : **commit** generado por **integración** de una **rama** o con el **commit anterior**

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

* El número (n = posiciones) indica cuantas posiciones avanzas hacia atrás en el historial de **commits**

```bash
# Concepto 
<commit>~n 
```

### Ejemplo de Ancestro ~ de un commit

```bash
# Concepto 
<commit>~1=<commit> 
```

## Concepto de Padres "^" de los commits - Modificación

* Representado por el símbolo ``^`` significa que es el padre de un commit

* Indica el número de **(n = posiciones)** de **padre de un commit** de **integración**

```bash
# Concepto 
<commit>^n 
```

### Ejemplo de Padre ^ de un commit

* Suponiendo que nos encontramos en el último commit de la rama master

```bash
# Esta acción haría retroceder 1 commit desde la rama master
master^1=g699g8 
# Esta acción haría retroceder 2 commit desde la rama master
master^2=ah78j9
```

### Ejemplo de Ancestro ~ de un commit

* Suponiendo que nos encontramos en el último commit de la rama master

```bash
# Esta acción haría retroceder 1 commit desde la rama master
master^1=g699g8 
# Esta acción haría retroceder 2 commit desde la rama master
master^2=ah78j9
```

