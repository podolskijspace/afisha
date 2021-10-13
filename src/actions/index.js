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



export {
  nameChange,
  popupHandler,
  changeData,
}