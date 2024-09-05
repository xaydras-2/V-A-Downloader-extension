import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../public/css/style.css";

const container = document.getElementById("root");

const bodyElement = document.body;
bodyElement.className = "max-w max-h";

if (!container) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(container);

root.render(<App />);
