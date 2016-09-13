# Vagrant VM configurations for Jekyll

## Requirements
* [`vagrant-configurator`](https://github.com/vwchu/vagrant-configurator)

## Usage

```bash
cd <your-project>
sh vagrant_embed.sh init --mode=subtree
rm -rf .vagrant/configurations
git add Vagrantfile .gitignore
git commit --amend
git subtree add \
    --squash --prefix .vagrant/configurations \
    https://github.com/vwchu/vagrant-configurator-jekyll.git master
...
vagrant up
```
