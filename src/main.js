import { getImagesByQuery, maxImagesPerPage } from './js/pixabay-api.js';
import {
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
  showTotalAmount,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import './css/styles.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let page = 1;
let hits = 0;
let total = 0;
let totalHits = 0;

form.addEventListener('submit', event => {
  event.preventDefault();
  query = event.target.elements.query.value.trim();
  page = 1;

  if (!query) {
    no_content_warning();
    return;
  }

  clearGallery();
  loadData(query);
});

loadMoreBtn.addEventListener('click', () => {
  hideLoadMoreButton();
  page++;
  loadData(query);
});

const loadData = async query => {
  try {
    showLoader();
    const response = await getImagesByQuery(query, page);
    manageResponse(response);
  } catch (error) {
    iziToast.error(iziToastMessageGenerator(error.message, 'error'));
  } finally {
    hideLoader();
  }
};

function manageResponse(response) {
  ({ hits, total, totalHits } = response.data);

  if (hits.length === 0) {
    no_content_warning();
    return;
  }
  createGallery(hits);
  if (page > 1) {
    const galleryItem = document.querySelector('.gallery-item');
    const itemHeight = galleryItem.getBoundingClientRect().height;
    scrollBy({ top: itemHeight * 2, behavior: 'smooth' });
  }
  showTotalAmount(totalHits, total);

  if (totalHits / maxImagesPerPage > page) {
    showLoadMoreButton();
  } else {
    iziToast.info(
      iziToastMessageGenerator(
        "We're sorry, but you've reached the end of search results."
      )
    );
  }
}

// Утилітні методи
function iziToastMessageGenerator(msg, type = 'warning') {
  return {
    message: msg,
    position: 'topRight',
    theme: 'light',
    icon: type,
  };
}

function no_content_warning() {
  hideLoadMoreButton();
  iziToast.warning(
    iziToastMessageGenerator(
      'Sorry, there are no images matching your search query. Please try again!'
    )
  );
}
