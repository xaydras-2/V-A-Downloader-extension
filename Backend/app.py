from fastapi import HTTPException, Depends, Header
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from urllib.parse import urlparse
import json
import subprocess
import os
import re
from typing import Iterator
from dotenv import load_dotenv
import time
import urllib.parse
import logging


load_dotenv()

API_KEY = os.getenv("API_KEY")

logging.basicConfig(level=logging.INFO)


# Define a Pydantic model for the nested request data
class DownloadRequestData(BaseModel):
    url: str
    type: str

class DownloadRequest(BaseModel):
    data: DownloadRequestData 


class VideoDownloader:
    def __init__(self):
        self.api_key = API_KEY

    def verify_api_key(self, api_key: str = Header(...)):
        if api_key != self.api_key:
            raise HTTPException(status_code=401, detail="Invalid API key")

    # Define a generator function to stream the video
    def generate_stream(self, command: list[str]) -> Iterator[bytes]:
        with subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE) as process:
            if process.stdout:
                for chunk in iter(lambda: process.stdout.read(1024 * 64), b''):
                    yield chunk
            else:
                raise HTTPException(status_code=500, detail="Failed to initialize stdout for the process")


    def validate_url(self, video_url: str):
        if not re.match(r"^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$", video_url):
            raise HTTPException(status_code=400, detail="Invalid URL format")

    def validate_file_type(self, file_type: str):
        if file_type not in ["mp4", "mp3", "webm", "mkv"]:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
    def banned_domains(self, video_url: str):
        # Set of banned domains for faster lookup
        banned_domains_set = {
            "pornhub.com", "xvideos.com", "redtube.com", 
            "xnxx.com", "youporn.com", "tube8.com", "adult.com",
            "xhamster.com", "beeg.com", "spankwire.com", "keezmovies.com",
            "xxxvideos247.com", "xxxstreams.com", "xxxmovies.com", "xxxadulttube.com",
            "rule34.com"
        }
        
        # Extract the domain from the URL
        parsed_url = urlparse(video_url)
        domain = parsed_url.netloc.replace("www.", "")  # Remove 'www.' if present
        
        # Check if the domain is in the banned list
        return domain in banned_domains_set
        

    async def download_video(self, request: DownloadRequest, api_key: str = Depends(verify_api_key)):
        
        time.sleep(5)  # Delay for 5 seconds
        
        logging.info("Starting download process")
        
        video_url = str(request.data.url)
        file_type = request.data.type

        self.validate_url(video_url)
        self.validate_file_type(file_type)

        if self.banned_domains(video_url):
            raise HTTPException(status_code=403, detail="Domain is banned")

        try:

            # Command to extract video metadata as JSON
            command_info = [
                "yt-dlp",
                "--print-json",
                "--skip-download",
                "--cookies", "cookies.txt",
                "--force-ipv4",
                "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.15.0esr) Gecko/20100101 Firefox/115.15.0esr",
                "--no-check-certificate",
                video_url
            ]

            logging.info(f"Running command: {' '.join(command_info)}")

            result = subprocess.run(command_info, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            
            if result.returncode != 0:
                raise HTTPException(status_code=500, detail=f"Failed to retrieve video information: {result.stderr}")
            
            video_info = json.loads(result.stdout)
            title = video_info.get("title", "Unknown_Title")
            title = re.sub(r"[^\w\s]", "", title).replace(" ", "_")  # Sanitize title
            filename = f"{title}.{file_type}"
            encoded_filename = urllib.parse.quote(filename)


            command = [
                "yt-dlp",
                "-o",
                "-",
                "--cookies", "cookies.txt",
                "--force-ipv4",
                "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.15.0esr) Gecko/20100101 Firefox/115.15.0esr",
                "--no-check-certificate",
                video_url
            ]
            return StreamingResponse(
                content=self.generate_stream(command),
                media_type="application/octet-stream",
               headers={"Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"}
            )
        
        except HTTPException as e:
            raise HTTPException(status_code=e.status_code, detail=f"the detail: ${e.detail}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
