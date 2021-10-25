import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {nameChange, popupHandler} from "../../actions";
import cn from 'classnames';

import Input from "../input/Input"
import Button from "../button/Button";

import iconClose from "../../assets/img/сlose.png";

const PopupEnter = ({popups, nameChange, popupHandler}) => {
  const [valueName, setValueName] = useState("");
  const [valueSName, setValueSName] = useState("");
  const [incorrectName, setIncorrectName] = useState(false);
  const [incorrectSName, setIncorrectSName] = useState(false);
  const [statusPopup, setStatus] = useState(true);

  //Обработчики событий
  const onInputDo = (event, set) => {
    event.preventDefault();
    set(event.target.value);
  }
  const onEnter = () => {
    if (valueName !== '' && valueSName !== '') {
      nameChange({name: valueName, sName: valueSName});
      popupHandler('enter', false);
      setValueName('');
      setValueSName('');
      setIncorrectName(false);
      setIncorrectSName(false);
    } else {
      if (valueName === '') {
        setIncorrectName(true);
      }
      if (valueSName === '') {
        setIncorrectSName(true);
      }
    }
  }
  const onContinue = () => {
    popupHandler('enter', false);
  }

  //Эффекты
  useEffect(() => setStatus(popups.enter), [popups.enter])

  return (
    <div className={cn('popup', 'popup--enter', {active: statusPopup})}>
      <div className="popup__wrapper">
        <div className="popup__header">
          <h3 className="popup__title">
            Желаете войти?
          </h3>
          <Button mod="popup__close button--only-icon" onClick={onContinue} text={<img src={iconClose} alt={'close'}/>}/>
        </div>
        <div className="popup__body">
          <Input placeholder="Имя" mod={cn('popup__input', {'incorrect':incorrectName})} value={valueName} onInput={e=>onInputDo(e, setValueName)}/>
          <Input placeholder="Фамилия" mod={cn('popup__input', {'incorrect':incorrectSName})} value={valueSName} onInput={e=>onInputDo(e, setValueSName)}/>
        </div>
        <div className="popup__bottom">
          <Button text="Остаться как гость" mod="popup__button button--transparent" onClick={onContinue}/>
          <Button text="Войти" mod="popup__button" onClick={onEnter}/>
        </div>
      </div>
    </div>
  )
}

const mstp = ({popups}) => ({popups})
const mdtp = {nameChange, popupHandler}

export default connect(mstp, mdtp)(PopupEnter);
