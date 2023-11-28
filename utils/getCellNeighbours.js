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

export default getCellNeighbours;
