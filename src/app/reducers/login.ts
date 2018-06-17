import { LoginActions } from 'app/actions/login';

const initialState = {
  loggedIn: document.cookie.split(';').filter((item) => item.includes('token=')).length > 0 &&
    document.cookie.split(';').filter((item) => item.includes('token='))[0].split("token=")[1] !== "undefined"
  ,
};

export const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LoginActions.Type.SET_USER_AS_LOGGED_IN:
      return Object.assign({}, state, { loggedIn: true });
    default:
      return state;
  }
};
