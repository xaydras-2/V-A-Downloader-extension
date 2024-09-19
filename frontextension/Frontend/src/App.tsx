import React, { Component } from "react";
import { browser } from 'webextension-polyfill-ts';


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

  handleDownload = () => {
    this.setState({ message: "Downloading your video..." });

    let data = {
      url: this.state.url,
      type: this.state.type,
    };

    browser.runtime.sendMessage({ action: 'download', data: data, api_key: api_key });

    browser.runtime.onMessage.addListener((message) => {
      if (message.action === 'downloadStatus') {
        this.setState({ message: message.status });
      }
    });
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
