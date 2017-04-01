---
title: Decrypt Synology Backups in Linux
excerpt: How to decrypt an encrypted Synology backup in Linux without access to the Synology NAS.
date: 2017-03-27 05:00:00 +0000
layout: single
categories: posts
tags:
 - synology
 - google drive
 - encryption
 - backup
 - linux
---
## Scenario

You have access to a folder encrypted by a Synology NAS in Linux and you want to decrypt it (without the Synology). Example: offsite backup of an encrypted Synology folder.

## Steps

1. Install `ecryptfs`
```bash
$ sudo apt-get install ecryptfs-utils
```

2. Create a mount point
```bash
sudo mkdir /mnt/synology
```

3. Mount the folder
Mount the folder and use the password/key from the original encryption on the Synology.
```bash
$ mount -t ecryptfs /path/to/src /mnt/synology_decrypt
# aes
# 32 bytes
# plaintext passthrough - n
# filename encryption - y
```
**NOTE**: _the src folder must not be nested inside a folder encrypted using ecryptfs (ex: encrypted Ubuntu home folder)_

## References

  * <http://robertcastle.com/2012/10/howto-recover-synology-encrypted-folders-in-linux/>
  * <http://www.thenakedscientists.com/forum/index.php?topic=49888.0>
