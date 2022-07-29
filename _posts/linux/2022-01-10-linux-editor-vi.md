---
layout: single
title: Linux - Editor Vi
date: 2022-01-10
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.jpg
categories:
  - linux
  - linux-editor-vi
tags:
  - linux-vi
page_css: 
  - /assets/css/mi-css.css
---

## Editor VI

* Editor creado 1º versiones de BSD UNIX
  * Potente
  * Muy difundido
  * Consume pocos recursos
  * Velocidad de arranque
  * Editor secundario de otras aplicaciones
  * Texto y los comandos propios se introducen desde teclado
  * Alta curva de aprendizaje

### Sintaxis Básica

```bash
vi [opciones][ficheros]
```

### 2 Modos

#### Modo editor

```bash
Dentro del editor (PULSAR) : i → Para pasar al modo Inserción
```

* Opciones de Inserción

```bash
i # Antes del cursor
a # Detrás del cursor
o # Al comienzo de nueva línea
```

#### Modo comando

```bash
Dentro del editor (PULSAR) : Botón ESC
```

#### Salir de Vi

```bash
ZZ # Guardar y Salir
:q # Salir sin guardar
^z # Suspender edición ( se recupera con fg)
```

#### Otras opciones

* Borrar línea donde esta el cursor

```bash
dd 
```

* Deshacer último cambio **(Undo)**

```bash
u 
```

* Borrar la línea donde esta el cursor

```bash
dd 
```

* Buscar texto hacia adelante

```bash
/<texto>
```

* Inserta el contenido del fichero

```bash
:r fichero 
```

### Opciones Básicas

* Recupera y edita 'file' despues de que se cierre el editor o el sistema de forma abrupta

```bash
vi -r archivo.ext 
```

* Edita el fichero en la línea 'n'

```bash
vi +n archivo.ext  
# Ejemplo
vi +20 archivo.ext  
```

* Carga el ``archivo1`` y el ``archivo2`` y edita archivo1. archivo2 se edita con el comando ``+n``

```bash
vi archivo1 archivo2
```
