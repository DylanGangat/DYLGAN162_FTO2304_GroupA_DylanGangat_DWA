import { getState, dispatch } from './model/store.js';
import { addTask, changeSort, toggleAdd } from './model/actions.js';

dispatch(toggleAdd());
dispatch(toggleAdd());
dispatch(toggleAdd());

dispatch(addTask({ title: 'Hello' }));
dispatch(addTask({ title: 'World' }));
dispatch(changeSort({ sorting: 'Z-A' }));
dispatch(toggleAdd());

console.log(getState);
