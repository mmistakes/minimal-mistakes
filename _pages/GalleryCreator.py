import os

def create_gallery():
    # Get folder name from user
    folder_name = input("Enter the image folder name (located in assets/images/): ")
    
    # Define paths
    image_dir = os.path.join("assets", "images", folder_name)
    pages_dir = os.path.join("_pages", "galleries")
    
    # Validate folder exists
    if not os.path.exists(image_dir):
        print(f"Error: Image folder '{image_dir}' does not exist!")
        return
    
    # Create galleries directory if needed
    os.makedirs(pages_dir, exist_ok=True)
    
    # Supported image extensions
    valid_exts = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'}
    
    # Get and sort image files
    images = sorted(
        [f for f in os.listdir(image_dir) 
         if os.path.splitext(f)[1].lower() in valid_exts],
        key=lambda x: x.lower()
    )
    
    # Rename images and build gallery entries
    gallery = []
    for idx, img in enumerate(images, start=1):
        # Get original extension
        ext = os.path.splitext(img)[1]
        
        # Generate new filename
        new_name = f"image-{idx}{ext}"
        old_path = os.path.join(image_dir, img)
        new_path = os.path.join(image_dir, new_name)
        
        # Rename file
        os.rename(old_path, new_path)
        
        # Add to gallery configuration
        full_path = f"assets/images/{folder_name}/{new_name}"
        gallery.append({
            "url": full_path,
            "image_path": full_path
        })
    
    # Create Jekyll page content
    page_content = f"""---
layout: splash
permalink: /images/{folder_name}/
gallery:
"""

    for item in gallery:
        page_content += f"  - url: {item['url']}\n"
        page_content += f"    image_path: {item['image_path']}\n"

    page_content += "---\n\n{% include gallery %}\n"
    
    # Write to file
    output_path = os.path.join(pages_dir, f"{folder_name}.md")
    with open(output_path, "w") as f:
        f.write(page_content)
    
    print(f"Successfully created gallery at {output_path}")

if __name__ == "__main__":
    create_gallery()