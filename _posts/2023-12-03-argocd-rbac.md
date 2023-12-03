---
title: "ArgoCD RBAC"
date: 2022-12-03
excerpt: "Howto guide for setting up ArgoCD RBAC"
tags: [rbac, argocd, devops, cluster, keycloak]
header:
  overlay_image: /images/octopi_cloud.png
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
---

# How to Guide: Configuring ArgoCD RBAC

```yaml
Title: Configuring ArgoCD RBAC
Author: Mitch Murphy
Date: 2023-12-03
```

---

- [How to Guide: Configuring ArgoCD RBAC](#how-to-guide-configuring-argocd-rbac)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Add Cluster](#add-cluster)
  - [RBAC Configuration](#rbac-configuration)
  - [Deploying Application](#deploying-application)

## Introduction

ArgoCD is a great tool for managing your Kubernetes clusters. It allows you to deploy applications to your clusters and keep them in sync. It also allows you to manage your clusters and applications through a GitOps workflow. This means that you can manage your clusters and applications through Git and have ArgoCD keep them in sync. This is great for managing multiple clusters and applications. We can utilize ArgoCD for managing deployments to multiple clusters by multiple teams. This is where RBAC comes in. RBAC stands for Role Based Access Control. It allows us to define roles and permissions for users and groups. This allows us to control who can access what resources in our clusters. This is great for managing access to our clusters and applications. 

## Prerequisites

- Kubernetes Cluster(s)
- ArgoCD
- Helm 
- Keycloak

## Add Cluster

First, lets add a new cluster to ArgoCD. For this, we need to use the CLI:

```yaml
kubectl -n argocd port-forward svc/argocd-server 8080:80
argocd login localhost:8080 --username admin --password <PASSWD> --insecure
```

Now, we can add our cluster (the name must be the name of the context in your kubeconfig):

```yaml
argocd cluster add <CLUSTER_NAME>
```

We will be using the second cluster that we previously [created](https://mitchmurphy.io/cilium-rke2/) and added to our Cilium cluster mesh (`smig-cluster2`).

## RBAC Configuration

First, follow this [guide](https://argo-cd.readthedocs.io/en/stable/operator-manual/user-management/keycloak/) on how to configure ArgoCD to use Keycloak for authentication. This will allow us to use Keycloak for authentication and authorization. Now we need to update the ArgoCD Helm chart to enable RBAC. We can do this by specifying a values file:

```yaml
cat <<EOF > argocd-rbac-values.yaml
configs:
  oidc.config: |
    name: SmigAdmins
    issuer: https://auth.smigula.io/realms/smig/
    clientID: argocd
    clientSecret: $oidc.azuread.clientSecret
    requestedIDTokenClaims:
      groups:
        essential: true
    requestedScopes:
      - openid
      - profile
      - email
      - groups
  rbac:
    policy.csv |
      p, role:smig-admin, applications, *, */*, allow
      p, role:smig-admin, clusters, *, smig-cluster2, allow
      p, role:smig-admin, repositories, *, *, allow
      p, role:smig-admin, logs, get, *, allow
      p, role:smig-admin, exec, create, */*, allow
      g, smig2-team, role:smig-admin
EOF
```

```yaml
helm upgrade argocd argo/argo-cd -f argocd-rbac-values.yaml
```

## Deploying Application

Now, we can deploy an application to our secondary cluster using ArgoCD. We will be deploying the [guestbook](https://github.com/argoproj/argocd-example-apps/tree/master/helm-guestbook). First, we need to create a new project as an admin:

```yaml
argocd proj create smig2-team \
  --description "Smigula Team 2" \
  --dest https://192.168.7.31:6443,default \
  --allow-cluster-resource \
  --allow-namespaced-resource
```

Now login to the ArgoCD web UI as a user in the `smig2-team` group. You should see the `smig2-team` project. Click on it and then click `New App`. Fill out the form with the following information:

- Application Name: `guestbook`
- Repository URL: `https://github.com/argoproj/argocd-example-apps.git`
- Revision: `HEAD`
- Path: `helm-guestbook`

For Destination, set cluster URL to `https://192.168.7.31:6443` and namespace to `default`. Click `Create`. Now, you should see the application in the `smig2-team` project. Click on it and then click `Sync`. This will deploy the application to the cluster. You can now access the application by port forwarding the service:

```yaml
kubectl port-forward svc/guestbook-ui 8080:80
```

Now, you can access the application at `http://localhost:8080`. You can also access the application through the ArgoCD web UI by clicking on the application and then clicking `Open in new tab`. You should see the guestbook application. You can now make changes to the application and ArgoCD will keep it in sync. You can also add more users to the `smig2-team` group in Keycloak and they will be able to access the application.