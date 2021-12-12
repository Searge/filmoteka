import { save, load } from './storage';

export const foundFilms = {
  currentPage: 1,
  total_pages: 0,
  arrayFilms: [],
};

export const myLibrary = {
  _watched: [], // просмотренные фильмы
  _queue: [], // добавленные в очередь
  _pagination: {
    currentPage: 1,
    elementsPage: 9,
    totalWatched: 0,
    totalQueue: 0,
  },

  // инициализация
  initializationLibrary() {
    if (window.innerWidth < 1024 && window.innerWidth >= 768) {
      this._pagination.elementsPage = 8;
    } else if (window.innerWidth < 768) {
      this._pagination.elementsPage = 4;
    }
    this._readLibrary();
    this._pagination.totalWatched = this._watched.length;
    this._pagination.totalQueue = this._queue.length;
  },

  // вернуть просмотренне

  // slice(begin, end) возвращает новый массив, содержащий копию части исходного массива, не изменяя его. Копия делается от begin и до, но не включая, end - индексы элементов исходного массива.

  getCurrentPage() {
    return this._pagination.currentPage;
  },

  getElementsPage() {
    return this._pagination.elementsPage;
  },

  getTotalWatched() {
    return this._pagination.totalWatched;
  },

  getTotalQueue() {
    return this._pagination.totalQueue;
  },

  isWatched(id) {
    if (
      this._watched.find(element => {
        return element.id === id;
      })
    ) {
      return true;
    }
    return false;
  },

  isQueue(id) {
    if (
      this._queue.find(element => {
        return element.id === id;
      })
    ) {
      return true;
    }
    return false;
  },

  getWatched(currentPage) {
    const maxPage = Math.ceil(this._pagination.totalWatched / this._pagination.elementsPage);
    // console.log('maxPage -', maxPage);
    this._pagination.currentPage = maxPage < currentPage ? maxPage : currentPage;
    //  console.log('this._pagination.currentPage -', this._pagination.currentPage);
    const startElement =
      this._pagination.elementsPage * this._pagination.currentPage - this._pagination.elementsPage;
    const endElement = this._pagination.elementsPage * this._pagination.currentPage;
    //  console.log('startElement -', startElement);
    //  console.log('endElement -', endElement);
    return this._watched.slice(startElement, endElement);
  },

  // вернуть очередь
  getQueue(currentPage) {
    const maxPage = Math.ceil(this._pagination.totalQueue / this._pagination.elementsPage);
    this._pagination.currentPage = maxPage < currentPage ? maxPage : currentPage;
    const startElement =
      this._pagination.elementsPage * this._pagination.currentPage - this._pagination.elementsPage;
    const endElement = this._pagination.elementsPage * this._pagination.currentPage;
    return this._queue.slice(startElement, endElement);
  },

  _saveWatched() {
    save('watched', this._watched);
  },

  _saveQueue() {
    save('queue', this._queue);
  },

  _readLibrary() {
    let dataLoad = load('watched');
    this._watched = dataLoad ? dataLoad : [];
    dataLoad = load('queue');
    this._queue = dataLoad ? dataLoad : [];
  },

  // просмотренные фильмы
  addWatched(movie = {}) {
    // movie.id
    console.log(movie.id);
    if (!this._watched.find(element => element.id === movie.id) && movie.id) {
      this._watched.push(movie);
      this._saveWatched();
      this._pagination.totalWatched = this._watched.length;
    }
    this._deleteQueue(movie);
  },

  // очередь
  addQueue(movie = {}) {
    console.log(movie.id);
    if (!this._queue.find(element => element.id === movie.id) && movie.id) {
      this._queue.push(movie);
      this._saveQueue();
      this._pagination.totalQueue = this._queue.length;
    }
  },

  // удалить из очереди
  _deleteQueue(movie = {}) {
    this._queue.find((element, index) => {
      if (element.id === movie.id) {
        this._queue.splice(index, 1);
        this._saveQueue();
        this._pagination.totalQueue = this._queue.length;
      }
    });
  },
};
