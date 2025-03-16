from PIL import Image
import os

def compress_image(input_path, quality=85):
    try:
        with Image.open(input_path) as image:
            # Handle transparency and convert to RGB
            if image.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', image.size, (255, 255, 255))
                background.paste(image, mask=image.split()[-1])
                image = background
            elif image.mode != 'RGB':
                image = image.convert('RGB')

            # Resize if necessary
            max_width = 2000
            width, height = image.size
            
            if width > max_width:
                # Calculate scaling ratio while maintaining aspect ratio
                ratio = max_width / width
                new_size = (int(width * ratio), int(height * ratio))
                # Use high-quality downsampling filter
                image = image.resize(new_size, resample=Image.LANCZOS)

            # Save as JPEG overwriting original
            image.save(input_path, "JPEG", quality=quality, optimize=True)
            print(f"Successfully processed: {input_path}")
    
    except FileNotFoundError:
        print(f"Error: File not found - {input_path}")
    except Image.UnidentifiedImageError:
        print(f"Error: Not a valid image - {input_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")

if __name__ == "__main__":
    input_path = input("Enter the path to the image or directory: ").strip()
    
    if not os.path.exists(input_path):
        print(f"Error: Path does not exist - '{input_path}'")
    elif os.path.isfile(input_path):
        compress_image(input_path)
    elif os.path.isdir(input_path):
        for filename in os.listdir(input_path):
            file_path = os.path.join(input_path, filename)
            if os.path.isfile(file_path):
                compress_image(file_path)
    else:
        print(f"Error: Invalid path type - '{input_path}'")