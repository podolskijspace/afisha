import {useState, useEffect} from "react";
import {connect} from "react-redux";
import { withRouter } from 'react-router'
import {popupHandler, onUnsubscribe} from "../../actions";
import cn from "classnames";

import Button from "../button/Button";

const PopupUnSub = ({popups, popupHandler, history, onUnsubscribe}) => {
  const [statusPopup, setStatus] = useState(false);

  //Обработчики событий
  const onYes = () => {
    const id = history.location.pathname.replace(/\D/g, '');
    onUnsubscribe(id);
    popupHandler('unSub', false);
  }
  const onNo = () => {
    popupHandler('unSub', false);

  }

  //Эффекты
  useEffect(() => setStatus(popups.unSub), [popups.unSub]) //Открывает и закрывает модалку

  return (
    <div className={cn('popup', 'popup--unsub', {active: statusPopup})}>
      <div className="popup__wrapper">
        <div className="popup__header">
          <h3 className="popup__title">
            Вы уверены что хотите отписаться??
          </h3>
        </div>
        <div className="popup__body">
          <Button text="Нет" mod="popup__button" onClick={onNo} />
          <Button text="Да" mod="popup__button button--red" onClick={onYes}/>
        </div>
      </div>
    </div>
  )
}

const mstp = ({popups}) => ({popups})

const mdtp = {popupHandler, onUnsubscribe}

export default withRouter(connect(mstp, mdtp)(PopupUnSub));
