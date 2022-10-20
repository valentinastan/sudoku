import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../css/table.css";
import { newStartingBoard } from "../helpers/sudoku-algorithm";
import { useStore } from "../state-management/stores/store";
import { gameMode } from "../helpers/constants";
import { capitalizeFirstLetter } from "../helpers/formatting";
import getSolution from "../helpers/game-state";

const Menu = () => {
  const [store, dispatch] = useStore();
  const [mode, setGameMode] = useState(gameMode.easy);
  const [showScore, setShowScore] = useState(false);
  const [autoCheck, setAutoCheck] = useState(
    store.gameState.autoCheck || false
  );

  let score = store?.gameState?.score || 0;
  let lastMove = store?.solutionState?.lastMove || null;
  let solution = store?.solutionState?.emptyCells;
  let filledBoard = store?.solutionState?.filledBoard;
  // let incrementedScore = store?.gameState?.incrementedScore;
  console.log("in menu", store);

  useEffect(() => {
    reset(mode);
  }, [mode]);

  const reset = mode => {
    let startingBoard = newStartingBoard(mode);
    dispatch({
      type: "[BOARD] RESET_BOARD",
      startingBoard,
    });
    dispatch({
      type: "[GAME] RESET",
    });
    setAutoCheck(false);
  };

  const showHint = () => {
    let hints = [...solution];
    let hint = hints.pop();
    dispatch({
      type: "[BOARD] SET_HINT",
      hint,
      hints,
    });
    dispatch({
      type: "[GAME] DECREMENT_SCORE",
    });
  };

  const enableAutoCheck = () => {
    setAutoCheck(!autoCheck);
    if (!autoCheck) {
      dispatch({
        type: "[GAME] AUTOCHECK_ON",
      });
    } else {
      dispatch({
        type: "[GAME] AUTOCHECK_OFF",
      });
    }
  };

  const undoMove = () => {
    dispatch({
      type: "[BOARD] UNDO_MOVE",
    });
    undoScore();
  };

  const undoScore = () => {
    console.log("!!! undo", store);
    let move = lastMove[lastMove.length - 1];
    if (lastMove) {
      let solutionObject = getSolution(filledBoard);
      if (move.val === solutionObject[move.rowIndex][move.colIndex]) {
        console.warn("valoarea era buna");
        dispatch({
          type: "[GAME] DECREMENT_SCORE",
        });
      } else {
        console.warn("valoarea era naspa");
        dispatch({
          type: "[GAME] INCREMENT_SCORE",
        });
      }
    }
    // if (incrementedScore === true) {
    //   dispatch({
    //     type: "[GAME] DECREMENT_SCORE",
    //   });
    // } else if (incrementedScore === false) {
    //   dispatch({
    //     type: "[GAME] INCREMENT_SCORE",
    //   });
    // }
  };

  return (
    <React.Fragment>
      <div className="menu">
        <FormGroup>
          <FormControlLabel
            className="autocheck-label"
            control={<Switch checked={autoCheck} onChange={enableAutoCheck} />}
            label="Auto-Check for Mistakes"
          />
        </FormGroup>
        <button onClick={() => reset(mode)}>Reset</button>
        <button onClick={() => setShowScore(!showScore)}>Show score</button>
        {showScore && <div className="score">Score: {score}</div>}
        <button
          onClick={showHint}
          disabled={solution.length === 0 ? true : false}
        >
          Hint
        </button>
        <button onClick={undoMove} disabled={lastMove.length === 0}>
          Undo
        </button>
        {solution.length === 0 && <div className="win">Congrats!</div>}
        <br />
        <h4>Game Mode</h4>
        <div className="game-mode">
          {Object.keys(gameMode).map(mode => (
            <button
              key={"gameMode_" + mode}
              onClick={() => setGameMode(gameMode[mode])}
            >
              {capitalizeFirstLetter(mode)}
            </button>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Menu;
