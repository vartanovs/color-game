// Declare method container for colorGame selectors and variables
const colorGame = {
  colors: [],
  difficultyButtons: document.getElementsByClassName('difficulty'),
  goalColor: '',
  goalDisplay: document.getElementById('goalDisplay'),
  h1: document.getElementsByTagName('h1')[0],
  messageDisplay: document.getElementById('message'),
  points: 6,
  pointsSpan: document.getElementById('points'),
  resetButton: document.getElementById('reset'),
  round: 1,
  roundSpan: document.getElementById('round'),
  squareCount: 6,
  squares: document.getElementsByClassName('square'),
  total: 0,
  totalSpan: document.getElementById('total'),
  win: false,
};

// Helper function to generate an array of random colors
const generateRandomColors = function generateRandomColors() {
  // Inner helper functions generate three random numbers, 0 - 255
  const randomNumber = function randomNumber() {
    return Math.floor(Math.random() * 256);
  };
  const randomColor = function randomColor() {
    return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
  };
  // Create and return a colorArray filled with a random color for every active square
  const colorArray = [];
  for (let i = 0; i < colorGame.squareCount; i += 1) {
    colorArray.push(randomColor());
  }
  return colorArray;
};

// Helper function to turn all squares and header to winning color
const changeColors = function changeColors(winningColor) {
  // Loop through all squares, change to winning color
  for (let i = 0; i < colorGame.squareCount; i += 1) {
    // Change each color to match winning color
    colorGame.squares[i].style.backgroundColor = winningColor;
  }
  colorGame.h1.style.backgroundColor = winningColor;
};

// Helper function to randomly select winner from colors array
const pickWinner = function pickWinner() {
  const index = Math.floor(Math.random() * colorGame.squareCount);
  return colorGame.colors[index];
};

// Helper function to reset the header and settings bar
const resetDisplay = function resetDisplay() {
  colorGame.h1.style.backgroundColor = 'steelblue';
  colorGame.goalDisplay.textContent = colorGame.goalColor;
  colorGame.resetButton.textContent = 'Reset';
  colorGame.messageDisplay.textContent = '';
};

// Helper function to color in squares according to random color array
const fillSquares = function fillSquares() {
  for (let i = 0; i < colorGame.squares.length; i += 1) {
    if (i < colorGame.squareCount) {
      // If square is within squareCount, make square visibile and add color
      colorGame.squares[i].style.display = 'block';
      colorGame.squares[i].style.backgroundColor = colorGame.colors[i];
    } else {
      // If square is beyond squareCount, make square invisible
      colorGame.squares[i].style.display = 'none';
    }
  }
};

// Helper function to reset score if user hasn't won, update total if user earns a win
const resetPoints = function resetScore(win) {
  if (win) {
    // If user has won, add the round points to their total score
    colorGame.round += 1;
    colorGame.total = colorGame.points + colorGame.total;
    colorGame.points = colorGame.squareCount;
  } else {
    // If user is resetting without a win, reset to 1st round defaults
    colorGame.round = 1;
    colorGame.total = 0;
    colorGame.points = colorGame.squareCount;
  }
};

// Helper function to update score bar
const updateScore = function updateScore() {
  colorGame.roundSpan.textContent = `Round: ${colorGame.round}`;
  colorGame.pointsSpan.textContent = `Points: ${colorGame.points}`;
  colorGame.totalSpan.textContent = `Total Score: ${colorGame.total}`;
};

// Helper function to initialize game
const resetGame = function resetGame() {
  // Generate new array of random colors
  colorGame.colors = generateRandomColors(colorGame.squareCount);
  // Randomly select a new winning color
  colorGame.goalColor = pickWinner();
  // Set display with winning color
  resetDisplay();
  // Set colors of squares, hide unnecessary squares
  fillSquares(colorGame.squareCount);
  // Update score variables and score bar
  resetPoints(colorGame.win);
  updateScore();
  // Set colorGame.win back to false;
  colorGame.win = false;
};

// Event Listener for Reset Button
colorGame.resetButton.addEventListener('click', resetGame);

// Event Listeners for Squares with Correct and Incorrect Guess Logic
for (let i = 0; i < colorGame.squares.length; i += 1) {
  colorGame.squares[i].addEventListener('click', () => {
    // Grab color of user selected square
    const selectedColor = colorGame.squares[i].style.backgroundColor;
    // Compare user selected color to goal color
    if (selectedColor === colorGame.goalColor) {
      // Correct user case logic
      colorGame.messageDisplay.textContent = 'Correct!';
      colorGame.resetButton.textContent = 'Next Round';
      changeColors(selectedColor);
      colorGame.win = true;
    } else if (colorGame.squares[i].style.display === 'block') {
      // Incorrect user case logic
      colorGame.squares[i].style.background = '#232323';
      colorGame.messageDisplay.textContent = 'Try Again';
      colorGame.points -= 1;
      colorGame.pointsSpan.textContent = `Points: ${colorGame.points}`;
    }
  });
}

// Event Listeners for Difficulty Selection and Difficulty Reset
for (let i = 0; i < colorGame.difficultyButtons.length; i += 1) {
  colorGame.difficultyButtons[i].addEventListener('click', () => {
    // Deselect all difficulty buttons
    for (let j = 0; j < colorGame.difficultyButtons.length; j += 1) {
      colorGame.difficultyButtons[j].classList.remove('selected');
    }
    // Reselect only the selected difficulty
    colorGame.difficultyButtons[i].classList.add('selected');
    // Set squareCount to 3 for Easy Mode, 6 for Medium Mode, 9 for Hard Mode
    switch (colorGame.difficultyButtons[i].textContent) {
      case 'Easy':
        colorGame.squareCount = 3;
        break;
      case 'Medium':
        colorGame.squareCount = 6;
        break;
      case 'Hard':
        colorGame.squareCount = 9;
        break;
      default:
        break;
    }
    // Reset game with updated squareCount
    colorGame.win = false;
    resetGame();
  });
}

// Initialize Game:
resetGame();
