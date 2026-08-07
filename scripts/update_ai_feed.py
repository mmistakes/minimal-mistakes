"""Aggrega articoli/paper AI da fonti esterne in _data/ai_feed.yml (letto dalla pagina /ai-feed/).

Fonti con RSS nativo: Hugging Face Blog, arXiv, OpenAI News, Google DeepMind Blog.
Fonti senza RSS (scraping mirato sulla pagina di listing): Anthropic News, The Batch.
Hugging Face Papers: API JSON pubblica usata dalla loro stessa pagina /papers.

Ogni fonte è isolata in try/except: se una fonte cambia struttura o è irraggiungibile,
le altre continuano a essere aggiornate normalmente.
"""

import time
from datetime import datetime

import feedparser
import requests
import yaml
from bs4 import BeautifulSoup

USER_AGENT = "Mozilla/5.0 (compatible; federicomartini-ai-feed/1.0; +https://federicomartini.github.io/)"
MAX_PER_SOURCE = 10
OUTPUT_PATH = "_data/ai_feed.yml"

HEADERS = {"User-Agent": USER_AGENT}


def parse_rss(url: str, source: str) -> list[dict]:
    feed = feedparser.parse(url, agent=USER_AGENT)
    items = []
    for entry in feed.entries[:MAX_PER_SOURCE]:
        parsed_date = entry.get("published_parsed") or entry.get("updated_parsed")
        date_str = time.strftime("%Y-%m-%d", parsed_date) if parsed_date else ""
        items.append(
            {
                "source": source,
                "title": entry.get("title", "").strip(),
                "link": entry.get("link", ""),
                "date": date_str,
            }
        )
    return items


def fetch_hf_papers() -> list[dict]:
    r = requests.get("https://huggingface.co/api/daily_papers", headers=HEADERS, timeout=20)
    r.raise_for_status()
    items = []
    for entry in r.json()[:MAX_PER_SOURCE]:
        paper = entry.get("paper", entry)
        paper_id = paper.get("id") or entry.get("id")
        title = (paper.get("title") or entry.get("title") or "").strip()
        if not paper_id or not title:
            continue
        items.append(
            {
                "source": "Hugging Face Papers",
                "title": title,
                "link": f"https://huggingface.co/papers/{paper_id}",
                "date": (entry.get("publishedAt") or "")[:10],
            }
        )
    return items


def fetch_anthropic_news() -> list[dict]:
    r = requests.get("https://www.anthropic.com/news", headers=HEADERS, timeout=20)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    items = []
    seen_links = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if not href.startswith("/news/"):
            continue
        title_el = a.find("span", class_=lambda c: c and "title" in c)
        if not title_el:
            continue
        link = "https://www.anthropic.com" + href
        if link in seen_links:
            continue
        seen_links.add(link)

        date_str = ""
        time_el = a.find("time")
        if time_el:
            try:
                date_str = datetime.strptime(time_el.get_text(strip=True), "%b %d, %Y").strftime("%Y-%m-%d")
            except ValueError:
                date_str = ""

        items.append({"source": "Anthropic", "title": title_el.get_text(strip=True), "link": link, "date": date_str})
        if len(items) >= MAX_PER_SOURCE:
            break
    return items


def fetch_the_batch() -> list[dict]:
    r = requests.get("https://www.deeplearning.ai/the-batch", headers=HEADERS, timeout=20)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    items = []
    seen_links = set()
    skip = {"/the-batch", "/the-batch/", "/the-batch/about"}
    for a in soup.find_all("a", attrs={"aria-label": True, "href": True}):
        href = a["href"]
        if not href.startswith("/the-batch/") or href in skip:
            continue
        link = "https://www.deeplearning.ai" + href
        if link in seen_links:
            continue
        seen_links.add(link)
        items.append({"source": "The Batch", "title": a["aria-label"].strip(), "link": link, "date": ""})
        if len(items) >= MAX_PER_SOURCE:
            break
    return items


SOURCES = [
    ("Hugging Face Blog", lambda: parse_rss("https://huggingface.co/blog/feed.xml", "Hugging Face Blog")),
    ("arXiv (cs.AI)", lambda: parse_rss("https://rss.arxiv.org/rss/cs.AI", "arXiv (cs.AI)")),
    ("OpenAI News", lambda: parse_rss("https://openai.com/news/rss.xml", "OpenAI")),
    ("Google DeepMind Blog", lambda: parse_rss("https://deepmind.google/blog/rss.xml", "Google DeepMind")),
    ("Hugging Face Papers", fetch_hf_papers),
    ("Anthropic News", fetch_anthropic_news),
    ("The Batch", fetch_the_batch),
]


def main() -> None:
    all_items: list[dict] = []
    for label, fetcher in SOURCES:
        try:
            fetched = fetcher()
            print(f"{label}: {len(fetched)} elementi")
            all_items.extend(fetched)
        except Exception as exc:  # una fonte che fallisce non deve bloccare le altre
            print(f"{label}: SALTATA per errore -> {type(exc).__name__}: {exc}")

    all_items.sort(key=lambda x: x.get("date") or "", reverse=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        yaml.safe_dump(all_items, f, allow_unicode=True, sort_keys=False)

    print(f"\nTotale: {len(all_items)} elementi scritti in {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
