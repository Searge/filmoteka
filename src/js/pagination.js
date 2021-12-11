import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

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
      '<a href="#" class="tui-page-btn-custom tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}} moveButton</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn-custom tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn-custom tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const paginationBoxEl = document.querySelector('#tui-pagination-container');
let pagination;

const initPagination = () => {
  pagination = new Pagination(paginationBoxEl, paginationOptions);
  paginationBoxEl.classList.add('visually-hidden');
};

const updateTotalPagesNumber = (totalResults, totalPages) => {
  pagination.reset(totalResults);
  paginationOptions.totalPages = totalPages;
};

const getCurrentPage = () => pagination.getCurrentPage();

const stylePagination = (firstPage, curPage) => {
  let { totalPages, visiblePages } = paginationOptions;

  if (totalPages === 1) {
    paginationBoxEl.classList.add('visually-hidden');
  } else {
    document.querySelector('.tui-page-btn-custom.tui-last').innerHTML = `${totalPages}`;
    document.querySelector('.tui-page-btn-custom.tui-first').innerHTML = `${firstPage}`;

    if (curPage < firstPage + 3 || totalPages <= visiblePages) {
      document.querySelector('.tui-page-btn-custom.tui-first').classList.add('visually-hidden');
      document.querySelector('.tui-page-btn-custom.tui-prev').classList.add('visually-hidden');
    } else {
      document.querySelector('.tui-page-btn-custom.tui-first').classList.remove('visually-hidden');
      document.querySelector('.tui-page-btn-custom.tui-prev').classList.remove('visually-hidden');
    }

    if (curPage > totalPages - 3 || totalPages <= visiblePages) {
      document.querySelector('.tui-page-btn-custom.tui-last').classList.add('visually-hidden');
      document.querySelector('.tui-page-btn-custom.tui-next').classList.add('visually-hidden');
    } else {
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
  paginationBoxEl,
  pagination,
};
