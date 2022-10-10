import React from "react";
import { useStore } from "../../state-management/stores/store";
import Row from "./row";

const Sudoku = () => {
  const [store, dispatch] = useStore();
  let unfilledBoard = store?.solutionState?.unfilledBoard;

  return (
    <React.Fragment>
      <div className="sudoku">
        {unfilledBoard?.map((line, i) => (
          <div className={"row_" + i} key={"sudoku" + i + Date.now()}>
            <Row
              numbers={line}
              rowIndex={i}
              key={"row_" + i + Date.now()}
            ></Row>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
export default Sudoku;
