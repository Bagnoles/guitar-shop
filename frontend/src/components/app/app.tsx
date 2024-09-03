import { Routes, Route } from 'react-router-dom';
import AddProductScreen from "../../pages/add-product-screen/add-product-screen";
import EditProductScreen from "../../pages/edit-product-screen/edit-product-screen";
import LoginScreen from "../../pages/login-screen/login-screen";
import NotFoundScreen from "../../pages/not-found-screen/not-found-screen";
import ProductScreen from "../../pages/product-screen/product-screen";
import ProductsListScreen from "../../pages/products-list-screen/products-list-screen";
import RegisterScreen from "../../pages/register-screen/register-screen";
import { AppRoutes } from '../../const';


function App():JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<LoginScreen />} />
      <Route path={AppRoutes.Register} element={<RegisterScreen />} />
      <Route path={AppRoutes.List} element={<ProductsListScreen />} />
      <Route path={AppRoutes.Product} element={<ProductScreen />} />
      <Route path={AppRoutes.Add} element={<AddProductScreen />} />
      <Route path={AppRoutes.Edit} element={<EditProductScreen />} />
      <Route path='*' element={<NotFoundScreen />} />
    </Routes>
  )
}

export default App;
