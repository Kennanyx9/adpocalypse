chrome.storage.local.get(["blockedCount"], data => {
    document.getElementById("blocked-count").textContent = data.blockedCount  0;
});

function updateLearnedList() {
    chrome.storage.local.get(["learned"], data => {
        const list = document.getElementById("learned-list");
        const trackers = data.learned  [];

        list.innerHTML = "";
        if (trackers.length === 0) {
            list.innerHTML = "<li>None yet</li>";
        } else {
            trackers.forEach(tracker => {
                const li = document.createElement("li");
                li.textContent = tracker;
                list.appendChild(li);
            });
        }
    });
}

updateLearnedList();

document.getElementById("clear-btn").addEventListener("click", () => {
    chrome.storage.local.set({ learned: [] }, () => {
        updateLearnedList();
    });
});