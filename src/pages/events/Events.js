import {useState, useEffect} from "react";
import Container from "../../components/container/Container";
import DateComponent from "../../components/dateComponent/DateComponent";
import {connect} from "react-redux";
import { withRouter } from 'react-router'
import makeDate from "../../services/makeDate";



const Events = ({data, history, month, year}) => {
  const [elemsToShow, setElemsToShow] = useState();

  const onLink = ((id) => {
    history.push(`/events/${id}`)
  })


  useEffect(() => {


    const result = data.map ((item) => {
      let monthItem = (new Date(item.date)).getMonth(),
          yearItem = (new Date(item.date)).getFullYear();
      console.log(yearItem, year)
      if (yearItem === year && monthItem === month) {
        let newDate = makeDate(item.date)

        return (
          <li className="events__item" key={item.id}>
            <div className="events__item-wrap">
              <div className="events__item-header">
              <span className="events__item-title">
                {item.title}
              </span>
                <a onClick={(event) => {
                  event.preventDefault();
                  onLink(item.id);
                }} className="events__item-link">
                  Больше
                </a>
              </div>
              <div className="events__item-img">
                <img src={item.image} alt={item.title}/>
              </div>
              <div className="events__item-date">
                {newDate}
              </div>
            </div>
          </li>
        )
      }
    })

    setElemsToShow(result)
  }, [month, year])




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



const mstp = ({data, month, year}) => {
  return {
    data,
    month,
    year
  }
}

const mdtp = {

}


export default withRouter(connect(mstp, mdtp)(Events));
