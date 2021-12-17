---
layout: single
title: Git - Realizar un Pull Request
date: 2021-11-27
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-pull-request
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

Trabajar con distintas ramas y unir los cambios desde distintos usuarios , ramas y repositorios

## Crear la **rama feature-a**

* feature-a → Rama alternativa para añadir cambios en el proyecto cuya **rama padre** es la **rama developer**

        git branch feature-a

Hacemos cambios en el proyecto o añadimos archivos dentro de la rama **feature-a** y ejecutamos los siguientes comandos para establecer esos cambios en el **[Repositorio Local]**

    git add .
    git commit -m "mensaje"
    git push

El sistema de control de versiones nos pide que lo subamos el nuevo contenido desde la rama ``feature-a`` a la misma rama del **Repositorio Remoto** donde tenemos hecho el Fork del **Repositorio Remoto**

    git push origin HEAD

Ahora hacemos un **"Pull Request"** desde la ``rama alternativa feature-a`` a la ``rama master`` del proyecto

* Accedemos desde la cuenta principal o colaborativa del repositorio al panel del administrador del repositorio principal del proyecto

{% include figure image_path="/assets/images/graficos/pull-request/pull-request-1.png" alt="Pull Request" caption="Seleccionamos Pull Request" %}

* Pulsamos el botón verde nombrado como **New Pull Request**

{% include figure image_path="/assets/images/graficos/pull-request/pull-request-2.png" alt="Pull Request" caption="Muestra como se crea un Pull Request" %}

* Nos aparece un nuevo panel donde nos indica que comparemos la parte nueva que hemos creado desde la ``rama feature`` del fork de la cuenta colaborativa llamada ``Rad-101/Blog101`` al repositorio principal del cual hicimos el fork y que esta identificada con el nombre ``RVSWe/Blog101`` que como base tiene la ``rama master``

* Pulsamos el boton verde con la descripción ``Create pull request`` para indicar que queremos fusionar los cambios

{% include figure image_path="/assets/images/graficos/pull-request/pull-request-3.png" alt="Pull Request" caption="Parte comparativa entre las distintas ramas de los distintos repositorios que trabajan en el mismo proyecto" %}

* Se nos abre un panel donde indicamos **Si queremos** la descripción de los cambios que hemos hecho dentro del proyecto de forma detallada.

* Una vez terminada la descripción pulsamos el botón **Create Pull Request** para confirmar los cambios

{% include figure image_path="/assets/images/graficos/pull-request/pull-request-4.png" alt="Pull Request" caption="Se muestra un panel para comentar con detalle los cambios que hemos realizado en el proyecto" %}

* Podemos ver cambios que hemos hecho desplegando las distintas pestañas que existen en el panel.

* Pulsamos **Merge pull Request** para fusionar los cambios desde la ``rama alternativa feature-a`` del Fork contributivo llamado ``Rad-101/Blog101`` a la ``rama master`` del repositorio principal llamado ``RVSWe/Blog101``

{% include figure image_path="/assets/images/graficos/pull-request/pull-request-5.png" alt="Pull Request" caption="Hacemos la fusión de contenidos" %}

* Antes de confirmar la fusión podemos dejar otro comentario en la caja de comentarios encima de la formación donde queramos aclarar o afirmar algún comentario sobre la fusión que se va a realizar
  
  * Esta acción es : **Es opcional**

* Si todo esta correcto ejecutamos la confirmación ``Confirm Merge``

{% include figure image_path="/assets/images/graficos/pull-request/pull-request-6.png" alt="Pull Request" caption="Confirmamos la fusión" %}

* En esta imagen vemos como se ha realizado correctamente la fusión de la ``rama feature-a`` del **Fork** ``Rad-101/Blog101`` a la ``rama master`` del repositorio principal ``RVSWe/Blog101``

{% include figure image_path="/assets/images/graficos/pull-request/pull-request-7.png" alt="Pull Request" caption="Muestra la fusión de distintas ramas dentro del mismo proyecto" %}
