import {useState, useEffect} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router'
import {nameChange, popupHandler, onSignUp} from "../../actions";
import cutWords from "../../services/cutWords";
import cn from "classnames";

import Input from "../input/Input"
import Button from "../button/Button";

import iconClose from "../../assets/img/сlose.png";

const PopupSub = ({popups, nameChange, popupHandler, history, data, onSignUp}) => {
  const [valueName, setValueName] = useState("");
  const [valueSName, setValueSName] = useState("");
  const [incorrectName, setIncorrectName] = useState(false);
  const [incorrectSName, setIncorrectSName] = useState(false);
  const [statusPopup, setStatus] = useState(false);
  const [item, setItem] = useState();

  //Обработчики событий
  const onInputDo = (event, set) => {
    event.preventDefault();

    set(event.target.value);
  }
  const onEnter = () => {
    if (valueName !== '' && valueSName !== '') {
      nameChange({name: valueName, sName: valueSName});
      popupHandler('sub', false);
      onSignUp(item.id);
      setValueName('');
      setValueSName('');
      setIncorrectName(false);
      setIncorrectSName(false);
    } else {
      if (valueName === '') {
        setIncorrectName(true);
      } else {
        setIncorrectName(false);
      }
      if (valueSName === '') {
        setIncorrectSName(true);
      } else {
        setIncorrectSName(false);

      }
    }
  }
  const onNo = () => {
    popupHandler('sub', false);
  }

  //Эффекты
  const makeEventDataDescr = () => {
    const id = history.location.pathname.replace(/\D/g, '');
    const newItem = {...data.find(item => +id === +item.id)};
    if (newItem.description) {
      newItem.description = cutWords(newItem && newItem.description ,5);
    }
    setItem(newItem);
  }
  useEffect(() => setStatus(popups.sub), [popups.sub]) //открывает и закрывает модалку
  useEffect(makeEventDataDescr, [data]); //Делает текст описания коротким

  return (
    <div className={cn('popup', 'popup--sub', {active: statusPopup})}>
      <div className="popup__wrapper">
        <div className="popup__header">
          <h3 className="popup__title">
            Записаться на событие
          </h3>
          <Button mod="popup__close button--only-icon" onClick={onNo} text={<img src={iconClose} alt={'close'}/>}
          />
        </div>
        <div className="popup__event">
          <div className="popup__event-img">
            <img src={item && item.image} alt={item && item.title}/>
          </div>
          <div className="popup__event-body">
            <p className="popup__event-title">
              {item && item.title}
            </p>
            <p className="popup__event-text">
              {item && item.description}
            </p>
          </div>
        </div>
        <div className="popup__body">
          <Input placeholder="Имя" mod={cn({'incorrect':incorrectName})} value={valueName} onInput={event=>onInputDo(event, setValueName)}/>
          <Input placeholder="Фамилия" mod={cn({'incorrect':incorrectSName})} value={valueSName} onInput={event=>onInputDo(event, setValueSName)}/>
        </div>
        <div className="popup__bottom">
          <Button mod="popup__button" onClick={onNo}>
            Отмена
          </Button>
          <Button mod="popup__button" onClick={onEnter}>
            Ок
          </Button>
        </div>
      </div>
    </div>
  )
}

const mstp = ({popups, data}) => ({popups, data})

const mdtp = {nameChange, popupHandler, onSignUp}

export default withRouter(connect(mstp, mdtp)(PopupSub));
