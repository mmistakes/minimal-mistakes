---
layout: single
title: Git - Conectar mediante ssh un Repositorio local con la plataforma GITHUB
date: 2022-01-21
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-ssh
  - git-ssh-keygen
  - git-github
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Conectar mediante SSH un Repositorio local con la plataforma GITHUB

* Para conectar nuestro proyecto local desde el **[Repo.Local]** con el proyecto del **|Repo.Remoto|** de la plataforma **GITHUB** necesitamos configurar nuestro servicio **ssh** desde nuestro sistema **UNIX/Linux** y sincronizarlo con el sistema de la plataforma **GITHUB**, con ello podremos realizar operaciones de envió y recibimiento de información

1. Configuramos nuestra cuenta de usuario y correo electrónico con el que vamos a trabajar

    * Dentro del **(Directorio de Trabajo/Working Directory/wd)** y con el usuario de **UNIX/Linux** con el que vayamos a utilizar ejecutamos los siguientes comandos :

    ``git config --global --user.name "nombre-usuario-git"``

    ``git config --global --user.email email-asociado-git@nombre.dominio``

2. Una vez creada la cuenta tenemos que generar las **claves ssh** para poder sincronizar tanto el **[Repo.Local]** de nuestro sistema con el **|Repo.Remoto|** de la plataforma **GITHUB** mediante los siguientes comandos

    * Desde la terminal de **UNIX/Linux** y dentro del directorio ``home`` o  ``~/`` ejecutamos el siguiente comando para comprobar si ya tenemos las claves creadas anteriormente

      ```bash
      # Nos muestra la lista de archivos del directorio .ssh en el caso que existan
      ls -al ~/.ssh
      id.rsa
      id.rsa.pub
      ```

    * Si no existen no aparecerán

      ```bash
      # Nos muestra la lista de archivos del directorio .ssh en el caso que existan
      ls -al ~/.ssh
      ```

    * Si no tenemos estos a archivos , tendremos que generarlos mediante el siguiente comando

    ```bash
    # Comando : Para generar las claves RSA
    #    ↓    Opción : Especifica el tipo de "key" que se va a crear 
    #    ↓      ↓ Arg. : Tipo de clave pública que se va a generar
    #    ↓      ↓  ↓  Opción : Creará el archivo
    #    ↓      ↓  ↓   ↓     Cuenta de correo asociada a la plataforma GITHUB
    #    ↓      ↓  ↓   ↓        ↓     
    ssh-keygen -t rsa -C nombre@host.dominio
    ```

     * Este comando nos generará nuevas clases **ssh-keys** para poder trabajar con la plataforma **GITHUB**
        * La que realmente nos interesa es la clave ``id.rsa.pub`` para añadirla a la **ssh key** de la plataforma **GITHUB**

     * Al ejecutar el comando nos aparecerá una serie de pregunta sobre

       * Como queremos configurar las claves **ssh-key**
       * Que tipo de clave queremos añadirle
       * Si queremos añadirle una contraseña

     * Dependemos de nuestra necesidades podemos darle directamente al botón "Intro" y no configurar nada o podemos ir agregándole claves y configuraciones para mejorar la seguridad

3. Accedemos al directorio ``~$/.ssh`` y copiamos la clave **id_rsa.pub** generada por **ssh-keys**  

      ```bash
      cd ~/.ssh
      # Copiamos el contenido de este archivo llamado id.rsa.pub
      cat id.rsa.pub
      ```

4. Accedemos al portal de **GITHUB** para añadir la clave ``id.rsa.pub`` que acabamos de generar y copiar

* Para ello vamos al apartado de la plataforma llamada ``Settings``

![Imagen Github](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/config1-rsa.jpg?raw=true)

* Seleccionamos la sección ``SSH and GPG Keys``

![Imagen Github](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/config2-rsa.jpg?raw=true)

* Seleccionamos la sección ``SSH Keys`` y el botón ``New SSH Key``

![Imagen Github](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/config3-rsa.jpg?raw=true)

* Dentro de la sección ``SSH Keys/Add new``
  * Agregamos un titulo para referenciarlo en la sección ``Title``
  * Le añadimos el código que obtuvimos de la ``id.rsa.pub`` que nos genero el comando
    ``ssh-keygen -t rsa -C correo@host.dominio``
  * Al terminar pulsamos el botón ``Add SSH Key``

![Imagen Github](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/config4-rsa.jpg?raw=true)

5. Comprobar que la conexión se ha establecido entre tu sistema **UNIX/Linux** y la plataforma **GITHUB** ejecutamos el siguiente comando

  ``ssh -T git@github.com``

* Nos mostrará un mensaje muy parecido a este pero personalizado a nuestro usuario y sistema

```bash
The authenticity of host 'github.com (IP ADDRESS)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)?
```

* Nos pide que verifiquemos la huella ``fingerprint`` para comprobar si coincide con la huella ``fingerprint`` de la ``clave pública RSA`` de **GITHUB**

```bash
Hi username! You've successfully authenticated, but GitHub does not
provide shell access.
```

6. Ahora nos dirigimos a la plataforma y elegimos el **Repositorio Remoto** que queremos clonar en nuestro **[Repo.Local]** y así poder continuar trabajando

![Imagen Github](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/config5-rsa.jpg?raw=true)

7. Desde la terminal de **UNIX/Linux** ejecutamos el comando ``git clone`` pero añadiendo la URL del tipo **ssh**

```bash
git clone git@github.com:Rad-101/mi-git-para-pruebas.git
```

Si todo va bien , tu **[Repo.Local]** estará sincronizado con tu **Repositorio Remoto** desde la plataforma **GITHUB**

