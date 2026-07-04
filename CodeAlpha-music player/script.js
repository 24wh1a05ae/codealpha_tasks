// ================================
// SONG LIST
// ================================

const songs = [

{
    title: "Believer",
    artist: "Imagine Dragons",
    src: "songs/song1.mp3",
    cover: "images/image2.jpg"
},

{
    title: "Slut Me Out",
    artist: "Lana Del Rey",
    src: "songs/song2.mp3",
    cover: "images/image3.jpg"
},
{
    title: "Blue",
    artist: "Yung Kai",
    src: "songs/song5.mp3",
    cover: "images/image5.jpg"
},

];

// ================================
// ELEMENTS
// ================================

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");

const current = document.getElementById("current");

const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const volumeValue = document.getElementById("volumeValue");

const playlist = document.getElementById("playlist");

const search = document.getElementById("search");

const shuffleBtn = document.getElementById("shuffle");

const repeatBtn = document.getElementById("repeat");

// ================================

let currentSong = 0;

let isPlaying = false;

let shuffle = false;

let repeat = false;

// ================================
// LOAD SONG
// ================================

function loadSong(index){

    const song = songs[index];

    title.textContent = song.title;

    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.src;

    highlightSong();

}

// ================================
// PLAY SONG
// ================================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("rotate");

}

// ================================
// PAUSE
// ================================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("rotate");

}

// ================================
// PLAY BUTTON
// ================================

playBtn.onclick = ()=>{

    if(isPlaying){

        pauseSong();

    }else{

        playSong();

    }

};

// ================================
// NEXT
// ================================

nextBtn.onclick = ()=>{

    if(shuffle){

        currentSong =
        Math.floor(Math.random()*songs.length);

    }else{

        currentSong++;

        if(currentSong>=songs.length){

            currentSong=0;

        }

    }

    loadSong(currentSong);

    playSong();

};

// ================================
// PREVIOUS
// ================================

prevBtn.onclick=()=>{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

playSong();

};
// ========================================
// CREATE PLAYLIST
// ========================================

function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <img src="${song.cover}">
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;

        li.addEventListener("click", () => {

            currentSong = index;

            loadSong(currentSong);

            playSong();

        });

        playlist.appendChild(li);

    });

}

createPlaylist();

// ========================================
// HIGHLIGHT CURRENT SONG
// ========================================

function highlightSong(){

    const items = playlist.querySelectorAll("li");

    items.forEach((item,index)=>{

        item.classList.toggle("active",index===currentSong);

    });

}

// ========================================
// PROGRESS BAR
// ========================================

audio.addEventListener("timeupdate",()=>{

    const percent =
    (audio.currentTime/audio.duration)*100 || 0;

    progress.value = percent;

    current.textContent = formatTime(audio.currentTime);

    duration.textContent = formatTime(audio.duration);

});

// ========================================
// SEEK
// ========================================

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value/100)*audio.duration;

});

// ========================================
// FORMAT TIME
// ========================================

function formatTime(time){

    if(isNaN(time)) return "0:00";

    const min = Math.floor(time/60);

    const sec = Math.floor(time%60);

    return `${min}:${sec<10?"0":""}${sec}`;

}

// ========================================
// VOLUME
// ========================================

volume.addEventListener("input",()=>{

    audio.volume = volume.value/100;

    volumeValue.textContent =
    volume.value + "%";

});

// ========================================
// SEARCH SONGS
// ========================================

search.addEventListener("keyup",()=>{

    const value =
    search.value.toLowerCase();

    const items =
    playlist.querySelectorAll("li");

    items.forEach((item)=>{

        const text =
        item.innerText.toLowerCase();

        item.style.display =
        text.includes(value) ? "flex":"none";

    });

});

// ========================================
// SHUFFLE
// ========================================

shuffleBtn.onclick=()=>{

    shuffle=!shuffle;

    shuffleBtn.style.color=
    shuffle ? "#7c3aed":"white";

};

// ========================================
// REPEAT
// ========================================

repeatBtn.onclick=()=>{

    repeat=!repeat;

    audio.loop=repeat;

    repeatBtn.style.color=
    repeat ? "#7c3aed":"white";

};

// ========================================
// AUTO NEXT
// ========================================

audio.addEventListener("ended",()=>{

    if(repeat){

        playSong();

        return;

    }

    if(shuffle){

        currentSong=
        Math.floor(Math.random()*songs.length);

    }

    else{

        currentSong++;

        if(currentSong>=songs.length){

            currentSong=0;

        }

    }

    loadSong(currentSong);

    playSong();

});

// ========================================
// LOCAL STORAGE
// ========================================

window.addEventListener("beforeunload",()=>{

    localStorage.setItem(
        "song",
        currentSong
    );

    localStorage.setItem(
        "volume",
        volume.value
    );

});

window.addEventListener("load",()=>{

    currentSong =
    Number(localStorage.getItem("song")) || 0;

    volume.value =
    localStorage.getItem("volume") || 100;

    audio.volume = volume.value/100;

    volumeValue.textContent =
    volume.value+"%";

    loadSong(currentSong);

});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(isPlaying){

            pauseSong();

        }

        else{

            playSong();

        }

    }

    if(e.code==="ArrowRight"){

        nextBtn.click();

    }

    if(e.code==="ArrowLeft"){

        prevBtn.click();

    }

});

// ========================================
// INITIAL LOAD
// ========================================

loadSong(currentSong);