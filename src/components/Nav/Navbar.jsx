import "./nav.scss";
import { auth, provider, saveUser } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.png";

export const Navbar = ({ isAuth, setIsAuth, signUserOut }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(false);
  const signInWithGoogle = () => {
    // If timer is active then do nothing
    if (timer) return;
    // Start the timer if it's not active
    setTimer(true);

    signInWithPopup(auth, provider).then((res) => {
      saveUser(res);
      // Setting isAuth to true if login process was a success
      setIsAuth(true);
      // Setting isAuth item in localstorage to true to remember user on reload
      localStorage.setItem("isAuth", true);
      // Send user to front page, honestly don't know why
      navigate("/");
    });

    // Setting a timer to prevent spamming the button.
    setTimeout(() => {
      setTimer(false);
    }, 1000);
  };
  return (
    <nav className="nav__bar">
      {/* Branch Logo */}
      <figure>
        <Link to="/">
          <img id="personal-logo" src={logo} alt="" />
        </Link>
      </figure>
      {/* Home button */}
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
        {/* FAQ button */}
        <li className="nav__link">
          <Link
            to="/faq"
            className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--black"
          >
            FAQ
          </Link>
        </li>
        {/* Blog button */}
        {/* <li className="nav__link">
          <Link
            to="/user-profiles"
            className="
              nav__link--anchor
              link__hover-effect
              link__hover-effect--black"
          >
            Users
          </Link>
        </li> */}
        {/* If logged in, create blog button, else nothing, aka. conditional render */}
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
        {/* Login / Logout button based on isAuth being true or not */}
        <li className="nav__link">
          <div
            className="
              nav__link--anchor"
          >
            {/* Conditional renders start */}
            {isAuth ? (
              <button
                className="nav__link--anchor-primary nav__login click"
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
                className="nav__link--anchor-primary nav__logout click"
                onClick={(e) => {
                  e.preventDefault();
                  signInWithGoogle();
                }}
              >
                Log In
              </button>
            )}
            {/* Conditional renders end */}
          </div>
        </li>
      </ul>
    </nav>
  );
};
