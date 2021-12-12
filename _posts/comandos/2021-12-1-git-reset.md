---
layout: single
title: Git - Reset
date: 2021-12-1
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-reset
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - Reset

* Comando que mueve la **rama** según le indique el puntero **[HEAD]**

  * Si **[HEAD]** esta apuntando a la **rama master** y ejecutamos el comando ``git reset <identificador commit anterior>`` hara que la **rama master** apunte al **commit** que le hayamos indicado dentro de su **[Repo.Local]**

* Deshacer los cambios locales y los **commits** trayendo la última versión del servidor y apuntar a la copia local principal

``git reset --hard origin/master``

> `git reset` → Se utiliza para deshacer cambios

* `git reset` → Extrae los ficheros del __{INDEX o Staging Area}__ al __(WorkSpace/Working Directory)__

* `git reset <archivo>` → Extrae el ``<archivo>`` de __{INDEX}__ para enviarlo al estado **(Working Directory)**

* `git reset .` → Extrae del __{INDEX}__ todos los ficheros para enviarlo al estado **(Working Directory)**

Dependiendo de los argumentos que le añadamos puede afectar al

* [Arbol de Commit / Commit Tree (HEAD)]

* {INDEX / Staging Area}

* (Directorio de Trabajo / Working Directory)
