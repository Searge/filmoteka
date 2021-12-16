import { myLibrary, foundFilms } from './main/guests-object';
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

//import { onClickQueue, onClickWatched } from './mylibraryrender';

initPagination();
myLibrary.initializationLibrary();

//import { onClickQueue, onClickWatched } from './mylibrary';

const homeLink = document.querySelector('[id="home"]');
const libraryLink = document.querySelector('[id="my-library"]');
const formHeader = document.querySelector('.header__form');
const mylibrarybtn = document.querySelector('.header__mylibrary');
const bgHeader = document.querySelector('.header__background');
const cleanGallery = document.querySelector('.gallery__list');

formHeader.classList.remove('is-hidden');
homeLink.classList.add('current');

homeLink.addEventListener('click', onLoadHome);
libraryLink.addEventListener('click', onLoadMylibrary);

function onLoadHome(e) {
  //e.preventDefault();
  site.currentPage = HOME;
  formHeader.classList.remove('is-hidden');
  mylibrarybtn.classList.add('is-hidden');
  bgHeader.classList.add('header__background');
  bgHeader.classList.remove('library__background');
  homeLink.classList.add('current');
  libraryLink.classList.remove('current');
}

function onLoadMylibrary(e) {
  e.preventDefault();
  site.currentPage = MY_LIBRARY;
  // console.log('Mylibrary');
  // console.log(site.currentPage);
  formHeader.classList.add('is-hidden');
  mylibrarybtn.classList.remove('is-hidden');
  bgHeader.classList.remove('header__background');
  bgHeader.classList.add('library__background');
  libraryLink.classList.add('current');
  homeLink.classList.remove('current');
  cleanGallery.innerHTML = '';
  paginationBoxEl.classList.add('visually-hidden');
  // console.log('heder');
  // console.log(paginationBoxEl);
  //onClickQueue();
}

document.querySelector('.themetoggle').addEventListener('click', event => {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
});

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('html').classList.add('dark');
      document.querySelector('.themetoggle span').textContent = 'dark_mode';
    } else {
      document.querySelector('html').classList.remove('dark');
      document.querySelector('.themetoggle span').textContent = 'wb_sunny';
    }
  } catch (err) {}
}

addDarkClassToHTML();
