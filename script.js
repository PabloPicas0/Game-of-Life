const board = document.querySelector(".board");

let grid = [];
let cellCount = 0;
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
    div.id = cellCount;
    div.classList.add("cell");

    if (grid[i][j] === 0) div.style.backgroundColor = "green";

    board.appendChild(div);

    cellCount++;
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
  if (i + 1 < 28 && j + 1 <= 48 && grid[i + 1][j + 1] === 1) {
    neighbours++;
  }
  if (i + 1 < 28 && j - 1 >= 0 && grid[i + 1][j - 1] === 1) {
    neighbours++;
  }

  // check upper diagonal cells
  if (i - 1 >= 0 && j + 1 <= 48 && grid[i - 1][j + 1] === 1) {
    neighbours++;
  }
  if (i - 1 >= 0 && j - 1 >= 0 && grid[i - 1][j - 1] === 1) {
    neighbours++;
  }

  return neighbours;
};

const nextGeneration = (grid, rows, columns) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cellNeighbours = getCellNeighbours(grid, i, j);
      console.log(cellNeighbours);
    }
  }
};
console.log(grid)
nextGeneration(grid, rows, columns);
