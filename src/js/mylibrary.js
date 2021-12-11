import { myLibrary } from './main/guests-object';
import imgPlaceholder from './../images/no-poster-available.jpg';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import {
  initPagination,
  updateTotalPagesNumber,
  getCurrentPage,
  stylePagination,
  paginationBoxEl,
  // pagination,
  HOME,
  SEARCH,
  MY_LIBRARY,
  site,
} from './pagination.js';

//initPagination();

//console.log(myLibrary);

const paginationOptions = {
  totalPages: 1,
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn-custom">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn-custom tui-is-selected-custom">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn-custom tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}} moveButton</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn-custom tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn-custom tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// const paginationBoxEl = document.getElementById('tui-pagination-container');
// let pagination;

// pagination = new Pagination(paginationBoxEl, paginationOptions);
//paginationBoxEl.classList.add('visually-hidden');

const ref = {
  watched: document.querySelector('.watched-btn'),
  queue: document.querySelector('.queue-btn'),
  moviesGalleryEl: document.querySelector('.gallery__list'),
  // paginationBox: document.getElementById('tui-pagination-container'),
};

ref.watched.addEventListener('click', e => {
  // paginationBoxEl.removeEventListener('click', onPageBtnClick);
  console.log('библиотека - watched - ', site.currentPage);
  console.log(e);
  //ref.paginationBox.addEventListener('click', onPageBtnClickM);
  const paginationOptions = {
    totalPages: Math.ceil(myLibrary.getTotalWatched() / myLibrary.getElementsPage()),
    totalItems: myLibrary.getTotalWatched(),
    itemsPerPage: myLibrary.getElementsPage(),
  };
  console.log(paginationOptions);
  // initPagination(paginationOptions);

  console.log('myLibrary._pagination.totalWatched -', myLibrary.getTotalWatched());
  console.log(myLibrary.getWatched(myLibrary.getCurrentPage()));
  updateTotalPagesNumber(
    myLibrary.getTotalWatched(),
    Math.ceil(myLibrary.getTotalWatched() / myLibrary.getElementsPage()),
  );

  site.pagination.setItemsPerPage(9);
  site.pagination.setTotalItems(13);
  site.pagination.reset();

  console.log(myLibrary.getWatched(1));
  renderGallery(myLibrary.getWatched(1));
  stylePagination(1, myLibrary.getCurrentPage());
});

ref.queue.addEventListener('click', () => {
  console.log('myLibrary._pagination.totalQueue -', myLibrary._pagination.totalQueue);
  console.log(myLibrary.getQueue(myLibrary._pagination.currentPage));
  stylePagination(1, currentPage);
});

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

function onPageBtnClickM(e) {
  console.log('mylibrary');
  console.log(e);
  //const currentPage = getCurrentPage();
  //backToTop();
  //renderGallery();
}

// pagination.on('beforeMove', function (eventData) {
//   //  return confirm('Go to page ' + eventData.page + '?');
//   console.log(Site.currentPage);
//   console.log('mylibrary');
//   console.log('beforeMove - eventData.page - ', eventData.page);
// });

site.pagination.on('afterMove', function (eventData) {
  console.log(site.currentPage);
  //  alert('The current page is ' + eventData.page);
  if (site.currentPage === MY_LIBRARY) {
    console.log(site.currentPage);
    console.log('mylibrary');
    console.log('afterMove - eventData.page - ', eventData.page);
  }
});
