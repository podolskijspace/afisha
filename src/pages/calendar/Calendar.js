import Container from "../../components/container/Container";
import DateComponent from "../../components/dateComponent/DateComponent";
import Button from "../../components/button/Button";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router'
import cutWords from "../../services/cutWords";
import {popupHandler} from "../../actions";

const Calendar = ({data, month, year, history, name, popupHandler}) => {
  const [elemsToShow, setElemsToShow] = useState();

  const onLink = ((id) => {
    history.push(`/events/${id}`)
  })
  console.log(month, year)
  const onUnsubscribeButton = () => {
    popupHandler('unSub', true);
  }

  useEffect(() => {
    const result = data.map ((item) => {
      let monthItem = (new Date(item.date)).getMonth(),
        yearItem = (new Date(item.date)).getFullYear();

      const checkName = item.users && item.users.find(item => item.name === name.name),
            checkSName = item.users && item.users.find(item => item.sName === name.sName);
      if (yearItem === year && monthItem === month && checkName && checkSName) {
        const desc = cutWords(item.description ,5);
        return (

          <li className="calendar__item" key={item.id}>
            <div className="calendar__item-wrap">
              <div className="calendar__item-img">
                <img src={item.image} alt={item.title}/>
              </div>
              <div className="calendar__item-body">
                <p className="calendar__item-title">
                  {item.title}
                </p>
                <p className="calendar__item-text">
                  {desc}
                </p>
              </div>
              <div className="calendar__item-buttons">
                <Button onClick={onUnsubscribeButton} mod="calendar__button" text="Удалить"/>
                <a onClick={(event) => {
                  event.preventDefault();
                  onLink(item.id);
                }} className="calendar__item-link">
                  Перейти на страницу
                </a>
              </div>
            </div>
          </li>
        )
      }
    })

    setElemsToShow(result)
  }, [month, year])

  return (
    <div className="calendar">
      <Container>
        <DateComponent/>
        <div className="calendar__body">
          <ul className="calendar__list">
            {elemsToShow}
          </ul>
        </div>
      </Container>
    </div>
  )
}

const mstp = ({data, month, year, name}) => {
  return {
    data,
    month,
    year,
    name
  }
}

const mdtp = {
  popupHandler,
}

export default withRouter(connect(mstp, mdtp)(Calendar));
