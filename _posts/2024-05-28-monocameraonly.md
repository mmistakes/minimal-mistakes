---
title: "(R-AL) Mono-Camera-Only Target Chasing for a Drone in a Dense Environment by Cross-Modal Learning"
categories:
 - 2ndAuthor
tags:
 - deep learning
header:
  teaser: /assets/image/thumbnail/tro2023.gif
authors: Seungyeon Yoo, Seungwoo Jung, <u>Yunwoo Lee</u>, Dongsek Shim, and H. Jin Kim
links:
- paper:
  link: https://ieeexplore.ieee.org/abstract/document/10542210
  name: "Paper"
- bibtex:
  name: "Bibtex"
---
{% include video id="9WIFe66S9I8" provider="youtube" %}

**Abstract:** Chasing a dynamic target in a dense environment is one of the challenging applications of autonomous drones. The task requires multi-modal data, such as RGB and depth, to accomplish safe and robust maneuver. However, using different types of modalities can be difficult due to the limited capacity of drones in aspects of hardware complexity and sensor cost. Our framework resolves such restrictions in the target chasing task by using only a monocular camera instead of multiple sensor inputs. From an RGB input, the perception module can extract a cross-modal representation containing information from multiple data modalities. To learn cross-modal representations at training time, we employ variational autoencoder (VAE) structures and the joint objective function across heterogeneous data. Subsequently, using latent vectors acquired from the pre-trained perception module, the planning module generates a proper next-time-step waypoint by imitation learning of the expert, which performs a numerical optimization using the privileged RGB-D data. Furthermore, the planning module considers temporal information of the target to improve tracking performance through consecutive cross-modal representations. Ultimately, we demonstrate the effectiveness of our framework through the reconstruction results of the perception module, the target chasing performance of the planning module, and the zero-shot sim-to-real deployment of a drone.

## Bibtex <a id="bibtex"></a>
```
@ARTICLE{10542210,
  author={Yoo, Seungyeon and Jung, Seungwoo and Lee, Yunwoo and Shim, Dongseok and Kim, H. Jin},
  journal={IEEE Robotics and Automation Letters}, 
  title={Mono-Camera-Only Target Chasing for a Drone in a Dense Environment by Cross-Modal Learning}, 
  year={2024},
  volume={9},
  number={8},
  pages={7254-7261},
  keywords={Drones;Task analysis;Planning;Target tracking;Vehicle dynamics;Training;Image reconstruction;Vision-based navigation;visual learning;deep learning for visual perception;deep learning methods},
  doi={10.1109/LRA.2024.3407412}}

```