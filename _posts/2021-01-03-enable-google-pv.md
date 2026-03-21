---
layout: post
title: Enable Google Page Views
author: Dinesh Prasanth Moluguwan Krishnamoorthy
date: 2021-01-03 18:32:00 -0500
categories: 程式開發
tags: [google analytics, pageviews, 教學]
---


This post is to enable Page Views on the [**Chirpy**][chirpy-homepage] theme based blog that you just built. This requires technical knowledge and it's recommended to keep the `google_analytics.pv` disabled unless you have a good reason. If you website has low traffic, the page views count would discourage you to write more blogs. With that said, let's start with the setup.

## Set up Google Analytics

### Create GA account and property

First, you need to setup your account on Google analytics. While your create your account, you must create your first **Property** as well.

1. Head to <https://analytics.google.com/> and click on **Start Measuring**
2. Enter your desired *Account Name* and choose the desired checkboxes
3. Enter your desired *Property Name*. This is the name of the tracker project that appears on your Google Analytics dashboard
4. Enter the required information *About your business*
5. Hit *Create* and accept any license popup to setup your Google Analytics account and create your property

### Create Data Stream

With your property created, you now need to set up Data Stream to track your blog traffic. After you signup, the prompt should automatically take you to creating your first **Data Stream**. If not, follow these steps:

1. Go to **Admin** on the left column
2. Select the desired property from the drop down on the second column
3. Click on **Data Streams**
4. Add a stream and click on **Web**
5. Enter your blog's URL

It should look like this:

![google-analytics-data-stream](https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/posts/20210103/01-google-analytics-data-stream.png)

Now, click on the new data stream and grab the **Measurement ID**. It should look something like `G-V6XXXXXXXX`. Copy this to your `_config.yml` file

```yaml
google_analytics:
  id: 'G-V6XXXXXXX'          # Fill with your Google Analytics ID
  pv:
    # The Google Analytics pageviews switch.
    enabled: false
    # the next options only valid when `google_analytics.pv` is enabled.
    proxy_url: ''
    proxy_endpoint: ''
    cache: false  # pv data local cache, good for the users from GFW area.
```

When you push these changes to your blog, you should start seeing the traffic on your Google Analytics. Play around with Google Analytics dashboard to get familiar with the options available as it takes like 5 mins to pickup your changes. You should now be able to monitor your traffic in realtime.

![google-analytics-realtime](https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/posts/20210103/02-google-analytics-realtime.png)

## Setup Page Views

There is a detailed [tutorial](https://developers.google.com/analytics/solutions/google-analytics-super-proxy) available to set up Google Analytics superProxy. But, if you are interested to just quickly get your Chirpy-based blog display page views, follow along. These steps were tested on a Linux machine. If you are running Windows, you can use Git bash terminal to run Unix-like commands.

### Setup Google App Engine

1. Visit <https://console.cloud.google.com/appengine>

2. Click on **Create Application**

3. Click on **Create Project**

4. Enter the name and choose the data center close to you

5. Select **Python** language and **Standard** environment

6. Enable billing account. Yeah, you have to link your credit card. But, you won't be billed unless you exceed your free quota. For a simple blog, free quota is more than sufficient.

7. Go to your App Engine dashboard on your browser and select **API & Services** from the left navigation menu

8. Click on **Enable APIs and Services** button on the top

9. Enable the following APIs: *Google Analytics API*

10. On the left, Click on *OAuth Consent Screen* and accept **Configure Consent Screen**. Select **External** since your blog is probably hosted for the public. Click on **Publish** under *Publishing Status*

11. Click on **Credentials** on the left and create a new **OAuth Client IDs** credential. Make sure to add a entry under `Authorized redirect URIs` that matches: `https://<project-id>.<region>.r.appspot.com/admin/auth`

12. Note down the **Your Client ID** and **Your Client Secret**. You'll need this in the next section.

13. Download and install the cloud SDK for your platform: <https://cloud.google.com/sdk/docs/quickstart>

14. Run the following commands:

    ```console
    [root@bc96abf71ef8 /]# gcloud init

    ~snip~

    Go to the following link in your browser:

        https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=XYZ.apps.googleusercontent.com&redirect_uri=ABCDEFG

    Enter verification code: <VERIFICATION CODE THAT YOU GET AFTER YOU VISIT AND AUTHENTICATE FROM THE ABOVE LINK>

    You are logged in as: [blah_blah@gmail.com].

    Pick cloud project to use:
    [1] chirpy-test-300716
    [2] Create a new project
    Please enter numeric choice or text value (must exactly match list
    item): 1


    [root@bc96abf71ef8 /]# gcloud info
    # Your selected project info should be displayed here
    ```

### Setup Google Analytics superProxy

1. Clone the **Google Analytics superProxy** project on Github: <https://github.com/googleanalytics/google-analytics-super-proxy> to your local.

2. Remove the first 2 lines in the [`src/app.yaml`](https://github.com/googleanalytics/google-analytics-super-proxy/blob/master/src/app.yaml#L1-L2) file:
	```diff
- application: your-project-id
- version: 1
	```

3. In `src/config.py`, add the `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` that you gathered from you App Engine Dashboard.

4. Enter any random key for `XSRF_KEY`, your `config.py` should look similar to this

    ```python
    #!/usr/bin/python2.7

    __author__ = 'pete.frisella@gmail.com (Pete Frisella)'

    # OAuth 2.0 Client Settings
    AUTH_CONFIG = {
      'OAUTH_CLIENT_ID': 'YOUR_CLIENT_ID',
      'OAUTH_CLIENT_SECRET': 'YOUR_CLIENT_SECRET',
      'OAUTH_REDIRECT_URI': '%s%s' % (
        'https://chirpy-test-XXXXXX.ue.r.appspot.com',
        '/admin/auth'
      )
    }

    # XSRF Settings
    XSRF_KEY = 'OnceUponATimeThereLivedALegend'
    ```
**Tip:** You can configure a custom domain instead of `https://PROJECT_ID.REGION_ID.r.appspot.com`. But, for the sake of keeping it simple, we will be using the Google provided default URL.

5. From inside the src/ directory, deploy the app

    ```console
    [root@bc96abf71ef8 src]# gcloud app deploy
    Services to deploy:

    descriptor:      [/tmp/google-analytics-super-proxy/src/app.yaml]
    source:          [/tmp/google-analytics-super-proxy/src]
    target project:  [chirpy-test-XXXX]
    target service:  [default]
    target version:  [VESRION_NUM]
    target url:      [https://chirpy-test-XXXX.ue.r.appspot.com]


    Do you want to continue (Y/n)? Y

    Beginning deployment of service [default]...
    ╔════════════════════════════════════════════════════════════╗
    ╠═ Uploading 1 file to Google Cloud Storage                 ═╣
    ╚════════════════════════════════════════════════════════════╝
    File upload done.
    Updating service [default]...done.
    Setting traffic split for service [default]...done.
    Deployed service [default] to [https://chirpy-test-XXXX.ue.r.appspot.com]

    You can stream logs from the command line by running:
    $ gcloud app logs tail -s default

    To view your application in the web browser run:
    $ gcloud app browse
    ```

6. Visit the deployed service. Add a `/admin` to the end of the URL.

7. Click on **Authorize Users** and make sure to add yourself as a managed user.

8. If you get any errors, please google it. The errors are self-explanatory and should be easy to fix.

If everything went good, you'll get this screen:

![superProxy-deployed](https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/posts/20210103/03-superProxy-deployed.png)

### Create Google Analytics Query

Head to `https://PROJECT_ID.REGION_ID.r.appspot.com/admin` and create a query after verifying the account. **GA Core Reporting API** query request can be created in [Query Explorer](https://ga-dev-tools.appspot.com/query-explorer/).

The query parameters are as follows:

- `start-date` - fill in the first day of blog posting

- `end-date` - fill in `today` (this is a parameter supported by GA Report, which means that it will always end according to the current query date)

- `metrics` - select `ga:pageviews`

- `dimensions` - select `ga:pagePath`

In order to reduce the returned results and reduce the network bandwidth, we add custom filtering rules [^ga-filters]:

- `filters` - fill in `ga:pagePath=~^/posts/.*/$;ga:pagePath!@=`

  Among them, `;` means using _logical AND_ to concatenate two rules, `!@=` means excluding `=`.

After <kbd>Run Query</kbd>, copy the generated contents of **API Query URI** at the bottom of the page, and fill in the **Encoded URI for the query** of SuperProxy on GAE.

After the query is saved on GAE, a **Public Endpoint** (public access address) will be generated, and we will get the query result in JSON format when accessing it. Finally, click <kbd>Enable Endpoint</kbd> in **Public Request Endpoint** to make the query effective, and click <kbd>Start Scheduling</kbd> in **Scheduling** to start the scheduled task.

![superproxy-query](https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/posts/20210103/04-superproxy-query.png)


## Configure Chirpy to Display Page View

Once all the hard part is done, it is very easy to enable the Page View on Chirpy theme. Your superProxy dashboard should look something like below and you can grab the required values.

![superproxy-dashboard](https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/posts/20210103/05-superproxy-dashboard.png)

Update the `_config.yml` file of [**Chirpy**][chirpy-homepage] project with the values from your dashboard, to look similar to the following:

```yaml
google_analytics:
  id: 'G-XXXXXXXXXX'   # Fill with your Google Analytics ID
  pv:
    # The Google Analytics pageviews switch.
    enabled: true
    # the next options only valid when `google_analytics.pv` is enabled.
    proxy_url: 'https://PROJECT_ID.REGION_ID.r.appspot.com'
    proxy_endpoint: 'https://PROJECT_ID.REGION_ID.r.appspot.com/query?id=<ID FROM SUPER PROXY>'
    cache: false      # pv data local cache, good for the users from GFW area.
```

Now, you should see the Page View enabled on your blog.

## Reference

[^ga-filters]: [Google Analytics Core Reporting API: Filters](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#filters)

[chirpy-homepage]: https://github.com/cotes2020/jekyll-theme-chirpy/
