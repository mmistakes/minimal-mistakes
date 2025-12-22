---
layout: single
title: "jupyter notebook 변환하기!"
categories: coding
tag: [python, blog, jekyll]
toc: true
author_profile: false
---

```python
import pandas as pd

df_result = pd.DataFrame({
    "sample": ["S1","S2","S3","S4","S5","S6"],
    "titer":  [2.1, 2.5, None, 2.9, 2.4, None]
})

```

```python
df_cond = pd.DataFrame({
    "sample": ["S1","S2","S3","S4","S5","S6"],
    "temp":   [36.5, 36.5, 37.0, 37.0, 36.5, 37.0],
    "feed":   ["A",   "B",   "A",  "B",  "A",  "A"]
})

```

```python
df_merged = pd.merge(df_result, df_cond, how = 'left', on='sample')
display(df_merged)
df_merged['titer']=df_merged.groupby('temp')['titer'].transform(lambda x:x.fillna(x.mean()))
display(df_merged)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sample</th>
      <th>titer</th>
      <th>temp</th>
      <th>feed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>S1</td>
      <td>2.1</td>
      <td>36.5</td>
      <td>A</td>
    </tr>
    <tr>
      <th>1</th>
      <td>S2</td>
      <td>2.5</td>
      <td>36.5</td>
      <td>B</td>
    </tr>
    <tr>
      <th>2</th>
      <td>S3</td>
      <td>NaN</td>
      <td>37.0</td>
      <td>A</td>
    </tr>
    <tr>
      <th>3</th>
      <td>S4</td>
      <td>2.9</td>
      <td>37.0</td>
      <td>B</td>
    </tr>
    <tr>
      <th>4</th>
      <td>S5</td>
      <td>2.4</td>
      <td>36.5</td>
      <td>A</td>
    </tr>
    <tr>
      <th>5</th>
      <td>S6</td>
      <td>NaN</td>
      <td>37.0</td>
      <td>A</td>
    </tr>
  </tbody>
</table>
</div>

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sample</th>
      <th>titer</th>
      <th>temp</th>
      <th>feed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>S1</td>
      <td>2.1</td>
      <td>36.5</td>
      <td>A</td>
    </tr>
    <tr>
      <th>1</th>
      <td>S2</td>
      <td>2.5</td>
      <td>36.5</td>
      <td>B</td>
    </tr>
    <tr>
      <th>2</th>
      <td>S3</td>
      <td>2.9</td>
      <td>37.0</td>
      <td>A</td>
    </tr>
    <tr>
      <th>3</th>
      <td>S4</td>
      <td>2.9</td>
      <td>37.0</td>
      <td>B</td>
    </tr>
    <tr>
      <th>4</th>
      <td>S5</td>
      <td>2.4</td>
      <td>36.5</td>
      <td>A</td>
    </tr>
    <tr>
      <th>5</th>
      <td>S6</td>
      <td>2.9</td>
      <td>37.0</td>
      <td>A</td>
    </tr>
  </tbody>
</table>
</div>

```python
df_feed_mean = df_merged.groupby('feed')[['titer']].mean()
df_feed_mean.columns = ['mean_titer']
df_feed_mean = df_feed_mean.reset_index()
display(df_feed_mean)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>feed</th>
      <th>mean_titer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>2.575</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>2.700</td>
    </tr>
  </tbody>
</table>
</div>

```python
df_feed_summary = df_feed_mean.copy()
df_feed_summary['above_global_mean'] = df_feed_summary['mean_titer']>df_feed_summary['mean_titer'].mean()
display(df_feed_summary)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>feed</th>
      <th>mean_titer</th>
      <th>above_global_mean</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>2.575</td>
      <td>False</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>2.700</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>

```python

```

```python
import matplotlib.pyplot as plt
colors = df_feed_summary['above_global_mean'].map({True: 'blue', False: 'gray'})
plt.figure(figsize=(6,4))
plt.xlabel('Feed')
plt.ylabel('Mean Titer (g/L)')
print(plt.xlim())
plt.axhline(df_feed_summary['mean_titer'].mean(), plt.xlim()[0], plt.xlim()[1],  color='lightgray', linestyle='--', linewidth=2)
plt.bar(df_feed_summary['feed'],df_feed_summary['mean_titer'], color = colors, label = colors)
plt.title('Mean Titer by Feed')
plt.legend()
plt.grid(False)
plt.tight_layout()
```

    (np.float64(0.0), np.float64(1.0))

![png](output_6_1.png)

```python
df_feed_summary["above_global_mean"].map({True: "blue", False: "gray"})
```

    0    gray
    1    blue
    Name: above_global_mean, dtype: object

```python
df_summary["above_overall_mean"].map({True: "blue", False: "gray"})
```

```python
df_feed_summary['above_global_mean'].map({'True': 'blue', 'False': 'gray'})
```

    0    NaN
    1    NaN
    Name: above_global_mean, dtype: object

```python
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.patches import Patch

df_merged = pd.merge(df_result, df_cond, how="left", on="sample")
df_merged["titer"] = df_merged.groupby("temp")["titer"].transform(lambda x: x.fillna(x.mean()))

df_feed_mean = (
    df_merged.groupby("feed", as_index=False)["titer"]
             .mean()
             .rename(columns={"titer": "mean_titer"})
)

df_feed_summary = df_feed_mean.copy()
global_mean = df_feed_summary["mean_titer"].mean()
df_feed_summary["above_global_mean"] = df_feed_summary["mean_titer"] >= global_mean

# feed order fixed (A, B)
df_feed_summary = df_feed_summary.set_index("feed").loc[["A", "B"]].reset_index()

colors = df_feed_summary["above_global_mean"].map({True: "blue", False: "gray"})

plt.figure(figsize=(6, 4))
plt.bar(df_feed_summary["feed"], df_feed_summary["mean_titer"], color=colors)
plt.axhline(global_mean, color="lightgray", linestyle="--", linewidth=2, label="Global mean")

plt.title("Mean Titer by Feed")
plt.xlabel("Feed")
plt.ylabel("Mean Titer (g/L)")

# legend: ensure 2+ items
legend_handles = [
    Patch(label="above_global_mean=True", facecolor="blue"),
    Patch(label="above_global_mean=False", facecolor="gray"),
]
plt.legend(handles=legend_handles + [plt.Line2D([0], [0], color="lightgray", linestyle="--", linewidth=2, label="Global mean")])

plt.tight_layout()
plt.show()
```

![png](output_10_0.png)

```python

```
