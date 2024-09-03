import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';

type LogoProps = {
  className: string;
}

function Logo({className}: LogoProps):JSX.Element {
  return (
    <Link className={`${className}__logo logo`} to={AppRoutes.Main}><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></Link>
  );
}

export default Logo;
