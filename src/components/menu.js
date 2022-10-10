import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../css/table.css";
import { newStartingBoard } from "../helpers/sudoku-algorithm";
import { useStore } from "../state-management/stores/store";
import { gameMode } from "../helpers/constants";
import { capitalizeFirstLetter } from "../helpers/formatting";

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
  };

  return (
    <React.Fragment>
      <button onClick={() => reset(mode)}>Reset</button>
      <button onClick={() => setShowScore(!showScore)}>Show score</button>
      {showScore && <div>Score: {score}</div>}
      <button
        onClick={showHint}
        disabled={solution.length === 0 ? true : false}
      >
        Hint
      </button>
      <button
        onClick={undoMove}
        disabled={lastMove.length === 0}
      >
        Undo
      </button>
      {solution.length === 0 && <div>Congrats!</div>}
      <br />
      {Object.keys(gameMode).map(mode => (
        <button key={'gameMode_' + mode} onClick={() => setGameMode(gameMode[mode])}>
          {capitalizeFirstLetter(mode)}
        </button>
      ))}
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={autoCheck} onChange={enableAutoCheck} />}
          label="Auto-Check for Mistakes"
        />
      </FormGroup>
    </React.Fragment>
  );
};
export default Menu;
