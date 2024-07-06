// Create a popup div and style it
function createPopup() {
  const popup = document.createElement('div');
  popup.id = 'alt-popup';
  //popup.style.position = 'absolute';
  popup.classList.add("pd-absolute");
  popup.classList.add("pd-w-96");
  popup.classList.add("pd-bg-white");
  popup.classList.add("pd-border");
  popup.classList.add("pd-border-solid");
  popup.classList.add("pd-border-blue-300");
  popup.classList.add("pd-p-2.5");
  popup.classList.add("pd-z-50");
  popup.classList.add("pd-shadow-lg");
  popup.classList.add("pd-hidden"); // Initially hidden
  popup.classList.add("pd-rounded-lg"); // Rounded corners
  document.body.appendChild(popup);

  // Event listener to close the popup when clicking outside of it
  document.addEventListener('click', function(event) {
    if (event.target !== popup && !popup.contains(event.target)) {
      popup.classList.add("pd-hidden");
      //console.log("working...");
    }
  });

  // Prevent the popup from closing when clicking inside it
  popup.addEventListener('click', function(event) {
    event.stopPropagation();
  });
}
  
// Show the popup with the word, definition, and pronunciation icon
function showPopup(word, definition, pronunciationUrl, x, y) {
  const popup = document.getElementById('alt-popup');
  popup.innerHTML = `
    ${pronunciationUrl ? `
      <audio id="pronunciation" src="${pronunciationUrl}"></audio>
      <button id="play-pronunciation" class="pd-bg-white pd-p-0 pd-mr-1 pd-cursor-pointer pd-border-0">
        <svg class="pd-fill-blue-500" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
        </svg>
      </button>`
      : ''
    }
    <span class="pd-text-blue-700 pd-text-lg"><strong>${word}</strong></span>
    <div id="copyIt" title="Copy to clipboard" class="pd-text-blue-500 pd-text-right pd-float-right pd-cursor-pointer">
      <svg id="copytoClipboard" class="pd-fill-blue-500" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/>
      </svg>
    </div>
    <br>
    <p class="pd-font-normal pd-m-0 pd-font-sans pd-text-black">${definition}</p>
    <div class="pd-text-right">
      <a href="https://www.dictionary.com/browse/${word}" target="_blank" class="pd-text-sm pd-no-underline pd-text-stone-400 hover:pd-text-slate-800">
        Dictionary.com
        <svg class="pd-fill-slate-400 pd-inline" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
        </svg>
      </a>
    </div>
  `;
  

  // Adjust popup position based on available space
  const popupWidth = popup.offsetWidth;
  const popupHeight = popup.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Calculate the absolute coordinates of the selected word
  const rect = document.getSelection().getRangeAt(0).getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const selectedWordX = rect.left + scrollLeft;
  const selectedWordY = rect.top + scrollTop;

  // Determine the optimal position of the popup relative to the selected word
  let popupX = selectedWordX + rect.width / 2 - popupWidth / 2;
  let popupY = selectedWordY + rect.height + 5; // 5px offset from the selected word

  // Adjust popup position to fit within the viewport
  if (popupX < 0) {
    popupX = 10; // Minimum left margin
  } else if (popupX + popupWidth > windowWidth) {
    popupX = windowWidth - popupWidth - 10; // Leave a little margin on the right
  }

  if (popupY + popupHeight > windowHeight) {
    popupY = selectedWordY - popupHeight - 5; // Position above the selected word
  }

  popup.style.left = popupX + 'px';
  popup.style.top = popupY + 'px';
  popup.classList.remove("pd-hidden");
  popup.classList.add("pd-block");
  
  // Add event listener to the pronunciation button
  if (pronunciationUrl) {
    document.getElementById('play-pronunciation').addEventListener('click', function() {
      document.getElementById('pronunciation').play();
    });
  }
  if (word) {
    document.getElementById('copytoClipboard').addEventListener('click', function() {
      // Copy the word
      navigator.clipboard.writeText(word);
      document.getElementById('copytoClipboard').classList.add("hidden");
      document.getElementById('copyIt').innerHTML = `
      <svg class="pd-fill-blue-500" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
      </svg>
      `;
      document.getElementById('copyIt').title = "copied!";
    });
  }
}
  
// Fetch the definition and pronunciation URL from the Free Dictionary API
async function fetchWordData(word) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if (response.ok) {
    const data = await response.json();
    const definition = data[0].meanings[0].definitions[0].definition;
    const pronunciationUrl = data[0].phonetics[0]?.audio || null;
    return { definition, pronunciationUrl };
  } else {
    throw new Error('Definition not found');
  }
}
// // Function to get the modifier key from Chrome storage
// function getModifierKey(callback) {
//   chrome.storage.sync.get('modifierKey', function(data) {
//     const modifierKey = data.modifierKey || 'Alt'; // Default to 'Alt' if not set
//     callback(modifierKey);
//   });
// }  
  
// Fetch the modifier key and set up the event listener
async function setupDoubleClickListener(modifierKey) {
  document.removeEventListener('dblclick', handleDoubleClick); // Remove the existing listener, if any

  async function handleDoubleClick(event) {
    if (event.getModifierState(modifierKey)) {
      let selectedText = window.getSelection().toString().trim();
      if (selectedText.length > 0) {
        const popup = document.getElementById('alt-popup');
        popup.style.left = event.pageX + 'px';
        const bottomSpace = window.innerHeight - event.pageY;
        if (bottomSpace > popup.offsetHeight) {
          popup.style.top = event.pageY + 'px';
        } else {
          popup.style.top = (event.pageY - popup.offsetHeight) + 'px';
        }
        popup.textContent = 'Loading...';
        popup.classList.remove("pd-hidden");
        popup.classList.add("pd-block");
        try {
          const { definition, pronunciationUrl } = await fetchWordData(selectedText);
          showPopup(selectedText, definition, pronunciationUrl, event.pageX, event.pageY);
        } catch (error) {
          popup.textContent = 'Definition not found';
        }
        event.stopPropagation(); // Prevent the click event from immediately hiding the popup
      }
    }
  }

  document.addEventListener('dblclick', handleDoubleClick);

}

// Initial setup
chrome.storage.sync.get('modifierKey', function(data) {
  const modifierKey = data.modifierKey || 'Alt'; // Default to 'Alt' if not set
  setupDoubleClickListener(modifierKey);
});

// Listen for updates to the modifier key
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'updateModifierKey') {
    setupDoubleClickListener(message.modifierKey);
  }
});
// Create the popup element when the content script loads
createPopup();
