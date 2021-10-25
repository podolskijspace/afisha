import {useEffect, useState} from "react"
import {connect} from "react-redux"
import {onSetMonth, onSetYear} from '../../actions/index'

import Select from "../select/Select"

const date = new Date(),
      months = [
  {name: 'Янв', value: '0'},
  {name: 'Фев', value: '1'},
  {name: 'Мар', value: '2'},
  {name: 'Апр', value: '3'},
  {name: 'Май', value: '4'},
  {name: 'Июн', value: '5'},
  {name: 'Июл', value: '6'},
  {name: 'Авг', value: '7'},
  {name: 'Сен', value: '8'},
  {name: 'Окт', value: '9'},
  {name: 'Ноя', value: '10'},
  {name: 'Дек', value: '11'},
],
      years = [
  {name: '2022', value: '2022'},
  {name: '2021', value: '2021'},
  {name: '2020', value: '2020'},
  {name: '2019', value: '2019'},
  {name: '2018', value: '2018'},
  {name: '2017', value: '2017'},
]

const DateComponent = ({onSetMonth, onSetYear, month, year}) => {
  const [yearValue, setYearValue] = useState(year || 2022),
        [monthValue, setMonthValue] = useState(month || date.getMonth())

  //События элементов
  const onYearSelect = (event) => {
    event.preventDefault()
    const newValue = +event.target.value
    setYearValue(newValue)
    console.log(newValue)
    localStorage.setItem('eventsYear', newValue)
    onSetYear(newValue)

  }
  const onMonthSelect = (event) => {
    event.preventDefault()
    const newValue = +event.target.value
    setMonthValue(newValue)
    localStorage.setItem('eventsMonth',newValue)
    onSetMonth(newValue)

  }

  //Эффекты
  const checkDateInStorage = () => {
    const month = localStorage.getItem('eventsMonth'),
      year = localStorage.getItem('eventsYear')

    if (month) {
      setMonthValue(+month)
    }
    if (year) {
      setYearValue(+year)
    }
  }
  useEffect(checkDateInStorage, []) //Проверяем есть ли дата в памяти

  return (
    <div className="date">
      <Select mod="date__select" value={yearValue} onChange={onYearSelect}>
        {years}
      </Select>
      <Select mod="date__select" value={monthValue} onChange={onMonthSelect}>
        {months}
      </Select>
    </div>
  )
}

const mstp = ({month, year}) => ({month, year})

const mdtp = {onSetMonth, onSetYear}

export default connect(mstp, mdtp)(DateComponent)
