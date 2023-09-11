import { html } from '../view.js';
import { authors, books } from '../data.js';

const bookPreviewFactory = event => {
  // Gets book that is clicked
  const target = event.target.closest('.preview');
  const targetPreviewId = target.dataset.preview;
  const active = books.find(book => book.id === targetPreviewId);

  // Updates the DOM with active book
  if (active) {
    const { image, title, author, published, description } = active;
    html.list.overlay.open = true;
    html.list.blur.src = image;
    html.list.image.src = image;
    html.list.title.innerText = title;
    html.list.subtitle.innerText = `${authors[author]} (${new Date(published).getFullYear()})`;
    html.list.description.innerText = description;
  }

  const open = () => {
    html.list.overlay.open = true;
  };

  const close = () => {
    html.list.overlay.open = false;
  };

  return {
    active,
    open,
    close,
  };
};

export default bookPreviewFactory;
