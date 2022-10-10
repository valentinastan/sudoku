import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../css/table.css";
import { newStartingBoard } from "../helpers/sudoku-algorithm";
import { useStore } from "../state-management/stores/store";
import { gameMode } from "../helpers/constants";
import { capitalizeFirstLetter } from "../helpers/formatting";

const Options = () => {
  const [store, dispatch] = useStore();
  let clicked = store?.displayState?.clickedCell;

  const onSelect = option => {
    console.log("selected", option);

    dispatch({
      type: "[BOARD] SAVE_USER_INPUT",
      cell: {
        rowIndex: clicked.row,
        colIndex: clicked.col,
        val: parseInt(option || 0),
      },
    });
  };

  return (
    <React.Fragment>
      <div className="options-area">
        {[...Array(9).keys()].map(el => (
          <button
            onClick={() => onSelect(el + 1)}
            key={"option_" + el + Date.now()}
            className="option"
          >
            {el + 1}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
};
export default Options;
