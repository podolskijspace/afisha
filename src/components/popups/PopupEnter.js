import Input from "../input/Input"
import Button from "../button/Button";
import {useState, useEffect} from "react";
import {nameChange, popupHandler} from "../../actions";
import {connect} from "react-redux";
import iconClose from "../../images/png/сlose.png";

const PopupEnter = ({popups, nameChange, popupHandler}) => {

  const [valueName, setValueName] = useState("");
  const [valueSName, setValueSName] = useState("");
  const [incorrectName, setIncorrectName] = useState(false);
  const [incorrectSName, setIncorrectSName] = useState(false);
  const [statusPopup, setStatus] = useState(true);

  useEffect(() => {
    setStatus(popups.enter);
  }, [popups.enter])

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

  return (
    <div className={`popup popup--enter${statusPopup ? ' active' : ''}`}>
      <div className="popup__wrapper">
        <div className="popup__header">
          <h3 className="popup__title">
            Желаете войти?
          </h3>
          <Button
            onlyIcon
            mod="popup__close"
            onClick={onContinue}
            icon="close"
          />
        </div>
        <div className="popup__body">
          <Input
          placeholder="Имя"
          mod={`popup__input ${incorrectName ? ' incorrect':''}`}
          value={valueName}
          onInput={event=>onInputDo(event, setValueName)}
          />
          <Input
          placeholder="Фамилия"
          mod={`popup__input ${incorrectSName ? ' incorrect':''}`}
          value={valueSName}
          onInput={event=>onInputDo(event, setValueSName)}/>
        </div>
        <div className="popup__bottom">
          <Button
          text="Остаться как гость"
          mod="popup__button button--transparent"
          onClick={onContinue}/>
          <Button
          text="Войти"
          mod="popup__button"
          onClick={onEnter}/>
        </div>
      </div>
    </div>
  )
}

const mstp = ({popups}) => {
  return {
    popups,
  }
}

const mdtp = {
  nameChange,
  popupHandler
}


export default connect(mstp, mdtp)(PopupEnter);
