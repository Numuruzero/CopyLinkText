chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: 'Copy',
        title: 'Copy Stuff',
        type: 'normal',
        contexts: ['link']
    });
});

// Legacy function grabbed from web search
//
// function mycallback(info, tab) {
//     chrome.tabs.sendMessage(tab.id, "getClickedEl", {frameId: info.frameId}, data => {
//         elt = data.value;
//     });
// }

// async function getText() {
//     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//     const response = await chrome.tabs.sendMessage(tab.id, {call: "getClickedEl"});
//     // do something with response here, not outside the function
//     console.log(response);
//     elt = await response;
//   };
  
// Open a new search tab when the user clicks a context menu

async function requestText() {
    console.log('Requesting tab');
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    console.log(`Requesting text from tab ${tab.id}`);
    chrome.tabs.sendMessage(tab.id, {msg: "copyLinkText"});
};

chrome.contextMenus.onClicked.addListener((item) => {
    console.log('Triggered');    
    requestText();
});