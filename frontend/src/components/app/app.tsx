import { Routes, Route } from 'react-router-dom';
import AddProductScreen from "../../pages/add-product-screen/add-product-screen";
import EditProductScreen from "../../pages/edit-product-screen/edit-product-screen";
import LoginScreen from "../../pages/login-screen/login-screen";
import NotFoundScreen from "../../pages/not-found-screen/not-found-screen";
import ProductScreen from "../../pages/product-screen/product-screen";
import ProductsListScreen from "../../pages/products-list-screen/products-list-screen";
import RegisterScreen from "../../pages/register-screen/register-screen";
import { AppRoutes } from '../../const';
import PrivateRoute from '../private-route/private-route';


function App():JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<PrivateRoute isReverse><LoginScreen /></PrivateRoute>} />
      <Route path={AppRoutes.Register} element={<PrivateRoute isReverse><RegisterScreen /></PrivateRoute>} />
      <Route path={AppRoutes.List} element={<PrivateRoute><ProductsListScreen /></PrivateRoute>} />
      <Route path={AppRoutes.Product} element={<PrivateRoute><ProductScreen /></PrivateRoute>} />
      <Route path={AppRoutes.Add} element={<PrivateRoute><AddProductScreen /></PrivateRoute>} />
      <Route path={AppRoutes.Edit} element={<PrivateRoute><EditProductScreen /></PrivateRoute>} />
      <Route path='*' element={<NotFoundScreen />} />
    </Routes>
  )
}

export default App;
