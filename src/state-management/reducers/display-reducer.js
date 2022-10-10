export default function displayReducer(state, action) {
  switch (action.type) {
    case "[DISPLAY] SELECT_CELL":
      console.log(action)
      return {
        ...state,
        clickedCell: action.cell,
      };

    default:
      return { ...state };
  }
}
