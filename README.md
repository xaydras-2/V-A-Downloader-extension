
# Video/Audio Downloader

this is a simple extension that use py (fastapi) for the backend
and react for the frontend. As the title says this extension if you want to call it an extension take video link
(e.g., YouTube, TikTok, Instagram, Facebook, etc.) and the file extension
(e.g., MP3, MP4, etc.) and then send a request to the backend which is using yt-dlp with subprocess to download it since it's flexible and returns the raw binary i think so, inside the content, with the file name inside a Content-Disposition, and then use blob in the tsx to read the binary and download it, with the filename from the Content-Disposition. That all 👍



## Installation

### Frontend

to install the necessary dependicies for the frontend dir run

```bash
    cd Frontend
    npm install
```
or if you're inside the frontend dir just run

```bash
    npm install
```

then

```bash
npx webpack --mode production
```
This will bundle and optimize the source code.

### Backend

#### to install the necessary pip for py without a virtual environment (aka .venv)

if outside the Backend dir run

```bash
    cd Backend
    pip install -r requirements.txt
```
inside the Backend dir

```bash
    pip install -r requirements.txt
```

#### to install the necessary pip for py with a virtual environment (aka .venv)

```bash
    cd Backend
    python -m venv .venv
```
To activate the virtual environment:

On Windows:
```bash
    .venv\Scripts\activate
```

On macOS/Linux:

```bash
    source .venv/bin/activate
```

After activation, your terminal prompt should have a (.venv) in the start 

*example "(.venv) c:\your\path"*

then run 

```bash
    pip install -r requirements.txt
```
## Run Locally

### Frontend

😊 To run the extension locally:

  1. Go to about:debugging in Firefox.
  2. Select "This Firefox".
  3. Click "Load Temporary Add-on" and choose the manifest.json file.

Keep in mind that the extension will only be active for the current session. Once you close the browser, the temporary extension will be removed.

### Backend

to Start the Backend-server run

if inside the Backend Dir

```bash
    fastapi dev app.py
```

else 

```bash
    cd Backend
    fastapi dev app.py
```

it will run in the port 8000

## Update

### some updates

#### i already mention all the updates in a commit this just more explanation(yapping)

you'll need to, first to install an extension, inside your default browser or whatever browser you typically use, that will help you extract your cookies from youtube and then use it inside the code, so please the file that's going to be exported, move it inside the Backend folder, or change the Dir inside the command dic

## Donation
If you'd like to donate, you can do so via my PayPal:

https://www.paypal.me/xaydras1
