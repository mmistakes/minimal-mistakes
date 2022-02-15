---
layout: single
title: Git - Checkout
date: 2021-12-1
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-checkout
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - checkout

* Cambiar de **rama** o **restaurar archivos** de **(árbol de trabajo-Working Tree Files)**
  * **Switch branches or restore working tree files**

> Todo los cambios que hagamos sobre un archivo que estén **{Tracked/Rastreado}** se realizan desde el **(Working Directory)**

* Elimina los cambios de ``<file>`` que pasan de **{Modified}** a **{Unmodified}**
  * Los cambios que se hagan en **{Modified}** cuando se ejecute este comando se perderán

``git checkout <file>``

* Elimina los cambios de todos los ficheros **{Modified}** desde el estado **(Working Directory)** y que pasan a **{Unmodified}** dentro del **{Staging Area/Index}**

``git checkout .``

Cambia **[HEAD]** en si mismo de lugar al que apunta

Reemplazar los cambios locales

* Reemplaza los cambios del **(Working Directory/wd)** con el **último contenido** del **[HEAD]** , los cambios que ya han sido agregados al **{Staging Area/Index/Staged}** como los nuevos archivos , se mantendrán sin cambios

```bash
#          flag = Parecida a las opciones pero no posee argumentos en si mismo
#            ↓    Actúan como valores boolean (true / false) 
#            ↓    Al añadirlo se activa o se desactivan cierta acciones del 
#            ↓    comando (por defecto : false) 
#            ↓    
git checkout -- <archivo>
```

* Para restaurar los cambios de un archivo que esta en **{Modified}** a **{Unmodified}** dentro de **{Staged}** utilizar

```bash
git checkout -- <archivo>
```

## Checkout para (Padre^N) y (Ancestros^N)

* Repasamos conceptos

Una Flecha ( Modificación del ``commit`` anterior )

Dos Flechas ( Integración de un ``commit`` con otro o de una **rama** con otra)

* El objetivo es mover el puntero **[HEAD]** a través del ``grafo de commits`` para inspeccionar los archivos o datos que posee

* Gráfico de ejemplo para seguir los conceptos

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