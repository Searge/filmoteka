import { fetchPopularMovies, fetchMoviesGenres } from '../api-service';
import 'lazysizes';
import { Spinner } from 'spin.js';
import opts from '../spinner';
import { updateTotalPagesNumber, stylePagination, HOME, site } from '../pagination.js';
import { backToTop } from '../scrolling';
import imgPlaceholder from '../../images/no-poster-available.jpg';

const START_PAGE = 1;
let page = START_PAGE;
let popularMoviesList = [];

const cardsMain = document.querySelector('.gallery__list');

createHomeGallery(page);

export async function createHomeGallery(page) {
  site.currentPage = HOME;

  var target = document.getElementById('gallery');
  var spinner = new Spinner(opts).spin(target);

  await fetchPopularMovies(page)
    .then(({ data, data: { results } }) => {
      page === START_PAGE && updateTotalPagesNumber(data.total_results, data.total_pages);
      stylePagination(START_PAGE, page);

      popularMoviesList = [];
      results.forEach(movie => {
        let movieData = {
          id: movie.id,
          poster: movie.poster_path,
          title: movie.original_title,
          genres: movie.genre_ids,
          year: movie.release_date ? movie.release_date.slice(0, 4) : 'Year N/A',
        };

        popularMoviesList.push(movieData);
      });
    })
    .catch(error => console.log(error));

  await fetchMoviesGenres()
    .then(response => {
      const {
        data: { genres },
      } = response;

      popularMoviesList.forEach(movie => {
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
    .catch(error => console.log(error));

  cardsMain.innerHTML = popularMoviesList
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

  spinner.stop();
}

site.pagination.on('afterMove', function (eventData) {
  if (site.currentPage === HOME) {
    backToTop();
    page = eventData.page;
    createHomeGallery(page);
  }
});
