import "./menu.scss";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { auth } from "../../firebase/config";
import { FaBeer } from "react-icons/fa";

export const Menu = ({ isAuth }) => {
  if (isAuth) {
    console.log(auth.currentUser.photoURL);
  }

  return (
    <div className="menu__container">
      <button className="menu__buttons">
        {isAuth ? <img src={auth.currentUser.photoURL} alt="" /> : <FaBeer />}
        <img src={auth.currentUser.photoURL} alt="" />
      </button>
      <div className="menu__button--list-wrapper">
        <ul className="menu__button--list">
          <li className="menu__button--item">
            <FiSettings />
            <span className="menu__button--item-name"></span>
          </li>
          <li className="menu__button--item">
            <CgProfile />
            <span className="menu__button--item-name">Profile</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
