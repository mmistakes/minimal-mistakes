---
title: "Baby steps with Tensorflow #1"
layout: single
permalink: /blogs/babysteps_tf1/
---


# Baby steps with Tensorflow #1

*Thursday, Jun 1, 2017*  
*Tags: Deep Learning, NLP*


<img src="{{ site.baseurl }}assets/images/blogs/babysteps_with_tf/babysteps_tf1.jpg" width="200" height="200" alt="babysteps">

> Deep Learning is a Mandate for Humans, Not Just Machines — Andrew Ng

Yes, Deep learning is a next big thing. Yes, AI is changing the world. Yes, It will take over your jobs. All fuss aside, you need to sit down and write a code on your own to see things working. Practical knowledge is as much important as Theoretical knowledge.


<img src="{{ site.baseurl }}assets/images/blogs/babysteps_with_tf/babysteps_tf12.jpg" width="200" height="200" alt="babysteps">

**Fact:** I’m not a coder.

There are many deep learning frameworks which make it really easy and fast to train different models and deploy it. Tensorflow, PyTorch, Theano, Keras, Caffe, Tiny-dnn and list goes on. Here is the great comparison for those want to know pros and cons of each one.

We will focus on Tensorflow. (For all the great debaters out there, I’m not a supporter of anyone. Turns out tensorflow is relatively new with really great resources to learn and most of the industries seems to use it.) I’m learning tensorflow from other resources, so I will try to merge them here in best way possible. This will surely help those who haven’t used Tensorflow before, I can not say anything for others. Though it is assumed that you all have basic under standing of Neural Networks, Loss functions, Optimization techniques, Backpropagation, etc. If not I suggest you go through this great book by Michael Nielsen. I will also be mentioning more often other libraries like numpy, sklearn, matplotlib, etc.

---

## Constants, Variables, Placeholders and Operations

### Constants

Here constants has same meaning as in any other programming language. They stores constant value. (Integer, float, etc.)

c1 = tf.constant(value = 32, dtype = tf.float32, name = 'a')
c2 = tf.constant(value = 20, dtype = tf.float32, name = 'b')

text

Where will you be using constants? Value which are not supposed to change! Like number of layers, shape of the weight vectors, shape of each layer, etc. Some of the great constant initializers are here (most like numpy). Thing to notice is that you can not even get a value of tensor until you initialize a session. What is session? We will get to it.

### Variables

Variables are those, which will be updated in Tensorflow graph. For example: Weights and biases. More about variables here.

variable 1 with initial value 100
v1 = tf.Variable(initial_value=, name = 'v1')

variable 3 with initial value initialized by a constant
v3 = tf.Variable(initial_value= tf.random_normal(shape= [100 , 4], mean= 0.0, stddev= 1), name = 'v3')

text

### Placeholders

Placeholders are as name suggest reserve space for the data. So, while feed forwarding you can feed data into network through placeholders. Placeholders have defined shape. If your input data has n-dimensions, you need to specify n-1 dimensions and then while feeding, you can feed data into batches in the network. More about placeholders here.

For example lets say you have MNIST data
MNIST digits are 28*28 pixels, so you need to specify this
#dimension in placeholder.
#Here shape = [None, 2828], where None can take any value.
ph1 = tf.placeholder(dtype= tf.float32, shape= [None, 2828])

text

### Operations

Operation are basic function we define on variables, constants and placeholders. More about operations here

multiply c1 and c2
o1 = tf.multiply(c1, c2)

sum of elements of v3
o4 =tf.reduce_sum(v3)

text

---

## Session

Session is a class implemented in Tensorflow for running operations, and evaluating constants and variables. More about session here.

Start a session
sess = tf.Session()

We can evaludate o1 and o2
print(sess.run(o1), sess.run(o2))

We need to initialize all the variables defined
before evaluating operations which contain variables
sess.run(tf.global_variables_initializer())

Now we can evaluate operation on variables
print(sess.run(o4))

text

---

## How Tensoflow works?

What are the main steps of any machine learning algorithm in Tensorflow?

1. Import the data, normalize it, or create data input pipeline.
2. Define an algorithm — Define variables, structure of the algo, loss function, optimization technique, etc. Tensorflow creates static computational graphs for this.
3. Feed the data through this computation graph, compute loss from loss function and and update the weights (variables) by backpropagating the error.
4. Stop when you reach some stopping criteria.

Here is vary simple example for multiply operation on two constants.

<img src="{{ site.baseurl }}assets/images/blogs/babysteps_with_tf/babysteps_tf13.jpg" width="200" height="200" alt="babysteps">

And here is other simple computation graph.

<img src="{{ site.baseurl }}assets/images/blogs/babysteps_with_tf/babysteps_tf14.jpg" width="200" height="200" alt="babysteps">

---

## Simple computation Graph

That’s it for now!

---

### Source Code

You can find source code for this assignment on my github repo.

---

### References

Really good and detailed blog.

Github

Getting Started with Tensorflow

---

Next we will see Linear and Logistic Regression.

Hit ❤ if you find this useful. :D

---

*Current date: Friday, April 18, 2025, 9:39 AM IST*
