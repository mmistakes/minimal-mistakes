---
layout: single
title: Git - Restaurar archivos a su estado original después del commit
date: 2022-01-24
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-commit
  - git-restore
  - git-reset
  - git-add
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Restaurar un archivo después de ejecutar git commit (confirmarlo)

* Tenemos un archivo en el **(Working Directory)** descargado del **Repositorio Remoto** en la  ``rama master`` llamado **README.md** el cual tiene el siguiente contenido definido

```bash
# mi-git-para-pruebas
Mi Git Para Pruebas 2022
```

* Si ejecutamos el comando ``git status`` nos aparecerá el estado actual del archivo

```bash
git status

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

* Abrimos cualquier editor y modificados el contenido del archivo

```bash
# mi-git-para-pruebas
Mi Git Para Pruebas 2022
Hola
```

* Volvemos a ejecutar el comando ``git status`` y nos avisará que el archivo fue modificado pero no esta agregado al ``{Staged/Staging Area/Index}`` ni **confirmado** ``commit`` para la próxima confirmación

```bash
git status

On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

* En este caso podríamos ejecutar el comando ``git restore <archivo>`` y asi restaurar el archivo al estado anterior eliminando todos los cambios que le hubiéramos hecho :
 ``"Eliminando la palabra Hola que le añadimos"``

* Pero para este ejemplo lo añadiremos al ``{Staged/Staging Area/Index}`` para luego confirmar los cambios que le hicimos al archivo

```bash
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md
```

* En este punto podríamos sacar el archivo que enviamos al estado ``{Staged/Staging Area/Index}`` al estado ``(Working Directory)`` ejecutando el siguiente comando

```bash
# Este comando saca el archivo del estado {Staged/Staging Area/Index} y lo vuelve al estado (Working Directory)
git restore --staged <file>..." to unstage
```

> Pero para este ejemplo confirmaremos los cambios realizados en el archivo

* Ejecutamos el comando ``git commit -m "Mensaje"`` para crear la **instantánea/snapshot** y así enviar los cambios al ``|Repo.Remoto|`` mediante el comando ``git push``

  * Antes comprobamos el historial de ``git commit`` que ejecutamos anteriormente

```bash
# Vemos el último commit que tenemos en el historial de commit
git log --oneline 
28b2592 (origin/main, origin/HEAD) Initial commit
# Creamos la confirmación para guardar los cambios del archivo para ser enviados al |Repo.Remoto|
git commit -m "1º commit ejecutado"
```

* Volvemos a ver el **último commit** que tenemos en el **historial de commit**

```bash
git log --oneline 
09e655d (HEAD -> main) 1º commit ejecutado
28b2592 (origin/main, origin/HEAD) Initial commit
```

* Ejecutamos el comando ``git reset --soft HEAD~1`` para eliminar el último commit que hemos en la rama en la que nos encontremos
  * Atención : **SIEMPRE QUE ESTE COMMIT PERTENEZCA A UN PADRE o ANCESTRO** anterior
    * Si el **commit** que queremos deshacer no tiene un **commit padre o ancestro** o es el primero de los ejecutados este sistema no funcionara , se tendrá que usar otras vías

  * Para eliminar el **último commit** creado lo hacemos desde su ancestro `HEAD~1` ya que es el **último commit** que ejecutamos

```bash
# Eliminamos el commit desde el último ancestro ya estamos en la rama master
git reset --soft HEAD~1
git log --oneline
# Podemos ver que el último commit creado fue eliminado
28b2592 (origin/main, origin/HEAD) Initial commit
```

* Si queremos extraer el archivo del ``{Staged/Staging Area/Index}`` podemos ejecutar el siguiente comando

```bash
git restore --staged README.md 
# Ahora el archivo fue sacado del {Staging Area/Index}
```

* Por último podemos eliminar los cambios realizados al archivo ``README.md`` el cual le añadimos la palabra ``Hola``

```bash
# mi-git-para-pruebas
Mi Git Para Pruebas 2022
Hola # Vamos a eliminar esta parte para dejarlo como estaba al comienzo
```

* Solo tenemos que ejecutar el siguiente comando

```bash
git restore README.md
```

* Ahora el archivo esta en el estado ``(Working Directory)`` y con el contenido original antes de hacerle las **modificaciones** , **agregarlo** al ``{Staged/Staging Area/Index}`` mediante el comando ``git add README.md`` y confirmarlo usando el comando ``git commit -m "1º commit ejecutado``
