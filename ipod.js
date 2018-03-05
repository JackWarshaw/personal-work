// Create your global variables below:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];
var volNames=["vl0", "vl1", "vl2", "vl3", "vl4", "vl5"];
var currentVolume= 3;
var symbol="play_arrow";
var tic = 0;
var songPosition = 6; 
var newSongPosition = 0;
var time = 0;

function init() {
	// Creates intial environment for the player by setting the volume
	for(i=0; i<6; i++){
		volLevels[i] = document.getElementById(volNames[i]);
	}

	for(i=0; i<3; i++){
		volLevels[i].style.background = "purple";
	}
}

function volUp() {
	// Increases volume upon clicking the volume up button 
	if(currentVolume < 6){
		volLevels[currentVolume].style.background = "purple";
		currentVolume ++;
	}
}

function volDown() {
	// Decreases volume upon clicking the volume down button
	if(currentVolume > 0){
		 volLevels[currentVolume-1].style.background = "white";
		 currentVolume --;
	}
}

function switchPlay() {
	// Changes a control icon, increments the player time, and move to next song when max play time is reached

	if(symbol== "play_arrow"){
		symbol="pause";
		document.getElementById("playOrPause").innerHTML = "pause";
		
		time = document.getElementById("player-time").value;
		time = setInterval(bySecond, 1000);
		
		function bySecond(){
			document.getElementById("player-time").stepUp(1);

			var x = document.getElementById("player-time").value;

			document.getElementById("time-elapsed").innerHTML = secondsToMs(x);

			if (document.getElementById("player-time").value == document.getElementById("player-time").max){
				nextSong();
				document.getElementById("time-elapse").value = 0;
			}

		}
	}

	else{
		symbol="play_arrow";
		document.getElementById("playOrPause").innerHTML = "play_arrow";
		clearInterval(time);
		setInterval(bySecond, 1000);
		function bySecond(){

			var x = document.getElementById("player-time").value;

			document.getElementById("time-elapsed").innerHTML = secondsToMs(x);
		}
	}
	
}


function nextSong() {
	// Skips to next song
	document.getElementById("time-elapsed").innerHTML = "0:00";
	document.querySelector("input[type=range]").value = 0;

	for(i=0; i<10; i++){
		if(tracklist[i] == document.getElementById("player-song-name").innerHTML){
			songPosition = i;
		}
	}

	if (songPosition == 9){
		newSongPosition = 0;
	}
	else{
		newSongPosition = songPosition + 1;
	}
	document.getElementById("player-song-name").innerHTML = tracklist[newSongPosition];
	
}

function prevSong() {
	// Rewinds to previous song
	document.getElementById("time-elapsed").innerHTML = "0:00";
	document.querySelector("input[type=range]").value = 0;
	for(i=0; i<10; i++){
		if(document.getElementById("player-song-name").innerHTML == tracklist[i]){
			songPosition = i;
		}
	}
	if (songPosition == 0){
		newSongPosition = 9;
	}
	else{
		newSongPosition = songPosition - 1;
	}
	document.getElementById("player-song-name").innerHTML = tracklist[newSongPosition];
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();