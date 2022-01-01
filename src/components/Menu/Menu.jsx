import "./menu.scss";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { auth } from "../../firebase/config";
import { FaBeer } from "react-icons/fa";

export const Menu = ({ isAuth }) => {
  let profilePhoto = auth.currentUser?.providerData[0].photoURL;
  return (
    <div className="menu__container">
      <button className="menu__buttons">
        {isAuth ? (
          <img className="profile__photo" src={profilePhoto} alt="" />
        ) : (
          <FaBeer />
        )}
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
