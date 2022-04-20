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

## Git - Commit

* Son los archivos que están representados dentro una **instantánea/snapshot/commits** almacenada en el **[Repositorio Local]**

  * Contienen **metadatos** adicionales que almacenan el contenido de los cambios que le hicimos a nuestros archivo y datos

* Cuando se crea un **commit** , este apunta a un **tree** que a su vez apunta al **blob** que representa los **archivos** , **directorios** o elementos que hayamos **agregado** o **modificado** al proyecto con el que estemos trabajando así como los **metadatos** más importantes como por ejemplo quién y cuando se hizo el **commit**
  * El **commit** lleva implícito un **SHA-1 checksum**

* **[Commits/Instantáneas/Snapshots]** son sinónimos en este caso en concreto

* Comando ``git commit`` asigna un identificador único a cada nuevo commit que realice

  * Actuá como referencia única del ``commit``

  * Garantiza la integridad del ``commit``

Genera un **nuevo commit** con lo registrado en el **{INDEX}**

> Cuando se ejecuta un commit se le añade automáticamente un identificador hexadecimal de 40 dígitos generado a través de una clave Hash `SHA-1 (Secure Hash Algorithm)`

```git
commit 83141d8938c56df7ac6a6d9ba5e70d6613396964
Author: Usuario <correo@usuario.com>
Date:   Thu Nov 25 19:35:57 2021 +0100
```

* Para evitar la dificultad de leer el código se seleccionan los 7 primeros números del `Hash SHA-1 → 83141d89`

El código ``Hash SHA-1`` nos sirven para identificarlo en el historial del proyecto mediante el uso de ciertos comandos como pueden ser:

* Cada código ``Hash SHA-1`` es único y no puede haber 2 o más commits con el mismo identificador.

* En el caso de existir ``2 commits`` tendría el mismo contenido.

* Un nuevo ``commit`` se genera por modificación , eliminación o añadiendo contenido del ``commit anterior`` si no se modifica , elimina o añade nuevo contenido del ``commit anterior`` lo añadirá al ``nuevo commit`` por defecto.

    > Significa que siempre irá modificando el último commit que hayas creado

![Alt hacer git restore](/assets/images/commit/commit.jpg/ "hacer git restore --staged <archivo>")

## Ejemplos de Commit

* Guarda un **nuevo commit** y abre un editor para crear el mensaje

```bash
git commit
```

* Guarda un **nuevo commit** con un mensaje que defina los cambios a realizar en el proyecto

```bash
git commit -m "Mensaje"
```

* Modifica el **último commit** con lo registrado en el **{Staging Area/INDEX}** hay que tener en cuenta de que cambia el contenido del **commit**

```bash
git commit --amend -m "Mensaje"
```

* Sustituimos el ``commit anterior`` que tenía el **{Staging Area/INDEX}** por otro nuevo commit para corregir lo que se nos olvido añadir o arreglar el mensaje antes de pasarlo al **[Repositorio Local]**

* Crea una nueva ``instantánea/registro`` y abre un editor de texto para crear el mensaje donde se refleje la intención de este registro y que luego se podrá ver en el log del proyecto.  

```bash
git commit
```

* Guarda la ``instantánea/registro`` con un mensaje que hayamos escrito en el que indiquemos el propósito del mismo y que luego se podrá ver en el log del proyecto.

```bash
git commit -m "Mensaje"
```

* Modifica el último commit que hayamos ejecutado sobre el **{Staging Area/INDEX}**

```bash
git commit --amend -m
```

* Hay que tener en cuenta que modifica el **último** commit.

* ``amend`` → Sustituimos el **commit actual** por lo que teníamos el **commit anterior** a este y le añadimos lo que teníamos registrado en el **{INDEX}** de forma que podamos corregir lo que se nos olvido añadir o arreglarlo antes de pasarlo al **[Repositorio Local]**

> `git commit` → Genera un nuevo **registro/instantánea** de todos los archivos que tengamos y se almacenarán dentro del **{INDEX}** esperando a ser enviados al **Repositorio Remoto**

* Ver información especifica de un ``commit`` indicando su **SHA-1**

```bash
git cat-file commit <SHA-1>
# Ejemplo
git cat-file commit 799a599
tree e3a88d16249aacbac0fefc8bc3caf726699b9679
parent a05eba6d8e9486fce5537bfa7eaa11d58b43066f
parent a46936d6258508d7d89500be8e04848e2d506e60
author usuario <usuario@gmail.com> 1644004665 +0100
committer usuario <usuario@gmail.com> 1644004665 +0100
```
