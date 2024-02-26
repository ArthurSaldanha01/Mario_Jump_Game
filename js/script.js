const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverScreen = document.querySelector('.game-over-screen');
const clouds = document.querySelector('.clouds');

let score = 0;
let scoreDisplay = document.querySelector('.score');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

document.querySelector('.restart-button').addEventListener('click', function() {
    
    location.reload();
});

let scoreCounter;

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsStyle = window.getComputedStyle(clouds);
    const cloudsPosition = cloudsStyle.getPropertyValue('right');

    score++;
    scoreDisplay.textContent = score;

    if (pipePosition <= 120  && pipePosition > 0 && marioPosition < 80) {
        
        pipe.style.animation = 'pipe-animation 2s infinite linear';
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'hit 0.5s ease-out forwards';
        mario.style.bottom = `${marioPosition}px`

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        
        gameOverScreen.style.display = 'block';
        
        clouds.style.animation = 'none';
        
        clouds.style.right = cloudsPosition;

        localStorage.setItem('oldScore', score);

        clearInterval(loop);
        clearInterval(scoreCounter);
    }

    let oldScoreDisplay = document.querySelector('.oldScore');
    let oldScore = localStorage.getItem('oldScore');
    if (oldScore !== null) {
        oldScoreDisplay.textContent = oldScore;
    }

}, 10)

document.addEventListener('keydown', jump);