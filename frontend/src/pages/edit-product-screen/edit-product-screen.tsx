import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getGuitarInfoByID, updateGuitarInfo } from '../../store/api-actions';
import { getGuitarInfo, getGuitarsInfoLoadingStatus, getGuitarsInfoErrorStatus, getGuitarsUpdateErrorStatus } from '../../store/guitar/guitar-selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoutes } from '../../const';
import { GuitarTypes } from '../../types/guitar-types.enum';
import { editTime } from '../../utils';
import { toast } from 'react-toastify';


function EditProductScreen():JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getGuitarInfoByID(id));
    }
  }, [id]);

  const guitarInfo = useAppSelector(getGuitarInfo);
  const isServerError = useAppSelector(getGuitarsInfoErrorStatus);
  const isLoading = useAppSelector(getGuitarsInfoLoadingStatus);
  const isUpdateError = useAppSelector(getGuitarsUpdateErrorStatus);

  const [name, setName] = useState(guitarInfo?.name);
  const [price, setPrice] = useState(guitarInfo?.price);
  const [type, setType] = useState(guitarInfo?.type);
  const [stringsCount, setStringsCount] = useState(guitarInfo?.stringsCount);
  const [article, setArticle] = useState(guitarInfo?.article);
  const [description, setDescription] = useState(guitarInfo?.description);

  if (isServerError) {
    return <p>Произошла ошибка. Попробуйте еще раз.</p>
  }

  if (!guitarInfo) {
    return <NotFoundScreen />
  }

  const handleResetButtonClick = () => {
    navigate(AppRoutes.List);
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

  const handleSaveButtonClick = () => {
    if (id) {
      dispatch(updateGuitarInfo({
        name,
        photo: 'img/content/catalog-product-1.png',
        type,
        article,
        stringsCount,
        price,
        description,
        id
      })).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success('Карточка гитары успешно обновлена!');
          navigate(AppRoutes.List);
        }
      });
    }

    if (isUpdateError) {
      toast.error('Не удалось обновить карточку гитары, попробуйте еще раз');
    }
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        {isLoading ? 'Идет загрузка, подождите....' : <>
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">{name}</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={AppRoutes.Main}>Вход</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товары</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">{name}</a>
              </li>
            </ul>
            <form className="edit-item__form" action="#" method="get" onSubmit={(evt) => evt.preventDefault()}>
              <div className="edit-item__form-left">
                <div className="edit-item-image edit-item__form-image">
                  <div className="edit-item-image__image-wrap">
                    <img className="edit-item-image__image" src={guitarInfo.photo} width="133" height="332" alt={name} />
                  </div>
                  <div className="edit-item-image__btn-wrap">
                    <button className="button button--small button--black-border edit-item-image__btn">Заменить
                    </button>
                    <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                  </div>
                </div>
                <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
                  <input type="radio" id="guitar" name="item-type" value={GuitarTypes.Acustic} checked={type === GuitarTypes.Acustic} onChange={handleTypeChange}/>
                  <label htmlFor="guitar">Акустическая гитара</label>
                  <input type="radio" id="el-guitar" name="item-type" value={GuitarTypes.Electro} checked={type === GuitarTypes.Electro} onChange={handleTypeChange} />
                  <label htmlFor="el-guitar">Электрогитара</label>
                  <input type="radio" id="ukulele" name="item-type" value={GuitarTypes.Ukulele} checked={type === GuitarTypes.Ukulele} onChange={handleTypeChange} />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
                <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
                  <input type="radio" id="string-qty-4" name="string-qty" value="4" checked={stringsCount === 4} onChange={handleStringsCountChange} />
                  <label htmlFor="string-qty-4">4</label>
                  <input type="radio" id="string-qty-6" name="string-qty" value="6" checked={stringsCount === 6} onChange={handleStringsCountChange} />
                  <label htmlFor="string-qty-6">6</label>
                  <input type="radio" id="string-qty-7" name="string-qty" value="7" checked={stringsCount === 7} onChange={handleStringsCountChange} />
                  <label htmlFor="string-qty-7">7</label>
                  <input type="radio" id="string-qty-12" name="string-qty" value="12" checked={stringsCount === 12} onChange={handleStringsCountChange} />
                  <label htmlFor="string-qty-12">12</label>
                </div>
              </div>
              <div className="edit-item__form-right">
                <div className="custom-input edit-item__form-input">
                  <label><span>Дата добавления товара</span>
                    <input type="text" name="date" value={editTime(guitarInfo.date)} placeholder="Дата в формате 00.00.0000" readOnly />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input">
                  <label><span>Наименование товара</span>
                    <input type="text" name="title" value={name} placeholder="Наименование" onChange={handleChangeName} />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input edit-item__form-input--price">
                  <label><span>Цена товара</span>
                    <input type="text" name="price" value={price} placeholder="Цена в формате 00 000" onChange={handleChangePrice} />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input">
                  <label><span>Артикул товара</span>
                    <input type="text" name="sku" value={article} placeholder="Артикул товара" onChange={handleChangeArticle} />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-textarea edit-item__form-textarea">
                  <label><span>Описание товара</span>
                    <textarea name="description" placeholder="" value={description} onChange={handleChangeDescription}></textarea>
                  </label>
                  <p>Заполните поле</p>
                </div>
              </div>
              <div className="edit-item__form-buttons-wrap">
                <button className="button button--small edit-item__form-button" type="submit" onClick={handleSaveButtonClick}>Сохранить изменения</button>
                <button className="button button--small edit-item__form-button" type="button" onClick={handleResetButtonClick}>Вернуться к списку товаров</button>
              </div>
            </form>
          </div>
        </section>
        </> }
      </main>
      <Footer />
    </div>
  )
}

export default EditProductScreen;
