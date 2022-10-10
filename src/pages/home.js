import React from "react";
import Sudoku from "../components/game-board/board";
import Menu from "../components/menu";
import Options from "../components/options";

const Home = () => {
  return (
    <React.Fragment>
      <div className="game">
        <Sudoku></Sudoku>
      </div>
      <Menu></Menu>
      <Options></Options>
    </React.Fragment>
  );
};
export default Home;
