let trackers = [];

fetch(chrome.runtime.getURL("trackers.json"))
    .then(res => res.json())
    .then(data => trackers = data.trackers);

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        for (let tracker of trackers) {
            if (details.url.includes(tracker)) {
                return { cancel: true };
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);