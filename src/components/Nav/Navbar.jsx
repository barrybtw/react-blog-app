import { Link } from "react-router-dom";
import "./nav.scss";

export const Navbar = ({ isAuth, signUserOut }) => {
  console.log(isAuth);
  return (
    <nav>
      <figure>
        <Link to="/">
          <img
            id="personal-logo"
            src="https://www.onblastblog.com/wp-content/uploads/2017/08/blogger-logo.jpg"
            alt=""
          />
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
            to="/posts"
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
            to="/contact"
            className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--black"
          >
            Contact
          </Link>
        </li>
        {isAuth && (
          <li className="nav__link">
            <Link
              to="/new"
              className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--black"
            >
              Create A Blog
            </Link>
          </li>
        )}

        <li className="nav__link">
          <Link
            to="/login"
            className="
              nav__link--anchor"
          >
            {isAuth ? (
              <button
                className="nav__link--anchor-primary nav__login"
                onClick={(event) => {
                  event.preventDefault();
                  signUserOut();
                }}
              >
                Log Out
              </button>
            ) : (
              <button className="nav__link--anchor-primary nav__logout">
                Log In
              </button>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
