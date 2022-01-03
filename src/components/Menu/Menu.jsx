import "./menu.scss";
import { FiSettings } from "react-icons/fi";
import { FaBeer, FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect} from "react";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const Menu = ({ isAuth }) => {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("id");
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "users", id);
      const getUser = await getDoc(userRef).then((user) => {
        setUser(user.data());
      });
    };
    getUser(id);
  }, []);

  return (
    <div className="menu__container">
      {isAuth && (
        <button className="menu__buttons click" onClick={() => setIsActive(true)}>
          {isAuth ? (
            <img
              className="profile__photo"
              src={user.photoURL}
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
            <Link to="/settings" className="click" onClick={() => setIsActive(false)}>
              <FiSettings />
              <span className="menu__button--item-name">Settings</span>
            </Link>
          </li>
          <li className="menu__button--item">
            <Link to="/FAQ" className="click" onClick={() => setIsActive(false)}>
              <FaQuestion />
              <span className="menu__button--item-name">FAQ</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
