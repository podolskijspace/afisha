import GetData from "../services/getData";

const getData = new GetData();

const initialState = {
  name: {},
  popups: {
    enter: false,
  },
  getData,
  data: [],
  signUpDate: JSON.parse( localStorage.getItem('signUpDate')) || [],
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
    case 'ON_SIGN_UP':
      let newSignUpDate = [...state.signUpDate, action.payload]
      localStorage.setItem('signUpDate',JSON.stringify(newSignUpDate));
      return {
        ...state,
        signUpDate: newSignUpDate,
      };
    case 'ON_UNSUBSCRIBE':
      console.log(state.signUpDate, action.payload)
      const indexUnsub = state.signUpDate.indexOf(action.payload),
            newUnsubDate = [...state.signUpDate.slice(0, indexUnsub), ...state.signUpDate.slice(indexUnsub + 1)];
      localStorage.setItem('signUpDate',JSON.stringify(newUnsubDate));
      return {
        ...state,
        signUpDate: newUnsubDate,
      };

    default:
      return state;
  }
} 

export default reducer;