import React, { useEffect } from "react";
import "../../css/table.css";
import Cell from "./cell";

const Row = props => {
  // console.log('row ',props.numbers);
  let numbers = props?.numbers || [];


  return (
    <React.Fragment>
      <div className="sudoku">
        {numbers?.map((num, i) => {
          console.log('num', num, 'col:', i, 'row:', props.rowIndex)
          return (
          <Cell value={num} colIndex={i} rowIndex={props.rowIndex} key={"cell_" + num + '_' + i + props.rowIndex + Date.now()}></Cell>
          // <input value={num} key={"cell_" + num + '_' + i} onChange={(event) => onCh(event)}></input>
        )})}
      </div>
    </React.Fragment>
  );
};
export default Row;
