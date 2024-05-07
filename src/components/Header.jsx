import { Link } from "react-router-dom";
import logo from "../../public/assets/images/logo.jpg";
import DropdownSettings from "./DropdownSettings";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      <h1>Moovies</h1>
      <DropdownSettings />
    </header>
  );
}

export default Header;
