let canvas;
let world;
let keyboard = new Keyboard;
let background_music = new Audio('audio/background_music.mp3');
soundOn = true;


function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);

}

window.addEventListener('keydown', (e) =>{
    console.log(e);
    if (e.keyCode == 39){
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37){
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38){
        keyboard.UP = true;
    }

    if (e.keyCode == 40){
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32){
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68){
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) =>{
    if (e.keyCode == 39){
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37){
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38){
        keyboard.UP = false;
    }

    if (e.keyCode == 40){
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32){
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68){
        keyboard.D = false;
        world.canThrow = true;
    }
});


function startGame(){
    document.getElementById("main_picture").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    initLevel();
    init();
    startMusic();
}

function restartGame(){
    document.getElementById("endgame_dialog").style.display = "none";
    startGame();
}

function loadMainPage(){
    window.location.assign("index.html");
}

function stopGame(){
        clearAllIntervals();
        showEndGameDialog();
}

function showControls(){
    document.getElementById("control_dialog").style.display = "flex";
}

function showEndGameDialog(){
    document.getElementById("endgame_dialog").style.display = "flex";
}

function closeControls(){
    document.getElementById("control_dialog").style.display = "none";
    document.getElementById("dialog_content").addEventListener("click", function(event){
        event.preventDefault()
      });
}

function doNotClose(event){
    event.stopPropagation();
}

function clearAllIntervals(){
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function startMusic(){
    soundOn = true;
    background_music.muted = false;
    checkOnMusic();
    
}

function checkOnMusic(){
    if (soundOn === true) {
        background_music.autoplay;
        background_music.loop = true;
        background_music.play();
    } else {
        background_music.muted = true;
    };
}

function stopMusic(){
    soundOn = false;
}

function mute(){
    stopMusic();
    checkOnMusic();
}

