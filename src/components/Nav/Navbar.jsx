import { Link } from "react-router-dom";
import "./nav.scss";
import { auth, provider } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";

export const Navbar = ({ isAuth, setIsAuth, signUserOut }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(false);
  const signInWithGoogle = () => {
    if (timer) return;
    setTimer(true);

    signInWithPopup(auth, provider).then((res) => {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);

      navigate("/");
    });

    setTimeout(() => {
      setTimer(false);
    }, 1000);
  };
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
          <div
            className="
              nav__link--anchor"
          >
            {isAuth ? (
              <button
                className="nav__link--anchor-primary nav__login"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/");
                  signUserOut();
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                className="nav__link--anchor-primary nav__logout"
                onClick={(e) => {
                  e.preventDefault();
                  signInWithGoogle();
                }}
              >
                Log In
              </button>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};
