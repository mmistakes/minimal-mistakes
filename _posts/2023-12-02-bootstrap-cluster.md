---
title: "Boostrapping RKE2"
date: 2022-11-23
excerpt: "Howto guide for ensuring RKE2 is bootstrapped with ArgoCD, Prometheus, and Cert-Manager"
tags: [rke2, argocd, devops, cluster, prometheus, cert-manager]
header:
  overlay_image: /images/octopus_orchestrator.png
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
---

# How to Guide: Boostrapping RKE2 with ArgoCD, Prometheus, and Cert-Manager

```yaml
Title: Boostrapping RKE2 with ArgoCD
Author: Mitch Murphy
Date: 2023-12-02
```

---

## Introduction

This guide will walk you through the steps to bootstrap an RKE2 cluster with ArgoCD. This guide assumes you have a working RKE2 cluster and ArgoCD instance. If you do not have these, please refer to my previous post on installing RKE2 with Cilium: [here](https://mitchmurphy.io/cilium-rke2/)

## Prerequisites

- RKE2 Cluster
- kubectl
- ssh access to RKE2 cluster

## Steps

### 1. Create a new namespace for ArgoCD

```yaml
# first switch to proper context
kubectl config use-context <cluster-name>
kubectl create namespace argocd
```

### 2. ArgoCD

Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes applications. In the context of Kubernetes, GitOps is a set of practices that use Git as the source of truth for declarative infrastructure and applications. With Argo CD, you can manage and automate the deployment of your Kubernetes applications using Git repositories as the source of configuration and versioning.

#### Argo Components

Here are some key aspects of Argo CD in relation to Kubernetes:

- **Declarative Configuration**: Argo CD uses declarative YAML files to describe the desired state of your Kubernetes applications. These files are typically stored in a Git repository.
- **Continuous Delivery (CD)**: Argo CD automates the deployment of applications to Kubernetes clusters. It continuously monitors the Git repository for changes and ensures that the actual cluster state matches the desired state defined in the Git repository.
- **GitOps Workflow**: Argo CD follows the GitOps workflow, where the Git repository serves as the single source of truth for both the application configuration and the deployment state. Changes to the Git repository trigger automatic updates to the Kubernetes cluster.
- **Application Synchronization**: Argo CD maintains the desired state of applications in the Git repository by automatically synchronizing with the current state of the Kubernetes cluster. It detects any discrepancies and reconciles them to ensure that the cluster state matches the configuration in Git.
- **Multi-Cluster Support**: Argo CD supports managing applications across multiple Kubernetes clusters. This is particularly useful in a multi-environment or multi-region setup.
- **Web UI and CLI**: Argo CD provides a web-based user interface (UI) and a command-line interface (CLI) for managing and monitoring applications.
- **Rollback and Roll Forward**: Argo CD allows you to roll back or roll forward to a specific version of your application by changing the desired state in the Git repository.

Using Argo CD simplifies and streamlines the deployment and management of Kubernetes applications, making it easier to maintain consistency and traceability across different environments.

### 2.1 Install Helm

I prefer to use a separate VM/controller to perform all Helm installations. This is not required, but it is recommended. __Note__ this does not need to be performed on the RKE2 server.

```yaml
# Use curl to download release and untar
curl -L https://get.helm.sh/helm-v3.13.2-linux-amd64.tar.gz | tar xz
cd linux-amd64
chmod +x helm
sudo mv helm /usr/local/bin/helm
cd ../
rm -rf linux-amd64
```

Add Argo repo to helm

```yaml
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
```

For this step we are going to use the `HelmChart` CRD to install ArgoCD. This will allow us to use the `HelmRelease` CRD to manage the ArgoCD application. You need to add the following file to `/var/lib/rancher/rke2/server/manifests/` on the RKE2 server. This will install the `HelmRelease` CRD and the ArgoCD application.

```yaml
cat <<EOF > argocd-values.yaml
controller:
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true
      namespace: monitoring-system
      interval: 30s
server:
  service:
    type: ClusterIP
  extensions:
    enabled: true
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true
      namespace: monitoring-system
      interval: 30s
repoServer:
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true
      namespace: monitoring-system
      interval: 30s
applicationSet:
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true
      namespace: monitoring-system
      interval: 30s
notifications:
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true
      namespace: monitoring-system
      interval: 30s
redis:
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true
      namespace: monitoring-system
      interval: 30s
rbac:
  defaultPolicy: 'role:readonly'
dex:
  enabled: false
EOF
```

Now install the chart:

```yaml
helm install argocd \
  -n argocd \
  --create-namespace \
  -f argocd-values.yaml argo/argo-cd
```

Now wait for all pods to be running:

```yaml
kubectl -n argocd get pods -w
```

### 3. Login to ArgoCD

```yaml
password=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
# port forward to argocd server
kubectl -n argocd port-forward svc/argocd-server 8080:80
argocd login localhost:8080 --username admin --password $password --insecure
```

### 4. Update Password

```yaml
argocd account update-password --account admin --current-password $password --new-password <new-password>
# delete initial secret
kubectl -n argocd delete secret argocd-initial-admin-secret
```

### 5. Add Repositories

_Note_ steps 5 and 6 have been added to the [argocd-setup.sh](scripts/argo.setup.sh) script.

Let us add the prometheus, jetstack and bitnami repositories to ArgoCD. This will allow us to install applications from these repositories.

```yaml
argocd repo add https://charts.bitnami.com/bitnami --type helm --name bitnami
argocd repo add https://charts.jetstack.io --type helm --name jetstack
argocd repo add https://kubernetes-charts.storage.googleapis.com --type helm --name stable
argocd repo add https://prometheus-community.github.io/helm-chart --type helm --name prometheus-community
```

### 6. Create a new project

```yaml
argocd proj create monitoring
```

### 7. Install Prometheus

I have experienced issues with installing the kube-prometheus-stack chart using ArgoCD. I suspect that the issue is related to the Prometheus CRDs, therefore, I have decided to install the chart using the `Helm`:

```yaml
helm repo add prometheus-community https://prometheus-community.github.io/helm-chart
helm repo update
helm install --namespace monitoring-system --create-namespace monitoring prometheus-community/kube-prometheus-stack
```

#### Using ArgoCD

```yaml
argocd app create monitoring --repo https://prometheus-community.github.io/helm-chart \
   --helm-chart kube-prometheus-stack \
   --revision 54.2.0 \
   --dest-namespace monitoring-system \
   --dest-server https://kubernetes.default.svc \
   --project monitoring
```

### Cert-Manager

Cert-manager is a Kubernetes native certificate management controller. Its primary purpose is to automate the management and issuance of TLS certificates within Kubernetes clusters. TLS (Transport Layer Security) certificates are used to secure communication over the web, and they are commonly used to enable HTTPS for web applications.

#### CM Components

Here are key aspects of cert-manager in relation to Kubernetes:

- **Certificate Issuance and Renewal**: Cert-manager automates the process of obtaining and renewing TLS certificates from various certificate authorities (CAs) such as Let's Encrypt. It allows you to define certificate issuers and certificate requests as Kubernetes resources.
- **Integration with ACME Protocols**: Cert-manager supports the ACME (Automatic Certificate Management Environment) protocol, which is commonly used by Let's Encrypt. This enables automatic certificate provisioning and renewal.
- **Custom Resource Definitions (CRDs)**: Cert-manager extends Kubernetes by introducing custom resource definitions (CRDs) for defining certificate issuers, certificate requests, and certificates. This allows you to manage certificates as part of your Kubernetes configuration.
- **Webhook and Controller Architecture**: Cert-manager uses a webhook and controller architecture to interact with Kubernetes resources and respond to changes. The controller monitors the state of certificate-related resources and takes actions to ensure the requested certificates are obtained and renewed as needed.
- **Integration with Ingress Controllers**: Cert-manager integrates with Kubernetes Ingress controllers, making it easy to secure web applications by automatically provisioning TLS certificates for Ingress resources.
- **Support for Multiple Issuers**: Cert-manager supports multiple issuers, allowing you to choose different certificate authorities or even self-signed certificates based on the specific requirements of your applications.
- **Web UI and CLI**: Cert-manager provides a web-based user interface (UI) and a command-line interface (CLI) for managing and monitoring certificates.

By using cert-manager, Kubernetes users can ensure that their applications are using valid and up-to-date TLS certificates without manual intervention. This is crucial for maintaining the security and integrity of communication within a Kubernetes cluster and between external clients and services.

#### Install Cert-Manager

We will use ArgoCD to manage the installation of cert-manager. You can either use the web UI or the CLI to install the application. I will use the CLI.

```yaml
echo "Adding cert-manager repo"
argocd repo add https://charts.jetstack.io --type helm --name jetstack
echo "Creating cert-manager namespace"
kubectl create ns cert-manager
echo "Creating cert-manager application"
argocd app create cert-manager --repo https://charts.jetstack.io \
   --helm-chart cert-manager \
   --revision v1.5.3 \
   --dest-namespace cert-manager \
   --dest-server https://kubernetes.default.svc \
   --project cert-manager
```

#### Cluster Issuer

In the context of cert-manager and Kubernetes, a `ClusterIssuer` is a custom resource definition (CRD) used to define a certificate issuer at the cluster level. It is a way to configure and manage certificate authorities (CAs) for obtaining TLS certificates across the entire Kubernetes cluster.

Here are key points about ClusterIssuer:

- **Scope**: Unlike a regular Issuer, which is specific to a namespace, a ClusterIssuer is designed to have a global scope across the entire Kubernetes cluster. This means that certificates issued by a ClusterIssuer can be used by resources in any namespace.
- **Centralized Configuration**: ClusterIssuer allows you to define a centralized configuration for a certificate authority, such as the endpoint of the CA server, authentication credentials, and other settings needed to interact with the CA.
- **Multiple Issuers**: You can have multiple ClusterIssuer resources in a cluster, each configured to interact with a different certificate authority or configuration. This flexibility allows you to use different CAs for different purposes or to meet specific security requirements.
- **Used with Cert-manager**: ClusterIssuer is part of the cert-manager project and works in conjunction with the cert-manager controller. Cert-manager uses the information specified in a ClusterIssuer resource to manage the lifecycle of TLS certificates issued by the associated CA.

For ease of use, we are going to use letsencrypt as our certificate authority. We will use the `ClusterIssuer` resource to configure cert-manager to use the Let's Encrypt staging and production environments.

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
```

In this example, the `ClusterIssuer` is named "letsencrypt-prod," and it is configured to use the Let's Encrypt ACME server to issue certificates. The configuration includes the email address for notifications and specifies the `http01` challenge for domain validation.

This `ClusterIssuer` can then be referenced in `Certificate` resources (another cert-manager CRD) across different namespaces within the cluster. Cert-manager will use the `ClusterIssuer` configuration to automatically manage the lifecycle of TLS certificates associated with those Certificate resources.

### Ingress Controller

An Ingress controller is an application that monitors Ingress resources via the Kubernetes API and updates the configuration of a load balancer in case of any changes. It also handles dynamic configuration changes, such as adding or removing routes, without requiring any manual intervention. We have already configured the NGINX Ingress Controller in the previous section. We will use it to expose our applications to the outside world and will use the `ClusterIssuer` we created in the previous section to issue TLS certificates for our applications. There are a lot of annotations that you can add to your `Ingress` resource to configure how the NGINX Ingress Controller handles individual routes. You can find the full list of annotations [here](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/).

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - host: hello-world.info
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 8080
  tls:
  - hosts:
      - https-example.foo.com
    secretName: helloworld-tls
```

In this example, we have configured the NGINX Ingress Controller to use the `letsencrypt-prod` `ClusterIssuer` to issue TLS certificates for the `hello-world.info` domain. The `Ingress` resource also specifies that all requests to the `hello-world.info` domain should be redirected to HTTPS. _Note_ that by adding the `cert-manager` annotation to the `Ingress` resource, we are telling cert-manager to ask lets-encrypt to issue a TLS certificate for this domain, and it will be stored in the `helloworld-tls` secret.

Stay tuned for the next part of this series where we will configure `Longhorn` to provide persistent storage for our applications.
