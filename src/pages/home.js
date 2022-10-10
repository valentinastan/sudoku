import React from "react";
import Sudoku from "../components/game-board/board";
import Menu from "../components/menu";
import Options from "../components/options";

const Home = () => {
  return (
    <React.Fragment>
      <div className="main-page">
        <div className="game">
          <Sudoku></Sudoku>
        </div>
        <div>
          <Menu></Menu>
          <Options></Options>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
