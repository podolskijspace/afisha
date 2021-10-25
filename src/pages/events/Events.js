import {useState, useEffect} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router'
import makeDate from "../../services/makeDate";

import Container from "../../components/container/Container";
import DateComponent from "../../components/dateComponent/DateComponent";

const Events = ({data, history, month, year}) => {
  const [elemsToShow, setElemsToShow] = useState();

  //Обработчики событий
  const onLink = ((id) => {
    history.push(`/events/${id}`)
  })

  //Эффекты
  const renderData = () => {
    const result = data.map ((item) => {
      let monthItem = (new Date(item.date)).getMonth(),
        yearItem = (new Date(item.date)).getFullYear();
      if (yearItem === year && monthItem === month) {
        let newDate = makeDate(item.date)

        return (
          <li className="events__item" key={item.id}>
            <div className="events__item-wrap">
              <div className="events__item-wrap">
                <div className="events__item-header">
              <span className="events__item-title">
                {item.title}
              </span>
                  <button onClick={(event) => {
                    event.preventDefault();
                    onLink(item.id);
                  }} className="transparent events__item-button button button--href">
                    Больше
                  </button>
                </div>
                <div className="events__item-img">
                  <img src={item.image} alt={item.title}/>
                </div>
                <div className="events__item-date">
                  {newDate}
                </div>
              </div>
            </div>
          </li>
        )
      }
      else {
        return null;
      }
    })

    setElemsToShow(result)
  }
  useEffect(renderData, [month, year])

  return (
    <div className="events">
      <Container mod="events__container">
        <DateComponent/>
        <div className="events__body">
          <ul className="events__list">
            {elemsToShow}
          </ul>
        </div>
      </Container>
    </div>
  )
}

const mstp = ({data, month, year}) => ({data, month, year})

const mdtp = {}

export default withRouter(connect(mstp, mdtp)(Events));
