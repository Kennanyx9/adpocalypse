// Increment blocked count and store matched rule domain
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(info => {
    // info.request.url contains the full URL of the blocked resource
    const url = info.request.url;
    let domain;
    try {
        domain = new URL(url).hostname;
    } catch {
        domain = null;
    }

    chrome.storage.local.get(["blockedCount", "learned"], data => {
        let blockedCount = data.blockedCount || 0;
        blockedCount++;
        let learned = data.learned || [];

        if (domain && !learned.includes(domain)) {
            learned.push(domain);
        }

        chrome.storage.local.set({ blockedCount, learned });
    });
});
