// Create a listener which adds the Copy Text function to the context menu on links
chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: 'CopyText',
        title: 'Copy Link Text',
        type: 'normal',
        contexts: ['link']
    });
});

// Grab the ID of the current tab and send an activation message to the listener in the content script
async function requestText() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.tabs.sendMessage(tab.id, {msg: "copyLinkText"});
};

// Activates above function when the context menu item is clicked
chrome.contextMenus.onClicked.addListener((item) => {
    requestText();
});