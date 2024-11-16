let canvas;
let world;
let keyboard = new Keyboard;
let background_music = new Audio('audio/background_music.mp3');
soundOn = false;

function returnToMainMenu() {
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

function isMobile() {
    return navigator.maxTouchPoints > 0 && /Android|iPhone|iPad/i.test(navigator.userAgent);
}

function checkMobileDevice() {
    if (this.isMobile()) {
       changeToMobile();
    } else {
       changeBackFromMobile();
    }
}

function changeToMobile(){
    document.getElementById("menu_icons").classList.remove('d-none');
    document.getElementById("logo").classList.add("d-none");
    document.getElementById("title").classList.add('d-none');
    document.getElementById("main_menu_buttons").style.display = "none";
    document.getElementById("main_menu_mute").classList.add('d-none');
}

function changeBackFromMobile(){
    document.getElementById("menu_icons").classList.add('d-none');
    document.getElementById("title").classList.remove('d-none')
    document.getElementById("logo").classList.remove('d-none');;
    document.getElementById("main_menu_buttons").style.display = "flex";
    document.getElementById("main_menu_mute").classList.remove('d-none');
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

window.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
        world.canThrow = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * Starts the game by hiding the main picture, showing the canvas, and initializing the game level.
 * It also starts the background music and displays the pause button.
 */
function startGame() {
    document.getElementById("main_picture").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    document.getElementById("start_game").classList.add("d-none");
    document.getElementById("pause_game").classList.remove("d-none");
    initLevel();
    init();
    startMusic();
}

/**
 * Restarts the game by hiding any endgame dialogs and calling `startGame` to reinitialize the game.
 */
function restartGame() {
    document.getElementById("endgame_dialog").style.display = "none";
    document.getElementById("wongame_dialog").style.display = "none";
    startGame();
}

/**
 * Redirects the user to the main page (index.html).
 */
function loadMainPage() {
    window.location.assign("index.html");
}

/**
 * Stops the game by clearing all intervals and displaying the endgame dialog.
 */
function stopGame() {
    clearAllIntervals();
    showEndGameDialog();
}

/**
 * Stops the game and displays the 'you won' game dialog.
 */
function wonGame() {
    clearAllIntervals();
    showWonGameDialog();
}

/**
 * Displays the controls dialog.
 */
function showControls() {
    document.getElementById("control_dialog").style.display = "flex";
}

/**
 * Displays the credits dialog.
 */
function showCredits() {
    document.getElementById("credits_dialog").style.display = "flex";
}

/**
 * Displays the endgame dialog when the game ends.
 */
function showEndGameDialog() {
    document.getElementById("endgame_dialog").style.display = "flex";
}

/**
 * Displays the won game dialog when the player wins.
 */
function showWonGameDialog() {
    document.getElementById("wongame_dialog").style.display = "flex";
}

/**
 * Closes the controls dialog when the user clicks to close it.
 */
function closeControls() {
    document.getElementById("control_dialog").style.display = "none";
    document.getElementById("dialog_content").addEventListener("click", function (event) {
        event.preventDefault()
    });
}

/**
 * Closes the credits dialog when the user clicks to close it.
 */
function closeCredits() {
    document.getElementById("credits_dialog").style.display = "none";
    document.getElementById("credits_dialog_content").addEventListener("click", function (event) {
        event.preventDefault()
    });
}

/**
 * Prevents the event from propagating (useful for preventing dialog closure when clicking inside specific areas).
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Clears all intervals by looping through a range of possible interval IDs.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Starts the background music and un-mutes it.
 * Calls the `checkOnMusic` function to ensure proper music playback.
 */
function startMusic() {
    soundOn = true;
    background_music.muted = false;
    checkOnMusic();
}

/**
 * Checks if the music is enabled and starts or stops it accordingly.
 * Also updates the UI button states based on whether music is enabled.
 */
function checkOnMusic() {
    if (soundOn === true) {
        background_music.autoplay;
        background_music.loop = true;
        background_music.play();
        changeAudioButtonOn();
    } else {
        background_music.muted = true;
    };
}

/**
 * Stops the background music and sets the `soundOn` flag to false.
 */
function stopMusic() {
    soundOn = false;
}

/**
 * Mutes the background music and updates the UI button state to reflect that music is muted.
 */
function mute() {
    stopMusic();
    checkOnMusic();
    changeAudioButtonOff();
}

/**
 * Updates the audio button UI to show the 'music on' state, and updates the event handlers for the buttons.
 */
function changeAudioButtonOn() {
    document.getElementById("musicOn").style.display = "none";
    document.getElementById("musicOff").style.display = "block";
    document.getElementById("mobileSound").src = "img/img/10_logos_icons/mute-mobile.png";
    document.getElementById("mobileSound").onclick = mute;
    document.getElementById("menuMute").src = "img/img/10_logos_icons/mute-mobile.png";
    document.getElementById("menuMute").onclick = mute;
}

/**
 * Updates the audio button UI to show the 'music off' state, and updates the event handlers for the buttons.
 */
function changeAudioButtonOff() {
    document.getElementById("mobileSound").src = "img/img/10_logos_icons/unmute-mobile.png";
    document.getElementById("mobileSound").onclick = startMusic;
    document.getElementById("musicOn").style.display = "block";
    document.getElementById("musicOff").style.display = "none";
    document.getElementById("menuMute").src = "img/img/10_logos_icons/unmute-mobile.png";
    document.getElementById("menuMute").onclick = startMusic;
}