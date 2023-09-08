import { reducer } from './reducer.js';

function createStore(reducer) {
    // Initialize with the initial state
    let state = reducer(undefined, {});

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
    }

    return {
        getState,
        dispatch,
    };
}

// Initializes state of {count: 0}
export const store = createStore(reducer);