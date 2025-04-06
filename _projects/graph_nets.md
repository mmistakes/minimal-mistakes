---
title: "Graph Representation Learning"
layout: single
permalink: /projects/graph_nets/
---
![Graph Nets Project Banner](/assets/images/graph_nets.png)

This project involves a simplified, yet exhaustive approach to implementation and explanation of various Graph Representation Learning techniques developed in the recent past. We cover major papers in the field as part of the review series and we aim to add blogs on many more significant papers in the field.

## 1. Understanding DeepWalk
![DeepWalk Diagram](/assets/images/understanding_deepwalk.png)
Unsupervised online learning approach, inspired from word2vec in NLP, but, here the goal is to generate node embeddings.
- [DeepWalk Blog](https://dsgiitr.com/blogs/deepwalk)
- [Jupyter Notebook](https://github.com/dsgiitr/graph_nets/blob/master/DeepWalk/DeepWalk_Blog%2BCode.ipynb)
- [Code](https://github.com/dsgiitr/graph_nets/blob/master/DeepWalk/DeepWalk.py)
- [Paper-> DeepWalk: Online Learning of Social Representations](https://arxiv.org/abs/1403.6652)

## 2. A Review: Graph Convolutional Networks (GCN)
![GCN](/assets/images/gcn_architecture.png)
GCNs draw on the idea of Convolution Neural Networks re-defining them for the non-euclidean data domain. They are convolutional, because filter parameters are typically shared over all locations in the graph unlike typical GNNs.
- [GCN Blog](https://dsgiitr.com/blogs/gcn)
- [Jupyter Notebook](https://github.com/dsgiitr/graph_nets/blob/master/GCN/GCN_Blog%2BCode.ipynb)
- [Code](https://github.com/dsgiitr/graph_nets/blob/master/GCN/GCN.py)
- [Paper-> Semi-Supervised Classification with Graph Convolutional Networks](https://arxiv.org/abs/1609.02907)

## 3. GraphSAGE (Sample and Aggregate)
![SAGE](/assets/images/GraphSAGE_cover.jpg)
Previous approaches are transductive and don’t naturally generalize to unseen nodes. GraphSAGE is an inductive framework leveraging node feature information to efficiently generate node embeddings.
- [GraphSAGE Blog](https://dsgiitr.com/blogs/graphsage)
- [Jupyter Notebook](https://github.com/dsgiitr/graph_nets/blob/master/GraphSAGE/GraphSAGE_Code%2BBlog.ipynb)
- [Code](https://github.com/dsgiitr/graph_nets/blob/master/GraphSAGE/GraphSAGE.py)
- [Paper-> Inductive Representation Learning on Large Graphs]([https://arxiv.org](https://arxiv.org/abs/1706.02216))

## 4. ChebNet: CNN on Graphs with Fast Localized Spectral Filtering
![ChebNet](/assets/images/ChebNet.jpg)
ChebNet is a formulation of CNNs in the context of spectral graph theory.

- [ChebNet Blog](https://dsgiitr.com/blogs/chebnet/)
- [Jupyter Notebook](https://github.com/dsgiitr/graph_nets/blob/master/ChebNet/Chebnet_Blog%2BCode.ipynb)
- [Code](https://github.com/dsgiitr/graph_nets/blob/master/ChebNet/coarsening.py)
- [Paper-> Convolutional Neural Networks on Graphs with Fast Localized Spectral Filtering](https://arxiv.org/abs/1606.09375)

## 5. Understanding Graph Attention Networks
![GAT](/assets/images/GAT_cover.jpg)
GAT is able to attend over their neighborhoods’ features, implicitly specifying different weights to different nodes in a neighborhood, without requiring any kind of costly matrix operation or depending on knowing the graph structure upfront.

- [GAT Blog](https://dsgiitr.com/blogs/gat)
- [Jupyter Notebook](https://github.com/dsgiitr/graph_nets/blob/master/GAT/GAT_Blog%2BCode.ipynb)
- [Code](https://github.com/dsgiitr/graph_nets/blob/master/GAT/GAT_PyG.py)
- [Paper-> Graph Attention Networks](https://arxiv.org/abs/1710.10903)
