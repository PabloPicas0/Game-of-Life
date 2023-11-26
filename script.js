const board = document.querySelector(".board");
const generationCount = document.getElementById("generation-number");

const pauseGame = document.getElementById("start/pause");
const clear = document.getElementById("clear");
const randomize = document.getElementById("randomize");

let grid = [];
let generation = 0;
let start = true;
const rows = 28;
const columns = 48;

for (let i = 0; i < rows; i++) {
  const row = [];

  for (let j = 0; j < columns; j++) {
    const isPopulated = Math.random() > 0.5 ? 1 : 0;
    row.push(isPopulated);
  }

  grid.push(row);
}

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const div = document.createElement("div");
    div.id = `${i}-${j}`;
    div.classList.add("cell");

    if (grid[i][j] === 1) div.style.backgroundColor = "green";

    board.appendChild(div);
  }
}

// TODO: DRY this function
const getCellNeighbours = (grid, i, j) => {
  let neighbours = 0;

  // check horizontal cells
  if (j + 1 < 48 && grid[i][j + 1] === 1) {
    neighbours++;
  }
  if (j - 1 >= 0 && grid[i][j - 1] === 1) {
    neighbours++;
  }

  // check vertical cells
  if (i + 1 < 28 && grid[i + 1][j] === 1) {
    neighbours++;
  }
  if (i - 1 >= 0 && grid[i - 1][j] === 1) {
    neighbours++;
  }

  // check lower diagonal cells
  if (i + 1 < 28 && j + 1 < 48 && grid[i + 1][j + 1] === 1) {
    neighbours++;
  }
  if (i + 1 < 28 && j - 1 >= 0 && grid[i + 1][j - 1] === 1) {
    neighbours++;
  }

  // check upper diagonal cells
  if (i - 1 >= 0 && j + 1 < 48 && grid[i - 1][j + 1] === 1) {
    neighbours++;
  }
  if (i - 1 >= 0 && j - 1 >= 0 && grid[i - 1][j - 1] === 1) {
    neighbours++;
  }

  return neighbours;
};

const nextGeneration = (grid, rows, columns) => {
  const futureGeneration = new Array(rows);

  for (let i = 0; i < rows; i++) {
    futureGeneration[i] = new Array(columns).fill(0);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cellNeighbours = getCellNeighbours(grid, i, j);

      if (grid[i][j] === 1 && cellNeighbours < 2) {
        futureGeneration[i][j] = 0;
      } else if (grid[i][j] === 1 && cellNeighbours > 3) {
        futureGeneration[i][j] = 0;
      } else if (grid[i][j] === 0 && cellNeighbours === 3) {
        futureGeneration[i][j] = 1;
      } else {
        futureGeneration[i][j] = grid[i][j];
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const isCellAlive = futureGeneration[i][j];
      const cell = document.getElementById(`${i}-${j}`);

      if (isCellAlive === 1) {
        cell.style.backgroundColor = "green";
      } else {
        cell.style.backgroundColor = null;
      }
    }
  }

  generation++;
  generationCount.textContent = `${generation}`;

  return futureGeneration;
};

const sleep = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const startGame = async () => {
  while (start) {
    grid = nextGeneration(grid, rows, columns);
    await sleep(80);
  }
};

pauseGame.addEventListener("click", () => {
  start = !start;
  startGame();
});

randomize.addEventListener("click", () => {
  const newGrid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let j = 0; j < columns; j++) {
      const isPopulated = Math.random() > 0.5 ? 1 : 0;
      row.push(isPopulated);
    }

    newGrid.push(row);
  }

  generation = 0
  grid = newGrid;
});

clear.addEventListener("click", () => {
  const clearBoard = new Array(rows);

  for (let i = 0; i < rows; i++) {
    clearBoard[i] = new Array(columns).fill(0);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = document.getElementById(`${i}-${j}`);

      cell.style.backgroundColor = null;
    }
  }

  start = false;
  grid = clearBoard;
  generation = 0;
  generationCount.textContent = `${generation}`;
});

startGame();
