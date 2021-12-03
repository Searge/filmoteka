import axios from 'axios';

const API_KEY = '92e1f02c8fe729e637f2b949e1264cfa';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMoviesBySearch() {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
  return await axios(url);
}

const fetchPopularMovies = async () => {
  const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
  const response = await axios(url);
  return response;
};

export { fetchMoviesBySearch, fetchPopularMovies };
