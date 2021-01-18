---
title: "Data Engineering of Model Performance Metrics"
excerpt: "A look at the various performance metrics for robotic DLO manipulation and how to impliment them in python."
last_modified_at: 2018-01-03T09:45:06-05:00
header:
  teaser: "assets/images/markup-syntax-highlighting-teaser.jpg"
tags: 
  - Metrics
  - Gaussian Distribution 
  - Probability Distribution Function
toc: true
toc_sticky: true
---

<p style='text-align: justify;'>
This code is taken from my main LSTM model code that predicts manipulation forces on deformable linear objects (DLO) for robotic assembly. It shows the metrics used for model evaluation such as training and testing loss per epoch, an error plot which itself shows the mean absolute error (MAE), standard deviation (std-dev) and the max-error-value (max value) for each epoch. <br>
Using these calculated metrics, Gaussian distributions and probability density plots are drawn to help compare different models. </p>

## Loss<br>
The picture below shows an example of the loss plot generated after each epoch during training. Notice also that the current minimum values together with the epoch in which they occurred are marked for easy reference. <br>
<br>
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/metrics_post/loss.jpg" alt="loss pic" class="full"><br>

## Error Plot<br>
This novel plot created after training, graphically shows the MAE, std-dev and max-value for each epoch, 
plus the minimum values with the corresponding epochs. <br>
<br>
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/metrics_post/error.jpg" alt="error pic" class="full"><br>


## Data Metrics Record<br>
<p style='text-align: justify;'>The 'stats' function below displays the MAE, root-mean-squared-deviation (RMSD) and coefficient of variance (cov) for each trajectory in the testing dataset. <br> The MAE of each epoch in the error plot is actually the mean of means of each trajectory, also called the grand mean. <br>
A grand mean, std-dev and max value is calculated for MAE, RMSD and cov per epoch. <br> </p>

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/metrics_post/values.jpg" alt="Values Table" class="full">

<br>
<br>

```python
def stats(stats_list2, model_name):
    
 
    ## Get the mean of MAE, RMSD and cov.
    mean_list = {
                'MAE' :float("{:.3f}".format(np.mean(stats_list2['MAE']))),
                'RMSD':float("{:.3f}".format(np.mean(stats_list2['RMSD']))),
                'cov' :float("{:.3f}".format(np.mean(stats_list2['cov'])))
    }
    ## Get the std-dev of MAE, RMSD and cov.
    std_dev = {
                'MAE' :float("{:.3f}".format(np.std(stats_list2['MAE']))),
                'RMSD':float("{:.3f}".format(np.std(stats_list2['RMSD']))),
                'cov' :float("{:.3f}".format(np.std(stats_list2['cov'])))
    }
    ## Get the max value of MAE, RMSD and cov.
    max_list = {
                'MAE' :float(stats_list2['MAE'].max()),
                'RMSD':float(stats_list2['RMSD'].max()),
                'cov' :float(stats_list2['cov'].max())
    }
    ## append above dicts to stats_list2.
    stats_list2 = stats_list2.append(mean_list, ignore_index=True).fillna('Grand Mean')
    stats_list2 = stats_list2.append(std_dev, ignore_index=True).fillna('Standard Dev')
    stats_list2 = stats_list2.append(max_list, ignore_index=True).fillna('Max Value')

    #display(stats_list2)
    path = get_path()
    
    ## Create new directory in perent directory
    path = path + f"{model_name}/"
    model_name = model_name

    ## save stats_list as .csv in same directory as trajectory plots.
    stats_list2.to_csv(path + f"lstm_model_metrics_{model_name}.csv", index=False)
    return stats_list2
```

<br><br>

## Gaussian Distribution <br>
This code snippet produces a Gaussian distribution plot of the above metrics; MAE, RMSD and COV.<br>

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/metrics_post/gauss.jpg" alt="Gauss Plot" class="full">

<br><br>

```python
def gauss_plot(stats_list2, name, error_type, num):
    
    model_name = name
    model_dir = model_directory()
    path = get_path()
    path = path + f"{model_name}/"

    error = error_type ## Either; MAE, RMSD or cov.
    pdf = PdfPages(path + f"gauss_pic_{error}.pdf")
    fig = plt.figure()
    
    # define constants
    mu = np.mean(stats_list2.iloc[:-3,num]) 
    sigma = np.sqrt(np.var(stats_list2.iloc[:-3,num]))
    x1 = np.min(stats_list2.iloc[:-3,num])
    x2 = np.max(stats_list2.iloc[:-3,num])
    

    # calculate the z-transform
    z1 = ( x1 - mu ) / sigma
    z2 = ( x2 - mu ) / sigma

    x = np.arange(z1, z2, 0.001) # range of x in spec
    x_all = np.arange(-10, 10, 0.001) # entire range of x, both in and out of spec
    # mean = 0, stddev = 1, since Z-transform was calculated
    y = norm.pdf(x,0,1);
    y2 = norm.pdf(x_all,0,1);

    # build the plot
    fig, ax = plt.subplots(figsize=(9,6));
    #plt.style.use('fivethirtyeight');
    ax.plot(x_all,y2);

    ax.fill_between(x,y,0, alpha=0.3, color='b');
    ax.fill_between(x_all,y2,0, alpha=0.1);
    ax.set_xlim([-4,4]);
    ax.set_xlabel('# of Standard Deviations Outside the Mean');
    ax.set_yticklabels([]);
    ax.set_title(f'{model_name} {error} Std Dev');

    plt.savefig('normal_curve.png', dpi=72, bbox_inches='tight');
    plt.grid(True);
    plt.tight_layout();
    #plt.show()
    # save the current figure
    pdf.savefig(fig);
    ## destroy the current figure
    plt.clf()

    # close the object
    pdf.close()
```
<br><br>

## Probability Density Function (PDF) <br>
This snippet produces the probability distribution plots for the MAE, RMSD and COV.<br>
The example shown below is of the MAE.
<br>
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/metrics_post/pdf_plot.jpg" alt="PDF Plot" class="full">

<br><br>

```python
## Get a PDF of the MAE, RMSD and cov.
def prob_dist(stats_list2, name, error_type, num):    
    model_name = name
    model_dir = model_directory()
    path = get_path()
    path = path + f"{model_name}/"


    error = error_type
    pdf = PdfPages(path + f"prob_dist_pic_{error}.pdf")
    fig = plt.figure()

    import seaborn as sns
    sns.distplot(stats_list2.iloc[:-3,num], color="darkslategrey");
    plt.xlabel("Force [newtons]", labelpad=14);
    plt.ylabel("Probability of Occurence", labelpad=14);
    plt.title(f"Probability Distribution of {error}", fontsize=20);
    plt.grid(True);
    plt.tight_layout();

    #plt.show()
    # save the current figure
    pdf.savefig(fig);
    # destroy the current figure
    plt.clf()
    plt.close('all') ## added this due to runtime warning, more than 20 figs open
    # close the object
    pdf.close()
```
<br><br>



## Control Function<br>
This test_runner function invokes all the code above. It is itself called during the training phase with the name of the current model and epoch.<br>
It starts by calling the 'stats' function which gets the MAE, RMSD and cov for each point of the trajectory and the mean of means for each metric. <br>

```python
def test_runner(name):   
    stats_df = tests(name) # Run tests on testing data and save generated plots to Google Drive
    stats(stats_df, name) # Record stats and save to Google Drive
    for i in range(1,4): # 1 to 3 = the colunms in the stats_list DataFrame
        if i ==1:
            error_type = 'MAE' # mean absolur error
        elif i == 2:
            error_type = 'RMSE' # root mean squared error
        elif i == 3:
            error_type = 'cov' # coefficient of variance

        prob_dist(stats_df, name, error_type, i) # Gen prob_dist and save to GD
        
        gauss_plot(stats_df, name, error_type, i) # Gen Gauss plots and save to GD
    print("Done")
```
<br><br>
## Organisation With Google Drive<br>
Here you can also see how the results of the metrics are saved in a logical and easy to browse fashion in Google drive, 
along with all the model versions, i.e. weight matrix for each epoch which makes it easy to reload the model at any point during training.<br>

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/metrics_post/drivepic.jpg" alt="Drive pic" class="full">
<br><br>

