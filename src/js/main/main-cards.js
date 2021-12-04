import { fetchPopularMovies } from '../api-service';

const cardsMain = document.querySelector('.gallery__list');
const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

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
          ${num.genre_ids
            .filter((num, index) => {
              return genreSwitch(num);
            })
            .join(', ')}
         
          </p>
        </button>
      </li>
`;
    }),
  );
  cardsMain.innerHTML = res.join('');
};
func();

const genreSwitch = number => {
  genres.forEach(element => {
    if (element.id === number) {
      return element.name;
    }
  });
};