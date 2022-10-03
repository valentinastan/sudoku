import getSolution from "../../helpers/game-state";

export default function solutionReducer(state, action) {
  switch (action.type) {
    case "[BOARD] SET_NEW_BOARD":
      console.log("action", action);
      let newState = {
        emptyCells: action.startingBoard[0],
        unfilledBoard: action.startingBoard[1],
        filledBoard: action.startingBoard[2],
      };
      let solution = getSolution(newState.filledBoard)
      return { ...state, ...newState, solution};
    case "[BOARD] SET_HINT":
      return { ...state, hint: action.hint, emptyCells: [...action.hints] };

    case "[BOARD] SET_SOLUTION_OBJECT":
      console.log("solutiion", action.solution);
      return { ...state, solution: { ...action.solution } };
    default:
      return { ...state };
  }
}
