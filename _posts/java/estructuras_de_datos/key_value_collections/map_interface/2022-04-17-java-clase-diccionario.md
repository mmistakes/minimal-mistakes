---
layout: single
title: Java - Clase Dictionary
date: 2022-04-17
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2jpg
categories:
  - java
  - java-manual
  - java-clase
tags:
  - java-Dictionary
  - java-key-value-collections
page_css: 
  - /assets/css/mi-css
---

## Clase Dictionary<K,V>

NOTA: Esta **clase está obsoleta : No usar**

Las **nuevas implementaciones** deberían implementar la **interfaz Map**  en lugar de **extender** esta clase

```java
// Jerarquía Clase Dictionary 
java.lang.Object

java.util.Dictionary<K,V>
```

* **Parámetros de tipo**

``K - el tipo de claves/key que mantiene este mapa``
  
``V - el tipo de valores/values asignados``

* La **clase Dictionary** es el padre abstracto de cualquier clase, como la **clase HashTable**  que asigna **claves/key** a **valores/values**

* Cada **clave** y cada **valor** es un **objeto**

* En cualquier **objeto Dictionary** , cada **clave** está asociada con un **valor** como máximo

* Dado un **diccionario** y una **clave** , se puede buscar el elemento asociado

* Cualquier **objeto no nulo** se puede **utilizar** como **clave** y como **valor**

* Como regla general, las implementaciones de esta **clase** deben usar el ``método equals`` para decidir si **dos claves son iguales**
