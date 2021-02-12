
function newGame(){
    window.location = './level.html'
}

function exit(){
    window.location = './index.html';
}


function about() {
    window.location = "./about.html"
    
}
function score() {
    window.location = "./score.html"
    
}


var audio = document.getElementById("song");

function playSong () {
    return audio.paused ? audio.play() : audio.pause();
}