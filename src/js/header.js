import { myLibrary, foundFilms } from './main/guests-object';

myLibrary.initializationLibrary();

const homeLink = document.querySelector('[id="home"]');
const libraryLink = document.querySelector('[id="my-library"]');
const formHeader = document.querySelector('.header__form');
const mylibrarybtn = document.querySelector('.header__mylibrary');
const bgHeader = document.querySelector('.header__background');

formHeader.classList.remove('is-hidden');
homeLink.classList.add('current');

homeLink.addEventListener('click', onLoadHome);
libraryLink.addEventListener('click', onLoadMylibrary);

function onLoadHome(e) {
  e.preventDefault();
  formHeader.classList.remove('is-hidden');
  mylibrarybtn.classList.add('is-hidden');
  bgHeader.classList.add('header__background');
  bgHeader.classList.remove('library__background');
  homeLink.classList.add('current');
  libraryLink.classList.remove('current');
}

function onLoadMylibrary(e) {
  e.preventDefault();
  formHeader.classList.add('is-hidden');
  mylibrarybtn.classList.remove('is-hidden');
  bgHeader.classList.remove('header__background');
  bgHeader.classList.add('library__background');
  libraryLink.classList.add('current');
  homeLink.classList.remove('current');
}
