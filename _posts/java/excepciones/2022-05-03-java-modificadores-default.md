---
layout: single
title: Java - Excepciones
date: 2022-05-16
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-default
tags:
  - java-throwable
  - java-excepciones
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Excepciones

* Al ejecutar **código Java** pueden ocurrir diferentes **errores**
  * **Errores** de codificación por parte del programador

  * **Errores** debido a una entrada incorrecta u otros imprevistos de la codificación.

* Cuando ocurre un **error**, **Java** normalmente se detendrá y generará un **mensaje de error**

  * El término técnico seria ``lanzará una excepción``
    * **Exception** ``(throw an error)``

* Utiliza las **palabras clave**

```java
throws , throw , try , catch , finally
```

### Errores Compilación

* **Errores sintácticos**
  * Cuando escribimos mal el nombre de una ``palabra clave`` , llamada a un ``método`` o ``clase``

* **Errores de Compilación**
  * Cuando llamamos a un ``método`` que no existe
  * Nos falta o nos sobra ``parámetros`` en la invocación a un ``método`` de cualquier tipo
  * Asignación de una ``variable`` de ``tipo entero`` a otra del tipo carácter
  * Al faltarnos un ``paréntesis`` al cerrar un ``método``

### Tipos de Excepciones

* Todas las excepciones heredan de la clase Padre **Throwable**
  
### Diagrama de Clases con Errores y Excepciones

```java
                             [Throwable]
                    ______________↑________________                   |                              |
                  [Error]                      [Exception]
         ___________↑________              _________↑______________
        |                    |            |                        |
[OutOfMemoryError]      [IOError]    [IOException]         (RuntimeException)
                                          ↑                        ↑
                                          |                        |
                              [FileNotFoundException]     (NullPointerException)
```

### Subclase Error de la clase Throwable

* Problemas graves que una aplicación no podría detectar ya que estos errores son condiciones anormales que nunca deberían ocurrir
  * No podemos anticiparnos al error o al problema ni podemos recuperarnos de ellos
    * Ejemplo
      * ThreadDeath error
      * Problema de hardware
      * Desbordamiento de memoria (StackOverFlow) en la JVM
      * Falta de memoria

#### Subclase de la Clase Error

* Estas serían las **clases descendientes** de la clase Error con los tipos de errores más comunes que nos encontraremos normalmente

```java
    AnnotationFormatError, AssertionError, AWTError, CoderMalfunctionError,
     FactoryConfigurationError, FactoryConfigurationError, IOError, LinkageError,
      SchemaFactoryConfigurationError, ServiceConfigurationError, ThreadDeath,
       TransformerFactoryConfigurationError, VirtualMachineError 
```

### Subclase Exception de la clase Throwable

* La ``clase Exception`` y sus ``subclases`` son una forma de indicar que una aplicación podría querer capturar y gestionar los errores que producen en ella
  * ``RuntimeException`` sería la subclase descendiente de ``Exception`` más usada