import getSolution from "../../helpers/game-state";

export default function solutionReducer(state, action) {
  switch (action.type) {
    case "[BOARD] RESET_BOARD":
      console.log("action", action);
      let newState = {
        emptyCells: action.startingBoard[0],
        unfilledBoard: action.startingBoard[1],
        filledBoard: action.startingBoard[2],
      };
      let solution = getSolution(newState.filledBoard);

      return { ...state, ...newState, solution, hint: null, lastMove: null };
    case "[BOARD] SET_HINT":
      let newUnfilledBoard = [...state.unfilledBoard];
      newUnfilledBoard[action.hint.rowIndex][action.hint.colIndex] =
        action.hint.val;
      return {
        ...state,
        hint: action.hint,
        emptyCells: [...action.hints],
        lastMove: action.hint,
        unfilledBoard: newUnfilledBoard,
      };
    case "[BOARD] SAVE_USER_INPUT":
      let emptyCell;
      let unfilled = [...state.unfilledBoard];
      unfilled[action.cell.rowIndex][action.cell.colIndex] = action.cell.val;

      if (action.cell.val === 0) {
        let solution =
          state.filledBoard[action.cell.rowIndex][action.cell.colIndex];
        let alreadyExists = false;
        state.emptyCells.map(el => {
          if (
            el.rowIndex === action.cell.rowIndex &&
            el.colIndex === action.cell.colIndex &&
            el.val === solution
          ) {
            alreadyExists = true;
          }
        });
        if (!alreadyExists) {
          emptyCell = {
            rowIndex: action.cell.rowIndex,
            colIndex: action.cell.colIndex,
            val: solution,
          };
        }
      }

      return {
        ...state,
        unfilledBoard: [...unfilled],
        lastMove: { ...action.cell },
        emptyCells: emptyCell
          ? [...state.emptyCells, emptyCell]
          : [...state.emptyCells],
      };
    case "[BOARD] UPDATE_EMPTY_CELLS":
      let cell = action.cell;
      let res = [];
      state.emptyCells.map(el => {
        if (
          el.rowIndex === cell.rowIndex &&
          el.colIndex === cell.colIndex &&
          el.val === cell.val
        ) {
        } else return res.push(el);
      });

      return { ...state, emptyCells: res };
    default:
      return { ...state };
  }
}
