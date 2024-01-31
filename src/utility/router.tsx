import { createBrowserRouter } from "react-router-dom";

import {
  authLoader,
  discordRedirectLoader,
  leaderboardLoader,
  offersLoader,
} from "@/utility/loader";
import multiLoader from "@/utility/multiLoader";

import CardPage from "@/pages/card";
import CardexPage from "@/pages/cardex";
import CollectionPage from "@/pages/collection";
import ErrorPage from "@/pages/error";
import Home from "@/pages/home";
import Layout from "@/components/home/mobile/Layout";
import OffersPage from "@/pages/offers";
import UserPage from "@/pages/user";
import Leaderboard from "@/pages/leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    loader: () => multiLoader([authLoader, leaderboardLoader]),
    element: <Home />,
  },
  {
    path: "/auth/discord",
    loader: discordRedirectLoader,
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "collection/:id",
        element: <CollectionPage />,
      },
      {
        path: "cardex",
        element: <CardexPage />,
      },
      {
        path: "offers",
        element: <OffersPage />,
        loader: offersLoader,
      },
      {
        path: "card/:tag",
        element: <CardPage />,
      },
      {
        path: "user/:id",
        element: <UserPage />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
        loader: leaderboardLoader,
      },
    ],
  },
]);

export default router;
