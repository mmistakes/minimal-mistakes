---
layout: post
title:  "Rescue Mode with OVH and Kimsufi"
excerpt: "Rescue Mode with OVH and Kimsufi"
tags: [ovh, rescue, mode]
modified: "2016-02-15"
comments: true
---

I recently made a wrong manipulation on my server removing SSH access for everybody (root and users), then I lost my connection.
So, impossible to connect to my server again to fix the problem. But there is a solution... the OVH Rescue Mode.

## Ovh/Kimsufi manager

Log into your online OVH/kimsufi account then follow those instructions:

* Click on the **NetBoot** button

![Rescue](/images/posts/rescue1.png)

* Choose the Rescue Mode clicking on the **Rescue** button

![Rescue](/images/posts/rescue2.png)

* On the home page click on the **Reboot** button.

![Rescue](/images/posts/rescue1.png)

Your server will be rebooted in the Rescue Mode and you will receive (by email) a temporary root access password to repare your server.

## Command line

Log into your server with the correct ssh command (and the temporary root password):

{% highlight bash %}
$ ssh root@213.186.xx.yy
The authenticity of host '213.186.xx.yy (213.186.xx.yy)' can't be established.
RSA key fingerprint is 02:11:f2:db:ad:42:86:de:f3:10:9a:fa:41:2d:09:77.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '213.186.xx.yy' (RSA) to the list of known hosts.
Password:
root@rescue:~#
{% endhighlight %}

When connected with the rescue mode, you need to check your partition table to be able to mount the partition you need to repare:

{% highlight bash %}
root@rescue:~# parted /dev/sda print
Model: ATA Hitachi HDS72302 (scsi)
Disk /dev/sda: 2000GB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags: 

Number  Start   End     Size    File system     Name     Flags
 1      20.5kB  1049kB  1029kB                  primary  bios_grub
 2      2097kB  105GB   105GB   ext4            primary
 3      105GB   1996GB  1891GB  ext4            primary
 4      1996GB  2000GB  4294MB  linux-swap(v1)  primary
{% endhighlight %}

With a simple `fdisk -l` you will see your partition list:

{% highlight bash %}
root@rescue:~# fdisk -l
{% endhighlight %}


Now you need to mount your partition with the correct file system:

{% highlight bash %}
root@rescue:~# mkdir -p /mnt/dummy
root@rescue:~# mount -t ext4 /dev/sda1 /mnt/dummy
{% endhighlight %}

Then you can take back control of your partition and retrieve your normal root user with:

{% highlight bash %}
root@rescue:~# chroot /mnt/dummy
{% endhighlight %}

You can now repare your partition and your configuration.

## Restart in classical mode

Log into your online OVH/kimsufi account then follow those instructions:

* Click on the **NetBoot** button

![Rescue](/images/posts/rescue1.png)

* Choose the **Hard drive** mode clicking on the correct button.

![Rescue](/images/posts/rescue2.png)

* On the home page click on the **Reboot** button.

![Rescue](/images/posts/rescue1.png)


**Congratulations !**