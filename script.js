const rows = 5;
const cols = 5;
let lights = [];

function initGame() {
  const gameContainer = document.getElementById('game-container');
  const gameBoard = document.getElementById('game-board');

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const light = document.createElement('div');
      light.className = 'light is-off';
      light.dataset.row = i;
      light.dataset.col = j;
      light.addEventListener('click', toggleLights);
      gameBoard.appendChild(light);
      lights.push(light);
    }
  }

  setRandomInitialState();
  checkWin();
}

function setRandomInitialState() {
  lights.forEach(light => {
    if (Math.random() < 0.5) {
      toggleLights({
        target: light
      });
    }
  });
}

function toggleLights(event) {
  const clickedLight = event.target;
  const row = parseInt(clickedLight.dataset.row);
  const col = parseInt(clickedLight.dataset.col);

  toggleLightState(row, col);
  toggleLightState(row - 1, col);
  toggleLightState(row + 1, col);
  toggleLightState(row, col - 1);
  toggleLightState(row, col + 1);

  checkWin();
}

function toggleLightState(row, col) {
  if (row >= 0 && row < rows && col >= 0 && col < cols) {
    const index = row * cols + col;
    lights[index].classList.toggle('on');
    lights[index].classList.toggle('is-off');
  }
}

function checkWin() {
  const allLightsOff = lights.every(light => !light.classList.contains('on'));

  if (allLightsOff) {
    stopAllLights();
    alert('Congratulations! You win!');
    resetGame();
  }
}

function stopAllLights() {
  lights.forEach(light => {
    light.classList.remove('on');
    light.classList.add('is-off');
  });
}


function resetGame() {
  lights.forEach(light => {
    light.classList.remove('on');
    light.classList.add('is-off');
  });
  setRandomInitialState();
}

window.addEventListener('DOMContentLoaded', initGame);
