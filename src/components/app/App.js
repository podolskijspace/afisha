import {useEffect} from 'react';
import Popups from "../popups/Popups";
import Header from "../header/Header";
import Events from "../../pages/events/Events";
import {nameChange, popupHandler, changeData} from "../../actions";
import {connect} from "react-redux";

function App({nameChange, popupHandler, getData, changeData}) {
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

  },[])


  return (
    <div className="App">
      <Header/>
      <Events/>
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
}


export default connect(mstp, mdtp)(App);