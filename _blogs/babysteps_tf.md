# Baby steps with Tensoflow #2

*Saturday, Jun 17, 2017 | Tags: Deep Learning, NLP*

---

In this blog we will understand how to use Tensoflow for Linear and Logistic Regression. I hope you have read 1st blog of this series, if not please give it a read.

---

## Why in the world would I use Tensorflow for regression?

No. you will not. Though to understand each function of Tensorflow properly I suggest you go through this.

---

## Linear Regression

Start with generating the data.

Generate X_data of shape [1000,X_data = np.random.normal(loc=10, scale=10, size=(1000,4))
Equation of Y in terms of X_data
Y_data = 0.5 * X_data[:, 0] - 52 * X_data[:, 1] +12*X_data[:, 2] - X_data[:, 3]
Y_data = Y_data.reshape(-1,1)

text

Now, to start with we need to define Place holders for the data feeding while training. We have seen what placeholders do in the last blog.

x = tf.placeholder(tf.float32, shape=[None, 4])
y = tf.placeholder(tf.float32, shape = [None,1])

text

Here shape is [None, 4]. What does this mean? It means we can provide any value in place of None. So while feeding we can provide as many examples we want. This is very useful in mini batch training, which we will see in the subsequent blogs. So, basically we feed training data through placeholders.

Now we will define weight variable and intercept term. This will be tf.Variable because we need to find the value of W and b. So, we will initialize it randomly and then using optimization algorithm we will reach to the true value.

W = tf.Variable(tf.random_normal(), name="Weight")
b = tf.Variable(tf.random_normal(), name="Intercept")

text

Next we generate our hypothesis. Read more about more matrix functions like matmul here.

hypothesis = tf.matmul(x, W) + b

text

Now we will define our loss function. We will be using RMSE (reduced mean squared error) loss.

Loss = tf.reduce_mean(tf.square(y - hypothesis))

text

Next we will use Stochastic Gradient Optimizer to minimize this loss. If you don’t know how this optimization is carried out, I strongly suggest you to read this great blog on gradient descent optimization.

optimizer = tf.train.GradientDescentOptimizer(learning_rate= 0.0001)
train = optimizer.minimize(Loss)

text

Now as we’ve seen in previous blog, tensorflow is Static graph. We need to start Tensorflow session to pass data through this graph.

sess = tf.Session()

Initialize all the variables
sess.run(tf.global_variables_initializer())

text

Now everything is set. We need to feed data to the graph and find the optimal values for W and b

Now here you need to understand what `sess.run()` does? It basically computes the values of the quantities you specified (in our case Loss, hypothesis, W, b, train). But look train is not a quantity, it’s just an optimizer trying to minimize error. So, based on the current error when you run train, it will update values of W and b. This will continue for all 20000 epochs.

As you can see at the end W and b values are very close to its original values.

You can find a full code here.

---

## Logistic Regression

We will use iris data for logistic regression. Iris data has three classes (setosa, versicolor and virginica). I used setosa as class “0” and versicolor and virginica as class “1”.

Here is how you import data using tensorflow. We have two files iris_training.csv and iris_test.csv

iris_training = "iris_training.csv"
iris_testing = "iris_test.csv"

text

Now to import data from these csv. More about reading data in tensorflow here.

Now logistic regression is useful can do binary classification only! So, we need to merge two classes.

We have three classes, we will merge class = 1 and class = 2.
So, now we will have binary classification problem (0, 1)
X_train_data = training_set.data
Y_train = training_set.target
Y_train[Y_train > 1] = 1

X_test_data = testing_set.data
Y_test = testing_set.target
Y_test[Y_test > 1] = 1

text

Again it’s the same as before. Define placeholders, variables, Hypothesis, Loss function and Optimizer.

tf.placeholder is used for data
X = tf.placeholder(tf.float32, shape = [None, 4])
Y = tf.placeholder(tf.float32, shape = [None])

tf.Variable is used for Variable
W = tf.Variable(tf.random_normal(), name="weights" )
b = tf.Variable(tf.random_normal(), name = "bias")

Hypothesis
hypothesis = tf.sigmoid(tf.matmul(X, W) + b)

Use categorical cross entropy loss (or log loss)
cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y)*tf.log(1 - hypothesis))

We will define an optimizer (Gradient Descent Optimizer)
optimizer = tf.train.GradientDescentOptimizer(learning_rate= 0.001)
train = optimizer.minimize(cost)

text

This all steps are self explaining. Here loss in categorical cross entropy loss, you can read about it here

If hypothesis value is > 0.5, class ‘1’ otherwise class 0. And accuracy is simple classification accuracy.

Predict if output probability > 0.5
predicted = tf.cast(hypothesis > 0.5, dtype= tf.float32)

#Define accuracy
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype = tf.float32))

text

Let’s train:

Check the accuracy on test data. It is about 0.73

_, acc_test = sess.run([predicted, accuracy], feed_dict = {X: X_test_data, Y: Y_test})

print(acc_test)

text

Let’s check the result with sklearn Logistic Regression

from sklearn.linear_model import LogisticRegression

Define a logistic regression
We will use very small C value because we are not adding any penalty
logistic_regression = LogisticRegression(max_iter=20000, C = 1e-9, verbose = True)

fit on training data
logistic_regression.fit(X_train_data, Y_train)

print("test accuracy using sklearn is ", logistic_regression.score(X_test_data, Y_test))

text

Both accuracies are comparable, but sklearn is surprisingly fast. I have to look into it.

In my full code here, I have even tried regularization at the end, but it didn’t improve accuracy.

---

## REFERENCES

- Tensorflow cookbook
- Optimization Algorithms
- Blog and blog
- Stanford notes
- Tensorflow tutorial

Note: I strongly suggest to go deep into references. Whatever I’ve written here is just to make you feel comfortable with tensorflow, but all the magics lie in References.

---

Happy learning! :D

Hit ❤ if this was useful.
