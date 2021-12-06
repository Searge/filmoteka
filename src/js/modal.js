import { fetchMovieById } from './api-service';
import axios from 'axios';
import genres from './main/genres';
import './main/main-cards';

const gallery = document.querySelector('.gallery__list');
// причепити слухач на кнопку на модалці
const backdrop = document.querySelector('[data-modal]');
// const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('.modal');
const movieCard = document.querySelector('.gallery__link');

gallery.addEventListener('click', onMovieCLick);
document.addEventListener('keydown', onEscClose);
// closeModalBtn.addEventListener('click', onBtnClose);
document.addEventListener('click', onClickClose);

function onMovieCLick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  backdrop.classList.remove('is-hidden');
  console.log(event.target.dataset.id);
  const movieId = event.target.dataset.id;
  fetchMovieById(movieId).then(responce => {
    const movieInfo = responce.data;
    console.log(movieInfo);
    renderModalCard(movieInfo);
  });
}

function renderModalCard({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  genres,
  overview,
}) {
  modal.innerHTML = `<div>
    <button data-modal-close class="modal__close">
        <!-- <svg width="11px" height="11px">
                    <use href="./images/svg/icons.svg#icon-cross"></use>
                </svg> -->
      </button>
    <img src='https://image.tmdb.org/t/p/w500/${poster_path}' alt="">
    <h2>${title}</h2>
    <ul>
      <li>
        <span class="">Vote / Votes</span><span class="">${vote_average} / ${vote_count}</span>
      </li>
      <li>
        <span class="">Popularity</span><span class="">${popularity}</span>
      </li>
      <li>
        <span>Original Title</span><span>${original_title}</span>
      </li>
      <li>
        <!-- подумати ще над оформленням списку жанрів -->
        <span>Genre</span><span>${genres}</span>
      </li>
    </ul>
    <h3>About</h3>
    <p>${overview}</p>
    <button type="button" class="add-button watched">Add to watched</button>
    <button type="button" class="add-button queue">Add to Queue</button>
    </div>`;
}

function onClickClose(event) {
  if (event.target === backdrop) {
    backdrop.classList.add('is-hidden');
  }
}

function onEscClose(event) {
  if (event.key === 'Escape') {
    backdrop.classList.add('is-hidden');
  }
}

function onBtnClose(event) {
  backdrop.classList.add('is-hidden');
}
