chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'checkDomain') {
      const url = new URL(sender.tab.url);
      const domain = url.hostname;
  
      chrome.storage.sync.get(['pausedDomains'], function(data) {
        const pausedDomains = data.pausedDomains || {};
        const isPaused = pausedDomains[domain];
        sendResponse({ isPaused });
      });
  
      // This is necessary to allow async sendResponse
      return true;
    }
  });