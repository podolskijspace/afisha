import {useEffect} from 'react';
import {connect} from "react-redux";
import {nameChange, popupHandler, changeData, onSetMonth, onSetYear} from "../../actions";

import { Route, Redirect} from 'react-router-dom';
import Header from "../header/Header";
import Popups from "../popups/Popups";
import Events from "../../pages/events/Events";
import Calendar from "../../pages/calendar/Calendar";
import Event from "../../pages/event/Event";

function App({nameChange, popupHandler, getData, changeData, onSetMonth, onSetYear}) {
  //Функция для вывода отдельной страницы события
  const eventsRender = ({match}) => <Event itemId={match.params.id}/>

  //Функции эффекты
  const checkLoggedInStorage = () => {
    const name = JSON.parse( localStorage.getItem('logged')) || {};
    if (typeof name.name === 'string' &&
      typeof name.sName === 'string' &&
      name.name !== '' &&
      name.sName !== '') {
      nameChange(name);
    }
    else {
      popupHandler('enter', true)
    }
  }
  const checkCardDataInStorage = () => {
    let newData = JSON.parse( localStorage.getItem('data'));

    if (!newData) {
      getData.getResource()
        .then(response => {
          changeData(response)
        });

    }
    else {
      changeData(newData)
    }
  }
  const checkDateInStorage = () => {
    const date = new Date();
    const month = localStorage.getItem('eventsMonth') || date.getMonth(),
      year = localStorage.getItem('eventsYear') || date.getFullYear();
    if (month) {
      onSetMonth(+month);
    }
    if (year) {
      onSetYear(+year);
    }
  }

  //Все функции срабатывают при запуске страницы
  useEffect(() => {
    checkLoggedInStorage()        //Проверяем авторизован ли пользователь
    checkCardDataInStorage()      //Проверяет данные карточек, если их нет, то загружает данные
    checkDateInStorage()          //Проверка даты в Storage
  }, [])

  return (
    <div className="app">
      <Header/>
      <Redirect from="/" to="/events" />
      <Route path="/events" exact component={() => <Events/>}/>
      <Route path="/calendar" exact component={() => <Calendar/>}/>
      <Route path="/events/:id" exact render={eventsRender} />
      <Popups/>
    </div>
  );
}

const mstp = ({getData, }) => ({getData, })

const mdtp = {nameChange, popupHandler, changeData, onSetMonth, onSetYear}

export default connect(mstp, mdtp)(App);