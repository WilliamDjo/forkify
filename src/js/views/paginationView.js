import View from './View';
import icons from 'url:../../img/icons.svg'; // Do this for importing any static assets that are not programming files

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateNextPageBtn(currPage);
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generatePrevPageBtn(currPage);
    }

    // Other page
    if (this._data.page < numPages) {
      return (
        this._generatePrevPageBtn(currPage) +
        this._generateNextPageBtn(currPage)
      );
    }
    // Page 1, and there are NO other pages
    return '';
  }

  _generateNextPageBtn(currentPage) {
    return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>   
    `;
  }

  _generatePrevPageBtn(currentPage) {
    return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
      `;
  }
}

export default new PaginationView();
