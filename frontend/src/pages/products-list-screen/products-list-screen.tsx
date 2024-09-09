import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { AppRoutes } from "../../const";
import FilterForm from "../../components/filter-form/filter-form";
import SortBlock from "../../components/sort-block/sort-block";
import GuitarsList from "../../components/guitars-list/guitars-list";
import Pagination from "../../components/pagination/pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { getGuitars, getGuitarsErrorStatus, getGuitarsLoadingStatus, getPages } from "../../store/guitar/guitar-selectors";
import { useState } from "react";
import { fetchGuitars } from "../../store/api-actions";
import { SortTypes } from "../../types/sort-types.enum";
import { SortDirection } from "../../types/sort-direction.enum";


function ProductsListScreen():JSX.Element {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState(SortTypes.Date);
  const [sortDirection, setSortDirection] = useState(SortDirection.Down);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const guitars = useAppSelector(getGuitars);
  const totalCount = useAppSelector(getPages);
  const isServerError = useAppSelector(getGuitarsErrorStatus);
  const isLoading = useAppSelector(getGuitarsLoadingStatus);

  const handleAddButtonClick = () => {
    navigate(AppRoutes.Add);
  }

  const handlePageChanged = (pageNumber: number) => {
    setPage(pageNumber);
    dispatch(fetchGuitars({
      page: pageNumber,
      sort: sortType,
      sortDirection: +sortDirection
    }));
  }

  const handleSortTypeChanged = (type: SortTypes) => {
    setSortType(type);
    dispatch(fetchGuitars({
      page,
      sort: type,
      sortDirection: +sortDirection
    }));
  }

  const handleSortDirectionChanged = (type: SortDirection) => {
    setSortDirection(type);
    dispatch(fetchGuitars({
      page,
      sort: sortType,
      sortDirection: +type
    }));
  }

  if (isServerError) {
    return <p>Произошла ошибка. Попробуйте еще раз.</p>
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={AppRoutes.Main}>Вход</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товары</a>
              </li>
            </ul>
            <div className="catalog">
              <FilterForm />
              <SortBlock
                activeSort={sortType}
                onChangeSortType={handleSortTypeChanged}
                activeDirection={sortDirection}
                onChangeDirection={handleSortDirectionChanged}
              />
              <div className="catalog-cards">
                { isLoading ? 'Идет загрузка...' : <GuitarsList data={guitars} /> }
              </div>
            </div>
            <button className="button product-list__button button--red button--big" onClick={handleAddButtonClick}>Добавить новый товар</button>
            <Pagination pages={totalCount} currentPage={page} onChangePage={handlePageChanged} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ProductsListScreen;
