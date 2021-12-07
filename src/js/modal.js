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
  <div class="movie__container">
    <div class="image__container"> 
    <img class="modal__movie-img" src='https://image.tmdb.org/t/p/w500/${poster_path}' alt="">
    </div>
    <div class="movie__info">
    <h2 class="modal__movie-title">${title}</h2>
    <ul class="modal__movie-info">
      <li class="movie__info-item">
        <span class="movie__info-title">Vote / Votes</span><span class="movie__info-data"><span class="votes__colored">${vote_average}</span><span class="vote__divide">/</span> ${vote_count}</span>
      </li>
      <li class="movie__info-item">
        <span class="movie__info-title">Popularity</span><span class="movie__info-data">${popularity}</span>
      </li>
      <li class="movie__info-item">
        <span class="movie__info-title">Original Title</span><span class="movie__info-data original-title">${original_title}</span>
      </li> 
      <li class="movie__info-item">
        <!-- подумати ще над оформленням списку жанрів -->
        <span class="movie__info-title">Genre</span><span class="movie__info-data">${{
          genres,
        }}</span>
      </li>
    </ul>
    <h3 class="movie__overview-title">ABOUT</h3>
    <p class="movie__overview-text">${overview}</p>
    <div class="movie__buttons">
    <button type="button" class="add-button" data-id="modal__watched-btn">ADD TO WATCHED</button>
    <button type="button" class="add-button" data-id="modal__btn">ADD TO QUEUE</button>
    <button data-modal-close class="modal__close" data-id="modal__close-btn">
        <!-- <svg width="11px" height="11px">
                    <use href="./images/svg/icons.svg#icon-cross"></use>
                </svg> -->
      </button>
    </div>
    </div>
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
