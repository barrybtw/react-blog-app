import { Link } from "react-router-dom";
import "./nav.scss";
import { auth, provider } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { ImExit } from "react-icons/im";
import { BsFillDoorOpenFill } from "react-icons/bs";
import tmp_logo from "./../../assets/tmp_logo.svg";
export const Navbar = ({ isAuth, setIsAuth, signUserOut }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(false);
  const signInWithGoogle = () => {
    if (timer) return;
    setTimer(true);

    signInWithPopup(auth, provider).then((res) => {
      console.log(isAuth);
      setIsAuth(true);
      localStorage.setItem("isAuth", true);

      navigate("/");

      console.log(res);
    });

    setTimeout(() => {
      setTimer(false);
    }, 1000);
  };
  console.log(isAuth);
  return (
    <nav>
      <figure>
        <Link to="/">
          <img id="personal-logo" src={tmp_logo} alt="" />
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
                className="nav__link--anchor-primary nav__logout"
                onClick={(event) => {
                  event.preventDefault();
                  signUserOut();
                }}
              >
                <span>Log Out</span>
                <ImExit />
              </button>
            ) : (
              <button
                className="nav__link--anchor-primary nav__login"
                onClick={(e) => {
                  e.preventDefault();
                  signInWithGoogle();
                }}
              >
                <span>Log In</span>
                <BsFillDoorOpenFill />
              </button>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};
