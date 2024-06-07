let clickedEl = null;

document.addEventListener("contextmenu", function(event) {
    clickedEl = event.target.innerText;
    console.log(clickedEl);
}, true);

// Was sending a message to background script but actually needs to receive a message in order to copy to clipboard. This already has the value it needs

chrome.runtime.onMessage.addListener(function(request) {
    if (request.msg == "copyLinkText") {
        console.log('Message received');
        navigator.clipboard.writeText(clickedEl);
    };
});