export const StoreReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "MESSAGE":
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};