#!/bin/bash
#-----------------------------------------------------------------
# vagrant_embed.sh
#
# This script embeds an instance of this project into
# an existing project as a submodule or subtree, allowing the
# container project to use it like a standard Vagrant
# instance with the same configurability.
#
#<doc>
# Usage: ./vagrant_embed.sh <subcommand> [options] <project>
#
# Arguments:
#
#   project   Path to root directory of the project to embed
#             the configurator within
#
# Subcommands:
#
#   init      Embed and initialize the configurator in this project
#   update    Update the configurator in this project
#
# Options:
#
#   --name=PROJECT
#       Project name to prefix to the virtual machine names.
#   --mode=MODE
#       Mode of embed: submodule or subtree
#       Default: submodule
#   --[no-]squash
#       When mode is subtree, squash commits or not
#   --main=CONFIG
#       Main configuration file relative to output configurations
#       directory `<project>/.vagrant/configurations`, if path does not
#       include file extension, will try .yml and .json in that order.
#       Default: vagrant
#   --configs=CONFIG,CONFIG,...
#       Comma-separated list of paths to cascading config
#       files in order of cascade; if path does not
#       include file extension, will try .yml and .json
#       in that order. Overrides --main option.
#   --run-local
#       Include ability to run the provisioning of the
#       environment locally on the host machine.
#   --help, -h
#       Display this help usage message.
#
#<enddoc>
#-----------------------------------------------------------------

THIS=$(dirname $(which $0))

source "$THIS/../scripts/shell/shared.sh"

#----------------------------------------
# Variables (defaults)
#----------------------------------------

this_instance="$THIS/.."
repo_url='https://github.com/vwchu/vagrant-configurator.git'
repo_branch='master'

relative_configs='.vagrant/configurations'
relative_install='.vagrant/configurator'
relative_vagrant_data='.vagrant/machines'
template_config=$this_instance/samples/_default.yml

subcommand=
configurations=$relative_configs/vagrant
project_rootpath=$PWD
project_name=
mode=submodule
squash=true
make_main=true

#----------------------------------------
# Git Functions
#----------------------------------------

no_git()
{
  if [[ -d $relative_install ]]; then
    rm -vrf $relative_install
  fi
  cp -av $this_instance $relative_install
}

git_submodule()
{
  case $1 in
    (init)    git submodule add -b $repo_branch $repo_url $relative_install;;
    (update)  git submodule update --remote;;
    (*)       die "git_submodule: bad subcommand '$1'";;
  esac
}

git_subtree()
{
  local subtree_cmd="$this_instance/scripts/shell/git-subtree.sh"
  local -a subtree_argv=(--prefix $relative_install $repo_url $repo_branch)
  if $squash; then
    subtree_argv+=(--squash)
  fi
  case $1 in
    (init)    $subtree_cmd add  ${subtree_argv[@]};;
    (update)  $subtree_cmd pull ${subtree_argv[@]};;
    (*)       die "git_subtree: bad subcommand '$1'";;
  esac
}

git_command()
{
  if (which git &> /dev/null) && (type git_$mode | head -n 1 | grep -q 'function'); then
    git_$mode $@
  else
    no_git
  fi
}

#----------------------------------------
# Writing Files
#----------------------------------------

write_environ()
{
  echo "ENV['$1'] = $2"
}

write_environs()
{
  local -A env_vars=(
    ['VAGRANT_PROJECT_NAME']="'$project_name'"
    ['VAGRANT_VAGRANTFILE']='File.expand_path(__FILE__)'
    ['VAGRANT_CONFIGS']="'$configurations'"
  )
  for key in ${!env_vars[@]}; do
    if [[ $key == 'VAGRANT_PROJECT_NAME' && -z "$project_name" ]]; then echo -n '#'; fi
    write_environ $key ${env_vars[$key]}
  done
}

write_loader()
{
  echo "load '$relative_install/Vagrantfile'"
}

write_vagrantfile()
{
  (write_environs; write_loader) > $project_rootpath/Vagrantfile
}

write_gitignore()
{
  local gitignore=$project_rootpath/.gitignore
  if [[ ! -f $gitignore ]]; then
    echo $relative_vagrant_data > $gitignore
  elif ! (cat $gitignore | grep -q $relative_vagrant_data); then
    if ! file_ends_with_newline $gitignore; then
      echo >> $gitignore
    fi
    echo $relative_vagrant_data >> $gitignore
  fi
}

write_main_config()
{
  if $make_main && [[ ! -f $configurations ]]; then
    echo "# $configurations.yml" > $configurations.yml
    if [[ -f $template_config ]]; then
      cat $template_config | sed '/^#/d' >> $configurations.yml
    fi
  fi
}

#----------------------------------------
# Commands
#----------------------------------------

do_init()
{
  mkdir -p $relative_configs
  git_command init \
    && write_vagrantfile \
    && write_main_config \
    && write_gitignore
}

do_update()
{
  git_command update
}

#----------------------------------------
# Process Arguments
#----------------------------------------

process_options()
{
  for argv in $@; do
    case $argv in
      (--help|-h)   print_help; exit 0;;
      (--name=*)    project_name=${argv#--name=};;
      (--mode=*)    case ${argv#--mode=} in
                      (submodule) mode=submodule;;
                      (subtree)   mode=subtree;;
                    esac;;
      (--squash)    squash=true;;
      (--no-squash) squash=false;;
      (--main=*)    configurations=$relative_configs/${argv#--main=};;
      (--configs=*) configurations=${argv#--configs=}; make_main=false;;
      (--run-local) repo_branch=run_local;;
      (-*)          die "Unknown option '$argv'";;
      (*)           if [[ ! -d $argv ]]; then
                      die "'$argv' project directory does not exist"
                    else
                      project_rootpath=$argv
                    fi;;
    esac
  done
}

#----------------------------------------
# Main
#----------------------------------------

main()
{
  case $1 in
    (--help|-h) print_help; exit 0;;
    (init)      subcommand=$1; shift;;
    (update)    subcommand=$1; shift;;
    (-*)        die "Unknown option '$1'";;
    (*)         die "Unknown command '$1'";;
  esac
  process_options $@
  cd $project_rootpath
  do_$subcommand
}

if [[ $# -eq 0 ]]; then
  set -h
fi

(main $@)
