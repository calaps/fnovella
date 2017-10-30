
/* Actions */
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GETUSER_SUCCESS,
  GETUSER_FAIL,
  SET_USER_TYPE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL
} from './../constants/ActionTypes';

import initialState from './../stores/initialState';

const auth_reducer = (state = initialState.auth, action) => {
  switch(action.type){
    case LOGIN_SUCCESS:
      console.log(LOGIN_SUCCESS);
      localStorage.setItem('@fnovella:token', action.data.token);
      return Object.assign(
        {},
        state,
        {
          user: action.data.user
        }
      );
    case LOGIN_FAIL:
      // TODO: some alert may be
      return state;

    case SIGNUP_SUCCESS:
      console.log(SIGNUP_SUCCESS);
      localStorage.setItem('@fnovella:token', action.data.token);
      return Object.assign(
        {},
        state,
        {
          user: action.data.user
        }
      );
    case SIGNUP_FAIL:
      // TODO: some alert may be
      return state;
    case GETUSER_SUCCESS:
      console.log(GETUSER_SUCCESS);
      return Object.assign(
        {},
        state,
        {
          user: action.data
        }
      );
    case GETUSER_FAIL:
      localStorage.removeItem('@fnovella:token');
      return state;
    case SET_USER_TYPE:
      return Object.assign(
        {},
        state,
        {}
      );
    case LOG_OUT_SUCCESS:
      console.log(LOG_OUT);
      localStorage.removeItem('@fnovella:token');
      return Object.assign(
        {},
        state,
        {
          user: null
        }
      );
    case LOG_OUT_FAIL:
      return state;
    case FORGOT_PASSWORD_SUCCESS:
      console.log(FORGOT_PASSWORD_SUCCESS);
      return state;
    case FORGOT_PASSWORD_FAIL:
      return state;
    default:
      return state;
  }
};

export default auth_reducer;
