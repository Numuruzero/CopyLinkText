// Initialize global variable which will hold the text of the latest clicked item
let clickedEl = null;

// Listen for right click and set clickedEl to the text of whatever has been clicked
// TODO: Activate only if link is clicked
document.addEventListener("contextmenu", function(event) {
    clickedEl = event.target.innerText;
    console.log(clickedEl);
}, true);

// Write clickedEl to the clipboard
// Activate after receiving an activation message from background script
chrome.runtime.onMessage.addListener(function(request) {
    if (request.msg == "copyLinkText") {
        navigator.clipboard.writeText(clickedEl);
    };
});