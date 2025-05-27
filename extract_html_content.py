import os
import re
from bs4 import BeautifulSoup
import html

def extract_content_from_html(html_file_path):
    """Extract the main content from HTML file and convert to markdown format."""
    
    with open(html_file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Extract title from h1 or title tag
    title_elem = soup.find('h1') or soup.find('title')
    title = title_elem.get_text().strip() if title_elem else "Unknown Title"
    
    # Clean up title - remove HTML entities
    title = html.unescape(title)
    title = re.sub(r'[–].*–.*', '', title).strip()  # Remove site name part
    
    # Try to find main content area
    main_content = ""
    
    # Look for common content containers
    content_areas = [
        soup.find('article'),
        soup.find('main'),
        soup.find('div', class_=re.compile(r'content|post|entry')),
        soup.find('div', id=re.compile(r'content|post|entry'))
    ]
    
    for area in content_areas:
        if area:
            # Get text content and clean it up
            text = area.get_text(separator='\n')
            # Remove excessive whitespace
            text = re.sub(r'\n\s*\n', '\n\n', text)
            text = re.sub(r'[ \t]+', ' ', text)
            main_content = text.strip()
            break
    
    if not main_content:
        # Fallback: get all text from body
        body = soup.find('body')
        if body:
            main_content = body.get_text(separator='\n')
            main_content = re.sub(r'\n\s*\n', '\n\n', main_content)
            main_content = re.sub(r'[ \t]+', ' ', main_content)
    
    return title, main_content

# Test with the first file
html_file = "#PowerPlatformTip 1 – 'Explore Community Resources'.html"
if os.path.exists(html_file):
    title, content = extract_content_from_html(html_file)
    print(f"Title: {title}")
    print("\n" + "="*50)
    print("Content preview:")
    print(content[:2000])  # First 2000 characters
else:
    print("File not found")
