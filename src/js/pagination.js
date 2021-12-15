import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const HOME = 1;
const SEARCH = 2;
const MY_LIBRARY = 3;

const site = {
  currentPage: 0,
  pagination: null,
};

const paginationOptions = {
  totalPages: 1,
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn-custom">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn-custom tui-is-selected-custom">{{page}}</strong>',
    moveButton:
      '<a id="{{type}}" href="#" class="tui-page-btn-custom tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span id="{{type}}" class="tui-page-btn-custom tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn-custom tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const paginationBoxEl = document.querySelector('#tui-pagination-container');

const initPagination = (e_paginationOptions = {}) => {
  const l_paginationOptions = { ...paginationOptions, ...e_paginationOptions };
  paginationBoxEl.classList.add('visually-hidden');
  site.pagination = new Pagination(paginationBoxEl, l_paginationOptions);
};

const updateTotalPagesNumber = (totalResults, totalPages) => {
  site.pagination.reset(totalResults);
  paginationOptions.totalPages = totalPages;
};

const getCurrentPage = () => site.pagination.getCurrentPage();

const stylePagination = (firstPage, curPage) => {
  let { totalPages, visiblePages } = paginationOptions;
  const middleVisiblePage = Math.ceil(visiblePages / 2);

  if (totalPages <= 1) {
    paginationBoxEl.classList.add('visually-hidden');
  } else {
    document.querySelector('.tui-page-btn-custom.tui-last').innerHTML = `${totalPages}`;
    document.querySelector('.tui-page-btn-custom.tui-first').innerHTML = `${firstPage}`;

    if (curPage < firstPage + middleVisiblePage || totalPages <= visiblePages) {
      document.querySelector('.tui-page-btn-custom.tui-first').classList.add('visually-hidden');
      document.querySelector('.tui-page-btn-custom.tui-prev').classList.add('visually-hidden');
    } else {
      document.querySelector('#prev')?.after(document.querySelector('#first'));
      document.querySelector('.tui-page-btn-custom.tui-first').classList.remove('visually-hidden');
      document.querySelector('.tui-page-btn-custom.tui-prev').classList.remove('visually-hidden');
    }

    if (curPage > totalPages - middleVisiblePage || totalPages <= visiblePages) {
      document.querySelector('.tui-page-btn-custom.tui-last').classList.add('visually-hidden');
      document.querySelector('.tui-page-btn-custom.tui-next').classList.add('visually-hidden');
    } else {
      document.querySelector('#last')?.after(document.querySelector('#next'));
      document.querySelector('.tui-page-btn-custom.tui-last').classList.remove('visually-hidden');
      document.querySelector('.tui-page-btn-custom.tui-next').classList.remove('visually-hidden');
    }
    paginationBoxEl.classList.remove('visually-hidden');
  }
};

export {
  initPagination,
  updateTotalPagesNumber,
  getCurrentPage,
  stylePagination,
  HOME,
  SEARCH,
  MY_LIBRARY,
  site,
  paginationBoxEl,
};
