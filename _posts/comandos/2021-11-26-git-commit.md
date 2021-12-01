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
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git Commit

Genera un **nuevo commit** con lo registrado en el **{INDEX}**

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

* Un nuevo ``commit`` se genera por modificación , eliminación o añadiendo contenido del ``commit anterior`` si no se modifica , elimina o añade nuevo contenido del ``commit anterior`` lo añadirá al ``nuevo commit`` por defecto.

    > Significa que siempre irá modificando el último commit que hayas creado

![Alt hacer git restore](/assets/images/commit/commit.jpg/ "hacer git restore --staged <archivo>")


## Ejemplos de Commit

``git commit`` → Guarda un **nuevo commit** y abre un editor para crear el mensaje

``git commit -m "Mensaje"`` → Guarda un **nuevo commit** con un mensaje que defina los cambios a realizar en el proyecto

``git commit --amend -m "Mensaje"`` → Modifica el **último commit** con lo registrado en el **{INDEX}** , hay que tener en cuenta de que cambia el contenido del **commit**

* Sustituimos el ``commit anterior`` que tenía el **{INDEX}** por otro nuevo commit para corregir lo que se nos olvido añadir o arreglar el mensaje antes de pasarlo al **[Repositorio Local]**
