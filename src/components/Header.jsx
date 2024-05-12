import { Link } from "react-router-dom";
import DropdownSettings from "./DropdownSettings";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        {/* <img className="logo" src={logo} alt="" /> */}
        <i className="logo fi fi-ts-films" />
      </Link>
      <h1>Moovies</h1>
      <DropdownSettings />
    </header>
  );
}

export default Header;
