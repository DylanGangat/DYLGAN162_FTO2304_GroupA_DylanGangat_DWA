import { books, BOOKS_PER_PAGE } from './data.js';
import { html, createBookElement, updateColorThemeMode, getClickedBookAndDisplayModal } from './view.js';

let page = 1;
let matches = books;

/**
 * Appends the next page of books to the existing book list.
 */
const appendNextPageOfBooks = () => {
  const fragment = document.createDocumentFragment();

  for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
    fragment.appendChild(createBookElement(book));
  }

  html.list.items.appendChild(fragment);
  page += 1;
};

/**
 * Creates the initial display of books on the app.
 */
const createIntialBooksDisplay = () => {
  const starting = document.createDocumentFragment();

  for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
    starting.appendChild(createBookElement(book));
  }

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

  for (const book of result.slice(0, BOOKS_PER_PAGE)) {
    newItems.appendChild(createBookElement(book));
  }

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
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  displayFilteredBooks(result);
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

html.list.close.addEventListener('click', () => {
  html.list.overlay.open = false;
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
  getClickedBookAndDisplayModal(event);
});

createIntialBooksDisplay();
updateShowMoreButton();
