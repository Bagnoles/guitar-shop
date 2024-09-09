type PaginationProps = {
  pages: number;
  currentPage: number;
  onChangePage: (pageNumber: number) => void
}

type PaginationItemProps = {
  active: boolean;
  page: number;
  onClickHandler: () => void
}

function PaginationItem({active, page, onClickHandler}: PaginationItemProps):JSX.Element {
  return (
    <li className={active ? 'pagination__page pagination__page--active' : 'pagination__page'} onClick={onClickHandler}>
      <a className="link pagination__page-link">{page}</a>
    </li>
  );
}

function Pagination({pages, currentPage, onChangePage}: PaginationProps):JSX.Element {
  const elements = Array.from({length: pages});
  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        {elements.map((_item, index) => <PaginationItem page={index + 1} active={currentPage === index + 1} onClickHandler={() => onChangePage(index + 1)} key={index}/>)}
        {currentPage < pages && <li className="pagination__page pagination__page--next" id="next" onClick={() => onChangePage(currentPage + 1)}><a className="link pagination__page-link" >Далее</a>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
