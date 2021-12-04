import { fetchMoviesBySearch } from '../api-service.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.header__form');
const moviesGalleryEl = document.querySelector('.gallery__list');

formEl.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  createMoviesGallery();
}

function createMoviesGallery() {
  const searchQuery = formEl.elements.searchQuery.value.trim();

  if (!searchQuery) {
    Notify.info(`The search string cannot be empty. Please specify your search query.`);
    return;
  }

  fetchMoviesBySearch(searchQuery, 1)
    .then(response => {
      const {
        data: { results },
      } = response;

      if (results.length === 0) {
        Notify.failure(`Sorry, there are no movies matching your search query. Please try again.`);
      } else {
        renderGallery(results);
      }
    })
    .catch(error => console.log(error));
}

function renderGallery(moviesArr) {
  const markup = moviesArr
    .map(movie => {
      return `
<li class="gallery__item">
        <button class="gallery__link">
          <img class="gallery__image" src="https://image.tmdb.org/t/p/w500/${
            movie.poster_path
          }" alt="">
          <h2 class="gallery__title">
            ${movie.original_title}
          </h2>
          <p class="gallery__text">
          genres | ${movie.release_date.slice(0, 4)}
          </p>
        </button>
      </li>
`;
    })
    .join('');
  moviesGalleryEl.innerHTML = markup;
}
