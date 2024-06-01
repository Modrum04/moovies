import "./reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Details from "./pages/Details";
import SearchPage from "./layouts/SearchPage";
import Filter from "./pages/Filter";
import SearchArea from "./layouts/SearchArea";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { GenreContextProvider } from "./contexts/GenreContext";
import HeaderLayout from "./layouts/HeaderLayout";
import Person from "./pages/Person";
import SearchMovie from "./pages/SearchMovie";
import SearchPerson from "./pages/SearchPerson";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/details/:filmid",
        element: <Details />,
      },
      {
        path: "/person/:personid",
        element: <Person />,
      },
      {
        path: "/search-area",
        element: <SearchArea />,
        children: [
          {
            path: "search",
            element: <SearchPage />,
            children: [
              {
                path: "search-movie",
                element: <SearchMovie />,
              },
              {
                path: "search-person",
                element: <SearchPerson />,
              },
            ],
          },
          {
            path: "filter",
            element: <Filter />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <GenreContextProvider>
        <RouterProvider router={router} />
      </GenreContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
);
