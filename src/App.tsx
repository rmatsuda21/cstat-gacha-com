import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/error";
import Home from "./pages/home";

import "./App.scss";
import Collection from "./pages/collection";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    errorElement: <ErrorPage />,
    element: <Home />,
  },
  {
    path: "/collection",
    loader: () => ({ message: "Hello Data Router!" }),
    errorElement: <ErrorPage />,
    element: <Collection />,
  },
  {
    path: "/cardex",
    loader: () => ({ message: "Hello Data Router!" }),
    errorElement: <ErrorPage />,
    element: <Home />,
  },
  {
    path: "/offers",
    loader: () => ({ message: "Hello Data Router!" }),
    errorElement: <ErrorPage />,
    element: <Home />,
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
