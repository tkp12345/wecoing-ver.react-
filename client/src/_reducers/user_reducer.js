import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../_actions/types";

//state 리턴 함수 
export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      //loginSucces : 서버정보 전달(user_action.js 참고)
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
