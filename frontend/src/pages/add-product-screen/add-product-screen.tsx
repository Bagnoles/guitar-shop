import { useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { GuitarTypes } from '../../types/guitar-types.enum';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { createGuitar } from '../../store/api-actions';
import { toast } from 'react-toastify';
import { getGuitarsCreateErrorStatus } from '../../store/guitar/guitar-selectors';
import { editTime } from '../../utils';


function AddProductScreen():JSX.Element {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState(GuitarTypes.Electro);
  const [stringsCount, setStringsCount] = useState(4);
  const [article, setArticle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isError = useAppSelector(getGuitarsCreateErrorStatus);

  const handleSaveButtonClick = () => {
    dispatch(createGuitar({
      name,
      photo: 'img/content/catalog-product-1.png',
      type,
      article,
      stringsCount,
      price,
      description
    })).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('Карточка гитары успешно создана!');
        navigate(AppRoutes.List);
      }
    });
    if (isError) {
      toast.error('Не удалось создать карточку гитары, попробуйте еще раз');
    }
  }

  const handleChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  }
  const handleChangePrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+evt.target.value);
  }
  const handleChangeArticle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setArticle(evt.target.value);
  }
  const handleChangeDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  }
  const handleStringsCountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setStringsCount(+evt.target.value);
  }
  const handleTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setType(evt.target.value as GuitarTypes);
  }

  const handleResetButtonClick = () => {
    navigate(AppRoutes.List);
  }

  const isSaveButtonDisabled = description.length < 20 || description.length > 1024 || price < 100 || price > 1000000;

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <section className="add-item">
          <div className="container">
            <h1 className="add-item__title">Новый товар</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={AppRoutes.Main}>Вход</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товары</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Новый товар</a>
              </li>
            </ul>
            <form className="add-item__form" action="#" method="get" onSubmit={(evt) => evt.preventDefault()}>
              <div className="add-item__form-left">
                <div className="edit-item-image add-item__form-image">
                  <div className="edit-item-image__image-wrap">
                  </div>
                  <div className="edit-item-image__btn-wrap">
                    <button className="button button--small button--black-border edit-item-image__btn" type='button'>Добавить
                    </button>
                    <button className="button button--small button--black-border edit-item-image__btn" type='button'>Удалить</button>
                  </div>
                </div>
                <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
                  <input type="radio" id="guitar" name="item-type" value={GuitarTypes.Acustic} checked={type === GuitarTypes.Acustic} onChange={handleTypeChange} />
                  <label htmlFor="guitar">Акустическая гитара</label>
                  <input type="radio" id="el-guitar" name="item-type" value={GuitarTypes.Electro} checked={type === GuitarTypes.Electro} onChange={handleTypeChange} />
                  <label htmlFor="el-guitar">Электрогитара</label>
                  <input type="radio" id="ukulele" name="item-type" value={GuitarTypes.Ukulele} checked={type === GuitarTypes.Ukulele} onChange={handleTypeChange} />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
                <div className="input-radio add-item__form-radio"><span>Количество струн</span>
                  <input
                    type="radio"
                    id="string-qty-4"
                    name="string-qty"
                    value="4"
                    checked={stringsCount === 4}
                    onChange={handleStringsCountChange}
                    disabled={type === GuitarTypes.Acustic}
                  />
                  <label htmlFor="string-qty-4">4</label>
                  <input
                    type="radio"
                    id="string-qty-6"
                    name="string-qty"
                    value="6"
                    checked={stringsCount === 6}
                    onChange={handleStringsCountChange}
                    disabled={type === GuitarTypes.Ukulele}
                  />
                  <label htmlFor="string-qty-6">6</label>
                  <input
                    type="radio"
                    id="string-qty-7"
                    name="string-qty"
                    value="7"
                    checked={stringsCount === 7}
                    onChange={handleStringsCountChange}
                    disabled={type === GuitarTypes.Ukulele}
                  />
                  <label htmlFor="string-qty-7">7</label>
                  <input
                    type="radio"
                    id="string-qty-12"
                    name="string-qty"
                    value="12"
                    checked={stringsCount === 12}
                    onChange={handleStringsCountChange}
                    disabled={type === GuitarTypes.Ukulele || type === GuitarTypes.Electro}
                  />
                  <label htmlFor="string-qty-12">12</label>
                </div>
              </div>
              <div className="add-item__form-right">
                <div className="custom-input add-item__form-input">
                  <label><span>Дата добавления товара</span>
                    <input type="text" name="date" value={editTime(new Date().toISOString())} placeholder="Дата в формате 00.00.0000" readOnly />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input">
                  <label><span>Введите наименование товара</span>
                    <input
                      type="text"
                      name="title"
                      value={name}
                      placeholder="Наименование"
                      onChange={handleChangeName}
                      pattern='^.{10,100}$'
                      title='Минимальная длина наименования 10 символов, максимальная - 100 символов'
                    />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                  <label><span>Введите цену товара</span>
                    <input
                      type="text"
                      name="price"
                      value={price}
                      placeholder="Цена в формате 00000"
                      onChange={handleChangePrice}
                    />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input">
                  <label><span>Введите артикул товара</span>
                    <input
                      type="text"
                      name="sku"
                      value={article}
                      placeholder="Артикул товара"
                      onChange={handleChangeArticle}
                      pattern='^.{5,40}$'
                      title='Минимальная длина артикула 5 символов, максимальная - 40 символов'
                    />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-textarea add-item__form-textarea">
                  <label><span>Введите описание товара</span>
                    <textarea
                      name="description"
                      placeholder=""
                      onChange={handleChangeDescription}
                      value={description}
                    ></textarea>
                  </label>
                  <p>Заполните поле</p>
                </div>
              </div>
              <div className="add-item__form-buttons-wrap">
                <button
                  className="button button--small add-item__form-button"
                  type="submit"
                  disabled={isSaveButtonDisabled}
                  onClick={handleSaveButtonClick}
                >Сохранить изменения</button>
                <button className="button button--small add-item__form-button" type="button" onClick={handleResetButtonClick}>Вернуться к списку товаров</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AddProductScreen;
