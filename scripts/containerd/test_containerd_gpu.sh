#!/bin/bash

IMAGE=xift/jetson_devicequery:r32.5.0
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
ctr i pull docker.io/${IMAGE}
ctr run --rm --gpus 0 --tty docker.io/${IMAGE} deviceQuery