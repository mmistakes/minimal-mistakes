---
layout: single
title: Genetic Algorithms. Introduction.
author-id: Chingis Maksimov
tags: [genetic algorithms, data science, tutorial]
classes: wide
---

This is an introductory post about [genetic algorithms](https://en.wikipedia.org/wiki/Genetic_algorithm) (GAs) , which are a suite of methods of solving optimization problems. GAs form a subset of more general [evolutionary algorithms](https://en.wikipedia.org/wiki/Evolutionary_algorithm). As the name implies these algorithms are based on evolution-inspired methods, like mutation, crossover, survival of the fittest, to achieve an optimal solution.

So, how do genetic algorithms work? Generally speaking, GAs work by creating a *population* of possible solutions, called individuals or phenotypes, and letting them *evolve* until an optimal solution to a given problem has been obtained. As the first step, the algorithm starts off with the first generation of randomly created phenotypes, where each individual phenotype has a set of properties that can be easily altered. Think of these individual solutions as of sequences of DNA. At the end of each generation, each individual solution is being evaluated and gets assigned a fitness score. Now, using these scores, the next generation is created by means of crossover, i.e. when two *parent* solutions are taken and their *genes* are exchanged, and mutation - the process by which any given gene in the phenotype can be randomly changed. More fit solutions have higher chances of being picked for subsequent crossover and thus have a higher probability of passing on their genes to the next generation. This process repeats until the optimal solution is achieved.

GAs provide a number of benefits over more traditional approaches to optimization problems, like conceptual simplicity, broad applicability, self-optimization. Furthermore, real-life problems usually suffer from nonlinear constraints and non-stationarity that make classical optimization techniques less effective. Fogel (1997) provides a very good overview of other benefits associated with GAs. Over the years, EAs and GAs have found applications in a [variety of fields](https://en.wikipedia.org/wiki/List_of_genetic_algorithm_applications).

We are going to demonstrate the main steps of genetic algorithms by making our Python program generate a prespecified string. In other words, given a target string of length *n*, we would like to use GA method to generate this target string by means of mutation, crossover and selection from a randomly generated initial population. This example, even though very simple, utilizes all the main components of GA algorithms.

Let us start by importing the required libraries.


```python
import numpy as np
import string
```

We are going to use *String* library to get the lowercase letters of the Engish language alphabet. We use lowercase letters to minimize the space of possible solutions.

The first function, *generate_string*, does exactly what it says - generates a random string of length *n* by randomly sampling with replacement from a given *pool*, a list of possible letters.


```python
def generate_string(n, pool):
    x = ''
    for i in range(n):
        x += np.random.choice(pool)
    return x
```

For example, below we are creating a string that consists of 5 lowercase letters.


```python
generate_string(5, list(string.ascii_lowercase))
```




    'hmnjc'



As we mentioned in the introduction of this post, a score or fitness evaluation function is important. For the purposes of this project, we define the following score function.


```python
def score(x, target):
    score = 0
    assert len(x) == len(target), "The strings are of different lengths"
    for i, j in zip(x, target):
        if i == j:
            score += 1
    return score
```

Basically, given some string *x* and another string *y* of the same length, our *score* function counts the number of elements on which the two strings agree. For example,


```python
score('peach', 'pecan')
```




    2



The two strings, 'peach' and 'pecan', share only the first two letters and thence a score of 2.

The next important component of our algorithm is the ability for each possible solution to randomly mutate. The following function, given a string *x*, randomly changes it. The probability of mutation is controlled by *mutation_probability* parameter.


```python
def mutate(x, mutation_probability, pool):
    z = ''
    for i in range(len(x)):
        if np.random.random() < mutation_probability:
            z += np.random.choice(pool)
        else:
            z += x[i]
    return z
```

Let us test our newly defined function by randomly mutating "apple".


```python
np.random.seed(3)
mutate('apple', 0.5, list(string.ascii_lowercase))
```




    'apall'



As we can observe, 2 out of 5 letters have been randomly changed, namely letter 'p' in 3rd position has been changed by letter 'a' and letter 'e' in 5th position has been replaced by letter 'l'.

As we discussed previously, new generation of solutions is obtained by means of a crossover operation. This operation works by taking two parent solutions, blending them together and yielding as a result a new solution. For that purpose, we define *crossover* function.


```python
def crossover(x, y):
    z = ''
    for i in range(len(x)):
        if np.random.random() < 0.5:
            z += x[i]
        else:
            z += y[i]
    return z
```

As an example, consider the following example where we crossover the following two strings: "kitchen" and "holiday".


```python
np.random.seed(10)
crossover('kitchen', 'holiday')
```




    'hilihen'



The last function, which will incorporate all the functions we have previously defined, is called *new_generation*. As the name implies, this function will create a new generation of solutions given the current generation. We are going to provide the function in full and then explain some of the individual parts.


```python
def new_generation(generation, target, mutation_probability, pool):
    scores = [score(i, target) + 1 for i in generation]
    new_generation = []
    for i in range(len(generation) - 1):
        parent1 = np.random.choice(generation, p=np.asarray(scores) / np.sum(scores))
        parent2 = np.random.choice(generation, p=np.asarray(scores) / np.sum(scores))
        new_generation.append(mutate(crossover(parent1, parent2), mutation_probability, pool))
    best_performer = sorted(zip(scores, generation))[-1][-1]
    new_generation.append(best_performer)
    return (new_generation, best_performer)
```

The first step is to evaluate the fitness of each individual solution in a generation as is done by line 2 of the above piece of code. This would later allow us to make use of the crossover operation where better performing solutions have a higher chance of being used. This is implemented on lines 5 and 6 where, for each new solution, we randomly draw two parents from the generation, apply crossover and mutation operations. Finally, note that, for each generation, we also identify the best performing solution. We do this so that any subsequent generation includes the fittest solution from the preceding generation. This way we are making sure that our population is never regressing and subsequent generations achieve at least the same score as the one preceding.

Finally, let us implement the above piece of code and see how well this algorithm will do. We are going to let our population evolve through 1,000 generations or epochs with 100 solutions per generation. We allow for a 30% chance for mutation. The string of interest will be "i love rl".


```python
np.random.seed(2)
alphabet = list(' ' + string.ascii_lowercase)
target_sentence = 'i love rl'
generation_size = 100
mutation_probability = 0.3
number_epochs = 1000

generation = [generate_string(len(target_sentence), alphabet) for i in range(generation_size)]

for epoch in range(number_epochs):
    generation, best_performer = new_generation(generation, target_sentence, mutation_probability, alphabet)
    if (epoch + 1) % 100 == 0 or epoch==0:
        print("Epoch ", epoch + 1, ": ", best_performer)
```

    Epoch  1 :  ydmhd  dl
    Epoch  100 :  y zobe rl
    Epoch  200 :  iglove rl
    Epoch  300 :  iglove rl
    Epoch  400 :  inlove rl
    Epoch  500 :  inlove rl
    Epoch  600 :  inlove rl
    Epoch  700 :  inlove rl
    Epoch  800 :  inlove rl
    Epoch  900 :  iylove rl
    Epoch  1000 :  iylove rl


We can see that the algorithm almost achieved the desired solution. The best performing string is "iylove rl" which is only a single letter different from the target sentence.

There are numerous ways in which GAs can be utilized either in their own right or as a very useful complement to other machine learning techniques. We will be covering these uses in posts to follow.

## References
Fogel, David B.. “The Advantages of Evolutionary Computation.” BCEC (1997).
