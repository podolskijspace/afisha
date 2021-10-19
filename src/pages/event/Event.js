import {useState, useEffect} from "react";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import {connect} from "react-redux";
import makeDate from "../../services/makeDate";
import {onSignUp, onUnsubscribe, popupHandler} from "../../actions";


const Event = ({itemId, data, onSignUp, name, popupHandler}) => {
  const item = data.find(item => +itemId === +item.id),
        newDate = makeDate(item ? item.date : new Date()),
        users = item && item.users;
  let answer;
  const [usersList, setUsersList] = useState(null);

  useEffect(() => { //Эффект для вывода подписанных людей снизу
    let array;
    if (users) {
      array = users.map((item, i) => {
        return (
          <li className="event__item" key ={i}>
            {`${item.name} ${item.sName}`}
          </li>
        )
      })
      setUsersList(array);
    } else {
      setUsersList(null);
    }
  },[data])

  if (users) {
    answer = item.users.find(item => {
      return (item.name === name.name && item.sName === name.sName);
    })
  }


  const onSignUpButton = () => {
    if (name && name.name && name.sName) {
      onSignUp(itemId);
    }
    else {
      popupHandler('sub', true)
    }
  }

  const onUnsubscribeButton = () => {
    popupHandler('unSub', true);
  }




  return (
    <div className="event">
      <Container>
        <div className="event__wrapper">
          <div className="event__img">
            <img src={item ? item.image : ''} alt={item ? item.title : ''}/>
          </div>
          <div className="event__content">
            <div className="event__header">
              <h2 className="event__title">
                {item ? item.title : ''}
              </h2>
              <span className="event__date">
              {newDate}
            </span>
            </div>
            <p className="event__text">
              {item ? item.description : ''}
            </p>
            {answer ?
              <Button onClick={onUnsubscribeButton} mod="event__button button--red" text="Отписаться"/> :
              <Button onClick={onSignUpButton} mod="event__button" text="Записаться"/>
            }
          </div>
        </div>
        <div className="event__bottom">
          <h3 className="event__vis-title">
            Посетители
          </h3>
          <ViewUsers usersList={usersList}/>
        </div>
      </Container>
    </div>
  )
}

const ViewUsers = ({usersList}) => {
  if (usersList && usersList.length !== 0) {
    return (
      <ul className="event__list">
        {usersList}
      </ul>
    )
  } else {
    return (
      <span>Пока никто не записан</span>
    )
  }
}

const mstp = ({data, name,}) => {
  return {
    data,
    name,
  }
}

const mdtp = {
  onSignUp,
  onUnsubscribe,
  popupHandler
}


export default connect(mstp, mdtp)(Event);