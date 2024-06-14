// Initialize global variable which will hold the text of the latest clicked item
let clickedEl = null;

// Listen for right click and set clickedEl to the text of whatever has been clicked
// TODO: Activate only if link is clicked
document.addEventListener("contextmenu", function(event) {
  clickedEl = event.target.innerText;
  // console.log(event.composedPath());
  console.log('Nice right click!');
  console.log(event.target);
  console.log(clickedEl);
}, true);

// Write clickedEl to the clipboard
// Activate after receiving an activation message from background script
chrome.runtime.onMessage.addListener(function(request) {
    if (request.msg == "copyLinkText") {
        console.log('Hella nice message');
        console.log(`Clipboard will be set to: ${clickedEl}`);
        navigator.clipboard.writeText(clickedEl);
    };
});

// ChatGPT: Add event listeners to all iframes on page
/* Maybe do this but with "a" tags?
function addEventListenersToIframes() {
    const iframes = document.getElementsByTagName('iframe');
    for (let iframe of iframes) {
        try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.addEventListener('click', handleIframeClick);
        console.log('Added iframe listener');
        } catch (error) {
        console.error('Error accessing iframe content:', error);
        }
    }
}
*/

// That but with "a" tags
/*
function addEventListenersToAtags() {
    const atags = document.getElementsByTagName('a');
    for (let atag of atags) {
        try {
        // const iframeDoc = atag.contentDocument || atag.contentWindow.document;
        atag.addEventListener('click', handleIframeClick);
        console.log('Added atag listener');
        } catch (error) {
        console.error('Error accessing atag content:', error);
        }
    }
}

// Do something when clicks happen in an iframe [change to contextmenu?]
function handleIframeClick(event) {
    console.log('Iframe clicked:', event);
}

// On page load, add event listeners to frames and do so again anytime a new frame is added
document.addEventListener('DOMContentLoaded', () => {
    addEventListenersToIframes();
    console.log('Page loaded?');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
          addEventListenersToIframes();
          console.log('Added listener to new iframe');
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
});
*/
  
// Straight up stealing the following from another extension for review:
/*
let copyLinkNameLastTarget = null;
document.addEventListener('contextmenu', event => {
  const eventPath = event.composedPath();
  for (const node of eventPath) {
    if (node.nodeName != null && node.nodeName.toLowerCase() === 'a') {
      copyLinkNameLastTarget = node;
      return;
    }
  }
  copyLinkNameLastTarget = null;
}, /* capture= *\/ true);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copy' && copyLinkNameLastTarget != null) {
      const copyTextArea = document.createElement('textarea');
      copyTextArea.style.opacity = 0;
      copyTextArea.value = copyLinkNameLastTarget.innerText;
      document.body.appendChild(copyTextArea);
      copyTextArea.select();
      document.execCommand('copy', /* showUI= *\/ false, /* value= *\/ null);
      document.body.removeChild(copyTextArea);
    }
    sendResponse();
  });
*/
