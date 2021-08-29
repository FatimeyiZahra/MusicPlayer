const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const volumeBtn=document.getElementById("volume");

//music array
const songs = [
  {
    name: "music-1",
    displayName: "Берег",
    artist: "Влад Сташевский",
    image: "music-1",
  },
  {
    name: "music-2",
    displayName: "Shold I",
    artist: "Rilès",
    image: "music-2",
  },
  {
    name: "music-3",
    displayName: "Living life In The Night",
    artist: "Cheriimoya feat Sierra Kidd",
    image: "music-3",
  },
];

// for check music is playing or not
let isPlaying = false;

// for play the music
function playSong() {
  // .play and .pause came from html audio/video methods
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause"); //for change button icon
  playBtn.setAttribute("title", "Pause"); //for see the text when we hover cursor to button
  music.play();
}

// for stop to playing the music
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// for play or pause eveny listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update Dom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.image}.jpg`;
}

//current song
let songIndex = 0;

// for next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// for previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//for select firs song
loadSong(songs[songIndex]);

//update Progress Bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement; //duration and currentTTime came from mp3 methods-> timeupdate
    //for change progressbar width
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    //calculate display for duration
    const durationMinute = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //for dont see the NaN
    if (durationSeconds) {
      durationElement.textContent = `${durationMinute}:${durationSeconds}`;
    }
    //calculate display for current
    const currentMinute = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeElement.textContent = `${currentMinute}:${currentSeconds}`;
  }
}

function setProgressBar(e) {
  // console.log(e) //
  const width = this.clientWidth; // clientWidth came from when we click prgress bar and console log it we can see it
  const clickX = e.offsetX; //offsetX came from e
  const { duration } = music;
  music.currentTime = (clickX / width) * duration; // it ll give us which minute is it
}


//event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong); //ended event came from audio
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
