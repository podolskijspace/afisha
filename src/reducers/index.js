import GetData from "../services/getData";

const getData = new GetData();

const initialState = {
  name: {},
  popups: {
    enter: false,
  },
  getData,
  data: null,
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
    case 'CHANGE_DATA':
      localStorage.setItem('data',JSON.stringify(action.payload));
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
} 

export default reducer;