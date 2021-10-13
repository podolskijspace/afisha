import {useState, useEffect} from "react";
import Container from "../../components/container/Container";
import Select from "../../components/select/Select";
import {connect} from "react-redux";
import { withRouter } from 'react-router'
import makeDate from "../../services/makeDate";

const date = new Date();
const months = [
  {name: 'Январь', value: '0'},
  {name: 'Февраль', value: '1'},
  {name: 'Март', value: '2'},
  {name: 'Апрель', value: '3'},
  {name: 'Май', value: '4'},
  {name: 'Июнь', value: '5'},
  {name: 'Июль', value: '6'},
  {name: 'Август', value: '7'},
  {name: 'Сентябрь', value: '8'},
  {name: 'Октябрь', value: '9'},
  {name: 'Ноябрь', value: '10'},
  {name: 'Декабрь', value: '11'},
];
const years = [
  {name: '2021', value: '2021'},
  {name: '2020', value: '2020'},
  {name: '2019', value: '2019'},
  {name: '2018', value: '2018'},
  {name: '2017', value: '2017'},
];

const Events = ({data, history}) => {
  const [yearValue, setYearValue] = useState(date.getFullYear()),
        [monthValue, setMonthValue] = useState(date.getMonth()),
        [elemsToShow, setElemsToShow] = useState();

  useEffect(() => {
    const month = localStorage.getItem('eventsMonth'),
          year = localStorage.getItem('eventsYear');
    if (month) {
      setMonthValue(+month);
    }
    if (year) {
      setYearValue(+year);
    }
  }, [])

  useEffect(() => {
    const onLink = ((id) => {
      history.push(`/events/${id}`)
    })

    const result = data.map ((item) => {
      let month = (new Date(item.date)).getMonth(),
          year = (new Date(item.date)).getFullYear();

      if (year === yearValue && month === monthValue) {
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
  }, [monthValue, yearValue, data])

  const onYearSelect = (event) => {
    event.preventDefault();
    setYearValue(+event.target.value);
    localStorage.setItem('eventsYear',event.target.value);
  }

  const onMonthSelect = (event) => {
    event.preventDefault();
    setMonthValue(+event.target.value);
    localStorage.setItem('eventsMonth',event.target.value);
  }


  return (
    <div className="events">
      <Container>
        <div className="events__data">
          <Select data={months} value={monthValue} onChange={onMonthSelect}/>
          <Select data={years} value={yearValue} onChange={onYearSelect}/>
        </div>
        <div className="events__body">
          <ul className="events__list">
            {elemsToShow}
          </ul>
        </div>
      </Container>
    </div>
  )
}



const mstp = ({data}) => {
  return {
    data,
  }
}

const mdtp = {

}


export default withRouter(connect(mstp, mdtp)(Events));
