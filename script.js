const player = document.querySelector('.player');
const songBG = document.querySelector('.song-bg');
const audio = document.querySelector('#song');
const songTitle = document.querySelector('.song-title');
const proggressOuter = document.querySelector('.play-proggress-container');
const proggressInner = document.querySelector('.proggress-inner');
const playInterface = document.querySelector('.play-interface');
const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
const play = document.querySelector('.play-btn');


// temp i hope
const songs = ['acoustic', 'illusion', 'oft', 'sadistic_summer'];

let songIndex = parseInt(Math.random() * songs.length, 10);




function loadSong(song) {
    songTitle.innerText = song;
    audio.src = `./audio/${song}.flac`;

}

function pauseSong() {
    player.classList.remove('play');
    play.children[0].src = `/static/play.svg`;
    audio.pause();
}

function playSong() {
    player.classList.add('play');
    play.children[0].src = `/static/pause.svg`;
    audio.play();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProggress(e) {
    const { currentTime, duration } = e.srcElement;
    const proggressPercent = (currentTime / duration * 100).toFixed(2);
    proggressInner.style.width = `${proggressPercent}%`
}

function setProggress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = clickX / width * duration;
    playSong();
}



loadSong(songs[songIndex]);


play.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else { playSong(); }
});
prev.addEventListener('click', () => {
    prevSong();
});
next.addEventListener('click', () => {
    nextSong();
});


audio.addEventListener('timeupdate', updateProggress);
proggressOuter.addEventListener('click', setProggress);
audio.addEventListener('ended', nextSong);