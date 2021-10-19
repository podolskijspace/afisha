import Button from "../button/Button";
import { withRouter } from 'react-router'

const Nav = ({history}) => {
  console.log()
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Button to="/events" text = "События" mod={`nav__button${~history.location.pathname.indexOf('events') ? ' active':''}`}/>
        </li>
        <li className="nav__item">
          <Button to="/calendar" text = "Календарь" mod={`nav__button${~history.location.pathname.indexOf('calendar') ? ' active':''}`}/>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Nav);
