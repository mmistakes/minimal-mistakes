import os

def create_gallery():
    """Create a Jekyll page for a photo gallery from a folder of images."""
    folder_name = input("Enter the image folder name (located in assets/images/): ")
    image_dir = os.path.join("assets", "images", folder_name)
    pages_dir = os.path.join("_pages", "galleries")

    if not os.path.exists(image_dir):
        print(f"Error: Image folder '{image_dir}' does not exist!")
        return

    os.makedirs(pages_dir, exist_ok=True)

    valid_exts = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'}
    images = sorted(
        [f for f in os.listdir(image_dir) if os.path.splitext(f)[1].lower() in valid_exts],
        key=lambda x: x.lower()
    )

    gallery = []
    for idx, img in enumerate(images, start=1):
        ext = os.path.splitext(img)[1]
        name = os.path.splitext(img)[0]
        new_name = f"{name}{ext}"
        old_path = os.path.join(image_dir, img)
        new_path = os.path.join(image_dir, new_name)

        os.rename(old_path, new_path)

        full_path = f"assets/images/{folder_name}/{new_name}"
        url = f"asstes/images/{folder_name}/{new_name}"
        gallery.append({"url": url, "image_path": full_path})

    page_content = (
        f"---\n"
        f"layout: splash\n"
        f"permalink: /images/{folder_name}/\n"
        f"gallery:\n"
    )

    for item in gallery:
        page_content += f"  - url: {item['url']}\n"
        page_content += f"    image_path: {item['image_path']}\n"

    page_content += "---\n\n{% include gallery %}\n"

    output_path = os.path.join("_galleries", f"{folder_name}.md")
    with open(output_path, "w") as f:
        f.write(page_content)

    print(f"Successfully created gallery at {output_path}")

if __name__ == "__main__":
    create_gallery()