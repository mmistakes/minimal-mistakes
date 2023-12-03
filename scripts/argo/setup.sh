#!/bin/bash

repos=( https://prometheus-community.github.io/helm-charts )
destinations=( https://kubernetes.default.svc )
projects=( monitoring )

echo "Port forwarding"
kubectl port-forward svc/argocd-server -n argocd 8080:80 &

echo "Logging into ArgoCD"
argocd login localhost:8080 --username admin --password "${ARGO_PASSWORD}" --insecure


for project in "${projects[@]}"
do
    echo "Giving $project access to cluster resources"
    argocd proj allow-cluster-resource $project "*" "*"
    argocd proj allow-namespace-resource $project "*" "*"
    for detination in "${destinations[@]}"
    do
        echo "Giving $project access to $detination"
        argocd proj add-destination $project $detination "*"
    done
    # may also need to add-orphaned-ignore to ignore resources that are already deployed
    for repo in "${repos[@]}"
    do
        echo "Giving $project access to $repo"
        argocd repo add --project $project --upsert $repo
    done
done