chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['verificar.js']  // Esto asume que tienes un archivo 'popup.js' que maneja la lógica desde el popup
    });
  });
  