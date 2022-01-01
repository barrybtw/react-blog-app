import "./menu.scss";
import { FiSettings } from "react-icons/fi";
import { FaBeer, FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect} from "react";

export const Menu = ({ isAuth }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        setIsActive(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isActive])

  return (
    <div className="menu__container">
      {isAuth && (
        <button className="menu__buttons click" onClick={() => setIsActive(true)}>
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
        <ul className="menu__button--list" ref={ref}>
          <li className="menu__button--item">
            <Link to="/settings">
              <FiSettings />
              <span className="menu__button--item-name">Settings</span>
            </Link>
          </li>
          <li className="menu__button--item">
            <Link to="/FAQ">
              <FaQuestion />
              <span className="menu__button--item-name">FAQ</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
