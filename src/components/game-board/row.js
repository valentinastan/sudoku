import React from "react";
import "../../css/table.css";
import Cell from "./cell";

const Row = props => {
  // console.log('row ',props.numbers);
  let numbers = props?.numbers || [];
 

  const onCh = change => {
    console.log(change);
  };

  return (
    <React.Fragment>
      <div className="sudoku">
        {numbers?.map((num, i) => (
          <Cell value={num} colIndex={i} rowIndex={props?.rowIndex} key={"cell_" + num + '_' + i}></Cell>
          // <input value={num} key={"cell_" + num + '_' + i} onChange={(event) => onCh(event)}></input>
        ))}
      </div>
    </React.Fragment>
  );
};
export default Row;
