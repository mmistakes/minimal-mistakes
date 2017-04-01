---
title: Encrypted Folder Backup from Synology to Google Drive
excerpt: How to backup an encrypted folder or a mix of encrypted and non-encrypted folders from a Synology NAS to Google Drive (or any cloud provider)
date: 2017-03-25 01:00:00 +0000
layout: single
categories: posts
tags:
 - synology
 - google drive
 - encryption
 - backup
---
Synology Cloud Sync is very useful and particularly powerful when paired with Hyper Backup. However, there are some more complex scenarios that aren't supported if you're interested in encrypted backups to your favorite cloud provider. For instance:
1. Selecting a root folder on the synology that is encrypted
2. Backing up a mix of encrypted folders and non-encrypted folders


Unfortunately, Synology Cloud Sync does not support backup of encrypted directories directly to Google Drive. There is an [option](https://www.synology.com/en-uk/knowledgebase/DSM/help/CloudSync/cloudsync) to encrypt the contents upon upload, but this doesn't work if you are backing up a synology-encrypted folder. However, it is fairly straightforward to work around this and use Google Drive to store backups encrypted using Synology.

Here's how to do it.

**Note:** This was tested on Synology DSM 6.X
{: .notice--info}

## Create a new Shared Directory
Create an unencrypted Shared Directory on the Synology. See instructions [here](https://www.synology.com/en-uk/knowledgebase/DSM/help/DSM/AdminCenter/file_share_create).

Let's call it `GDrive_Backup` for now.

## Enable Cloud Sync
Enable Cloud Sync for your Google Drive account using this new directory. See the instructions [here](https://www.synology.com/en-uk/knowledgebase/DSM/help/CloudSync/cloudsync)

## Copy encrypted contents
Copy encrypted shared directory contents to GDrive_Backup.
```bash
$ cp -rf /volume2/@your_enc_shared_dir@ /volume2/GDrive_Backup/enc_backup
```

You may want to remove all `@eaDir` folders if they exist before backing up


```bash
$ cd /volume2/your_un_enc_shared_dir
$ find . -name @eaDir -print0 | xargs -0 /bin/rm -rf
```

### Automate the backup
You can use rsync and the Synology Task Scheduler to automate the backup
{: .notice--info}

Here's an example script you can add to the Synology Task Scheduler (via the gui in Control Panel). Put the following (modified for your use case) in a file somewhere you can reference in the Task Scheduler.
```bash
$ mkdir -p /volume2/tmp/.tmp_rsync
$ rsync -av -T /volume2/tmp/.tmp_rsync /volume2/@your_enc_shared_dir@ /volume2/GDrive_Backup/backup_name
```

**Caution:** Make sure you don't use `/tmp` as the temporary rsync location since there's not enough space for large files
{: .notice--danger}

## Verify backup from Google Drive

*Note: the following was done on a Ubuntu Linux instance*

1. Download entire folder from Google Drive and unzip (*Not in home directory if using encryption in Ubuntu!*)
2. Get a copy of encrypted and/or unencrypted contents directly from Synology
3. Fix renaming issue from Google Drive (it doesn't like when a file ends in a ".")
```bash
$ cd path/to/unzipped/GDrive/download
$ find . -name '*_TailCharacterConflict' -print0 | xargs -0 rename 's/\.\_.*_TailCharacterConflict$/\./'
```
4. [unencrypt and mount new directory]({{"/posts/decrypt-synology-backups/" | absolute_url }})
5. compare contents
```bash
$ diff -rq /path/to/orig /path/to/gdrive_version
```
