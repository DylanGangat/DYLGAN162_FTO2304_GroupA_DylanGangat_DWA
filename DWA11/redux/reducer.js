// A reducer is a pure function that specifies how the state of your application should change in response to actions.

// Here, we define an initial state with a count property set to 0.
const initialState = { count: 0 };

// The reducer function handles three types of actions: ADD, SUBTRACT, and RESET.
const reducer = (action, state = initialState) => {
  const { count } = state;

  // Depending on the action type, it calculates the new state.
  switch (action.type) {
    case 'ADD':
      return { ...state, count: count + 1 };
    case 'SUBTRACT':
      return { ...state, count: count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export default reducer;
