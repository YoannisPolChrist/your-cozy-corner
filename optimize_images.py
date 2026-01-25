import os
from PIL import Image
from pathlib import Path

def optimize_images(directory):
    # Supported extensions to convert
    extensions = {'.png', '.jpg', '.jpeg'}
    
    # Walk through directory
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = Path(root) / file
            
            # Check extension
            if file_path.suffix.lower() in extensions:
                webp_path = file_path.with_suffix('.webp')
                
                # Skip if webp already exists (optional, but good for idempotency)
                # if webp_path.exists():
                #     continue
                    
                try:
                    with Image.open(file_path) as img:
                        # Convert to RGB if necessary (e.g. for PNG with transparency)
                        # WebP supports transparency, but sometimes conversion needs care.
                        # For simple usage, save directly.
                        
                        print(f"Converting: {file} -> {webp_path.name}")
                        img.save(webp_path, 'WEBP', quality=80)
                        
                except Exception as e:
                    print(f"Error converting {file}: {e}")

if __name__ == "__main__":
    dirs_to_optimize = [
        r"c:\Users\psjoh\Desktop\Selbstständigkeit\Website\Website Aktuell (12.2025)\project-hub-central\src\assets",
        r"c:\Users\psjoh\Desktop\Selbstständigkeit\Website\Website Aktuell (12.2025)\project-hub-central\public\lovable-uploads"
    ]
    
    for d in dirs_to_optimize:
        print(f"Starting optimization in: {d}")
        optimize_images(d)
    
    print("Optimization complete.")
