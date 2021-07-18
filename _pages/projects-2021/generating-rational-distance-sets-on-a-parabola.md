---
title: Generating Rational Distance Sets on a Parabola
permalink: /projects-2021/generating-rational-distance-sets-on-a-parabola
toc: true
layout: single
author_profile: false

---

## Project Description
This project provides a first exposure to students toward mathematical research. We work on a presently open problem in mathematics and make significant contributions to improving our present understanding of the problem, including proving new theorems and obtaining new computational results. The problem may be described as follows. 
A rational distance set is a set of points with each of its pairwise distances to be rational. We study the problem of finding N-point rational distance sets on the parabola y = x^2. An open problem is to find the largest N for which a rational distance set exists on the parabola [1]. The literature on this topic presently has studied the problem for N≤4, with results showing that there exist infinitely many rational distance sets for each N for N=2, 3 and 4. However, only one 5-point rational distance set is known and for N≥6, we do not know presently if any rational distance sets exist at all. 
In this project, we provide a new correspondence of this problem with Pythagorean triplets, which enables us to perform a linear algebraic formulation of the problem for general N. We are able to provide exact expressions to the coordinates of the rational distance set in terms of Pythagorean triplets, and provide exact conditions as to when a rational distance may exist. These conditions were not known before. Our correspondence also establishes a relatively simple method to show the density of the sets on the parabola, and we are able to successfully apply this for N=2 and 3. Further studies involve computational searching of the rational distance sets, and we write programs to enumerate and characterize the solutions for N=3, 4 and 5. 

Reference: [1] G. Campbell, Points on y = x^2 at rational distance, Math. Comp., 73 (2004), 2093–2108.

## Mentors
Sayak Bhattacharjee  
Second Year Undergraduate (Y19), Department of Physics, IIT Kanpur
For further details on the project, feel free to reach me at sayakb[at]iitk.ac.in.

## Learning Roadmap
Week 1: Introduction to the project is through a thorough literature survey of the relevant papers on the subject. We covered papers specific to the problem such as references [1-3], and also references that give a broader understanding of the problem in light of the famed Erdos-Ulam conjecture [4], to give motivation to studying the density of the solutions.  

Week 2-3: Introduced a novel correspondence with Pythagorean triplets, and discussed some ideas to develop the linear algebraic formulation of the problem. We discussed and rederived the main theorems in this. We thus obtained the exact structure of the solutions for upto N=5, and verified our results with those given in existing literature. This was supplemented with some basic reading on prominent linear algebraic concepts, such as rank and its correspondence with the nature of solutions of a linear system of equations.  

Week 4-5: Introduced the ideas about density of the solutions and how to correlate it with the Pythagorean triplet inspired structure of the rational distance sets. We reviewed a paper by Hinson [5] which enabled us to extend a result on the density of Pythagorean triplets to the density of the rational distance sets. This leads us to show density of the solutions for N=2 and N=3, and gives ideas as to how to extend this for higher N. This was supplemented by a reading on basic real analysis concepts, which included understanding of dense sets, open maps, etc.  

Week 6-8: Demonstrated codes on how to write efficient algorithms in Python to count the number of rational distance sets within an appropriately chosen window of the available Pythagorean triplets. We ran codes written for N=3, and brainstormed how to extend this for N=4. A general algorithm for counting solutions was established. A good familiarity with basic coding in Python was thus gained.  

Week 9-10: Enumeration codes for N=4 were polished and we obtained new solutions (not known in existing literature) which were plotted with an increasing number of available Pythagorean triplets. These plots were analysed and compared with N=3. Further, codes to obtain solutions for N=5 were designed and run, and the only existing solution known was reproduced.  

Future Work: We intend to parallelize our enumeration codes so that the computational searching may be scaled up and solutions not known to existing literature for N=5 and beyond may be obtained. Further, density results for N=4 are being formulated, and thus, we hope to obtain new theorems on the density of the solutions for N≥4.  

References: 
[1] G. Campbell, Points on y = x^2 at rational distance, Math. Comp., 73 (2004), 2093–2108.  
[2] A. Choudhry, Points at rational distances on a parabola, Rocky Mountain Journal of Mathematics 36 (2006) 413-424.  
[3] J. Solymosi, F. de Zeeuw, On a question of Erdos and Ulam, Discrete and Computational Geometry 43 (2010) 393-401.  
[4] T. Tao, The Erdos-Ulam problem, varieties of general type, and the Bombieri-Lang conjecture, [Online]. Available: https://terrytao.wordpress.com/tag/erdos-ulam-problem/, 2015.  
[5] E. K. Hinson, On the distribution of Pythagorean triangles, The Fibonacci Quarterly 30 (1992) 335{338.  


## Resources
Since this work is unpublished as of yet, further resources can be made available to the reader upon personal request.

