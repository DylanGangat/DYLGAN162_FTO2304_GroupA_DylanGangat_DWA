import { reducer } from './reducers.js';

/**
 * @typedef {object} Task
 * @prop {string} id
 * @prop {string} title
 * @prop {Date} created
 */

export const Task = {};

/**
 * @typedef {'A-Z' | 'Z-A'} Sorting
 */

export const Sorting = {};

/**
 * @typedef {object} Filters
 * @prop {'A-Z' | 'Z-A'} sorting
 */

/**
 * @typedef {object} State
 * @prop {'idle' | 'adding'} phase
 * @prop {Record<string, Task>} tasks
 * @prop {Filters} filters
 */

export const State = {};

/**
 * @callback GetState
 * @returns {State}
 */

/**
 * @callback Dispatch
 * @param {Action} action
 */

/**
 * @callback EmptyFn
 */

/**
 * @callback Subscription
 * @param {State} prev
 * @param {State} next
 */

/**
 * @type {Array<Subscription>}
 */
let subscribers = [];

/**
 * @type {Array<State>}
 */
const states = [
  {
    phase: 'idle',
    tasks: {},
    filters: {
      sorting: 'A-Z',
    },
  },
];

/**
 * @returns {State}
 */
export const getState = () => Object.freeze({ ...states[0] });

/**
 * @param {Action} action
 */

export const dispatch = action => {
  const prev = getState();
  const next = reducer(prev, action);
  subscribers.forEach(item => item(prev, next));

  states.unshift(next);
};

/**
 * @param {Subscription} subscription
 */
export const subscribe = subscription => {
  subscribers.push(subscription);

  const unsubscribe = () => {
    const newSubscribers = subscribers.filter(item => item !== subscription);
    subscribers = newSubscribers;
  };
  return unsubscribe;
};
