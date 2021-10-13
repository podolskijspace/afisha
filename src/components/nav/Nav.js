import {Link} from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/events">
            События
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/calendar">
            Календарь
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;