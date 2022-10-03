import React, { useEffect, useState } from "react";
import { useStore } from "../../state-management/stores/store";
import Row from "./row";
import { newStartingBoard } from "../../helpers/sudoku-algorithm";
import getSolution from "../../helpers/game-state"

const Sudoku = () => {
  const [state, setState] = useState([]);
  const [store, dispatch] = useStore();
  let filledBoard = store?.solutionState?.filledBoard;

  useEffect(() => {
    reset();
  }, []);

  const reset = () => {
    let startingBoard = newStartingBoard(20);
    dispatch({
      type: "[BOARD] SET_NEW_BOARD",
      startingBoard,
    });
    dispatch({
      type: "[GAME] RESET_SCORE",
    });
    setState(startingBoard[1]);
    console.log('filled b', filledBoard)
    // if(filledBoard.length !== 0) {
    //   dispatch({
    //     type: "[BOARD] SET_SOLUTION_OBJECT",
    //     solution: getSolution(filledBoard)
    //   });
    // }
  };

  return (
    <React.Fragment>
      <div className="sudoku">
        <button onClick={() => reset()}>Reset</button>
        {state?.map((line, i) => (
          <Row numbers={line} rowIndex={i} key={"row_" + i}></Row>
        ))}
      </div>
    </React.Fragment>
  );
};
export default Sudoku;
