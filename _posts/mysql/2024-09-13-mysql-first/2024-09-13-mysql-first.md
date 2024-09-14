---
title: "MySQL/MariaDB"
layout: archive
categories:
 : mysql
permalink: mysql/start
---
![](mysql/2024-09-13-mysql-first/2024-09-13-20-00-39.png)

```
systemctl status mysqld.service
```

#{% assign posts = site.categories.blog %}
#{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}