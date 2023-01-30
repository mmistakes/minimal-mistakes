---
layout: single
title: "SQL Independent Project (1)"
categories: [SQL, Project]
tag: [SQL, Project]
author_profile: false
sidebar:
    nav: "docs"
---

## SQL Independent Project (1): Investigating a Drop in User Engagement

Today, I started an independent project on how data analysis can give some insights about business.
From a website Mode, I tried to solve the case "Investigating a Drop in User Engagement."
The premise is that I am a data analyst working for the business social media platform "Yammer." 

### Problem

In this problem, a chart of weekly active user from 2014 April to 2014 August shows that active users have decreased starting from the week of August 3, and I need to figure out why.

### Given Data
```
Table 1: Users
user_id:	A unique ID per user. Can be joined to user_id in either of the other tables.
created_at:	The time the user was created (first signed up)
state:	The state of the user (active or pending)
activated_at:	The time the user was activated, if they are active
company_id:	The ID of the user's company
language:	The chosen language of the user

Table 2: Events
user_id:	The ID of the user logging the event. Can be joined to user\_id in either of the other tables.
occurred_at:	The time the event occurred.
event_type:	The general event type. There are two values in this dataset: "signup_flow", which refers to anything occuring during the process of a user's authentication, and "engagement", which refers to general product usage after the user has signed up for the first time.
event_name:	The specific action the user took. Possible values include: create_user: User is added to Yammer's database during signup process enter_email: User begins the signup process by entering her email address enter_info: User enters her name and personal information during signup process complete_signup: User completes the entire signup/authentication process home_page: User loads the home page like_message: User likes another user's message login: User logs into Yammer search_autocomplete: User selects a search result from the autocomplete list search_run: User runs a search query and is taken to the search results page search_click_result_X: User clicks search result X on the results page, where X is a number from 1 through 10. send_message: User posts a message view_inbox: User views messages in her inbox
location:	The country from which the event was logged (collected through IP address).
device:	The type of device used to log the event.

Table 3: Email Events
user_id:	The ID of the user to whom the event relates. Can be joined to user_id in either of the other tables.
occurred_at:	The time the event occurred.
action:	The name of the event that occurred. "sent_weekly_digest" means that the user was delivered a digest email showing relevant conversations from the previous day. "email_open" means that the user opened the email. "email_clickthrough" means that the user clicked a link in the email.

Table 4: Rollup Periods
period_id:	This identifies the type of rollup period. The above dashboard uses period 1007, which is rolling 7-day periods.
time_id:	This is the identifier for any given data point — it's what you would put on a chart axis. If time_id is 2014-08-01, that means that is represents the rolling 7-day period leading up to 2014-08-01.
pst_start:	The start time of the period in PST. For 2014-08-01, you'll notice that this is 2014-07-25 — one week prior. Use this to join events to the table.
pst_end:	The start time of the period in PST. For 2014-08-01, the end time is 2014-08-01. You can see how this is used in conjunction with pst_start to join events to this table in the query that produces the above chart.
utc_start:	The same as pst_start, but in UTC time.
pst_start:	The same as pst_end, but in UTC time.
```

### Hypothesis

First, there can be many reasons on why the active users have decreased. 
For example, I can say that there may be a problem in the platform that made the users go inactive, 
the promotion event was not intriguing enough to the users, or there may have been a holiday around that week since Yammer is a platform for business.

From various possible reasons, I first thought there might be a problem in the platform that makes the users go inactive.

And what I did is that I started tracking the amount of weekly active user per device type to see if the platform for any specific device type is causing trouble.

### SQL Code
```SQL
WITH weekly_data AS (
SELECT DATE_TRUNC('week', e.occurred_at) AS week
     , COUNT(DISTINCT e.user_id) AS weekly_active_users
     , COUNT(DISTINCT CASE WHEN e.device IN ('macbook pro','lenovo thinkpad','macbook air','dell inspiron notebook',
          'asus chromebook','dell inspiron desktop','acer aspire notebook','hp pavilion desktop','acer aspire desktop','mac mini')
          THEN e.user_id ELSE NULL END) AS computer
     , COUNT(DISTINCT CASE WHEN e.device IN ('iphone 5','samsung galaxy s4','nexus 5','iphone 5s','iphone 4s','nokia lumia 635',
       'htc one','samsung galaxy note','amazon fire phone') THEN e.user_id ELSE NULL END) AS phone
     , COUNT(DISTINCT CASE WHEN e.device IN ('ipad air','nexus 7','ipad mini','nexus 10','kindle fire','windows surface',
        'samsumg galaxy tablet') THEN e.user_id ELSE NULL END) AS tablet
  FROM tutorial.yammer_events e
 WHERE e.occurred_at BETWEEN '2014-04-01 00:00:00' AND '2014-08-31 23:59:00'
   AND e.event_type = 'engagement'
   AND e.event_name = 'login'
 GROUP BY week
 ORDER BY week
 )
 
SELECT week
     , computer
     , (LEAD(computer) OVER (ORDER BY week)- computer)*100 / LEAD(computer) OVER (ORDER BY week) AS computer_change_rate
     , phone
     , (LEAD(phone) OVER (ORDER BY week)- phone)*100 / LEAD(phone) OVER (ORDER BY week) AS phone_change_rate
     , tablet
     , (LEAD(tablet) OVER (ORDER BY week)- tablet)*100 / LEAD(tablet) OVER (ORDER BY week) AS tablet_change_rate
FROM weekly_data;
```

I queried the data of weekly active users from 2014 April to 2014 August per device type, 
and with that data, I tried to see the growth and decrease rate of weekly active users per device type.

### Result

From this query, I saw that the maximum decrease rate was 44% in tablet, and the rate was drastically beyond the average decrease rate. 
This can mean that there is a high possibility that there is an issue in the Yammer app for tablet that gave an unpleasant user experience. 
It may be good to find out what the issue can be from the app for tablet.


This project made me think that writing SQL is only a way to solidify the hypothesis, and I need to learn more about various ways to approach to these types of problems 
in order to be a better Data Analyst.
