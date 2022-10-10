export const gameMode = {
  easy: 42,
  medium: 48,
  hard: 53,
  expert: 57,
  evil: 59,
};

//square: rowIndex: colIndex = Square_Number
export const indexesToSquares = {
  0: {0: 0, 1: 0, 2: 0, 3: 1, 4: 1, 5: 1, 6: 2, 7: 2, 8: 2},
  1: {}
}

export const squaresToIndexes = {
  0: { 0: 0, 0: 1, 0: 2, 1: 0, 1: 1, 1: 2, 2: 0, 2: 1, 2: 3 },
  1: { 0:4, 0:5, 0:6},
};
