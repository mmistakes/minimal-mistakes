---
layout: single
title: Git - Status 
date: 2021-11-27
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-status
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - status

Muestra el estado de los ficheros del **(Directorio de Trabajo - Working Directory)**

* **Untracked** : No existe seguimiento del archivo **``git commit``** dentro del **(Working Directory)**

* **UnModified** : Después de hacer ``git add <archivo>`` el archivo queda guardado y esperando a ser enviado mediante ``git commit -m "mensaje"`` y ``git push`` al **»Repositorio Remoto«**

* **Modified** : Los archivos **UnModified** han sido modificados respecto al ``commit anterior`` lo que significa que para poder enviarse al **»Repositorio Remoto«** se debe de hacer otra vez ``git add <archive>`` y ``git commit -m "mensaje"``

* **Staged** : Archivos y directorios registrados para el ``próximo commit``

```markdown
    (Untracked) ||| {UnModified} ||| {Modified} ||| {INDEX-Staged}
                         |               |               |
ø git add <file> ----------------------------------------> 
                         |               |               |               
                         |ø Edit file -->|               |
                         |               |               |               
                         |               |               |               
                         |               |ø Staged file->|               
                         |               |               |
  remove <file> <---------------------------------------ø|
                         |               |               |
                         |               |               |
                         |<--------- git commit---------ø|
                         |               |               |
```

## Git - status -s

Muestra el estado en formato más conciso y una serie de claves que nos ayuda a comprender mejor el estado de los archivos

```git
git status -s
```

Los campos incluyendo -> están separados desde cada otro por un simple espacio 
Si un nombre de archivo contiene espacio o no tiene un caracter.

Para rutas con conflictos de fusión 'X' e 'Y' muestra el estado modificado de cada lado de la fusión

Para rutas que no tienen conflictos 'X' muestra el estado del Indice 'Y' mostrando el estado del 'árbol de trabajo = Working Tree' para caminos no explorados 'XY' que son '??'.

Otros códigos de estado pueden interpretarse como el siguiente :  

```markdown
'' = UnModified
M  = Modified
A  = Added
D  = Deleted
R  = Renamed
C  = Copied
U  = Updated but UnMerged 
```

