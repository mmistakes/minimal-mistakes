import os
import argparse
from PIL import Image

def convert_to_jpeg(input_path, output_path, quality=85):
    """Convert an image file to JPEG format with specified quality."""
    try:
        with Image.open(input_path) as img:
            # Create white background for images with transparency
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'RGBA':
                    background.paste(img, mask=img.split()[-1])
                else:
                    background.paste(img, (0, 0))
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            print(f"Converted: {input_path} -> {output_path}")
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")

def process_input(input_path, output_folder):
    """Process a single file or directory (ignoring subfolders)"""
    if os.path.isfile(input_path):
        # Get filename and create output path
        filename = os.path.splitext(os.path.basename(input_path))[0] + '.jpg'
        output_path = os.path.join(output_folder, filename)
        convert_to_jpeg(input_path, output_path)
        
    elif os.path.isdir(input_path):
        # Process only top-level files, ignore subdirectories
        for item in os.listdir(input_path):
            item_path = os.path.join(input_path, item)
            if os.path.isfile(item_path):
                filename = os.path.splitext(item)[0] + '.jpg'
                output_path = os.path.join(output_folder, filename)
                convert_to_jpeg(item_path, output_path)

def main():
    

    input_path = input("Enter the image file or folder path: ").strip()
    if not os.path.exists(input_path):
        print(f"Error: Path '{input_path}' does not exist.")
        return

    # Create output folder
    output_folder = os.path.dirname(input_path) \
        if os.path.isfile(input_path) else input_path
    os.makedirs(output_folder, exist_ok=True)

    process_input(input_path, output_folder)

if __name__ == '__main__':
    main()