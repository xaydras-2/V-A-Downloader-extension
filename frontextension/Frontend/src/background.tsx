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
        await browser.downloads.download({
          url: url,
          filename: filename,
          conflictAction: "overwrite",
        });

        try {
          await browser.storage.local.set({
            downloadStatus: "Download completed!",
          });
        } catch (error) {
          console.error("Error setting download status:", error);
          if (browser.runtime.lastError) {
            console.log("Storage error:", browser.runtime.lastError.message);
          }
        }

        // Send message to the UI if it's open
        browser.runtime.sendMessage({
          action: "downloadStatus",
          status: "Download completed!",
          message: "Download completed!",
        });
        browser.tabs.onRemoved.addListener(() => {
          browser.storage.local.set({ downloadStatus: "Download completed!" });
        });
      } else {
        const errorData = await response.json();
        const status = errorData.detail || "An error occurred";

        // Save download status in storage
        await browser.storage.local.set({ downloadStatus: status });

        // Send message to the UI if it's open
        browser.runtime.sendMessage({
          action: "downloadStatus",
          status: "Download completed!",
          message: status,
        });
        browser.tabs.onRemoved.addListener(() => {
          browser.storage.local.set({ downloadStatus: status });
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      const status =
        "An error occurred: " +
        (error instanceof Error ? error.message : "Unknown error");

      // Save download status in storage
      await browser.storage.local.set({ downloadStatus: status });

      // Send message to the UI if it's open
      browser.runtime.sendMessage({
        action: "downloadStatus",
        status: "Download completed!",
        message: status,
      });
      browser.tabs.onRemoved.addListener(() => {
        browser.storage.local.set({ downloadStatus: status });
      });
    }
  }
});
