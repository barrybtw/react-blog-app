import "./menu.scss";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { auth } from "../../firebase/config";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Menu = ({ isAuth }) => {
  let profilePhoto = auth.currentUser?.providerData[0].photoURL;
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
      setActive(!active)
  }
  return (
    <div className="menu__container">
      <button className="menu__buttons" onClick={handleClick}>
        {isAuth ? (
          <img className="profile__photo" src={profilePhoto} alt="" />
        ) : (
          <FaBeer />
        )}
      </button>
      <div className="menu__button--list-wrapper">
        <ul className="menu__button--list">
          <li className="menu__button--item">
            <Link to="/">
              <FiSettings />
              <span className="menu__button--item-name">Settings</span>
            </Link>
          </li>
          <li className="menu__button--item">
            <Link to="/">
              <CgProfile />
              <span className="menu__button--item-name">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
