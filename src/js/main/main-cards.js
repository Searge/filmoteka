import { fetchPopularMovies } from '../api-service';
import genres from './genres';
import 'lazysizes';
import { startSpin, stopSpin } from '../spinner';
import {
  initPagination,
  updateTotalPagesNumber,
  getCurrentPage,
  stylePagination,
  paginationBoxEl,
} from '../pagination.js';
import { backToTop } from '../scrolling';
import imgPlaceholder from '../../images/no-poster-available.jpg';

const cardsMain = document.querySelector('.gallery__list');
let page = 1;

const func = async page => {
  startSpin();
  paginationBoxEl.addEventListener('click', onPageClick);

  const res = await fetchPopularMovies(page).then(({ data }) => {
    page === 1 && updateTotalPagesNumber(data.total_results, data.total_pages);
    stylePagination(1, page);

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

initPagination();

func(page);

export const genreSwitch = genreID => {
  const list = [];
  genres.forEach(element => {
    if (element.id === genreID) {
      list.push(element.name);
    }
  });
  return list[0];
};

export const filterEl = array => {
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

export async function onPageClick() {
  page = getCurrentPage();
  backToTop();
  paginationBoxEl.removeEventListener('click', onPageClick);
  await func(page);
}
