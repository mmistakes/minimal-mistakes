import json
import os
import sys
from datetime import datetime
from pathlib import Path
import tweepy
from linkedin_api import Linkedin
import praw
import requests
import telegram

# Load environment variables
TWITTER_API_KEY = os.getenv("TWITTER_API_KEY")
TWITTER_API_SECRET = os.getenv("TWITTER_API_SECRET")
TWITTER_ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
TWITTER_ACCESS_SECRET = os.getenv("TWITTER_ACCESS_SECRET")

LINKEDIN_USERNAME = os.getenv("LINKEDIN_USERNAME")
LINKEDIN_PASSWORD = os.getenv("LINKEDIN_PASSWORD")

REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
REDDIT_USERNAME = os.getenv("REDDIT_USERNAME")
REDDIT_PASSWORD = os.getenv("REDDIT_PASSWORD")

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def load_published_posts():
    try:
        with open('published_posts.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"published_posts": []}

def save_published_posts(data):
    with open('published_posts.json', 'w') as f:
        json.dump(data, f, indent=4)

def post_to_twitter(content):
    if not all([TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET]):
        print("Twitter credentials not found. Skipping Twitter post.")
        return False
    
    try:
        auth = tweepy.OAuthHandler(TWITTER_API_KEY, TWITTER_API_SECRET)
        auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET)
        api = tweepy.API(auth)
        api.update_status(content)
        return True
    except Exception as e:
        print(f"Error posting to Twitter: {e}")
        return False

def post_to_linkedin(content):
    if not all([LINKEDIN_USERNAME, LINKEDIN_PASSWORD]):
        print("LinkedIn credentials not found. Skipping LinkedIn post.")
        return False
    
    try:
        linkedin = Linkedin(LINKEDIN_USERNAME, LINKEDIN_PASSWORD)
        linkedin.post_share(content)
        return True
    except Exception as e:
        print(f"Error posting to LinkedIn: {e}")
        return False

def post_to_reddit(content):
    if not all([REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD]):
        print("Reddit credentials not found. Skipping Reddit post.")
        return False
    
    try:
        reddit = praw.Reddit(
            client_id=REDDIT_CLIENT_ID,
            client_secret=REDDIT_CLIENT_SECRET,
            username=REDDIT_USERNAME,
            password=REDDIT_PASSWORD,
            user_agent="BlogPostBot/1.0"
        )
        # You'll need to specify the subreddit
        subreddit = reddit.subreddit("your_subreddit")
        subreddit.submit("New Blog Post", selftext=content)
        return True
    except Exception as e:
        print(f"Error posting to Reddit: {e}")
        return False

def post_to_telegram(content):
    if not all([TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID]):
        print("Telegram credentials not found. Skipping Telegram post.")
        return False
    
    try:
        bot = telegram.Bot(token=TELEGRAM_BOT_TOKEN)
        bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=content)
        return True
    except Exception as e:
        print(f"Error posting to Telegram: {e}")
        return False

def main():
    # Get the post filename from command line arguments
    if len(sys.argv) < 2:
        print("Please provide the post filename")
        sys.exit(1)
    
    post_filename = sys.argv[1]
    published_posts = load_published_posts()
    
    # Check if post has already been published
    if post_filename in published_posts["published_posts"]:
        print(f"Post {post_filename} has already been published. Skipping.")
        sys.exit(0)
    
    # Read the social media summaries
    base_name = Path(post_filename).stem
    social_media_dir = Path("social_media_posts")
    
    # Post to each platform
    platforms = {
        "x": post_to_twitter,
        "linkedin": post_to_linkedin,
        "reddit": post_to_reddit,
        "telegram": post_to_telegram
    }
    
    success = True
    for platform, post_func in platforms.items():
        summary_file = social_media_dir / f"{base_name}_{platform}.txt"
        if summary_file.exists():
            with open(summary_file, 'r') as f:
                content = f.read().strip()
                if not post_func(content):
                    success = False
    
    # Update published_posts.json if all posts were successful
    if success:
        published_posts["published_posts"].append(post_filename)
        save_published_posts(published_posts)
        print("Successfully published to all platforms and updated tracking file.")
    else:
        print("Some posts failed. Not updating tracking file.")

if __name__ == "__main__":
    main() 