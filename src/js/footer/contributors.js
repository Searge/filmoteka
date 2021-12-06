import axios from 'axios';

const USER = 'Searge';
const GHT = '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';

const GH_REPO = `https://api.github.com/repos/${USER}/filmoteka/collaborators`;

const getRepositoryCollaborators = async () => {
  const config = {
    method: 'get',
    url: GH_REPO,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${GHT}`,
    },
  };

  let response = await axios(config);
  return response.data;
};

const collaborators = getRepositoryCollaborators();

collaborators.then(response =>
  response.forEach(obj => {
    console.log(obj.login);
  }),
);
