---
title: Physically Based Rendering
permalink: /projects-2021/physically-based-rendering
toc: true
layout: single
author_profile: false

---

## Project Description
This project is an introduction to realistic computer graphics keeping in mind the physical properties of light and surfaces. Various models of lighting are discussed, various methods of numerical integration are presented, analysed and compared, finally resulting in a ray-tracing renderer built on a simplified version of the principles of actual modern renderers like Cycles or RenderMan.

## Mentors
* Mayant Mukul

## Learning Roadmap
1) Introduction, motivation, what is rendering, what is ray tracing, scope of the project
2) The rendering equation, radiometry, energy conservation, BRDFs
3) Color spaces, digital representation of color, RGB values
4) Cameras, ray-scene intersection, diffuse and specular reflections, naive recursive ray tracing
5) Numerical integration, quadrature rules, solving the rendering equation
6) Error analysis and rate of convergence, the struggles of solving higher-dimensional integrals with quadrature rules, motivating other methods of numerical integration
7) Probability refresher, Monte Carlo integration, sampling techniques, error analysis and verifying suitability for our purposes, applying it to our naive recursive ray tracer
8) Motivating a path-based formulation of the problem, verifying the convergence of our path-based estimator, extending our renderer to support path tracing
9) Implementing and comparing various sampling techniques and BRDFs

## Resources
1) [Physically-Based Rendering: From Theory to Implementation](https://www.pbr-book.org/)
2) [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html)
3) [Robust Monte Carlo Methods for Light Transport Simulation](http://cseweb.ucsd.edu/~viscomp/classes/cse168/sp20/readings/veach_thesis.pdf)
4) [The Rendering Equation](https://dl.acm.org/doi/abs/10.1145/15922.15902)
5) [Weekly meeting notes](https://drive.google.com/drive/folders/1tWFsOznivWPfiUq2BOB1d4qerxy14Sw6)
6) [Git repository for optional weekly tasks](https://github.com/mayant15/stamatics-pbr/)

