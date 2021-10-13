const initialState = {
  name: {},
  popups: {
    enter: false,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE__NAME':
      const nameUser = action.payload;

      localStorage.setItem('logged',JSON.stringify({name: nameUser.name, sName: nameUser.sName}));
      return {
        ...state,
        name: nameUser,
      };
    case 'POPUPS':
      return {
        ...state,
        popups: {
          ...state.popups,
          [action.name]: action.status
        },
      };

    default:
      return state;
  }
} 

export default reducer;