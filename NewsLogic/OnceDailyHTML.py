from newspaper import Article
from newspaper import Config
from newspaper import ArticleException
import requests
import praw
import datetime
import time
# need to make this more specific and separate from overall Syntropy
# this project is more personal and proof of concept - will be added into overall Syntropy News, not starting point


print("start @ "+str(datetime.datetime.now()))
user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
config = Config()
config.browser_user_agent = user_agent

# Initialize reddit API
reddit = praw.Reddit(client_id='jMj4VtrzNreMNw', client_secret='EdxaXv6uH5VJ9Y7zdWugfOsvWyU', user_agent='browser:com.example.myredditapp:v1.2.3.4 (by /u/syntropian)', username='syntropian', password='oK5FNBPEU56w')

htmlBegin= """
<html>
<head style="font-family:raleway;"><font size = "10"><center>Syntropy News</center></font></head>
<body><font size = "5">Hello Brendan and welcome to your morning briefing.<br>
<i>Here is what you need to know today:</i></font><br>
</body><br>
<body>
"""
htmlEnd = """
</body>
</html>"""

NewsSubreddits = ["news", "worldnews"]
BodyBit = []
for subreddit in range(len(NewsSubreddits)):
	SubTitle = (NewsSubreddits[subreddit].upper())
	BodyBit += SubTitle+"\n"
	for submission in reddit.subreddit(NewsSubreddits[subreddit]).top(time_filter = "day", limit=5):
		htmlNews = """    <center><img src = %s alt = 'Article Image'"""+""" width="500"</img></center>
		<p><font size = "3"><b><a href=%s>%s</a></b></p>
		<p><font size = "3">%s</p><br>"""
		articleFun = Article(submission.url)
		try:
			print("Downloading @ "+str(datetime.datetime.now()))
			articleFun.download()
			print("Parsing @ "+str(datetime.datetime.now()))
			articleFun.parse()
		except ArticleException:
			print("Exception @ "+str(datetime.datetime.now()))
			continue
			#add message that there was an error
		articleFun.nlp()
		# add news summary of piece
		#~ print(articleFun.summary+"\n")
		htmlBodyPiece = htmlNews % (articleFun.top_image, articleFun.url, articleFun.title, articleFun.summary)
		BodyBit.append(htmlBodyPiece)

htmlBody = ''.join(BodyBit)

htmlBegin+htmlBody+htmlEnd = htmlWhole
# Make htmlWhole into html file
