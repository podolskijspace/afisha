import Input from "../input/Input"
import Button from "../button/Button";
import {useState, useEffect} from "react";
import {nameChange, popupHandler, onSignUp} from "../../actions";
import {connect} from "react-redux";
import { withRouter } from 'react-router'
import cutWords from "../../services/cutWords";

// import svgClose from "../../images/svg/Close.svg";

const PopupSub = ({popups, nameChange, popupHandler, history, data, onSignUp}) => {

  const [valueName, setValueName] = useState("");
  const [valueSName, setValueSName] = useState("");
  const [incorrectName, setIncorrectName] = useState(false);
  const [incorrectSName, setIncorrectSName] = useState(false);
  const [statusPopup, setStatus] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    setStatus(popups.sub);
  }, [popups.sub])

  useEffect(()=> {
    const id = history.location.pathname.replace(/\D/g, '');
    const newItem = {...data.find(item => +id === +item.id)};
    if (newItem.description) {
      newItem.description = cutWords(newItem && newItem.description ,5);
    }
    setItem(newItem);

  }, [data]); //Здесь неправильно ставить зависимость, потому что не нужно постоянно обновление, но по-другому не понимаю, как через хуки сделать

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

  return (
    <div className={`popup popup--sub${statusPopup ? ' active' : ''}`}>
      <div className="popup__wrapper">
        <div className="popup__header">
          <h3 className="popup__title">
            Записаться на событие
          </h3>
          <div className="popup__close">
            {/*{svgClose}*/}
            Закрыть
          </div>
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
          <Input
          placeholder="Имя"
          mod={`${incorrectName ? ' incorrect':''}`}
          value={valueName}
          onInput={event=>onInputDo(event, setValueName)}
          />
          <Input
          placeholder="Фамилия"
          mod={`${incorrectSName ? ' incorrect':''}`}
          value={valueSName}
          onInput={event=>onInputDo(event, setValueSName)}/>
        </div>
        <div className="popup__bottom">
          <Button
          text="Отмена"
          mod="popup__button"
          onClick={onNo}/>
          <Button
          text="Ок"
          mod="popup__button"
          onClick={onEnter}/>
        </div>
      </div>
    </div>
  )
}

const mstp = ({popups, data}) => {
  return {
    popups,
    data
  }
}

const mdtp = {
  nameChange,
  popupHandler,
  onSignUp
}

export default withRouter(connect(mstp, mdtp)(PopupSub));
