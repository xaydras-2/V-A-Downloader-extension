import subprocess
import os
import re




#trying different library (yt-dlp)

def download_video(video_url):
    output_file = "downloaded_video.mp4"
    command = ["yt-dlp", video_url, "-o", output_file]
    try:
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        print(f"Download successful! Saved as {output_file}")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error: {str(e)}")
        print(e.stderr)

# Example video URL
video_url = "https://www.youtube.com/watch?v=Vueyx9TBEqE&pp=ygUOMC4zMCBzZWMgdmlkZW8%3D"
download_video(video_url)

# Check if the video_url matches the regex pattern
def is_valid_url(video_url):
    pattern = r"^(https?:\/\/)?([a-zA-Z0-9_-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,})(\/[a-zA-Z0-9@:%_\+.~#?&//=]*)?$"
    if re.match(pattern, video_url):
        print("Valid URL")
    else:
        print("Invalid URL")
