import { Link } from "react-router-dom";
import Logo from "../logo/logo";
import { AppRoutes, AuthorizationStatus } from "../../const";
import { useAppSelector } from "../../hooks/store-hooks";
import { getAuthorizationStatus, getUserInfo } from "../../store/user/user-selectors";


function Header():JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const userInfo = useAppSelector(getUserInfo);

  return (
    <header className={authStatus === AuthorizationStatus.Auth ? 'header--admin header' : 'header'} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo className="header"/>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><Link className="link main-nav__link" to={AppRoutes.List}>Каталог</Link>
              </li>
              {authStatus === AuthorizationStatus.Auth ? <>
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={AppRoutes.List}>Список товаров</Link>
                </li>
              </> : <>
                <li className="main-nav__item"><a className="link main-nav__link">Где купить?</a>
                </li>
                <li className="main-nav__item"><a className="link main-nav__link">О компании</a>
                </li>
              </>}
            </ul>
          </nav>
          <div className="header__container">
            <span className="header__user-name">{userInfo ? userInfo.name : 'Имя'}</span>
            <Link className="header__link" to={AppRoutes.Main} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
