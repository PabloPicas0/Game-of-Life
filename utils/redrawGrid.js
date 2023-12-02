const redrawGrid = (grid, rows, columns) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const isCellAlive = grid[i][j];
      const cell = document.getElementById(`${i}-${j}`);

      if (isCellAlive === 1) {
        cell.style.backgroundColor = "#4caf50";
      } else {
        cell.style.backgroundColor = null;
      }
    }
  }
};

export default redrawGrid;
