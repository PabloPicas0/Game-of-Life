const board = document.querySelector(".board");

const createGrid = () => {
  const columns = 48;
  const rows = 28;
  let cellCount = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const div = document.createElement("div");
      div.id = cellCount;
      div.classList.add("cell");

      board.appendChild(div);

      cellCount++;
    }
  }
};

createGrid();
