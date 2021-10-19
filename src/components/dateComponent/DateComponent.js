import Select from "../select/Select";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {onSetMonth, onSetYear} from '../../actions/index'

const date = new Date(),
      months = [
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
],
      years = [
  {name: '2021', value: '2021'},
  {name: '2020', value: '2020'},
  {name: '2019', value: '2019'},
  {name: '2018', value: '2018'},
  {name: '2017', value: '2017'},
];

const DateComponent = ({onSetMonth, onSetYear, month, year}) => {
  const [yearValue, setYearValue] = useState(year || date.getFullYear()),
        [monthValue, setMonthValue] = useState(month || date.getMonth());

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

  const onYearSelect = (event) => {
    event.preventDefault();
    const newValue = +event.target.value;
    setYearValue(newValue);
    console.log(newValue)
    localStorage.setItem('eventsYear', newValue);
    onSetYear(newValue);

  }

  const onMonthSelect = (event) => {
    event.preventDefault();
    const newValue = +event.target.value;
    setMonthValue(newValue);
    localStorage.setItem('eventsMonth',newValue);
    onSetMonth(newValue);

  }

  return (
    <div className="date">
      <Select mod="date__select" data={months} value={monthValue} onChange={onMonthSelect}/>
      <Select mod="date__select" data={years} value={yearValue} onChange={onYearSelect}/>
    </div>
  )
}

const mstp = ({month, year}) => {
  return {
    month,
    year
  }
}

const mdtp = {
  onSetMonth,
  onSetYear
}

export default connect(mstp, mdtp)(DateComponent);
