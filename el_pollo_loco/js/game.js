let canvas;
let world;
let keyboard = new Keyboard;
let background_music = new Audio('audio/background_music.mp3');
let muteState = localStorage.getItem('muted') || 'false';

/**
 * Redirects the user to the main menu by navigating to 'index.html'.
 */
function returnToMainMenu() {
    window.location.href = 'index.html';
}

/**
 * Initializes the game world by connecting the canvas, keyboard, and level.
 * 
 * - Retrieves the canvas element by ID.
 * - Creates a new `World` object using the canvas, keyboard, and level1.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
}

/**
 * Detects changes in screen orientation and adjusts the UI accordingly.
 * 
 * - On portrait mode: Displays a dialog (`screen_dialog`) prompting the user to switch to landscape.
 * - On landscape mode: Hides the dialog.
 */
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

/**
 * Determines if the current device is a mobile device.
 * 
 * - Uses `navigator.maxTouchPoints` and user agent strings to check for mobile characteristics.
 */
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

/**
 * Adjusts the main menu UI for mobile devices.
 * 
 * - Shows menu icons.
 * - Hides the logo, title, main menu buttons, and mute button.
 */
function changeToMobile(){
    document.getElementById("menu_icons").classList.remove('d-none');
    document.getElementById("logo").classList.add("d-none");
    document.getElementById("title").classList.add('d-none');
    document.getElementById("main_menu_buttons").style.display = "none";
    document.getElementById("main_menu_mute").classList.add('d-none');
}

/**
 * Reverts the main menu UI back to the desktop layout.
 * 
 * - Hides menu icons.
 * - Shows the logo, title, main menu buttons, and mute button.
 */
function changeBackFromMobile(){
    document.getElementById("menu_icons").classList.add('d-none');
    document.getElementById("title").classList.remove('d-none')
    document.getElementById("logo").classList.remove('d-none');;
    document.getElementById("main_menu_buttons").style.display = "flex";
    document.getElementById("main_menu_mute").classList.remove('d-none');
}

/**
 * Sets up event listeners for mobile controls and initializes the game.
 * 
 * - Binds touch events for mobile control buttons (left, right, jump, throw).
 * - Connects the home button to return to the main menu.
 * - Updates the `keyboard` object based on user interactions.
 */
document.addEventListener('DOMContentLoaded', () => {
    let mobileLeft = document.getElementById("mobileLeft");
    let mobileRight = document.getElementById("mobileRight");
    let mobileJump = document.getElementById('mobileJump');
    let mobileThrow = document.getElementById("mobileThrow");
    let homeButton = document.getElementById("homeButton");

     // Navigate to the main menu when the home button is clicked.
    homeButton.addEventListener('click', () => {
        returnToMainMenu();
    })

    // Touchstart events to enable corresponding keyboard keys for mobile controls.
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

    // Touchend events to disable corresponding keyboard keys for mobile controls.
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

/**
 * Listens for keydown events and updates the `keyboard` object.
 * 
 * - Maps specific key codes to control actions:
 *   - Arrow keys: Movement (UP, DOWN, LEFT, RIGHT).
 *   - Spacebar: Jump or action.
 */
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

/**
 * Listens for keyup events and updates the `keyboard` object.
 * 
 * - Resets the corresponding key's state to `false` when the key is released.
 * - Special handling for SPACE to enable throwing after release.
 */
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
    localStorage.setItem('muted', 'false');
    muteState = 'false';
    checkOnMusic();
}

/**
 * Checks if the music is enabled and starts or stops it accordingly.
 * Also updates the UI button states based on whether music is enabled.
 */
function checkOnMusic() {
    if (muteState === 'false') {
        background_music.muted = false;
        background_music.autoplay = true;
        background_music.loop = true;
        background_music.play();
        changeAudioButtonOn();
    } else {
        background_music.muted = true;
    };
}

/**
 * Stops the background music and sets the `muteState` flag to true.
 */
function stopMusic() {
    localStorage.setItem('muted', 'true');
    muteState = 'true';
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