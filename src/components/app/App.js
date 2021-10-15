import {useEffect} from 'react';
import Popups from "../popups/Popups";
import Header from "../header/Header";
import Events from "../../pages/events/Events";
import Calendar from "../../pages/calendar/Calendar";
import Event from "../../pages/event/Event";
import { Route} from 'react-router-dom';
import {nameChange, popupHandler, changeData, onSetMonth, onSetYear} from "../../actions";
import {connect} from "react-redux";

function App({nameChange, popupHandler, getData, changeData, onSetMonth, onSetYear}) {
  useEffect(()=> { //Проверяет локал сторейдж на наличии имени, если нет, то открывает модальное окно enter
    const name = JSON.parse( localStorage.getItem('logged')) || {}; //Присваиваем пустой объект, чтобы не было ошибки в следующей проверке из-за null
    if (typeof name.name === 'string' &&
        typeof name.sName === 'string' &&
        name.name !== '' &&
        name.sName !== '') {
      nameChange(name);
    }
    else {
      popupHandler('enter', true)
    }
  }, [])

  useEffect(() => { //Проверяет Storage на данные карточек, если их нет, то загружает данные
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
  },[])

  useEffect(()=> { //Проверка даты в Storage
    const date = new Date();
    const month = localStorage.getItem('eventsMonth') || date.getMonth(),
      year = localStorage.getItem('eventsYear') || date.getFullYear();
    if (month) {
      onSetMonth(+month);
    }
    if (year) {
      onSetYear(+year);
    }
  }, [])

  return (
    <div className="App">
      <Header/>
      <Route path="/events" exact component={() => <Events/>}/>
      <Route path="/calendar" exact component={() => <Calendar/>}/>
      <Route path="/events/:id" exact
             render={({match}) => {
               return <Event itemId={match.params.id}/>}
             }
      />
      <Popups/>
    </div>
  );
}

const mstp = ({getData}) => {
  return {
    getData,
  }
}

const mdtp = {
  nameChange,
  popupHandler,
  changeData,
  onSetMonth,
  onSetYear
}


export default connect(mstp, mdtp)(App);