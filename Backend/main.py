from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app import VideoDownloader, DownloadRequest


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

# Instantiate the VideoDownloader class
video_downloader = VideoDownloader()

@app.post("/api/download")
async def download_video(request: DownloadRequest, api_key: str = Depends(video_downloader.verify_api_key)):
    return await video_downloader.download_video(request, api_key)