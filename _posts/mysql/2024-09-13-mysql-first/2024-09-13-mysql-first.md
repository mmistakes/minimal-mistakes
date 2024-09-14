---
title:  "MySQL/MariaDB First"
excerpt: "systemctl start mysql.post.service"

categories:
  - Mysql
tags:
  - [mysql, mariadb]
permalink: mysql-first
toc: true
toc_sticky: true
 
date: 2024-09-14
last_modified_at: 2024-09-14
---
![](mysql/2024-09-13-mysql-first/2024-09-13-20-00-39.png)

```
systemctl status mysqld.service
```

{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}