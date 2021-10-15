---
title: "Setting up a 5 node K3s Cluster on Raspberry Pi's"
date: 2021-10-15
excerpt: "Howto guide for setting up and configuring a K3s cluster to perform AI/ML on the edge"
tags: [time-series, sarima, forecasting, stock]
header:
  overlay_image: /images/computing-on-the-edge.png
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
---

# Howto Guide: Home Kubernetes Cluster

```yaml
Title: Setting up K3s on Raspberry Pi's and Jetson Nano's
Author: Mitch Murphy
Date: 2021-10-09
```

---

## Table of contents

1. [Introduction](#introduction)
2. [Materials](#materials)
    1. [Operating Systems](operating-systems)
    1. [Disk Operation Speeds](#disk-pperation-speeds)
3. [Prerequisites](#prerequisites)
    1. [Static IPs](#static-ips)
    2. [SSH](#ssh)
4. [Mount Storage Volume](#mount-storage-volume)
5. [Install K3s](#install-k3s)
    1. [K3s Master](#k3s-master)
6. [Helm](#helm)
    1. [Add Helm Repos](#add-helm-repos)
7. [Dashboard](#dashboard)
    1. [Deploying the Dashboard](#deploying-the-dashboard)
    2. [Access Dashboard](#access-dashboard)
8. [Workers](#workers)
    1. [Worker 1](#worker-1)
    2. [Install Agent](#install-agent)
9. [Add Private Registry](#add-private-registry)
10. [GPU Support](#gpu-support)
    1. [Swap](#swap)
    2. [Disable IPv6](#disable-ipv6)
    3. [Assign Static IP](#assign-static-ip)
    4. [Deploy K3s](#deploy-k3s)
    5. [Container Configuration](#container-configuration)
    6. [Test GPU Support](#test-gpu-support)
    7. [PyTorch](#pytorch)
    8. [GAN](#gan)

## Introduction  

In this article we will be setting up a 5 node K3s cluster: one control plane, three workers (Raspberry Pis) and one GPU worker (Nvidia Jetson Nano) to enable GPU workloads such as Tensorflow. Let's get started.

## Materials

This is a pretty cost effective cluster (for the computational power at least), here is what I will be using:

* 2 x [Raspberry Pi 4 Model B - 8GB](https://www.cytron.io/p-raspberry-pi-4-model-b-8gb) - $87.25
* 2 x [Raspberry Pi 4 Model B - 4GB](https://www.cytron.io/p-raspberry-pi-4-model-b-4gb) - $59.75
* 1 x [Nvidia Jetson Nano 4GB](https://www.amazon.com/NVIDIA-Jetson-Nano-Developer-945-13450-0000-100/dp/B084DSDDLT) - $169.99
* 4 x [Crucial MX500 500GB SSD](https://www.amazon.com/gp/product/B0786QNS9B) - $54.99
* 4 x [SATA/SSD to USB Adapter](https://www.amazon.com/gp/product/B011M8YACM) - $9.99
* 1 x [1ft USB C Cables, 5 pack](https://www.amazon.com/gp/product/B08LH5SX4V/) - $8.99
* 1 x [USB Charging Station - 60W, 12A](https://www.amazon.com/gp/product/B08HN6JK7N) - $27.99
* 1 x [1ft CAT 6 Cables, 5 pack](https://www.amazon.com/gp/product/B00C4U030G) - $10.99
* 1 x [NETGEAR Ethernet Switch](https://www.amazon.com/gp/product/B07PFYM5MZ) - $19.99
* 1 x [Raspberry Pi Cluster Case](https://www.amazon.com/gp/product/B08FH3V6GV) - $84.99

_Notes_:  

That the Nvidia Jetson Nano was only $99.99 when I bought it, the same model with 4GB of RAM is now 169.99, there is a 2GB version on [Amazon](https://www.amazon.com/NVIDIA-Jetson-Nano-Developer-945-13541-0000-000/dp/B08J157LHH) for $59.00. Furthermore, I have decided to attach separate storage volumes (SSD) to each node, this is for two reasons: I would like to run a full media server on the cluster and ML/AI workloads are data intensive and read/write speeds on SD cards are not great. Both of these are completely optional.

This brings the total cost to build this exact cluster at **$848.87**.

### Operating Systems

For this build, all of the Raspberry Pi's will be using `Ubuntu 20.04.3 LTS (Focal Fossa)`. Nvidia provides it's own image, `Ubuntu 18.04.6 LTS`, which can be found [here](https://developer.nvidia.com/jetson-nano-sd-card-image).

### Disk Operation Speeds  

You can determine the storage speeds using the `dd` command, as so:  

**Read**:  

```shell
dd if=./speedTestFile of=/dev/zero bs=20M count=5 oflag=dsync # for SD card
dd if=/mnt/storage/speedTestFile of=/dev/zero bs=20M count=5 oflag=dsync # for SSD
```

**Write**:  

```shell
dd if=/dev/zero of=./speedTestFile bs=20M count=5 oflag=direct # for SD card
sudo dd if=/dev/zero of=/mnt/storage/speedTestFile bs=20M count=5 oflag=direct # for SSD
```

| Device  | Read (mb/s) | Write (mb/s) |
|---------|-------------|--------------|
| SD Card |    39.7     |    19.3      |
|   SSD   |   280.0     |   221.0      |

## Prerequisites

Login! `ssh ubuntu@<IPADDR>` and use the default password of `ubuntu`. It will require you to change this. We will be disabling this account next.  

> Create user: `sudo adduser master`  
> Add groups: `sudo usermod -a -G adm,dialout,cdrom,floppy,sudo,audio,dip,video,plugdev,netdev,lxd master`  

Now logout and log back in: `ssh master@<IPADDR>` and then delete the default user: `sudo deluser --remove-home ubuntu`.  

It time to rename our nodes. I will be naming master node as k3s-master and similarly worker nodes as k3s-worker to k3s-worker3. Change the hostname with: `sudo hostnamectl set-hostname k3s-master`.  

We are going to update our installation, so we have latest and greatest packages by running: `sudo apt update && sudo apt upgrade -y`. Now reboot.  

As cloud-init is present on this image we are going to edit also: `sudo nano /etc/cloud/cloud.cfg`. Change `preserve_hostname` to `true`. Reboot again.

### Static IPs

In order for our nodes in our cluster to properly communicate with each other, we need to set static IP addresses to each node. The easiest way of doing this (for a home cluster) is by adding this entry to `/etc/netplan/50-cloud-init.yaml`:  

```shell
network:
    ethernets:
        eth0:
            dhcp4: no
            addresses: [<STATIC_IP>/24]
            gateway4: <GATEWAY_ADDRESS>
            nameservers:
              addresses: [8.8.8.8,8.8.4.4]
    version: 2
```

_Note_ that this process differs for the Nvidia Jetson Nano, which can be found [below](#assign-static-ip). Reboot and run `hostname -I` to cofirm the changes.

### Install Docker

Docker needs to be installed in order to run the K3s install script. Perform the following:  

```shell
sudo apt upgrade
sudo apt update -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

In order to run Docker as a non-root user you must add the current user to the Docker group with `sudo usermod -aG docker $USER`


### SSH

It is good practice to disable username/password SSH login, this is done by editing `sudo nano /etc/ssh/sshd_config`, as so:  

```shell
From:
#PermitRootLogin prohibit-password
#PasswordAuthentication yes
#PubkeyAuthentication yes
To:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

After making the change, validate that we have no errors and restart SSH daemon.  

```shell
sudo /usr/sbin/sshd -t
sudo systemctl restart sshd.service
```

Before doing this, generate a local key pair with `ssh-keygen`, and then copy this to the server with `ssh-copy-id -i <IDENTITY_FILE> master@k3s-master`. Next, edit your `~/.ssh/config` file to reflect:

```shell
Host k3s-master
Hostname k3s-master
User master
IdentityFile ~/.ssh/id_k3s-master

Host k3s-worker1
Hostname k3s-worker1
User worker
IdentityFile ~/.ssh/id_k3s-worker1

Host k3s-worker2
Hostname k3s-worker2
User worker
IdentityFile ~/.ssh/id_k3s-worker2

Host k3s-worker-gpu
Hostname k3s-worker-gpu
User worker
IdentityFile ~/.ssh/id_k3s-worker-gpu
```

You should also update your `/etc/hosts` file:  

```shell
192.168.0.100   k3s-master
192.168.0.101   k3s-worker1
192.168.0.102   k3s-worker2
192.168.0.104   k3s-worker-gpu
```

Make sure you enable `cgroups` by editing `/boot/firmware/cmdline.txt`: add the following:  
> `cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1`  

Disable wireless/bluetooth by adding the following lines to `/boot/firmware/config.txt`:  

```shell
dtoverlay=disable-wifi
dtoverlay=disable-bluetooth
```

You also need to disable IPv6. Add the following lines to `/etc/sysctl.conf`:  

```shell
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.lo.disable_ipv6=1
```

Reload: `sudo sysctl -p`. You may also need to create the following script at `/etc/rc.local`:  

```shell
#!/bin/bash
# /etc/rc.local

/etc/sysctl.d
/etc/init.d/procps restart

exit 0
```

Change permissions on above file: `sudo chmod 755 /etc/rc.local`. Finally reboot to take effect with `sudo reboot`.

Rinse and repeat for all worker nodes. It is also advisable to do the same for communication among all the nodes (control planes and worker). 

## Mount Storage Volume

While we are booting off an SD card (class 10), we wish to leverage the higher read/write speeds on a USB mounted SSD drive for storing any data. This was how I automounted the drives to a stanard mount point on each node.  

1. Make sure you format each drive with the `ext4` type.  
2. Next create a folder on each node which will serve as the mount point at `/mnt/storage`
3. Get the UUID of the device you want to automount: `blkid`
4. Add the entry to `/etc/fstab`:  
  > `UUID=<MY_UUID> /mnt/storage ext4 defaults,auto,users,rw,nofail 0 0`

## Install K3s

```shell
curl -sfL https://get.k3s.io | INSTALL_KUBE_EXEC="--write-kubeconfig-mode 664 \
--bind-address 192.168.0.100 --advertise-address 192.168.0.100 \
--default-local-storage-path /mnt/storage --cluster-init --node-label memory=high" sh -
```

_Note_: Here I add the `memory` label to each node, as this cluster will be comprised of 8gb, 4gb and 2gb nodes.  

### K3s Master

* IPv4: `192.168.0.100`  
* Domain: `cluster.smigula.io`  
* User: `master`  
* Password: `<PASSWD>` 

## Helm

First install Helm on the control plane:  

```shell
# define what Helm version and where to install:
export HELM_VERSION=v3.7.0
export HELM_INSTALL_DIR=/usr/local/bin

# download the binary and get into place:
cd /tmp
wget https://get.helm.sh/helm-$HELM_VERSION-linux-arm64.tar.gz
tar xvzf helm-$HELM_VERSION-linux-arm64.tar.gz
sudo mv linux-arm64/helm $HELM_INSTALL_DIR/helm

# clean up:
rm -rf linux-arm64 && rm helm-$HELM_VERSION-linux-arm64.tar.gz
```

### Add Helm Repos

```shell
helm repo add stable https://charts.helm.sh/stable
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
helm repo add jetstack https://charts.jetstack.io
```

## Dashboard

There is a default Kubernetes dashboard that we will be deploying; the dashboard is a web-based Kubernetes user interface. You can use Dashboard to deploy containerized applications to a Kubernetes cluster, troubleshoot your containerized application, and manage the cluster resources. The dashboard also provides information on the state of Kubernetes resources in your cluster and on any errors that may have occurred.

### Deploying the Dashboard UI

```shell
# this is necessary to address https://github.com/rancher/k3s/issues/1126 for now:
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml >> ~/.bashrc
source ~/.bashrc
```

I made some slight changes to the [official manifests](https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml) that Kubernetes provides (changed the service type, created a user/service account and cluster role bindings), which can be found [here](manifests/dashboard.yaml). Apply them: `kubectl apply -f https://raw.githubusercontent.com/mkm29/ai-on-the-edge/main/manifests/dashboard.yaml`.

### Access Dashboard

Currently the service is being exposed as a `NodePort` service, which can be accessed at [https://cluster.smigula.io:30000](https://cluster.smigula.io). In order to login, you first need to get a Bearer token from Kubernetes:  

```shell
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
```

_Note_ that due to me using CloudFlare as free DDNS, there will be a TLS/cert issue. If you deploy this locally with no DDNS you should not run into this issue.

## Workers

### Worker 1

* IPv4: `192.168.0.101`  
* Domain:  
* User: `worker`  
* Password: `<PASSWD>`  

**Token** can be found at `/var/lib/rancher/k3s/server/token` on the control plane.

### Install Agent

```shell
export TOKEN=K10513ec520ffb7ce3d94da39d5a26be5da9324769f035498595c9941d21bcfeb62::server:ed7aefd846db06468a6c78fb91d461d2
curl -sfL https://get.k3s.io | K3S_URL=https://192.168.0.100:6443 K3S_TOKEN=$TOKEN \
  INSTALL_KUBE_EXEC="--node-label memory=high" sh -
```

## Add Private Registry

Create the file `/etc/rancher/k3s/registries.yaml`, and add the following to it:

```shell
mirrors:
  "docker.io":
    endpoint:
      - "https://docker.io"
configs:
  "docker.io":
    auth:
      username: "smigula"
      password: <TOKEN>
    tls:
      insecure_skip_verify: true
```

_Note_: you will need to do this for all worker nodes. Can this be added to the `/etc/rancher/k3s/nodes/` as an Ansible playbook?

## GPU Support

This section will cover what is needed to configure a node (eg Nvidia Jetson Nano) to give containers access to a GPU.

1. Create user: `sudo useradd worker`  
2. Set password: `sudo passwd worker`  
3. Add groups to user: `sudo usermod -aG adm,cdrom,sudo,audio,dip,video,plugdev,i2c,lpadmin,gdm,sambashare,weston-launch,gpio worker`  

### Swap

You need to set the swap size to 8gb, use the following script:  

```shell
git clone https://github.com/JetsonHacksNano/resizeSwapMemory.git
cd resizeSwapMemory
chmod +x setSwapMemorySize.sh
./setSwapMemorySize.sh -g 8
```

### Disable IPv6

```shell
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.lo.disable_ipv6=1
```

### Assign Static IP

1. Edit `sudo vi /etc/default/networking`  
2. Set the parameter CONFIGURE_INTERFACES to no  
3. `sudo vi /etc/network/interfaces`  

```shell
auto eth0
iface eth0 inet static
  address 192.168.0.104
  netmask 255.255.255.0
  gateway 192.168.0.1
```

### Deploy K3s

```shell
export TOKEN=<TOKEN>
curl -sfL https://get.k3s.io | K3S_URL=https://192.168.0.100:6443 K3S_TOKEN=$TOKEN \
  INSTALL_KUBE_EXEC="--node-label memory=medium --node-label=gpu=nvidia" sh -
```

### Container Configuration

Consult the K3s [Advanced Options and Configuration Guide](https://rancher.com/docs/k3s/latest/en/advanced/#configuring-containerd); for this type of node we are specifically concerned with setting the container runtime to `nvidia-container-runtimenvidia-container-runtime`. First stop the `k3s-agent` service with `sudo systemctl stop k3s-agent`. Then create the file [/var/lib/rancher/k3s/agent/etc/containerd/config.toml.tmpl](scripts/containerd/containerd/config.toml.tmpl), and add the following content:

```shell
[plugins.opt]
  path = "{{ .NodeConfig.Containerd.Opt }}"

[plugins.cri]
  stream_server_address = "127.0.0.1"
  stream_server_port = "10010"

{{- if .IsRunningInUserNS }}
  disable_cgroup = true
  disable_apparmor = true
  restrict_oom_score_adj = true
{{end}}

{{- if .NodeConfig.AgentConfig.PauseImage }}
  sandbox_image = "{{ .NodeConfig.AgentConfig.PauseImage }}"
{{end}}

{{- if not .NodeConfig.NoFlannel }}
[plugins.cri.cni]
  bin_dir = "{{ .NodeConfig.AgentConfig.CNIBinDir }}"
  conf_dir = "{{ .NodeConfig.AgentConfig.CNIConfDir }}"
{{end}}

[plugins.cri.containerd.runtimes.runc]
  # ---- changed from 'io.containerd.runc.v2' for GPU support
  runtime_type = "io.containerd.runtime.v1.linux"

# ---- added for GPU support
[plugins.linux]
  runtime = "nvidia-container-runtime"

{{ if .PrivateRegistryConfig }}
{{ if .PrivateRegistryConfig.Mirrors }}
[plugins.cri.registry.mirrors]{{end}}
{{range $k, $v := .PrivateRegistryConfig.Mirrors }}
[plugins.cri.registry.mirrors."{{$k}}"]
  endpoint = [{{range $i, $j := $v.Endpoints}}{{if $i}}, {{end}}{{printf "%q" .}}{{end}}]
{{end}}

{{range $k, $v := .PrivateRegistryConfig.Configs }}
{{ if $v.Auth }}
[plugins.cri.registry.configs."{{$k}}".auth]
  {{ if $v.Auth.Username }}username = "{{ $v.Auth.Username }}"{{end}}
  {{ if $v.Auth.Password }}password = "{{ $v.Auth.Password }}"{{end}}
  {{ if $v.Auth.Auth }}auth = "{{ $v.Auth.Auth }}"{{end}}
  {{ if $v.Auth.IdentityToken }}identitytoken = "{{ $v.Auth.IdentityToken }}"{{end}}
{{end}}
{{ if $v.TLS }}
[plugins.cri.registry.configs."{{$k}}".tls]
  {{ if $v.TLS.CAFile }}ca_file = "{{ $v.TLS.CAFile }}"{{end}}
  {{ if $v.TLS.CertFile }}cert_file = "{{ $v.TLS.CertFile }}"{{end}}
  {{ if $v.TLS.KeyFile }}key_file = "{{ $v.TLS.KeyFile }}"{{end}}
{{end}}
{{end}}
{{end}}
```

Now restart K3s with `sudo systemctl restart k3s-agent`.  

### Test GPU Support

Nvidia created a Docker image that will test to make sure all devices are configured properly. Change into your home directoy, and copy over the demos: `cp -R /usr/local/cuda/samples .`. Next, create a [Dockerfile.deviceQuery](tests/Dockerfile.deviceQuery) to perform the `deviceQuery` test:

```shell
FROM nvcr.io/nvidia/l4t-base:r32.5.0
RUN apt-get update && apt-get install -y --no-install-recommends make g++
COPY ./samples /tmp/samples
WORKDIR /tmp/samples/1_Utilities/deviceQuery
RUN make clean && make
CMD ["./deviceQuery"]
```

1. Build: `docker build -t xift/jetson_devicequery:r32.5.0 . -f Dockerfile.deviceQuery`  
2. Run: `docker run --rm --runtime nvidia xift/jetson_devicequery:r32.5.0`  
3. If everything is configured correctly you should see something like:  

```shell
deviceQuery, CUDA Driver = CUDART, CUDA Driver Version = 10.2, CUDA Runtime Version = 10.2, NumDevs = 1
Result = PASS
```

By default, K3s will use containerd to run containers so lets ensure that works properly (CUDA support). For this, we will create a simple [bash script](tests/containerd/test_containerd_gpu.sh) that uses `ctr` instead of `docker`:  

```shell
#!/bin/bash

IMAGE=xift/jetson_devicequery:r32.5.0
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
ctr i pull docker.io/${IMAGE}
ctr run --rm --gpus 0 --tty docker.io/${IMAGE} deviceQuery
```

You should get the same result as above. The final, and real, test is to deploy a pod to the cluster (selecting only those nodes with the `gpu: nvidia` label). Create the following file, [pod_device_query.yaml](tests/pod_device_query.yaml):

```shell
apiVersion: v1
kind: Pod
metadata:
  name: devicequery
spec:
  containers:
  - name: nvidia
    image: xift/jetson_devicequery:r32.5.0
    command: [ "./deviceQuery" ]
  nodeSelector:
    gpu: nvidia
```

Create this pod with `kubectl apply -f pod_deviceQuery.yaml`, once the image is pulled and the container is created, it will run the `deviceQuery` command and then exit, so it may look as if the pod failed. Simply take a look at the logs and look for the above `PASS`, with `kubectl logs devicequery`. If all checks out we are now ready to deploy GPU workloads to our K3s cluster!

_Note_ you may also want to taint this node so that non-GPU workloads will not be scheduled.  

### Pytorch

Luckily for us, Nvidia has build some Docker images specifically for ARM architecture - L4T. NVIDIA L4T is a Linux based software distribution for the NVIDIA Jetson embedded computing platform. On the node pull and run the image:  

```shell
docker pull nvcr.io/nvidia/l4t-pytorch:r32.6.1-pth1.9-py3
docker run -it --rm --runtime nvidia nvcr.io/nvidia/l4t-pytorch:r32.6.1-pth1.9-py3 python3 -c "import torch; print(torch.cuda.is_available());"
```

If all works correctly you should see `True` printed out. This just shows how to run a Docker image, it is trivial to create a Pod definition that will use this image (as shown above).  

### GAN

That is not an actual application though, stand by and I will deploy a little GAN application using PyTorch and Flask :)  