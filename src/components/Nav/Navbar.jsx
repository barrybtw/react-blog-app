import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./nav.scss";

export const Navbar = () => {
  return (
    <nav>
      <figure>
        <Link to="/">
          <img id="personal-logo" src={logo} alt="" />
        </Link>
      </figure>
      <ul className="nav__link--list">
        <li className="nav__link">
          <Link
            to="/"
            className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--black"
          >
            Home
          </Link>
        </li>
        <li className="nav__link">
          <Link
            to="/"
            className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--black"
          >
            Blog
          </Link>
        </li>
        <li className="nav__link">
          <Link
            to="/"
            className="
              nav__link--anchor
              nav__link--anchor-primary"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
