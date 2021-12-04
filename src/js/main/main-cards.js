import { fetchPopularMovies } from '../api-service';
import genres from './genres';
const cardsMain = document.querySelector('.gallery__list');

const func = async () => {
  const res = await fetchPopularMovies().then(({ data }) =>
    data.results.map(num => {
      return `
<li class="gallery__item">
        <button class="gallery__link">
          <img class="gallery__image" src="https://image.tmdb.org/t/p/w500/${
            num.poster_path
          }" alt="">
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
};

func();

const genreSwitch = moviesID => {
  const list = [];
  genres.forEach(element => {
    if (element.id === moviesID) {
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