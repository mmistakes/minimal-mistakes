import sys
import openai
import markdown
import yaml

def extract_markdown_content(filepath):
    with open(filepath, 'r') as f:
        lines = f.read().split('---')
        front_matter = yaml.safe_load(lines[1])
        content = markdown.markdown('---'.join(lines[2:]))
    return front_matter, content

def generate_summary(content):
    prompt = f"Summarize the following blog post into one concise tweet:\n\n{content}"
    
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
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
