import store from './redux/store.js';
import { ADD, SUBTRACT, RESET } from './redux/actions.js';

// Scenario 1: Initial state
console.log("Initial state:", store.getState().count); // 0

// Scenario 2: Increment by one
store.dispatch({ type: ADD });
store.dispatch({ type: ADD });
console.log("Count after two ADD actions:", store.getState().count); // 2

// Scenario 3: Decrement by one
store.dispatch({ type: SUBTRACT });
console.log("Count after SUBTRACT action:", store.getState().count); // 1

// Scenario 4: Reset
store.dispatch({ type: RESET });
console.log("Count after RESET action:", store.getState().count); // 0
