import React from "react";
import gameReducer from "../reducers/game-reducer";
import solutionReducer from "../reducers/solution-reducer";

const initialState = {
  solutionState: {
    emptyCells: [],
    unfilledBoard: [],
    filledBoard: [],
    hint: null,
    solution: null,
    lastMove: null,
  },
  gameState: {
    score: 0,
    autocheck: false,
    time: "",
    level: "",
  },
};

const Store = React.createContext();
const Dispatch = React.createContext();

const combinedReducers = (state, action) => ({
  solutionState: solutionReducer(state.solutionState, action),
  gameState: gameReducer(state.gameState, action),
});

function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(combinedReducers, initialState);

  return (
    <Store.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Store.Provider>
  );
}

function useGlobalState() {
  const context = React.useContext(Store);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}

function useDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

function useStore() {
  return [useGlobalState(), useDispatch()];
}
export { StateProvider, useGlobalState, useDispatch, useStore };
