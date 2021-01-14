---
title: "Recording and Storing Performance Metrics"
excerpt: "A look at the various performance metrics and how to impliment them in python."
last_modified_at: 2018-01-03T09:45:06-05:00
header:
  teaser: "assets/images/markup-syntax-highlighting-teaser.jpg"
tags: 
  - Metrics
  - Gaussian Distribution 
  - Probability Distribution Function
toc: true
---

 `/_sass/syntax.scss`.
 ``hello world``.

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
<br>
![Unsplash image 10]({{ site.url }}{{ site.baseurl }}/assets/images/metric_post/values.png){: .full}
<br>

## Gaussian Distribution <br>

This code snippet produces a Gaussian distribution plot of the above metrics; MAE, RMSD and COV.

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

![Unsplash image 10]({{ site.url }}{{ site.baseurl }}/assets/images/metric_post/gaus.png){: .full}

## Probability Distribution Function <br>

This snippet produces the probibility distribution plots for the MAE, RMSD and COV.

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
![Unsplash image 10]({{ site.url }}{{ site.baseurl }}/assets/images/metric_post/pdf_plot.png){: .full}

{% highlight scss %}
.highlight {
  margin: 0;
  padding: 1em;
  font-family: $monospace;
  font-size: $type-size-7;
  line-height: 1.8;
}
{% endhighlight %}

```html
{% raw %}<nav class="pagination" role="navigation">
  {% if page.previous %}
    <a href="{{ site.url }}{{ page.previous.url }}" class="btn" title="{{ page.previous.title }}">Previous article</a>
  {% endif %}
  {% if page.next %}
    <a href="{{ site.url }}{{ page.next.url }}" class="btn" title="{{ page.next.title }}">Next article</a>
  {% endif %}
</nav><!-- /.pagination -->{% endraw %}
```

```ruby
module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      self.data['tag'] = tag
      tag_title_prefix = site.config['tag_title_prefix'] || 'Tagged: '
      tag_title_suffix = site.config['tag_title_suffix'] || '&#8211;'
      self.data['title'] = "#{tag_title_prefix}#{tag}"
      self.data['description'] = "An archive of posts tagged #{tag}."
    end
  end
end
```
