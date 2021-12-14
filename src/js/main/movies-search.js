import { fetchMoviesBySearch, fetchMoviesGenres } from '../api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'lazysizes';
import imgPlaceholder from '../../images/no-poster-available.jpg';
import { Spinner } from 'spin.js';
import opts from '../spinner';
import { backToTop } from '../scrolling';
import { updateTotalPagesNumber, stylePagination, SEARCH, site } from '../pagination.js';
import { createHomeGallery } from './main-cards';

const WARNING_MESSAGE = 'The search string cannot be empty. Please, specify your search query';
const ERROR_MESSAGE =
  'Search result not successful. Please, enter the correct movie name and try again';
const FIRST_PAGE = 1;

const formEl = document.querySelector('.header__form');
const moviesGalleryEl = document.querySelector('.gallery__list');

const notifyOptions = {
  position: 'center-top',
  fontSize: '14px',
};
let currentPage = FIRST_PAGE;
let list = [];
let isApiResponseNotEmpty = false;

formEl.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  site.currentPage = SEARCH;
  currentPage = FIRST_PAGE;
  createMoviesGallery(currentPage);
}

async function createMoviesGallery(currentPage) {
  const searchQuery = formEl.elements.searchQuery.value.trim();

  if (!searchQuery) {
    Notify.info(WARNING_MESSAGE, notifyOptions);
    return;
  }

  const target = document.getElementById('gallery');
  const spinner = new Spinner(opts).spin(target);

  await fetchMoviesBySearch(searchQuery, currentPage)
    .then(response => {
      const {
        data,
        data: { results },
      } = response;

      if (results.length === 0) {
        Notify.failure(ERROR_MESSAGE, notifyOptions);
        createHomeGallery(currentPage);
        formEl.reset();
      } else {
        isApiResponseNotEmpty = true;
        list = [];
        results.forEach(movie => {
          let movieData = {
            id: movie.id,
            poster: movie.poster_path,
            title: movie.original_title,
            genres: typeof movie.genre_ids,
            year: movie.release_date ? movie.release_date.slice(0, 4) : 'Year N/A',
          };

          list.push(movieData);
        });

        currentPage === FIRST_PAGE && updateTotalPagesNumber(data.total_results, data.total_pages);
      }

      !isApiResponseNotEmpty && spinner.stop();
    })
    .catch(error => {
      console.log(error);
      Notify.failure(
        'Ooops! Something went wrong... You may refresh a page or try again later',
        notifyOptions,
      );
    });

  if (isApiResponseNotEmpty) {
    await fetchMoviesGenres()
      .then(response => {
        const {
          data: { genres },
        } = response;

        list.forEach(movie => {
          movie.genres = movie.genres.map(id => {
            genres.forEach(obj => {
              if (obj.id === id) {
                id = obj.name;
              }
            });
            return id;
          });

          switch (true) {
            case movie.genres.length > 0 && movie.genres.length <= 2:
              movie.genres = movie.genres.join(', ');
              break;

            case movie.genres.length > 2:
              movie.genres[2] = 'Other';
              movie.genres = movie.genres.slice(0, 3).join(', ');
              break;

            default:
              movie.genres = 'Genre N/A';
              break;
          }
        });
      })
      .catch(error => {
        console.log('Failed to get genres : ', error);
        list.map(movie => (movie.genres = 'Genres N/A'));
      });
  }

  isApiResponseNotEmpty && renderGallery(list);
  stylePagination(FIRST_PAGE, currentPage);
  spinner.stop();
}

function renderGallery(moviesArr) {
  const markup = moviesArr
    .map(({ id, poster, title, genres, year }) => {
      return `
<li class="gallery__item">
        <a href="#" class="gallery__link" data-id="${id}">
        <div class="gallery__image-box">
          <img class="gallery__image lazyload"
          data-src="${poster ? `https://image.tmdb.org/t/p/w500/${poster}` : imgPlaceholder}"
          alt="${title}" 
          data-id="${id}">
          </div>
          <h2 class="gallery__title" data-id="${id}">
            ${title}
          </h2>
          <p class="gallery__text" data-id="${id}">${genres} | ${year}</p>
        </a>
      </li>
`;
    })
    .join('');

  moviesGalleryEl.innerHTML = markup;
  isApiResponseNotEmpty = false;
}

site.pagination.on('afterMove', function (eventData) {
  if (site.currentPage === SEARCH) {
    backToTop();
    currentPage = eventData.page;
    createMoviesGallery(currentPage);
  }
});
