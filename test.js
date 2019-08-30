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
    
    {video:"motorcycle", src:"video/motorcycle.mp4", title:"testVideo"}
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
        progress.style.width = width;      // set progessbar width by %;
    }
    else if(videoWidthContainer.style.display === "block"){
        var width = window.getComputedStyle(videoWidthContainer, null)["width"]; // % to PX
        widthClean = parseInt(width.split(-2)); //remove px, and string to number 
        videoProgress.style.width = width;      // set progessbar width by %;
    }
    return (widthClean);
}



//---------------AUDIO PLAYER-------------------------
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
            liTest.textContent ="TRACK: " + playlist.songList[i].title;
            liTest.addEventListener("click", playMe);
            ulTest.appendChild(liTest);
            audioList.appendChild(ulTest);
        }
    }

    
    // Select Song from list
    function playMe(){
        // Get Btns
   
        // Get title from list
        var clicked = this.innerHTML.slice(7, this.innerHTML.length);
        
        // Search For match
        var result = playlist.songList.filter(function(clickedSong){
            // Check cardnames
            if (clickedSong.title.includes(clicked)){
                return(clickedSong.title.includes(clicked));
            }
            
        })

        
        soundT.src = result[0].src;
        var play = document.getElementById("playbtn");
        play.style.backgroundImage = "url(img/Play.svg)";
        
        
        
        // SHOW TRACK INFO
        var albumArt = document.getElementById("albumArt");
        var artistName = document.getElementById("artistName");
        var songName = document.getElementById("songName");

        albumArt.setAttribute("src", result[0].albumArt);
        artistName.innerHTML = result[0].artist;
        songName.innerHTML = result[0].title + " - ";
        videoContainer.style.display = "none";
        audiContainer.style.display = "block";
        getWidth();
        
        
        //return(songInfo = result);
    
        
    }

        



 
    var play = document.getElementById("playbtn");
    play.addEventListener("click", playSong);
    function playSong(){
        if(soundT.paused === false){
            soundT.pause();
            play.style.backgroundImage = "url(img/Play.svg)";
            window.clearInterval(updateCurrent);
        }
    
        else{
            soundT.play();
            play.style.backgroundImage = "url(img/Pause.svg)";
            var updateCurrent = setInterval(timer, 500);
        }
    }

    // Next & back one song.
    var nextbtn = document.getElementById("nextbtn");
    var backbtn = document.getElementById("backbtn");
    nextbtn.addEventListener("click", nextT);
    backbtn.addEventListener("click", backT);
    var count = 0;
    function nextT(){
        if (count <= 1) {
            count++;
            var indexSong = count;
            var result = playlist.songList[indexSong];
            soundT.src = result.src;
            soundT.play();
            play.style.backgroundImage = "url(img/Pause.svg)";
        } 
        else if (count >= playlist.songList.length-1) {
            count = 0;
        }
        // minus one to fix index.
        var indexSong = count;
        var result = playlist.songList[indexSong];
        soundT.play();
        play.style.backgroundImage = "url(img/Pause.svg)";

        
        // SHOW TRACK INFO
        var albumArt = document.getElementById("albumArt");
        var artistName = document.getElementById("artistName");
        var songName = document.getElementById("songName");

        albumArt.setAttribute("src", result.albumArt);
        artistName.innerHTML = result.artist;
        songName.innerHTML = result.title + " - ";
       
        
    }

    function backT(){
        if (count >= 1) {
            count--;
            var result = playlist.songList[count];
            var play = document.getElementById("playbtn");
            play.style.backgroundImage = "url(img/Play.svg)";
        } 
        else if (count <= 3){
            count = 0;
            var result = playlist.songList[count];
            var play = document.getElementById("playbtn");
            play.style.backgroundImage = "url(img/Play.svg)";
        }
    
        // SHOW TRACK INFO
        var albumArt = document.getElementById("albumArt");
        var artistName = document.getElementById("artistName");
        var songName = document.getElementById("songName");

        albumArt.setAttribute("src", result.albumArt);
        artistName.innerHTML = result.artist;
        songName.innerHTML = result.title + " - ";
   
    
        return(soundT.src = result.src);
    }

    // SHOW LENGTH OF TRACK
    var duration = document.getElementById("time");
    soundT.addEventListener("loadedmetadata", function(){
        var minutes = parseInt(soundT.duration/60);
        var seconds = parseInt(soundT.duration%60);
        if (seconds < 10){
            duration.innerHTML = minutes + ":0" + seconds;
        }
        else{
        duration.innerHTML = minutes + ":" + seconds; 
        }
    })
    
    // SHOW TIME IN TRACK   
    var currentTime = document.getElementById("currentTime");
    var realtimeProgress = document.getElementById("realtimeProgress");
    function timer(){
        if(soundT.ended === false){
            var currentMinutes = parseInt(soundT.currentTime/60);
            var currentSeconds = parseInt(soundT.currentTime%60);
            if(currentSeconds < 10){
                currentTime.innerHTML = currentMinutes + ":0" + currentSeconds;
            }
            else{
                currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
            }
            // SHOW PROGRESS
            var progressCalc = parseInt(soundT.currentTime*widthClean/soundT.duration);
            realtimeProgress.style.width = progressCalc + "px";
        
        }
        else{
            currentTime.innerHTML = "0:00"; // reset timer to zero after song has ended.
            play.style.backgroundImage = "url(img/Play.svg)";
        }
    
    }


    // -----------VIDEO PLAYER -----------
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
        return(clickedVideo = videoIndex);//DELETE?
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
            var updateVideo = setInterval(videoTimer, 500);
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
        var seconds = parseInt(videoFrame.duration%60);
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
            var currentSeconds = parseInt(videoFrame.currentTime%60);
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
