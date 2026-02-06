from PIL import Image
import os

def convert_jpg_to_png():
    # Define the public directory path
    public_dir = os.path.join(os.getcwd(), 'public')
    
    # Check if the directory exists
    if not os.path.exists(public_dir):
        print(f"Directory not found: {public_dir}")
        return

    # List all JPG files
    files = [f for f in os.listdir(public_dir) if f.lower().endswith('.jpg')]
    
    if not files:
        print("No JPG files found in public directory.")
        return

    print(f"Found {len(files)} JPG files.")

    # Convert each file
    for file in files:
        try:
            img_path = os.path.join(public_dir, file)
            img = Image.open(img_path)
            
            # Create PNG filename
            file_root = os.path.splitext(file)[0]
            png_path = os.path.join(public_dir, f"{file_root}.png")
            
            # Save as PNG
            img.save(png_path, "PNG")
            print(f"Successfully converted: {file} -> {file_root}.png")
        except Exception as e:
            print(f"Failed to convert {file}: {e}")

if __name__ == "__main__":
    convert_jpg_to_png()
