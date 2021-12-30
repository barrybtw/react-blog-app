import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__title">Something</div>
      <ul className="nav-bar__list">
        <Link to="/" className="nav-bar__list-link">
          Example
        </Link>
        <Link to="/" className="nav-bar__list-link">
          Example
        </Link>
        <Link to="/" className="nav-bar__list-link">
          Example
        </Link>
      </ul>
    </nav>
  );
};
