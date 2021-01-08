---
title: "Layout: Post with Sticky Table of Contents"
tags:
  - code
  - syntax highlighting
toc: true
toc_sticky: true
---

### Import Libraries

```Python
import numpy as np
import pandas as pd
import math as m
from IPython.display import HTML
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputRegressor
import pickle
import sklearn
print(sklearn.__version__)

file_path = '/home/ur10pc/Desktop/robot_data9/data/'
joint_data = 'joints_data.csv'
full_data = 'full_data_less_cart.csv'
cart_data = 'cart_data.csv'
all_data = 'all_data.csv'  
```
## D-H Parameters<br>
These are the Denavit hartenberg (D-H) parameters from Universal Robots for the UR10.

```python
UR10_HD_parameters = list([["Joint_0",  0.0,    0.0, 0.1273,   np.pi/2],
                           ["Joint_1", -0.612,  0.0, 0.0,      0.0],
                           ["Joint_2", -0.5723, 0.0, 0.0,      0.0],
                           ["Joint_3",  0.0,    0.0, 0.163941, np.pi/2],
                           ["Joint_4",  0.0,    0.0, 0.1157,  -np.pi/2],
                           ["Joint_5",  0.0,    0.0, 0.0922,   0.0]])
hd_params = pd.DataFrame(UR10_HD_parameters, 
                         columns=["Joint", "a[m]", "theta[rad]", "d[m]", "alpha[rad]"])

df1 = hd_params.style.set_table_styles([dict(selector='th', props=[('text-align', 'center')])])
df1.set_properties(**{'text-align': 'center'}).hide_index()

display(df1)

```
