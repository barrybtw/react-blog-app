import "./menu.scss";
import { FiSettings } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import { ImCross } from "react-icons/im"

export const Menu = () => {
    return (
        <div className="menu__container">
            <button class="menu__buttons" >
                <ImCross />
            </button>
            <ul className="menu__button--list">
                <li className="menu__button--item">
                    <FiSettings />
                    <span className="menu__button--item-name">Settings</span>
                </li>
                <li className="menu__button--item">
                    <CgProfile />
                    <span className="menu__button--item-name">Profile</span>
                </li>
            </ul>
        </div>
    )
}
