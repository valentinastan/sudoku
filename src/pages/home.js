import React from "react";
import Sudoku from "../components/game-board/board";
import Menu from "../components/menu";

const Home = () => {
  return (
    <React.Fragment>
      <Sudoku></Sudoku>
      <Menu></Menu>
    </React.Fragment>
  );
};
export default Home;
