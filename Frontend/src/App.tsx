import React, { Component } from "react";
import "../public/css/style.css";

interface AppState {
  url: string;
  message: string;
  type: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      url: "",
      message: "",
      type: "",
    };
  }

  /**
   * Handles the response state
   * @param response The response of the request
   * @throws {Error} If the response is not ok
   */
  async ResponseState(response: Response) {
    if (response.ok) {
      const blob = await response.blob(); // Get the response as a Blob

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `download.${this.state.type}`; // Fallback filename

      if (contentDisposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
      }

      // Create a URL for the Blob object
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      // Revoke the object URL to release memory
      window.URL.revokeObjectURL(url);

      this.setState({ message: "Download completed!" });
    } else {
      const data = await response.json();
      this.setState({ message: data.detail || "An error occurred" });
    }
  }

  handleDownload = async () => {
    this.setState({ message: "Downloading your video..." });

    let data = {
      url: this.state.url,
      type: this.state.type,
    };

    try {
      const response = await fetch("http://localhost:8000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      });

      this.ResponseState(response);
    } catch (error) {
      // Explicitly handle the `unknown` type
      if (error instanceof Error) {
        this.setState({ message: "An error occurred: " + error.message });
      } else {
        this.setState({ message: "An unknown error occurred" });
      }
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: event.target.value });
  };

  render() {
    return (
      <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Video/Audio Downloader</h1>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={this.state.url}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-md"
          onChange={this.handleChange}
        />
        <select
          name="format"
          className="block my-5 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => this.setState({ type: e.target.value })}
        >
          <option value="-1">Select Format</option>
          <option value="mp4">MP4</option>
          <option value="mp3">MP3</option>
          <option value="webm">WEBM</option>
          <option value="mkv">MKV</option>
        </select>

        <button
          onClick={this.handleDownload}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Download
        </button>
        <p className="mt-4 text-lg">{this.state.message}</p>
      </div>
    );
  }
}
export default App;
