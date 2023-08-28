// @ts-check

import { doesHtmlExist, getHtml } from './helpers.js';
import { Task } from './state.js';
/**
 *
 * @param {string} id
 */
export const addTaskToHtml = id => {
  if (doesHtmlExist('task', id)) {
    throw new Error('Task with that ID already added');
  }
  const list = getHtml('list');
  const preview = document.createElement('li');
  preview.classList.add('task');
  
  preview.innerHTML = `
    <label class="task__check">
        <input class="task__input" type="checkbox" />
        </label>
        <button class="task__title">
            Wash th Dog asda sdasd asd as ddas Dog asda sdasd asd as ddase Dog
            asda sdasd asd as ddas
        </button>
        <label class="task__check">
        <svg
            class="task__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            style="display: none">
        <path
            d="M253 961q-40.212 0-67.606-27.1Q158 906.8 158 867V314h-58v-94h231v-48h297v48h232v94h-58v553q0 39.05-27.769 66.525Q746.463 961 707 961H253Zm454-647H253v553h454V314ZM354 789h77V390h-77v399Zm175 0h78V390h-78v399ZM253 314v553-553Z"
            ></path>
        </svg>
    </label>
`;

  list.append(preview);
};

/**
 *
 * @param {string} id
 * @param {Partial<Pick<Task, "completed" | "due" | "title" | "urgency">>} changes
 */
const updateHtmlTask = (id, changes) => {
  const element = document.querySelector(`[data-task="${id}"]`);
  const isHtmlElement = element instanceof HTMLElement;
  if (!isHtmlElement) throw new Error('');
};

export const addTask = () => {};
