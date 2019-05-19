---
title:  "Sentiment Analysis"
date:   2018-12-3
excerpt: "Predict review ratings from Amazon, IMDB reviews"
tags: [nlp sentiment-analysis]
---

For this project we are going to take a overly simplistic approach to predicting sentiment analysis of online reviews: simply count the words associated with positive and negative reviews as well as number of all capitalized words and number of exclamation marks. I suspect that positive reviews contain more exclamation marks while negative reviews tend to have more all capitalized words. In reality, 1 in every 12.8 positive reviews contain an exclamation mark, while only 1 in every 27 negative reviews contain an exclamation mark. This feature could provide good explanatory power so lets include it!
Furthermore, 1 in every 3 positive reviews is in all caps, while 2 in every 3 negative reviews are in all caps - so add this as well!


``` python
	pos_words = ['great','works','love','best',
	             'good','nice','working','excellent',
	             'good','fine','sturdy']
	neg_words = ["don't","waste","not","worst",
	             "didn't","bad","difficult","poor",
	             "doesn't","return","broke"]
```

<img src="{{site.baseurl}}/images/posts/3-sentiment-correlation-heatmap.png">


Our input features (positive and negative words) do not appear to be correlated. So now we will simply create a Bernouli Naive Bayes classifier.

## Model

``` python
	# Instantiate our model and store it in a new variable.
	bnb = BernoulliNB()

	# Fit our model to the data.
	bnb.fit(data, target)

	# Classify, storing the result in a new variable.
	#y_pred = bnb.predict(data)
	y_pred = cross_val_predict(bnb, data, target)
```
### IMDB

Using the average of cross-validation accuracies will give us a better indicator of overall accuracy, and for Amazon reviews the accuracy is **67.3%**. Now let us see if this model generalizes well to other reviews, in this case IMDB reviews. There are a few words that are present in our Amazon reviews but not in the IMDB words (difficult and sturdy) and there are a few more words that are correlated (which could be an issue for our model, however none of the correlations appear to be greater than 0.5)

This model is roughly **68.4%** accurate, slightly better than on Amazon reviews, but when we use the average of the cross-validation scores the accuracy comes down to **60.02%**.

### Yelp

<img src="{{site.baseurl}}/images/posts/3-sentiment-correlation-heatmap-yelp.png">

Yelp reviews do not contain the words: difficult, doesn't, broke, working or sturdy but do not appear to be linearly correlated. This model is roughly **66.1%** accurate, slightly below the accuracy on Amazon reviews, however the average score when using 5-fold cross validation is **65.7%**. 

## Conclusion

We constructed a Naive Bayes classification model by simply using the top frequently used words that were unique to positive and negative reviews, as well as if a review contains an exclamation mark and if the review is all caps (using Amazon reviews). Here were the accuracy rates for each dataset:

  1. Amazon: 67.3%
  2. IMDB: 60.02%
  3. Yelp: 65.7%

So when we do not use cross-validation, model that we constructed to classify Amazon reviews actually performs better on IMDB reviews, however when using the 5-fold cross-validation average the performance on the various datasets makes more sense.


The source code for this project can be found on [GitHub](https://github.com/mkm29/DataScience/blob/master/thinkful/unit/2/2/challenge/sentiment_analysis.ipynb)