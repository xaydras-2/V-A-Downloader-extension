from pytube import YouTube
import subprocess
import os
import re







#not working
def download_video1(video_url):
    try:
        yt = YouTube(video_url)
        stream = yt.streams.filter(progressive=True, file_extension='mp4').first()
        
        if not stream:
            print("No suitable stream found")
        else:
            stream.download(output_path=".")
            print("Download successful!")
        
    except Exception as e:
        print(f"Error: {str(e)}")


#trying different library (yt-dlp)

def download_video(video_url):
    output_file = "downloaded_video.mp4"
    command = ["yt-dlp", video_url, "-o", output_file]
    try:
        subprocess.run(command, check=True)
        print(f"Download successful! Saved as {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error: {str(e)}")

# Example video URL
# video_url = "https://www.example.com/path?query=1"

# Check if the video_url matches the regex pattern
def is_valid_url(video_url):
    pattern = r"^(https?:\/\/)?([a-zA-Z0-9_-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,})(\/[a-zA-Z0-9@:%_\+.~#?&//=]*)?$"
    if re.match(pattern, video_url):
        print("Valid URL")
    else:
        print("Invalid URL")
