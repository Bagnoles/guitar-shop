import { Link } from "react-router-dom";
import { Guitar } from "../../types/guitar.type";
import { AppRoutes } from "../../const";

type GuitarCardProps = {
  info: Guitar;
}

function GuitarCard({info}: GuitarCardProps):JSX.Element {
  const {id, name, photo, price, date } = info;

  const handleDeleteButtonClick = () => {
    console.log('Delete!');
  }

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={photo} srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`/products/${id}`}><p className="catalog-item__data-title">{name}</p></Link>
          <br />
          <p className="catalog-item__data-date">Дата добавления {date}</p>
          <p className="catalog-item__data-price">{price} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link className="button button--small button--black-border" to={`/edit/${id}`} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={handleDeleteButtonClick}>Удалить</button>
      </div>
    </li>
  );
}

export default GuitarCard;
