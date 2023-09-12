import { books, BOOKS_PER_PAGE } from './data.js';
import { html, createBookElement, updateColorThemeMode } from './view.js';
import bookPreviewFactory from './modules/bookPreview.js';

let page = 1;
let matches = books;
let createModal;

/**
 * Appends the next page of books to the existing book list.
 */
const appendNextPageOfBooks = () => {
  const fragment = document.createDocumentFragment();
  matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE).forEach(book => fragment.appendChild(createBookElement(book)));
  html.list.items.appendChild(fragment);
  page += 1;
};

/**
 * Creates the initial display of books on the app.
 */
const createIntialBooksDisplay = () => {
  const starting = document.createDocumentFragment();
  matches.slice(0, BOOKS_PER_PAGE).forEach(book => starting.appendChild(createBookElement(book)));
  html.list.items.appendChild(starting);
};

/**
 * Updates the "Show More" button based on the current page and matches.
 *
 * This function updates the text and state of the "Show More" button
 * based on the number of books, the number of matches, and the current page.
 */
const updateShowMoreButton = () => {
  html.list.button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
  html.list.button.disabled = matches.length - page * BOOKS_PER_PAGE < 1;

  html.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>
`;
};

/**
 * Checks if a given book matches the specified criteria.
 *
 * @param {object} book - The book object to be matched.
 * @param {object} filters - The criteria filters to match against.
 * @param {string} filters.genre - The genre to match. Set to 'any' to match any genre.
 * @param {string} filters.title - The title to match. Case-insensitive. Set to an empty string to ignore title matching.
 * @param {string} filters.author - The author to match. Set to 'any' to match any author.
 * @returns {boolean} Returns true if the book matches all specified criteria, otherwise false.
 */
const isBookMatch = (book, { genre, title, author }) => {
  const genreMatch = book.genres.includes(genre) || genre === 'any';
  if (!genreMatch) return false;
  const titleMatch = title.trim() === '' || book.title.toLowerCase().includes(title.toLowerCase());
  if (!titleMatch) return false;
  const authorMatch = author === 'any' || book.author === author;
  if (!authorMatch) return false;
  return true;
};
/**
 * Filters an array of books based on user-provided filter criteria.
 *
 * @param {Event} event - The event object from form submission.
 * @returns {Array} - An array of books that match the specified filters.
 */
const getFilteredBooks = event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  const result = books.filter(book => isBookMatch(book, filters));
  return result;
};

/**
 * Displays the filtered books on the page.
 * @param {Array} result - An array of book objects representing the filtered books.
 */
const displayFilteredBooks = result => {
  page = 1;
  matches = result;

  if (result.length < 1) {
    html.list.message.classList.add('list__message_show');
  } else {
    html.list.message.classList.remove('list__message_show');
  }

  html.list.items.innerHTML = '';
  const newItems = document.createDocumentFragment();

  result.slice(0, BOOKS_PER_PAGE).forEach(book => newItems.appendChild(createBookElement(book)));
  html.list.items.appendChild(newItems);

  updateShowMoreButton();

  window.scrollTo({ top: 0, behavior: 'smooth' });
  html.search.overlay.open = false;
};

/**
 * Filters books based on user input, updates the list of filtered books, and displays them.
 *
 * @param {Event} event - The event object representing the form submission event.
 */
const filterAndDisplayBooks = event => {
  try {
    const result = getFilteredBooks(event);
    if (!result) throw new Error('There is something wrong with your result array');
    displayFilteredBooks(result);
    html.search.form.reset();
  } catch (e) {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    console.error(e);
  }
};

html.search.cancel.addEventListener('click', () => {
  html.search.overlay.open = false;
});

html.settings.cancel.addEventListener('click', () => {
  html.settings.overlay.open = false;
});

html.search.button.addEventListener('click', () => {
  html.search.overlay.open = true;
  html.search.title.focus();
});

html.settings.button.addEventListener('click', () => {
  html.settings.overlay.open = true;
});

html.settings.form.addEventListener('submit', event => {
  updateColorThemeMode(event);
});

html.search.form.addEventListener('submit', event => {
  filterAndDisplayBooks(event);
});

html.list.button.addEventListener('click', () => {
  appendNextPageOfBooks();
});

html.list.items.addEventListener('click', event => {
  createModal = bookPreviewFactory(event);
  createModal.open();
});

html.list.close.addEventListener('click', () => {
  if (createModal) {
    createModal.close();
  }
});

createIntialBooksDisplay();
updateShowMoreButton();
