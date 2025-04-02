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

def generate_summary(content):
    prompt = f"Summarize the following blog post into one concise tweet:\n\n{content}"
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=50,
        temperature=0.7
    )
    
    summary = response.choices[0].message.content.strip()
    return summary

if __name__ == "__main__":
    filepath = sys.argv[1]
    front_matter, content = extract_markdown_content(filepath)
    summary = generate_summary(content)
    
    with open('summary.txt', 'w') as f:
        f.write(summary)

    print("✅ Summary generated successfully.")
