import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { AppRoutes } from "../../const";
import FilterForm from "../../components/filter-form/filter-form";
import SortBlock from "../../components/sort-block/sort-block";
import GuitarsList from "../../components/guitars-list/guitars-list";
import Pagination from "../../components/pagination/pagination";
import { guitars } from "../../mocks/guitars";


function ProductsListScreen():JSX.Element {
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate(AppRoutes.Add);
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
              <SortBlock />
              <div className="catalog-cards">
                <GuitarsList data={guitars} />
              </div>
            </div>
            <button className="button product-list__button button--red button--big" onClick={handleAddButtonClick}>Добавить новый товар</button>
            <Pagination />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ProductsListScreen;
