import sys
from openai import OpenAI
import markdown
import yaml
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_markdown_content(filepath):
    with open(filepath, 'r') as f:
        lines = f.read().split('---')
        front_matter = yaml.safe_load(lines[1])
        content = markdown.markdown('---'.join(lines[2:]))
    return front_matter, content

def generate_summary(content, platform):
    prompt = f"""
    Summarize the following blog post into a concise and engaging {platform} post. Match my personal writing style closely, which is direct, thoughtful, concise, and reflective. Include personal insights, thoughtful observations, or pose an engaging question. Here are detailed examples of my writing:

    1. "Selling isn't part of my identity. I'm an individual contributor—I prefer solving problems hands-on and tinkering. So it surprises me when others seek my advice on how to sell."

    2. "Yesterday, I visited a successful banker in Singapore who taught himself coding in his 50s. The experience reinforced that real ambition isn’t about age; it's about curiosity and willingness to reinvent oneself."

    3. "Living in Singapore taught me a surprising paradox: more rules can actually create more freedom. When things are safe and predictable, you can truly enjoy your life."

    4. "Clear thinking and decisive execution are competitive advantages. Complexity usually isn't. Focus on executing simple ideas exceptionally well."

    Blog Post:
    {content}

    {platform} post:
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=120,
        temperature=0.7
    )

    summary = response.choices[0].message.content.strip()
    return summary

if __name__ == "__main__":
    filepath = sys.argv[1]
    front_matter, content = extract_markdown_content(filepath)

    platforms = ["X", "LinkedIn", "Instagram", "TikTok", "Reddit", "Email List", "Telegram"]

    for platform in platforms:
        summary = generate_summary(content, platform)
        filename = platform.lower().replace(" ", "_").replace("(", "").replace(")", "") + '_summary.txt'
        with open(filename, 'w') as f:
            f.write(summary)

    print("✅ All summaries generated successfully.")
