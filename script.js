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
