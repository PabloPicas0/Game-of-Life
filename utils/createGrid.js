const createGrid = (rows, columns) => {
  const newGrid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let j = 0; j < columns; j++) {
      const isPopulated = Math.random() > 0.5 ? 1 : 0;
      row.push(isPopulated);
    }

    newGrid.push(row);
  }

  return newGrid;
};

export default createGrid;
