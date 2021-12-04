import { save, load } from './storage';

export const myLibrary = {
  _watched: [], // просмотренные фильмы
  _queue: [], // добавленные в очередь

  // инициализация
  InitializationLibrary() {
    this._readLibrary();
  },

  // вернуть просмотренне
  getWatched() {
    return this._watched;
  },

  // вернуть очередь
  getQueue() {
    return this._queue;
  },

  _saveWatched() {
    save('watched', this._watched);
  },

  _saveQueue() {
    save('queue', this._queue);
  },

  _readLibrary() {
    this._watched = load('watched');
    this._queue = load('queue');
  },

  // просмотренные фильмы
  addWatched(movie = {}) {
    // movie.id
    if (!this._watched.find(element => element.id === movie.id)) {
      this._watched.puch(movie);
      this._saveWatched();
      this._deleteQueue(movie);
    }
  },

  // очередь
  addQueue(movie = {}) {
    if (!this._queue.find(element => element.id === movie.id)) {
      this._queue.puch(movie);
      this._saveQueue();
    }
  },

  // удалить из очереди
  _deleteQueue(movie = {}) {
    if (this._queue.find((element, index) => element.id === movie.id)) {
      this._queue.splice(index, 1);
      this._saveQueue();
    }
  },
};
