---
title: "Securización de sistemas Linux con Fail2Ban"
author: Jose M
classes: wide
excerpt: "En este Post veremos como  implementar un sistema básico de IDS para protegernos de los ataques comunes y ataques de fuerza bruta."
categories:
  - Herramientas
tags:
  - Securización
  - IDS
  - Blue Team
---
Hola  a todos, en este *Post* veremos como  implementar un sistema básico de *IDS* para protegernos de los ataques comunes y ataques de fuerza bruta. Como herramienta hemos escogido *[fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page). *Un software maduro que nos permite monitorizar los *logs* de las aplicaciones en busca de marcadores que disparen acciones que, generalmente, se traducen en el filtrado de una IP sospechosa en el *firewall* del sistema.
{: style="text-align: justify;"}

En este *post* hacemos una configuración rápida para proteger:

* SSH: Filtrar ataques de fuerza bruta en SSH

* Apache: Filtrar ataques *crawlers* maliciosos, ataques a formularios y otros ataques comunes.

* Postfix: Filtrar servidores que han devuelto algun error de verificación de dominio o de opciones en los diálogos con Postfix.

Nuestro equipo de pruebas es una Centos 7.3 personalizada, así que algunos pasos pueden ser distintos a una instalación limpia original.
{: style="text-align: justify;"}

Con la *intro* hecha, pasamos a la acción.

Primero de todo instalamos fail2ban en nuestra distribución. Ten en cuenta que  *fail2ban* no está en el repositorio oficial de Centos 7. Para instalarlo de fuentes fiables, habilita el repositorio de *EPEL* y actualiza.
{: style="text-align: justify;"}
```
yum install epel-release
yum update
yum install fail2ban-server
```
NOTA: Como dependencia nos instalará ***firewalld****, *pero podemos seguir utilizando *iptables *si lo preferimos. Las reglas de filtrado se aplican sobre éste último, así que los métodos explicados aquí son compatibles tanto para *firewalld *como para *iptables.*.
{: style="text-align: justify;"}

Configuración
-------------

Para facilitar los cambios en las actualizaciones, usaremos archivos *.local *que sobrescriben los parámetros declarados en los archivos *.conf. *Es decir, el valor de los parámetros en *jail.local* prevalece sobre los valores de *jail.conf.*
{: style="text-align: justify;"}

Los archivos de configuración o directorios son:

-   filters.d/ : Directorio de filtros. En este directorio se definen los grupos de expresiones regulares que se buscarán en los archivos de *logs*, en busca de indicadores de autenticaciones fallidas y peticiones maliciosas.
-   actions.d/ : Directorio de acciones. Las acciones a realizar tales como enviar un email o añadir una regla en *iptables* se definen aquí.
-   jail.d/ : Directorio donde configuraremos los servicios a monitorizar y las acciones a realizar. Cada *jail* puede monitorizar varios archivos de log, aplicar un solo filtro y aplicar una o más acciones encontrar coincidencias.

Antes de empezar, si tenemos IP estática o queremos ignorar el tráfico de la LAN, sobrescribiremos el parámetro *ignoreip* con el listado de IPs y redes a ignorar a nivel general.
{: style="text-align: justify;"}
```
[root@localhost fail2ban]# cat jail.local
 [DEFAULT]
 ## No bannear nunca nuestra IP o una red confiable
 ignoreip = 127.0.0.1/8 xx.xx.zz.0/24 jj.kk.mm.88
```

### **SSH**

Para SSH usaremos los filtros que vienen por defecto, que parecen bastante completos, pero deberemos crear el *jail* pertinente.
{: style="text-align: justify;"}
```
[root@localhost fail2ban]# cat jail.d/ssh.local
[ssh-failed]
enabled = true
filter = sshd-aggressive
action = iptables-ipset-proto4[name=SSH, port=ssh, protocol=tcp]
# mail[name=SSH, dest=root@donttouchmy.net]
logpath = /var/log/secure
maxretry = 10
findtime = 60
bantime = 3600
```
Asegúrate de poner el archivo de seguridad pertinente donde salen  los errores de *sshd.* Puede encontrarlo fácilmente buscando la cadena sshd en el directorio de logs.
{: style="text-align: justify;"}
```
grep -rl "sshd\[" /var/log/
```
Aquí filtraremos un IP por una hora *(bantime = 3600)* si encontramos 10 coincidencias *(maxretry = 10)* en */var/log/secure* de las que están indicadas en el archivo *filter.d/sshd-aggressive.conf (filter = sshd-aggressive)*.
{: style="text-align: justify;"}

### Apache

#### Configurando los logs

Para poder filtrar correctamente algunos de los ataques o tráfico no deseado vamos decirle a nuestro *apache* que añada el *User Agent *del cliente que hace la petición. Así podremos filtrar directamente esos bots que no deseamos.
{: style="text-align: justify;"}

Apache permite personalizar el formato de los logs mediante el parámetro *CustomLog*, así que buscaremos en los archivos de logs esas referencias y cambiaremos si es necesario el parámetro *common *por *combined *que es un formato predefinido que «escupe» el *User Agent *del cliente al final de cada registro.
{: style="text-align: justify;"}
```
[root@localhost httpd]# egrep -re 'TransferLog|CustomLog|LogFormat' .
./conf/httpd.conf: # a CustomLog directive (see below).
./conf/httpd.conf: LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
./conf/httpd.conf: LogFormat "%h %l %u %t \"%r\" %>s %b" common
./conf/httpd.conf: LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
./conf/httpd.conf: CustomLog "logs/access_log" common
```
En la búsqueda vemos la declaración formato de *combined *en *httpd.conf. *Fijaos en que es igual que el formato predefinido *common *pero añade el %{Referer} y el %{User-Agent} al final.
{: style="text-align: justify;"}

Ahora cambiamos todas la coincidencias de *CustomLog *de *common *a *combined* para que los logs pasen de esto:
```
95.108.181.xx - - [11/Feb/2018:09:44:44 +0100] "GET / HTTP/1.1" 200 91294
```
a esto:
```
95.108.181.xx - - [11/Feb/2018:09:44:44 +0100] "GET / HTTP/1.1" 200 13837 "-" "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)"
```
#### Preparando filtro para ataques a formulario

Primero vamos a crear un filtro nuevo para bloquear ataques a los formularios existente. Estos ataques se hacen contra páginas que existen por lo que no podremos recoger errores en los *logs*. Así pues, filtraremos esas IPs que hagan un número de peticiones elevado, que claramente están originadas por alguna clase de *bot/*script en busca de vulnerabilidades en nuestros formularios, pero que a su vez usan *User Agents* simulando *browsers* convencionales.
{: style="text-align: justify;"}

Empezamos por revisar los *logs* para ver la media de peticiones recibidas por IP.\
Con el siguiente comando podremos sacar un listado rápido de un archivo de *log* en concreto.
{: style="text-align: justify;"}
```
# awk 'BEING{OFS="\t"; ipset; print "IP","Timestamp","HOST"}{time=substr($4,1,17); ipset[$1" - "time]++}END {OFS="\t";print "IP Timestamp","HITS"; for(ip in ipset){print ip,ipset[ip]}}' /var/log/httpd/ssl_access_log|sort -n
xx.xx.xx.xx - [04/Feb/2018:10:3 7
xx.xx.xx.xx - [04/Feb/2018:10:4 8
xx.xx.xx.xx - [04/Feb/2018:19:5 6
xx.xx.xx.xx - [04/Feb/2018:20:0 2
xx.xx.xx.xx - [04/Feb/2018:20:1 18
xx.xx.xx.xx - [04/Feb/2018:20:2 4
xx.xx.xx.xx - [04/Feb/2018:20:4 24
```
Que pocas, ¿no? :'-(

El formato de salida es:
 <*IP> - <TIMESTAMP>     <PETICIONES>*

Donde *TIMESTAMP* es *Fecha:Hora* en fracciones de 10 minutos. 

También tienes que tener en cuenta los *bots *de indexación, así que revisa tu archivo *robots.txt* y asegúrate de ponerle un límite de peticiones acorde. No queremos bloquear los indexadores de los buscadores pues pueden afectar a nuestro SEO.
{: style="text-align: justify;"}

Esto nos dará una idea de cuanto tiempo pasan conectados nuestros clientes a la página web y cuantas peticiones en 10 minuto hacen.\
En nuestro caso vemos que los clientes están varios minutos conectados y no hacen más de 30 peticiones por minuto.\
En cambio, haciendo un escaneo de la página web, vemos que las peticiones se elevan por encima de las 300 p/10min y puede durar unos 20 ~ 30 minutos o más.
{: style="text-align: justify;"}

 300 peticiones/10min * 20 min = 600 p/ 20min

Esto es una estimación referente a un ataque verídico que recibimos. Tendrás que ir jugando un poco para encontrar el valor que se adapte a tu página web y seguro que lo tendrás que cambiar, pero recuerda que este filtro es sólo para evitar esos ataques que han pasado otras validaciones como *logins* fallidos, directorios prohibidos u otros que puedas configurar, así que tiene que usar un valor lo suficientemente alto como para no bloquear a usuarios legítimos.
{: style="text-align: justify;"}

Ahora que sabemos que criterio vamos a utilizar, creamos el filtro que sólo cuenta entradas por IP
```
[root@localhost fail2ban]# cat filter.d/apache-ratelimit.local
 # Fail2Ban configuration file
 #
 # Just count the number of requests per host
 #

[Definition]
# Log format
#<IP> - - [28/Jan/2018:16:07:55 +0100] "GET / HTTP/1.0" 302 193
 failregex = ^<HOST> -.*"(GET|POST|HEAD).*TTP.*$

ignoreregex =
```
#### Creando *jails*

Ahora listaremos el retos de filtros que tenemos disponibles:
```
[root@localhost fail2ban]# ls -la filter.d/apache-*
-rw-r--r-- 1 root root 3241 May 11 2017 filter.d/apache-auth.conf
-rw-r--r-- 1 root root 2745 May 11 2017 filter.d/apache-badbots.conf
-rw-r--r-- 1 root root 1273 May 11 2017 filter.d/apache-botsearch.conf
-rw-r--r-- 1 root root 813 May 11 2017 filter.d/apache-common.conf
-rw-r--r-- 1 root root 268 May 11 2017 filter.d/apache-fakegooglebot.conf
-rw-r--r-- 1 root root 487 May 11 2017 filter.d/apache-modsecurity.conf
-rw-r--r-- 1 root root 596 May 11 2017 filter.d/apache-nohome.conf
-rw-r--r-- 1 root root 1187 May 11 2017 filter.d/apache-noscript.conf
-rw-r--r-- 1 root root 2000 May 11 2017 filter.d/apache-overflows.conf
-rw-r--r-- 1 root root 346 May 11 2017 filter.d/apache-pass.conf
-rw-r--r-- 1 root root 272 Jan 28 18:26 filter.d/apache-ratelimit.local
-rw-r--r-- 1 root root 1014 May 11 2017 filter.d/apache-shellshock.conf
```
Escoge los que te sean útiles y pasamos a crear las *jails* pertinentes. Nosotros usamos apache-badbots.conf, apache-overflows.conf, apache-ratelimit.local y apache-shellshock.conf.
{: style="text-align: justify;"}
```
 [root@localhost fail2ban]# cat jail.d/apache.local
 [apache-ratelimit]
 enabled = true
 filter = apache-ratelimit
 port = http,https
 logpath = /var/log/httpd/*access_log
 action = iptables-ipset-proto4[name=WWW, port="80,443", protocol=tcp]
 # mail[name=WWW, dest=root@donttouchmy.net]
 # 300 hits/10min * 20 min = 600
 maxretry = 600
 findtime = 1200
 bantime = 3600
 ignoreip = 127.0.0.1

[apache-bots]
 enabled = false
 filter = apache-badbots
 port = http,https
 logpath = /var/log/httpd/*access_log
 action = iptables-ipset-proto4[name=WWW, port="80,443", protocol=tcp]
 maxretry = 1
 findtime = 60
 bantime = 86400

[apache-overflows]
 enabled = false
 filter = apache-overflows
 port = http,https
 logpath = /var/log/httpd/*error_log
 /var/log/httpd/*access_log
 action = iptables-ipset-proto4[name=WWW, port="80,443", protocol=tcp]
 maxretry = 2
 findtime = 60
 bantime = 86400

[apache-shellshock]
 enabled = false
 filter = apache-shellshock
 port = http,https
 logpath = /var/log/httpd/*_error_log
 action = iptables-ipset-proto4[name=WWW, port="80,443", protocol=tcp]
 maxretry = 1
 findtime = 60
 bantime = 86400
```
Tened en cuenta contra que archivo de *log* tenemos usar cada filtro. Algunos buscaran en los archivos de acceso y otros en los de error. Recordad también que puedes usar * como *wildcard.*
{: style="text-align: justify;"}

### Postfix

Por último usamos el filtro por defecto de postfix para filtrar esos servidores que no han podido ser verificados por Postfix en el proceso de transferencia de correo.
{: style="text-align: justify;"}
```
[root@localhost fail2ban]# cat jail.d/postfix.local
[postfix]
enabled = true
filter = postfix
action = iptables-ipset-proto4[name=SMTP, port=smtp, protocol=tcp]
# mail[name=SMTP, dest=root@donttouchmy.net]
logpath = /var/log/maillog
maxretry = 5
findtime = 60
bantime = 3600
```
Gestionando Fail2Ban
--------------------

Primero habilitamos e iniciamos el servicio. Para CentOS 7 los comandos son los siguientes:
{: style="text-align: justify;"}
```
systemctl enable fail2ban.service
systemctl start fail2ban.service
```
Para controlar al servicio usamos el comando *fail2ban-client*. Los comandos relevantes son:

### Recargar configuración

Necesario siempre que modifiquemos un archivos de configuración.
```
[root@localhost fail2ban]# fail2ban-client reload
```
### Listar los Jails disponibles
```
[root@localhost ~]# fail2ban-client status
Status
|- Number of jail: 7
`- Jail list: apache-bots, apache-overflows, apache-ratelimit, apache-shellshock, postfix, ssh-failed
```
### Listar IPs baneadas

La manera más rápida es comprobar el arvhico de *log.*
```
[root@localhost fail2ban]# grep "fail2ban.actions.*Ban" /var/log/fail2ban.log
2018-02-05 04:11:43,773 fail2ban.actions [29739]: NOTICE [ssh-failed] Ban 188.166.158.162
2018-02-05 04:34:24,709 fail2ban.actions [29739]: NOTICE [ssh-failed] Ban 218.65.30.156
2018-02-05 05:30:26,056 fail2ban.actions [29739]: NOTICE [ssh-failed] Ban 94.46.186.152
2018-02-05 05:35:19,723 fail2ban.actions [29739]: NOTICE [ssh-failed] Ban 218.65.30.156
2018-02-05 06:34:49,267 fail2ban.actions [29739]: NOTICE [ssh-failed] Ban 42.7.26.54
2018-02-05 06:36:24,716 fail2ban.actions [29739]: NOTICE [ssh-failed] Ban 218.65.30.156
2018-02-05 07:36:59,327 fail2ban.actions [29739]: NOTICE [ssh-failed] Ban 218.65.30.156
2018-02-05 08:38:06,980 fail2ban.actions [29739]: NOTICE [ssh-failed] Ban 218.65.30.156
```
### Listar IPs filtradas en ipset

Si sólo hemos usado *iptables-**ipset* para como acción en nuestrar *jails* podemos usar *ipset* para listar las tablas de IPs.
```
[root@localhost fail2ban]# ipset --list
Name: f2b-SMTP
Type: hash:ip
Revision: 4
Header: family inet hashsize 1024 maxelem 65536
Size in memory: 128
References: 1
Members:

Name: f2b-WWW
Type: hash:ip
Revision: 4
Header: family inet hashsize 1024 maxelem 65536
Size in memory: 128
References: 1
Members:

Name: f2b-SSH
Type: hash:ip
Revision: 4
Header: family inet hashsize 1024 maxelem 65536
Size in memory: 176
References: 1
Members:
198.xx.57.xx
```
Mucho más cómodo ![🙂](https://s.w.org/images/core/emoji/13.0.1/svg/1f642.svg)

### Eliminar una IP baneada

Si tenemos la certeza de que una IP que ha sido validada es legítima, usaremos el comando siguiente para decirle a *fail2ban* que deje de filtrarla.
{: style="text-align: justify;"}
```
[root@localhost fail2ban]# fail2ban-client status ssh-failed
Status for the jail: ssh-failed
|- Filter
| |- Currently failed: 2
| |- Total failed: 89
| `- File list: /var/log/secure
`- Actions
 |- Currently banned: 1
 |- Total banned: 1
 `- Banned IP list: 198.zz.57.xx

[root@localhost fail2ban]# fail2ban-client set ssh-failed unbanip 198.zz.57.xx
198.zz.57.xx
```
Comprobamos
```
[root@localhost fail2ban]# fail2ban-client status ssh-failed
Status for the jail: ssh-failed
|- Filter
| |- Currently failed: 2
| |- Total failed: 92
| `- File list: /var/log/secure
`- Actions
 |- Currently banned: 0
 |- Total banned: 1
 `- Banned IP list:
```
### Añadir filtrar una IP

De lo contrario, si queremos filtrar una IP usaremos *fail2ban-client set <JAIL> banip <IP> <timeout>*
{: style="text-align: justify;"}
```
[root@localhost fail2ban]# fail2ban-client set ssh-failed banip 198.zz.57.xx
198.xx.57.xx

[root@localhost fail2ban]# fail2ban-client status ssh-failed
Status for the jail: ssh-failed
|- Filter
| |- Currently failed: 1
| |- Total failed: 129
| `- File list: /var/log/secure
`- Actions
 |- Currently banned: 1
 |- Total banned: 2
 `- Banned IP list: 198.zz.57.xx
```
### Ignorar una IP para un filtro
```
[root@localhost fail2ban]# fail2ban-client set ssh-failed addignoreip 192.168.1.23
These IP addresses/networks are ignored:
|- 127.0.0.1/8
`- 192.168.1.23
```
### Problemas encontrados

Uno de los problemas que nos hemos encontrado es que *fail2ban *no espera reutilizar reglas de *iptables *que ya han sido creadas en un *jail* anterior. Por ejemplo: en nuestro *jail *de *apache.local*, por cada uno de los *jails *declarados, crea la misma regla de *iptables* de nuevo.
{: style="text-align: justify;"}
```
[root@localhost action.d]# iptables -L -nv --line
Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
num pkts bytes target prot opt in out source destination
1 17 1108 REJECT tcp -- * * 0.0.0.0/0 0.0.0.0/0 multiport dports 22 match-set f2b-SSH src reject-with icmp-port-unreachable
2 20 1132 REJECT tcp -- * * 0.0.0.0/0 0.0.0.0/0 multiport dports 80,443 match-set f2b-WWW src reject-with icmp-port-unreachable
3 0 0 REJECT tcp -- * * 0.0.0.0/0 0.0.0.0/0 multiport dports 80,443 match-set f2b-WWW src reject-with icmp-port-unreachable
4 0 0 REJECT tcp -- * * 0.0.0.0/0 0.0.0.0/0 multiport dports 80,443 match-set f2b-WWW src reject-with icmp-port-unreachable
5 0 0 REJECT tcp -- * * 0.0.0.0/0 0.0.0.0/0 multiport dports 25 match-set f2b-SMTP src reject-with icmp-port-unreachable
6 0 0 REJECT tcp -- * * 0.0.0.0/0 0.0.0.0/0 multiport dports 80,443 match-set f2b-WWW src reject-with icmp-port-unreachable
7 0 0 REJECT tcp -- * * 0.0.0.0/0 0.0.0.0/0 multiport dports 80,443 match-set f2b-WWW src reject-with icmp-port-unreachable
```
Para evitar esto modificado las acciones *actionstart* y *actionstop *para que comprueben si la regla existe antes de crearla o eliminarla. Para conseguirlo, sólo hemos tenido que crear el archivo local *action.d/iptables-ipset-proto4.local *y reescribir las acciones *actionstart *y *actionstop.*
{: style="text-align: justify;"}
```
[root@localhost fail2ban]# cat action.d/iptables-ipset-proto4.local
[INCLUDES]

before = iptables-common.conf

[Definition]
# Check if rule exist before creating it.
#actionstart = ipset -q list f2b-<name> || ipset --create f2b-<name> iphash
# /etc/fail2ban/action.d/iptables-insert-ifnotexists.sh <chain> -p <protocol> -m multiport --dports <port> -m set --match-set f2b-<name> src -j <blocktype>
actionstart = ipset -q list f2b-<name> || ipset --create f2b-<name> iphash && <iptables> -C <chain> -p <protocol> -m multiport --dports <port> -m set --match-set f2b-<name> src -j <blocktype> || <iptables> -I <chain> -p <protocol> -m multiport --dports <port> -m set --match-set f2b-<name> src -j <blocktype>

actionstop = <iptables> -C <chain> -p <protocol> -m multiport --dports <port> -m set --match-set f2b-<name> src -j <blocktype> && <iptables> -D <chain> -p <protocol> -m multiport --dports <port> -m set --match-set f2b-<name> src -j <blocktype> ; ipset --flush f2b-<name> && ipset --destroy f2b-<name>
```
Revisando IPs baneadas
----------------------

Por último, si queremos recibir correos con las IPs que se han benado, podemos usar acciones de correo integradas en *fail2ban*(comentadas en los ejemplos) o ejecutar una *cron* que nos envíe un email diario con las IPs banneadas del día anterior. Os recomendamos encarecidamente la segunda opción si no queréis sufrir de *autospam* ![🙂](https://s.w.org/images/core/emoji/13.0.1/svg/1f642.svg)
{: style="text-align: justify;"}
```
[root@localhost fail2ban]# cat /etc/crontab
...
59 23 * * * root egrep $(date -d 'today' +\%y-\%m-\%d)'.*fail2ban\.actions.+Ban' /var/log/fail2ban.log|mail -E -s 'Todays filtered IPs' root
```
[![](https://donttouchmy.net/wp-content/uploads/2018/02/iptalbes.gif)](https://donttouchmy.net/wp-content/uploads/2018/02/iptalbes.gif)

Con esto finalizamos el post. Esperamos que os haya sido útil. En próximos *post *veremos como integrar *ModSecurity  a fail2ban*.
{: style="text-align: justify;"}

Cualquier duda que tengáis, corrección o petición que tengáis, por favor, dajad un comentario o enviadnos un email, y con mucho gusto os responderemos.
{: style="text-align: justify;"}
