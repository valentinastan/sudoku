export default function getSolution(filledBoard) {
  let solution = {};
  filledBoard.map((row, rowIndex) => {
    row.map((cell, colIndex) => {
      if (solution[rowIndex]) {
        solution[rowIndex][colIndex] = cell;
      } else {
        solution[rowIndex] = {
          [colIndex]: cell,
        };
      }
    });
  });
  return solution;
}
