---
layout: posts
comments: true
author_profile: true
title: Sending multiple POST requests from a spidered page using Scrapy
excerpt: A possible pattern for replicating programmatically AJAX POST requests when scraping webpages using Scrapy
---

Have you ever wanted to scrape the prices of your favourite hiking products website and while doing so realized that the price for a product may change, through an AJAX request, with changes in colour or size? It happened to me while building [smarthiker.co.uk](https://smarthiker.co.uk/), a price comparison website for hiking, climbing and mountaineering products, and replicating that behaviour was quite frustrating. Hopefully, by the end of this post, it won’t be as frustrating for you.


![brown_trousers](/assets/images/post_requests_with_scrapy/trousers_brown.png)


![blue_trousers](/assets/images/post_requests_with_scrapy/trousers_blue.png)


## Basic Scraping with Scrapy

Scrapy is a python library making available an easy to use framework for scraping. One of the main components of the library is the Spider class, which allows you to specify from what URL to start spidering from, how to parse the HTML pages retrieved, and possibly send other requests from them.

I will dare to claim that usually when scraping an e-commerce website the final goal is obtaining one item per product sold and all its related pieces of info. Therefore, the final yield statement, that doesn’t generate further requests, should return all the scraped data for that single product.

Below you can find some python pseudo-code for a spider scraping the hiking e-commerce website [BananaFingers.co.uk](https://www.bananafingers.co.uk/). All the products of interest are available on a [series of brand-specific pages](https://www.bananafingers.co.uk/brands) presenting each a paginated list of products. The code below is a simplified version of the one used in production and it is only meant to make it easier to understand how to spider the website, not to actually spider it. However, though some relatively small changes it will also return the scraped products (the proof is left as an exercise to the interested reader).

{% gist 52504d5a5712e1bd0a91f90b7abc883d %}

So, now you have successfully scraped all the products and you are pretty proud of that. However, when manually checking the results you realize that the price for the same product may change for different sizes or colours and that you have to check the price of each combination of the two individually. When you pick a colour from the pick-list on the webpage an AJAX POST request is sent and the price value is updated on the page. So, now we need to send as many calls as colour-size combinations available and somehow return their results with the original response for the product page.

## Figuring out the POST specifics

Using your preferred browser development tools It should be relatively easy to see the POST request specifics (target URL, payload, etc). As you can see in the picture below we can easily access the payload content and get a feeling of what we will need to change to get the colour-size prices. In this case, we need to specify the field colour, the size, and the product id.

![inspecting_network_calls](/assets/images/post_requests_with_scrapy/dev_tools_post_request.png)

The product-specific POST request payload keys and values (“attributes[field_waist_size]”: 1595, “attributes[field_color]”: 730), can be automatically scraped from the DOM. As you can see in the image below, the key for the colour/size field is available through the “name” attribute in the “select” HTML element. While the value can be accessed using the “value” attribute in the “option” HTML element.

![inspecting_dom_key_value_pairs](/assets/images/post_requests_with_scrapy/dev_tools_dom.png)

Once you have obtained the key/value pairs for all the options available it should be relatively straightforward to create a list of possible combinations and assemble the needed payloads for each combination.

This process should leave us with a list of key-value pairs to be used as payloads for the different post requests we need to send. Now we need to send the requests and store the results somewhere so that they can be returned with the final item.

## Two possible approaches
I personally think that the most convenient way of getting all the colour-size prices for a product is sending the POST requests sequentially, carrying over the prices fetched for each combination, and once the list of combinations is exhausted return the item with the original product page HTML and the list of prices fetched. An alternative could be yielding for each POST request an item with the original HTML and relative price returned, and then merge the items further down the pipeline.

In the first case, we for each POST request will wait for the response (and parse it) before sending the next one. While in the latter case the requests will be all sent roughly at the same time (eg through a loop of the iterable containing the payloads) and each response will be parsed independently from the others whenever returned. The extra waiting time of the first approach will probably make it take longer to spider the whole website, although I haven’t really tested this.

## cb_kwargs (formerly known as meta) to the rescue!
If we want to go down the first route we can use the [cb_kwargs](https://docs.scrapy.org/en/latest/topics/request-response.html#scrapy.http.Request.cb_kwargs) argument in the Request to carry over to the response the list of prices already obtained and the list of payloads we still need to send, as well as the HTML for the original page. The pseudo-code below should give you an idea of a possible pattern to do that.

{% gist 5262acd3a52265b68f7464a5ecfbc67b %}

The parse_product_item is called as soon as the product page is reached by the spider. If this is the first time the method gets called for this page the response_params_for_post list won’t exist and it will be filled with the list of payloads that should be sent for each POST request. While, if the list already exists, the next element will be popped from it and used as payload for the next POST request whose response will be parsed again through the parse_product_item method. This process will keep on going until the list of payloads for the POSTs has been exhausted. At that point, the original HTML body will be passed with all the fetched prices to a custom [ItemLoader](https://docs.scrapy.org/en/latest/topics/loaders.html), so that the values for the item will be extracted.

## Conclusions

To summarise the post, in order to fetch values loaded through AJAX calls triggered by interactive components it should be enough to go through the following steps:
- Understand how the POST/GET requests get built using the product page data
- Create a list of payloads/parameters, containing one element per combination you want to check
- Add one if-else condition in the parsing method so that you can either create the list of payloads/parameters or parse the response coming from the previous POST/GET request
- Add one if-else condition in the parsing method so that you can either move to send the next POST/GET request either yield the Item with the original HTML and the values fetched

This is probably one of the most interesting scraping problems I worked on while building [smarthiker.co.uk](https://smarthiker.co.uk/). I was quite surprised that the same hiking/climbing/mountaineering product may be sold at a different price depending on colour or size. Still, whether this is surprising or not a robust price comparison website should be able to handle these situations as well.