import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import {connect} from "react-redux";
import makeDate from "../../services/makeDate";
import {onSignUp, onUnsubscribe} from "../../actions";


const Event = ({itemId, data, onSignUp, signUpDate, onUnsubscribe}) => {
  const item = data.find(item => +itemId === +item.id),
        newDate = makeDate(item ? item.date : new Date()),
        answer = typeof (signUpDate.find(item => (item ==itemId))) === 'string';

  console.log(answer)

  const onSignUpButton = () => {
    onSignUp(itemId);
  }

  const onUnsubscribeButton = () => {
    onUnsubscribe(itemId);
  }

  return (
    <div className="event">
      <Container>
        <div className="event__img">
          <img src={item ? item.image : ''} alt={item ? item.title : ''}/>
        </div>
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
          <Button onClick={onUnsubscribeButton} mod="event__button" text="Отписаться"/> :
          <Button onClick={onSignUpButton} mod="event__button" text="Записаться"/>
        }

        <h3 className="event__vis-title">
          Посетители
        </h3>
        <span className="event__vis-text">
          Пока никто не записан
        </span>
      </Container>
    </div>
  )
}

const mstp = ({data, signUpDate}) => {
  return {
    data,
    signUpDate,
  }
}

const mdtp = {
  onSignUp,
  onUnsubscribe
}


export default connect(mstp, mdtp)(Event);