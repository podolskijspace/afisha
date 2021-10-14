import GetData from "../services/getData";

const getData = new GetData();

const initialState = {
  name: {},
  popups: {
    enter: false,
    unSub: false,
    sub: false,
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
      let signUpId = state.data.findIndex(item => item.id == action.payload);
      let newSignUpData = [...state.data];
      if (newSignUpData[signUpId].users) {
        newSignUpData[signUpId].users.push({name: state.name.name, sName: state.name.sName});
      }
      else {
        newSignUpData[signUpId].users = [{name: state.name.name, sName: state.name.sName}];
      }
      localStorage.setItem('data',JSON.stringify(newSignUpData));
      return {
        ...state,
        data: newSignUpData,
      };
    case 'ON_UNSUBSCRIBE':
      let indexUnsub = state.data.findIndex(item => item.id == action.payload),
          newItem = {...state.data[indexUnsub]},
          nameIndex = newItem.users.findIndex(item => {
              return (item.name === state.name.name && item.sName === state.name.sName);
            });

            newItem = {
              ...newItem,
              users:[...newItem.users.slice(0, nameIndex), ...newItem.users.slice(nameIndex + 1)]
            };
      const newUnsubDate = [
            ...state.data.slice(0, indexUnsub),
            newItem,
            ...state.data.slice(indexUnsub + 1),
          ];
      localStorage.setItem('data',JSON.stringify(newUnsubDate));
      return {
        ...state,
        data: newUnsubDate,
      };

    default:
      return state;
  }
} 

export default reducer;