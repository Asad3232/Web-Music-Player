let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
{
	name: "Filhal 2",
	artist: "B praak",
	image: "image/image1.jpeg",
	path: "Music/music1.mp3"
},
{
	name: "Tadap",
	artist: "Arijit Singh",
	image: "image/image2.jpeg",
	path: "Music/music2.mp3"
},
{
	name: "Dhokha",
	artist: "Arijit Singh",
	image: "image/image3.jpeg",
	path: "Music/music3.mp3",
},
{
	name: "Dil Jaaniye",
	artist: "Jubin Nautiyal",
	image: "image/image4.jpeg",
	path: "Music/music4.mp3",
},
{
	name: "Dil me ho tum ",
	artist: "Aarman Malik",
	image: "image/image5.jpeg",
	path: "Music/music5.mp3",
},
{
	name: "Phulkaari",
	artist: "Karan Randhawa",
	image: "image/image6.jpeg",
	path: "Music/music6.mp3",
},
{
	name: "Taroon ke shehar",
	artist: "Neha Kakkar",
	image: "image/image7.jpeg",
	path: "Music/music7.mp3",
},
{
	name: "Bura haal",
	artist: "carry on jaata 3",
	image: "image/image8.jpeg",
	path: "Music/music8.mp3",
},
{
	name: "Sher",
	artist: "Singha",
	image: "image/image9.jpeg",
	path: "Music/music9.mp3",
},
{
	name: "8 Parche",
	artist: "Baani Sandhu",
	image: "image/image10.jpeg",
	path: "Music/music10.mp3",
},
{
	name: "Jee Karda",
	artist: "Chad Crouch",
	image: "image/image11.jpeg",
	path: "Music/music11.mp3",
},
{
	name: "Guilty",
	artist: "Inder Chahal",
	image: "image/image12.jpeg",
	path: "Music/music12.mp3",
},
{
	name: "Mere dil ko dua",
	artist: "Kishore Kumar",
	image: "image/image13.jpeg",
	path: "Music/music13.mp3",
},
];

function loadTrack(track_index) {
    
    clearInterval(updateTimer);
    resetValues();
    
    curr_track.src = track_list[track_index].path;
    curr_track.load();
   
    track_art.style.backgroundImage = 
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = 
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    updateTimer = setInterval(seekUpdate, 1000);
 
    curr_track.addEventListener("ended", nextTrack);
    
    random_bg_color();
    }
    
    function random_bg_color() {
    
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
  
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
  
    document.body.style.background = bgColor;
    }
    
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {

    if (!isPlaying) playTrack();
    else pauseTrack();
    }
        
    function playTrack() {
    
            curr_track.play();
        isPlaying = true;
        
        
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        
        curr_track.pause();
        isPlaying = false;
      
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
     
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
       
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        loadTrack(track_index);
        playTrack();
        }

        
function seekTo() {
            
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
               
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
             
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }


loadTrack(track_index);

