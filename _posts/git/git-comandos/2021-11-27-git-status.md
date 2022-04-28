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

* Muestra el estado de los ficheros dentro del **(Directorio de Trabajo/Working Directory-wd)** la cual engloba la parte **(Untracked)** como del **{Tracked}**

> Recuerda :
> Git siempre compara los archivos del **último commit** con los archivos que tienes tanto en el **(Untracked)** como en las demás etapas del sistema **Git** como son **{UnModified}** / **{Modified}** / **{Staging Area}** para ver las diferencias entre ellos y así saber si han habido cambios en el código del **[Repositorio]** del proyecto o no.

### Estado de los Ficheros

```git
←←←←←← [Repositorio] →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→
            ||
(Untracked) ||   {Tracked}   |   {Tracked}   |       {Tracked}         |    {Tracked}     |    
(Workspace) ||  {UnModified} |   {Modified}  |  {Staging Area / INDEX} |  ||Repo.Local||  |
            ||               |               |                         |                  |
            ||               |               |                         |                  |
```

* **(Untracked)**
  * Archivos no existentes en el commit anterior
  * No existe seguimiento del archivo **``Git commit``** dentro del **(Working Directory)** con respecto al **último commit** del **[Repositorio]** descargado.

* **{UnModified}**
  * Después de hacer ``Git add <archivo>`` el archivo queda guardado y esperando a ser enviado mediante ``Git commit -m "mensaje"`` y ``Git push`` al **Repositorio Remoto**

* **{Modified}**
  * Modificados con respecto al commit anterior
  * Los archivos **UnModified** han sido modificados respecto al ``commit anterior`` lo que significa que para poder enviarse al **Repositorio Remoto** se debe de hacer otra vez ``Git add <archive>`` y ``Git commit -m "mensaje"``

* **{Staged}**
  * Archivos y directorios registrados para el **``próximo commit``**

```markdown
                             [Repository]
                                  ↓                          
    (Untracked) ||| {UnModified} ||| {Modified} ||| {INDEX-Staged}
                         |               |               |
ø Git add <file> ----------------------------------------> 
                         |               |               |               
                         |ø Edit file -->|               |
                         |               |               |               
                         |               |               |               
                         |               |ø Staged file->|               
                         |               |               |
  remove <file> <--Git reset <file> --------------------ø|
                         |               |               |
                         |               |               |
                         |<--------- Git commit---------ø|
                         |               |               |
```

## Git - status -s

* Muestra el estado en formato más conciso y una serie de claves que nos ayuda a comprender mejor el estado de los archivos

```git
Git status -s
```

* Columna de la **izquierda** indica el status del **{Staging Area}**

* Columna de la **derecha** indica el status **(Working Tree)**

Los campos están separados del otro por un simple espacio

Otros códigos de estado pueden interpretarse como el siguiente :  

```markdown
                            ' ' = UnModified
                            M|  = Modified
                            A|  = Added
                            D|  = Deleted
                            R|  = Renamed
                            C|  = Copied
                            U|  = Updated but UnMerged 
                            ?|? = Aren´t Tracked
        {Staging Area}←←←←←←↓ ↓→→→→ (Working Directory)
```

* Nota : la barra vertical ``|`` simplemente se muestra como separador entre las distintas opciones pero no se incluye en el código ni se necesita poner , solo esta para ayudar a comprender mejor el ejemplo.

<!-- 
Para rutas con conflictos de fusión 'X' e 'Y' muestra el estado modificado de cada lado de la fusión
Para rutas que no tienen conflictos 'X' muestra el estado del Indice 'Y' mostrando el estado del 'árbol de trabajo = Working Tree' para caminos no explorados 'XY' que son '??'.
-->
