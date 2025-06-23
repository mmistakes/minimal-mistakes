---
title: "Understanding Graph Attention Networks (GAT)"
layout: single
permalink: /blogs/gat/
---
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog.jpg)
## Understanding Graph Attention Networks (GAT)
This is 4th in the series of blogs <font color="green"><b>Explained: Graph Representation Learning</b></font>. Let&rsquo;s dive right in, assuming you have read the first three. GAT (Graph Attention Network), is a novel neural network architecture that operate on graph-structured data, leveraging masked self-attentional layers to address the shortcomings of prior methods based on graph convolutions or their approximations. By stacking layers in which nodes are able to attend over their neighborhoods’ features, the method enables (implicitly) specifying different weights to different nodes in a neighborhood, without requiring any kind of costly matrix operation (such as inversion) or depending on knowing the graph structure upfront. In this way, GAT addresses several key challenges of spectral-based graph neural networks simultaneously, and make the model readily applicable to inductive as well as transductive problems.

Analyzing and Visualizing the learned attentional weights also lead to a more interpretable model in terms of importance of neighbors.

But before getting into the meat of this method, I want you to be familiar and thorough with the Attention Mechanism, because we'll be building GATs on the concept of Self Attention and Multi-Head Attention introduced by Vaswani et al. If not, you may read this blog, [The Illustrated Transformer](http://jalammar.github.io/illustrated-transformer/) by Jay Alamar.

## Can we do better than GCNs?
From Graph Convolutional Network (GCN), we learnt that combining local graph structure and node-level features yields good performance on node classification task. However, the way GCN aggregates messages is <b>structure-dependent</b>, which may hurt its generalizability.

The fundamental novelty that GAT brings to the table is how the information from the one-hop neighborhood is aggregated. For GCN, a graph convolution operation produces the normalized sum of neighbors&rsquo; node features as follows:
$$h_i^{(l+1)}=\sigma\left(\sum_{j\in \mathcal{N}(i)} {\frac{1}{c_{ij}} W^{(l)}h^{(l)}_j}\right)$$
where $\mathcal{N}(i)$ is the set of its one-hop neighbors (to include $v_{i}$ in the set, we simply added a self-loop to each node), $c_{ij}=\sqrt{|\mathcal{N}(i)|}\sqrt{|\mathcal{N}(j)|}$ is a normalization constant based on graph structure, $\sigma$ is an activation function (GCN uses ReLU), and $W^{l}$ is a shared weight matrix for node-wise feature transformation.

GAT introduces the attention mechanism as a substitute for the statically normalized convolution operation. The figure below clearly illustrates the key difference.
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog2.png)
## How does the GAT layer work?
The particular attentional setup utilized by GAT closely follows the work of Bahdanau et al. (2015) i.e Additive Attention, but the framework is agnostic to the particular choice of attention mechanism.

The input to the layer is a set of node features, $\mathbf{h} = {\vec{h}_1,\vec{h}_2,&hellip;,\vec{h}_N}, \vec{h}_i ∈ \mathbb{R}^{F}$ , where $N$ is the number of nodes, and $F$ is the number of features in each node. The layer produces a new set of node features (of potentially different cardinality $F&rsquo;$ ), $\mathbf{h} = {\vec{h&rsquo;}_1,\vec{h&rsquo;}_2,&hellip;,\vec{h&rsquo;}_N}, \vec{h&rsquo;}_i ∈ \mathbb{R}^{F&rsquo;}$, as its output.

# The Attentional Layer broken into 4 separate parts:
1. Simple linear transformation: In order to obtain sufficient expressive power to transform the input features into higher level features, atleast one learnable linear transformation is required. To that end, as an initial step, a shared linear transformation, parametrized by a weight matrix, $W ∈ \mathbb{R}^{F′×F}$ , is applied to every node.
$$\begin{split}\begin{align}i^{(l)}&amp;=W^{(l)}h_i^{(l)} \\end{align}\end{split}$$

![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog3.jpg)
2. Attention Coefficients: We then compute a pair-wise un-normalized attention score between two neighbors. Here, it first concatenates the $z$ embeddings of the two nodes, where $||$ denotes concatenation, then takes a dot product of it with a learnable weight vector $\vec a^{(l)}$, and applies a LeakyReLU in the end. This form of attention is usually called additive attention, in contrast with the dot-product attention used for the Transformer model. We then perform self-attention on the nodes, a shared attentional mechanism $a$ : $\mathbb{R}^{F′} × \mathbb{R}^{F′} → \mathbb{R}$ to compute attention coefficients 
$$\begin{split}\begin{align}e_{ij}^{(l)}&=\text{LeakyReLU}(\vec a^{(l)^T}(z_i^{(l)}||z_j^{(l)}))\\\end{align}\end{split}$$

Q. Is this step the most important step?
Ans. Yes! This indicates the importance of node $j’s$ features to node $i$. This step allows every node to attend on every other node, dropping all structural information.
NOTE: The graph structure is injected into the mechanism by performing <b><em>masked attention</em></b>, we only compute $e_{ij}$ for nodes $j$ ∈ $N_{i}$, where $N_{i}$ is some neighborhood of node $i$ in the graph. In all the experiments, these will be exactly the first-order neighbors of $i$ (including $i$).

3. Softmax: This makes coefficients easily comparable across different nodes, we normalize them across all choices of $j$ using the softmax function.
$$\begin{split}\begin{align}\alpha_{ij}^{(l)}&amp;=\frac{\exp(e_{ij}^{(l)})}{\sum_{k\in \mathcal{N}(i)}^{}\exp(e_{ik}^{(l)})}\\end{align}\end{split}$$

4. Aggregation: This step is similar to GCN. The embeddings from neighbors are aggregated together, scaled by the attention scores.
$$\begin{split}\begin{align}
h_i^{(l+1)}&amp;=\sigma\left(\sum_{j\in \mathcal{N}(i)} {\alpha^{(l)}_{ij} z^{(l)}_j }\right)
\end{align}\end{split}$$

# Multi-head Attention
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog4.jpeg)
An illustration of multi-head attention (with K = 3 heads) by node 1 on its neighborhood. Different arrow styles and colors denote independent attention computations. The aggregated features from each head are concatenated or averaged to obtain $\vec{h'}_{1}$.

Analogous to multiple channels in a Convolutional Net, GAT uses multi-head attention to enrich the model capacity and to stabilize the learning process. Specifically, K independent attention mechanisms execute the transformation of Equation 4, and then their outputs can be combined in 2 ways depending on the use:
$$\textbf{$ \color{red}{Average} $}: h_{i}^{(l+1)}=\sigma\left(\frac{1}{K}\sum_{k=1}^{K}\sum_{j\in\mathcal{N}(i)}\alpha_{ij}^{k}W^{k}h^{(l)}<em>{j}\right)$$
$$\textbf{$ \color{green}{Concatenation} $}: h^{(l+1)}</em>{i}=||<em>{k=1}^{K}\sigma\left(\sum</em>{j\in \mathcal{N}(i)}\alpha_{ij}^{k}W^{k}h^{(l)}_{j}\right)$$

1. Concatenation: As can be seen in this setting, the final returned output, $h′$, will consist of $KF′$ features (rather than F′) for each node.

2. Averaging: If we perform multi-head attention on the final (prediction) layer of the network, concatenation is no longer sensible and instead, averaging is employed, and delay applying the final nonlinearity (usually a softmax or logistic sigmoid for classification problems).

Thus concatenation for intermediary layers and average for the final layer are used.

## Implementing GAT Layer in PyTorch
# Imports
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog5.png)
# GAT Layer
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog6.png)
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog7.png)
## Implementing GAT on Citation Datasets using PyTorch Geometric
# PyG Imports
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog8.png)
# Model
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog9.png)
# Train
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog10.png)
# Evaluate
![GAT]({{ site.baseurl }}/assets/images/blogs/gat_blog11.png)

You can find our implementation made using PyTorch Geometric at [GAT_PyG](https://github.com/dsgiitr/graph_nets/blob/master/GAT/GAT_PyG.py) with GAT trained on a Citation Network, the Cora Dataset.

# References
[Code & GitHub Repository](https://github.com/dsgiitr/graph_nets)
[Graph Attention Networks](https://arxiv.org/abs/1710.10903)
[Graph attention network, DGL by Zhang et al.](https://docs.dgl.ai/tutorials/models/1_gnn/9_gat.html)
[Attention Is All You Need](https://arxiv.org/pdf/1706.03762.pdf)
[The Illustrated Transformer](http://jalammar.github.io/illustrated-transformer/)
[Mechanics of Seq2seq Models With Attention](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/)
[Attention? Attention!](https://lilianweng.github.io/lil-log/2018/06/24/attention-attention.html)

# Written By
Anirudh Dagar
