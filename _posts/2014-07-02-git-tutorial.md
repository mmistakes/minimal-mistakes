---
layout: post
title: "Git Tutorial"
date: 2014-07-02 08:00:00
categories: sysadmin
---

**Git** is a distributed version control system version control system track history of a collection of files and includes the functionality to revert to another version.

Distributed version control system does not necessarily have a central server which stores data.

User can copy existing repository (**cloning**).

Every clone contains full history of the collection of files and a clone repository has the same functionality as the original repository.

Users with sufficient authorization can **push** changes from their local repositories to remote repositories, they can also **fetch** or **pull** changes from other repositories to their local Git repository.

Git support **branching** which means you can work on different versions of your collection files.

**Working tree** is the current collection of files.

Git using **SHA-1 checksum** as file integrity protection.

Add changes to your Git repository by first add selected file to staging area and commit the changes in staging area to Git repository.

Mark changes in the working tree by staging or add changes to staging area.

	# git add .
        
After adding files to staging area you can commit this file to permanently add them to Git repository.

	# git commit 

Push the modified version of files to remote repository using push command.

	# git push <repository>
