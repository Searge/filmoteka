import axios from 'axios';

const API_KEY = '92e1f02c8fe729e637f2b949e1264cfa';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchMoviesBySearch() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    const response = await axios.get(url);
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
