const cow = document.querySelector('.cow')
const grid = document.querySelector('.grid')
const score = document.getElementById('score')
const username = document.getElementById('username')
const user = localStorage.getItem('username');
const users = JSON.parse(localStorage.getItem('users'));
const lives = document.getElementsByClassName('live');
const loseimg = document.getElementById('loseimg');
let countLives = 4;
let countScore = 0;

// update user cuurent score and highest score
function updateUserScore(newScore) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == user) {
      users[i].currentScore = newScore;
      if (users[i].highestScore < newScore) users[i].highestScore = newScore;
      localStorage.setItem("users", JSON.stringify(users));
      break;
    }
  }
}

// starts a game
function start() {
  username.innerHTML = user;

  let isJumping = false
  let gravity = 0.9
  let isGameOver = false

  // dtect if user pressed space to jump 
  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true
        jump()
      }
    }
  }
  document.addEventListener('keyup', control)

  // jump over a stone 
  let position = 0
  function jump() {
    let count = 0
    let timerId = setInterval(function () {
      //move down
      if (count === 15) {
        clearInterval(timerId)
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId)
            isJumping = false
          }
          position -= 5
          count--
          position = position * gravity
          cow.style.bottom = position + 'px'
        }, 20)

      }
      //move up
      position += 30
      count++
      position = position * gravity
      cow.style.bottom = position + 'px'
    }, 20)
  }

  // generate a stone and end when the cow hits it
  function generateObstacles() {
    let randomTime = 3000
    let obstaclePosition = 1000
    const obstacle = document.createElement('div')
    if (!isGameOver) obstacle.classList.add('obstacle')
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + 'px'

    let timerId = setInterval(function () {
      if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timerId);
        isGameOver = true
        countLives--;
        console.log(countLives);
        obstacle.style.display = 'none'
        // loseimg.style.display = 'inline'
        contnu();
      }
      obstaclePosition -= 10
      obstacle.style.left = obstaclePosition + 'px'
    }, 20)
    if (!isGameOver) setTimeout(generateObstacles, randomTime)
  }
  generateObstacles()

// generate coins
  function generateCoin() {
    let randomTime = 1000
    let coinPosition = Math.random() * 2000
    const coin = document.createElement('div')
    if (!isGameOver) coin.classList.add('coin')
    grid.appendChild(coin)
    coin.style.left = coinPosition + 'px'

    let timerId = setInterval(function () {
      if (coinPosition > 0 && coinPosition < 60 && position < 60) {
        coin.style.display = 'none';
        countScore++;
        score.innerHTML = countScore;
      }
      coinPosition -= 10
      coin.style.left = coinPosition + 'px'
    }, 20)
    if (!isGameOver) setTimeout(generateCoin, randomTime)
  }
  generateCoin()

}
start()

// calculate how many live remains 
function contnu() {
  if (countLives == 0) {
    updateUserScore(countScore);
    if(countScore >= 100)
    window.location = 'winner.html'
    else
    window.location = 'gameover.html'
  }
  else {
    lives[countLives - 1].style.display = 'none'
    // loseimg.style.display = 'none'
    start()
  }
}


var audio = document.getElementById("song");

function playSong() {
  return audio.paused ? audio.play() : audio.pause();
}

