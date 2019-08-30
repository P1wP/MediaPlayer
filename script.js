// PLAYLIST
var playlist = {
songList:[
  {song_1:"fun", src:"music/bensound-funnysong.mp3", 
   artist:"Benjamin Tissot", title:"Funny Song", 
   albumArt:"img/funnysong.jpg"},
    
  {song_2:"rock", src:"music/bensound-highoctane.mp3", 
   artist:"Benjamin Tissot", title:"High Octane", 
   albumArt:"img/highoctane.jpg"},
    
  {song_3:"dub", src:"music/bensound-dubstep.mp3", 
   artist:"Benjamin Tissot", title:"Dubstep", 
   albumArt:"img/dubstep.jpg"}
],
    
videoList:[
    {video:"dog", src:"video/dog.mp4", title:"DogVideo"},
    
    {video:"motorcycle", src:"video/motorcycle.mp4", title:"MotorcycleVideo"},
    
    {video:"cow", src:"video/cows.mp4", title:"CowsVideo"},
    
    {video:"TestVideo", src:"video/motorcycle.mp4", title:"testVideo"} // THIS IS ONLY A TEST
    ]
}


//GET WIDTH OF CONTAINER
var widthContainer = document.getElementById("container");
var progress = document.getElementById("progressBar");
var videoWidthContainer = document.getElementById("videoContainer");
var videoProgress = document.getElementById("vidBar");

window.addEventListener("resize", getWidth);    //check if window is resized
var widthClean = "";
function getWidth(){
    if (widthContainer.style.display === "block"){
        var width = window.getComputedStyle(widthContainer, null)["width"]; // % to PX
        widthClean = parseInt(width.split(-2)); //remove px, and string to number 
        progress.style.width = width;      // set progessbar width;
    }
    else if(videoWidthContainer.style.display === "block"){
        var width = window.getComputedStyle(videoWidthContainer, null)["width"]; // % to PX
        widthClean = parseInt(width.split(-2)); //remove px, and string to number 
        videoProgress.style.width = width;      // set progessbar width;
    }
    return (widthClean);
}



 /* ==============================================
        -----------AUDIO PLAYER -----------
    ==============================================*/

var soundT = new Audio()        // AUDIO
var audioList = document.getElementById("audioSet");
var audiContainer = document.getElementById("container"); // used later to hide audioPlayer
var videoContainer = document.getElementById("videoContainer");    // used later to hide VideoPlayer  

    makeList();

    //AUDIO
    function makeList() {
        for(var i = 0; i<playlist.songList.length; i++){
            var trackSource = playlist.songList[i].src;
            var liTest = document.createElement("li");
            var ulTest = document.createElement("ul");
            liTest.setAttribute("id", "audio_"+i);
            liTest.textContent = playlist.songList[i].title;
            liTest.addEventListener("click", playMe);
            ulTest.appendChild(liTest);
            audioList.appendChild(ulTest);
        }
    }

    
    // Select Song from list
    var albumArt = document.getElementById("albumArt");
    var artistName = document.getElementById("artistName");
    var songName = document.getElementById("songName");
    var clickedAudio = "";  // used for next/back btns
    function playMe(){
        var audioIndex = parseInt(this.id.slice(6));
        console.log(audioIndex);
        soundT.src = playlist.songList[audioIndex].src;
        videoContainer.style.display = "none";
        audiContainer.style.display = "block";
        getWidth();
        
        // SHOW TRACK INFO
        albumArt.setAttribute("src", playlist.songList[audioIndex].albumArt);
        artistName.innerHTML = playlist.songList[audioIndex].artist;
        songName.innerHTML = playlist.songList[audioIndex].title + " - ";
        videoContainer.style.display = "none";
        audiContainer.style.display = "block";
        getWidth();
        return(clickedAudio = audioIndex); // used for next/back btns    
    }

        
    var play = document.getElementById("playbtn");
    play.addEventListener("click", playSong);
    function playSong(){
        if(soundT.paused === false){
            soundT.pause();
            play.style.backgroundImage = "url(img/Play.svg)";
            window.clearInterval(updateCurrent);                //STOP UPDATE OF TIMER
        }
        else if(soundT.ended === true){
            play.style.backgroundImage = "url(img/Play.svg)";
        }
    
        else{
            soundT.play();
            play.style.backgroundImage = "url(img/Pause.svg)";
            var updateCurrent = setInterval(timer, 100);        // UPDATE TIMER()
        }
    }

    // Next & back one song.
    var nextbtn = document.getElementById("nextbtn");
    var backbtn = document.getElementById("backbtn");
    nextbtn.addEventListener("click", nextAudio);
    backbtn.addEventListener("click", backAudio);
    
    function nextAudio(){
        clickedAudio++;
        if (clickedAudio >= playlist.songList.length) {
            clickedAudio = 0;
            soundT.src = playlist.songList[clickedAudio].src;
            play.style.backgroundImage = "url(img/Play.svg)";
            soundT.pause();
        } 
        else{
            soundT.src = playlist.songList[clickedAudio].src;
            play.style.backgroundImage ="url(img/Pause.svg)";
            soundT.play();
        }
        
        // SHOW TRACK INFO
        albumArt.setAttribute("src", playlist.songList[clickedAudio].albumArt);
        artistName.innerHTML = playlist.songList[clickedAudio].artist;
        songName.innerHTML = playlist.songList[clickedAudio].title + " - ";
       
        
    }

    function backAudio(){
        clickedAudio--;
        if (clickedAudio <= 0) {
            clickedAudio = 0;
            soundT.src = playlist.songList[clickedAudio].src;
            play.style.backgroundImage = "url(img/Play.svg)";
            soundT.pause();
        } 
        else{
            soundT.src = playlist.songList[clickedAudio].src;
            play.style.backgroundImage = "url(img/Pause.svg)";
            soundT.play();
        }
    
        // SHOW TRACK INFO
        albumArt.setAttribute("src", result.albumArt);
        artistName.innerHTML = result.artist;
        songName.innerHTML = result.title + " - ";

    }

    // SHOW LENGTH OF TRACK
    var durationSong = document.getElementById("time");
    soundT.addEventListener("loadedmetadata", function(){
        var minutes = parseInt(soundT.duration/60);     // divide seconds by 60 to get minutes. 
        var getSeconds = soundT.duration/60 - Math.floor(soundT.duration/60);
        var seconds = parseInt(getSeconds*60);
        console.log("minutes " + minutes);
        console.log("seconds " + seconds);
        if (seconds < 10){
            durationSong.innerHTML = minutes + ":0" + seconds;
        }
        else{
        durationSong.innerHTML = minutes + ":" + seconds; 
        }
    })
    
    // SHOW TIME IN TRACK   
    var timePlayed = document.getElementById("currentTime");
    var realtimeProgress = document.getElementById("realtimeProgress");
    function timer(){
        if(soundT.ended === false){
            var currentMinutes = parseInt(soundT.currentTime/60);
            var getCurrentSeconds = soundT.currentTime/60 - Math.floor(soundT.currentTime/60);
            var currentSeconds = parseInt(getCurrentSeconds*60);
            if(currentSeconds < 10){
                timePlayed.innerHTML = currentMinutes + ":0" + currentSeconds;
            }
            else{
                timePlayed.innerHTML = currentMinutes + ":" + currentSeconds;
            }
            // SHOW PROGRESS
            var progressCalc = parseInt(soundT.currentTime*widthClean/soundT.duration);  
            /* playd = 120
            width = 640
            fulltime = 500
                                                                                            
            playd*width/fulltime = 153

            153 of 640 px should be filled
            */
            realtimeProgress.style.width = progressCalc + "px";
        
        }
        else{
            timePlayed.innerHTML = "0:00"; // reset timer to zero after song has ended.
            play.style.backgroundImage = "url(img/Play.svg)";
            nextAudio();
        }
    
    }


    /* ==============================================
            -----------VIDEO PLAYER -----------
       ==============================================*/

    var videoList = document.getElementById("videoSet");


    makeVideoList();

    // VIDEO
    function makeVideoList() {
        for(var i = 0; i<playlist.videoList.length; i++){
            var Source = playlist.videoList[i].src;
            var liTest = document.createElement("li");
            var ulTest = document.createElement("ul");
            liTest.setAttribute("id", "video_"+i);
            liTest.textContent = playlist.videoList[i].title.slice(0,-5);
            liTest.addEventListener("click", selectThisVideo);
            ulTest.appendChild(liTest);
            videoList.appendChild(ulTest);
        }
    }
    
    // get Clicked video
    var videoFrame = document.getElementById("video");
    var clickedVideo = "";
    function selectThisVideo(){
        var videoIndex = parseInt(this.id.slice(6));
        videoFrame.setAttribute("src", playlist.videoList[videoIndex].src);
        videoContainer.style.display = "block";
        audiContainer.style.display = "none";
        getWidth();
        return(clickedVideo = videoIndex);
    }

    // Play Video
    var playPauseBtn = document.getElementById("vidPlayPause");
    playPauseBtn.addEventListener("click", playPauseVideo);
    function playPauseVideo(){
        if (videoFrame.paused === false){
            videoFrame.pause();
            playPauseBtn.style.backgroundImage = "url(img/Play.svg)";
            window.clearInterval(updateVideo);
        }
        else if(videoFrame.ended === true){
            playPauseBtn.style.backgroundImage = "url(img/Play.svg)";
        }
        else{
            videoFrame.play();
            playPauseBtn.style.backgroundImage = "url(img/Pause.svg)";
            var updateVideo = setInterval(videoTimer, 100);
        }
        
    }

    // Next Video
    var vidNext = document.getElementById("vidNext");
    vidNext.addEventListener("click", nextVideo);
    function nextVideo(){
        clickedVideo++;
        if(clickedVideo >= playlist.videoList.length){
            clickedVideo = 0;
            videoFrame.setAttribute("src", playlist.videoList[clickedVideo].src);
            playPauseBtn.style.backgroundImage = "url(img/Play.svg)";
            videoFrame.pause();
        }
        else{
            videoFrame.setAttribute("src", playlist.videoList[clickedVideo].src);
            playPauseBtn.style.backgroundImage = "url(img/Pause.svg)";
            videoFrame.play();  
        }
        
    }

    // Back Video
    var vidBack = document.getElementById("vidBack");
    vidBack.addEventListener("click", backVideo);
    function backVideo(){
        clickedVideo--;
        if(clickedVideo <= 0){
            clickedVideo = 0;
            videoFrame.setAttribute("src", playlist.videoList[clickedVideo].src);
            playPauseBtn.style.backgroundImage = "url(img/Play.svg)";
            videoFrame.pause();
        }
        else{
            videoFrame.setAttribute("src", playlist.videoList[clickedVideo].src);
            playPauseBtn.style.backgroundImage = "url(img/Pause.svg)";
            videoFrame.play();
        }
        
    }
    
    // Video Length
    var videoLength = document.getElementById("videoLength");
    videoFrame.addEventListener("loadedmetadata", function(){
        var minutes = parseInt(videoFrame.duration/60);
        var getSeconds = videoFrame.duration/60 - Math.floor(videoFrame.duration/60);
        var seconds = parseInt(getSeconds*60);
        videoLength.innerHTML = minutes + ":" +seconds;
        if(minutes < 10){
            videoLength.innerHTML = "0" + minutes + ":" +seconds;
        }
        if(seconds < 10){
            videoLength.innerHTML = "0" + minutes + ":0" +seconds;
        }
    })

    // Video Timer
   // SHOW TIME IN TRACK   
    var currentTimeVideo = document.getElementById("videoTimePlayed");
    var realtimeVideo = document.getElementById("vidProg");
    function videoTimer(){
        if(videoFrame.ended === false){
            var currentMinutes = parseInt(videoFrame.currentTime/60);
            var getCurrentSeconds = videoFrame.currentTime/60 - Math.floor(videoFrame.currentTime/60);
            var currentSeconds = parseInt(getCurrentSeconds*60);
            if(currentMinutes < 10){
                currentTimeVideo.innerHTML = "0" + currentMinutes + ":" +currentSeconds;
            }
            if(currentSeconds < 10){
                currentTimeVideo.innerHTML = "0" + currentMinutes + ":0" +currentSeconds;
            }
            // SHOW PROGRESS
            var progressCalc = parseInt(videoFrame.currentTime*widthClean/videoFrame.duration);
            realtimeVideo.style.width = progressCalc + "px";
        }
        else{
            currentTimeVideo.innerHTML = "0:00"; // reset timer to zero after song has ended.
            playPauseBtn.style.backgroundImage = "url(img/Play.svg)";
            nextVideo();// START NEXT VIDEO
        }
    
    }
    





getWidth(); // Get initial window with

//--------------END AUDIO PLAYER -------------------------
/* 
TO DO

Add "drag" on progressbar.


*/
