import { myLibrary } from './main/guests-object';
import imgPlaceholder from './../images/no-poster-available.jpg';

import {
  initPagination,
  updateTotalPagesNumber,
  getCurrentPage,
  stylePagination,
  HOME,
  SEARCH,
  MY_LIBRARY,
  site,
  paginationBoxEl,
} from './pagination.js';

const WATCHED = 'WATCHED';
const QUEUE = 'QUEUE';

let buttonClick = null;

const ref = {
  watched: document.querySelector('.watched-btn'),
  queue: document.querySelector('.queue-btn'),
  moviesGalleryEl: document.querySelector('.gallery__list'),
  linkMyLibrary: document.getElementById('my-library'),
};

ref.watched.addEventListener('click', onClickWatched);
ref.queue.addEventListener('click', onClickQueue);

function onClickWatched() {
  ref.queue.classList.remove('btn-activ');
  ref.watched.classList.add('btn-activ');
  buttonClick = WATCHED;
  // //console.log('библиотека - watched - ', site.currentPage);
  // //console.log(e);

  // //console.log('myLibrary._pagination.totalWatched -', myLibrary.getTotalWatched());
  // //console.log(myLibrary.getWatched(myLibrary.getCurrentPage()));

  updateTotalPagesNumber(
    myLibrary.getTotalWatched(),
    Math.ceil(myLibrary.getTotalWatched() / myLibrary.getElementsPage()),
  );

  site.pagination.setItemsPerPage(myLibrary.getElementsPage());
  site.pagination.setTotalItems(myLibrary.getTotalWatched());
  site.pagination.reset();

  ////console.log(myLibrary.getWatched(1));

  renderGallery(myLibrary.getWatched(1));
  stylePagination(1, myLibrary.getCurrentPage());
  if (myLibrary.getTotalWatched() <= 0) {
    ref.moviesGalleryEl.innerHTML =
      '<span class="empty">Empty, stop sitting at the monitor,<br> go out into nature, take a walk !!!</span>';
  }
}

function onClickQueue() {
  ref.queue.classList.add('btn-activ');
  ref.watched.classList.remove('btn-activ');
  buttonClick = QUEUE;
  updateTotalPagesNumber(
    myLibrary.getTotalQueue(),
    Math.ceil(myLibrary.getTotalQueue() / myLibrary.getElementsPage()),
  );

  site.pagination.setItemsPerPage(myLibrary.getElementsPage());
  site.pagination.setTotalItems(myLibrary.getTotalQueue());
  site.pagination.reset();

  // //console.log(myLibrary.getQueue(1));
  //console.log('myLibrary.getQueue(1) - ', myLibrary.getQueue(1));
  renderGallery(myLibrary.getQueue(1));

  // //console.log(myLibrary.getCurrentPage());

  stylePagination(1, myLibrary.getCurrentPage());
  if (myLibrary.getTotalQueue() <= 0) {
    ref.moviesGalleryEl.innerHTML =
      '<span class="empty">Empty, stop sitting at the monitor,<br> go out into nature, take a walk !!!</span>';
  }
}

function renderGallery(moviesArr) {
  const markup = moviesArr
    .map(({ id, poster_path, title, genres, release_date, vote_average }) => {
      const genresList = genres.map(genre => genre.name).join(', ');
      const year = release_date ? release_date.slice(0, 4) : 'Year N/A';
      return `
<li class="gallery__item">
        <button class="gallery__link" data-id="${id}">
        <div class="gallery__image-box">
          <img class="gallery__image lazyload"
          data-src="${
            poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : imgPlaceholder
          }"
          alt="${title}" 
          data-id="${id}">
          </div>
          <h2 class="gallery__title">
            ${title}
          </h2>
          <p class="gallery__text"><span class="movie__info-data">${genresList} | ${year} &nbsp; <span class="votes__colored">${vote_average}</span></span></p>
        </button>
      </li>
`;
    })
    .join('');

  ref.moviesGalleryEl.innerHTML = markup;
}

site.pagination.on('afterMove', function (eventData) {
  if (site.currentPage === MY_LIBRARY) {
    switch (buttonClick) {
      case WATCHED:
        renderGallery(myLibrary.getWatched(eventData.page));
        break;
      case QUEUE:
        renderGallery(myLibrary.getQueue(eventData.page));
        //  //console.log(myLibrary.getCurrentPage());
        break;
    }
    stylePagination(1, myLibrary.getCurrentPage());
  }
});

ref.linkMyLibrary.addEventListener('click', () => {
  // //console.log('my library');
  ref.queue.classList.add('btn-activ');
  onClickQueue();

  if (myLibrary.getTotalQueue() <= 0) {
    ref.moviesGalleryEl.innerHTML =
      '<span class="empty">Empty, stop sitting at the monitor,<br> go out into nature, take a walk !!!</span>';
  }
});

export { onClickQueue, onClickWatched };
