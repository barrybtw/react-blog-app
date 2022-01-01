import "./menu.scss";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Menu = ({ isAuth }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleWrapper = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  return (
    <div className="menu__container">
      {isAuth && (
        <button className="menu__buttons click" onClick={toggleWrapper}>
          {isAuth ? (
            <img
              className="profile__photo"
              src={localStorage.getItem("Photo")}
              alt=""
            />
          ) : (
            <FaBeer />
          )}
        </button>
      )}
      <div className={`menu__button--list-wrapper ${isActive && "active"}`}>
        <ul className="menu__button--list">
          <li className="menu__button--item">
            <Link to="/settings">
              <FiSettings />
              <span className="menu__button--item-name">Settings</span>
            </Link>
          </li>
          <li className="menu__button--item">
            <Link to="/profile">
              <CgProfile />
              <span className="menu__button--item-name">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
