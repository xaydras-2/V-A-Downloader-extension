import React, { Component } from "react";
import { browser } from "webextension-polyfill-ts";

let api_key = process.env.API_KEY;

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

  componentDidMount() {
    // Restore saved state from browser.storage.local when the component mounts
    browser.storage.local
      .get(["url", "message", "type", "downloadStatus"])
      .then((result) => {
        const message = result.downloadStatus || result.message || "";
        this.setState({
          url: result.url || "",
          message: message, // Use the message or downloadStatus
          type: result.type || "",
        });
      });

    // Listener for download status updates
    browser.runtime.onMessage.addListener((message) => {
      if (message.action === "downloadStatus") {
        this.setState({ message: message.status }, this.saveState); // Update message with status
      }
    });

    // Fetch the current download status from storage
    browser.storage.local.get("downloadStatus").then((result) => {
      if (result.downloadStatus) {
        this.setState({ message: result.downloadStatus }, this.saveState); // Ensure the message updates when downloadStatus is available
      }
    });
  }

  // Save state to browser storage whenever it changes
  saveState = () => {
    browser.storage.local.set({
      url: this.state.url,
      type: this.state.type,
      message: this.state.message, // Ensure message is also saved
    });
  };

  handleDownload = () => {
    this.setState({ message: "Downloading your video..." }, this.saveState);

    let data = {
      url: this.state.url,
      type: this.state.type,
    };

    browser.runtime.sendMessage({
      action: "download",
      data: data,
      api_key: api_key,
    });

    browser.runtime.onMessage.addListener((message) => {
      if (message.action === "downloadStatus") {
        this.setState({ message: message.status }, this.saveState);
      }
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: event.target.value }, this.saveState);
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ type: event.target.value }, this.saveState);
  };

  render() {
    return (
      <>
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
            value={this.state.type}
            onChange={this.handleSelectChange}
          >
            <option value="-1">Select Format</option>
            <option value="mp4">MP4</option>
            <option value="mp3">MP3</option>
          </select>

          {this.state.message !== "Downloading your video..." && (
            <button
              onClick={this.handleDownload}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Download
            </button>
          )}
          <p className="mt-4 text-lg">{this.state.message}</p>
          <div className="mt-10">
            {this.state.url && (
              <iframe
                className="w-full max-w-md"
                src={`https://www.youtube-nocookie.com/embed/${new URLSearchParams(
                  this.state.url.split("?")[1]
                ).get("v")}`}
              ></iframe>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
