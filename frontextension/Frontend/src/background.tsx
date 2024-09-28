import { browser } from "webextension-polyfill-ts";

browser.runtime.onMessage.addListener(async (message) => {
  if (message.action === "download") {
    const { data, api_key } = message;

    try {
      const response = await fetch(
        "https://xaydras-api-tt1-production.up.railway.app/api/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": `${api_key}`,
          },
          body: JSON.stringify({ data: data }),
        }
      );

      if (response.ok) {
        const blob = await response.blob(); // Receive the blob as octet-stream

        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = `download.${data.type}`; // Fallback filename

        if (contentDisposition) {
          const filenameRegex =
            /(?:filename\*=UTF-8''([^;]+)|filename\s*=\s*"([^"]+)")/i;
          const matches = filenameRegex.exec(contentDisposition);

          if (matches != null) {
            if (matches[1]) {
              // For RFC5987 encoding (UTF-8)
              filename = decodeURIComponent(matches[1]).replace(/['"]/g, "");
            } else if (matches[2]) {
              // For regular filename field
              filename = matches[2].replace(/['"]/g, "");
            }
          }
        }

        const url = window.URL.createObjectURL(blob); // Use blob directly

        // Trigger download using the blob URL
        browser.downloads
          .download({
            url: url,
            filename: filename,
            conflictAction: "overwrite",
          })
          .then(() => {
            browser.runtime.sendMessage({
              action: "downloadStatus",
              status: "Download completed!",
            });
          })
          .catch((error) => {
            console.error("Download error:", error);
            browser.runtime.sendMessage({
              action: "downloadStatus",
              status:
                "An error occurred during download: " +
                (error instanceof Error ? error.message : "Unknown error"),
            });
          });
      } else {
        const errorData = await response.json();
        browser.runtime.sendMessage({
          action: "downloadStatus",
          status: errorData.detail || "An error occurred",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      browser.runtime.sendMessage({
        action: "downloadStatus",
        status:
          "An error occurred: " +
          (error instanceof Error ? error.message : "Unknown error"),
      });
    }
  }
});
