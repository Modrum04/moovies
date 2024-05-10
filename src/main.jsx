import "./reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Details from "./pages/Details";
import SearchPage from "./pages/SearchPage";
import Filter from "./pages/Filter";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { GenreContextProvider } from "./contexts/GenreContext";
import HeaderLayout from "./layouts/HeaderLayout";

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
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/filter",
        element: <Filter />,
      },
      {
        path: "/details/:filmid",
        element: <Details />,
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
