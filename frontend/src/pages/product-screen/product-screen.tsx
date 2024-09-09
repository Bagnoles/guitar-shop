import { Link, useParams } from 'react-router-dom';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { useEffect, useState } from 'react';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getGuitarInfoByID } from '../../store/api-actions';
import { getGuitarInfo } from '../../store/guitar/guitar-selectors';


function ProductScreen():JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isVisibleCharacteristic, setVisibleCharacteristic] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getGuitarInfoByID(id));
    }
  }, [id]);

  const guitarInfo = useAppSelector(getGuitarInfo);

  if (!guitarInfo) {
    return <NotFoundScreen />
  }

  const { name, photo, article, type, stringsCount, description } = guitarInfo;

  const handleCharacteristicClick = () => {
    if (isVisibleCharacteristic) {
      return;
    }
    setVisibleCharacteristic(true);
  };

  const handleDescriptionClick = () => {
    if (!isVisibleCharacteristic) {
      return;
    }
    setVisibleCharacteristic(false);
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoutes.Main}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoutes.List}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link">{name}</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={photo} srcSet="img/content/catalog-product-1@2x.png 2x" width="90" height="235" alt={name} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <br />
              <br />
              <div className="tabs">
                <button
                  className={isVisibleCharacteristic ? 'button button--medium tabs__button' : 'button button--black-border button--medium tabs__button'}
                  onClick={handleCharacteristicClick}
                >Характеристики</button>
                <button
                  className={isVisibleCharacteristic ? 'button button--black-border button--medium tabs__button' : 'button button--medium tabs__button'}
                  onClick={handleDescriptionClick}
                >Описание</button>
                <div className="tabs__content" id="characteristics">
                  <table className={isVisibleCharacteristic ? 'tabs__table' : 'tabs__table hidden'}>
                    <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{article}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{type}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{stringsCount} струнная</td>
                    </tr>
                    </tbody>
                  </table>
                  <p className={isVisibleCharacteristic ? 'tabs__product-description hidden' : 'tabs__product-description'}>{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductScreen;
