import { fetchPopularMovies } from '../api-service';
import genres from './genres';
import 'lazysizes';
import { startSpin, stopSpin } from '../spinner';
import { updateTotalPagesNumber, stylePagination, HOME, site } from '../pagination.js';
import { backToTop } from '../scrolling';
import imgPlaceholder from '../../images/no-poster-available.jpg';

const cardsMain = document.querySelector('.gallery__list');
const START_PAGE = 1;
let page = START_PAGE;

export const func = async page => {
  site.currentPage = HOME;
  startSpin();

  const res = await fetchPopularMovies(page).then(({ data }) => {
    page === START_PAGE && updateTotalPagesNumber(data.total_results, data.total_pages);
    stylePagination(START_PAGE, page);

    return data.results.map(num => {
      return `
<li class="gallery__item">
        <button class="gallery__link">
        <div class="gallery__image-box">
          <img class="gallery__image lazyload" data-src="${
            num.poster_path ? `https://image.tmdb.org/t/p/w500/${num.poster_path}` : imgPlaceholder
          }" alt="" data-id="${num.id}"">
          </div>
          <h2 class="gallery__title">
            ${num.original_title}
          </h2>
          <p class="gallery__text">
          ${filterEl(num.genre_ids)} | ${num.release_date.slice(0, 4)}
          </p>
        </button>
      </li>
`;
    });
  });
  cardsMain.innerHTML = res.join('');
  stopSpin();
};

func(page);

const genreSwitch = genreID => {
  const list = [];
  genres.forEach(element => {
    if (element.id === genreID) {
      list.push(element.name);
    }
  });
  return list[0];
};

const filterEl = array => {
  const list = [];
  array.filter((num, index) => {
    if (index < 2) {
      list.push(genreSwitch(num));
    }
    if (index === 2) {
      list.push('Other');
    }
  });
  return list.join(', ');
};

site.pagination.on('afterMove', function (eventData) {
  if (site.currentPage === HOME) {
    backToTop();
    page = eventData.page;
    func(page);
  }
});
