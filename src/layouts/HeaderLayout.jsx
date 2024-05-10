import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Header from "../components/Header";
import { GenreContext } from "../contexts/GenreContext";

function HeaderLayout() {
  const { theme } = useContext(ThemeContext);
  const { fetchedGenre } = useContext(GenreContext);
  return (
    <div className={`themed-main ${theme}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default HeaderLayout;
