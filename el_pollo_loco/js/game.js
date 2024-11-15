let canvas;
let world;
let keyboard = new Keyboard;
let background_music = new Audio('audio/background_music.mp3');
soundOn = false;

function returnToMainMenu(){
    window.location.href = 'index.html';
}

function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);

}

screen.orientation.addEventListener("change", () => {
    checkMobileDevice();
})

window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    let portrait = e.matches;
    let screenDialog = document.getElementById('screen_dialog');
    if (portrait) {
        screenDialog.style.display = "flex";
    } else {
        screenDialog.style.display = "none";
    }
});

function isMobile(){
    return navigator.maxTouchPoints > 0 && /Android|iPhone/i.test(navigator.userAgent);
}

function checkMobileDevice(){
    if (this.isMobile()){
      document.getElementById("menu_icons").classList.remove('d-none');
      document.getElementById("logo").classList.add("d-none");
      document.getElementById("title").classList.add('d-none');
      document.getElementById("main_menu_buttons").style.display = "none";
      document.getElementById("main_menu_mute").classList.add('d-none');
    } else {
        document.getElementById("menu_icons").classList.add('d-none');
        document.getElementById("title").classList.remove('d-none')
        document.getElementById("logo").classList.remove('d-none');;
        document.getElementById("main_menu_buttons").style.display = "block";
        document.getElementById("main_menu_mute").classList.remove('d-none');
    }
  }

document.addEventListener('DOMContentLoaded', () => {
    let mobileLeft = document.getElementById("mobileLeft");
    let mobileRight = document.getElementById("mobileRight");
    let mobileJump = document.getElementById('mobileJump');
    let mobileThrow = document.getElementById("mobileThrow");
    let homeButton = document.getElementById("homeButton");

    homeButton.addEventListener('click', () => {
        returnToMainMenu();
    })
    
    mobileLeft.addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    });
    mobileRight.addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    });
    mobileJump.addEventListener('touchstart', () => {
        keyboard.UP = true;
    });
    mobileThrow.addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    });
    
    mobileLeft.addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });
    mobileRight.addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });
    mobileJump.addEventListener('touchend', () => {
        keyboard.UP = false;
    });
    mobileThrow.addEventListener('touchend', () => {
        keyboard.SPACE = false;
        world.canThrow = true;
    });
})




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
        world.canThrow = true;
    }

    if (e.keyCode == 68){
        keyboard.D = false;
        
    }
});


function startGame(){
    document.getElementById("main_picture").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    document.getElementById("start_game").classList.add("d-none");
    document.getElementById("pause_game").classList.remove("d-none");
    initLevel();
    init();
    
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

function openGameFullscreen(){
    let fullscreen = document.getElementById("fullscreen");
    openFullscreen(fullscreen);
}

function closeGameFullscreen(){
    let fullscreen = document.getElementById("fullscreen");
    closeFullscreen(fullscreen);
    fullscreen.style.width = "100%";
    fullscreen.style.height = "100%";
    
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen(document) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }



