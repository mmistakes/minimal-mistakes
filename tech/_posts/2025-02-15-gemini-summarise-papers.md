---
title: Building myself a tool to summarise AI papers with Gemini
tags:
  - python
  - GenAI
  - Gemini
  - science
  - llm
categories: tech
excerpt: And little learnings along the way.
---

One of the problems I have is lack of time and energy to read all papers that I'd like to read, especially in the area of AI. There is just ...a lot of material. Of course the most significant papers will naturally find their way to me by virtue of word of mouth, socials, media coverage, newsletters etc, but many other get lost if you don't make a proactive effort to look for them.

So I thought that it may be a great idea to go a bit meta (not the company, the original meaning) and use GenAI to summarise papers which will mostly be ...about GenAI. Summarising text is one of the most popular use cases for LLMs, and a growing area of research deals with their effectiveness on this, see this [relatively recent review paper](https://arxiv.org/abs/2406.11289).

Wanting to also try out the Gemini LLM family, I've decided to build a lil' tool - which for now is nothing more than a [Colab notebook](https://colab.research.google.com/drive/1vSsKggNon9HwiY4qx-45H3JySsz7oonF?usp=sharing) (see notes below) - that parses the [AI "recent papers" page from the ArXiv](https://arxiv.org/list/cs.AI/recent) and spits out a digestible summary of all the papers published on the latest available day.

The ArXiv was built in the early 1990s by the physics community as a way to share preprints and gather feedback before submitting them for publication to a journal. It has since grown to host a plethora of disciplines and sub-disciplines and is the main general reference for scientific "papers" - the quotes are because what's there are preprints, largely material that's not been peer-reviewed, so always to take with a pinch of salt.
The ArXiv is however undoubtedly a great manifestation of the power of open science/access/source, and allows lots of people, not just scientists but software engineers, practitioners and just about anyone to access knowledge as it comes. It doesn't have everything but it has a lot.

For AI in particular, I have the feeling that it is *the* main reference. 
Thankfully each discipline is organised in classes and subclasss which each have a "recent entries" page with listings per day, from Monday to Friday. I don't know for a fact but wouldn't be surprised to learn that the AI subclass (subclass of Computer Science) is the most popular these days - the last few days have exceeded the 150 papers/day. Physics as a whole class has seen 49 entries on Feb 14.

## Procedure

My Colab notebook is [here](https://colab.research.google.com/drive/1vSsKggNon9HwiY4qx-45H3JySsz7oonF?usp=sharing), versioned on Github [here](https://github.com/martinapugliese/summarise-sci-literature/tree/main). My idea for now is to run this daily, check out what it comes up with and maybe later on move it to an automated tool (it can be something as simple as a cron job or scheduled on the cloud, maybe allowing it to send myself daily emails with the summaries).

The whole idea is to let Gemini "read" papers published to the ArXiv in the latest available day and summarise them in a succint, clear and to-the-point way. Of course, there is no substitute for reading a paper yourself, understanding and appreciating it in detail. Further, LLMs can hallucinate, fail to point out the main points or just do a bad job, I'm aware. But still, caveats considered this is very valuable to me because I wouldn't be able to ingest all the daily info myself - it's been a pain point for a while.

I've used this prompt, which seemed to work well after a few anecdotal tests:

```py
sys_instruct = """
                You are an experienced reader of academic literature and
                an expert in distilling important findings in a way that is understandable and clear.
               """

prompt = """This is a paper on AI. 
            Summarise its results in 3 lines, avoiding obscure jargon and going to the point.
            If there are valuable examples that aid understanding, report them in a nutshell.
            """
```

The paper will be given as a file directly, without the need to first extract its text - this is easily doable via the Gemini API.

You may have thought "why don't you just read the abstracts that the ArXiv aggregation page already presents"? Well, often they're not enough, they don't necessarily present a clear idea devoid of jargon that you'd only learn when reading the whole thing. Also, I am very keen on getting the example(s) in the summary, they significantly speed up my understanding. But I can test prompts to check how much quick info that's not just the abstract I can get - the more I run this the more I'll see.

I initially thought of using an LLM to parse the "recent papers" page but decided against it as it felt like a waste: it is easy enough to extract info with a bit of good old `requests` and `BeautifulSoup`. The page is well structured and I don't expect it to change in time, so it's a case of finding the ordered list of paper IDs, URLs and titles. After figuring out what's the latest day of data available and how many entries it has (from parsing the first H3 header, e.g. "Fri, 14 Feb 2025 (showing first 50 of 159 entries )"), this is it:

```py
# find the URLs to these papers for the latest day only (up to n_entries as per above)
paper_links = soup.find_all("a", {"title": "Download PDF"})[:n_entries]

# Extract the paper IDs and links
paper_ids, paper_urls = [], []
for link in paper_links:
    paper_url = "https://arxiv.org" + link["href"]
    paper_id = link["href"].split("/")[-1].split("v")[0]  # Extract the ID

    paper_ids.append(paper_id)
    paper_urls.append(paper_url)

# separately, find all titles (this is due to how the DOM is structured)
# they'll appear in the same order so order counts
paper_title_divs = soup.find_all("div", {"class": "list-title mathjax"})[:n_entries]

paper_titles = []
for title_div in paper_title_divs:
    paper_titles.append(title_div.contents[1].split('\n')[1].lstrip())
```

Then, I download all the papers locally (to the file system Colab is giving me, which, note, is ephemeral) with `urllib.request` - this is very fast, takes about 20 seconds for 150 papers (files are rather small).

Finally, I can ask Gemini to process them with the prompt above (and ingesting the file itself), one by one with:

```py
client = genai.Client(api_key=userdata.get('GEMINI_API_KEY'))

# configure which Gemini to run 
model = "gemini-2.0-flash"

file_ = client.files.upload(file=f'pdfs/{filename}')
start_time = datetime.now()
response = client.models.generate_content(
    model=model,
    config=types.GenerateContentConfig(system_instruction=sys_instruct,
                                       temperature=0),  # use greedy decoding
    contents=[prompt, file_])
```

I've used Gemini 2.0 Flash but I'll check out if Lite can do the same job and maybe faster. About the API key, you can store it in the ["secrets" feature](https://medium.com/@parthdasawant/how-to-use-secrets-in-google-colab-450c38e3ec75) in Colab which works a bit like environment variables.
Gemini has a free tier of 15 requests/minute which I've not exceeded with my daily run, because a document gets processed in about 5 seconds (median across all), which means in a minute I can expect to send ~12 requests. I'll see how it plays out in time, more than happy to pay a little for this, pricing is [quite friendly](https://ai.google.dev/gemini-api/docs/rate-limits#free-tier) too. I may be wrong but Gemini is the only proprietary (non open-source) LLM family with a free API tier.

I save the summaries as they come, keep track of tokens consumed in input and output and latency just for the sake of having stats. At the end, I generate a lil' HTML page with the summary, title and href to URL of each paper (I'll spare you the code for that here, check the notebook in case). For Feb 14, the summary page looks like this

<figure class="responsive">
  <img src="{{ site.url }}{{site.posts_images_path}}gemini-paper-summaries.png" alt="A very basic HTML page with title and link of each paper and the summary below, no design element applied.">
  <figcaption>First 3 papers from Feb 14, 2025 as summarised via Gemini 2.0 Flash, from the HTML page I am generating.</figcaption>
</figure>

It's bare, but I don't need anything else - all I need is reading/skimming it every day and, if desired, go check out the paper itself (hence the links are important). I could make it send it to me via email I suppose.

## What can be improved

A lot of things. What comes to mind immediately: 
* The design of the HTML summary page!
* Send the summary somewhere, e.g. via email
* Add a preliminary check to see  if the latest available day of papers has been already summarised
* Automate it as a job - for now a daily manual run is good enough while I check results out
* A better prompt?
* The Colab runtime has a time cutoff - for now running the notebook to summarise ~150 papers takes about 20 mins overall so it's well within limits (of course the slowest part is the LLM call, but Gemini seems fast enough)
* The LLM doesn't have to be Gemini (although I have to say I quite like it!), I could experiment with other ones, and I'd particularly love to use open source ones 

## New additional "features" I could add

AI papers don't get published just under the "AI" subclass, another popular one is e.g. ["Computation and Language"](https://arxiv.org/list/cs.CL/recent) - I could do the same for each section of interest. 

Inevitably, these'd be too many papers. I could then add a second layer than collates all the daily paper summaries and gives me an overview of the themes.

---

Let me know what you think - find me on BlueSky or LinkedIn (see sidebar). Any feedback is greatly appreciated, including if you find mistakes.

Also, if you're one for newsletters, my post can get regularly sent to you:

<iframe
scrolling="no"
style="width:100%!important;height:220px;border:1px #ccc solid !important"
src="https://buttondown.email/martinapugliese?as_embed=true"
></iframe><br /><br />









