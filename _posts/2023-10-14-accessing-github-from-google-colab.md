---
layout: single
title: Accessing Private GitHub Repositories from Google Colab
author-id: Chingis Maksimov
tags: [GitHub, Google Colab]
classes: wide
---

According to [Google Colab website](https://colab.google),

> Colab is a hosted Jupyter Notebook service that requires no setup to use and provides free access to computing resources, including GPUs and TPUs. Colab is especially well suited to machine learning, data science, and education.

In this short blog post, I will tell you the steps required to access your private GitHub repositories in Google Colab so that you can speed up training of your ML and DL models. 

1. Start by generating a new SSH key.
```bash
ssh-keygen -t ed25519 -C "<your_email>"
```
When prompted, choose file where to save the newly generated keys. You can leave passphrase blank.
2. The next step is to create a deploy key for the GitHub repository that you want to be able to access from Google Colab. To do this,
- Copy the newly created SSH public key (the one with .pub extension) into clipboard:
```bash
pbcopy < /path_to_key/id_ed25519.pub
```
- Open the repository in GitHub -> Settings -> Deploy keys -> Add deploy key;
- Come up with an appropriate title. For example, "Google Colab key";
- Paste the key into "Key" tab and press Add Key.
3. Open a Google Colab notebook and mount your Google Drive. Save your private SSH key somewhere in Google Drive.
4. In the first cell of the notebook add the following:
```
! mkdir -p /root/.ssh # creates a new directory in the current Google Colab session to keep your private SSH key
! cp drive/MyDrive/<path_to_saved_key_in_Google_Drive>/id_ed25519 /root/.ssh/id_ed25519 # copy private SSH key from Google Drive to .ssh folder for the current Google Colab session
! ssh-keyscan -t ed25519 github.com >> /root/.ssh/known_hosts
! chmod go-rwx /root/.ssh/id_ed25519
```
For each session of this notebook, the above code needs to be re-run. This is the reason behind saving the private SSH key in Google Drive.
5. Now you can clone your private GitHub repo in the currently running Google Colab session.