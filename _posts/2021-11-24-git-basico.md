---
layout: single
title: Git - Conceptos Básicos
date: 2021-11-24
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git Basico

### Estructura básica del directorio de un proyecto

    README.md : fichero resumen (formato GitHub markdown)
    LICENSE : fichero con licencia de distribución del proyecto:

Directorios principales

    public: Directorio donde almacenar recursos Web
    bin:    Directorio donde almacenar programas ejecutables
    lib:    Directorio con las librerías de software utilizadas
    test:   Directorio con las pruebas de funcionamiento correcto

*  *  *

* Directorio oculto:  **.git**:
  * Contiene los directorios y archivos más importantes del software del control de versiones entre ellos el grafo de cambios entre las distintas versiones del proyecto

*  *  *

* Fichero **.gitignore**:
  * indica los ficheros a ignorar cada vez que lanzamos el comando ``git push``

*  *  *

Comando básico para ver las ayudas.

    git
    git --help
    man git

**Salida:**

Estructura básica del comando Git:

```

    [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
              [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
              [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
              <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone             Clone a repository into a new directory
   init              Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add               Add file contents to the index
   mv                Move or rename a file, a directory, or a symlink
   restore           Restore working tree files
   rm                Remove files from the working tree and from the index
   sparse-checkout   Initialize and modify the sparse-checkout

examine the history and state (see also: git help revisions)
   bisect            Use binary search to find the commit that introduced a bug
   diff              Show changes between commits, commit and working tree, etc
   grep              Print lines matching a pattern
   log               Show commit logs
   show              Show various types of objects
   status            Show the working tree status

grow, mark and tweak your common history
   branch            List, create, or delete branches
   commit            Record changes to the repository
   merge             Join two or more development histories together
   rebase            Reapply commits on top of another base tip
   reset             Reset current HEAD to the specified state
   switch            Switch branches
   tag               Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch             Download objects and refs from another repository
   pull              Fetch from and integrate with another repository or a local branch
   push              Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
See 'git help git' for an overview of the system.

```
