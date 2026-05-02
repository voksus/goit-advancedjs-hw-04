import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const searchStats = document.querySelector('.search-stats');
const loadMoreBtn = document.querySelector('.load-more');
let lightBox;
let imageCounter = 1;

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function clearGallery() {
  imageCounter = 1;
  searchStats.innerHTML = '';
  gallery.innerHTML = '';
}

function createGallery(images) {
  const markup = [];
  for (const img of images) {
    markup.push(
      `<li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <div class="image-counter">${digitSeparatorFix(imageCounter++)}</div>
        <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <div class="image-info">
        <div class="info-item">
          <svg class="info-label" width="14" height="14">
            <use href="./icons.svg#likes" />
          </svg>
          <span class="info-value">${digitSeparatorFix(img.likes)}</span>
        </div>
        <div class="info-item">
          <svg class="info-label" width="14" height="14">
            <use href="./icons.svg#views" />
          </svg>
          <span class="info-value">${digitSeparatorFix(img.views)}</span>
        </div>
        <div class="info-item">
          <svg class="info-label" width="14" height="14">
            <use href="./icons.svg#comments" />
          </svg>
          <span class="info-value">${digitSeparatorFix(img.comments)}</span>
        </div>
        <div class="info-item">
          <svg class="info-label" width="14" height="14">
            <use href="./icons.svg#download" />
          </svg>
          <span class="info-value">${digitSeparatorFix(img.downloads)}</span>
        </div>
      </div>
    </li>`
    );
  }
  gallery.insertAdjacentHTML('beforeend', markup.join(''));

  // Працює, але з багом.
  // Причину багу з'ясував 29.04.2026 при перевірці файлів джерела фреймворку разом із ШІ.
  // Я вирішив не використовувати підхід `lightBox.refresh()`.

  // Обрано підхід з методом `destroy()` і повторним створенням нового екземпляра класу `SimpleLightbox`.
  if (lightBox) {
    lightBox.destroy();
  }
  lightBox = new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.9,
  });
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}

// Утилітні методи
function digitSeparatorFix(number) {
  return number ? number.toLocaleString('de-CH') : '0'; // Розділення розрядів апострофами
  // return number.toLocaleString('en-US');  // ... комами
  // return number.toLocaleString('ua-UA');  // ... пробілами
}

function showTotalAmount(totalHits, total) {
  totalHits = digitSeparatorFix(totalHits);
  total = digitSeparatorFix(total);
  searchStats.innerHTML = `<div>Query limit:&nbsp;&nbsp;<span class="total-amount-number">${totalHits}</span></div><div>Of total:&nbsp;&nbsp;<span class="total-amount-number">${total}</span></div>`;
}

export {
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
  showTotalAmount,
  showLoadMoreButton,
  hideLoadMoreButton,
};
