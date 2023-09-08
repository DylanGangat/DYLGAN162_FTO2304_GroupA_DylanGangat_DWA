/* eslint-disable import/prefer-default-export */
import { Task, Sorting } from './store.js';

/**
 * Adds a task to the store
 *
 * @typedef {object} AddTask
 * @prop {'ADD_TASK'} type
 * @prop {Task}
 */

/**
 * Changes the order in which tasks are sorted
 *
 * @typedef {object} ChangeSort
 * @prop {'CHANGE_SORT'} type
 * @prop {Sorting} sorting
 */

/**
 * Starts or stopes the adding proces of new task, depending on what the current phase is
 *
 * @typedef {object} ToggleAdd
 * @prop {'TOGGLE_ADD'} type
 */

/**
 * @typedef {AddTask | ChangeSort | ToggleAdd} Action
 */

export const Action = {};

/**
 * @param {object} props
 * @param {string} props.title
 * @returns {AddTask}
 */

export const addTask = props => {
  const { title } = props;

  return {
    task: {
      created: new Date(),
      id: Math.round(Math.random() * 1000000),
      title,
    },
    type: 'ADD_TASK',
  };
};

/**
 *
 * @returns {ToggleAdd}
 */
export const toggleAdd = () => ({ type: 'TOGGLE_ADD' });

/**
 * @param {object} props
 * @param {Sorting} props.sorting
 * @return {ChangeSort}
 */

export const changeSort = props => {
  const { sorting } = props;

  return {
    sorting,
    type: 'CHANGE_SORT',
  };
};
