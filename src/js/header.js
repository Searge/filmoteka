const homeLink = document.querySelector('[id="home"]');
const libraryLink = document.querySelector('[id="my-library"]');
const formHeader = document.querySelector('.header__form');
const mylibrarybtn = document.querySelector('.header__mylibrary');

formHeader.classList.remove('is-hidden');

homeLink.addEventListener('click', onLoadHome);
libraryLink.addEventListener('click', onLoadMylibrary);

function onLoadHome(e) {
  e.preventDefault();
  formHeader.classList.remove('is-hidden');
  mylibrarybtn.classList.add('is-hidden');
}

function onLoadMylibrary(e) {
  e.preventDefault();
  formHeader.classList.add('is-hidden');
  mylibrarybtn.classList.remove('is-hidden');
}
