import { fetchPopularMovies } from '../api-service';
import genres from './genres';
const cardsMain = document.querySelector('.gallery__list');
import { startSpin, stopSpin } from '../spinner';

const func = async () => {
  startSpin();
  setTimeout(stopSpin, 500);
  const res = await fetchPopularMovies().then(({ data }) =>
    data.results.map(num => {
      return `
<li class="gallery__item">
        <button class="gallery__link">
        <div class="gallery__image-box">
          <img class="gallery__image" src="https://image.tmdb.org/t/p/w500/${
            num.poster_path
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
    }),
  );
  cardsMain.innerHTML = res.join('');
  // stopSpin();
};

func();

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
