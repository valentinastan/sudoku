import React, { useEffect, useState } from "react";
import "../../css/table.css";
import { useStore } from "../../state-management/stores/store";

const Cell = props => {
  // const [state, setState] = useState({
  //   inputValue: props?.value,
  //   incrementedScore: undefined,
  // });

  const [inputValue, setInputValue] = useState(props?.value);
  const [isHint, setIsHint] = useState(false);
  const [incrementedScore, setIncrementedScore] = useState(undefined);
  const [markAsMistake, setMarkAsMistake] = useState(false);
  const [store, dispatch] = useStore();
  // let emptyCells = store?.solutionState?.emptyCells;
  let solution = store?.solutionState?.solution;
  let hint = store?.solutionState?.hint;
  let score = store?.gameState?.score;
  let autocheck = store?.gameState?.autocheck;
  // console.log(props.rowIndex, props.colIndex, emptyCells);
  const { rowIndex, colIndex } = props;
  // let incrementedScore;
  // let points = state.points;

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
  }, [hint]);

  // const getSolution = () => {
  //   let solution = {};
  //   emptyCells.map(cell => {
  //     if (solution[cell.rowIndex]) {
  //       solution[cell.rowIndex][cell.colIndex] = cell.val;
  //     } else {
  //       solution[cell.rowIndex] = {
  //         [cell.colIndex]: cell.val,
  //       };
  //     }
  //   });
  //   return solution;
  // };

  const onChangeInputValue = newValue => {
    console.log("newValue", newValue);
    setInputValue(newValue);
    console.log("state", inputValue, props);

    // let solution = getSolution();

    console.log(
      "solution, rowIndex, colIndex, sol",
      solution[rowIndex][colIndex],
      rowIndex,
      colIndex,
      solution
    );

    if (newValue === "" || undefined) {
      console.log("aiciciicii", incrementedScore);
      if (incrementedScore === true) {
        console.log("decrement3", score);
        dispatch({
          type: "[GAME] DECREMENT_SCORE",
        });
      } else if (incrementedScore === false) {
        console.log("increment4", score);
        dispatch({
          type: "[GAME] INCREMENT_SCORE",
        });
      }
    } else {
      if (solution[rowIndex][colIndex]) {
        console.log("solution", solution[rowIndex][colIndex], newValue);
        if (solution[rowIndex][colIndex].toString() === newValue.toString()) {
          // setState({ ...state, points: state.points++ });

          dispatch({
            type: "[GAME] INCREMENT_SCORE",
          });
          // incrementedScore = true;
          setIncrementedScore(true);
          console.log("increment1", score, incrementedScore);
        } else if (
          solution[rowIndex][colIndex].toString() !== newValue.toString()
        ) {
          console.log("heei 0000", markAsMistake);
          if (autocheck === true) {
            console.log("heei greseala");
            setMarkAsMistake(!markAsMistake);
          }
          // incrementedScore = false;
          setIncrementedScore(false);
          dispatch({
            type: "[GAME] DECREMENT_SCORE",
          });
          console.log("decrement2", score, incrementedScore);
          // setState({ ...state, points: state.points-- });
          // console.log("state val", inputValue);
        }
      }
    }

    console.log("score:", score);
  };

  console.log("autockec", autocheck);
  const hintClass = isHint ? "hint" : "";
  const mistakeClass = markAsMistake && autocheck ? "mistake" : "";

  return (
    <React.Fragment>
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
