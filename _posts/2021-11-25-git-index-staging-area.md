---
layout: single
title: Git - Index o Staging Area
date: 2021-11-25
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-Index
  - git-Staging Area
tags:
  - git-basico
  - git-manual
---

## Git Index o Staging Area

* {**INDEX** = Indice} o {**Staging Area** = Área de cambios}
  
  * Son los registros de cambios del (**Working Directory / Workspace**) que tendrá el __proximo commit__

  * Los ficheros no modificados del commit anterior permanecen en el siguiente commit.

> Los cambios no registrados en el {INDEX} no se incluyen al genera un nuevo commit

***
Comandos básicos:

### Git add

> `git add` → Registra en el __{INDEX}__ los ficheros indicados

* `git add README.md LICENSE` → Registra en el __{INDEX}__ estos ficheros sean nuevos o esten en el estado/fase modificados __{Modified}__

* `git add .` → Registran en el __{INDEX}__ todos los ficheros nuevos o los que se hayan pasado al estado/fase modificados __{Modified}__ anteriormente.

### Git reset

> `git reset` → Extrae los ficheros del __{INDEX o Staging Area}__ al __(WorkSpace/Working Directory)__

* `git reset <archivo>` → Extrae el ``<archivo>`` de __{INDEX}__ para enviarlo al estado **(Working Directory)**

* `git reset .` → Extrae del __{INDEX}__ todos los ficheros para enviarlo al estado **(Working Directory)**

### Git commit

> `git commit` → Genera un nuevo **registro/instantánea** de todos los archivos que tengamos y se almacenarán dentro del __{INDEX}__ esperando a ser enviados al **Repositorio Remoto**

* `git commit` → Crea una nueva ``instantánea/registro`` y abre un editor de texto para crear el mensaje donde se refleje la intención de este registro y que luego se podra ver en el log del proyecto.  

* `git commit -m "Mensaje"` → Guarda la ``instantánea/registro`` con un mensaje que hayamos escrito en el que indiquemos el proposito del mismo y que luego se podrá ver en el log del proyecto.

* `git commit --amend -m` → Modifica el último commit que hayamos ejecutado sobre el __{INDEX}__

  * Hay que tener en cuenta que modifica el **último** commit.

    * ``amend`` → Sustituimos el **commit actual** por lo que teniamos el **commit anterior** a este y le añadimos lo que teniamos registrado en el __{INDEX}__ de forma que podamos corregir lo que se nos olvido añadir o arreglarlo antes de pasarlo al **[Repositorio Local]**
