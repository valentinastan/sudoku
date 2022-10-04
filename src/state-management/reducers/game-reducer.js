export default function gameReducer(state, action) {
  switch (action.type) {
    case "[GAME] INCREMENT_SCORE":
      return { ...state, score: state.score + 1 };
    case "[GAME] DECREMENT_SCORE":
      return { ...state, score: state.score - 1 };
    case "[GAME] RESET_SCORE":
      return { ...state, score: 0 };
    case "[GAME] AUTOCHECK_ON":
      return { ...state, autocheck: true };
    case "[GAME] AUTOCHECK_OFF":
      return { ...state, autocheck: false };
    case "[GAME] RESET":
      return { ...state, score: 0, autocheck: false, time: "", level: "" };
    default:
      return { ...state };
  }
}
