---
layout: single
title: Git - Commit - Concepto
date: 2021-11-26
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-commit
tags:
  - git-basico
  - git-manual
---

## Git Commit

> Cuando se ejecuta un commit se le añade automáticamente un identificador hexadecimal de 40 dígitos generado a través de una clave Hash `SHA-1 (Secure Hash Algorithm)`

```git
commit 83141d8938c56df7ac6a6d9ba5e70d6613396964
Author: Usuario <correo@usuario.com>
Date:   Thu Nov 25 19:35:57 2021 +0100
```

* Para evitar la dificultad de leer el codigo se seleccionan los 7 primeros números del `Hash SHA-1 → 83141d89`

El codigo `Hash SHA-1` nos sirven para identificarlo en el historial del proyecto mediante el uso de ciertos comandos como pueden ser:

* Cada código `Hash SHA-1` es único y no puede haber 2 o más commits con el mismo identificador.

* En el caso de existir ``2 commits`` tendría el mismo contenido.

* Cada nuevo ``commit`` se genera por modificación del ``commit anterior`` como si fuera un nuevo peldaño de la misma escalera.

    > Significa que es una evolución del contenido anterior

## Git Log

``git log`` → Nos mostrará un **(Log / Registro)** de todos los commits confirmados que hayamos ido haciendo a lo largo del desarrollo de nuestro proyecto.

``git log --online --graph --decorate`` → Mostrara una versión gráfica detallada de todas las ramas , bifurcaciones , comentarios , codigos resumidos `Hash SHA-1` que hayamos ido haciendo a nuestro proyecto.

> Cada opción añade una nueva caracteristica:

``--online`` : Muestra la descripción del commit en una sola línea sin el nombre del autor y su correo.

``--graph`` : Crea un gráfico en codigo ASCII muy fácil de interpretar con las ramas , bifurcaciones y demás contenidos del proyecto.

``--decorate`` : Imprime los nombres de las referencia de los **commits** que se muestran.
