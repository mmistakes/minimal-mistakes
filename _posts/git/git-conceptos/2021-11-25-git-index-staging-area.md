---
layout: single
title: Git - Index/Staging Area
date: 2021-11-25
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-index
  - git-staging area
tags:
  - git-basico
  - git-manual
---

## Git {INDEX} → Indice o {Staging Area} → Area de Cambios / Preparación

Ruta del directorio

``project/.git/index``

* * *

Los cambios realizados dentro del **{Staged}** son muy parecidos a los cambios **{UnStaged}** , excepto que se han marcado para ser **confirmados** la próxima vez que ejecute ``git commit``

El **{INDEX}** o **{Staging Area}** contiene una **(captura / instantánea)** del contenido del **(Arbol de Trabajo/Working Tree)**, esta **(captura / instantánea)** representa a los contenidos que se cambiaron y que tendrá el **próximo commit**

Es una especie de zona virtual donde se almacenan los archivos después de ejecutar ``git add <archive>`` y que están a la espera de ser confirmados mediante ``git commit -m "Mensaje"`` para almacenarse de forma temporal dentro del **[Repositorio Local]** par luego enviarlos al **|Repositorio Remoto|** con el comando ``git push``

Es una especie de árbol que monitoriza todos los cambios en el (Working Directory) que se ha aplicado con ``git add`` , es un árbol con un mecanismo de almacenamiento de cache interno.

* {**INDEX** = Indice} o {**Staging Area** = Área de cambios}
  
  * Son los registros de cambios del (**Working Directory / Workspace**) que tendrá el __proximo commit__

  * Los ficheros no modificados del commit anterior permanecerán a la espera en el **siguiente commit**.

> Los cambios no registrados en el {INDEX} no se incluyen al genera un nuevo commit

* * *

Comandos básicos:

### Git add

> `git add` → Registra en el __{INDEX}__ los ficheros indicados

* `git add README.md LICENSE` → Registra en el __{INDEX}__ estos ficheros sean nuevos o esten en el estado/fase modificados __{Modified}__

* `git add .` → Registran en el __{INDEX}__ todos los ficheros nuevos o los que se hayan pasado al estado/fase modificados __{Modified}__ anteriormente.

### Git reset

> `git reset` → Se utiliza para deshacer cambios

* `git reset` → Extrae los ficheros del __{INDEX o Staging Area}__ al __(WorkSpace/Working Directory)__

* `git reset <archivo>` → Extrae el ``<archivo>`` de __{INDEX}__ para enviarlo al estado **(Working Directory)**

* `git reset .` → Extrae del __{INDEX}__ todos los ficheros para enviarlo al estado **(Working Directory)**

Dependiendo de los argumentos que le añadamos puede afectar al

* [Arbol de Commit / Commit Tree (HEAD)]

* {INDEX / Staging Area}

* (Directorio de Trabajo / Working Directory)

### Git commit

> `git commit` → Genera un nuevo **registro/instantánea** de todos los archivos que tengamos y se almacenarán dentro del __{INDEX}__ esperando a ser enviados al **Repositorio Remoto**

* `git commit` → Crea una nueva ``instantánea/registro`` y abre un editor de texto para crear el mensaje donde se refleje la intención de este registro y que luego se podra ver en el log del proyecto.  

* `git commit -m "Mensaje"` → Guarda la ``instantánea/registro`` con un mensaje que hayamos escrito en el que indiquemos el proposito del mismo y que luego se podrá ver en el log del proyecto.

* `git commit --amend -m` → Modifica el último commit que hayamos ejecutado sobre el __{INDEX}__

  * Hay que tener en cuenta que modifica el **último** commit.

    * ``amend`` → Sustituimos el **commit actual** por lo que teniamos el **commit anterior** a este y le añadimos lo que teniamos registrado en el __{INDEX}__ de forma que podamos corregir lo que se nos olvido añadir o arreglarlo antes de pasarlo al **[Repositorio Local]**

## Gráfico de ejemplo
