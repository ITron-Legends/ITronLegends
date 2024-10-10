function redirectToLoginPage() {
  window.location.href = "https://login.microsoft.com";
}

function searchRandomWordAndOpenEdge() {
  // Try fetching from the primary API first
  fetch('https://random-word-api.vercel.app/api?words=1')
    .then(response => response.json())
    .then(data => {
      let word = data[0];
      displayWord(word);
      openEdgeAndSearch(word);
      setTimeout(goBackToButton, 1000); // Adjusted the delay to 1 second
    })
    .catch(error => {
      console.error('Primary API failed, switching to backup:', error);
      // If primary API fails, fetch from the backup API
      fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(data => {
          let word = data[0];
          displayWord(word);
          openEdgeAndSearch(word);
          setTimeout(goBackToButton, 1000); // Adjusted the delay to 1 second
        })
        .catch(backupError => {
          console.error('Backup API failed:', backupError);
        });
    });
}

function displayWord(word) {
  const codeBlock = document.getElementById('codeBlock');
  codeBlock.textContent = word;
}

function openEdgeAndSearch(word) {
  var searchQuery = encodeURIComponent(word);
  var searchUrl = "https://www.bing.com/search?q=" + searchQuery;
  window.open(searchUrl, "_blank");
}

function goBackToButton() {
  document.getElementById('searchButton').scrollIntoView();
}
