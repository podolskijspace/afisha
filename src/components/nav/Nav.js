import { withRouter } from 'react-router'
import {Link} from "react-router-dom"
import cn from 'classnames'

const Nav = ({history, children}) => {
  //Функция перебирает массив данных и возвращает массив компонентов
  const dataRender = () => {
    return children.map ((item, i) => {
      return (
        <li className="nav__item" key = {i}>
          <Link className={cn('button', 'button--nav', 'nav__button',{active: ~history.location.pathname.indexOf(item.to)})} to={`/${item.to}`}>
            <svg width="14" height="12" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 0.497162H0.5C0.223437 0.497162 0 0.720599 0 0.997162V10.9972C0 11.2737 0.223437 11.4972 0.5 11.4972H13.5C13.7766 11.4972 14 11.2737 14 10.9972V0.997162C14 0.720599 13.7766 0.497162 13.5 0.497162ZM12.875 2.22841V10.3722H1.125V2.22841L0.69375 1.89247L1.30781 1.10341L1.97656 1.62372H12.025L12.6938 1.10341L13.3078 1.89247L12.875 2.22841ZM12.025 1.62216L7 5.52841L1.975 1.62216L1.30625 1.10185L0.692188 1.89091L1.12344 2.22685L6.46094 6.37685C6.61444 6.4961 6.80328 6.56084 6.99766 6.56084C7.19203 6.56084 7.38088 6.4961 7.53438 6.37685L12.875 2.22841L13.3062 1.89247L12.6922 1.10341L12.025 1.62216Z" fill={"inherit"}/>
            </svg>
            {item.text}
          </Link>
        </li>
      )
    })
  }
  
  return (
    <nav className="nav">
      <ul className="nav__list">
        {dataRender()}
      </ul>
    </nav>
  )
}

export default withRouter(Nav)
