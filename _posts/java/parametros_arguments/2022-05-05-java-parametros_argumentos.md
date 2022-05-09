---
layout: single
title: Java - Parámetros & Argumentos
date: 2022-05-05
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-parámetros
  - java-argumentos
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Parámetros & Argumentos

* Son valores que dependiendo del momentos se pasan o se reciben dentro de los métodos de la clase con la que estemos trabajando

### Parámetro

* Es lo que aparece **definido** entre **paréntesis** dentro del **método**
  * A veces llamado ``parámetro formal`` se usa a menudo para referirse a la ``variable`` tal como se encuentra en la definición de una ``función``

#### Ejemplo de Parámetro

1º - Procedimiento de Instancia

```java
// Parámetro define que datos necesita el procedimiento para realizar las operaciones
//                    1º Parámetro     
//                          ↓          2º Parámetro     
//                          ↓               ↓        3º Parámetro     
//                          ↓               ↓             ↓        4º Parámetro     
//                          ↓               ↓             ↓               ↓          5º Parámetro     
//                          ↓               ↓             ↓               ↓                ↓
//                          ↓               ↓             ↓               ↓                ↓
public void setCoche(int marchas , int cilindrada , int puertas , String modelo , String matricula){
  this.marchas = marchas;
  this.cilindrada = cilindrada;
  this.puertas = puertas;
  this.modelo = modelo;
  this.matricula = matricula;
}
```

2º - Procedimiento de Clase

```java
 /**
  *                            1º Parámetro
  *                            ↓       2º Parámetro
  *                            ↓       ↓
  *                            ↓       ↓
  */                           ↓       ↓
public static void setSuma(int x , int y){
  this.x = x;
  this.y = y;
}
```

### Argumento

* Son los **valores** que se pasan a los **métodos/procedimientos/funciones** declarados de una **clase** la cual estamos invocando
  * A veces llamado ``parámetro real`` se refiere a la entrada real suministrada en la llamada de ``función``

#### Ejemplo de Argumentos

1º - Invocar método de instancia

```java
Coche coche1 = new Coche();
// Invocación del método setCoche
// Argumento que le pasamos al método
// 
        //  1-Argumento
        //       ↓
        //       ↓ 2-Argumento
        //       ↓   ↓
        //       ↓   ↓ 3-Argumento
        //       ↓   ↓   ↓
        //       ↓   ↓   ↓    4-Argumento
        //       ↓   ↓   ↓        ↓                          5-Argumento
        //       ↓   ↓   ↓        ↓                              ↓
        //       ↓   ↓   ↓        ↓                              ↓
        //       ↓   ↓   ↓        ↓                              ↓
        //       ↓   ↓   ↓        ↓                              ↓
 coche1.setCoche(5 ,12 , 3 , "Ferrari 500 TRC de Scaglietti" , "96961" );
```

2º - Invocar el procedimiento de clase

```java
// Método de ejemplo
public static void setSuma(int x , int y){
  this.x = x;
  this.y = y;
}
  //     1º Argumento; 2º Argumento
           int xx = 5; int yy = 10; 
                ↓          ↓         
Clase.setSuma( xx    ,    yy);
```
