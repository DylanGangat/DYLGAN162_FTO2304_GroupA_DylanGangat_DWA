import { html } from '../view.js';
import { authors, books } from '../data.js';
import { previewComponent } from '../components/previewComponent.js';

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

/**
 * Updates the book modal with information of the active book.
 *
 * @typedef {Object} active - The active book data.
 * @property {string} image - The image URL of the active book.
 * @property {string} title - The title of the active book.
 * @property {number} author - The index of the author of the active book.
 * @property {string} published - The publication date of the active book.
 * @property {string} description - The description of the active book.
 */

const updateBookModal = active => {
  if (active) {
    /**
     *@type {active}
     */
    const { image, title, author, published, description } = active;
    html.list.overlay.open = true;
    html.list.blur.src = image;
    html.list.image.src = image;
    html.list.title.innerText = title;
    html.list.subtitle.innerText = `${authors[author]} (${new Date(published).getFullYear()})`;
    html.list.description.innerText = description;
  }
};

const getClickedBookAndDisplayModal = event => {
  const active = getBookClicked(event);
 const { image, title, author, published, description } = active;
  // updateBookModal(active);
  const template = new previewComponent(image, title, author, published, description)
console.log("hello: ", template.outerHTML)
  // Attach the created component to the DOM
  document.body.appendChild(template);

  const openModal = () => {
    html.list.overlay.open = true;
  };

  const closeModal = () => {
    html.list.overlay.open = false;
  };

  return {
    activeBook: active,
    updateBookModal,
    open: openModal,
    close: closeModal,
  };
};

export default getClickedBookAndDisplayModal;
