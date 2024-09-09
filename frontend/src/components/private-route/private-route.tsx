import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../const.ts';
import { useAppSelector } from '../../hooks/store-hooks.ts';
import { getUserInfo } from '../../store/user/user-selectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
  isReverse?: boolean;
}

function PrivateRoute({children, isReverse}: PrivateRouteProps): JSX.Element {
  const location = useLocation();
  const user = useAppSelector(getUserInfo);

  if (user && isReverse) {
    const from = location.state?.from || { pathname: AppRoutes.List };
    return <Navigate to={from} />;
  }
  if (!user && !isReverse) {
    return <Navigate state={{ from: location }} to={AppRoutes.Main} />;
  }

  return children;
}

export default PrivateRoute;
