#!/bin/bash
#-----------------------------------------------------------------
# vagrant.sh
#
# This script is a wrapper for Vagrant, allows the
# Vagrantfile to be call for anywhere in the system
# with a `vagrant.yml` or `vagrant.json` locate in the
# current working directory.
#
#<doc>
# Usage: ./vagrant.sh [options] [<vagrant_args>...]
# Options:
#
#   --project=PROJECT
#       Project name to prefix to the virtual machine names
#   --configs=CONFIG,CONFIG,...
#       Comma-separated list of paths to cascading config
#       files in order of cascade; if path does not
#       include file extension, will try .yml and .json
#       in that order. Default: ./vagrant
#
#<enddoc>
#-----------------------------------------------------------------

THIS=$(dirname $(which $0))

source "$THIS/../scripts/shell/shared.sh"

if [ $# -eq 0 ]; then
  set -h
fi

ARGV=()
for argv in "$@"; do
  case "$argv" in
    (--configs=*) export VAGRANT_CONFIGS="${argv#--configs=}";;
    (--project=*) export VAGRANT_PROJECT_NAME="${argv#--project=}";;
    (--help|-h) print_help && ARGV+=("$argv");;
    (*) ARGV+=("$argv");;
  esac
done

export VAGRANT_VAGRANTFILE="$THIS/../Vagrantfile"
vagrant "${ARGV[@]}"
