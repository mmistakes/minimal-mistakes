---
redirect_to: "https://netfoundry.io/docs/platform/api-guides/"
permalink: /guides/cli/
redirect_from:
  - /v2/guides/cli/
title: "Command-Line Interface Guide"
sidebar:
    nav: v2guides
toc: true
#classes: wide
---

## nfctl

The NetFoundry CLI `nfctl` is an interactive tool for MacOS, Windows, and Linux and is useful for inspecting and configuring NetFoundry networks.

{% include youtube.html id="EFw3PIp4WEg" %}

## Installation

The CLI is bundled with [the NetFoundry Python3 module](/guides/python/).

```bash
# install in homedir: make sure to add it to your executable search PATH e.g.  ~/.local/bin or %APPDATA%\Python\bin
❯ pip install --user netfoundry
# or in a virtualenv (not as root)
❯ pip install netfoundry
❯ nfctl --version
v5.5.0
```

Please raise [a GitHub issue](https://github.com/netfoundry/python-netfoundry/issues) if you have trouble with installation. Let us know your OS version and what went wrong.

## Docker

You may run `nfctl` with Docker instead of installing on your device.

```bash
❯ docker run \
  --rm \
  --volume ~/.netfoundry/credentials.json:/netfoundry/credentials.json \
  netfoundry/python:latest nfctl login
| domain       | summary                                                                                                                             |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------|
| organization | "NF Ziti" (NFZITI) logged in as ACMETest (acmetest@netfoundry.io) until 01:51 GMT+0000 (T-3599s) |
```

## Upgrade

```bash
❯ pip install --upgrade netfoundry
```

## Auto-Complete

Tab auto-complete is enabled by adding the following to your `~/.bashrc` file. This also works for Z-Shell if you have `bashcompinit` [described here](https://kislyuk.github.io/argcomplete/#zsh-support).

```bash
eval "$(register-python-argcomplete nfctl)"
```
or
```bash
source <(register-python-argcomplete nfctl)
```

You may choose to add a line like this to your shell config to enable all future shells or run it at any time to configure that shell for auto-complete until exit.

`nfctl` also supports [global tab auto-completion](https://github.com/kislyuk/argcomplete#global-completion) by way of `argcomplete` for `argparse`. This works in BASH >=4.2 by way of `complete -D`.

## Grammar

The CLI expects options and sub-commands. The general options must precede the sub-command. The default sub-command is `login`. Sub-commands also expect their own options which must follow the sub-command. The sub-commands are generally verbs that act upon an object. For example: `edit endpoint` or `list endpoints`.

```bash
nfctl GENERAL_OPTIONS SUB_COMMAND RESOURCE_TYPE FILTER_QUERY SUB_OPTIONS
# e.g.
nfctl --network NETWORK list services modelType=TunnelerToEdgeRouter --keys id,zitiId,name
```

## Options

I'll describe the most relevant options immediately below. Run `nfctl --help` to see the up-to-date and complete options and sub-commands.

### credentials

```bash
nfctl --credentials NETFOUNDRY_API_ACCOUNT
```

You may supply an API account as a JSON file path to `nfctl --credentials NETFOUNDRY_API_ACCOUNT` in order to login. It is not strictly necessary to supply this option if you already have a login token. You may learn how to obtain an API account credentials file in [the authentication guide](/guides/authentication/#get-an-api-account).

### verbose

```bash
nfctl --verbose
```

Print DEBUG and higher-level messages including HTTP requests to the NF API and from the Python library.

### output

```bash
nfctl --output {text,yaml,json}
```

Format output as text tables, YAML, or JSON.
### network

```bash
nfctl --network NETWORK
```

Configure the CLI to use a particular network by name. Escape if the name has spaces. Network names are not case sensitive.
### network-group

```bash
nfctl --network-group NETWORK_GROUP
```

Configure the CLI to use a particular network group by name. Network names are unique within each group, and so it may be necessary to specify the group to disambiguate two networks with the same name.
### yes

```bash
nfctl --yes
```

Answer in the affirmative without prompting for confirmation. Use this with caution because it is possible to unintentionally destroy an entire network. You did `nfctl get network` to create a backup, right?

### profile

```bash
nfctl --profile PROFILE
```

Login profiles allow you to cache more than one login token concurrently. You must specify the same value for `nfctl --profile PROFILE` for every command that you wish to use a non-default profile. This behavior is not set in stone. See also the [logout](#logout) command.

## Sub-Commands

* **[`config`](#config)**              read and write configuration settings.
* **[`login`](#login)**               login to NetFoundry with a user token or API account credentials
* **[`logout`](#logout)**              logout your identity for the current current profile
* **[`get`](#get)**                 get a single resource by type and query
* **[`list`](#list)**                find a collection of resources by type and query
* **[`copy`](#copy)**                duplicate a resource
* **[`create`](#create)**              create a resource from a file
* **[`edit`](#edit)**                edit a resource with EDITOR
* **[`delete`](#delete)**              delete a single resource by type and query
* **[`demo`](#demo)**                create a functioning demo network

### config

Interactively configure `nfctl`. Most of the OPTIONS are also configuration directives and may be declared with `nfctl config` sub-command or added to the INI configuration file. The file location depends on your OS.

```bash
❯ nfctl config --help
usage: nfctl config [-h] [-ro] [-a] [configs ...]

positional arguments:
  configs           Configuration options to read or write.

optional arguments:
  -h, --help        show this help message and exit
  -ro, --read-only  Operate in read-only mode.
  -a, --all         Show all configuration options.
```

```bash
# view current configuration that differs from the default
❯ nfctl config 
general.borders=False
general.color=False
general.proxy=http://localhost:4321
```

```bash
# declare a new value for some directive
❯ nfctl config general.credentials="ACME Net.json"
general.proxy: None -> "ACME Net.json"
ℹ Wrote configuration to /home/kbingham/.config/nfctl/nfctl.ini
```

```bash
# unset a config directive by assigning "None" or delete from INI file
❯ nfctl config general.network=None
general.proxy: "ACME Net.json" -> None
ℹ Wrote configuration to /home/kbingham/.config/nfctl/nfctl.ini
```

```powershell
# recommended Windows configuration
PS C:\Users\IEUser> nfctl.exe config general.color=False general.unicode=False
general.color: True -> False
general.unicode: True -> False
ℹ Wrote configuration to 'C:\Users\IEUser\AppData\Local\NFCTL.EXE\nfctl.exe\nfctl.exe.ini'
```

### login

#### Obtain a token with a credentials file

`login` is the default sub-command and logs you in to a NetFoundry organization by fetching and caching a login token with your API account credentials. You must supply an API account as a JSON file path to `nfctl --credentials NETFOUNDRY_API_ACCOUNT` or as environment variables as described in [the authentication guide](/guides/authentication/#command-line-examples). You may also learn how to obtain an API account credentials file in [the authentication guide](/guides/authentication/#get-an-api-account).

The `nfctl login --eval` option causes the CLI to emit shell configuration for evaluation by the `eval` or `source` commands. This is useful for exporting an API token to your shell for use in other apps outside of the CLI. Check out [the REST examples](/guides/rest/) for ideas. There are more details about using `login --eval` to authenticate via the shell environment in [the authentication guide](/guides/authentication).

#### Logging in with a user token without a credentials file

You can run the `login` command without a credentials file if you already have a token. There are three ways to supply your token to the `login` command.

1. Supply the token as the value of the `NETFOUNDRY_API_TOKEN` environment variable.
1. If you do not supply a token in advance the CLI will interactively prompt you for it.

### logout

Delete any cached login token for the current login profile. This is useful for switching between API account identities. See also the [profile](#profile) option.

### get

Fetch a single resource as YAML or JSON from any of several resource domains of which `network` and `organization` are the most relevant. Use tab-autocomplete to assist typing the singular form of any type of resource to get e.g. `nfctl get service`. To get a resource you need to provide the ID or a query for which there is exactly one result.

```bash
nfctl get edge-router id=d1280fff-2b55-4e44-96a5-667b45a7c5b6
# or
nfctl get edge-router zitiId=uBvRZJDB0e
# or
nfctl get edge-router name="Router1"
```

### list

Find resources as lists. You must specify the plural form of the type of resource to list e.g. `nfctl list services`. The default output format is a text table and you may configure table preferences for headers, borders, or color in the general configuration section of the INI file, interactively with the `nfctl config` command, or by including the appropriate general options each time you run `nfctl --no-headers --no-borders --no-color list services`.

You may supply any query parameters that are supported by the NF API.

You may filter the output's columns with the `--keys k,k,k` option. This works for the text, yaml, and json output formats.

```bash
nfctl --network NETWORK list edge-routers
# or query by provider
nfctl --network NETWORK list edge-routers provider=AZURE
# or filter results for only interesting keys
nfctl --network NETWORK list edge-routers region=us-east-2 --keys name,id,status,provider
```

### copy

You may duplicate any mutable resources with the `nfctl copy` command. First, be sure to configure your shell environment so that `EDITOR` variable points to your preferred editor. For example, VSCode users may assign in their `~/.bashrc` file like `export EDITOR='code --wait'`, and `nfctl` will honor this preference. The default is `vim`. The resource to copy is selected by writing a query that has exactly one result, just like `nfctl get` and `nfctl delete` commands.

```bash
nfctl copy edge-router id=d1280fff-2b55-4e44-96a5-667b45a7c5b6
# or
nfctl copy edge-router zitiId=uBvRZJDB0e
# or
nfctl copy edge-router name="Router1"
# or
nfctl copy edge-router name="Router_"  # assuming there's only one router named like "Router?"
```

### create

You may create a resource in the network domain (in a particular network) by supplying an object as YAML or JSON. There is partial support at this time for creating a resource from a template. You can try it out by saying:

```bash
nfctl --network NETWORK create endpoint
```

```bash
# create from stdin
nfctl --network NETWORK create endpoint < ./new-endpoint.yml
# or from a file
nfctl --network NETWORK create endpoint --file ./new-endpoint.yml
```

### edit

You may edit a resource in the network domain (in a particular network) by specifying the singular form or a resource type and a query that selects exactly one resource. This will open that resource in your default editor allowing you to modify its properties. It will be updated when you exit the editor. You may cancel the edit / update operation by clearing the editor's buffer just like `kubectl` or `git`.

You may configure your default editor with the NETFOUNDRY_EDITOR or EDITOR environment variables. I use VS Code like this:

```bash
# from shell config
NETFOUNDRY_EDITOR="/usr/bin/code --wait"
```

```bash
nfctl --network NETWORK edit service name="ACME Service"
```

### delete

You may delete a resource in the network domain (in a particular network, or the network itself) by specifying the singular form of a resource type and a query that selects exactly one resource. You will be prompted to confirm unless you set `--yes` in the general config. Nothing will get deleted if this fails to match exactly one resource.

```bash
nfctl --network NETWORK delete service name="ACME Service"
# or by ID
nfctl --network NETWORK delete service id=8b3be67b-919c-4431-8cf8-b43cfe5fda46
```

### demo

The `nfctl demo` subcommand creates a few functioning services that are bound to NetFoundry-hosted routers in the created network. You could use this to quickly create a network on which to build out private services in addition to the public demo services that are created for the demo.

```bash
nfctl demo
```

The demo has [a standalone guide](/guides/demo/) with more ideas and tips!
