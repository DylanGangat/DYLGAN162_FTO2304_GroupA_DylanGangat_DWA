import reducer from './reducer.js';

const createStore = reduce => {
  // Initialize with the initial state
  let state = reduce({}, undefined);

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reduce(action, state);
  }

  return {
    getState,
    dispatch,
  };
};

const store = createStore(reducer);

export default store;
