import "./App.css";

import RootLayout from "./pages/RootLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages:
import {
  default as HomePage,
  loader as homeLoader,
  action as homeAction,
} from "./pages/HomePage";
import MenuPage, {
  loader as menuLoader,
  action as menuAction,
} from "./pages/MenuPage";
import CheckoutPage, {
  loader as CheckoutLoader,
  action as checkoutAction,
} from "./pages/CheckoutPage";
import OrderedPage, {
  loader as orderedLoader,
  action as orderedAction,
} from "./pages/OrderedPage";
import Authentication, { loader as authLoader } from "./pages/Authentication";
import Account, { accountLoader } from "./pages/Account";
import { action as logoutAction } from "./pages/Logout";
import ErrorPage from "./pages/ErrorPage";

//store:
import ContextProvider from "./store/CartContext";

//actions:
import { action as authAction } from "./pages/Authentication";

//loaders:
import { rootLayoutLoader, checkAuthLoader } from "./util/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader: rootLayoutLoader,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: homeLoader,
          action: homeAction,
          
        },
        {
          path: "menu",
          element: <MenuPage />,
          loader: menuLoader,
          action: menuAction,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
          loader: CheckoutLoader,
          action: checkoutAction,
        },
        {
          path: "order",
          element: <OrderedPage />,
          loader: orderedLoader,
          action: orderedAction,
        },
        {
          path: "auth",
          element: <Authentication />,
          action: authAction,
          loader: authLoader,
        },
        { path: "account", element: <Account />, loader: accountLoader },
        { path: "/logout", action: logoutAction },
      ],
    },
  ]);

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
