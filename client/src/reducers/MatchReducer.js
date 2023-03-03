const matchReducer = (
  state = { matches: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, matches: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    case "SEND_CON_REQUEST":
      return {
        ...state,
        matches: [
          ...state.matches.filter((personId) => personId !== action.data),
        ],
      };
    default:
      return state;
  }
};

export default matchReducer;
