// Get Searched Text

const searchSong = () => {
    const searchedText = document.getElementById('search-field').value;
    const url = ` https://api.lyrics.ovh/suggest/${searchedText}`;
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySong(data.data))
        .catch(error =>  displayError('Sorry ! I failed to load data! Try again later!'))
}

// Using async await
// const searchSong = async () => {
//     const searchedText = document.getElementById('search-field').value;
//     const url = ` https://api.lyrics.ovh/suggest/${searchedText}`;
//     // load data
//     const res = await fetch(url)
//     const data = await res.json()
//     displaySong(data.data)
// }

const displaySong = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = `single-result row align-items-center my-3 p-3`;
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick = "getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv);
    });
}

// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
// }

// doing same as above commented out code using call back function //async and await

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayLyrics(data.lyrics)
    }
    catch(error){
        displayError("I couldn't find any lyrics!");
    }
}

const displayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerHTML = '';
    lyricsDiv.innerText = lyrics;
}

const displayError = error=> {
    const errorContainer = document.getElementById("error-message");
    errorContainer.innerText = error;

}