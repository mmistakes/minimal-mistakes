---
title: "DL-Playground: A Visual Pytorch Deep Learning Prototyping Tool"
layout: single
permalink: /projects/DL_playground/
---
<h3>
  Built in collaboration with 
  <a href="https://dsgiitr.in/" target="_blank">
    <img src="https://github.com/user-attachments/assets/78e8c579-2b32-4806-9601-753fd786c5e5" width="45" style="vertical-align: middle;" alt="DSG Logo">
  </a>
  &nbsp;×&nbsp;
  <a href="https://sdslabs.co/" target="_blank">
    <img src="https://github.com/user-attachments/assets/8b366d57-6f39-4e91-a065-a83dfceed571" width="70" style="vertical-align: middle;" alt="SDSLabs Logo">
  </a>
</h3>
<br>

**DL-Playground is an interactive, web-based visual editor for designing, prototyping, and understanding PyTorch neural network architectures.**

This tool provides an intuitive drag-and-drop interface that empowers developers and learners to build complex deep learning models without writing code from scratch. See your architecture come to life, from individual layers to complete computational graphs, and instantly generate the corresponding Python code.

## Watch Demo
<a href="https://www.youtube.com/watch?v=fR5L05nidVM">
<img src="https://github.com/user-attachments/assets/3499f9df-f0ed-49a7-ac69-0bf1d80318c6" alt="DL-Playground Demo" width="100%">
</a>


---

## Key Features

- **Visual Graph Editor**: Built with React Flow, allowing for intuitive drag-and-drop construction of models. Connect, arrange, and configure layers with ease.
- **Extensive Node Library**: A rich collection of PyTorch layers and operations, including:
  - **Core Layers**: Linear, Activations (ReLU, Sigmoid, etc.), Softmax, Flatten, Reshape.
  - **Convolutional/Vision**: Conv2d, MaxPool2d, AvgPool2d, Upsample, Residual Blocks.
  - **Recurrent/Sequence**: LSTM, GRU, RNN, Multi-head Attention, Embeddings.
  - **Losses & Metrics**: MSELoss, CrossEntropyLoss, BCELoss, Accuracy.
- **Real-time Code Generation**: Instantly compiles the visual graph into a clean, readable, and copy-pasteable PyTorch `nn.Module` class, complete with `__init__` and `forward` methods.
- **Modular & Reusable Components**: Encapsulate parts of your graph into custom modules and reuse them throughout your architecture, promoting a clean and organized workflow.
- **Live Shape Inference**: Calculates and displays tensor shapes as you build, helping to debug shape-related errors before they happen.
- **Model Inspection**: Leverage the integrated `torchlens` backend to analyze and visualize model summaries and internal states.
- **Built-in Code Editor**: A Monaco-powered editor to view and refine the generated Python code directly in the application.
- **Export to Image**: Export your final graph visualization as a PNG image for documentation or presentations.

---

## Technology Stack

- **Frontend**:
  - **Framework**: React
  - **Language**: TypeScript
  - **Graph Visualization**: React Flow
- **Backend**:
  - **Framework**: FastAPI
  - **Language**: Python
  - **Deep Learning**: PyTorch
  - **Model Analysis**: TorchLens

---

## How to Use

1. **Open the Application**: Navigate to the frontend URL in your browser.
2. **Add Nodes**: Drag layers and operations from the sidebar onto the canvas.
3. **Configure Nodes**: Click on a node to adjust parameters like kernel size, output features, etc.
4. **Connect Nodes**: Drag from the output handle of one node to the input handle of another to create a connection.
5. **View Generated Code**: As you build the graph, the corresponding PyTorch code will automatically update in the "Code" panel.
6. **Create Modules**: Select a group of nodes using <kbd>Shift + L-Click</kbd> and save a module to create your own building block.
7. **Export**: Use the export buttons to save a SVG image of your graph or copy the generated Python code.

---
<div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 2rem;">
  
  <a href="https://dlplayground.dsgiitr.in/" target="_blank" style="
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: 10px; 
    text-decoration: none; 
    background-color: #007bff; 
    color: white; 
    font-weight: 600;
    width: 220px; 
    height: 50px; 
    border-radius: 8px;
    transition: transform 0.2s ease;
  ">
    <i class="fas fa-external-link-alt"></i> Live Website
  </a>
  
  <a href="https://github.com/dsgiitr/DL-Playground" target="_blank" style="
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: 10px; 
    text-decoration: none; 
    background-color: #24292e; 
    color: white; 
    font-weight: 600;
    width: 220px; 
    height: 50px; 
    border-radius: 8px;
    transition: transform 0.2s ease;
  ">
    <i class="fab fa-github"></i> GitHub Repository
  </a>

</div>

---
## Contributing

This project is a combined effort from the DSG Club and SDSLabs at IIT Roorkee.
