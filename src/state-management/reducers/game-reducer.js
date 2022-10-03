export default function gameReducer(state, action) {
  switch (action.type) {
    case "[GAME] INCREMENT_SCORE":
      return { ...state, score: state.score + 1 };
    case "[GAME] DECREMENT_SCORE":
      return { ...state, score: state.score - 1 };
    case "[GAME] RESET_SCORE":
      return { ...state, score: 0 };
    case "[GAME] AUTOCHECK_ON":
      console.log('helelorrr TRUE')
      return { ...state, autocheck: true };
    case "[GAME] AUTOCHECK_OFF":
      console.log('helelorrr FALSE')
      return { ...state, autocheck: false };
    default:
      return { ...state };
  }
}
