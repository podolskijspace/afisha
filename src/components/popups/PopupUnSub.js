import Button from "../button/Button";
import {useState, useEffect} from "react";
import {popupHandler, onUnsubscribe} from "../../actions";
import {connect} from "react-redux";
import { withRouter } from 'react-router'


const PopupUnSub = ({popups, popupHandler, history, onUnsubscribe}) => {

  const [statusPopup, setStatus] = useState(false);

  useEffect(() => {
    setStatus(popups.unSub);
  }, [popups.unSub])


  const onYes = () => {
    const id = history.location.pathname.replace(/\D/g, '');
    onUnsubscribe(id);
    popupHandler('unSub', false);
  }

  const onNo = () => {
    popupHandler('unSub', false);

  }

  return (
    <div className={`popup popup--unsub${statusPopup ? ' active' : ''}`}>
      <div className="popup__wrapper">
        <div className="popup__header">
          <h3 className="popup__title">
            Вы уверены что хотите отписаться??
          </h3>
        </div>
        <div className="popup__body">
          <Button
            text="Нет"
            mod="popup__button"
            onClick={onNo} />
          <Button
            text="Да"
            mod="popup__button"
            onClick={onYes}/>
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
  popupHandler,
  onUnsubscribe
}


export default withRouter(connect(mstp, mdtp)(PopupUnSub));
