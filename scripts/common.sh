#!/bin/sh

# set -euo pipefail

GREEN=$(tput setaf 2)
RED=$(tput setaf 1)
YELLOW=$(tput setaf 3)
BLUE=$(tput setaf 4)
PINK=$(tput setaf 5)
CYAN=$(tput setaf 6)
WHITE=$(tput setaf 7)
NC='\e[0m'

# Function to print info message
info() {
  echo "${GREEN}[ INFO ] ${WHITE}$1${NC}" 1>&2
}

# Function to print error message
error() {
  echo "${RED}[ ERROR ] ${WHITE}$1${NC}" 1>&2
}

# Function to print warning message
warn() {
  echo "${YELLOW}[ WARN ] ${WHITE}$1${NC}" 1>&2
}

# Function to print debug message
debug() {
  echo "${BLUE}[ DEBUG ] ${WHITE}$1${NC}" 1>&2
}