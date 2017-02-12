pacman -S sudo
groupadd sudo

passwd
useradd jluccisano
passwd jluccisano
groupadd sshusers

usermod -a -G root,adm,sudo,sshusers jluccisano
vim /etc/ssh/sshd_config

Port 1234                  # On change le port SSH d’accès au serveurpar défaut
PermitRootLogin no         # On interdit les connexions en tant que root
MaxStartups 10:30:60       # 10 connexions sans authentification, sinon 30% de rejet jusqu'à 100% en 60 connexions
LoginGraceTime 30          # Une connexion de 30 secondes en SSH sans authentification entraîne la déconnexion
AllowGroups sshusers
AllowUsers jluccisano

systemctl restart sshd.service
systemctl list-units --type=service 


pacman -S zsh  
pacman -S git
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
pacman -S docker
systemctl restart docker
groupadd docker
usermod -aG docker jluccisano

curl -L "https://github.com/docker/compose/releases/download/1.10.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

systemctl reboot
