/**
 * Represents the main variables and sounds for the game.
 */
let canvas;
let world;
let keyboard = new Keyboard();
let audio_muted = false;
let fullSize = false;
let music = new Audio('audio/music.mp3');
let coin_sound = new Audio('audio/bell.mp3');
let bottle_sound = new Audio('audio/bottle.mp3');
let bottle_smash_sound = new Audio('audio/bottle-smash.mp3');
let chicken_die_sound = new Audio('audio/chick.mp3');
let endboss_attack_sound = new Audio('audio/chicken.mp3');
let walking_sound = new Audio('audio/running.mp3');
let jumping_sound = new Audio('audio/jump.mp3');
let hurt_sound = new Audio('audio/hurt.mp3');
let game_over_sound = new Audio('audio/game_over.mp3');
let you_win_sound = new Audio('audio/you_win.mp3');

/**
 * Initializes the game canvas.
 */
function init() {
   canvas = document.getElementById('canvas');
}

/**
 * Starts the game by initializing the level, setting up mobile buttons,
 * creating the world, and playing the game audio.
 */
function startGame() {
   initLevel();
   mobileButtons();
   world = new World(canvas, keyboard);
   document.getElementById('canvas-container').classList.remove('d-none');
   document.getElementById('start-screen-container').classList.add('d-none');
   document.getElementById('end-screen-container').classList.add('d-none');
   document.getElementById('you-lost-screen-container').classList.add('d-none');
   playAudio();
}

/**
 * Toggles fullscreen mode for the game.
 */
function fullScreen() {
   let gameContainer = document.getElementById('gameContainer');
   let canvas = document.getElementById('canvas');

   if (fullSize == false) {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      enterFullscreen(gameContainer);
      fullSize = true;
   } else {
      gameContainer.style.width = '720px';
      gameContainer.style.height = '480px';
      exitFullscreen();
      fullSize = false;
   }
}

/**
 * Requests to enter fullscreen mode for a given HTML element.
 * @param {HTMLElement} element - The HTML element to display in fullscreen.
 */
function enterFullscreen(element) {
   if (element.requestFullscreen) {
      element.requestFullscreen();
   } else if (element.msRequestFullscreen) {
      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
   } else if (element.webkitRequestFullscreen) {
      // iOS Safari
      element.webkitRequestFullscreen();
   }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
   } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
   }
}

/**
 * Plays a sound effect if audio is not muted.
 * @param {Audio} sound - The sound effect to play.
 */
function playSoundEffect(sound) {
   if (!audio_muted) {
      sound.play();
   }
}

/**
 * Stops a sound effect.
 * @param {Audio} sound - The sound effect to stop.
 */
function stopSoundEffect(sound) {
   sound.pause();
}

/**
 * Plays background music in a loop.
 */
function playMusic() {
   music.loop = true;
   music.play();
}

/**
 * Enables game audio and updates UI buttons.
 */
function playAudio() {
   document.getElementById('play-audio').classList.add('d-none');
   document.getElementById('mute-audio').classList.remove('d-none');
   audio_muted = false;
   playMusic();
}

/**
 * Mutes game audio and updates UI buttons.
 */
function muteAudio() {
   document.getElementById('mute-audio').classList.add('d-none');
   document.getElementById('play-audio').classList.remove('d-none');
   audio_muted = true;
   stopAudio();
}

/**
 * Stops all game audio.
 */
function stopAudio() {
   stopSoundEffect(music);
   stopSoundEffect(coin_sound);
   stopSoundEffect(bottle_sound);
   stopSoundEffect(bottle_smash_sound);
   stopSoundEffect(chicken_die_sound);
   stopSoundEffect(endboss_attack_sound);
   stopSoundEffect(walking_sound);
   stopSoundEffect(jumping_sound);
   stopSoundEffect(hurt_sound);
   stopSoundEffect(game_over_sound);
   stopSoundEffect(you_win_sound);
}

/**
 * Clears all intervals set in the game.
 */
function clearAllIntervals() {
   for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Triggers the "you lost" game state.
 */
function youLost() {
   stopSoundEffect(music);
   playSoundEffect(game_over_sound);
   document.getElementById('canvas-container').classList.add('d-none');
   document.getElementById('you-lost-screen-container').classList.remove('d-none');
   clearAllIntervals();
}

/**
 * Triggers the "you win" game state.
 */
function youWin() {
   stopSoundEffect(music);
   playSoundEffect(you_win_sound);
   document.getElementById('canvas-container').classList.add('d-none');
   document.getElementById('end-screen-container').classList.remove('d-none');
   clearAllIntervals();
}

/**
 * Adds event listeners for mobile game controls.
 */
function mobileButtons() {
   document.getElementById('canvas').addEventListener('touchstart', e => {
      e.preventDefault();
   });

   document.getElementById('btn-left').addEventListener('touchstart', e => {
      e.preventDefault();
      keyboard.LEFT = true;
   });

   document.getElementById('btn-left').addEventListener('touchend', e => {
      e.preventDefault();
      keyboard.LEFT = false;
   });

   document.getElementById('btn-right').addEventListener('touchstart', e => {
      e.preventDefault();
      keyboard.RIGHT = true;
   });

   document.getElementById('btn-right').addEventListener('touchend', e => {
      e.preventDefault();
      keyboard.RIGHT = false;
   });

   document.getElementById('btn-jump').addEventListener('touchstart', e => {
      e.preventDefault();
      keyboard.SPACE = true;
   });

   document.getElementById('btn-jump').addEventListener('touchend', e => {
      e.preventDefault();
      keyboard.SPACE = false;
   });

   document.getElementById('btn-throw').addEventListener('touchstart', e => {
      e.preventDefault();
      keyboard.D = true;
   });

   document.getElementById('btn-throw').addEventListener('touchend', e => {
      e.preventDefault();
      keyboard.D = false;
   });
}

/**
 * Event listeners for keyboard controls.
 */
window.addEventListener('keydown', e => {
   if (e.keyCode == 37) {
      keyboard.LEFT = true;
   }
   if (e.keyCode == 38) {
      keyboard.UP = true;
   }
   if (e.keyCode == 39) {
      keyboard.RIGHT = true;
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

window.addEventListener('keyup', e => {
   if (e.keyCode == 37) {
      keyboard.LEFT = false;
   }
   if (e.keyCode == 38) {
      keyboard.UP = false;
   }
   if (e.keyCode == 39) {
      keyboard.RIGHT = false;
   }
   if (e.keyCode == 40) {
      keyboard.DOWN = false;
   }
   if (e.keyCode == 32) {
      keyboard.SPACE = false;
   }
   if (e.keyCode == 68) {
      keyboard.D = false;
   }
});
