---
title: "Cilium and Istio Harmony"
date: 2024-03-16
excerpt: "Update Cilium to work with Istio and create a self-signed certificate for Istio."
tags: [rke2, cilium, devops, cluster, istio, tls]
header:
  overlay_image: /images/businessman_telescope.png
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
---

# Update Cilium to work with Istio and create a self-signed certificate for Istio

```yaml
Title: Update Cilium to work with Istio and create a self-signed certificate for Istio
Author: Mitch Murphy
Date: 2024-03-16
```

- [Update Cilium to work with Istio and create a self-signed certificate for Istio](#update-cilium-to-work-with-istio-and-create-a-self-signed-certificate-for-istio)
  - [Introduction](#introduction)
  - [Pre-requisites](#pre-requisites)
  - [Update Cilium chart](#update-cilium-chart)
  - [Create Istio Namespace](#create-istio-namespace)
  - [Create self-signed certificate](#create-self-signed-certificate)
  - [Create NFS provisioner](#create-nfs-provisioner)


## Introduction

In this post we are going to update Cilium to work with Istio and create self-signed certificates for Istio.

## Pre-requisites

- [RKE2](https://rke2.io/)
- [Cilium](https://cilium.io/)
- [Istio](https://istio.io/)
- [Helm](https://helm.sh/)
- [Make](https://www.gnu.org/software/make/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Update Cilium chart

```bash
helm upgrade cilium \
    --namespace kube-system \
    --set ipam.mode=kubernetes \
    --set socketLB.hostNamespaceOnly=true
```

## Create Istio Namespace

```bash
kubectl create namespace istio-system
```

## Create self-signed certificate

For this step we are going to use a few scripts from the istio repository. These tools can be found [here](../tools/). The first step is to create the namespace and then generate the self-signed certificate that Istio will be using (here we are assuming 3 clusters). The following script will create the certificates and then create the secrets in each cluster (you must have the `kubeconfig` for each cluster in order to run the script).

```bash
echo "Making Root CA"
# make -f ../tools/certs/Makefile.selfsigned.mk root-ca
for cluster in "smig-cluster1 smig-cluster2 smig-cluster3"
do
  make -f ../tools/certs/Makefile.selfsigned.mk "$cluster-cacerts"
  kubectl config use-context $cluster
  kubectl create --context=$cluster namespace istio-system
  kubectl create secret generic cacerts -n istio-system \
        --from-file=$cluster/ca-cert.pem \
        --from-file=$cluster/ca-key.pem \
        --from-file=$cluster/root-cert.pem \
        --from-file=$cluster/cert-chain.pem
done
```

## Create NFS provisioner

```bash
helm install -n storage nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \
    --set nfs.server=192.168.1.6 \
    --set nfs.path=/SMGSHR01/kubernetes
```
