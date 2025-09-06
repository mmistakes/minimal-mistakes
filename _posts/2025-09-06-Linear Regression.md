---
title:  "Linear Regression"
date:   2025-09-06 10:00:00 +0700
tag: Programming 
toc: true
---

Just a personal note 🩵 on how to implement linear regression in Python — from loading data to training, evaluating, and plotting the model. Just a reminder for my self in case gue lupa dan pikun XD

## Python vs Excel for Linear Regression
- **Python**: More flexible, better for large datasets, and integrates well with other data science tools.
- **Excel**: Easier for quick, small-scale analyses but can struggle with larger datasets and lacks advanced modeling capabilities.

## Import Library
We use NumPy, Pandas, Matplotlib, and scikit-learn for numerical computation, data handling, visualization, and building the regression model.

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
import pandas as pd
```

## Loading Data
You can provide data manually for quick tests or load it from a CSV/Excel file for real datasets.
### Loading Data Manually
```python
# Sample Data
x = np.array([1, 2, 3, 4, 5])
y = np.array([2.1, 4.3, 5.8, 8.2, 9.5]) 
```

### Loading Data from Excel/CSV
```python
# path to your CSV file
data = pd.read_csv('/data.csv')

x = data['column 1'].values.reshape(-1, 1)
y = data['column 2'].values
```

## Create and fit the model
Initialize the LinearRegression object and train it with your data.
```python
model = LinearRegression()
model.fit(X, y)
```

## Get parameters (Coefficient and Intercept)
Below are the attributes you can read from a fitted scikit-learn LinearRegression model and a short explanation of what they mean.

```python
# Coefficient(s) and intercept
print("Coefficients (b):", model.coef_)
print("Intercept (c):", model.intercept_)

# Use predict to get model predictions for new data
# For a single new sample with the same number of features:
# model.predict([[feature_1, feature_2, ...]])
```

Explanation:
- `model.coef_` contains the learned weights (b) for each feature. For a single-feature model this is a single value; for multi-feature it's an array matching the number of features.
- `model.intercept_` is the learned bias term (c).

Mathematically the model predicts y ≈ X · b + c. For example, with one feature the prediction is y ≈ x * b + c.

Notes / tips:
- For a single feature be careful to pass `X` as 2D (use `reshape(-1, 1)`) or scikit-learn will complain.
- Inspect residuals and R^2 (`model.score(X, y)`) to judge fit quality.
- To get standard errors or p-values you need statsmodels (scikit-learn doesn't provide them by default).

## Calculate R²
Use the model’s score method to measure how well the regression line fits the data.
```python
y_pred = model.predict(X)
r_squared = model.score(X, y)
print("R²:", r_squared)
```

Manual calculation example (should match `model.score` in scikit-learn):

```python
# manual calculation of R^2
y_pred = model.predict(X)
ss_res = ((y - y_pred) ** 2).sum()
ss_tot = ((y - y.mean()) ** 2).sum()
r2_manual = 1 - ss_res / ss_tot
print('R² (manual):', r2_manual)
```

## Visualize the results
Assuming you have time (t) and distance (s) data from a physics experiment, you can visualize the linear regression results as follows:
```python
plt.figure(figsize=(10, 6))
plt.scatter(time, distance, color='blue', label='Experimental Data')
plt.plot(time, y_pred, color='red', label=f'Linear Fit: s = {velocity:.4f}t + {initial_position:.4f}')
plt.xlabel('Time (s)')
plt.ylabel('Distance (m)')
plt.title('Distance vs Time: Linear Regression Analysis')
plt.grid(alpha=0.1)
plt.legend()

# Add text box with results (optional)
textbox_content = (
    f"Equation: s = {velocity:.4f}t + {initial_position:.4f}\n"
    f"Velocity = {velocity:.4f} m/s\n"
    f"Initial pos. = {initial_position:.4f} m\n"
    f"R² = {r_squared:.4f}"
)

plt.text(0.05, 0.95, textbox_content, transform=plt.gca().transAxes,
         fontsize=10, verticalalignment='top', 
         bbox=dict(boxstyle='round', facecolor='white', alpha=0.5))

# Save and show plot
plt.tight_layout()
plt.savefig('physics_linear_regression.png', dpi=300)
plt.show()
```

resulting plot:
<img src="../assets/images/Linear Regression/physics_linear_regression.png" alt="Linear Regression Plot" style="max-width:100%;height:auto;">

## Regression with train/test split
To ensure your linear regression model generalizes well to unseen data, it's important to split your dataset into training and testing sets. This allows you to train the model on one portion of the data and evaluate its performance on another portion that it hasn't seen before. Here's how you can do this using scikit-learn's `train_test_split` function:
```python
from sklearn.model_selection import train_test_split
# Split the data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# Train the model on the training set
model.fit(X_train, y_train)
# Evaluate the model on the testing set
r_squared_test = model.score(X_test, y_test)
print("R² on test set:", r_squared_test)
```

### Visualize train/test results
Show test data (blue) and the fitted regression line (red) to check model performance on unseen data.
```python
plt.scatter(x_test, y_test, color='blue')
plt.plot(x_test, y_pred, color='red')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Scatter Plot of X and Y')
plt.show()
```

For very small datasets, it may be better to train on the full data instead of splitting, since splitting could leave too few samples for training.

## References
- [scikit-learn Linear Regression Documentation](https://scikit-learn.org/stable/user_guide.html)
- [Linear Regression (Python Implementation)](https://www.geeksforgeeks.org/machine-learning/linear-regression-python-implementation/)
- [Kaggle: Learn Pandas](https://www.kaggle.com/learn/pandas)