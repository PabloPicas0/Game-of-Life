const createPattern = (coordinates, rows, columns) => {
  const pattern = new Array(rows);

  for (let i = 0; i < rows; i++) {
    pattern[i] = new Array(columns).fill(0);
  }

  for (let i = 0; i < coordinates.length; i++) {
    const [row, cell] = coordinates[i];

    pattern[row][cell] = 1;
  }

  return pattern;
};

export default createPattern;
