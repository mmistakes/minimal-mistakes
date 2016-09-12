# Vagrant VM configuration tool

A small tool for specifying and configuring a multiple machine
environment using the virtual machine management and
automation tool, Vagrant, from a YAML or JSON file or a ERB
templating file that generates a YAML or JSON output. Multiple
configuration files can also be cascaded and merged together
dynamically to composite machines using the `includes` property or
the `--configs` option.

## Getting Started

### Global Installation

1. Install [VirtualBox](https://www.virtualbox.org)
2. Install [Vagrant](https://www.vagrantup.com/)
3. Clone this repository
4. Add the `bin` directory to your `PATH` environment variable
5. Create your configuration files in a location of your choice,
   see [Configuring the Environment](#config).

   **Note:** You must have the root configuration file as `vagrant.yml`
   or `vagrant.json` in the current working directory.

6. Run the command:

   ```bash
   bash vagrant.sh [options] up [vm]
   ```

### Embedded Installation

1. Do a global installation (up to Step 4)
2. In the project that you want to embedded this tool, run commands:

   ```bash
   bash vagrant_embed.sh [options]
   ```

3. Create your configuration files in `.vagrant/configurations`,
   see [Configuring the Environment](#config).

   **Note:** You must have the root configuration file as `vagrant.yml`
   or `vagrant.json` in the `configurations` directory.

4. Add the `Vagrantfile` and configuration files to your project's git.
5. Use Vagrant like normal (i.e.: `vagrant up`).

## <a name="config"></a> Configuring the Environment

To create or configure a single or multiple virtual machine
environment, create a `vagrant.yml` based on the documentation provided
in [`vagrant.doc.yml`](docs/vagrant.doc.yml) file. Sample configurations
can be found in the [`samples`](samples/README.md) directory.

**Note:** Not all Vagrant features are implemented, yet.

## Requirements

* [Oracle VirtualBox](https://www.virtualbox.org)
* [Vagrant](https://www.vagrantup.com/)
