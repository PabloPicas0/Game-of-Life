"use strict";

import sleep from "./utils/sleep.js";
import getCellNeighbours from "./utils/getCellNeighbours.js";

const board = document.querySelector(".board");
const generationCount = document.getElementById("generation-number");

const pauseGame = document.getElementById("start");
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

    if (grid[i][j] === 1) div.style.backgroundColor = "#4caf50";

    board.appendChild(div);
  }
}

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
        cell.style.backgroundColor = "#4caf50";
      } else {
        cell.style.backgroundColor = null;
      }
    }
  }

  generation++;
  generationCount.textContent = `${generation}`;

  return futureGeneration;
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

  generation = 0;
  grid = newGrid;

  if (!start) {
    start = true;
    startGame();
  }
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
