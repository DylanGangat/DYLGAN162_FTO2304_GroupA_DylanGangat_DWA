// @ts-check

import { state } from './modules/state.js';
import { addTaskToHtml } from './modules/tasks.js';

window.addEventListener('error', () => {
  document.body.innerHTML = 'Something went very very wrong. Please refresh.';
});

addTaskToHtml('123');
