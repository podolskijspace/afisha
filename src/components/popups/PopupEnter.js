import Input from "../input/Input"
import Button from "../button/Button";
import {useState} from "react";
import svgClose from "../../images/svg/Close.svg";

const PopupEnter = () => {


  const [valueName, setValueName] = useState("");
  const [valueSName, setValueSName] = useState("");

  const onInputDo = (event, set) => {
    event.preventDefault();

    set(event.target.value);
  }

  return (
    <div className="popup popup--enter">
      <div className="popup__wrapper">
        <div className="popup__header">
          <h3 className="popup__title">
            Желаете войти?
          </h3>
          <div className="popup__close">
            {svgClose}
          </div>
        </div>
        <div className="popup__body">
          <Input
          placeholder="Имя"
          mod="require"
          value={valueName}
          onInput={event=>onInputDo(event, setValueName)}
          />
          <Input
          placeholder="Фамилия"
          mod="require"
          value={valueSName}
          onInput={event=>onInputDo(event, setValueSName)}
          />
        </div>
        <div className="popup__bottom">
          <Button
          text="Остаться как гость"
          mod="popup__button"/>
          <Button
          text="Войти"
          mod="popup__button"/>
        </div>
      </div>
    </div>
  )
}

export default PopupEnter;