export const paginationOptions = {
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
