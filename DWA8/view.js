import { genres, authors, books } from './data.js';

export const html = {
  list: {
    button: document.querySelector('[data-list-button]'),
    message: document.querySelector('[data-list-message]'),
    overlay: document.querySelector('[data-list-active]'),
    close: document.querySelector('[data-list-close]'),
    items: document.querySelector('[data-list-items]'),
    blur: document.querySelector('[data-list-blur]'),
    image: document.querySelector('[data-list-image]'),
    title: document.querySelector('[data-list-title]'),
    subtitle: document.querySelector('[data-list-subtitle]'),
    description: document.querySelector('[data-list-description]'),
  },
  search: {
    button: document.querySelector('[data-header-search]'),
    overlay: document.querySelector('[data-search-overlay]'),
    cancel: document.querySelector('[data-search-cancel]'),
    form: document.querySelector('[data-search-form]'),
    authors: document.querySelector('[data-search-authors]'),
    genres: document.querySelector('[data-search-genres]'),
    title: document.querySelector('[data-search-title]'),
  },
  settings: {
    button: document.querySelector('[data-header-settings]'),
    overlay: document.querySelector('[data-settings-overlay]'),
    cancel: document.querySelector('[data-settings-cancel]'),
    form: document.querySelector('[data-settings-form]'),
    theme: document.querySelector('[data-settings-theme]'),
  },
};

/**
 * Creates HTML options for genre selection, including "All Genres" as the default option.
 *
 * @returns {DocumentFragment} The HTML fragment containing genre options.
 */
const createGenreOptionsHtml = () => {
  const genreHtml = document.createDocumentFragment();
  const firstGenreElement = document.createElement('option');
  firstGenreElement.value = 'any';
  firstGenreElement.innerText = 'All Genres';
  genreHtml.appendChild(firstGenreElement);
  for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }
  return genreHtml;
};

/**
 * Creates HTML options for author selection, including "All Authors" as the default option.
 *
 * @returns {DocumentFragment} The HTML fragment containing author options.
 */
const createAuthorOptionHtml = () => {
  const authorsHtml = document.createDocumentFragment();
  const firstAuthorElement = document.createElement('option');
  firstAuthorElement.value = 'any';
  firstAuthorElement.innerText = 'All Authors';
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }
  return authorsHtml;
};

/**
 * Sets the preferred color theme mode based on the user's system preferences.
 */
const setPreferredColorThemeMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night';
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.querySelector('[data-settings-theme]').value = 'day';
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
};

/**
 * Updates the color theme mode based on user preferences and closes the settings overlay.
 *
 * @param {Event} event - The event object representing the form submission event.
 */
export const updateColorThemeMode = event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);
  if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
  document.querySelector('[data-settings-overlay]').open = false;
};

/**
 * Creates a book element with its unique information.
 *
 * @param {Object} book
 * @param {string} book.author - The author of the book.
 * @param {string} book.id - The ID of the book.
 * @param {string} book.image - The image URL of the book.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLButtonElement} The created book element
 */
export const createBookElement = ({ author, id, image, title }) => {
  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);

  element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
  return element;
};

const getBookClicked = event => {
  const target = event.target.closest('.preview');
  const targetPreviewId = target.dataset.preview;
  const { image, title, author, published, description } = books.find(book => book.id === targetPreviewId);

  return {
    image,
    title,
    author,
    published,
    description,
  };
};

export const getClickedBookAndDisplayModal = event => {
  const active = getBookClicked(event);

  /**
   * Updates the book modal with information of the active book.
   *
   * @param {Object|null} active - The active book data or null if no active book.
   * @param {string} active.image - The image URL of the active book.
   * @param {string} active.title - The title of the active book.
   * @param {number} active.author - The index of the author of the active book.
   * @param {string} active.published - The publication date of the active book.
   * @param {string} active.description - The description of the active book.
   */
  const updateBookModal = () => {
    if (active) {
      html.list.overlay.open = true;
      html.list.blur.src = active.image;
      html.list.image.src = active.image;
      html.list.title.innerText = active.title;
      html.list.subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
      html.list.description.innerText = active.description;
    }
  };

  // updateBookModal(active);

  const openModal = () => {
    html.list.overlay.open = true;
  };

  return {
    activeBook: active,
    updateBookModal,
    open: openModal,
  };
};

setPreferredColorThemeMode();

html.search.genres.appendChild(createGenreOptionsHtml());
html.search.authors.appendChild(createAuthorOptionHtml());
