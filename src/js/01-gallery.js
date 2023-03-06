import { galleryItems } from './gallery-items.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const galleryCards = createGalleryCards(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryCards);

function createGalleryCards(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a href="${original}" data-lightbox="image-1">
            <img class="gallery__image" src="${preview}" alt="${description}" data-lightbox="image-1" />
          </a>
        </div>
      `;
    })
    .join('');
}

const gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
