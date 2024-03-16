#!/bin/bash

# load common functions
. ../common.sh

CREATE_NAMESPACE=false

usage() {
 echo "Create certs for istio"
 echo "Usage: $0 [OPTIONS]"
 echo "Options:"
 echo " -h, --help                   Display this help message"
 echo "     --clusters               List of clusters to make certs for"
 echo "     --create-namespace       Create istio-system namespace"
}

has_argument() {
    [[ ("$1" == *=* && -n ${1#*=}) || ( ! -z "$2" && "$2" != -*)  ]];
}

extract_argument() {
  echo "${2:-${1#*=}}"
}

# Function to handle options and arguments
handle_options() {
  while [ $# -gt 0 ]; do
    case $1 in
      -h | --help)
        usage
        exit 0
        ;;
      --clusters*)
        if ! has_argument $@; then
          echo "clusters not specified." >&2
          usage
          exit 1
        fi
        CLUSTERS=$(extract_argument $@)
        shift
        ;;
      --create-namespace*)
        CREATE_NAMESPACE=$(extract_argument $@)
        shift
        ;;
      *)
        echo "Invalid option: $1" >&2
        usage
        exit 1
        ;;

    esac
    shift
  done
}

# Main script execution
handle_options "$@"

cd ../../certificates

# info "Making Root CA"
# # make -f ../tools/certs/Makefile.selfsigned.mk root-ca
# # if error occurs, exit
# if [ $? -ne 0 ]; then
#   error "Failed to make Root CA"
#   exit 1
# fi

# get the clusters array
IFS=',' read -r -a CLUSTERS_ARRAY <<< "$CLUSTERS"
for cluster in "${CLUSTERS_ARRAY[@]}"
do
  info "Making $cluster CA"
  make -f ../tools/certs/Makefile.selfsigned.mk "$cluster-cacerts"
  # if error occurs, exit
  if [ $? -ne 0 ]; then
    error "Failed to make $cluster CA"
    exit 1
  fi
  info "Switching to $cluster context"
  kubectl config use-context $cluster
  # if error occurs, exit
  if [ $? -ne 0 ]; then
    error "Failed to switch to $cluster context"
    exit 1
  fi
  if [ "$CREATE_NAMESPACE" = true ] ; then
    info "Creating namespace istio-system"
    kubectl create namespace istio-system
    # if error occurs, exit
    if [ $? -ne 0 ]; then
      error "Failed to create namespace istio-system"
      exit 1
    fi
  else
    info "Namespace istio-system already exists $CREATE_NAMESPACE"
  fi
  info "Creating secret cacerts in istio-system namespace"
  kubectl create secret generic cacerts -n istio-system \
    --from-file=$cluster/ca-cert.pem \
    --from-file=$cluster/ca-key.pem \
    --from-file=$cluster/root-cert.pem \
    --from-file=$cluster/cert-chain.pem
  # if error occurs, exit
  if [ $? -ne 0 ]; then
    error "Failed to create secret cacerts in istio-system namespace"
    exit 1
  fi
done