const nameChange = (name) => {
  return {
    type: 'CHANGE__NAME',
    payload: name,
  }
}

const popupHandler = (name, status) => {
  return {
    type: 'POPUPS',
    name,
    status
  }
}

const changeData = (data) => {
  return {
    type: 'CHANGE_DATA',
    payload: data,
  }
}

const onSignUp = (id) => {
  return {
    type: 'ON_SIGN_UP',
    payload: id,
  }
}

const onUnsubscribe = (id) => {
  return {
    type: 'ON_UNSUBSCRIBE',
    payload: id,
  }
}

export {
  nameChange,
  popupHandler,
  changeData,
  onSignUp,
  onUnsubscribe,
}