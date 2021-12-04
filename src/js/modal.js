import { fetchMovieById } from './api-service';
import axios from 'axios';
import genres from './main/genres';

const gallery = document.querySelector('.gallery');
// треба якось його почепити на gallery__link
const backdrop = document.querySelector('[data-modal]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('.modal');

gallery.addEventListener('click', onMovieCLick);
document.addEventListener('keydown', onEscClose);
closeModalBtn.addEventListener('click', onBtnClose);
document.addEventListener('click', onClickClose);

function onMovieCLick(event) {
  backdrop.classList.remove('is-hidden');
  console.log(event.target);
  // fetchMovieById(movieId)
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

// <!-- шаблон на контент модалки -->
//   `<div>
//     <img src='https://image.tmdb.org/t/p/w500/${poster_path}' alt="">
//     <h2>${title}</h2>
//     <ul>
//       <li>
//         <span class="">Vote / Votes</span><span class="">${vote_average} / ${vote_count}</span>
//       </li>
//       <li>
//         <span class="">Popularity</span><span class="">${popularity}</span>
//       </li>
//       <li>
//         <span>Original Title</span><span>${original_title}</span>
//       </li>
//       <li>
//         <!-- подумати ще над оформленням списку жанрів -->
//         <span>Genre</span><span>${genres}</span>
//       </li>
//       <h3>About</h3>
//       <p>${overview}</p>
//     </ul>
//     <button type="button" class="add-button watched">Add to watched</button>
//     <button type="button" class="add-button queue">Add to Queue</button>
//     </div>`
