from fastapi import HTTPException, Depends, Header
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
from urllib.parse import urlparse
import traceback
import json
import subprocess
import os
import re
from typing import AsyncIterator
from dotenv import load_dotenv
import time
import urllib.parse
import logging
import asyncio


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
    """
    A class for downloading videos.

    This class provides methods for downloading videos using yt-dlp.

    """
    def __init__(self):
        self.api_key = API_KEY

    def verify_api_key(self, api_key: str = Header(...)):
        if api_key != self.api_key:
            raise HTTPException(status_code=401, detail="Invalid API key")


    async def generate_stream(self, command: list[str]) -> AsyncIterator[bytes]:
        process = await asyncio.create_subprocess_exec(
            *command, 
            stdout=asyncio.subprocess.PIPE, 
            stderr=asyncio.subprocess.PIPE
        )
        
        if process.stdout:
            while True:
                chunk = await process.stdout.read(1024 * 64)
                if not chunk:
                    break
                yield chunk
        else:
            raise HTTPException(status_code=500, detail="Failed to initialize stdout for the process")




    def validate_url(self, video_url: str):
        if not re.match(r"^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$", video_url):
            raise HTTPException(status_code=400, detail="Invalid URL format")

    def validate_file_type(self, file_type: str):
        if file_type not in ["mp4", "mp3"]:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
    def banned_domains(self, video_url: str):
        """
        Checks if a URL is on the banned domains list.

        The banned domains list is a set of domains that are
        known to contain inappropriate content. This function
        takes a URL as a parameter and checks if the domain
        in the URL is in the banned domains list.

        :param video_url: The URL to check
        :return: True if the domain is banned, False otherwise
        """
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
        domain = parsed_url.netloc.replace("www.", "")

        try:
            # Check if the domain is in the banned list
            if domain in banned_domains_set:
                return True
            else:
                return False
        except Exception as e:
            logging.error(f"Error checking domain: {e}")
            return False

    
    def audio_case(self, video_url: str, encoded_filename: str):
        """
        If the requested file type is MP3, this function is called to download the audio.

        It uses yt-dlp to download the best audio format available as M4A, and if that's not
        available, it downloads the best audio format available overall. The file is streamed
        directly to the user without being saved to disk.

        :param video_url: The URL of the video to download
        :param encoded_filename: The filename to use when sending the file to the user
        :return: A StreamingResponse object that streams the file to the user
        """
        # For MP3, prefer M4A but allow any audio format
        command = [
            "yt-dlp",
            "-f", "bestaudio[ext=m4a]/bestaudio",
            "-o", "-",  
            "--cookies", "cookies.txt", 
            "--force-ipv4",  # Force IPv4
            "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.15.0esr) Gecko/20100101 Firefox/115.15.0esr",
            "--no-check-certificate",
            video_url
        ]

        logging.info(f"Running command: {' '.join(command)}")

        # Start the process
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Wait for the process to complete
        stderr_output = process.communicate()

        # Check the return code
        if process.returncode != 0:
            logging.error(f"Error from yt-dlp: {stderr_output[1].decode()}")
            raise HTTPException(status_code=500, detail=f"Error during download: {stderr_output[1].decode()}")


        return StreamingResponse(
            content=self.generate_stream(command),
            media_type="application/octet-stream",
            headers={"Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"}
        )
    
    def video_case(self, video_url: str, encoded_filename: str):
        command = [
            "yt-dlp",
            "-o", "-",  
            "--cookies", "cookies.txt", 
            "--force-ipv4",  # Force IPv4
            "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.15.0esr) Gecko/20100101 Firefox/115.15.0esr",
            "--no-check-certificate",
            video_url
        ]

        logging.info(f"Running command: {' '.join(command)}")

        # Start the process
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Wait for the process to complete
        stderr_output = process.communicate()

        # Check the return code
        if process.returncode != 0:
            logging.error(f"Error from yt-dlp: {stderr_output[1].decode()}")
            raise HTTPException(status_code=500, detail=f"Error during download: {stderr_output[1].decode()}")


        return StreamingResponse(
            content= self.generate_stream(command),
            media_type="application/octet-stream",
            headers={"Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"}
        )
        

    async def download_video(self, request: DownloadRequest, api_key: str = Depends(verify_api_key)):
        """
        Handles the request to download a video. This function will:

        1. Validate the URL of the video to ensure it is correct and not banned
        2. Validate the file type to ensure it is valid
        3. Retrieve the video metadata using yt-dlp
        4. Use the metadata to generate a filename for the video
        5. Use yt-dlp to download the video in the specified file type
        6. Stream the video to the user

        :param request: The request to download the video
        :param api_key: The API key to use for authentication
        :return: A StreamingResponse object that streams the video to the user
        """
        time.sleep(5)  # Delay for 5 seconds
        
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

            try:
                loop = asyncio.get_event_loop()
                process = await loop.run_in_executor(None, lambda: subprocess.Popen(command_info, stdout=subprocess.PIPE, stderr=subprocess.PIPE))
                stdout, stderr = process.communicate()

            except Exception as e:
                logging.error(f"Error executing subprocess: {traceback.format_exc()}")
                raise HTTPException(status_code=500, detail=f"Error executing subprocess: {traceback.format_exc()}")

            
            
            if process.returncode != 0:
                        raise HTTPException(status_code=500, detail=f"Failed to retrieve video information: {stderr.decode()}")
        
            if isinstance(stdout, bytes):
                stdout = stdout.decode()

            video_info = json.loads(stdout)
            
            title = video_info.get("title", "Unknown_Title")
            title = re.sub(r"[^\w\s]", "", title).replace(" ", "_")  # Sanitize title
            filename = f"{title}.{file_type}"
            encoded_filename = urllib.parse.quote(filename)         


            if file_type == "mp3":
                return self.audio_case(video_url, encoded_filename)


            return self.video_case(video_url, encoded_filename)
        

        
        except HTTPException as e:
            raise HTTPException(status_code=e.status_code, detail=f"the detail: ${e.detail}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")