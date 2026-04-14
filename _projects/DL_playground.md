---
layout: project
title: "DL-Playground: A Visual Pytorch Deep Learning Prototyping Tool"
title_main: "DL-Playground"
subtitle: "A Visual PyTorch Deep Learning Prototyping Tool"
permalink: /projects/DL_playground/
collaborator_name: "SDSLabs"
collaborator_url: "https://sdslabs.co/"
collaborator_logo: "https://www.sdslabs.co/favicon.ico"
collaborator_logo_width: 50
live_url: "https://dlplayground.dsgiitr.in/"
github_url: "https://github.com/dsgiitr/DL-Playground"
---

<p class="project-intro">
  <strong>DL-Playground is an interactive, web-based visual editor for designing, prototyping, and understanding PyTorch neural network architectures.</strong><br><br>
  This tool provides an intuitive drag-and-drop interface that empowers developers and learners to build complex deep learning models without writing code from scratch. See your architecture come to life, from individual layers to complete computational graphs, and instantly generate the corresponding Python code.
</p>

<div class="demo-video">
  <a href="https://www.youtube.com/watch?v=fR5L05nidVM" target="_blank">
    <img src="https://github.com/user-attachments/assets/3499f9df-f0ed-49a7-ac69-0bf1d80318c6" alt="DL-Playground Demo" width="100%" style="display: block;">
  </a>
</div>

<div class="project-section">
  <h2>Key Features</h2>
  <ul>
    <li><strong>Visual Graph Editor</strong>: Built with React Flow, allowing for intuitive drag-and-drop construction of models. Connect, arrange, and configure layers with ease.</li>
    <li><strong>Extensive Node Library</strong>: A rich collection of PyTorch layers and operations.</li>
    <li><strong>Real-time Code Generation</strong>: Instantly compiles the visual graph into a clean, readable, and copy-pasteable PyTorch <code>nn.Module</code> class.</li>
    <li><strong>Modular & Reusable Components</strong>: Encapsulate parts of your graph into custom modules and reuse them.</li>
    <li><strong>Live Shape Inference</strong>: Calculates and displays tensor shapes as you build, helping to debug shape-related errors before they happen.</li>
    <li><strong>Model Inspection</strong>: Leverage the integrated <code>torchlens</code> backend to analyze and visualize model summaries and internal states.</li>
  </ul>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch;">
  <div class="project-section" style="flex: 1; min-width: 300px; margin-bottom: 0;">
    <h2>Technology Stack</h2>
    <h3 style="color: #2b6cb0; margin-top: 1rem; font-size: 1.2rem;">Frontend</h3>
    <ul style="margin-top: 0.5rem; margin-bottom: 1.5rem;">
      <li><strong>Framework</strong>: React</li>
      <li><strong>Language</strong>: TypeScript</li>
      <li><strong>Graph Visuals</strong>: React Flow</li>
    </ul>

    <h3 style="color: #2b6cb0; margin-top: 0; font-size: 1.2rem;">Backend</h3>
    <ul style="margin-top: 0.5rem;">
      <li><strong>Framework</strong>: FastAPI</li>
      <li><strong>Language</strong>: Python</li>
      <li><strong>Deep Learning</strong>: PyTorch</li>
      <li><strong>Analysis</strong>: TorchLens</li>
    </ul>

  </div>

  <div class="project-section" style="flex: 1; min-width: 300px; margin-bottom: 0;">
    <h2>How to Use</h2>
    <ol style="font-size: 1.1rem; line-height: 1.8; color: #4a5568; padding-left: 20px; margin-top: 1rem;">
      <li><strong>Open</strong> the Live Website.</li>
      <li><strong>Add Nodes</strong>: Drag layers from the sidebar to the canvas.</li>
      <li><strong>Configure</strong>: Click on a node to adjust structural parameters.</li>
      <li><strong>Connect</strong>: Drag links from output to input handles.</li>
      <li><strong>View Code</strong>: Watch the PyTorch code panel generate live.</li>
      <li><strong>Group</strong>: Use <kbd style="background: #edf2f7; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">Shift + Click</kbd> to save modules.</li>
      <li><strong>Export</strong>: Save an SVG or copy Python code.</li>
    </ol>
  </div>
</div>
