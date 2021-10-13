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

export {
  nameChange,
  popupHandler,
}