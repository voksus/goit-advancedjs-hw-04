import axios from 'axios';

const maxImagesPerPage = 15;

async function getImagesByQuery(query, page) {
  const API_KEY = '55629704-0f43e8f048148a116b7a60f53';
  const BASE_URL = 'https://pixabay.com/api/';

  return await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      order: 'latest',
      page: page,
      per_page: maxImagesPerPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
}

export { getImagesByQuery, maxImagesPerPage };
