import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/error";
import Home from "./pages/home";

import "./App.scss";

import CollectionPage from "./pages/collection";
import CardPage from "./pages/card";
import UserPage from "./pages/user";
import Layout from "./components/home/mobile/Layout";
import CardexPage from "./pages/cardex";
import OffersPage from "./pages/offers";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    errorElement: <ErrorPage />,
    element: <Home />,
  },
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "collection/:id",
        loader: () => ({ message: "Hello Data Router!" }),
        errorElement: <ErrorPage />,
        element: <CollectionPage />,
      },
      {
        path: "cardex",
        loader: () => ({ message: "Hello Data Router!" }),
        errorElement: <ErrorPage />,
        element: <CardexPage />,
      },
      {
        path: "offers",
        loader: () => ({ message: "Hello Data Router!" }),
        errorElement: <ErrorPage />,
        element: <OffersPage />,
      },
      {
        path: "card/:tag",
        loader: () => ({ message: "Hello Data Router!" }),
        errorElement: <ErrorPage />,
        element: <CardPage />,
      },
      {
        path: "user/:id",
        loader: () => ({ message: "Hello Data Router!" }),
        errorElement: <ErrorPage />,
        element: <UserPage />,
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
