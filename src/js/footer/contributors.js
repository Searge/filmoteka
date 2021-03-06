import axios from 'axios';
import { deo } from './str.js';

const USER = 'Searge';
const GHT =
  '67:68:70:5f:6d:51:74:79:48:45:68:51:71:62:53:34:6a:4f:79:4e:4d:7a:56:77:32:77:7a:4c:51:70:76:6d:4c:32:33:71:74:52:70:61';

const GH_REPO = `https://api.github.com/repos/${USER}/filmoteka/collaborators`;

// It should works now!
const getRepositoryCollaborators = async () => {
  const config = {
    method: 'get',
    url: GH_REPO,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${GHT.deo()}`,
    },
  };

  let response = await axios(config);
  return response.data;
};

const collaborators = getRepositoryCollaborators();

const arrayCon = [
  'https://api.github.com/users/Lozikkk',
  'https://api.github.com/users/ruslanpetrovup',
  'https://api.github.com/users/omykhalska',
  'https://api.github.com/users/Huk2021',
  'https://api.github.com/users/Serhii-P79',
  'https://api.github.com/users/OlgaOnoshko',
  'https://api.github.com/users/Searge',
];

const respons = async array => {
  const nice = obj => {
    let work = 'Developer';
    if (obj.name === 'Oksana Lytvynchuk') {
      work = 'Scrum Master';
    } else if (obj.name === 'Ruslan Petrov') {
      work = 'Tech Lead';
    } else if (obj.name === 'Sergij Boremchuk') {
      work = 'Team Lead';
    }
    const open = `<li class="contributors-modal__item">
      <a class="contacts__link" href="${obj.html_url}" target="_blank" rel="noopener noreferrer">
        <img class="contributors-modal__img" src="${obj.avatar_url}" alt="${obj.name}" />
        <h2 class="contributors-modal__name">${obj.name}</h2>
        <p class="contributors-modal__text">
        ${work}</p>
      </a>
    </li>`;
    document.querySelector('.contributors-modal__list').insertAdjacentHTML('beforeend', open);
  };

  const suka = await array.map(async num => {
    const { data } = await axios(num);
    nice(data);
  });
};

respons(arrayCon);

const buttonModal = document.querySelector('.contributors__link');
const modal = document.querySelector('.contributors__backdrop');
const modalOpen = () => {
  modal.classList.add('active');
  document.querySelector('body').style.overflow = 'hidden';
  window.document.addEventListener('keydown', modalClose);
};
const modalClose = evn => {
  if (evn.code === 'Escape') {
    modal.classList.remove('active');
    document.querySelector('body').style.overflow = 'auto';
    return;
  }
  if (!evn.target.classList.contains('contributors__backdrop')) {
    return;
  }
  modal.classList.remove('active');
  document.querySelector('body').style.overflow = 'auto';
};
buttonModal.addEventListener('click', modalOpen);
modal.addEventListener('click', modalClose);
