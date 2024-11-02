const hymnListElement = document.getElementById('hymn-list');
const searchInput = document.getElementById('search');
const songDetail = document.getElementById('song-detail');
const songTitle = document.getElementById('song-title');
const songLyrics = document.getElementById('song-lyrics');
const backButton = document.getElementById('back-button');

// Function to display the hymn list
function displayHymnList(hymns) {
    hymnListElement.innerHTML = '';
    hymns.forEach(hymn => {
        const li = document.createElement('li');
        li.textContent = hymn.title;
        li.onclick = () => showSongDetail(hymn);
        hymnListElement.appendChild(li);
    });
}

// Function to show song details
function showSongDetail(hymn) {
    songTitle.textContent = hymn.title;
    songLyrics.textContent = hymn.lyrics;
    songDetail.classList.remove('hidden');
    hymnListElement.classList.add('hidden');
}

// Back button to return to the hymn list
backButton.onclick = () => {
    songDetail.classList.add('hidden');
    hymnListElement.classList.remove('hidden');
};

// Function to search hymns
searchInput.oninput = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredHymns = hymns.filter(hymn => hymn.title.toLowerCase().includes(searchTerm));
    displayHymnList(filteredHymns);
};

// Fetch the hymns from the JSON file
fetch('hymns.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(hymns => {
        // Initial display of hymns
        displayHymnList(hymns);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
