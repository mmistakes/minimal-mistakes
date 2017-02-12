https://hub.docker.com/r/wonderfall/nextcloud/

docker run -d --name db_nextcloud \
       -v /mnt/nextcloud/db:/var/lib/mysql \
       -e MYSQL_ROOT_PASSWORD=secretPassword \
       -e MYSQL_DATABASE=nextcloud -e MYSQL_USER=jluccisano \
       -e MYSQL_PASSWORD=secretPassword \
       mariadb:10

docker run -d --name nextcloud \
       --link db_nextcloud:db_nextcloud \
       -v /mnt/nextcloud/data:/data \
       -v /mnt/nextcloud/config:/config \
       -v /mnt/nextcloud/apps:/apps2 \
       -e UID=1000 -e GID=1000 \
       -e UPLOAD_MAX_SIZE=10G \
       -e APC_SHM_SIZE=128M \
       -e OPCACHE_MEM_SIZE=128 \
       -e CRON_PERIOD=15m \
       -e TZ=Etc/UTC \
       -e ADMIN_USER=jluccisano \
       -e ADMIN_PASSWORD=secretPassword \
       -e DOMAIN=localhost \
       -e DB_TYPE=mysql \
       -e DB_NAME=nextcloud \
       -e DB_USER=jluccisano \
       -e DB_PASSWORD=secretPassword \
       -e DB_HOST=db_nextcloud \
       -p 8888:8888 \
       wonderfall/nextcloud:10.0


Add trusted domain:

```bash
vim /mnt/nextcloud/config/config.php
```

```
 'trusted_domains' =>
  array (
    0 => '192.95.25.173',
    1 => 'nextrun.fr',
  ),
```

