const piano = document.querySelector('.piano')
const collection = document.querySelectorAll('.piano');
const body = document.querySelector('body');
const button = document.querySelector('.btn-container');
const pianoKey = document.querySelectorAll('.piano-key');

/** Audio play */

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }

  /** Full screen */
  
document.querySelector('.fullscreen').addEventListener('click', function (event) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}, false);

/** Target audio */
const startSound = (event) => {
    if (event.target.dataset.note) {
        const URL = `assets/audio/${event.target.dataset.note}.mp3`
        playAudio(URL)
    }
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo')
}

const stopSound = (event) => {
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
}

const getMouse = (event) => {
    const URL = `assets/audio/${event.target.dataset.note}.mp3`
    playAudio(URL)
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    collection.forEach((elem) => {
        elem.addEventListener('mouseover', startSound)
        elem.addEventListener('mouseout', stopSound)
    })
}
const stopGetMouse = (event) => {
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
    collection.forEach((elem) => {
        elem.removeEventListener('mouseover', startSound)
        elem.removeEventListener('mouseout', stopSound)
    })
}

piano.addEventListener('mousedown', getMouse, false);
body.addEventListener('mouseup', stopGetMouse);

//** Notes / Letters */
button.addEventListener('click', function(event) {
    if (event.target.innerHTML === 'Notes') {
        document.querySelector('.btn-active').classList.remove('btn-active');
        event.target.classList.add('btn-active');
        pianoKey.forEach(item => item.classList.remove('piano-key-letter'))
    }
    if (event.target.innerHTML === 'Letters') {
        document.querySelector('.btn-active').classList.remove('btn-active');
        event.target.classList.add('btn-active');
        pianoKey.forEach(item => item.classList.add('piano-key-letter'))
    }
})

//** Keyboard  */
const keys = {
    'KeyD' : 'c',
    'KeyF' : 'd',
    'KeyG' : 'e',
    'KeyH' : 'f',
    'KeyJ' : 'g',
    'KeyK' : 'a',
    'KeyL' : 'b',
    'KeyR' : 'c♯',
    'KeyT' : 'd♯',
    'KeyU' : 'f♯',
    'KeyI' : 'g♯',
    'KeyO' : 'a♯',
}

body.addEventListener('keydown', function (event) {
    if (event.repeat) return;
    for (let key in keys) {
        document.querySelectorAll('.piano-key').forEach(item => item.attributes.note)
        if (key === event.code) {    
        const URL = `assets/audio/${keys[key]}.mp3`
        playAudio(URL);   
        document.querySelectorAll(`.piano-key[data-note=${keys[event.code]}]`)[0].classList.add('piano-key-active', 'piano-key-active-pseudo')
        } 
    }
})
body.addEventListener('keyup', function (event) {
    for (let key in keys) {
        document.querySelectorAll('.piano-key').forEach(item => item.attributes.note)
        if (key === event.code) {      
        document.querySelectorAll(`.piano-key[data-note=${keys[event.code]}]`)[0].classList.remove('piano-key-active', 'piano-key-active-pseudo')
        } 
    }
})



