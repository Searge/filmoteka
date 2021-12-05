import axios from 'axios';

const API_KEY = '92e1f02c8fe729e637f2b949e1264cfa';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMoviesBySearch = async (searchQuery, page) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`;
  const response = await axios(url);
  return response;
};

const fetchPopularMovies = async () => {
  const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`;
  const response = await axios(url);
  return response;
};

const fetchMovieById = async movieId => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}language=en-US`;
  const response = await axios(url);
  return response;
};

const fetchMoviesGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const genres = await axios(url);
  return genres;
};

export { fetchMoviesBySearch, fetchPopularMovies, fetchMovieById, fetchMoviesGenres };

