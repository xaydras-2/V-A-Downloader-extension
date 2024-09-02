from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import subprocess
import os
import re
from typing import Iterator
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

# Define a Pydantic model for the nested request data
class DownloadRequestData(BaseModel):
    url: str
    type: str

class DownloadRequest(BaseModel):
    data: DownloadRequestData

def generate_stream(command: list[str]) -> Iterator[bytes]:
    with subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE) as process:
        if process.stdout:
            for chunk in iter(lambda: process.stdout.read(1024), b''):
                yield chunk
        else:
            raise HTTPException(status_code=500, detail="Failed to initialize stdout for the process")




def verify_api_key(api_key: str = Header(...)):
    if api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")

@app.post("/download")
async def download_video(request: DownloadRequest, api_key: str = Depends(verify_api_key)):
    # Extract and validate data from the nested format
    video_url = str(request.data.url)
    file_type = request.data.type
    
    if not re.match(r"^(https?:\/\/)?([a-zA-Z0-9_-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,})(\/[a-zA-Z0-9@:%_\+.~#?&//=]*)?$", video_url):
        raise HTTPException(status_code=400, detail="Invalid URL format")

    # Validate file type
    if file_type not in ["mp4", "mp3", "webm", "mkv"]:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    try:
        command_info = [
            "yt-dlp",
            "--print-json",
            "--skip-download",
            "--cookies", "cookies.txt",
            video_url
        ]

        result = subprocess.run(command_info, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Failed to retrieve video information: {result.stderr}")
        
        video_info = json.loads(result.stdout)
        title = video_info.get("title", "Unknown_Title")
        title = re.sub(r"[^\w\s]", "", title).replace(" ", "_")  # Sanitize title
        filename = f"{title}.{file_type}"
        abs_path = os.path.abspath(filename)

        # Check if the video is already downloaded
        if os.path.exists(filename):
            return JSONResponse(content={"success": "The video has already been downloaded", "path": filename, "abs_path": abs_path, "title": title})


        # Stream the video download directly to the client
        command = ["yt-dlp", "-o", "-", "--cookies", "cookies.txt", video_url]
        return StreamingResponse(
            content=generate_stream(command),
            media_type="application/octet-stream",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=f"the detail: ${e.detail}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
