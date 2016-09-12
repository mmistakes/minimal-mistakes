# Samples Configurations

## Files

* [base.yml](base.yml)
* [binding.yml](binding.yml)
* [boost.yml](boost.yml)
* [homestead.yml (excluded)](homestead.yml)
* [node.yml](node.yml)
* [php.yml](php.yml)
* [ruby.yml](ruby.yml)
* [vagrant.yml](vagrant.yml)
* [webserver.yml](webserver.yml)

## Usage

* Run globally, `sh vagrant.sh up`
* Run embedded, `sh vagrant_embed.sh init` and then copy the
  configurations files into `.vagrant/configurations` of that project.

## Structures

### Inclusions

```
vagrant
├── base
├── webserver
├── php
│   └── webserver
├── ruby
├── node
├── binding
└── boost
```

### Mixins

```
.
├── node
├── php
│   └── webserver
├── ruby
└── webserver
```

### Machine Inheritance

```
base
└── main
```

## Adding `Homestead`

Edit `vagrant.yml`:

```yaml
includes:
  ...
  - homestead.yml

machines:
  ...
  homestead:
    inherit: base # or main
    includes: [homestead]
```

Now running Vagrant: `vagrant <subcommand>` acts on all machines: `main` and `homestead`.
To operate only on `main`, run `vagrant <subcommand> main`.
Similarly, to operate only on `homestead`, run `vagrant <subcommand> homestead`.

To only start `homestead` when running `vagrant <subcommand>`, with an option to
start `main` manually `vagrant <subcommand> main`, edit `vagrant.yml`:

```yaml
...
primary: homestead
machines:
  main:
    ...
    autostart: false
    ...
  ...
```

To disable `main`, edit `vagrant.yml`:

```yaml
machines:
  main:
    ...
    abstract: true
    ...
  ...
```
