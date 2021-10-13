import React from 'react';
import Popups from "../popups/Popups";
import {nameChange, popupHandler} from "../../actions";
import {connect} from "react-redux";

function App({nameChange, popupHandler}) {
  React.useEffect(()=> {
    const name = JSON.parse( localStorage.getItem('logged')) || {}; //Присваиваем пустой объект, чтобы не было ошибки в следующей проверке из-за null
    console.log(typeof name.name === 'string' ,
      typeof name.sName === 'string' ,
      name.name !== '' ,
      name.sName !== '',
      name.sName)
    if (typeof name.name === 'string' &&
        typeof name.sName === 'string' &&
        name.name !== '' &&
        name.sName !== '') {
      console.log('Имя есть')
      nameChange(name);
    }
    else {
      console.log('Имя отсутствует')
      popupHandler('enter', true)
    }
  }, [])

  return (
    <div className="App">
      <Popups/>
    </div>
  );
}

const mstp = ({name}) => {
  return {
    // name,
  }
}

const mdtp = {
  nameChange,
  popupHandler,
}


export default connect(mstp, mdtp)(App);