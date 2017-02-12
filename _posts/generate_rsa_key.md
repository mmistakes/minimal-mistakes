```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
see more: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

Add the ssh key into ssh-agent

```
ssh-add ~/.ssh/id_rsa
```

Useful command:

Get list of key:

```
ssh-add -L
```

Remove key

```
ssh-add -D ~/.ssh/id_rsa
```

Copy the key into the clipboard

install: https://gist.github.com/chriscandy/753eb149e9735e852b0b

```
pbcopy < id_rsa_git_evs.pub
```



OVH Server
```
see more: https://wiki.archlinux.org/index.php/SSH_keys
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-copy-id -i ~/.ssh/id_rsa_ovh_server.pub -p 85 jluccisano@nextrun.fr
```
Raspberry PI
```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-copy-id -i ~/.ssh/id_rsa_raspberry -p 85 pi@81.56.136.120
```

https://gist.github.com/jexchan/2351996

```
cd ~/.ssh/
touch config
subl -a config

Host evs-gitlab
    HostName ifgit.evs.tv
    User jls
    IdentityFile ~/.ssh/id_rsa_git_evs

Host github
    HostName github.com
    User jluccisano
    IdentityFile ~/.ssh/id_rsa_github
```