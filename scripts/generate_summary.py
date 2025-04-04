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
    Summarize the following blog post into an engaging, exciting, and adventurous {platform} post. Use a direct, thoughtful, concise, and reflective style. Start with an intriguing hook or bold statement. Include a short personal anecdote or surprising insight. End with a provocative question or actionable takeaway that encourages interaction.

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
