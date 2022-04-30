---
layout: single
title: Java - Clase StringBuffer & StringBuilder
date: 2022-04-30
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-clase
  - java-StringBuffer
  - java-StringBuilder
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Clase StringBuffer

> • Se recomienda usar StringBuilder porque es una clase más moderna "JDK5" y no sincroniza los hilos de ejecución

1. Tiene una secuencia de **caracteres mutable** (Solo se admite que un único **Thread** acceda a ella de forma directa)

2. Es a prueba de hilos ``(thread-safe)`` se pueden usar de forma segura en multihilos

3. Contiene un ``buffer`` de **cadena** es como un **String** pero puede ser **modificada** en cualquier momento sin tener que crear un objeto nuevo como pasa con otras clases

4. Posee una ``secuencia particular`` de caracteres pero la longitud y el contenido de la secuencia pueden ser cambiados a través de las llamadas a métodos que tiene definidos.

### Método append

* Añade a un objeto de tipo **StringBuffer** todas las cadenas de texto que vayamos generando sin crear un **nuevo objeto** ni nuevo elemento como sucede con otras clases

```java
 String[] strs = { "uno", " dos", " tres", " cuatro" };
  StringBuffer sb = new StringBuffer();
  sb.append("• Añadir Cadena a un objeto de la clase StringBuffer ");
  for (String str : strs) {
   sb.append(str);
  }
// Salida por consola
// • Añadir Cadena a un objeto de la clase StringBuffer uno dos tres cuatro
```
