---
title: "Tráfico HTTPS de app Flutter con Burp usando Genymotion PaaS"
author: Adan Alvarez
classes: wide
excerpt: " Captura de tráfico HTTPS de una aplicación en Flutter con Burp Suite usando una imagen en AWS de Genymotion PaaS."
categories:
  - Pentesting
tags:
  - aplicaciones móviles
  - burp
  - pentest
  - flutter
---
En esta entrada vamos a ver como podemos capturar tráfico HTTPS de una aplicación creada con Flutter con Burp Suite montando una imagen en AWS de Genymotion PaaS. Esto nos será de mucha utilidad en pentests de aplicaciones móviles creadas en Flutter.
{: style="text-align: justify;"}
La aplicación utilizada es una creada específicamente para esta entrada y que podéis encontrar [aquí](https://github.com/adanalvarez/PentestFlutterAPP).

Para poder capturar tráfico HTTPS con Burp Suite generado desde aplicaciones móviles, por norma general, necesitamos añadir el certificado de Burp Suite al móvil como certificado confiable.  En versiones anteriores a Android Nougat esto era simple, podíamos descargar el certificado y añadirlo como certificado cliente tal y como se explica [aquí](https://portswigger.net/support/installing-burp-suites-ca-certificate-in-an-android-device). A partir de Android Nougat, las aplicaciones ya no confían, salvo que se configuren expresamente, en los certificados añadidos por el usuario y es necesario añadir los certificados al almacén del sistema.  Desde Android 10, no es posible montar la partición /system como lectura/escritura y esta no se puede modificar incluso como root, lo que complica más las cosas. De todos modos, [aquí](https://pswalia2u.medium.com/install-burpsuites-or-any-ca-certificate-to-system-store-in-android-10-and-11-38e508a5541a) se indican varios métodos para poder añadir certificados al almacén del sistema.
{: style="text-align: justify;"}
El problema que nos encontramos es que las aplicaciones creadas con [Flutter](https://flutter.dev/) ignoran los certificados tanto de usuario como de sistema. Por lo tanto, pese a que añadamos nuestro certificado de Burp Suite como confiable, no seremos capaces de capturar tráfico HTTPS de una aplicación flutter con Burp. Además, para hacer esto aún más difícil, este tipo de aplicaciones ignoran las configuraciones del proxy. Así que si configuramos el proxy como se indica en [este artículo](https://portswigger.net/support/configuring-an-android-device-to-work-with-burp#:~:text=Configure%20the%20Burp%20Proxy%20listener,%2C%20and%20click%20%22OK%22.), la aplicación no enviará el tráfico al proxy.
{: style="text-align: justify;"}
La solución a estos problemas pasa por, añadir reglas de iptables que nos permitan enviar el tráfico HTTPS a nuestro proxy y utilizar Frida para hacer un hook de la función de verificación del certificado y así cambiar el resultado siempre a 1. Con esto conseguiremos que el tráfico se envíe a nuestro proxy y la aplicación confíe en el certificado de Burp Suite.
{: style="text-align: justify;"}
Los siguientes blogs explican en detalle como realizar esto y este artículo se basa en ellos:

<https://blog.nviso.eu/2019/08/13/intercepting-traffic-from-android-flutter-applications/>

<https://orangewirelabs.wordpress.com/2019/06/04/bypassing-root-ca-checks-in-flutter-based-apps-on-android/>

<https://hackmd.io/@runicpl/flutter-android>

La razón de este artículo es realizar esta captura de tráfico sin tener un móvil físico.

El problema con este tipo de pruebas es que necesitamos hacer un hook de libflutter.so, una librería que en muchos casos nos encontraremos que solo está compilada para procesadores ARM.
{: style="text-align: justify;"}

Podemos instalar la aplicación en un emulador Android 11 x86 y esta funcionará sin problemas, ya que [desde Android 11](https://android-developers.googleblog.com/2020/03/run-arm-apps-on-android-emulator.html) es posible ejecutar binarios ARM con un rendimiento muy bueno. El problema es que si seguimos los artículos mencionados, veremos que al ejecutar el script que hará el hook, nos aparecerá un error ya que Frida no es capaz de encontrar el módulo libflutter.so, lo que significa que no podemos hacer el hook de la función que está en esa librería. Este error ha sido reportado a Frida [aquí](https://github.com/frida/frida/issues/1463).
{: style="text-align: justify;"}

Por lo tanto, la única solución para poder hacer el hook y capturar tráfico HTTPS de una aplicación Flutter con Burp pasa por utilizar un dispositivo ARM y si, como yo, no disponéis de ningún dispositivo ARM con root la opción más rápida, y a un precio asequible, es utilizar [Genymotion PaaS](https://docs.genymotion.com/paas/latest/). Desde noviembre de 2020 existe en el Marketplace de AWS la opción de usar [Genymotion Android 8.0](https://aws.amazon.com/marketplace/pp/B08KHVZWMJ/?ref=_ptnr_website_blog) que se ejecuta en los chips ARM de nueva generación de AWS [Gravition2](https://aws.amazon.com/es/ec2/graviton/).
{: style="text-align: justify;"}
### **Despliegue de la imagen Genymotion Cloud : Android 8.0 (oreo) -- ARM versión**

Accedemos al servicio EC2, vamos al menú *Instances* y hacemos clic en *Launch instance*.

En el apartado de selección de AMI buscamos genymotion y seleccionamos: Genymotion Cloud : Android 8.0 (oreo) -- ARM versión
{: style="text-align: justify;"}
[![](https://donttouchmy.net/wp-content/uploads/2021/03/genyarmoreo-300x187.png)](https://donttouchmy.net/wp-content/uploads/2021/03/genyarmoreo.png)

Después de esto, aceptamos la subscripción y seleccionamos el tipo de instancia. Tendremos 7 días de Genymotion gratis donde solo pagaremos el coste de la instancia, después de 7 días pagaremos también por el software según el tipo de instancia. El precio va desde los 0.163/hr para instancias c6g.medium a los 0.844/hr para instancias m6g.2xlarge:
{: style="text-align: justify;"}
[![](https://donttouchmy.net/wp-content/uploads/2021/03/precios-300x147.png)](https://donttouchmy.net/wp-content/uploads/2021/03/precios.png)

Con una instancia c6g.medium o c6g.large debería ser más que suficiente.

Tras esto pasamos a las configuraciones de la instancia, en esta lo más importante será la configuración del *Security Grou*p. Por defecto tendremos expuestos los puertos:
{: style="text-align: justify;"}
-   22 TCP para SSH
-   80 TCP para HTTP
-   443 TCP para HTTPS y WSS
-   El rango 51000 al 51100 TCP y UDP para WebRTC

[![](https://donttouchmy.net/wp-content/uploads/2021/03/puertorpordefecto-300x221.png)](https://donttouchmy.net/wp-content/uploads/2021/03/puertorpordefecto.png)

Es importante configurar cada una de las reglas para permitir el tráfico solo desde nuestra IP.
{: style="text-align: justify;"}
Además, el puerto 5555 TCP para ADB no está abierto, podemos crear un túnel SSH como se indica [aquí](https://docs.genymotion.com/paas/latest/04_ADB.html#create-an-ssh-tunnel), o abrir el puerto solo para conexiones desde nuestra IP teniendo en cuenta que la conexión ADB no es segura ni está autenticada.
{: style="text-align: justify;"}
Tras estas configuraciones lanzamos la instancia y nos pedirán que indiquemos que clave SSH utilizar, podemos utilizar una que ya tuviéramos creada o añadir una nueva.
{: style="text-align: justify;"}
Tras lanzar la imagen esperamos a que arranque y copiamos su IP pública. Mediante un navegador accedemos a [https://IPINSTANCIA](https://ipinstancia/) y tras aceptar el error por el certificado autofirmado, nos pedirá autentificación. El usuario por defecto es genymotion y la contraseña es el ID de la instancia. Tras introducir los datos tendremos acceso al terminal:
{: style="text-align: justify;"}
[![flutter con Burp](https://donttouchmy.net/wp-content/uploads/2021/03/genymovil-295x300.png)](https://donttouchmy.net/wp-content/uploads/2021/03/genymovil.png)

Si con estos pasos no te ha sido posible desplegar la instancia, en el siguiente enlace se describen en detalle los pasos requeridos para desplegar y usar una instancia de AWS: <https://docs.genymotion.com/paas/latest/02_Getting_Started/021_AWS.html#create-and-set-up-an-instance>
{: style="text-align: justify;"}
### **Enviar tráfico HTTPS a nuestro Burp Suite local**

En primer lugar, nos debemos conectar por ADB así que necesitaremos habilitarlo accediendo a *Configuration* en el dispositivo:
{: style="text-align: justify;"}
[![](https://donttouchmy.net/wp-content/uploads/2021/03/adb-300x76.png)](https://donttouchmy.net/wp-content/uploads/2021/03/adb.png)

Después de esto, si tenemos el puerto abierto a nuestra IP, podremos ejecutar:

```
adb connect *IPINSTANCIA*:5555
```

Para información detallada de como conectar por ADB seguir la siguiente guía: https://docs.genymotion.com/paas/latest/04_ADB.html
{: style="text-align: justify;"}
Para aplicaciones que hagan uso de la configuración del proxy, lo podemos configurar para que envíe el tráfico a localhost con este comando:
```
adb shell settings put global http_proxy localhost:3333
```
En nuestro caso, como hemos comentado antes que las aplicaciones creadas en flutter no hacen caso de esta configuración deberemos utilizar IPTABLES del siguiente modo para enviar el tráfico HTTPS a localhost:
```
adb shell "iptables -t nat -F"
adb shell "iptables -t nat -A OUTPUT -p tcp --dport 443 -j DNAT --to-destination 127.0.0.1:3333
adb shell "iptables -t nat -A POSTROUTING -p tcp --dport 443 -j MASQUERADE"
```
Tras configurar que el tráfico HTTPS vaya a localhost:3333 utilizaremos [adb reverse](https://blog.grio.com/2015/07/android-tip-adb-reverse.html) para hacer que las peticiones a localhost:3333 vayan a nuestro localhost:8080 (Donde estará Burp escuchando).
{: style="text-align: justify;"}
```
adb reverse tcp:3333 tcp:8080
```
Por último, solo nos quedará configurar Burp Suite para forzar todo el tráfico al puerto 443. Así que arrancamos Burp Suite y vamos a *Proxy -- Options,* editamos el *proxy listener* y en *Request handling* forzamos el uso de TLS.
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2021/03/forcetls-300x126.png)](https://donttouchmy.net/wp-content/uploads/2021/03/forcetls.png)

Con esto el tráfico HTTPS pasará por Burp Suite pero no podremos verlo debido a los certificados. Lo que sí podremos ver si usamos la aplicación es, en la pestaña dashboard, fallos en la negociación del TLS:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2021/03/errores-300x40.png)](https://donttouchmy.net/wp-content/uploads/2021/03/errores.png)

### **Hook de la función ssl_crypto_x509_session_verify_cert_chain para deshabilitar la validación de la cadena de certificados**

Tal y como se indica en el artículo de blog.nviso.eu mencionado al inicio, [Dart](https://dart.dev/) genera y compila su [propio Keystore](https://github.com/dart-lang/root_certificates) utilizando la librería Mozilla NSS.  Para hacer un bypass de la validación ssl debemos parchear la función session_verify_cert_chain  definida en la línea 362 de [ssl_x509.cc](https://github.com/google/boringssl/blob/master/ssl/ssl_x509.cc#L362) de la librería libflutter.so
{: style="text-align: justify;"}

Para esto será necesario algo de ingeniería inversa utilizando Ghidra. Para poder realizar el análisis primero necesitaremos obtener la librería. Podemos obtenerla del dispositivo donde está instalada la aplicación del siguiente modo:
{: style="text-align: justify;"}
```
adb pull /data/app/APPLICACIÓN/lib/arm64/libflutter.so
```
[![](https://donttouchmy.net/wp-content/uploads/2021/03/pulllibflutter-300x24.png)](https://donttouchmy.net/wp-content/uploads/2021/03/pulllibflutter.png)

Iniciamos [Ghidra](https://ghidra-sre.org/), creamos un nuevo proyecto y arrastramos el fichero libflutter.so que acabamos de obtener del móvil. Hacemos doble clic y nos pedirá analizarlo, el análisis puede tardar varios minutos y puede mostrar algunos errores.
{: style="text-align: justify;"}

Tras finalizar el análisis iremos a *Search -- For String*
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2021/03/search-300x178.png)](https://donttouchmy.net/wp-content/uploads/2021/03/search.png)

Hacemos clic en *search* y aplicamos en la siguiente pantalla un filtro para x509.cc:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2021/03/search2-300x217.png)](https://donttouchmy.net/wp-content/uploads/2021/03/search2.png)

Hacemos clic en el único resultado y nos marcará una sección con 4 XREF:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2021/03/search3-300x229.png)](https://donttouchmy.net/wp-content/uploads/2021/03/search3.png)

3 de ellos podemos ver que están uno detrás del otro, por lo que sabemos que ssl_x509 se compiló en algún lugar en la región x6c0000. Como sabemos que en [ssl_x509.cc](https://github.com/google/boringssl/blob/master/ssl/ssl_x509.cc#L390)  tenemos una llamada a OPENSSL_PUT_ERROR en la línea 390, podemos buscar por 390 mediante la función *Search -- For scalars*.  Seleccionamos *Specific Scalar* y hacemos clic en *search:*
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2021/03/scalar-300x214.png)](https://donttouchmy.net/wp-content/uploads/2021/03/scalar.png)

Esto nos mostrará varios resultados pero solo uno de ellos está en la región x6c0000
{: style="text-align: justify;"}

[![flutter con Burp](https://donttouchmy.net/wp-content/uploads/2021/03/sacalar-300x173.png)](https://donttouchmy.net/wp-content/uploads/2021/03/sacalar.png)

Si hacemos doble clic nos llevará a una función que parece una buena candidata a ser la función que estamos buscando, ya que entre otras cosas tiene como entrada 3 parámetros:
{: style="text-align: justify;"}

[![flutter con Burp](https://donttouchmy.net/wp-content/uploads/2021/03/function-1-300x136.png)](https://donttouchmy.net/wp-content/uploads/2021/03/function-1.png)

Con esto podemos copiar los primeros bytes de la función y buscarlos en memoria mientras se ejecuta la aplicación usando la función Memory.scan de Frida. Así que usaremos el script del blog de nvisio y modificaremos el pattern y eliminaremos el add.(0x01) de la línea 25 al ser una aplicación de 64bits.  El script para este caso será el siguiente:
{: style="text-align: justify;"}
```
function hook_ssl_verify_result(address)
{
Interceptor.attach(address, {
   onEnter: function(args) {
     console.log("Disabling SSL validation")
   },
   onLeave: function(retval)
   {
     console.log("Retval: " + retval)
     retval.replace(0x1);
  }
});
}
function disablePinning()
{
var m = Process.findModuleByName("libflutter.so");
var pattern = "ff 03 05 d1 fd 7b 0f a9 fa 67 10 a9 f8 5f 11 a9"
var res = Memory.scan(m.base, m.size, pattern, {
onMatch: function(address, size){
     console.log('[+] ssl_verify_result found at: ' + address.toString());
     hook_ssl_verify_result(address);
    },
onError: function(reason){
     console.log('[!] There was an error scanning memory');
   },
   onComplete: function()
   {
     console.log("All done")
}});
}
setTimeout(disablePinning, 1000)
```
Una vez modificado el script estamos listos para ejecutar la aplicación desde frida. Para poder hacer esto necesitaremos abrir el puerto de Frida en AWS, instalar frida-server y ejecutarlo.
{: style="text-align: justify;"}

Primero accedemos al *Security Group* de AWS y añadimos el puerto 27042 TCP solo hacia nuestra IP:
{: style="text-align: justify;"}

[![flutter con Burp](https://donttouchmy.net/wp-content/uploads/2021/03/fridaport-300x138.png)](https://donttouchmy.net/wp-content/uploads/2021/03/fridaport.png)

Descargamos la versión de Frida server para ARM64 desde: https://github.com/frida/frida/releases
{: style="text-align: justify;"}

Tras descomprimirlo hacemos un push del fichero de frida al móvil:
```
adb push .\frida-server-14.2.13-android-arm64 /data/local/tmp/frida-server
```
Acedemos por shell, le damos permisos de ejecución y lo ejecutamos:
```
adb shell
chmod 755 frida-server /data/local/tmp/frida-server
/data/local/tmp/frida-server -l 0.0.0.0 &
```
Ahora que tenemos frida-server ejecutándose en el servidor podemos ejecutar el script que realizará el hook de la función. Para esto necesitaremos el nombre de la aplicación que podemos verlo en la carpeta /data/app o si la ejecutamos manualmente y mediante frida-ps -H IP listamos los procesos y vemos el nombre.
{: style="text-align: justify;"}

[![flutter con Burp](https://donttouchmy.net/wp-content/uploads/2021/03/psfrida-300x191.png)](https://donttouchmy.net/wp-content/uploads/2021/03/psfrida.png)

Para ejecutar la aplicación con el hook ejecutamos
```
frida -H IP -l .\hookcert.js -f NOMBREAPP --no-pause
```
Donde IP es la IP pública en AWS, hookcert.js será el fichero con el script modificado y NOMBREAPP será el nombre de la aplicación obtenido en el paso anterior:
{: style="text-align: justify;"}

[![flutter con Burp](https://donttouchmy.net/wp-content/uploads/2021/03/frida-1-300x70.png)](https://donttouchmy.net/wp-content/uploads/2021/03/frida-1.png)

Tras la ejecución podremos ver como se detecta donde está la función y comenzamos a recibir logs que nos indican que se está llamando a la función y alterando el resultado.
{: style="text-align: justify;"}

### Tráfico de Flutter visible en Burp

Vamos a nuestra aplicación, generamos tráfico HTTPS y podremos ver el tráfico de la aplicación Flutter con Burp suite:
{: style="text-align: justify;"}

[![flutter con burp](https://donttouchmy.net/wp-content/uploads/2021/03/app-188x300.png)](https://donttouchmy.net/wp-content/uploads/2021/03/app.png)

[![flutter con Burp](https://donttouchmy.net/wp-content/uploads/2021/03/brupsuite-300x194.png)](https://donttouchmy.net/wp-content/uploads/2021/03/brupsuite.png)