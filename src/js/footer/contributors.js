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

collaborators.then(response => {
  response.forEach(obj => {
    axios(obj.url).then(res => createList(res.data));
  });
});
const list = [];
const createList = array => {
  array.forEach(num => {
    list.push(`<li class="contributors__modal-item">
      // <a class="contributors__modal-item-link" href="${num.html_url}">
      //     <img class="contributors__modal-img" src="${num.avatar_url}" alt="avatar">
      //     <h2 class="contributors__modal-name">
      //       ${num.name}
      //     </h2>
      //     </a>
      //   </li>`);
  });
};
document.querySelector('.contributors__modal-list').innerHTML = list.join('');

const buttonModal = document.querySelector('.contributors__button');
const modal = document.querySelector('.contributors__backdrop');
const modalOpen = () => {
  modal.classList.add('active');
};
const modalClose = evn => {
  if (!evn.target.classList.contains('contributors__backdrop')) {
    return;
  }
  modal.classList.remove('active');
};
buttonModal.addEventListener('click', modalOpen);
modal.addEventListener('click', modalClose);
