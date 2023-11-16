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

function init() {
   canvas = document.getElementById('canvas');
}

function startGame() {
   initLevel();
   mobileButtons();
   world = new World(canvas, keyboard);
   console.log('Spiel gestartet');
   document.getElementById('canvas-container').classList.remove('d-none');
   document.getElementById('start-screen-container').classList.add('d-none');
   document.getElementById('end-screen-container').classList.add('d-none');
   document.getElementById('you-lost-screen-container').classList.add('d-none');
   playAudio();
}

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

function exitFullscreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
   } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
   }
}
function playSoundEffect(sound) {
   if (!audio_muted) {
      sound.play();
   }
}

function stopSoundEffect(sound) {
   sound.pause();
}
function playMusic() {
   music.loop = true;
   music.play();
}

function playAudio() {
   document.getElementById('play-audio').classList.add('d-none');
   document.getElementById('mute-audio').classList.remove('d-none');
   audio_muted = false;
   playMusic();
}

function muteAudio() {
   document.getElementById('mute-audio').classList.add('d-none');
   document.getElementById('play-audio').classList.remove('d-none');
   audio_muted = true;
   stopAudio();
}

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

function clearAllIntervals() {
   for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function youLost() {
   playSoundEffect(game_over_sound);
   document.getElementById('canvas-container').classList.add('d-none');
   document.getElementById('you-lost-screen-container').classList.remove('d-none');
   clearAllIntervals();
}

function youWin() {
   playSoundEffect(you_win_sound);
   document.getElementById('canvas-container').classList.add('d-none');
   document.getElementById('end-screen-container').classList.remove('d-none');
   clearAllIntervals();
}

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
   // console.log(e);
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
   // console.log(e);
});
