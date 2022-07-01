// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const largeScreen = document.getElementById('fullscreen');

// build functions

// function to play or pause video
function togglePlay () {
    if (video.paused) {
        video.play ();
    } else {
        video.pause();
    }
}
// function to change the play or pause function
function updateButton() {
    // this is the shorthand for the same function above
    const icon = this.paused ?  '▶': '⏸️' ;
    toggle.textContent = icon;
}
// skip button function
function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}
// function to set the playbackrate bar and volume bar.
function handleRangeUpdate () {
    video[this.name] = this.value;
    console.log(this.name)
    console.log(this.value);
}
// function to trigger the progress bar and update
function handleProgress () {
    const percent = (video.currentTime / video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`
}
// function to be able to click progress bar
function scrub(e) {
    
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
// function to get player to go fullscreen

function fullScreen (){ 
    if(largeScreen.classList.contains(':fullscreen')){
        largeScreen.classList.remove(':fullscreen')
    } else {
        largeScreen.classList.add(':fullscreen')
    }
}
// hook up event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))


// event handlers for the scrub bar
// variable to store mousedown as false
let mousedown = false;
// when a click on the bar area means run scrub
progress.addEventListener('click', scrub);
// a mousemove with a mousedown as true means run scrub
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

// let mousedown = true if mousedown and false again if mouseup
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

largeScreen.addEventListener('click', fullScreen)