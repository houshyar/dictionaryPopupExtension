const shortcut = document.getElementById('shortcut');
const currentShortcut = document.getElementById('current-shortcut');

// Function to get the modifier key from Chrome storage
function getModifierKey(callback) {
    chrome.storage.sync.get('modifierKey', function(data) {
      const modifierKey = data.modifierKey || 'Alt'; // Default to 'Alt' if not set
      callback(modifierKey);
    });
  }
  getModifierKey(function(modifierKey) {
    shortcut.innerHTML = modifierKey + ' + DoublClick';
    currentShortcut.innerHTML = modifierKey + ' + DoublClick';                
  });


document.addEventListener('DOMContentLoaded', function() {
    const togglePauseButton = document.getElementById('togglePauseButton');
    const togglePauseText = document.getElementById('togglePauseText');
    const pauseIcon = document.getElementById('pauseIcon');
    const settingsButton = document.getElementById('settingsButton');
    const settingsPanel = document.getElementById('settingsPanel');
    const modifierKeySelect = document.getElementById('modifierKey');
    const saveButton = document.getElementById('save');
    const backButton = document.getElementById('back');

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        const url = new URL(tab.url);
        const domain = url.hostname;

        chrome.storage.sync.get(['pausedDomains'], function(data) {
            const pausedDomains = data.pausedDomains || {};

            if (pausedDomains[domain]) {
                togglePauseText.textContent = 'Pused on this Website';
                pauseIcon.classList.add('fa-ban');

            } else {
                togglePauseText.textContent = 'Pause on this Website';
                pauseIcon.classList.add('fa-circle-pause');
            }
            
            togglePauseButton.addEventListener('click', function() {
                pausedDomains[domain] = !pausedDomains[domain];
                chrome.storage.sync.set({ pausedDomains: pausedDomains }, function() {
                  if (pausedDomains[domain]) {
                        togglePauseText.textContent = 'Paused on this Website';
                        pauseIcon.classList.remove('fa-circle-pause');
                        pauseIcon.classList.add('fa-ban');
                    } else {
                        togglePauseText.textContent = 'Pause on this Website';
                        pauseIcon.classList.remove('fa-ban');
                        pauseIcon.classList.add('fa-circle-pause');
                    }
        
                  // Reload the tab to apply changes
                  chrome.tabs.reload(tab.id);
                });
            });
        });
    });

    settingsButton.addEventListener('click', function() {
        settingsPanel.classList.toggle('pd-left-0');
        settingsPanel.classList.toggle('pd-left-80');
        //settingsPanel.classList.add('pd-p-4');
    });

    backButton.addEventListener('click', function() {
        settingsPanel.classList.toggle('pd-left-0');
        settingsPanel.classList.toggle('pd-left-80');
    });

    saveButton.addEventListener('click', function() {
        const selectedModifierKey = modifierKeySelect.value;
        chrome.storage.sync.set({ modifierKey: selectedModifierKey }, function() {
            shortcut.innerHTML = selectedModifierKey + ' + DoublClick';
            currentShortcut.innerHTML = selectedModifierKey + ' + DoublClick'; 

            // Send a message to all tabs to update the modifier key
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(function(tab) {
                chrome.tabs.sendMessage(tab.id, { action: 'updateModifierKey', modifierKey: selectedModifierKey });
                });
            });                   
        });
    });


    // Load and pre-select the saved modifier key
    chrome.storage.sync.get('modifierKey', function(data) {
        if (data.modifierKey) {
            modifierKeySelect.value = data.modifierKey;
        }
    });
});      
