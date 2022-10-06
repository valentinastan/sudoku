import React, { useEffect, useState } from "react";
import "../../css/table.css";
import { useStore } from "../../state-management/stores/store";

const Cell = props => {
  // const [state, setState] = useState({
  //   inputValue: props?.value,
  //   incrementedScore: undefined,
  // });

  const [inputValue, setInputValue] = useState(0);
  const [isHint, setIsHint] = useState(false);
  const [incrementedScore, setIncrementedScore] = useState(undefined);
  const [markAsMistake, setMarkAsMistake] = useState(false);
  const [store, dispatch] = useStore();
  let solution = store?.solutionState?.solution;
  let unfilledBoard = store?.solutionState?.unfilledBoard;
  let hint = store?.solutionState?.hint || null;
  let autocheck = store?.gameState?.autocheck;
  const { rowIndex, colIndex } = props;

  const checkIsHint = () => {
    if (
      hint.rowIndex === props?.rowIndex &&
      hint.colIndex === props?.colIndex
    ) {
      setInputValue(hint.val);
      setIsHint(true);
    }
  };

  useEffect(() => {
   
    if (hint) {
      checkIsHint();
    }
    checkMistake(unfilledBoard[props.rowIndex][props.colIndex]);
  }, [hint, autocheck]);

  useEffect(() => {
    setInputValue(props.value)
    console.log(props.value, props, inputValue, hint)

    // if (props.value === 0) initVal();
  }, [props.value]);

  // const initVal = () => {
  //   console.log('aici')
  //   setInputValue(0);
  // };

  const onChangeInputValue = newValue => {
    console.log("newValue", newValue);
    setInputValue(newValue);
    console.log("state", inputValue, props);

    // let solution = getSolution();
    dispatch({
      type: "[BOARD] SAVE_USER_INPUT",
      cell: {
        rowIndex: props.rowIndex,
        colIndex: props.colIndex,
        val: parseInt(newValue || 0),
      },
    });

    console.log(
      "solution, rowIndex, colIndex, sol",
      solution[rowIndex][colIndex],
      rowIndex,
      colIndex,
      solution
    );

    if (newValue === "" || undefined) {
      undoScore();
    } else {
      if (solution[rowIndex][colIndex]) {
        if (solution[rowIndex][colIndex].toString() === newValue.toString()) {
          incrementScore(true);
          dispatch({
            type: "[BOARD] UPDATE_EMPTY_CELLS",
            cell: {
              rowIndex: props.rowIndex,
              colIndex: props.colIndex,
              val: parseInt(newValue),
            },
          });
        } else if (
          solution[rowIndex][colIndex].toString() !== newValue.toString()
        ) {
          incrementScore(false);
          if (autocheck === true) {
            setMarkAsMistake(true);
          }
        }
      }
    }
  };

  const checkMistake = value => {
    if (solution[rowIndex][colIndex].toString() !== value.toString()) {
      if (autocheck === true) {
        setMarkAsMistake(true);
      }
    }
  };

  const undoScore = () => {
    if (incrementedScore === true) {
      dispatch({
        type: "[GAME] DECREMENT_SCORE",
      });
    } else if (incrementedScore === false) {
      dispatch({
        type: "[GAME] INCREMENT_SCORE",
      });
    }
  };

  const incrementScore = isIncrementing => {
    if (isIncrementing) {
      dispatch({
        type: "[GAME] INCREMENT_SCORE",
      });
      setIncrementedScore(true);
    } else {
      dispatch({
        type: "[GAME] DECREMENT_SCORE",
      });
      setIncrementedScore(false);
    }
  };

  const hintClass = isHint ? "hint" : "";
  const mistakeClass = markAsMistake && autocheck ? "mistake" : "";

  return (
    <React.Fragment>
      {/* {console.log('input', inputValue)} */}
      <input
        value={inputValue !== 0 ? inputValue : ""}
        key={"cell_"}
        onChange={event => onChangeInputValue(event.target.value)}
        className={hintClass + " " + mistakeClass}
      ></input>
    </React.Fragment>
  );
};
export default Cell;
