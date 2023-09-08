// A reducer is a pure function that specifies how the state of your application should change in response to actions.
// It takes the current state and an action as input and returns a new state.

const initialState = { count: 0 };

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };
    case SUBTRACT:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
}

// Here, we define an initial state with a count property set to 0.
// The reducer function handles three types of actions: ADD, SUBTRACT, and RESET.
// Depending on the action type, it calculates the new state.