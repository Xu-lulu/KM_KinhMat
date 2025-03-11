import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { routesConfig } from "../config/routesConfig";
import Home from "../components/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
// import Blog from "../components/auth/test";
import Cart from "../components/Cart/Cart";
import Products from "../components/Products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    
    children: [
      {
        path: routesConfig.homePage,
        children: [{ index: true, element: <Home /> }],
      },
    ],
    children: [
      {
        path: routesConfig.products,
        children: [{ index: true, element: <Products /> }],
      },
    ],
    children: [
      {
        path: routesConfig.myCart,
        children: [{ index: true, element: <Cart /> }],
      },
    ],
  },
  {
    path: routesConfig.login,
    element: <Login />,
  },
  {
    path: routesConfig.register,
    element: <Register />,
  },
]);
