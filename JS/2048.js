var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
  setGame();
  // Show the welcome modal
  document.getElementById('welcomeModal').style.display = 'block';
};

// Game Start
document.getElementById('startGame').onclick = function () {
  document.getElementById('welcomeModal').style.display = 'none';
  score = 0; // Reset score
  document.getElementById('score').innerText = score; // Update score display
  clearBoard(); // Clear the board visually and logically
  setGame(); // Reinitialize the game
  resetBackground(); // Ensure the main background is set when starting the game
};

// Try Again
document.getElementById('tryAgain').addEventListener('click', function () {
  document.getElementById('gameOverModal').style.display = 'none';
  score = 0; // Reset score
  document.getElementById('score').innerText = score; // Update score display
  clearBoard(); // Clear the board visually and logically
  setGame(); // Reinitialize the game
  resetBackground(); // Reset the background to the main image
});

// Exit Game
document.getElementById('exitGame').addEventListener('click', function () {
  document.getElementById('welcomeModal').style.display = 'block';
  document.getElementById('gameOverModal').style.display = 'none';
  score = 0; // Reset score
  // It might not be necessary to update the score display here if `setGame` is not called and the game starts by pressing the "Start Game" button which already contains the score reset logic.
  clearBoard(); // Clear the board visually and logically
});

// Set Game Function
function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement('div');
      tile.id = r.toString() + '-' + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById('board').append(tile);
    }
  }
  setTwo();
  setTwo();
}

// Tiles Empty Checking
function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    // Corrected loop condition
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false; // Ensure the function returns false if no empty tile is found
}

// Tiles Not Empty Checking
function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + '-' + c.toString());
      updateTile(tile, 2);
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = '';
  tile.classList.value = '';
  tile.classList.add('tile');
  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add('x' + num.toString());
    } else {
      tile.classList.add('x8192');
    }
  }
}

// Background Changing By Its Score
function updateBackground(score) {
  // Ensure the body covers the full screen height and removes default margin
  document.body.style.height = '100vh';
  document.body.style.margin = '0';
  document.body.style.backgroundSize = 'cover'; // Ensure the image covers the full screen
  document.body.style.backgroundRepeat = 'no-repeat'; // Prevent the image from repeating
  document.body.style.backgroundPosition = 'center'; // Center the background image

  if (score >= 6400) {
    document.body.style.backgroundImage = "url('../assets/6400score.png')";
  } else if (score >= 3200) {
    document.body.style.backgroundImage = "url('../assets/3200score.png')";
  } else if (score >= 1900) {
    document.body.style.backgroundImage = "url('../assets/1900score.png')";
  } else if (score >= 1600) {
    document.body.style.backgroundImage = "url('../assets/1600score.png')";
  } else if (score >= 1200) {
    document.body.style.backgroundImage = "url('../assets/1200score.png')";
  } else if (score >= 800) {
    document.body.style.backgroundImage = "url('../assets/800score.png')";
  } else if (score >= 600) {
    document.body.style.backgroundImage = "url('../assets/600score.png')";
  } else if (score >= 400) {
    document.body.style.backgroundImage = "url('../assets/400score.png')";
  } else if (score >= 200) {
    document.body.style.backgroundImage = "url('../assets/200score.png')";
  } else {
    // Reset to default background when score is below 200
    document.body.style.backgroundImage = "url('../assets/main.png')";
  }
}

// Remember to call updateBackground() in the same place as before, after the score update
document.addEventListener('keyup', (e) => {
  if (
    e.code == 'ArrowLeft' ||
    e.code == 'ArrowRight' ||
    e.code == 'ArrowUp' ||
    e.code == 'ArrowDown'
  ) {
    document.getElementById('score').innerText = score;
    updateBackground(); // This function now updates the background image
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code == 'ArrowLeft') {
    slideLeft();
    setTwo();
  } else if (e.code == 'ArrowRight') {
    slideRight();
    setTwo();
  } else if (e.code == 'ArrowUp') {
    slideUp();
    setTwo();
  } else if (e.code == 'ArrowDown') {
    slideDown();
    setTwo();
  }
  document.getElementById('score').innerText = score;
  updateBackground(score);
  // After making a move and updating the score
  checkGameOver();
});

// Removing Zero In Array
function filterZero(row) {
  return row.filter((num) => num != 0); // Corrected to use filter method
}

function slide(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      // Corrected to properly index adjacent elements
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }
  row = filterZero(row);
  while (row.length < columns) {
    row.push(0);
  }
  return row;
}

// Arrow Left Key
function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + '-' + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// Arrow Right Key
function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + '-' + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// Arrow Up Key
function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + '-' + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// Arrow Down Key
function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + '-' + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// Game Over
function isGameOver() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) return false; // Empty spot found
      if (c < columns - 1 && board[r][c] === board[r][c + 1]) return false; // Merge right possible
      if (r < rows - 1 && board[r][c] === board[r + 1][c]) return false; // Merge down possible
    }
  }
  return true; // No moves left
}

// Check if the game is over
function checkGameOver() {
  if (isGameOver()) {
    document.getElementById('finalScore').innerText = 'Your Score: ' + score;
    document.getElementById('gameOverModal').style.display = 'block';
  }
}

// Clearing the number on board
function clearBoard() {
  const boardElement = document.getElementById('board');
  document.getElementById('board').innerHTML = ''; // This line clears the board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[r][c] = 0; // Reset the board logically
    }
  }
}

// Reset Background Image
function resetBackground() {
  document.body.style.backgroundImage = "url('../assets/main.png')";
}
